import type {
    ApplicationStatus,
    ApplicationStatusUpdate,
    Language,
    ReportResult,
    UserApplication,
  } from '@/types'
  
  const STORAGE_KEY = 'school-monitor-user-applications'
  
  type CreateApplicationInput = {
    schoolId: string
    schoolNumber: string
    schoolName: Record<Language, string>
    taskType: string
    result: ReportResult
    comment: string
    images: string[]
  }
  
  function isBrowser() {
    return typeof window !== 'undefined'
  }
  
  function generateId() {
    return `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  }
  
  function generateTrackingNumber() {
    const now = new Date()
    const year = now.getFullYear()
    const code = Math.floor(1000 + Math.random() * 9000)
    return `ARZ-${year}-${code}`
  }
  
  export function getApplications(): UserApplication[] {
    if (!isBrowser()) return []
  
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      return JSON.parse(raw) as UserApplication[]
    } catch {
      return []
    }
  }
  
  export function saveApplications(applications: UserApplication[]) {
    if (!isBrowser()) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }
  
  function createInitialUpdate(): ApplicationStatusUpdate {
    return {
      id: generateId(),
      status: 'submitted',
      note: 'Ariza yuborildi',
      createdAt: new Date().toISOString(),
    }
  }
  
  export function addApplication(input: CreateApplicationInput): UserApplication {
    const applications = getApplications()
  
    const newApplication: UserApplication = {
      id: generateId(),
      trackingNumber: generateTrackingNumber(),
      schoolId: input.schoolId,
      schoolNumber: input.schoolNumber,
      schoolName: input.schoolName,
      taskType: input.taskType,
      result: input.result,
      comment: input.comment,
      images: input.images,
      createdAt: new Date().toISOString(),
      status: 'submitted',
      updates: [createInitialUpdate()],
    }
  
    saveApplications([newApplication, ...applications])
    return newApplication
  }
  
  export function getApplicationById(id: string): UserApplication | undefined {
    return getApplications().find((item) => item.id === id)
  }
  
  export function updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    note?: string
  ): UserApplication | null {
    const applications = getApplications()
    const index = applications.findIndex((item) => item.id === id)
  
    if (index === -1) return null
  
    const update: ApplicationStatusUpdate = {
      id: generateId(),
      status,
      note,
      createdAt: new Date().toISOString(),
    }
  
    applications[index] = {
      ...applications[index],
      status,
      updates: [...applications[index].updates, update],
    }
  
    saveApplications(applications)
    return applications[index]
  }

  