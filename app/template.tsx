// import type { ReactNode } from 'react'

// export default function Template({children}:{children:ReactNode}) {
//   return children
// }


'use client';

import { type ReactNode, useEffect, useState } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [hasViewTransition, setHasViewTransition] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    // Check for View Transitions API support
    setHasViewTransition('startViewTransition' in document);

    // Enable view transitions on mount if supported
    if ('startViewTransition' in document) {
      console.log('View Transitions API is supported');
      document.documentElement.classList.add('view-transition-enabled');
    } else {
      console.warn('View Transitions API is NOT supported in this browser');
    }

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('view-transition-enabled');
      document.documentElement.classList.remove('animating');
    };
  }, []);

  // Skip transition styling if not client-side
  const transitionStyle = isClient && hasViewTransition
    ? { viewTransitionName: 'page' }
    : {};

  return (
    <>
      <div
        style={transitionStyle}
        className="page-container h-full "
      >
        {children}
      </div>

      {/* Development indicator for View Transitions support */}
      {/* {isClient && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 px-3 py-1 text-xs font-mono rounded opacity-70 z-50"
             style={{
               backgroundColor: hasViewTransition ? '#0c7040' : '#703030',
               color: 'white'
             }}>
          View Transitions: {hasViewTransition ? 'Enabled' : 'Not Supported'}
        </div>
      )} */}
    </>
  );
}
