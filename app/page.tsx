'use client'

import Link from 'next/link'
import { Search, BarChart3, CheckCircle, MapPin, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { SchoolFinder } from '@/components/school-finder'
import { statistics } from '@/lib/mock-data'
import { formatNumber } from '@/lib/utils'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground sm:mt-6 sm:text-xl">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/maktablar">
                <Button size="lg" className="h-12 w-full px-8 text-base sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  {t('hero.findSchool')}
                </Button>
              </Link>
              <Link href="/natijalar">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full px-8 text-base sm:w-auto"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {t('hero.viewResults')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4">
            <StatCard
              value={formatNumber(statistics.totalSchools)}
              label={t('dashboard.totalSchools')}
            />
            <StatCard
              value={formatNumber(statistics.totalReports)}
              label={t('dashboard.totalReports')}
            />
            <StatCard
              value={formatNumber(statistics.completedTasks)}
              label={t('dashboard.completedTasks')}
            />
            <StatCard
              value={formatNumber(statistics.activeRegions)}
              label={t('dashboard.topRegions')}
            />
          </div>
        </div>
      </section>

      {/* School Finder Section */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SchoolFinder />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t('howItWorks.title')}
          </h2>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
            <StepCard
              step={1}
              icon={<MapPin className="h-6 w-6" />}
              title={t('howItWorks.step1Title')}
              description={t('howItWorks.step1Desc')}
            />
            <StepCard
              step={2}
              icon={<CheckCircle className="h-6 w-6" />}
              title={t('howItWorks.step2Title')}
              description={t('howItWorks.step2Desc')}
            />
            <StepCard
              step={3}
              icon={<BarChart3 className="h-6 w-6" />}
              title={t('howItWorks.step3Title')}
              description={t('howItWorks.step3Desc')}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary/5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <TrustCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              message={t('trust.message1')}
            />
            <TrustCard
              icon={<Users className="h-8 w-8 text-primary" />}
              message={t('trust.message2')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm sm:p-6">
      <p className="text-2xl font-bold text-primary sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* Step number */}
      <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {step}
      </div>

      <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}

function TrustCard({
  icon,
  message,
}: {
  icon: React.ReactNode
  message: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="shrink-0">{icon}</div>
      <p className="text-base font-medium text-foreground sm:text-lg">{message}</p>
    </div>
  )
}
