import type { Theme } from '@/types'

const THEME_KEY = 'maktab-monitor-theme'

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return null
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(THEME_KEY, theme)
}

export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
