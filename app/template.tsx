'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Enable view transitions on mount
    if ('startViewTransition' in document) {
      document.documentElement.classList.add('view-transition-enabled');
    }
    
    return () => {
      document.documentElement.classList.remove('view-transition-enabled');
      document.documentElement.classList.remove('animating');
    };
  }, []);

  return (
    <div 
      style={{ viewTransitionName: 'page' }} 
      className="page-container w-full min-h-screen"
    >
      {children}
    </div>
  );
}