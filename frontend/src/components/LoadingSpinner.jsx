import React from 'react'

const LoadingSpinner = React.memo(({ size = 'md', label = 'Loading…', inline = false }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  }

  if (inline) {
    return (
      <span
        role="status"
        aria-label={label}
        className={`inline-block ${sizeMap[size]} rounded-full border-current border-t-transparent animate-spin opacity-75`}
      />
    )
  }

  return (
    <div
      role="status"
      aria-label={label}
      className="flex flex-col items-center justify-center gap-4 py-12"
    >
      <div
        className={`${sizeMap[size]} rounded-full border-blue-600 dark:border-blue-400 border-t-transparent animate-spin`}
      />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium animate-pulse-slow">
        {label}
      </p>
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
