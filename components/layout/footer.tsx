'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/context'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo and description */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary-foreground"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <span className="font-semibold text-foreground">Maktab Monitor</span>
            </Link>
            <p className="max-w-xs text-center text-sm text-muted-foreground sm:text-left">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/maktablar"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.schools')}
            </Link>
            <Link
              href="/natijalar"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.results')}
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.dashboard')}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {currentYear} Maktab Monitor. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
