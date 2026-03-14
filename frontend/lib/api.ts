// API layer - ready for Django REST API integration
// Currently using mock data, will be replaced with actual API calls

import type {
  School,
  PromiseItem,
  Verification,
  DashboardSummary,
  Report
} from '@/types'

import {
  schools,
  promiseItems,
  verifications,
  reports,
  dashboardSummary,
  getSchoolById as mockGetSchoolById,
  getPromisesBySchoolId as mockGetPromisesBySchoolId,
  getVerificationsBySchoolId as mockGetVerificationsBySchoolId
} from './mock-data'

// Base URL for Django API - will be set via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// API configuration
const USE_MOCK_DATA = true // Set to false when Django API is ready

// Simulated delay for realistic feel
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300))

// Schools API
export async function fetchSchools(params?: {
  region?: string
  district?: string
  status?: string
  search?: string
}): Promise<School[]> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    let result = [...schools]
    
    if (params?.region) {
      result = result.filter(s => s.region === params.region)
    }
    if (params?.district) {
      result = result.filter(s => s.district === params.district)
    }
    if (params?.status) {
      result = result.filter(s => s.status === params.status)
    }
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.number.toString().includes(searchLower)
      )
    }
    
    return result
  }
  
  const queryParams = new URLSearchParams()
  if (params?.region) queryParams.set('region', params.region)
  if (params?.district) queryParams.set('district', params.district)
  if (params?.status) queryParams.set('status', params.status)
  if (params?.search) queryParams.set('search', params.search)
  
  const response = await fetch(`${API_BASE_URL}/api/schools/?${queryParams}`)
  if (!response.ok) throw new Error('Failed to fetch schools')
  return response.json()
}

export async function fetchSchoolById(id: string): Promise<School | null> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    return mockGetSchoolById(id) || null
  }
  
  const response = await fetch(`${API_BASE_URL}/api/schools/${id}/`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error('Failed to fetch school')
  }
  return response.json()
}

// Promises API
export async function fetchPromisesBySchoolId(schoolId: string): Promise<PromiseItem[]> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    return mockGetPromisesBySchoolId(schoolId)
  }
  
  const response = await fetch(`${API_BASE_URL}/api/schools/${schoolId}/promises/`)
  if (!response.ok) throw new Error('Failed to fetch promises')
  return response.json()
}

// Verifications API
export async function fetchVerificationsBySchoolId(schoolId: string): Promise<Verification[]> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    return mockGetVerificationsBySchoolId(schoolId)
  }
  
  const response = await fetch(`${API_BASE_URL}/api/schools/${schoolId}/verifications/`)
  if (!response.ok) throw new Error('Failed to fetch verifications')
  return response.json()
}

export async function submitVerification(data: {
  schoolId: string
  promiseId: string
  result: string
  comment: string
  quickReplies: string[]
  images: string[]
  hasLocation: boolean
  coordinates?: { lat: number; lng: number }
}): Promise<Verification> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    const newVerification: Verification = {
      id: `v${Date.now()}`,
      schoolId: data.schoolId,
      schoolName: mockGetSchoolById(data.schoolId)?.name || '',
      promiseId: data.promiseId,
      promiseTitle: promiseItems.find(p => p.id === data.promiseId)?.title.uz || '',
      result: data.result as Verification['result'],
      comment: data.comment,
      quickReplies: data.quickReplies,
      images: data.images,
      hasLocation: data.hasLocation,
      coordinates: data.coordinates,
      createdAt: new Date().toISOString(),
      isVerifiedUser: false
    }
    return newVerification
  }
  
  const response = await fetch(`${API_BASE_URL}/api/verifications/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to submit verification')
  return response.json()
}

// Dashboard API
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    return dashboardSummary
  }
  
  const response = await fetch(`${API_BASE_URL}/api/dashboard/summary/`)
  if (!response.ok) throw new Error('Failed to fetch dashboard summary')
  return response.json()
}

// Reports API (for admin)
export async function fetchReports(params?: {
  schoolId?: string
  status?: string
  result?: string
  search?: string
}): Promise<Report[]> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    let result = [...reports]
    
    if (params?.schoolId) {
      result = result.filter(r => r.schoolId === params.schoolId)
    }
    if (params?.status) {
      result = result.filter(r => r.adminStatus === params.status)
    }
    if (params?.result) {
      result = result.filter(r => r.result === params.result)
    }
    
    return result
  }
  
  const queryParams = new URLSearchParams()
  if (params?.schoolId) queryParams.set('school_id', params.schoolId)
  if (params?.status) queryParams.set('status', params.status)
  if (params?.result) queryParams.set('result', params.result)
  if (params?.search) queryParams.set('search', params.search)
  
  const response = await fetch(`${API_BASE_URL}/api/reports/?${queryParams}`)
  if (!response.ok) throw new Error('Failed to fetch reports')
  return response.json()
}

export async function updateReportStatus(
  reportId: string,
  status: 'pending' | 'reviewed' | 'approved' | 'flagged'
): Promise<Report> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    const report = reports.find(r => r.id === reportId)
    if (!report) throw new Error('Report not found')
    report.adminStatus = status
    return report
  }
  
  const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ admin_status: status })
  })
  if (!response.ok) throw new Error('Failed to update report status')
  return response.json()
}

// Aggregations API (for results page)
export async function fetchAggregations(): Promise<{
  byRegion: Record<string, { completed: number; problems: number; total: number }>
  byCategory: Record<string, { completed: number; problems: number; total: number }>
}> {
  if (USE_MOCK_DATA) {
    await simulateDelay()
    return {
      byRegion: {
        tashkent: { completed: 23, problems: 7, total: 36 },
        samarkand: { completed: 9, problems: 3, total: 13 },
        bukhara: { completed: 5, problems: 0, total: 6 },
        fergana: { completed: 10, problems: 1, total: 11 }
      },
      byCategory: {
        repair: { completed: 15, problems: 4, total: 22 },
        equipment: { completed: 12, problems: 2, total: 15 },
        furniture: { completed: 8, problems: 1, total: 10 },
        heating: { completed: 5, problems: 3, total: 9 },
        sports: { completed: 7, problems: 1, total: 9 }
      }
    }
  }
  
  const response = await fetch(`${API_BASE_URL}/api/reports/aggregations/`)
  if (!response.ok) throw new Error('Failed to fetch aggregations')
  return response.json()
}
