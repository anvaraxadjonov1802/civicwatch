import type { ApplicationStatus, Language } from '@/types'

export function getApplicationStatusLabel(
  status: ApplicationStatus,
  language: Language
) {
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

export function getApplicationStatusClasses(status: ApplicationStatus) {
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