import React from 'react'
import { Link } from 'react-router-dom'

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const BadgeIcon = () => (
  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Hero = React.memo(() => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-blue-50 dark:bg-blue-950/30 blur-3xl opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-50 dark:bg-indigo-950/20 blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 mb-8">
            <BadgeIcon />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
              Free for all Indian students
            </span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight text-balance"
          >
            Estimate Your{' '}
            <span className="gradient-text">Exam Performance</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl text-balance">
            JEE Main, MHT-CET, NEET and JEE Advanced estimators based on historical trends.
            Get an instant estimate — no login required.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#estimators" className="btn-primary text-base px-7 py-3.5 group">
              Start Estimating
              <span className="group-hover:translate-x-1 transition-transform duration-150">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline underline-offset-4 decoration-slate-200 dark:decoration-slate-700 hover:decoration-blue-400"
            >
              How does it work?
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              '3+ years of data',
              'JEE · MHT-CET · NEET · JEE Adv',
              'No login required',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero
