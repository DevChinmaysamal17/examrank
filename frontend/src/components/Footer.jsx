import React from 'react'
import { Link } from 'react-router-dom'

const Footer = React.memo(() => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 mt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg text-white font-black text-sm">
                ER
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-lg">
                Exam<span className="text-blue-600">Rank</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Free estimation tools for Indian entrance exam aspirants. Based on historical trends, not official data.
            </p>
          </div>

          {/* Estimators */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
              Estimators
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/jee', label: 'JEE Main Percentile' },
                { to: '/mhtcet', label: 'MHT-CET Percentile' },
                { to: '/neet', label: 'NEET Rank' },
                { to: '/jee-advanced', label: 'JEE Advanced Rank' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {year} ExamRank. Not affiliated with NTA, IIT, or any exam authority.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 text-center sm:text-right max-w-sm">
            Estimates are indicative only. Always verify with official sources.
          </p>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer
