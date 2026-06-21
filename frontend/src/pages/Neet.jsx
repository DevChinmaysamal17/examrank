import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import PredictorForm from '../components/PredictorForm.jsx'
import { EXAMS, DISCLAIMER, SITE_URL } from '../utils/constants.js'
import { predictNeet } from '../services/api.js'

const exam = EXAMS.NEET

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'NEET Rank Estimator', item: `${SITE_URL}/neet` },
  ],
}

const Neet = () => {
  const handleSubmit = useCallback((marks) => predictNeet(marks), [])

  return (
    <>
      <Helmet>
        <title>{exam.metaTitle}</title>
        <meta name="description" content={exam.metaDesc} />
        <meta name="keywords" content={exam.seoKeywords} />
        <link rel="canonical" href={`${SITE_URL}/neet`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/neet`} />
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
            Rank Estimator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            NEET Marks → All India Rank
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
            <h2 className="font-bold text-slate-900 dark:text-white">About NEET UG</h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {[
                ['Conducting Body', 'NTA (National Testing Agency)'],
                ['Mode', 'Offline (OMR based)'],
                ['Total Marks', '720 (Biology 360 + PCh 180 + Ph 180)'],
                ['Marking', '+4 correct, −1 wrong'],
                ['Sessions', '1 per year'],
                ['Result Type', 'All India Rank (AIR)'],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="font-medium text-slate-500 dark:text-slate-500">{label}</span>
                  <span className="text-right font-semibold text-slate-800 dark:text-slate-200">{value}</span>
                </li>
              ))}
            </ul>

            {/* Quick reference */}
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">
                Quick Reference
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { marks: '700–720', rank: '1–100', category: 'Top AIR' },
                  { marks: '650–699', rank: '100–5,000', category: 'AIIMS eligible' },
                  { marks: '600–649', rank: '5,000–25,000', category: 'Govt MBBS' },
                  { marks: '540–599', rank: '25,000–80,000', category: 'State Govt/Private' },
                ].map(({ marks, rank, category }) => (
                  <div key={marks} className="flex items-center justify-between gap-2">
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 w-20 flex-shrink-0">{marks}</span>
                    <span className="text-slate-600 dark:text-slate-400 flex-1">{rank}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-right">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
              {DISCLAIMER}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">NEET 2027: Marks vs Rank</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            NEET UG is the single national gateway for all medical admissions in India. Unlike JEE, NEET is conducted only once a year and does not involve percentile normalization — the rank directly corresponds to raw marks. In 2024, the General category cutoff for MBBS was 720–137 marks (rank ~1 to ~7,00,000+).
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Category-wise Cutoffs</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            General category candidates need significantly higher ranks to secure government MBBS seats compared to SC/ST/OBC candidates. Reservation policy allocates 27% seats to OBC, 15% to SC, and 7.5% to ST in Central Institutions. State quota seats follow state-specific reservation norms.
          </p>
        </div>
      </div>
    </>
  )
}

export default React.memo(Neet)
