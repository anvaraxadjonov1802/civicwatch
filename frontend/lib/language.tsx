'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language } from '@/types'
import { t as translate } from './i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('civic-language') as Language | null
    if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Update document lang attribute
    document.documentElement.lang = language === 'uz' ? 'uz' : language === 'ru' ? 'ru' : 'en'
    
    // Save to localStorage
    localStorage.setItem('civic-language', language)
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translate(key, language)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Hook to get translated label from multi-language object
export function useTranslatedLabel() {
  const { language } = useLanguage()
  
  return function getLabel<T extends { uz: string; ru: string; en: string }>(obj: T): string {
    return obj[language]
  }
}
