'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  School,
  Users,
  Check,
  X,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { reports, schools, statistics, getSchoolById, taskTypes } from '@/lib/mock-data'
import type { Language } from '@/types'
import { cn, formatNumber } from '@/lib/utils'

type Tab = 'overview' | 'reports' | 'schools' | 'users'

export default function AdminPage() {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'reports' as const, label: t('admin.reports'), icon: FileText },
    { id: 'schools' as const, label: t('admin.schools'), icon: School },
    { id: 'users' as const, label: t('admin.users'), icon: Users },
  ]

  const pendingReports = reports.filter((r) => !r.verified)
  const verifiedReports = reports.filter((r) => r.verified)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('admin.title')}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {language === 'uz'
                  ? 'Xabarlarni boshqarish va tasdiqlash'
                  : language === 'ru'
                  ? 'Управление и модерация сообщений'
                  : 'Manage and moderate reports'}
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                {language === 'uz'
                  ? 'Saytga qaytish'
                  : language === 'ru'
                  ? 'Вернуться на сайт'
                  : 'Back to site'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            language={language as Language}
            t={t}
            pendingCount={pendingReports.length}
            verifiedCount={verifiedReports.length}
          />
        )}
        {activeTab === 'reports' && (
          <ReportsTab language={language as Language} t={t} />
        )}
        {activeTab === 'schools' && (
          <SchoolsTab language={language as Language} t={t} />
        )}
        {activeTab === 'users' && (
          <UsersTab language={language as Language} t={t} />
        )}
      </div>
    </div>
  )
}

