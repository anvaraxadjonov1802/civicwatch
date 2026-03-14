'use client'

import { useLanguage } from '@/lib/language'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  showText = true,
  className,
}: LoadingSpinnerProps) {
  const { t } = useLanguage()

  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        className
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size]
        )}
      />
      {showText && (
        <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
      )}
    </div>
  )
}
