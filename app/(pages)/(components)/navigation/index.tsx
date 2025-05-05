'use client';

import cn from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/home', label: 'home' },
  { href: '/r3f', label: 'r3f' },
  { href: '/project', label: 'project' },
  { href: '/test', label: 'test' },
  { href: '/gsap', label: 'gsap' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Improved route transition handler for sliding effect
  const handleRouteChange = (href: string) => {
    if ('startViewTransition' in document) {
      // Start the transition
      const transition = document.startViewTransition(async () => {
        // This needs to return a promise that resolves when the DOM updates are complete
        await router.push(href);

        // Give Next.js a moment to update the DOM completely
        await new Promise((resolve) => setTimeout(resolve, 20));
      });

      // Properly handle the transition state
      transition.ready.then(() => {
        // Additional setup after the snapshot is taken but before animation starts
        document.documentElement.classList.add('animating');
      });

      transition.finished.then(() => {
        // Clean up after animation completes
        document.documentElement.classList.remove('animating');
      });

      // Return the transition promise to prevent multiple transitions
      return transition.finished;
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      router.push(href);
    }
  };

  return (
    <nav className='fixed top-page left-page z-10 flex flex-col uppercase font-mono'>
      <div className='inline-flex'>
        <a
          className={cn(
            'font-bold',
            pathname === '/' && 'text-[var(--theme-contrast)]'
          )}
          onMouseEnter={() => router.prefetch('/')}
          onClick={(e) => {
            e.preventDefault();
            handleRouteChange('/');
          }}
        >
          SVARTALHEIM
        </a>
        <span className='ml-2'>{pathname}</span>
      </div>

      <ul className='pl-[24px]'>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              onMouseEnter={() => router.prefetch(link.href)}
              onClick={(e) => {
                e.preventDefault();
                handleRouteChange(link.href);
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
  );
}