function OverviewTab({
  language,
  t,
  pendingCount,
  verifiedCount,
}: {
  language: Language
  t: (key: string) => string
  pendingCount: number
  verifiedCount: number
}) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          icon={<FileText className="h-5 w-5" />}
          value={formatNumber(statistics.totalReports)}
          label={t('dashboard.totalReports')}
          color="primary"
        />
        <AdminStatCard
          icon={<Clock className="h-5 w-5" />}
          value={formatNumber(pendingCount)}
          label={t('admin.pending')}
          color="warning"
        />
        <AdminStatCard
          icon={<CheckCircle className="h-5 w-5" />}
          value={formatNumber(verifiedCount)}
          label={t('admin.verified')}
          color="success"
        />
        <AdminStatCard
          icon={<School className="h-5 w-5" />}
          value={formatNumber(statistics.totalSchools)}
          label={t('dashboard.totalSchools')}
          color="info"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">
            {language === 'uz'
              ? 'Bugungi faollik'
              : language === 'ru'
              ? 'Активность за сегодня'
              : "Today's Activity"}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'uz'
                  ? 'Yangi xabarlar'
                  : language === 'ru'
                  ? 'Новые сообщения'
                  : 'New reports'}
              </span>
              <span className="text-xl font-bold text-primary">+24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'uz'
                  ? 'Tasdiqlangan'
                  : language === 'ru'
                  ? 'Подтверждено'
                  : 'Verified'}
              </span>
              <span className="text-xl font-bold text-success">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {language === 'uz'
                  ? 'Rad etilgan'
                  : language === 'ru'
                  ? 'Отклонено'
                  : 'Rejected'}
              </span>
              <span className="text-xl font-bold text-destructive">2</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">
            {language === 'uz'
              ? 'Tez harakatlar'
              : language === 'ru'
              ? 'Быстрые действия'
              : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Clock className="h-5 w-5" />
              <span className="text-xs">
                {language === 'uz'
                  ? 'Kutilayotganlar'
                  : language === 'ru'
                  ? 'Ожидающие'
                  : 'Pending'}
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">
                {language === 'uz'
                  ? 'Statistika'
                  : language === 'ru'
                  ? 'Статистика'
                  : 'Statistics'}
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <School className="h-5 w-5" />
              <span className="text-xs">
                {language === 'uz'
                  ? 'Maktablar'
                  : language === 'ru'
                  ? 'Школы'
                  : 'Schools'}
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Users className="h-5 w-5" />
              <span className="text-xs">
                {language === 'uz'
                  ? 'Foydalanuvchilar'
                  : language === 'ru'
                  ? 'Пользователи'
                  : 'Users'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReportsTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all')
  const [search, setSearch] = useState('')

  const filteredReports = reports.filter((report) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && !report.verified) ||
      (filter === 'verified' && report.verified)
    return matchesFilter
  })

  const handleApprove = (reportId: string) => {
    console.log('[v0] Approving report:', reportId)
  }

  const handleReject = (reportId: string) => {
    console.log('[v0] Rejecting report:', reportId)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === 'uz'
                ? 'Qidirish...'
                : language === 'ru'
                ? 'Поиск...'
                : 'Search...'
            }
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t('finder.all')}
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              filter === 'pending'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t('admin.pending')}
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              filter === 'verified'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t('admin.verified')}
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('report.school')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('report.taskType')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('report.result')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('finder.status')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {language === 'uz' ? 'Sana' : language === 'ru' ? 'Дата' : 'Date'}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {language === 'uz'
                  ? 'Amallar'
                  : language === 'ru'
                  ? 'Действия'
                  : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredReports.map((report) => {
              const school = getSchoolById(report.schoolId)
              const task = taskTypes.find((t) => t.id === report.taskType)
              return (
                <tr key={report.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                    #{report.id}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      #{school?.number} - {school?.name[language]}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {task?.name[language]}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                        report.result === 'completed'
                          ? 'bg-success/15 text-success'
                          : 'bg-destructive/15 text-destructive'
                      )}
                    >
                      {report.result === 'completed' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {report.result === 'completed'
                        ? t('report.completed')
                        : t('report.hasIssue')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                        report.verified
                          ? 'bg-success/15 text-success'
                          : 'bg-warning/15 text-warning-foreground'
                      )}
                    >
                      {report.verified ? t('admin.verified') : t('admin.pending')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(report.createdAt).toLocaleDateString(
                        language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US'
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!report.verified && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-success hover:text-success"
                            onClick={() => handleApprove(report.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleReject(report.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SchoolsTab({ language, t }: { language: Language; t: (key: string) => string }) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('report.school')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('finder.status')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('dashboard.totalReports')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('dashboard.completedTasks')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('dashboard.pendingIssues')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium text-primary">
                  {school.number}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {school.name[language]}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
                      school.status === 'good'
                        ? 'bg-success/15 text-success'
                        : school.status === 'issue'
                        ? 'bg-destructive/15 text-destructive'
                        : 'bg-warning/15 text-warning-foreground'
                    )}
                  >
                    {school.status === 'good'
                      ? t('status.good')
                      : school.status === 'issue'
                      ? t('status.issue')
                      : t('status.pending')}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-foreground">
                  {school.totalReports}
                </td>
                <td className="px-4 py-3 text-right text-sm text-success">
                  {school.completedTasks}
                </td>
                <td className="px-4 py-3 text-right text-sm text-destructive">
                  {school.pendingIssues}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UsersTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const mockUsers = [
    { id: '1', name: 'Aziza M.', reports: 42, verified: 38, points: 450 },
    { id: '2', name: 'Bobur K.', reports: 35, verified: 30, points: 380 },
    { id: '3', name: 'Dilnoza S.', reports: 28, verified: 25, points: 320 },
    { id: '4', name: 'Eldor N.', reports: 25, verified: 20, points: 290 },
    { id: '5', name: 'Feruza A.', reports: 22, verified: 18, points: 250 },
  ]

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {language === 'uz' ? 'Foydalanuvchi' : language === 'ru' ? 'Пользователь' : 'User'}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('dashboard.totalReports')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('admin.verified')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {language === 'uz' ? 'Ballar' : language === 'ru' ? 'Баллы' : 'Points'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-sm text-foreground">
                  {user.reports}
                </td>
                <td className="px-4 py-3 text-right text-sm text-success">
                  {user.verified}
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminStatCard({
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
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className={cn('rounded-lg p-2.5', colorClasses[color])}>{icon}</div>
        <div>
          <p className="text-xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
