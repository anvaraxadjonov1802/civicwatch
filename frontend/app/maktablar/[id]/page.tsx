'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  AlertTriangle,
  ClipboardCheck,
  Calendar,
  User,
  ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'
import { EmptyState } from '@/components/empty-state'
import { useLanguage, useTranslatedLabel } from '@/lib/language'
import { 
  getSchoolById, 
  getPromisesBySchoolId, 
  getVerificationsBySchoolId,
  districts,
  regions 
} from '@/lib/mock-data'

interface SchoolDetailPageProps {
  params: Promise<{ id: string }>
}

export default function SchoolDetailPage({ params }: SchoolDetailPageProps) {
  const { id } = use(params)
  const { t, language } = useLanguage()
  const getLabel = useTranslatedLabel()

  const school = getSchoolById(id)
  
  if (!school) {
    notFound()
  }

  const promises = getPromisesBySchoolId(id)
  const verifications = getVerificationsBySchoolId(id)

  const districtLabel = districts.find(d => d.value === school.district)?.label
  const regionLabel = regions.find(r => r.value === school.region)?.label

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/maktablar">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('nav.schools')}
        </Link>
      </Button>

      {/* School Header */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border lg:col-span-1">
          <Image
            src={school.image}
            alt={school.name}
            fill
            className="object-cover"
          />
          <div className="absolute right-3 top-3">
            <StatusBadge status={school.status} />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-2xl font-bold sm:text-3xl">{school.name}</h1>
            <span className="rounded-lg bg-muted px-3 py-1 text-lg font-semibold">
              #{school.number}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{school.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-md bg-muted px-2 py-1">
                {regionLabel ? getLabel(regionLabel) : school.region}
              </span>
              <span className="rounded-md bg-muted px-2 py-1">
                {districtLabel ? getLabel(districtLabel) : school.district}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t('school.totalPromises')}
              value={school.totalPromises}
              icon={ClipboardCheck}
              variant="primary"
            />
            <StatCard
              title={t('school.completedPromises')}
              value={school.completedPromises}
              icon={CheckCircle2}
              variant="success"
            />
            <StatCard
              title={t('school.problemsFound')}
              value={school.problemsFound}
              icon={AlertTriangle}
              variant="danger"
            />
            <StatCard
              title={t('school.totalReports')}
              value={school.totalReports}
              icon={FileText}
              variant="accent"
            />
          </div>

          {/* CTA */}
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href={`/tekshirish/${school.id}`}>
                <ClipboardCheck className="mr-2 h-5 w-5" />
                {t('school.verifyThisSchool')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Promised Works Section */}
      <section className="mt-12">
        <SectionHeader
          title={t('school.promisedWorks')}
          description={`${promises.length} ${t('school.reports').replace('hisobotlar', 'ish').replace('отчётов', 'работ').replace('reports', 'works')}`}
        />

        {promises.length === 0 ? (
          <EmptyState type="no-data" className="mt-6" />
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map((promise) => (
              <div
                key={promise.id}
                className="card-glow rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{promise.title[language]}</h3>
                  <StatusBadge status={promise.status} size="sm" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {promise.description[language]}
                </p>
                {promise.deadline && (
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(promise.deadline)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Verifications Section */}
      <section className="mt-12">
        <SectionHeader
          title={t('school.recentVerifications')}
          description={`${verifications.length} ${t('school.reports')}`}
        />

        {verifications.length === 0 ? (
          <EmptyState type="no-data" className="mt-6" />
        ) : (
          <div className="mt-6 space-y-4">
            {verifications.map((verification) => (
              <div
                key={verification.id}
                className="card-glow rounded-xl border border-border bg-card p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{verification.promiseTitle}</h3>
                      <StatusBadge status={verification.result} size="sm" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {verification.comment}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(verification.createdAt)}</span>
                      </div>
                      {verification.isVerifiedUser && verification.userName && (
                        <div className="flex items-center gap-1.5 text-primary">
                          <User className="h-3.5 w-3.5" />
                          <span>{verification.userName}</span>
                        </div>
                      )}
                      {verification.images.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <ImageIcon className="h-3.5 w-3.5" />
                          <span>{verification.images.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {verification.images.length > 0 && (
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={verification.images[0]}
                        alt="Verification"
                        fill
                        className="object-cover"
                      />
                      {verification.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                          +{verification.images.length - 1}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Big CTA */}
      <section className="mt-12">
        <div className="card-glow flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 px-6 py-12 text-center">
          <ClipboardCheck className="h-12 w-12 text-primary" />
          <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
            {t('school.verifyThisSchool')}
          </h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            {t('hero.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href={`/tekshirish/${school.id}`}>
              {t('school.verify')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
