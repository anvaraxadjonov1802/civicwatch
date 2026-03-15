// Language types
export type Language = 'uz' | 'ru' | 'en'

// Theme types
export type Theme = 'light' | 'dark'

// School status
export type SchoolStatus = 'good' | 'issue' | 'pending' | 'unknown'

// Report result
export type ReportResult = 'completed' | 'issue'

// Region/District
export interface Region {
  id: string
  name: Record<Language, string>
}

export interface District {
  id: string
  regionId: string
  name: Record<Language, string>
}

// School
export interface School {
  id: string
  number: string
  name: Record<Language, string>
  regionId: string
  districtId: string
  address: Record<Language, string>
  status: SchoolStatus
  image?: string
  totalReports: number
  completedTasks: number
  pendingIssues: number
  lastReportDate?: string
}

// Report/Verification
export interface Report {
  id: string
  schoolId: string
  taskType: string
  result: ReportResult
  comment: string
  images: string[]
  createdAt: string
  userId?: string
  verified: boolean
}

// Task types for verification
export interface TaskType {
  id: string
  name: Record<Language, string>
}

// Quick response options
export interface QuickResponse {
  id: string
  text: Record<Language, string>
  forResult: ReportResult
}

// User (for gamification)
export interface User {
  id: string
  name: string
  totalReports: number
  verifiedReports: number
  points: number
  badges: Badge[]
  regionId?: string
}

// Badge
export interface Badge {
  id: string
  name: Record<Language, string>
  description: Record<Language, string>
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

// Leaderboard entry
export interface LeaderboardEntry {
  userId: string
  userName: string
  points: number
  reportsCount: number
  rank: number
}

// Statistics
export interface Statistics {
  totalSchools: number
  totalReports: number
  completedTasks: number
  pendingIssues: number
  reportsWithImages: number
  activeRegions: number
  topRegions: Array<{
    regionId: string
    reportsCount: number
  }>
}

export type ApplicationStatus =
  | 'submitted'
  | 'reviewing'
  | 'planned'
  | 'in_progress'
  | 'resolved'
  | 'rejected'

export interface ApplicationStatusUpdate {
  id: string
  status: ApplicationStatus
  note?: string
  createdAt: string
}

export interface UserApplication {
  id: string
  trackingNumber: string
  schoolId: string
  schoolNumber: string
  schoolName: Record<Language, string>
  taskType: string
  result: ReportResult
  comment: string
  images: string[]
  createdAt: string
  status: ApplicationStatus
  updates: ApplicationStatusUpdate[]
}