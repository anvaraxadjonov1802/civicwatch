'use client'

import Link from 'next/link'
import { ArrowRight, School, FileCheck, BarChart3, Shield, Users, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SchoolFinder } from '@/components/school-finder'
import { SchoolCard } from '@/components/school-card'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'
import { useLanguage } from '@/lib/language'
import { schools, dashboardSummary } from '@/lib/mock-data'

export default function HomePage() {
  const { t } = useLanguage()

  // Get first 6 schools for preview
  const previewSchools = schools.slice(0, 6)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-muted/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[size:100px_100%] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[size:100%_100px] opacity-20" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              <span>CivicWatch v1.0</span>
            </div>

            {/* Title */}
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/maktablar">
                  {t('hero.viewSchools')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/natijalar">
                  {t('hero.viewResults')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t('dashboard.totalSchools')}
              value={dashboardSummary.totalSchools}
              icon={School}
              variant="primary"
            />
            <StatCard
              title={t('dashboard.totalReports')}
              value={dashboardSummary.totalReports}
              icon={FileCheck}
              variant="accent"
            />
            <StatCard
              title={t('dashboard.completedWorks')}
              value={dashboardSummary.completedWorks}
              icon={BarChart3}
              variant="success"
            />
            <StatCard
              title={t('dashboard.problemsFound')}
              value={dashboardSummary.problemsFound}
              icon={Eye}
              variant="danger"
            />
          </div>
        </div>
      </section>

      {/* School Finder Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SchoolFinder />
      </section>

      {/* Schools Preview Section */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeader
            title={t('nav.schools')}
            action={
              <Button asChild variant="outline">
                <Link href="/maktablar">
                  {t('hero.viewSchools')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t('hero.title')}
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <School className="h-7 w-7" />
              </div>
              <div className="absolute left-1/2 top-7 hidden h-px w-full bg-border sm:block" />
              <h3 className="mt-4 font-semibold">1. {t('finder.find')}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('finder.searchPlaceholder')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <FileCheck className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold">2. {t('school.verify')}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('verification.quickMode')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-violet/10 text-neon-violet">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold">3. {t('hero.viewResults')}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('results.charts')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
