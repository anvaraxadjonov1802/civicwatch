'use client'

import Link from 'next/link'
import { Calendar, FileText, Inbox, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { getApplications } from '@/lib/application-storage'
import type { ApplicationStatus, Language } from '@/types'
import { cn } from '@/lib/utils'

export default function ApplicationsPage() {
  const { language } = useTranslation()
  const applications = getApplications()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Mening arizalarim
        </h1>
        <p className="mt-2 text-muted-foreground">
          Yuborgan arizalaringiz va ularning holatini shu yerda kuzatishingiz mumkin.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Hozircha arizalar yo‘q
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Holat haqida xabar yuborganingizdan keyin arizalar shu yerda ko‘rinadi.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/maktablar">Maktablarni ko‘rish</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">
                      #{application.schoolNumber} —{' '}
                      {application.schoolName[language as Language]}
                    </h3>

                    <span
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium',
                        getApplicationStatusClasses(application.status)
                      )}
                    >
                      {getApplicationStatusLabel(application.status, language as Language)}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      {application.trackingNumber}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(application.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {application.comment}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/arizalar/${application.id}`}>Batafsil</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/arizalar/${application.id}`}>
                      Holatini ko‘rish
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getApplicationStatusLabel(status: ApplicationStatus, language: Language) {
  const labels = {
    submitted: {
      uz: 'Yuborildi',
      ru: 'Отправлено',
      en: 'Submitted',
    },
    reviewing: {
      uz: 'Ko‘rib chiqilmoqda',
      ru: 'На рассмотрении',
      en: 'Under review',
    },
    planned: {
      uz: 'Rejaga kiritildi',
      ru: 'Запланировано',
      en: 'Planned',
    },
    in_progress: {
      uz: 'Ish olib borilmoqda',
      ru: 'В работе',
      en: 'In progress',
    },
    resolved: {
      uz: 'Hal qilindi',
      ru: 'Решено',
      en: 'Resolved',
    },
    rejected: {
      uz: 'Rad etildi',
      ru: 'Отклонено',
      en: 'Rejected',
    },
  }

  return labels[status][language]
}

function getApplicationStatusClasses(status: ApplicationStatus) {
  switch (status) {
    case 'submitted':
      return 'bg-primary/10 text-primary border-primary/20'
    case 'reviewing':
      return 'bg-warning/15 text-warning-foreground border-warning/20'
    case 'planned':
      return 'bg-accent text-accent-foreground border-accent/30'
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    case 'resolved':
      return 'bg-success/10 text-success border-success/20'
    case 'rejected':
      return 'bg-destructive/10 text-destructive border-destructive/20'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}