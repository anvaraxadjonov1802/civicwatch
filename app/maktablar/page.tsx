'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronDown, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { schools, regions, getDistrictsByRegion } from '@/lib/mock-data'
import { SchoolCard } from '@/components/school-card'
import type { Language } from '@/types'
import { cn } from '@/lib/utils'

export default function SchoolsPage() {
  const { t, language } = useTranslation()
  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const districts = useMemo(() => {
    if (!selectedRegion) return []
    return getDistrictsByRegion(selectedRegion)
  }, [selectedRegion])

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesQuery =
        !query ||
        school.number.includes(query) ||
        school.name[language as Language].toLowerCase().includes(query.toLowerCase())

      const matchesRegion = !selectedRegion || school.regionId === selectedRegion
      const matchesDistrict = !selectedDistrict || school.districtId === selectedDistrict
      const matchesStatus = !selectedStatus || school.status === selectedStatus

      return matchesQuery && matchesRegion && matchesDistrict && matchesStatus
    })
  }, [query, selectedRegion, selectedDistrict, selectedStatus, language])

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId)
    setSelectedDistrict('')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('nav.schools')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filteredSchools.length} {t('schoolCard.reports').replace('xabar', 'maktab').replace('сообщений', 'школ').replace('reports', 'schools')}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.schoolNameOrNumber')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="15, 67..."
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.region')}
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">{t('finder.all')}</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name[language as Language]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* District */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.district')}
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedRegion}
                className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">{t('finder.all')}</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name[language as Language]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Status */}
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

          {/* View Mode Toggle */}
          <div className="flex items-end">
            <div className="flex rounded-xl border border-border bg-muted/50 p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-9 px-3',
                  viewMode === 'grid' && 'bg-background shadow-sm'
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-9 px-3',
                  viewMode === 'list' && 'bg-background shadow-sm'
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schools Grid/List */}
      {filteredSchools.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} compact />
            ))}
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  )
}
