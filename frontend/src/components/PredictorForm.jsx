import React, { useState, useCallback, useRef } from 'react'
import LoadingSpinner from './LoadingSpinner.jsx'

const confidenceConfig = {
  High: {
    label: 'High Confidence',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-100 dark:border-emerald-900',
    dot: 'bg-emerald-500',
    barColor: 'bg-emerald-500',
  },
  Medium: {
    label: 'Medium Confidence',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-100 dark:border-amber-900',
    dot: 'bg-amber-500',
    barColor: 'bg-amber-500',
  },
  Low: {
    label: 'Low Confidence',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950',
    border: 'border-red-100 dark:border-red-900',
    dot: 'bg-red-500',
    barColor: 'bg-red-400',
  },
}

const InfoIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Animated score bar — the signature element
const ScoreBar = React.memo(({ value, max = 100, colorClass = 'bg-blue-600' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClass} animate-fill-bar`}
        style={{ '--bar-width': `${pct}%`, width: '0%' }}
        role="presentation"
      />
    </div>
  )
})
ScoreBar.displayName = 'ScoreBar'

const ResultCard = React.memo(({ result, exam }) => {
  const conf = confidenceConfig[result.confidence] || confidenceConfig.Medium
  const barColorClass = exam.color === 'blue' ? 'bg-blue-600' : exam.color === 'violet' ? 'bg-violet-600' : exam.color === 'emerald' ? 'bg-emerald-600' : 'bg-amber-600'
  const hasPercentile = result.percentile_avg != null
  const hasRank = result.rank_avg != null

  return (
    <div className={`card border ${conf.border} p-6 space-y-6 animate-slide-up`} aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Your Estimate</h3>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${conf.bg} ${conf.color} border ${conf.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
          {conf.label}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {hasPercentile && (
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">
              Estimated Percentile
            </p>
            <div className="flex items-end gap-1.5">
              <span className={`text-5xl font-black tabular-nums ${exam.colorClass}`}>
                {result.percentile_avg.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-slate-400 mb-1.5">%ile</span>
            </div>
            <div className="mt-3">
              <ScoreBar value={result.percentile_avg} max={100} colorClass={barColorClass} />
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>0th</span>
                <span>100th</span>
              </div>
            </div>
            {result.percentile_min != null && result.percentile_max != null && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium">Likely range: </span>{result.percentile_min} – {result.percentile_max} %ile
              </p>
            )}
          </div>
        )}

        {hasRank && (
          <div className={hasPercentile ? 'sm:pl-6 sm:border-l border-slate-100 dark:border-slate-800' : 'flex-1'}>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">
              Estimated Rank
            </p>
            <div className="flex items-end gap-1.5">
              <span className={`${hasPercentile ? 'text-3xl' : 'text-5xl'} font-black tabular-nums ${exam.colorClass}`}>
                {result.rank_avg.toLocaleString('en-IN')}
              </span>
              <span className="text-xl font-bold text-slate-400 mb-1.5">AIR</span>
            </div>
            {result.rank_min != null && result.rank_max != null && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium">Likely range: </span>{result.rank_min?.toLocaleString('en-IN')} – {result.rank_max?.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <InfoIcon />
        <span>
          This estimate is based on historical trends and is <strong>not an official result</strong>. Actual scores may vary due to normalization and pattern changes.
        </span>
      </div>
    </div>
  )
})
ResultCard.displayName = 'ResultCard'

const PredictorForm = React.memo(({ exam, onSubmit }) => {
  const [marks, setMarks] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const resultRef = useRef(null)

  const validate = useCallback(
    (val) => {
      const n = Number(val)
      if (val === '' || isNaN(n)) return 'Please enter a valid number.'
      if (n < exam.minMarks) return `Marks cannot be below ${exam.minMarks}.`
      if (n > exam.maxMarks) return `Marks cannot exceed ${exam.maxMarks}.`
      return null
    },
    [exam.minMarks, exam.maxMarks]
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setError(null)
      const validationError = validate(marks)
      if (validationError) {
        setError(validationError)
        return
      }
      setLoading(true)
      setResult(null)
      try {
        const data = await onSubmit(Number(marks))
        setResult(data)
        // Scroll to result
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 100)
      } catch (err) {
        setError(err.message || 'Failed to get estimate. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [marks, validate, onSubmit]
  )

  const handleChange = useCallback((e) => {
    setMarks(e.target.value)
    setError(null)
  }, [])

  const handleReset = useCallback(() => {
    setMarks('')
    setResult(null)
    setError(null)
  }, [])

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate>
        <div className="card p-6 space-y-5">
          <div>
            <label htmlFor="marks-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {exam.inputLabel}
            </label>
            <input
              id="marks-input"
              type="number"
              inputMode="numeric"
              value={marks}
              onChange={handleChange}
              placeholder={exam.inputPlaceholder}
              min={exam.minMarks}
              max={exam.maxMarks}
              step="1"
              disabled={loading}
              className={`input-field ${error ? 'border-red-400 focus:ring-red-400 dark:border-red-600' : ''}`}
              aria-invalid={!!error}
              aria-describedby={error ? 'marks-error' : 'marks-hint'}
            />
            {error ? (
              <p id="marks-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            ) : (
              <p id="marks-hint" className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Enter a value between {exam.minMarks} and {exam.maxMarks}.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || marks === ''}
              className={`btn-primary flex-1 ${
                exam.color === 'violet'
                  ? 'bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-500'
                  : exam.color === 'emerald'
                  ? 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500'
                  : exam.color === 'amber'
                  ? 'bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500'
                  : ''
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" inline label="Estimating…" />
                  Estimating…
                </>
              ) : (
                'Get Estimate'
              )}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary px-4"
                aria-label="Clear result and reset form"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Result */}
      <div ref={resultRef}>
        {result && <ResultCard result={result} exam={exam} />}
      </div>
    </div>
  )
})

PredictorForm.displayName = 'PredictorForm'
export default PredictorForm
