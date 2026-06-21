import React from 'react'
import { Helmet } from 'react-helmet-async'

const Disclaimer = () => (
  <>
    <Helmet><title>Disclaimer – ExamRank</title></Helmet>
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Disclaimer</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>ExamRank provides estimates based on historical result trends and is <strong className="text-slate-800 dark:text-slate-200">not an official source</strong>.</p>
        <p>We are not affiliated with, endorsed by, or connected to the National Testing Agency (NTA), IIT, CBSE, or any State CET authority.</p>
        <p>Estimates may differ from actual results due to normalization, changes in exam difficulty, and variations in the candidate pool each year.</p>
        <p>Do not make critical academic or financial decisions based solely on estimates from this tool. Always refer to the official result portals for accurate data.</p>
        <p>Official sources: <a href="https://jeemain.nta.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">jeemain.nta.ac.in</a>, <a href="https://neet.nta.nic.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">neet.nta.nic.in</a>, <a href="https://cetcell.mahacet.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cetcell.mahacet.org</a></p>
      </div>
    </div>
  </>
)

export default Disclaimer
