'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Map, 
  Table2, 
  BarChart3, 
  GitCompare, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/status-badge'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'
import { EmptyState } from '@/components/empty-state'
import { useLanguage, useTranslatedLabel } from '@/lib/language'
import { 
  schools, 
  regions, 
  categories, 
  verifications,
  dashboardSummary,
  compareData 
} from '@/lib/mock-data'
import type { VerificationStatus } from '@/types'
import { cn } from '@/lib/utils'

export default function ResultsPage() {
  const { t, language } = useLanguage()
  const getLabel = useTranslatedLabel()

  // Filter states
  const [region, setRegion] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [search, setSearch] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Compare states
  const [compareItem1, setCompareItem1] = useState<string>('')
  const [compareItem2, setCompareItem2] = useState<string>('')

  const statuses: { value: VerificationStatus; label: string }[] = [
    { value: 'completed', label: t('status.completed') },
    { value: 'problem', label: t('status.problem') },
    { value: 'under_review', label: t('status.under_review') },
    { value: 'not_verified', label: t('status.not_verified') },
  ]

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = !search || 
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.number.toString().includes(search)
      const matchesRegion = !region || region === 'all' || school.region === region
      const matchesStatus = !status || status === 'all' || school.status === status
      return matchesSearch && matchesRegion && matchesStatus
    })
  }, [search, region, status])

  const paginatedSchools = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredSchools.slice(start, start + rowsPerPage)
  }, [filteredSchools, currentPage, rowsPerPage])

  const totalPages = Math.ceil(filteredSchools.length / rowsPerPage)

  const handleClearFilters = () => {
    setRegion('')
    setCategory('')
    setStatus('')
    setSearch('')
  }

  const hasFilters = region || category || status || search

  // Compare data
  const compareData1 = compareData.find(d => d.id === compareItem1)
  const compareData2 = compareData.find(d => d.id === compareItem2)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        title={t('nav.results')}
      />

      <Tabs defaultValue="map" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map" className="gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">{t('results.map')}</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Table2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t('results.data')}</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">{t('results.charts')}</span>
          </TabsTrigger>
          <TabsTrigger value="compare" className="gap-2">
            <GitCompare className="h-4 w-4" />
            <span className="hidden sm:inline">{t('results.compare')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Map Tab */}
        <TabsContent value="map" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Filters Panel */}
            <div className="rounded-xl border border-border bg-card p-4 lg:col-span-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4" />
                {t('results.filters')}
              </div>
              
              <div className="mt-4 space-y-3">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('finder.region')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('finder.allRegions')}</SelectItem>
                    {regions.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {getLabel(r.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('results.category')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('results.allCategories')}</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {getLabel(c.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('finder.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('finder.allStatuses')}</SelectItem>
                    {statuses.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={handleClearFilters}
                  >
                    {t('common.clear')}
                  </Button>
                )}
              </div>

              {/* Stats Preview */}
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('dashboard.totalSchools')}</span>
                  <span className="font-semibold">{filteredSchools.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('status.completed')}</span>
                  <span className="font-semibold text-status-completed">
                    {filteredSchools.filter(s => s.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('status.problem')}</span>
                  <span className="font-semibold text-status-problem">
                    {filteredSchools.filter(s => s.status === 'problem').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/50 lg:aspect-[16/9]">
                {/* Map placeholder - In real app, use Leaflet or similar */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <Map className="h-16 w-16 text-muted-foreground/50" />
                  <p className="mt-4 text-lg font-semibold">Interactive Map</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {language === 'uz' 
                      ? "Xarita Leaflet yoki boshqa kutubxona bilan integratsiya qilinadi" 
                      : language === 'ru'
                      ? "Карта будет интегрирована с Leaflet или другой библиотекой"
                      : "Map will be integrated with Leaflet or similar library"}
                  </p>
                  
                  {/* Mock markers preview */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {filteredSchools.slice(0, 5).map((school) => (
                      <div
                        key={school.id}
                        className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span className="max-w-[120px] truncate">{school.name}</span>
                        <StatusBadge status={school.status} size="sm" showIcon={false} />
                      </div>
                    ))}
                    {filteredSchools.length > 5 && (
                      <span className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                        +{filteredSchools.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="mt-6">
          {/* Table Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('common.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('finder.region')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('finder.allRegions')}</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {getLabel(r.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('finder.status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('finder.allStatuses')}</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.school')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('finder.region')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('finder.status')}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      {t('school.totalReports')}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      {t('admin.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedSchools.map((school) => {
                    const regionLabel = regions.find(r => r.value === school.region)?.label
                    return (
                      <tr key={school.id} className="bg-card hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{school.name}</span>
                            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                              #{school.number}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {regionLabel ? getLabel(regionLabel) : school.region}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={school.status} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-right text-sm">
                          {school.totalReports}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/maktablar/${school.id}`}>
                              {t('school.details')}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t('results.rowsPerPage')}:</span>
                <Select 
                  value={rowsPerPage.toString()} 
                  onValueChange={(v) => {
                    setRowsPerPage(parseInt(v))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {t('common.page')} {currentPage} {t('common.of')} {totalPages}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="mt-6">
          {/* Stats Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t('dashboard.totalSchools')}
              value={dashboardSummary.totalSchools}
              variant="primary"
            />
            <StatCard
              title={t('dashboard.completedWorks')}
              value={dashboardSummary.completedWorks}
              variant="success"
            />
            <StatCard
              title={t('dashboard.problemsFound')}
              value={dashboardSummary.problemsFound}
              variant="danger"
            />
            <StatCard
              title={t('results.reportsWithPhotos')}
              value={`${Math.round((dashboardSummary.reportsWithPhotos / dashboardSummary.totalReports) * 100)}%`}
              variant="accent"
            />
          </div>

          {/* Charts Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Completion by Region */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{t('results.completionRate')}</h3>
              <div className="mt-6 space-y-4">
                {compareData.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.completionRate}%</span>
                    </div>
                    <Progress value={item.completionRate} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reports with Photos */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{t('results.reportsWithPhotos')}</h3>
              <div className="mt-6 space-y-4">
                {compareData.map((item) => {
                  const photoRate = Math.round((item.reportsWithPhotos / item.totalReports) * 100)
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{photoRate}%</span>
                      </div>
                      <Progress value={photoRate} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Problem Distribution */}
            <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
              <h3 className="font-semibold">{t('dashboard.mostReportedIssues')}</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.slice(0, 4).map((cat, index) => {
                  const mockCount = 15 - index * 3
                  return (
                    <div
                      key={cat.value}
                      className="rounded-lg border border-border bg-muted/30 p-4"
                    >
                      <p className="text-2xl font-bold">{mockCount}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {getLabel(cat.label)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Compare Tab */}
        <TabsContent value="compare" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Selection Panel 1 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{t('results.selectFirst')}</h3>
              <Select value={compareItem1} onValueChange={setCompareItem1}>
                <SelectTrigger className="mt-4">
                  <SelectValue placeholder={t('results.selectFirst')} />
                </SelectTrigger>
                <SelectContent>
                  {compareData.map((item) => (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      disabled={item.id === compareItem2}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {compareData1 && (
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{compareData1.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">{t('results.completionRate')}</p>
                  </div>
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.totalPromises')}</span>
                      <span className="font-medium">{compareData1.totalPromises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.completedPromises')}</span>
                      <span className="font-medium text-status-completed">{compareData1.completedPromises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.problemsFound')}</span>
                      <span className="font-medium text-status-problem">{compareData1.problemsFound}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.totalReports')}</span>
                      <span className="font-medium">{compareData1.totalReports}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('results.reportsWithPhotos')}</span>
                      <span className="font-medium">{compareData1.reportsWithPhotos}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selection Panel 2 */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{t('results.selectSecond')}</h3>
              <Select value={compareItem2} onValueChange={setCompareItem2}>
                <SelectTrigger className="mt-4">
                  <SelectValue placeholder={t('results.selectSecond')} />
                </SelectTrigger>
                <SelectContent>
                  {compareData.map((item) => (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      disabled={item.id === compareItem1}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {compareData2 && (
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{compareData2.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">{t('results.completionRate')}</p>
                  </div>
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.totalPromises')}</span>
                      <span className="font-medium">{compareData2.totalPromises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.completedPromises')}</span>
                      <span className="font-medium text-status-completed">{compareData2.completedPromises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.problemsFound')}</span>
                      <span className="font-medium text-status-problem">{compareData2.problemsFound}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('school.totalReports')}</span>
                      <span className="font-medium">{compareData2.totalReports}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('results.reportsWithPhotos')}</span>
                      <span className="font-medium">{compareData2.reportsWithPhotos}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comparison Visual */}
          {compareData1 && compareData2 && (
            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-center mb-6">
                {compareData1.name} vs {compareData2.name}
              </h3>
              <div className="space-y-6">
                {/* Completion Rate Comparison */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('results.completionRate')}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-right">
                      <span className="text-xl font-bold">{compareData1.completionRate}%</span>
                    </div>
                    <div className="w-40 h-4 bg-muted rounded-full overflow-hidden flex">
                      <div 
                        className="bg-primary h-full"
                        style={{ width: `${(compareData1.completionRate / (compareData1.completionRate + compareData2.completionRate)) * 100}%` }}
                      />
                      <div 
                        className="bg-accent h-full"
                        style={{ width: `${(compareData2.completionRate / (compareData1.completionRate + compareData2.completionRate)) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xl font-bold">{compareData2.completionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Total Reports Comparison */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('school.totalReports')}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-right">
                      <span className="text-xl font-bold">{compareData1.totalReports}</span>
                    </div>
                    <div className="w-40 h-4 bg-muted rounded-full overflow-hidden flex">
                      <div 
                        className="bg-primary h-full"
                        style={{ width: `${(compareData1.totalReports / (compareData1.totalReports + compareData2.totalReports)) * 100}%` }}
                      />
                      <div 
                        className="bg-accent h-full"
                        style={{ width: `${(compareData2.totalReports / (compareData1.totalReports + compareData2.totalReports)) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xl font-bold">{compareData2.totalReports}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
