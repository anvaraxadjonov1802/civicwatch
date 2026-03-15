'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle2,
  Clock3,
  Wrench,
  AlertCircle,
  XCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import {
  getApplicationById,
  updateApplicationStatus,
} from '@/lib/application-storage'
import type { ApplicationStatus, Language } from '@/types'
import { cn } from '@/lib/utils'

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { language } = useTranslation()

  const [application, setApplication] = useState(() => getApplicationById(id))

  useEffect(() => {
    setApplication(getApplicationById(id))
  }, [id])

  if (!application) {
    notFound()
  }

  const handleStatusChange = (status: ApplicationStatus, note: string) => {
    const updated = updateApplicationStatus(id, status, note)
    if (updated) {
      setApplication(updated)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/arizalar">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Mening arizalarim
        </Link>
      </Button>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Ariza raqami</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">
              {application.trackingNumber}
            </h1>
            <p className="mt-2 text-muted-foreground">
              #{application.schoolNumber} — {application.schoolName[language as Language]}
            </p>
          </div>

          <span
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium',
              getApplicationStatusClasses(application.status)
            )}
          >
            {getApplicationStatusLabel(application.status, language as Language)}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Muammo turi</p>
            <p className="mt-1 font-medium text-foreground">{application.taskType}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Yuborilgan sana</p>
            <p className="mt-1 font-medium text-foreground">
              {new Date(application.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Izoh</p>
          <p className="mt-1 text-foreground">{application.comment}</p>
        </div>

        {application.images.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Biriktirilgan rasmlar</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {application.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Application ${index + 1}`}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Demo boshqaruv
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Checkpoint uchun ariza holatini qo‘lda o‘zgartirib ko‘rsatish mumkin.
            </p>
          </div>

          <span className="rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-medium text-primary">
            Faqat demo uchun
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleStatusChange('reviewing', 'Ariza ko‘rib chiqishga olindi')
            }
          >
            Ko‘rib chiqilmoqda
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleStatusChange('planned', 'Muammo rejaga kiritildi')
            }
          >
            Rejaga kiritildi
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleStatusChange('in_progress', 'Ish olib borilmoqda')
            }
          >
            Ish olib borilmoqda
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleStatusChange('resolved', 'Muammo hal qilindi')
            }
          >
            Hal qilindi
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleStatusChange('rejected', 'Ariza rad etildi')
            }
          >
            Rad etildi
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">Holat tarixi</h2>

        <div className="mt-6 space-y-5">
          {application.updates.map((update, index) => (
            <div key={update.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border',
                    getApplicationStatusClasses(update.status)
                  )}
                >
                  <StatusIcon status={update.status} />
                </div>
                {index !== application.updates.length - 1 && (
                  <div className="mt-2 h-10 w-px bg-border" />
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium text-foreground">
                    {getApplicationStatusLabel(update.status, language as Language)}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(update.createdAt).toLocaleString()}
                  </span>
                </div>

                {update.note && (
                  <p className="mt-1 text-sm text-muted-foreground">{update.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: ApplicationStatus }) {
  switch (status) {
    case 'submitted':
      return <FileText className="h-4 w-4" />
    case 'reviewing':
      return <Clock3 className="h-4 w-4" />
    case 'planned':
      return <Calendar className="h-4 w-4" />
    case 'in_progress':
      return <Wrench className="h-4 w-4" />
    case 'resolved':
      return <CheckCircle2 className="h-4 w-4" />
    case 'rejected':
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
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