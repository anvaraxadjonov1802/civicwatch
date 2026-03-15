'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  Star,
  Trophy,
  Target,
  ArrowRight,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/context'
import { getSchoolById, taskTypes, defaultBadges } from '@/lib/mock-data'
import { addApplication } from '@/lib/application-storage'
import type {
  ApplicationStatus,
  Language,
  ReportResult,
  UserApplication,
} from '@/types'
import { cn } from '@/lib/utils'

export default function ReportPage({
  params,
}: {
  params: Promise<{ schoolId: string }>
}) {
  const { schoolId } = use(params)
  const { t, language } = useTranslation()

  const school = getSchoolById(schoolId)

  if (!school) {
    notFound()
  }

  const currentSchool = school

  const [mode, setMode] = useState<'quick' | 'detailed'>('quick')
  const [selectedTask, setSelectedTask] = useState('')
  const [result, setResult] = useState<ReportResult | ''>('')
  const [selectedQuickResponse, setSelectedQuickResponse] = useState('')
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [createdApplication, setCreatedApplication] =
    useState<UserApplication | null>(null)

  const quickCompletedResponses = [
    { id: 'done', text: t('quickCompleted.done') },
    { id: 'allGood', text: t('quickCompleted.allGood') },
    { id: 'canUse', text: t('quickCompleted.canUse') },
    { id: 'goodCondition', text: t('quickCompleted.goodCondition') },
  ]

  const quickIssueResponses = [
    { id: 'notSolved', text: t('quickIssue.notSolved') },
    { id: 'notFinished', text: t('quickIssue.notFinished') },
    { id: 'poorQuality', text: t('quickIssue.poorQuality') },
    { id: 'cantUse', text: t('quickIssue.cantUse') },
    { id: 'partial', text: t('quickIssue.partial') },
  ]

  const handleQuickResponseClick = (response: { id: string; text: string }) => {
    setSelectedQuickResponse(response.id)
    if (!comment.trim()) {
      setComment(response.text)
    }
  }

  const handleImageUpload = () => {
    const placeholderImages = [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    ]

    if (images.length < 3) {
      setImages([...images, placeholderImages[images.length % 2]])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!selectedTask || !result || !comment.trim()) return

    const normalizedSchoolName =
      typeof currentSchool.name === 'string'
        ? {
            uz: currentSchool.name,
            ru: currentSchool.name,
            en: currentSchool.name,
          }
        : currentSchool.name

    const newApplication = addApplication({
      schoolId: currentSchool.id,
      schoolNumber: String(currentSchool.number),
      schoolName: normalizedSchoolName,
      taskType: selectedTask,
      result: result as ReportResult,
      comment: comment.trim(),
      images,
    })

    setCreatedApplication(newApplication)
    setSubmitted(true)
  }

  const canSubmit = Boolean(selectedTask && result && comment.trim())

  if (submitted && createdApplication) {
    return (
      <SuccessState
        school={currentSchool}
        application={createdApplication}
        language={language as Language}
        t={t}
        hasImage={images.length > 0}
      />
    )
  }

  const displaySchoolName =
    typeof currentSchool.name === 'string'
      ? currentSchool.name
      : currentSchool.name[language as Language]

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href={`/maktablar/${currentSchool.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('report.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">{t('report.subtitle')}</p>
      </div>

      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">{t('report.school')}</p>
        <p className="mt-1 font-semibold text-foreground">
          #{currentSchool.number} - {displaySchoolName}
        </p>
      </div>

      <div className="mb-6 flex rounded-xl border border-border bg-muted/50 p-1">
        <button
          onClick={() => setMode('quick')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors',
            mode === 'quick'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Zap className="h-4 w-4" />
          {t('report.quickMode')}
        </button>
        <button
          onClick={() => setMode('detailed')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors',
            mode === 'detailed'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {t('report.detailedMode')}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t('report.taskType')}
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {taskTypes.map((task) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={cn(
                  'rounded-xl border p-3 text-center text-sm font-medium transition-colors',
                  selectedTask === task.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                )}
              >
                {task.name[language as Language]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t('report.result')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setResult('completed')}
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl border p-4 text-base font-medium transition-colors',
                result === 'completed'
                  ? 'border-success bg-success/10 text-success'
                  : 'border-border bg-card text-foreground hover:border-success/50'
              )}
            >
              <CheckCircle className="h-5 w-5" />
              {t('report.completed')}
            </button>
            <button
              onClick={() => setResult('issue')}
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl border p-4 text-base font-medium transition-colors',
                result === 'issue'
                  ? 'border-destructive bg-destructive/10 text-destructive'
                  : 'border-border bg-card text-foreground hover:border-destructive/50'
              )}
            >
              <AlertTriangle className="h-5 w-5" />
              {t('report.hasIssue')}
            </button>
          </div>
        </div>

        {result && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t('report.quickResponses')}
            </label>
            <div className="flex flex-wrap gap-2">
              {(result === 'completed'
                ? quickCompletedResponses
                : quickIssueResponses
              ).map((response) => (
                <button
                  key={response.id}
                  onClick={() => handleQuickResponseClick(response)}
                  className={cn(
                    'rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                    selectedQuickResponse === response.id
                      ? result === 'completed'
                        ? 'border-success bg-success/10 text-success'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  )}
                >
                  {response.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t('report.comment')}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('report.commentPlaceholder')}
            rows={mode === 'detailed' ? 4 : 2}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {(mode === 'detailed' || images.length > 0) && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t('report.addImage')}
            </label>

            {images.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded-xl"
                  >
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-foreground/80 p-1 text-background hover:bg-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-12 flex-1 gap-2"
                onClick={handleImageUpload}
              >
                <Upload className="h-4 w-4" />
                {t('report.fromDevice')}
              </Button>
              <Button
                variant="outline"
                className="h-12 flex-1 gap-2"
                onClick={handleImageUpload}
              >
                <Camera className="h-4 w-4" />
                {t('report.fromCamera')}
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-14 w-full text-lg font-medium"
        >
          {t('report.submit')}
        </Button>
      </div>
    </div>
  )
}

function SuccessState({
  school,
  application,
  language,
  t,
  hasImage,
}: {
  school: ReturnType<typeof getSchoolById>
  application: UserApplication
  language: Language
  t: (key: string, params?: Record<string, string | number>) => string
  hasImage: boolean
}) {
  const pointsEarned = hasImage ? 15 : 10
  const nextBadge = defaultBadges[1]
  const reportsNeeded = 2

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
          {t('success.title')}
        </h1>
        <p className="mt-2 text-lg text-primary font-medium">
          {t('success.message')}
        </p>
        <p className="mt-1 text-muted-foreground">{t('success.helpMessage')}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Ariza raqami</p>
        <p className="mt-1 text-lg font-semibold text-foreground">
          {application.trackingNumber}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Joriy holat</p>
            <p className="mt-1 font-medium text-foreground">
              {getApplicationStatusLabel(application.status, language)}
            </p>
          </div>

          <span
            className={cn(
              'rounded-full border px-3 py-1 text-sm font-medium',
              getApplicationStatusClasses(application.status)
            )}
          >
            {getApplicationStatusLabel(application.status, language)}
          </span>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Arizangiz qabul qilindi. Endi uning holatini kuzatib borishingiz mumkin.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">+{pointsEarned}</p>
              <p className="text-sm text-muted-foreground">
                {t('success.pointsEarned')}
              </p>
            </div>
          </div>
          {hasImage && (
            <div className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              +5 bonus
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Target className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground">
              {t('success.progressMessage', {
                count: reportsNeeded,
                badge: nextBadge.name[language],
              })}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((5 - reportsNeeded) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">
            {t('success.myAchievements')}
          </h3>
          <Link href="/dashboard" className="text-sm text-primary hover:underline">
            {t('schoolCard.details')}
          </Link>
        </div>
        <div className="flex gap-3">
          {defaultBadges.slice(0, 4).map((badge, index) => (
            <div
              key={badge.id}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl',
                index === 0
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {index === 0 ? (
                <Star className="h-5 w-5" />
              ) : index === 1 ? (
                <Target className="h-5 w-5" />
              ) : index === 2 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Trophy className="h-5 w-5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Link href="/maktablar" className="block">
          <Button className="h-12 w-full gap-2 text-base">
            {t('success.viewAnother')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <Link href={`/arizalar/${application.id}`} className="block">
          <Button variant="outline" className="h-12 w-full text-base">
            Ariza holatini ko‘rish
          </Button>
        </Link>
        <Link href="/arizalar" className="block">
          <Button variant="ghost" className="h-12 w-full text-base">
            Mening arizalarim
          </Button>
        </Link>
      </div>
    </div>
  )
}

function getApplicationStatusLabel(status: ApplicationStatus, language: Language) {
  const labels = {
    submitted: {
      uz: 'Yuborildi',
      ru: 'Отправлено',
      en: 'Submitted',
    },
    reviewing: {
      uz: 'Ko‘rib chiqilmoqda',
      ru: 'На рассмотрении',
      en: 'Under review',
    },
    planned: {
      uz: 'Rejaga kiritildi',
      ru: 'Запланировано',
      en: 'Planned',
    },
    in_progress: {
      uz: 'Ish olib borilmoqda',
      ru: 'В работе',
      en: 'In progress',
    },
    resolved: {
      uz: 'Hal qilindi',
      ru: 'Решено',
      en: 'Resolved',
    },
    rejected: {
      uz: 'Rad etildi',
      ru: 'Отклонено',
      en: 'Rejected',
    },
  }

  return labels[status][language]
}

function getApplicationStatusClasses(status: ApplicationStatus) {
  switch (status) {
    case 'submitted':
      return 'bg-primary/10 text-primary border-primary/20'
    case 'reviewing':
      return 'bg-warning/15 text-warning-foreground border-warning/20'
    case 'planned':
      return 'bg-accent text-accent-foreground border-accent/30'
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    case 'resolved':
      return 'bg-success/10 text-success border-success/20'
    case 'rejected':
      return 'bg-destructive/10 text-destructive border-destructive/20'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}