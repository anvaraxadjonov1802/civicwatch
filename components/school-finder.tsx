'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { regions, getDistrictsByRegion, searchSchools } from '@/lib/mock-data'
import { SchoolCard } from './school-card'
import type { Language, School } from '@/types'

export function SchoolFinder() {
  const { t, language } = useTranslation()
  const [query, setQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [results, setResults] = useState<School[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const districts = useMemo(() => {
    if (!selectedRegion) return []
    return getDistrictsByRegion(selectedRegion)
  }, [selectedRegion])

  const handleSearch = () => {
    const searchResults = searchSchools(query, selectedRegion || undefined, selectedDistrict || undefined, selectedStatus || undefined)
    setResults(searchResults)
    setHasSearched(true)
  }

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId)
    setSelectedDistrict('')
  }

  return (
    <div className="w-full">
      {/* Search Panel */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground sm:mb-6 sm:text-xl">
          {t('finder.title')}
        </h2>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* School name/number input */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.schoolNameOrNumber')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="15, 67..."
                className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-14"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Region select */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.region')}
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-14"
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

          {/* District select */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.district')}
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedRegion}
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14"
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

          {/* Status select */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('finder.status')}
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-14"
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

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="mt-4 h-12 w-full text-base font-medium sm:mt-6 sm:h-14"
        >
          <Search className="mr-2 h-5 w-5" />
          {t('finder.search')}
        </Button>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="mt-6">
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((school) => (
                <SchoolCard key={school.id} school={school} compact />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">{t('common.noResults')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
