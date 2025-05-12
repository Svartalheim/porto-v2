'use client'

import cn from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/home', label: 'home' },
  { href: '/r3f', label: 'r3f' },
  { href: '/project', label: 'project' },
  { href: '/test', label: 'test' },
  { href: '/test2', label: 'test2' },
  { href: '/gsap', label: 'gsap' },
]

// Debug utility to track transition states
const useTransitionDebug = () => {
  const [transitionState, setTransitionState] = useState('idle')
  const [transitionError, setTransitionError] = useState<string | null>(null)

  const logTransition = (state: string, error: null | string = null) => {
    console.log(`Transition: ${state}`, error || '')
    setTransitionState(state)
    if (error) setTransitionError(error)
  }

  return { transitionState, transitionError, logTransition }
}

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { transitionState, logTransition } = useTransitionDebug()
  const [isNavigating, setIsNavigating] = useState(false)

  // Improved route transition handler with explicit state tracking and debugging
  const handleRouteChange = async (href: string) => {
    // Prevent multiple transitions
    if (isNavigating) {
      logTransition('blocked - already navigating')
      return
    }

    // Don't transition to the current page
    if (pathname === href) {
      logTransition('blocked - same page')
      return
    }

    setIsNavigating(true)
    logTransition('starting')

    try {
      if (!document.startViewTransition) {
        logTransition('fallback - no view transition support')
        router.push(href)
        return
      }

      // Start the transition with proper promise chain
      const transition = document.startViewTransition(async () => {
        logTransition('updating DOM')

        try {
          // Wait for the old page to finish before pushing the new route
          await router.push(href)
          logTransition('navigation complete')

          // Give the DOM time to update before triggering the transition
          await new Promise((resolve) => setTimeout(resolve, 50)) // Optional delay
          logTransition('DOM update delay complete')
        } catch (error) {
          logTransition(
            'navigation error',
            error instanceof Error ? error.message : String(error)
          )
          throw error
        }
      })

      // Ensure the transition is fully ready before applying the new page transition
      transition.ready
        .then(() => {
          logTransition('snapshot ready')
          document.documentElement.classList.add('animating')

          // Only trigger the new page transition once the old page has finished
          transition.finished.then(() => {
            logTransition('transition finished')
            document.documentElement.classList.remove('animating')
          })
        })
        .catch((error: any) => {
          logTransition(
            'snapshot error',
            error instanceof Error ? error.message : String(error)
          )
        })

      await transition.finished // Ensure the transition is complete before finishing

      logTransition('animation complete')
    } catch (error) {
      logTransition(
        'transition error',
        error instanceof Error ? error.message : String(error)
      )
    } finally {
      setIsNavigating(false)
    }
  }

  // Debug display for development
  const showDebug = process.env.NODE_ENV === 'development'

  return (
    <>
      <nav className="fixed top-page left-page z-10 flex flex-col uppercase font-mono">
        <div className="inline-flex">
          <a
            className={cn(
              'font-bold',
              pathname === '/' && 'text-[var(--theme-contrast)]'
            )}
            onMouseEnter={() => router.prefetch('/')}
            onClick={(e) => {
              e.preventDefault()
              handleRouteChange('/')
            }}
          >
            SVARTALHEIM
          </a>
          <span className="ml-2">{pathname}</span>
        </div>

        <ul className="pl-[24px]">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                onMouseEnter={() => router.prefetch(link.href)}
                onClick={(e) => {
                  e.preventDefault()
                  handleRouteChange(link.href)
                }}
                className={cn(
                  'link',
                  'relative',
                  pathname === link.href &&
                    "before:content-['■'] before:absolute before:left-[-16px] text-[var(--theme-contrast)]"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Debug panel - only shown in development */}
      {showDebug && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded shadow-lg z-50 text-xs font-mono">
          <div>
            Transition: <span className="font-bold">{transitionState}</span>
          </div>
          <div>
            Path: <span className="font-bold">{pathname}</span>
          </div>
          <div>
            Navigating:{' '}
            <span className="font-bold">{isNavigating ? 'Yes' : 'No'}</span>
          </div>
        </div>
      )}
    </>
  )
}
