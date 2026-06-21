import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import PredictorForm from '../components/PredictorForm.jsx'
import { EXAMS, DISCLAIMER, SITE_URL } from '../utils/constants.js'
import { predictJee } from '../services/api.js'

const exam = EXAMS.JEE

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'JEE Main Estimator', item: `${SITE_URL}/jee` },
  ],
}

const Jee = () => {
  const handleSubmit = useCallback((marks) => predictJee(marks), [])

  return (
    <>
      <Helmet>
        <title>{exam.metaTitle}</title>
        <meta name="description" content={exam.metaDesc} />
        <meta name="keywords" content={exam.seoKeywords} />
        <link rel="canonical" href={`${SITE_URL}/jee`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/jee`} />
        <meta property="og:title" content={exam.metaTitle} />
        <meta property="og:description" content={exam.metaDesc} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={exam.metaTitle} />
        <meta name="twitter:description" content={exam.metaDesc} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-2xl mx-auto lg:mx-0 mb-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${exam.badgeClass} mb-5`}>
            Percentile Estimator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            JEE Main Marks → Percentile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{exam.fullDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div>
            <PredictorForm exam={exam} onSubmit={handleSubmit} />
          </div>

          {/* Info Panel */}
          <div className={`card ${exam.bgClass} ${exam.borderClass} border p-6 space-y-5`}>
            <h2 className="font-bold text-slate-900 dark:text-white">About JEE Main</h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {[
                ['Conducting Body', 'National Testing Agency (NTA)'],
                ['Mode', 'Computer Based Test (CBT)'],
                ['Total Marks', '300 (Physics + Chemistry + Maths)'],
                ['Marking', '+4 for correct, −1 for wrong'],
                ['Sessions', '2 per year (Jan & Apr)'],
                ['Result Type', 'Percentile (0–100)'],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="font-medium text-slate-500 dark:text-slate-500">{label}</span>
                  <span className="text-right font-semibold text-slate-800 dark:text-slate-200">{value}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
              {DISCLAIMER}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl prose prose-slate dark:prose-invert prose-sm sm:prose-base">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0">JEE Main 2027: Marks vs Percentile</h2>
          <p className="text-slate-500 dark:text-slate-400">
            The JEE Main percentile is not a direct percentage of marks — it represents your performance relative to all candidates who appeared in the same session. NTA applies normalization to account for difficulty differences across shifts. Historically, scoring around 120–140 out of 300 places a candidate in the 90–93 percentile range, while 250+ typically yields 99.5+ percentile.
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">How NTA Calculates Percentile</h3>
          <p className="text-slate-500 dark:text-slate-400">
            The formula used: <strong>Percentile = (Number of candidates who scored ≤ your score / Total candidates in session) × 100</strong>. This is why the same raw marks can give different percentiles across different sessions.
          </p>
        </div>
      </div>
    </>
  )
}

export default React.memo(Jee)
