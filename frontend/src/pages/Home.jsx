import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero.jsx'
import PredictorCard from '../components/PredictorCard.jsx'
import SEOSection from '../components/SEOSection.jsx'
import { EXAMS, SITE_URL } from '../utils/constants.js'

const EXAM_LIST = Object.values(EXAMS)

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ExamRank – Free JEE, NEET, MHT-CET, JEE Advanced Estimator</title>
        <meta
          name="description"
          content="Free marks-to-percentile and marks-to-rank estimators for JEE Main, MHT-CET, NEET, and JEE Advanced. Based on 3+ years of historical data."
        />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="ExamRank – Free JEE, NEET, MHT-CET, JEE Advanced Estimator" />
        <meta property="og:description" content="Free marks-to-percentile and marks-to-rank estimators for Indian entrance exams. No login required." />
        <meta property="og:site_name" content="ExamRank" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ExamRank – Free JEE, NEET, MHT-CET, JEE Advanced Estimator" />
        <meta name="twitter:description" content="Free marks-to-percentile and marks-to-rank estimators for Indian entrance exams." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ExamRank',
            url: SITE_URL,
            description: 'Free entrance exam estimators for Indian students.',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/jee`,
              'query-input': 'required name=marks',
            },
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <Hero />

      {/* Predictor Cards */}
      <section
        id="estimators"
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        aria-labelledby="estimators-heading"
      >
        <div className="mb-10">
          <p className="section-label mb-3">Estimators</p>
          <h2
            id="estimators-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Pick your exam
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl text-lg">
            Each estimator uses data from the past 3+ years of official results.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXAM_LIST.map((exam) => (
            <PredictorCard key={exam.key} exam={exam} />
          ))}
        </div>
      </section>

      {/* SEO Sections */}
      <SEOSection />
    </>
  )
}

export default React.memo(Home)
