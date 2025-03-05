'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { Link } from '~/components/link'

const LINKS = [
  { href: '/home', label: 'home' },
  { href: '/r3f', label: 'r3f' },
  // { href: '/storyblok', label: 'storyblok' },
  // { href: '/shopify', label: 'shopify' },
  // { href: '/hubspot', label: 'hubspot' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-page left-page z-2 flex flex-col uppercase font-mono">
      <div className="inline-flex">
        <Link
          href="/"
          className={cn(
            'font-bold',
            pathname === '/' && 'text-[var(--theme-contrast)] '
          )}
        >
          Svartalheim
        </Link>
        <span>{pathname}</span>
      </div>

      <ul className="pl-[24px]">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'link',
                'relative',
                pathname === link.href &&
                  "before:content-['■'] before:absolute before:left-[-16px] text-[var(--theme-contrast)]"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
