'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Flag,
  ImageIcon,
  ChevronLeft,
  ChevronRight
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { StatusBadge } from '@/components/status-badge'
import { SectionHeader } from '@/components/section-header'
import { EmptyState } from '@/components/empty-state'
import { useLanguage } from '@/lib/language'
import { reports, schools } from '@/lib/mock-data'
import type { VerificationStatus, Report } from '@/types'
import { cn } from '@/lib/utils'

export default function AdminPage() {
  const { t, language } = useLanguage()

  // Filter states
  const [schoolFilter, setSchoolFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [resultFilter, setResultFilter] = useState<string>('')
  const [search, setSearch] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // Mock state for report statuses (in real app, this would be server state)
  const [reportStatuses, setReportStatuses] = useState<Record<string, Report['adminStatus']>>({})

  const getReportStatus = (reportId: string, originalStatus: Report['adminStatus']) => {
    return reportStatuses[reportId] || originalStatus
  }

  const updateReportStatus = (reportId: string, status: Report['adminStatus']) => {
    setReportStatuses(prev => ({ ...prev, [reportId]: status }))
  }

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = !search || 
        report.promiseTitle.toLowerCase().includes(search.toLowerCase()) ||
        report.schoolName.toLowerCase().includes(search.toLowerCase()) ||
        report.comment.toLowerCase().includes(search.toLowerCase())
      const matchesSchool = !schoolFilter || schoolFilter === 'all' || report.schoolId === schoolFilter
      const matchesStatus = !statusFilter || statusFilter === 'all' || getReportStatus(report.id, report.adminStatus) === statusFilter
      const matchesResult = !resultFilter || resultFilter === 'all' || report.result === resultFilter
      return matchesSearch && matchesSchool && matchesStatus && matchesResult
    })
  }, [search, schoolFilter, statusFilter, resultFilter, reportStatuses])

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredReports.slice(start, start + rowsPerPage)
  }, [filteredReports, currentPage])

  const totalPages = Math.ceil(filteredReports.length / rowsPerPage)

  const adminStatuses = [
    { value: 'pending', label: t('admin.pending') },
    { value: 'reviewed', label: t('admin.reviewed') },
    { value: 'approved', label: t('admin.approved') },
    { value: 'flagged', label: t('admin.flagged') },
  ]

  const resultOptions: { value: VerificationStatus; label: string }[] = [
    { value: 'completed', label: t('status.completed') },
    { value: 'problem', label: t('status.problem') },
    { value: 'under_review', label: t('status.under_review') },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAdminStatusBadge = (status: Report['adminStatus']) => {
    const config = {
      pending: { className: 'bg-status-review/15 text-status-review border-status-review/30', label: t('admin.pending') },
      reviewed: { className: 'bg-primary/15 text-primary border-primary/30', label: t('admin.reviewed') },
      approved: { className: 'bg-status-completed/15 text-status-completed border-status-completed/30', label: t('admin.approved') },
      flagged: { className: 'bg-status-problem/15 text-status-problem border-status-problem/30', label: t('admin.flagged') },
    }
    const { className, label } = config[status]
    return (
      <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', className)}>
        {label}
      </span>
    )
  }

  const hasFilters = schoolFilter || statusFilter || resultFilter || search

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        title={t('admin.title')}
        description={`${reports.length} ${t('admin.reports')}`}
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
              placeholder={t('common.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* School Filter */}
          <Select value={schoolFilter} onValueChange={setSchoolFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.school')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('finder.allRegions')}</SelectItem>
              {schools.map((school) => (
                <SelectItem key={school.id} value={school.id}>
                  {school.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Admin Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.adminStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('finder.allStatuses')}</SelectItem>
              {adminStatuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Result Filter */}
          <Select value={resultFilter} onValueChange={setResultFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.result')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('finder.allStatuses')}</SelectItem>
              {resultOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <div className="mt-4 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSchoolFilter('')
                setStatusFilter('')
                setResultFilter('')
                setSearch('')
              }}
            >
              {t('common.clear')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {filteredReports.length} {t('admin.reports')}
            </span>
          </div>
        )}
      </div>

      {/* Reports Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        {filteredReports.length === 0 ? (
          <EmptyState type="no-results" className="m-6" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.school')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.work')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.result')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.date')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.adminStatus')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      {t('admin.photo')}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      {t('admin.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedReports.map((report) => {
                    const currentStatus = getReportStatus(report.id, report.adminStatus)
                    return (
                      <tr key={report.id} className="bg-card hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <span className="font-medium">{report.schoolName}</span>
                        </td>
                        <td className="px-4 py-3 max-w-[200px]">
                          <p className="truncate">{report.promiseTitle}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground truncate">
                            {report.comment}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={report.result} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(report.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          {getAdminStatusBadge(currentStatus)}
                        </td>
                        <td className="px-4 py-3">
                          {report.images.length > 0 ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                                  <ImageIcon className="h-4 w-4" />
                                  {report.images.length}
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{t('admin.photo')}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4">
                                  {report.images.map((image, index) => (
                                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                                      <Image
                                        src={image}
                                        alt={`Photo ${index + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateReportStatus(report.id, 'reviewed')}
                              title={t('admin.markReviewed')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-status-completed hover:text-status-completed"
                              onClick={() => updateReportStatus(report.id, 'approved')}
                              title={t('admin.approve')}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-status-problem hover:text-status-problem"
                              onClick={() => updateReportStatus(report.id, 'flagged')}
                              title={t('admin.flagProblem')}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-3">
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
          </>
        )}
      </div>
    </div>
  )
}
