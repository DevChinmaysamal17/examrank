import React, { useState, useCallback } from 'react'
import { FAQS, EXAM_STATS, DISCLAIMER } from '../utils/constants.js'

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const FAQItem = React.memo(({ item, index }) => {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((v) => !v), [])
  const id = `faq-answer-${index}`

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-snug pr-2">
          {item.q}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div
          id={id}
          role="region"
          className="pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed animate-fade-in"
        >
          {item.a}
        </div>
      )}
    </div>
  )
})
FAQItem.displayName = 'FAQItem'

const StatCard = React.memo(({ stat }) => (
  <div className="card p-6 text-center group hover:shadow-md transition-shadow duration-200">
    <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums mb-1.5">
      {stat.value}
    </p>
    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">{stat.label}</p>
    <p className="text-xs text-slate-400 dark:text-slate-500">{stat.sub}</p>
  </div>
))
StatCard.displayName = 'StatCard'

const HowItWorksStep = React.memo(({ step, n }) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm shadow-blue-500/30">
      {n}
    </div>
    <div className="pt-1">
      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{step.title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
    </div>
  </div>
))
HowItWorksStep.displayName = 'HowItWorksStep'

const HOW_STEPS = [
  {
    title: 'Pick your exam',
    desc: 'Select from JEE Main, MHT-CET, NEET, or JEE Advanced on the home screen or navbar.',
  },
  {
    title: 'Enter your marks',
    desc: 'Type in your expected or actual marks. Our form validates the range automatically.',
  },
  {
    title: 'Get your estimate',
    desc: 'We run your score through historical trend models and return a percentile or rank with a confidence rating.',
  },
]

const SEOSection = React.memo(() => {
  return (
    <>
      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-slate-100 dark:border-slate-800" aria-labelledby="hiw-heading">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label mb-3">How it works</p>
            <h2 id="hiw-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight">
              Three steps to your estimate
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12 text-lg">
              No registration. No fees. Just enter your marks and see your estimated score in seconds.
            </p>
            <div className="space-y-8">
              {HOW_STEPS.map((step, i) => (
                <HowItWorksStep key={i} step={step} n={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800" aria-label="Exam statistics">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-center mb-3">By the numbers</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center mb-12 tracking-tight">
            India's largest entrance exams
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {EXAM_STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" aria-labelledby="faq-heading">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="section-label text-center mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white text-center mb-12 tracking-tight">
              Common questions
            </h2>
            <div className="card px-6 divide-y divide-slate-100 dark:divide-slate-800">
              {FAQS.map((item, i) => (
                <FAQItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Disclaimer */}
      <section id="disclaimer" className="py-10 bg-amber-50 dark:bg-amber-950/30 border-y border-amber-100 dark:border-amber-900/40" aria-label="Disclaimer">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto flex gap-3 items-start">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer: </strong>
              {DISCLAIMER}
            </p>
          </div>
        </div>
      </section>
    </>
  )
})

SEOSection.displayName = 'SEOSection'
export default SEOSection
