import React from 'react'
import { Helmet } from 'react-helmet-async'

const Privacy = () => (
  <>
    <Helmet><title>Privacy Policy – ExamRank</title></Helmet>
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: June 2025</p>
      <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data we collect</h2>
          <p>We do not collect, store, or share any personal data. The marks you enter are sent to our server solely to compute your estimate and are never saved to any database.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Cookies</h2>
          <p>We use one cookie — your dark/light mode preference — stored locally in your browser. No tracking or advertising cookies are used.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Third parties</h2>
          <p>We do not use any third-party analytics, advertising networks, or data brokers.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Contact</h2>
          <p>Questions? Email us at privacy@examrank.in</p>
        </section>
      </div>
    </div>
  </>
)

export default Privacy
