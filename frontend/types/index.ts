// Language and Theme types
export type Language = 'uz' | 'ru' | 'en'
export type ThemeMode = 'light' | 'dark'

// Status types
export type VerificationStatus = 'completed' | 'problem' | 'under_review' | 'not_verified'

// School related types
export interface School {
  id: string
  name: string
  number: number
  region: string
  district: string
  address: string
  image: string
  status: VerificationStatus
  totalPromises: number
  completedPromises: number
  problemsFound: number
  totalReports: number
  coordinates: {
    lat: number
    lng: number
  }
}

export interface PromiseItem {
  id: string
  schoolId: string
  title: {
    uz: string
    ru: string
    en: string
  }
  description: {
    uz: string
    ru: string
    en: string
  }
  category: string
  status: VerificationStatus
  deadline?: string
  createdAt: string
}

export interface Verification {
  id: string
  schoolId: string
  schoolName: string
  promiseId: string
  promiseTitle: string
  result: VerificationStatus
  comment: string
  quickReplies: string[]
  images: string[]
  hasLocation: boolean
  coordinates?: {
    lat: number
    lng: number
  }
  createdAt: string
  isVerifiedUser: boolean
  userName?: string
}

export interface DashboardSummary {
  totalSchools: number
  totalReports: number
  completedWorks: number
  problemsFound: number
  reportsWithPhotos: number
  reviewedReports: number
  verifiedUserReports: number
}

export interface QuickReply {
  id: string
  text: {
    uz: string
    ru: string
    en: string
  }
  forResult: 'completed' | 'problem'
}

export interface UserState {
  isGuest: boolean
  isVerified: boolean
  name?: string
  email?: string
}

export interface MapMarker {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  status: VerificationStatus
  reportsCount: number
  district: string
}

export interface RegionOption {
  value: string
  label: {
    uz: string
    ru: string
    en: string
  }
}

export interface DistrictOption {
  value: string
  regionValue: string
  label: {
    uz: string
    ru: string
    en: string
  }
}

export interface CategoryOption {
  value: string
  label: {
    uz: string
    ru: string
    en: string
  }
}

// Report/Verification for admin
export interface Report extends Verification {
  adminStatus: 'pending' | 'reviewed' | 'approved' | 'flagged'
}

// Comparison data
export interface CompareData {
  id: string
  name: string
  totalPromises: number
  completedPromises: number
  problemsFound: number
  totalReports: number
  reportsWithPhotos: number
  completionRate: number
}
