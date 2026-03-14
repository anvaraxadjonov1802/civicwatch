'use client'

import Link from 'next/link'
import { 
  School, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  ImageIcon,
  UserCheck,
  Clock,
  ArrowRight,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { SectionHeader } from '@/components/section-header'
import { useLanguage } from '@/lib/language'
import { 
  dashboardSummary, 
  schools, 
  verifications,
  categories 
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { t, language } = useLanguage()

  // Get problematic schools (status = problem)
  const problematicSchools = schools.filter(s => s.status === 'problem').slice(0, 5)

  // Get recent reports
  const recentReports = verifications.slice(0, 5)

  // Calculate credibility indicators
  const photoRate = Math.round((dashboardSummary.reportsWithPhotos / dashboardSummary.totalReports) * 100)
  const reviewedRate = Math.round((dashboardSummary.reviewedReports / dashboardSummary.totalReports) * 100)
  const verifiedUserRate = Math.round((dashboardSummary.verifiedUserReports / dashboardSummary.totalReports) * 100)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        title={t('dashboard.title')}
      />

      {/* Main KPI Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('dashboard.totalSchools')}
          value={dashboardSummary.totalSchools}
          icon={School}
          variant="primary"
          trend={{ value: 8, isPositive: true }}
          description={t('common.loading').replace('...', '')}
        />
        <StatCard
          title={t('dashboard.totalReports')}
          value={dashboardSummary.totalReports}
          icon={FileText}
          variant="accent"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.completedWorks')}
          value={dashboardSummary.completedWorks}
          icon={CheckCircle2}
          variant="success"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.problemsFound')}
          value={dashboardSummary.problemsFound}
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          {/* Problematic Schools */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-semibold">{t('dashboard.problematicSchools')}</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/maktablar">
                  {t('hero.viewSchools')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-border">
              {problematicSchools.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {t('common.noResults')}
                </div>
              ) : (
                problematicSchools.map((school) => (
                  <div
                    key={school.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{school.name}</span>
                        <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs">
                          #{school.number}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {school.problemsFound} {t('dashboard.problemsFound').toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={school.status} size="sm" />
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/maktablar/${school.id}`}>
                          {t('school.details')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Most Reported Issues */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">{t('dashboard.mostReportedIssues')}</h3>
            <div className="mt-6 space-y-4">
              {categories.slice(0, 5).map((category, index) => {
                const mockCount = 25 - index * 4
                const percentage = Math.round((mockCount / 25) * 100)
                return (
                  <div key={category.value} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {language === 'uz' ? category.label.uz : language === 'ru' ? category.label.ru : category.label.en}
                      </span>
                      <span className="font-medium">{mockCount}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="font-semibold">{t('dashboard.recentReports')}</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/natijalar">
                  {t('hero.viewResults')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start gap-4 p-4 hover:bg-muted/30"
                >
                  <div
                    className={cn(
                      'mt-0.5 rounded-full p-2',
                      report.result === 'completed'
                        ? 'bg-status-completed/10 text-status-completed'
                        : report.result === 'problem'
                        ? 'bg-status-problem/10 text-status-problem'
                        : 'bg-status-review/10 text-status-review'
                    )}
                  >
                    {report.result === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : report.result === 'problem' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{report.promiseTitle}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground truncate">
                      {report.schoolName}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.createdAt)}
                      </div>
                      {report.images.length > 0 && (
                        <div className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          {report.images.length}
                        </div>
                      )}
                      {report.isVerifiedUser && (
                        <div className="flex items-center gap-1 text-primary">
                          <UserCheck className="h-3 w-3" />
                          {report.userName}
                        </div>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={report.result} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Credibility Indicators */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">{t('dashboard.credibilityIndicators')}</h3>
            <div className="mt-6 space-y-6">
              {/* Photos Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{t('dashboard.reportsWithPhotos')}</span>
                  </div>
                  <span className="font-semibold">{photoRate}%</span>
                </div>
                <Progress value={photoRate} className="h-2" />
              </div>

              {/* Reviewed Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>{t('dashboard.reviewedReports')}</span>
                  </div>
                  <span className="font-semibold">{reviewedRate}%</span>
                </div>
                <Progress value={reviewedRate} className="h-2" />
              </div>

              {/* Verified Users Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span>{t('dashboard.verifiedUsers')}</span>
                  </div>
                  <span className="font-semibold">{verifiedUserRate}%</span>
                </div>
                <Progress value={verifiedUserRate} className="h-2" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">
              {language === 'uz' ? "Tezkor statistika" : language === 'ru' ? "Быстрая статистика" : "Quick Stats"}
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('status.completed')}</span>
                <span className="font-semibold text-status-completed">
                  {schools.filter(s => s.status === 'completed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('status.problem')}</span>
                <span className="font-semibold text-status-problem">
                  {schools.filter(s => s.status === 'problem').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('status.under_review')}</span>
                <span className="font-semibold text-status-review">
                  {schools.filter(s => s.status === 'under_review').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('status.not_verified')}</span>
                <span className="font-semibold text-muted-foreground">
                  {schools.filter(s => s.status === 'not_verified').length}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <TrendingUp className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">{t('hero.title')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/maktablar">
                {t('hero.viewSchools')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
