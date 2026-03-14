'use client'

import { useState, useMemo } from 'react'
import { Search, Grid3X3, List, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SchoolCard } from '@/components/school-card'
import { SectionHeader } from '@/components/section-header'
import { EmptyState } from '@/components/empty-state'
import { useLanguage, useTranslatedLabel } from '@/lib/language'
import { schools, regions, districts } from '@/lib/mock-data'
import type { VerificationStatus } from '@/types'

export default function SchoolsPage() {
  const { t } = useLanguage()
  const getLabel = useTranslatedLabel()
  
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredDistricts = useMemo(() => {
    if (!region || region === 'all') return districts
    return districts.filter(d => d.regionValue === region)
  }, [region])

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = !search || 
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.number.toString().includes(search)
      const matchesRegion = !region || region === 'all' || school.region === region
      const matchesDistrict = !district || district === 'all' || school.district === district
      const matchesStatus = !status || status === 'all' || school.status === status
      return matchesSearch && matchesRegion && matchesDistrict && matchesStatus
    })
  }, [search, region, district, status])

  const handleClear = () => {
    setSearch('')
    setRegion('')
    setDistrict('')
    setStatus('')
  }

  const statuses: { value: VerificationStatus; label: string }[] = [
    { value: 'completed', label: t('status.completed') },
    { value: 'problem', label: t('status.problem') },
    { value: 'under_review', label: t('status.under_review') },
    { value: 'not_verified', label: t('status.not_verified') },
  ]

  const hasFilters = search || region || district || status

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        title={t('nav.schools')}
        description={`${schools.length} ${t('school.reports').replace('hisobotlar', 'maktab').replace('отчётов', 'школ').replace('reports', 'schools')}`}
      />

      {/* Filters */}
      <div className="mt-8 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="h-4 w-4" />
          {t('results.filters')}
        </div>
        
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('finder.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Region */}
          <Select value={region} onValueChange={(val) => {
            setRegion(val)
            setDistrict('')
          }}>
            <SelectTrigger>
              <SelectValue placeholder={t('finder.allRegions')} />
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

          {/* District */}
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger>
              <SelectValue placeholder={t('finder.allDistricts')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('finder.allDistricts')}</SelectItem>
              {filteredDistricts.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {getLabel(d.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder={t('finder.allStatuses')} />
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

        {/* Filter Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={handleClear}>
                {t('common.clear')}
              </Button>
            )}
            <span className="text-sm text-muted-foreground">
              {filteredSchools.length} {t('school.reports').replace('hisobotlar', 'natija').replace('отчётов', 'результатов').replace('reports', 'results')}
            </span>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">{t('common.gridView')}</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">{t('common.listView')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Schools Grid/List */}
      <div className="mt-8">
        {filteredSchools.length === 0 ? (
          <EmptyState
            type="no-results"
            action={hasFilters ? {
              label: t('common.clear'),
              onClick: handleClear
            } : undefined}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
