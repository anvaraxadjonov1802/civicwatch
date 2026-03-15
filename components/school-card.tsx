'use client'

import Link from 'next/link'
import { MapPin, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import type { School, Language } from '@/types'
import { getDistrictById } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface SchoolCardProps {
  school: School
  compact?: boolean
}

export function SchoolCard({ school, compact = false }: SchoolCardProps) {
  const { t, language } = useTranslation()
  const district = getDistrictById(school.districtId)

  const statusColors = {
    good: 'bg-success/15 text-success border-success/30',
    issue: 'bg-destructive/15 text-destructive border-destructive/30',
    pending: 'bg-warning/15 text-warning-foreground border-warning/30',
    unknown: 'bg-muted text-muted-foreground border-border',
  }

  const statusLabels = {
    good: t('status.good'),
    issue: t('status.issue'),
    pending: t('status.pending'),
    unknown: t('status.unknown'),
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-foreground">
              {school.name[language as Language]}
            </h3>
            <span
              className={cn(
                'shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium',
                statusColors[school.status]
              )}
            >
              {statusLabels[school.status]}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">
              {district?.name[language as Language]}
            </span>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href={`/maktablar/${school.id}`}>
            <Button variant="outline" size="sm">
              {t('schoolCard.details')}
            </Button>
          </Link>
          <Link href={`/tekshirish/${school.id}`}>
            <Button size="sm">
              {t('schoolCard.report')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-primary/30"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        </div>
        {/* Status badge */}
        <span
          className={cn(
            'absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm',
            statusColors[school.status]
          )}
        >
          {statusLabels[school.status]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm font-medium text-primary">#{school.number}</p>
          <h3 className="mt-1 text-lg font-semibold leading-tight text-foreground">
            {school.name[language as Language]}
          </h3>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{school.address[language as Language]}</span>
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{school.totalReports} {t('schoolCard.reports')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link href={`/maktablar/${school.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              {t('schoolCard.details')}
            </Button>
          </Link>
          <Link href={`/tekshirish/${school.id}`} className="flex-1">
            <Button className="w-full gap-1">
              {t('schoolCard.report')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
