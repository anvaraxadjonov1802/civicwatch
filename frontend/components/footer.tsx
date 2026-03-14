'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { useLanguage } from '@/lib/language'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">CivicWatch</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('nav.home')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/maktablar"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('nav.schools')}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link
                  href="/natijalar"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('nav.results')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('footer.platform')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {currentYear} CivicWatch. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-neon-green" />
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
