'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusBadge } from '@/components/status-badge'
import { useLanguage, useTranslatedLabel } from '@/lib/language'
import { schools, regions, districts } from '@/lib/mock-data'
import type { VerificationStatus } from '@/types'
import { cn } from '@/lib/utils'

interface SchoolFinderProps {
  className?: string
}

export function SchoolFinder({ className }: SchoolFinderProps) {
  const { t } = useLanguage()
  const getLabel = useTranslatedLabel()
  
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [showResults, setShowResults] = useState(false)

  const filteredDistricts = useMemo(() => {
    if (!region) return districts
    return districts.filter(d => d.regionValue === region)
  }, [region])

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = !search || 
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.number.toString().includes(search)
      const matchesRegion = !region || school.region === region
      const matchesDistrict = !district || school.district === district
      const matchesStatus = !status || school.status === status
      return matchesSearch && matchesRegion && matchesDistrict && matchesStatus
    })
  }, [search, region, district, status])

  const handleSearch = () => {
    setShowResults(true)
  }

  const handleClear = () => {
    setSearch('')
    setRegion('')
    setDistrict('')
    setStatus('')
    setShowResults(false)
  }

  const statuses: { value: VerificationStatus; label: string }[] = [
    { value: 'completed', label: t('status.completed') },
    { value: 'problem', label: t('status.problem') },
    { value: 'under_review', label: t('status.under_review') },
    { value: 'not_verified', label: t('status.not_verified') },
  ]

  return (
    <div className={cn('rounded-2xl border border-border bg-card p-4 sm:p-6', className)}>
      <h3 className="mb-4 text-lg font-semibold">{t('finder.title')}</h3>
      
      {/* Search Form */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('finder.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Region Select */}
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

        {/* District Select */}
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

        {/* Status Select */}
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

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          {t('finder.find')}
        </Button>
        {(search || region || district || status) && (
          <Button variant="outline" onClick={handleClear}>
            {t('common.clear')}
          </Button>
        )}
      </div>

      {/* Results */}
      {showResults && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-sm text-muted-foreground">
              {filteredSchools.length} {t('school.reports').replace('hisobotlar', 'natija').replace('отчётов', 'результатов').replace('reports', 'results')}
            </span>
            {filteredSchools.length > 5 && (
              <Button asChild variant="link" size="sm" className="h-auto p-0">
                <Link href="/maktablar">
                  {t('hero.viewSchools')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            )}
          </div>
          
          {filteredSchools.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {t('common.noResults')}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredSchools.slice(0, 5).map((school) => {
                const districtLabel = districts.find(d => d.value === school.district)?.label
                return (
                  <div
                    key={school.id}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{school.name}</span>
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                          #{school.number}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{districtLabel ? getLabel(districtLabel) : school.district}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={school.status} size="sm" />
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/maktablar/${school.id}`}>
                          {t('school.details')}
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/tekshirish/${school.id}`}>
                          {t('school.verify')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
