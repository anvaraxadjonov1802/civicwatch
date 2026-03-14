'use client'

import { CheckCircle2, AlertCircle, Clock, HelpCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import type { VerificationStatus } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: VerificationStatus
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export function StatusBadge({ 
  status, 
  size = 'md', 
  showIcon = true,
  className 
}: StatusBadgeProps) {
  const { t } = useLanguage()

  const statusConfig = {
    completed: {
      label: t('status.completed'),
      icon: CheckCircle2,
      className: 'bg-status-completed/15 text-status-completed border-status-completed/30',
    },
    problem: {
      label: t('status.problem'),
      icon: AlertCircle,
      className: 'bg-status-problem/15 text-status-problem border-status-problem/30',
    },
    under_review: {
      label: t('status.under_review'),
      icon: Clock,
      className: 'bg-status-review/15 text-status-review border-status-review/30',
    },
    not_verified: {
      label: t('status.not_verified'),
      icon: HelpCircle,
      className: 'bg-status-not-verified/15 text-status-not-verified border-status-not-verified/30',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        sizeClasses[size],
        config.className,
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  )
}
