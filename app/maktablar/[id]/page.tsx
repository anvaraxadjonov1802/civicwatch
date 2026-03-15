'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, FileText, CheckCircle, AlertTriangle, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { getSchoolById, getDistrictById, getRegionById, getReportsBySchool, taskTypes } from '@/lib/mock-data'
import type { Language } from '@/types'
import { cn } from '@/lib/utils'

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t, language } = useTranslation()

  const school = getSchoolById(id)

  if (!school) {
    notFound()
  }

  const district = getDistrictById(school.districtId)
  const region = getRegionById(school.regionId)
  const reports = getReportsBySchool(school.id)

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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back button */}
      <Link
        href="/maktablar"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      {/* Hero Section */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Image */}
        <div className="relative aspect-[21/9] bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-24 w-24 text-primary/20"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>
          {/* Status badge */}
          <span
            className={cn(
              'absolute right-4 top-4 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm',
              statusColors[school.status]
            )}
          >
            {statusLabels[school.status]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">#{school.number}</p>
              <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                {school.name[language as Language]}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {district?.name[language as Language]}, {region?.name[language as Language]}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {school.address[language as Language]}
              </p>
            </div>

            <Link href={`/tekshirish/${school.id}`}>
              <Button size="lg" className="h-12 shrink-0 gap-2 px-6 text-base">
                {t('schoolDetail.reportCondition')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          value={school.totalReports}
          label={t('schoolDetail.totalReports')}
          color="primary"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          value={school.completedTasks}
          label={t('schoolDetail.completedTasks')}
          color="success"
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          value={school.pendingIssues}
          label={t('schoolDetail.pendingIssues')}
          color="warning"
        />
      </div>

      {/* Recent Reports */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('schoolDetail.recentReports')}
        </h2>

        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((report) => {
              const task = taskTypes.find((t) => t.id === report.taskType)
              return (
                <div
                  key={report.id}
                  className="rounded-xl border border-border bg-card p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">
                          {task?.name[language as Language]}
                        </span>
                        <span
                          className={cn(
                            'rounded-full border px-2 py-0.5 text-xs font-medium',
                            report.result === 'completed'
                              ? 'bg-success/15 text-success border-success/30'
                              : 'bg-destructive/15 text-destructive border-destructive/30'
                          )}
                        >
                          {report.result === 'completed'
                            ? t('report.completed')
                            : t('report.hasIssue')}
                        </span>
                        {report.verified && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {t('admin.verified')}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {report.comment}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(report.createdAt).toLocaleDateString(
                        language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US'
                      )}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">{t('common.noResults')}</p>
          </div>
        )}
      </section>

      {/* Planned Tasks */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          {t('schoolDetail.plannedTasks')}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {taskTypes.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="font-medium text-foreground">
                {task.name[language as Language]}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('status.pending')}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: number
  label: string
  color: 'primary' | 'success' | 'warning'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning-foreground',
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className={cn('rounded-lg p-2', colorClasses[color])}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
