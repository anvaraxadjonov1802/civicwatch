'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { useLanguage, useTranslatedLabel } from '@/lib/language'
import { districts } from '@/lib/mock-data'
import type { School } from '@/types'
import { cn } from '@/lib/utils'

interface SchoolCardProps {
  school: School
  variant?: 'grid' | 'list'
  className?: string
}

export function SchoolCard({ school, variant = 'grid', className }: SchoolCardProps) {
  const { t } = useLanguage()
  const getLabel = useTranslatedLabel()

  const districtLabel = districts.find(d => d.value === school.district)?.label

  if (variant === 'list') {
    return (
      <div
        className={cn(
          'card-glow flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center',
          className
        )}
      >
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-28">
          <Image
            src={school.image}
            alt={school.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <h3 className="truncate font-semibold">{school.name}</h3>
              <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                #{school.number}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {districtLabel ? getLabel(districtLabel) : school.district}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <StatusBadge status={school.status} size="sm" />
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span>{school.totalReports} {t('school.reports')}</span>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href={`/maktablar/${school.id}`}>
                {t('school.details')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'card-glow group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30',
        className
      )}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={school.image}
          alt={school.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <StatusBadge status={school.status} size="sm" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{school.name}</h3>
          <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
            #{school.number}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {districtLabel ? getLabel(districtLabel) : school.district}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          <span>{school.totalReports} {t('school.reports')}</span>
        </div>
        <div className="mt-auto pt-4">
          <Button asChild className="w-full group/btn" variant="outline">
            <Link href={`/maktablar/${school.id}`}>
              {t('school.details')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
