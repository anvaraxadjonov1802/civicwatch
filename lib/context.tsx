'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language, Theme } from '@/types'
import { getStoredTheme, setStoredTheme, applyTheme } from './theme'

const LANGUAGE_KEY = 'maktab-monitor-lang'

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz')
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem(LANGUAGE_KEY) as Language | null
    if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
      setLanguageState(savedLang)
    }

    // Load saved theme
    const savedTheme = getStoredTheme()
    if (savedTheme) {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    }

    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_KEY, lang)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Convenience hook for translations
export function useTranslation() {
  const { language } = useApp()
  const { t } = require('./i18n')
  
  return {
    t: (key: string, params?: Record<string, string | number>) => t(key, language, params),
    language
  }
}
