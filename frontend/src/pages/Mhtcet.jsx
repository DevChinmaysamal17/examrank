import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import PredictorForm from '../components/PredictorForm.jsx'
import { EXAMS, DISCLAIMER, SITE_URL } from '../utils/constants.js'
import { predictMhtcet } from '../services/api.js'

const exam = EXAMS.MHTCET

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'MHT-CET Estimator', item: `${SITE_URL}/mhtcet` },
  ],
}

const Mhtcet = () => {
  const handleSubmit = useCallback((marks) => predictMhtcet(marks), [])

  return (
    <>
      <Helmet>
        <title>{exam.metaTitle}</title>
        <meta name="description" content={exam.metaDesc} />
        <meta name="keywords" content={exam.seoKeywords} />
        <link rel="canonical" href={`${SITE_URL}/mhtcet`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/mhtcet`} />
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
            MHT-CET Marks → Percentile
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
            <h2 className="font-bold text-slate-900 dark:text-white">About MHT-CET</h2>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {[
                ['Conducting Body', 'State CET Cell, Maharashtra'],
                ['Mode', 'Computer Based Test (CBT)'],
                ['Total Marks', '200 (PCM or PCB)'],
                ['Marking', '+2 for correct, no negative'],
                ['Sessions', 'Multiple per year'],
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
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">MHT-CET 2027: Marks vs Percentile</h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            MHT-CET percentile is calculated session-wise. Candidates who score 170+ out of 200 typically achieve 99+ percentile in PCM. The State CET Cell normalizes marks across all shifts before generating the merit list used for CAP (Centralized Admission Process) rounds.
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Branch Cutoffs to Expect</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Top engineering colleges in Maharashtra (COEP, VJTI, ICT Mumbai) typically require 99.5+ percentile for Computer Science branches. Government colleges with good placements generally require 97–99 percentile. Our estimates are derived from previous years' actual cutoff data.
          </p>
        </div>
      </div>
    </>
  )
}

export default React.memo(Mhtcet)
