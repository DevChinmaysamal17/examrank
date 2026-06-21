import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | ExamRank</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Large 404 */}
          <div className="mb-6 select-none" aria-hidden="true">
            <span className="text-8xl sm:text-9xl font-extrabold tabular-nums gradient-text leading-none">
              404
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Page not found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Head back to explore our estimators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary w-full sm:w-auto">
              Go Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary w-full sm:w-auto"
            >
              Go Back
            </button>
          </div>

          {/* Quick links */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-widest font-semibold">
              Jump to an estimator
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { to: '/jee', label: 'JEE Main' },
                { to: '/mhtcet', label: 'MHT-CET' },
                { to: '/neet', label: 'NEET' },
                { to: '/jee-advanced', label: 'JEE Advanced' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(NotFound)
