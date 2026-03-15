'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Map, Table, BarChart3, GitCompare, ChevronDown, MapPin, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { schools, regions, statistics, getDistrictById, getRegionById } from '@/lib/mock-data'
import type { Language, School } from '@/types'
import { cn, formatNumber } from '@/lib/utils'

type Tab = 'map' | 'table' | 'charts' | 'compare'

export default function ResultsPage() {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('map')

  const tabs = [
    { id: 'map' as const, label: t('results.map'), icon: Map },
    { id: 'table' as const, label: t('results.table'), icon: Table },
    { id: 'charts' as const, label: t('results.charts'), icon: BarChart3 },
    { id: 'compare' as const, label: t('results.compare'), icon: GitCompare },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('results.title')}
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex overflow-x-auto rounded-xl border border-border bg-muted/50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'map' && <MapTab language={language as Language} t={t} />}
      {activeTab === 'table' && <TableTab language={language as Language} t={t} />}
      {activeTab === 'charts' && <ChartsTab language={language as Language} t={t} />}
      {activeTab === 'compare' && <CompareTab language={language as Language} t={t} />}
    </div>
  )
}

function MapTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesRegion = !selectedRegion || school.regionId === selectedRegion
      const matchesStatus = !selectedStatus || school.status === selectedStatus
      return matchesRegion && matchesStatus
    })
  }, [selectedRegion, selectedStatus])

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Filters */}
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Filters</h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('finder.region')}
              </label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">{t('finder.all')}</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name[language]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('finder.status')}
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">{t('finder.all')}</option>
                  <option value="good">{t('status.good')}</option>
                  <option value="issue">{t('status.issue')}</option>
                  <option value="pending">{t('status.pending')}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Schools list */}
          <div className="mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              {filteredSchools.length} {t('nav.schools').toLowerCase()}
            </p>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {filteredSchools.slice(0, 10).map((school) => (
                <SchoolMapItem key={school.id} school={school} language={language} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="lg:col-span-2">
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Map className="mx-auto h-16 w-16 text-primary/30" />
              <p className="mt-4 text-muted-foreground">
                {language === 'uz'
                  ? 'Interaktiv xarita'
                  : language === 'ru'
                  ? 'Интерактивная карта'
                  : 'Interactive Map'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {language === 'uz'
                  ? 'Maktablar joylashuvini ko\'ring'
                  : language === 'ru'
                  ? 'Посмотрите расположение школ'
                  : 'View school locations'}
              </p>

              {/* Map markers simulation */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {filteredSchools.slice(0, 5).map((school) => (
                  <div
                    key={school.id}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium',
                      school.status === 'good'
                        ? 'bg-success/20 text-success'
                        : school.status === 'issue'
                        ? 'bg-destructive/20 text-destructive'
                        : 'bg-warning/20 text-warning-foreground'
                    )}
                  >
                    <MapPin className="h-3 w-3" />
                    #{school.number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SchoolMapItem({
  school,
  language,
  t,
}: {
  school: School
  language: Language
  t: (key: string) => string
}) {
  const district = getDistrictById(school.districtId)

  const statusColors = {
    good: 'bg-success',
    issue: 'bg-destructive',
    pending: 'bg-warning',
    unknown: 'bg-muted-foreground',
  }

  return (
    <Link
      href={`/maktablar/${school.id}`}
      className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:bg-muted"
    >
      <div className={cn('h-3 w-3 rounded-full', statusColors[school.status])} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          #{school.number} - {school.name[language]}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {district?.name[language]}
        </p>
      </div>
      <span className="text-xs text-muted-foreground">
        {school.totalReports} {t('schoolCard.reports')}
      </span>
    </Link>
  )
}

function TableTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  const filteredSchools = useMemo(() => {
    return schools.filter(
      (school) =>
        school.number.includes(search) ||
        school.name[language].toLowerCase().includes(search.toLowerCase())
    )
  }, [search, language])

  const totalPages = Math.ceil(filteredSchools.length / perPage)
  const paginatedSchools = filteredSchools.slice((page - 1) * perPage, page * perPage)

  const statusLabels = {
    good: t('status.good'),
    issue: t('status.issue'),
    pending: t('status.pending'),
    unknown: t('status.unknown'),
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Search */}
      <div className="border-b border-border p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder={t('finder.schoolNameOrNumber')}
          className="h-11 w-full max-w-sm rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
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
                {t('finder.district')}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                {t('finder.status')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                {t('dashboard.totalReports')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedSchools.map((school) => {
              const district = getDistrictById(school.districtId)
              return (
                <tr key={school.id} className="hover:bg-muted/30">
                  <td className="px-4 py-4 text-sm font-medium text-primary">
                    {school.number}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">
                      {school.name[language]}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {district?.name[language]}
                  </td>
                  <td className="px-4 py-4">
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
                      {statusLabels[school.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-foreground">
                    {school.totalReports}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/maktablar/${school.id}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <p className="text-sm text-muted-foreground">
          {filteredSchools.length} {t('nav.schools').toLowerCase()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {t('common.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChartsTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const statusCounts = useMemo(() => {
    return schools.reduce(
      (acc, school) => {
        acc[school.status] = (acc[school.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  }, [])

  const topRegions = statistics.topRegions.slice(0, 5).map((tr) => {
    const region = getRegionById(tr.regionId)
    return {
      name: region?.name[language] || tr.regionId,
      count: tr.reportsCount,
    }
  })

  const maxReports = Math.max(...topRegions.map((r) => r.count))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Status Distribution */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 font-semibold text-foreground">
          {language === 'uz'
            ? 'Holatlar taqsimoti'
            : language === 'ru'
            ? 'Распределение статусов'
            : 'Status Distribution'}
        </h3>

        <div className="space-y-4">
          {Object.entries(statusCounts).map(([status, count]) => {
            const total = schools.length
            const percentage = Math.round((count / total) * 100)

            const colors = {
              good: 'bg-success',
              issue: 'bg-destructive',
              pending: 'bg-warning',
              unknown: 'bg-muted',
            }

            const labels = {
              good: t('status.good'),
              issue: t('status.issue'),
              pending: t('status.pending'),
              unknown: t('status.unknown'),
            }

            return (
              <div key={status}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground">{labels[status as keyof typeof labels]}</span>
                  <span className="font-medium text-foreground">{percentage}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full', colors[status as keyof typeof colors])}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Regions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 font-semibold text-foreground">{t('dashboard.topRegions')}</h3>

        <div className="space-y-4">
          {topRegions.map((region, index) => (
            <div key={region.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  {region.name}
                </span>
                <span className="font-medium text-foreground">
                  {formatNumber(region.count)}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(region.count / maxReports) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 font-semibold text-foreground">
          {language === 'uz'
            ? 'Umumiy statistika'
            : language === 'ru'
            ? 'Общая статистика'
            : 'Overall Statistics'}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <StatBox
            value={formatNumber(statistics.totalReports)}
            label={t('dashboard.totalReports')}
            color="primary"
          />
          <StatBox
            value={formatNumber(statistics.completedTasks)}
            label={t('dashboard.completedTasks')}
            color="success"
          />
          <StatBox
            value={formatNumber(statistics.pendingIssues)}
            label={t('dashboard.pendingIssues')}
            color="warning"
          />
          <StatBox
            value={`${Math.round((statistics.reportsWithImages / statistics.totalReports) * 100)}%`}
            label={
              language === 'uz'
                ? 'Suratli xabarlar'
                : language === 'ru'
                ? 'С фотографиями'
                : 'With photos'
            }
            color="info"
          />
        </div>
      </div>

      {/* Reports Trend - Placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 font-semibold text-foreground">
          {language === 'uz'
            ? 'Xabarlar dinamikasi'
            : language === 'ru'
            ? 'Динамика сообщений'
            : 'Reports Trend'}
        </h3>

        <div className="flex h-48 items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-primary/30" />
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'uz'
                ? 'Grafik ma\'lumotlar'
                : language === 'ru'
                ? 'Графические данные'
                : 'Chart data'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({
  value,
  label,
  color,
}: {
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
    <div className={cn('rounded-xl p-4', colorClasses[color])}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm opacity-80">{label}</p>
    </div>
  )
}

function CompareTab({ language, t }: { language: Language; t: (key: string) => string }) {
  const [school1, setSchool1] = useState('')
  const [school2, setSchool2] = useState('')

  const selectedSchool1 = schools.find((s) => s.id === school1)
  const selectedSchool2 = schools.find((s) => s.id === school2)

  return (
    <div>
      {/* Selector */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {language === 'uz'
              ? '1-maktab'
              : language === 'ru'
              ? 'Школа 1'
              : 'School 1'}
          </label>
          <div className="relative">
            <select
              value={school1}
              onChange={(e) => setSchool1(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">
                {language === 'uz'
                  ? 'Maktabni tanlang'
                  : language === 'ru'
                  ? 'Выберите школу'
                  : 'Select school'}
              </option>
              {schools.map((school) => (
                <option key={school.id} value={school.id} disabled={school.id === school2}>
                  #{school.number} - {school.name[language]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {language === 'uz'
              ? '2-maktab'
              : language === 'ru'
              ? 'Школа 2'
              : 'School 2'}
          </label>
          <div className="relative">
            <select
              value={school2}
              onChange={(e) => setSchool2(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">
                {language === 'uz'
                  ? 'Maktabni tanlang'
                  : language === 'ru'
                  ? 'Выберите школу'
                  : 'Select school'}
              </option>
              {schools.map((school) => (
                <option key={school.id} value={school.id} disabled={school.id === school1}>
                  #{school.number} - {school.name[language]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Comparison */}
      {selectedSchool1 && selectedSchool2 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <CompareCard school={selectedSchool1} language={language} t={t} />
          <CompareCard school={selectedSchool2} language={language} t={t} />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <GitCompare className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            {language === 'uz'
              ? 'Solishtirish uchun ikkita maktabni tanlang'
              : language === 'ru'
              ? 'Выберите две школы для сравнения'
              : 'Select two schools to compare'}
          </p>
        </div>
      )}
    </div>
  )
}

function CompareCard({
  school,
  language,
  t,
}: {
  school: School
  language: Language
  t: (key: string) => string
}) {
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

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary">#{school.number}</p>
          <h3 className="mt-1 font-semibold text-foreground">{school.name[language]}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {district?.name[language]}
          </p>
        </div>
        <span
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium',
            statusColors[school.status]
          )}
        >
          {statusLabels[school.status]}
        </span>
      </div>

      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t('dashboard.totalReports')}
          </span>
          <span className="font-semibold text-foreground">{school.totalReports}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t('dashboard.completedTasks')}
          </span>
          <span className="font-semibold text-success">{school.completedTasks}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t('dashboard.pendingIssues')}
          </span>
          <span className="font-semibold text-destructive">{school.pendingIssues}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {language === 'uz'
              ? 'Bajarilish darajasi'
              : language === 'ru'
              ? 'Уровень выполнения'
              : 'Completion rate'}
          </span>
          <span className="font-semibold text-primary">
            {school.totalReports > 0
              ? Math.round((school.completedTasks / school.totalReports) * 100)
              : 0}
            %
          </span>
        </div>
      </div>

      <Link href={`/maktablar/${school.id}`} className="mt-4 block">
        <Button variant="outline" className="w-full">
          {t('schoolCard.details')}
        </Button>
      </Link>
    </div>
  )
}
