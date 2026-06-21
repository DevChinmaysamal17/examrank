import React from 'react'
import { Helmet } from 'react-helmet-async'

const About = () => (
  <>
    <Helmet><title>About – ExamRank</title></Helmet>
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About ExamRank</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>ExamRank is a free estimation tool for Indian entrance exam aspirants. We help students get a rough idea of their expected percentile or rank based on historical result trends.</p>
        <p>We currently support JEE Main, MHT-CET, NEET UG, and JEE Advanced.</p>
        <p>Our estimates are derived from publicly available historical result data spanning 2021–2024. We are not affiliated with NTA, IIT, or any official exam authority.</p>
        <p>Built for students, by people who care about making exam prep less stressful.</p>
      </div>
    </div>
  </>
)

export default About
