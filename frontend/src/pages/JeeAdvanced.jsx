import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import PredictorForm from '../components/PredictorForm.jsx'
import { EXAMS, DISCLAIMER, SITE_URL } from '../utils/constants.js'
import { predictJeeAdv } from '../services/api.js'

const exam = EXAMS.JEEADV

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'JEE Advanced Estimator', item: `${SITE_URL}/jee-advanced` },
  ],
}

const JeeAdvanced = () => {
  const handleSubmit = useCallback((marks) => predictJeeAdv(marks), [])

  return (
    <>
      <Helmet>
        <title>{exam.metaTitle}</title>
        <meta name="description" content={exam.metaDesc} />
        <meta name="keywords" content={exam.seoKeywords} />
        <link rel="canonical" href={`${SITE_URL}/jee-advanced`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/jee-advanced`} />
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
            IIT Rank Estimator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            JEE Advanced Marks → IIT Rank
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
            <h2 className="font-bold text-slate-900 dark:text-white">About JEE Advanced</h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {[
                ['Conducting Body', 'Rotates among IITs'],
                ['Mode', 'Computer Based Test (CBT)'],
                ['Total Marks', '~360 (Paper 1 + Paper 2)'],
                ['Marking', 'Variable (partial credit possible)'],
                ['Eligibility', 'Top ~2.5L from JEE Main'],
                ['Seats', '~17,000 in IITs'],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="font-medium text-slate-500 dark:text-slate-500">{label}</span>
                  <span className="text-right font-semibold text-slate-800 dark:text-slate-200">{value}</span>
                </li>
              ))}
            </ul>

            {/* IIT Branch guide */}
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">
                Approx. Rank Guide
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { marks: '300+', rank: 'Top 200', note: 'IIT Bombay CSE' },
                  { marks: '250–299', rank: 'Top 1,000', note: 'IIT Delhi/Bombay' },
                  { marks: '200–249', rank: '1,000–4,000', note: 'Old IITs, good branches' },
                  { marks: '150–199', rank: '4,000–10,000', note: 'New IITs eligible' },
                ].map(({ marks, rank, note }) => (
                  <div key={marks} className="flex items-center justify-between gap-2">
                    <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 w-20 flex-shrink-0">{marks}</span>
                    <span className="text-slate-600 dark:text-slate-400 flex-1">{rank}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-right">{note}</span>
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">JEE Advanced 2027: Marks vs Rank</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            JEE Advanced is the final step for admission to all 23 IITs. The paper features unique question types — integer type, matrix match, and multi-correct MCQs — with varying partial credit. The rank list is prepared subject-wise and aggregated, so subject-wise minimum cutoffs also matter.
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Subject-wise Minimum Cutoffs</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            To qualify for IIT admissions, candidates must score above the minimum threshold in each subject (Physics, Chemistry, Mathematics) and in aggregate. In 2024, the General category aggregate cutoff was approximately 88–100 marks depending on the paper difficulty. Our model uses combined aggregate marks for the estimate.
          </p>
        </div>
      </div>
    </>
  )
}

export default React.memo(JeeAdvanced)
