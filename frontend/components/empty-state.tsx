'use client'

import { Search, FileX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  type?: 'no-results' | 'no-data' | 'error'
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  type = 'no-results',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const { t } = useLanguage()

  const defaultContent = {
    'no-results': {
      icon: Search,
      title: t('common.noResults'),
      description: undefined,
    },
    'no-data': {
      icon: FileX,
      title: t('common.notFound'),
      description: undefined,
    },
    error: {
      icon: FileX,
      title: t('common.error'),
      description: t('common.retry'),
    },
  }

  const content = defaultContent[type]
  const Icon = content.icon

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center',
        className
      )}
    >
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold">{title || content.title}</h3>
      {(description || content.description) && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description || content.description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline" className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  )
}
