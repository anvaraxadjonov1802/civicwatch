'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Sun, Moon, Globe, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useApp, useTranslation } from '@/lib/context'
import type { Language } from '@/types'
import { cn } from '@/lib/utils'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export function Navbar() {
  const pathname = usePathname()
  const { t, language } = useTranslation()
  const { setLanguage, theme, toggleTheme } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)



  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/maktablar', label: t('nav.schools') },
    { href: '/natijalar', label: t('nav.results') },
    { href: '/dashboard', label: t('nav.dashboard') },
  ]

  const currentLang = languages.find(l => l.code === language)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <span className="hidden font-semibold text-foreground sm:inline-block">
              Maktab Monitor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2.5">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentLang?.flag}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      'gap-2',
                      language === lang.code && 'bg-muted'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="px-2.5"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* User / Guest indicator */}
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{t('nav.guest')}</span>
              </div>
              <Button
                size="sm"
                className="h-8"
                onClick={() => setVerifyModalOpen(true)}
              >
                {t('nav.verify')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="px-2.5 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-3 mt-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{t('nav.guest')}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setVerifyModalOpen(true)
                  }}
                >
                  {t('nav.verify')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Verification Modal */}
      {verifyModalOpen && (
        <VerifyModal onClose={() => setVerifyModalOpen(false)} />
      )}
    </>
  )
}

function VerifyModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [phone, setPhone] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-foreground">
          {t('verifyModal.title')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('verifyModal.description')}
        </p>

        <div className="mt-6 space-y-4">
          {!codeSent ? (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('verifyModal.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button
                className="w-full h-12 text-base"
                onClick={() => setCodeSent(true)}
              >
                {t('verifyModal.sendCode')}
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('verifyModal.enterCode')}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-center text-2xl tracking-widest text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  maxLength={6}
                />
              </div>
              <Button className="w-full h-12 text-base" onClick={onClose}>
                {t('verifyModal.verify')}
              </Button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {t('verifyModal.skip')}
        </button>
      </div>
    </div>
  )
}
