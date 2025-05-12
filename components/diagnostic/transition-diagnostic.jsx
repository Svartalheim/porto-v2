'use client'

import { useEffect, useRef, useState } from 'react'

export function TransitionDiagnostic() {
  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const [logs, setLogs] = useState([])
  const [transitionSupported, setTransitionSupported] = useState(false)
  const [transitionCount, setTransitionCount] = useState(0)
  const [lastTransitionDuration, setLastTransitionDuration] = useState(0)
  const transitionStartTime = useRef(0)

  useEffect(() => {
    // Check for View Transitions API support
    setTransitionSupported('startViewTransition' in document)

    // Setup console log interceptor
    const originalConsoleLog = console.log

    console.log = (...args) => {
      originalConsoleLog(...args)

      // Only capture transition-related logs
      if (
        args[0] &&
        typeof args[0] === 'string' &&
        args[0].includes('Transition:')
      ) {
        setLogs((prev) => [
          {
            timestamp: new Date().toLocaleTimeString(),
            message: args.join(' '),
          },
          ...prev.slice(0, 19), // Keep last 20 logs
        ])

        // Track transition events
        if (args[0].includes('starting')) {
          transitionStartTime.current = performance.now()
          setTransitionCount((count) => count + 1)
        }

        if (args[0].includes('animation complete')) {
          const duration = performance.now() - transitionStartTime.current
          setLastTransitionDuration(Math.round(duration))
        }
      }
    }

    // Restore original on unmount
    return () => {
      console.log = originalConsoleLog
    }
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50 font-mono text-xs">
      <div
        className="bg-gray-800 text-white p-2 rounded-lg shadow-lg flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            transitionSupported ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span>
          View Transitions {transitionCount > 0 ? `(${transitionCount})` : ''}
        </span>
        <span>
          {lastTransitionDuration > 0 ? `${lastTransitionDuration}ms` : ''}
        </span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>

      {isExpanded && (
        <div className="mt-2 bg-gray-800 text-white p-3 rounded-lg shadow-lg max-h-48 overflow-y-auto w-80">
          <div className="flex justify-between mb-2">
            <span>Transition Events</span>
            <button
              type="button"
              className="text-xs text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setLogs([])
                setTransitionCount(0)
                setLastTransitionDuration(0)
              }}
            >
              Clear
            </button>
          </div>
          {logs.length === 0 ? (
            <div className="text-gray-400 italic">
              No transitions recorded yet
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={idx} className="border-b border-gray-700 pb-1 flex">
                  <span className="text-gray-400 mr-2">{log.timestamp}</span>
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
