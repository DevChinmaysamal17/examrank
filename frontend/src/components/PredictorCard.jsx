import React from 'react'
import { Link } from 'react-router-dom'

// Exam Icons
const JEEIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#2563EB" fillOpacity="0.1" />
    <path d="M14 12h4v10c0 2-1.5 4-4 4s-4-2-4-4h3c0 1 .5 1.5 1 1.5s1-.5 1-1.5V12zM21 12h9v3h-6v3h5v3h-5v4h-3V12zM" fill="#2563EB" />
    <text x="8" y="27" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="13" fill="#2563EB">JEE</text>
  </svg>
)

const MHTIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#7C3AED" fillOpacity="0.1" />
    <text x="4" y="26" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="11" fill="#7C3AED">CET</text>
  </svg>
)

const NEETIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#059669" fillOpacity="0.1" />
    <path d="M20 12c-1.5 0-2 .7-2 1.5 0 1 .8 1.5 2 2s4 1.5 4 4-2 4-4 4-4-2-4-4h3c0 1 .5 1.5 1 1.5s1-.5 1-1.5-.8-1.5-2-2-4-1.5-4-4 2-4 4-4 4 2 4 4h-3z" fill="#059669" />
    <text x="5" y="27" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="12" fill="#059669">NEET</text>
  </svg>
)

const ADVIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#D97706" fillOpacity="0.1" />
    <text x="4" y="25" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="10" fill="#D97706">JEE</text>
    <text x="4" y="35" fontFamily="Inter,sans-serif" fontWeight="800" fontSize="8" fill="#D97706">ADV</text>
  </svg>
)

const iconMap = {
  jee: JEEIcon,
  mhtcet: MHTIcon,
  neet: NEETIcon,
  jeeadv: ADVIcon,
}

const colorBorderMap = {
  blue: 'hover:border-blue-200 dark:hover:border-blue-800',
  violet: 'hover:border-violet-200 dark:hover:border-violet-800',
  emerald: 'hover:border-emerald-200 dark:hover:border-emerald-800',
  amber: 'hover:border-amber-200 dark:hover:border-amber-800',
}

const tagColorMap = {
  blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
}

const btnColorMap = {
  blue: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
  violet: 'bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-500',
  emerald: 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500',
  amber: 'bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-500',
}

const PredictorCard = React.memo(({ exam }) => {
  const { key, name, path, description, color, resultType, maxMarks } = exam
  const Icon = iconMap[key]

  return (
    <Link
      to={path}
      className={`card p-6 flex flex-col gap-5 group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${colorBorderMap[color]} border`}
      aria-label={`${name} ${resultType === 'percentile' ? 'Percentile' : 'Rank'} Estimator`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-12 h-12 flex-shrink-0">
          {Icon && <Icon />}
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColorMap[color]}`}>
          {resultType === 'percentile' ? 'Percentile' : 'Rank'} Estimator
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          Max: {maxMarks} marks
        </span>
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold ${btnColorMap[color]} transition-colors focus-visible:ring-2 focus-visible:ring-offset-2`}
        >
          Try Now
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
})

PredictorCard.displayName = 'PredictorCard'
export default PredictorCard
