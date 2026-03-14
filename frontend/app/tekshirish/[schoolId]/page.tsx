'use client'

import { use, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  X, 
  MapPin,
  CheckCircle2,
  AlertCircle,
  Zap,
  FileText,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/lib/language'
import { getSchoolById, getPromisesBySchoolId } from '@/lib/mock-data'
import type { VerificationStatus } from '@/types'
import { cn } from '@/lib/utils'

interface VerificationPageProps {
  params: Promise<{ schoolId: string }>
}

export default function VerificationPage({ params }: VerificationPageProps) {
  const { schoolId } = use(params)
  const router = useRouter()
  const { t, language } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const school = getSchoolById(schoolId)
  
  if (!school) {
    notFound()
  }

  const promises = getPromisesBySchoolId(schoolId)

  // Form state
  const [selectedPromise, setSelectedPromise] = useState<string>('')
  const [result, setResult] = useState<VerificationStatus | ''>('')
  const [selectedQuickReplies, setSelectedQuickReplies] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [includeLocation, setIncludeLocation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showVerifyBanner, setShowVerifyBanner] = useState(false)

  const quickRepliesCompleted = [
    { id: 'workDone', text: t('quickReplies.completed.workDone') },
    { id: 'allGood', text: t('quickReplies.completed.allGood') },
    { id: 'promiseVisible', text: t('quickReplies.completed.promiseVisible') },
    { id: 'conditionGood', text: t('quickReplies.completed.conditionGood') },
    { id: 'usable', text: t('quickReplies.completed.usable') },
  ]

  const quickRepliesProblem = [
    { id: 'notFinished', text: t('quickReplies.problem.notFinished') },
    { id: 'notPresent', text: t('quickReplies.problem.notPresent') },
    { id: 'poorQuality', text: t('quickReplies.problem.poorQuality') },
    { id: 'unusable', text: t('quickReplies.problem.unusable') },
    { id: 'partial', text: t('quickReplies.problem.partial') },
    { id: 'problemRemains', text: t('quickReplies.problem.problemRemains') },
  ]

  const currentQuickReplies = result === 'completed' 
    ? quickRepliesCompleted 
    : result === 'problem' 
    ? quickRepliesProblem 
    : []

  const toggleQuickReply = (id: string) => {
    setSelectedQuickReplies(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id) 
        : [...prev, id]
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, we would upload these files
      // For now, we just create preview URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!selectedPromise || !result) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    setShowVerifyBanner(true)
  }

  const resetForm = () => {
    setSelectedPromise('')
    setResult('')
    setSelectedQuickReplies([])
    setComment('')
    setImages([])
    setIncludeLocation(false)
    setIsSuccess(false)
    setShowVerifyBanner(false)
  }

  const canSubmit = selectedPromise && result && (selectedQuickReplies.length > 0 || comment)

  // Success Screen
  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-status-completed/10">
            <CheckCircle2 className="h-8 w-8 text-status-completed" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">{t('verification.successTitle')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('verification.successMessage')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={resetForm} variant="outline">
              {t('verification.verifyAnother')}
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                {t('verification.viewDashboard')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Verify Banner */}
        {showVerifyBanner && (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="font-semibold">{t('verifyBanner.title')}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('verifyBanner.description')}
            </p>
            <div className="mt-4 flex gap-3">
              <Button size="sm">{t('verifyBanner.action')}</Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowVerifyBanner(false)}
              >
                {t('verifyBanner.later')}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href={`/maktablar/${schoolId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {school.name}
        </Link>
      </Button>

      {/* School Info Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={school.image}
              alt={school.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold sm:text-lg">{school.name}</h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>#{school.number}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <Tabs defaultValue="quick" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick" className="gap-2">
            <Zap className="h-4 w-4" />
            {t('verification.quickMode')}
          </TabsTrigger>
          <TabsTrigger value="detailed" className="gap-2">
            <FileText className="h-4 w-4" />
            {t('verification.detailedMode')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="mt-6 space-y-6">
          {/* Promise Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.selectWork')}</label>
            <Select value={selectedPromise} onValueChange={setSelectedPromise}>
              <SelectTrigger>
                <SelectValue placeholder={t('verification.selectWork')} />
              </SelectTrigger>
              <SelectContent>
                {promises.map((promise) => (
                  <SelectItem key={promise.id} value={promise.id}>
                    {promise.title[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.selectResult')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setResult('completed')
                  setSelectedQuickReplies([])
                }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border-2 p-4 font-medium transition-all',
                  result === 'completed'
                    ? 'border-status-completed bg-status-completed/10 text-status-completed'
                    : 'border-border hover:border-status-completed/50'
                )}
              >
                <CheckCircle2 className="h-5 w-5" />
                {t('status.completed')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult('problem')
                  setSelectedQuickReplies([])
                }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border-2 p-4 font-medium transition-all',
                  result === 'problem'
                    ? 'border-status-problem bg-status-problem/10 text-status-problem'
                    : 'border-border hover:border-status-problem/50'
                )}
              >
                <AlertCircle className="h-5 w-5" />
                {t('status.problem')}
              </button>
            </div>
          </div>

          {/* Quick Replies */}
          {currentQuickReplies.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('verification.quickReplies')}</label>
              <div className="flex flex-wrap gap-2">
                {currentQuickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => toggleQuickReply(reply.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-sm transition-all',
                      selectedQuickReplies.includes(reply.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button for Quick Mode */}
          <Button 
            onClick={handleSubmit} 
            disabled={!canSubmit || isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {t('common.loading')}
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t('verification.submit')}
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6 space-y-6">
          {/* Promise Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.selectWork')}</label>
            <Select value={selectedPromise} onValueChange={setSelectedPromise}>
              <SelectTrigger>
                <SelectValue placeholder={t('verification.selectWork')} />
              </SelectTrigger>
              <SelectContent>
                {promises.map((promise) => (
                  <SelectItem key={promise.id} value={promise.id}>
                    {promise.title[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.selectResult')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setResult('completed')
                  setSelectedQuickReplies([])
                }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border-2 p-4 font-medium transition-all',
                  result === 'completed'
                    ? 'border-status-completed bg-status-completed/10 text-status-completed'
                    : 'border-border hover:border-status-completed/50'
                )}
              >
                <CheckCircle2 className="h-5 w-5" />
                {t('status.completed')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult('problem')
                  setSelectedQuickReplies([])
                }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border-2 p-4 font-medium transition-all',
                  result === 'problem'
                    ? 'border-status-problem bg-status-problem/10 text-status-problem'
                    : 'border-border hover:border-status-problem/50'
                )}
              >
                <AlertCircle className="h-5 w-5" />
                {t('status.problem')}
              </button>
            </div>
          </div>

          {/* Quick Replies */}
          {currentQuickReplies.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('verification.quickReplies')}</label>
              <div className="flex flex-wrap gap-2">
                {currentQuickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => toggleQuickReply(reply.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-sm transition-all',
                      selectedQuickReplies.includes(reply.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.customComment')}</label>
            <Textarea
              placeholder={t('verification.commentPlaceholder')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('verification.addPhoto')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Upload className="h-6 w-6" />
                <span className="text-sm">{t('verification.uploadFromDevice')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  // In a real app, this would open camera
                  fileInputRef.current?.click()
                }}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Camera className="h-6 w-6" />
                <span className="text-sm">{t('verification.takePhoto')}</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground">{t('verification.photoHelp')}</p>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`Upload ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="location"
              checked={includeLocation}
              onCheckedChange={(checked) => setIncludeLocation(checked === true)}
            />
            <label
              htmlFor="location"
              className="flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              {t('verification.includeLocation')}
            </label>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={!canSubmit || isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {t('common.loading')}
              </span>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t('verification.submit')}
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
