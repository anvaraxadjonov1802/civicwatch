'use client'

import Link from 'next/link'
import {
  School,
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Star,
  Trophy,
  Target,
  Medal,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { statistics, leaderboard, mockUser, defaultBadges, regions, getRegionById } from '@/lib/mock-data'
import type { Language } from '@/types'
import { cn, formatNumber } from '@/lib/utils'

export default function DashboardPage() {
  const { t, language } = useTranslation()

  const topRegions = statistics.topRegions.slice(0, 5).map((tr) => {
    const region = getRegionById(tr.regionId)
    return {
      name: region?.name[language as Language] || tr.regionId,
      count: tr.reportsCount,
    }
  })

  const maxReports = Math.max(...topRegions.map((r) => r.count))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('dashboard.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {language === 'uz'
            ? 'Platformaning umumiy ko\'rsatkichlari va jamoaviy faollik'
            : language === 'ru'
            ? 'Общие показатели платформы и активность сообщества'
            : 'Overall platform metrics and community activity'}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<School className="h-6 w-6" />}
          value={formatNumber(statistics.totalSchools)}
          label={t('dashboard.totalSchools')}
          color="primary"
        />
        <StatCard
          icon={<FileText className="h-6 w-6" />}
          value={formatNumber(statistics.totalReports)}
          label={t('dashboard.totalReports')}
          color="info"
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6" />}
          value={formatNumber(statistics.completedTasks)}
          label={t('dashboard.completedTasks')}
          color="success"
        />
        <StatCard
          icon={<AlertTriangle className="h-6 w-6" />}
          value={formatNumber(statistics.pendingIssues)}
          label={t('dashboard.pendingIssues')}
          color="warning"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Contribution Section */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {t('dashboard.myContribution')}
            </h2>
            <Link href="/maktablar" className="text-sm text-primary hover:underline">
              {language === 'uz'
                ? 'Xabar yuborish'
                : language === 'ru'
                ? 'Отправить сообщение'
                : 'Send report'}
            </Link>
          </div>

          {/* User Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-primary/10 p-4 text-center">
              <p className="text-2xl font-bold text-primary">{mockUser.totalReports}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('dashboard.totalReports')}
              </p>
            </div>
            <div className="rounded-xl bg-success/10 p-4 text-center">
              <p className="text-2xl font-bold text-success">{mockUser.verifiedReports}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('admin.verified')}
              </p>
            </div>
            <div className="rounded-xl bg-warning/10 p-4 text-center">
              <p className="text-2xl font-bold text-warning-foreground">{mockUser.points}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {language === 'uz' ? 'Ballar' : language === 'ru' ? 'Баллы' : 'Points'}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              {language === 'uz'
                ? 'Mening yutuqlarim'
                : language === 'ru'
                ? 'Мои достижения'
                : 'My Achievements'}
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {mockUser.badges.map((badge, index) => {
                const icons = [Star, Target, CheckCircle, Trophy]
                const Icon = icons[index % icons.length]
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      'flex flex-col items-center rounded-xl p-3 text-center transition-colors',
                      badge.unlocked
                        ? 'bg-primary/10'
                        : 'bg-muted opacity-50'
                    )}
                  >
                    <div
                      className={cn(
                        'mb-2 flex h-10 w-10 items-center justify-center rounded-xl',
                        badge.unlocked
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted-foreground/20 text-muted-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium text-foreground line-clamp-2">
                      {badge.name[language as Language]}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress to next badge */}
          <div className="mt-6 rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {t('success.progressMessage', {
                    count: 2,
                    badge: defaultBadges[1].name[language as Language],
                  })}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-3/5 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Activity */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            {t('dashboard.communityActivity')}
          </h2>

          {/* Top Users */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              {t('dashboard.topUsers')}
            </h3>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((entry, index) => {
                const medals = [
                  { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                  { color: 'text-gray-400', bg: 'bg-gray-400/10' },
                  { color: 'text-amber-600', bg: 'bg-amber-600/10' },
                ]
                const medalStyle = medals[index] || {
                  color: 'text-muted-foreground',
                  bg: 'bg-muted',
                }

                return (
                  <div
                    key={entry.userId}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                        medalStyle.bg,
                        medalStyle.color
                      )}
                    >
                      {index < 3 ? (
                        <Medal className="h-4 w-4" />
                      ) : (
                        entry.rank
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{entry.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.reportsCount} {t('schoolCard.reports')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{entry.points}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'uz' ? 'ball' : language === 'ru' ? 'баллов' : 'pts'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Top Regions */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            {t('dashboard.topRegions')}
          </h2>

          <div className="space-y-4">
            {topRegions.map((region, index) => (
              <div key={region.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                    {region.name}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatNumber(region.count)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(region.count / maxReports) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Summary */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            {language === 'uz'
              ? 'Faollik xulosasi'
              : language === 'ru'
              ? 'Сводка активности'
              : 'Activity Summary'}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20 text-success">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {Math.round((statistics.completedTasks / statistics.totalReports) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz'
                      ? 'Bajarilish darajasi'
                      : language === 'ru'
                      ? 'Уровень выполнения'
                      : 'Completion rate'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/20 text-info">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{statistics.activeRegions}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz'
                      ? 'Faol hududlar'
                      : language === 'ru'
                      ? 'Активных регионов'
                      : 'Active regions'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {Math.round((statistics.reportsWithImages / statistics.totalReports) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'uz'
                      ? 'Suratli xabarlar'
                      : language === 'ru'
                      ? 'С фотографиями'
                      : 'With photos'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/natijalar" className="mt-6 block">
            <Button variant="outline" className="w-full">
              {t('hero.viewResults')}
            </Button>
          </Link>
        </section>
      </div>
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
  value: string
  label: string
  color: 'primary' | 'success' | 'warning' | 'info'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning-foreground',
    info: 'bg-info/10 text-info',
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <div className={cn('rounded-xl p-3', colorClasses[color])}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
