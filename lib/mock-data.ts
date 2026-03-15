import type { School, Region, District, Report, TaskType, User, Badge, Statistics, LeaderboardEntry } from '@/types'

export const regions: Region[] = [
  { id: 'tashkent', name: { uz: 'Toshkent shahri', ru: 'Город Ташкент', en: 'Tashkent City' } },
  { id: 'tashkent-region', name: { uz: 'Toshkent viloyati', ru: 'Ташкентская область', en: 'Tashkent Region' } },
  { id: 'samarkand', name: { uz: 'Samarqand viloyati', ru: 'Самаркандская область', en: 'Samarkand Region' } },
  { id: 'bukhara', name: { uz: 'Buxoro viloyati', ru: 'Бухарская область', en: 'Bukhara Region' } },
  { id: 'fergana', name: { uz: 'Farg\'ona viloyati', ru: 'Ферганская область', en: 'Fergana Region' } },
  { id: 'andijan', name: { uz: 'Andijon viloyati', ru: 'Андижанская область', en: 'Andijan Region' } },
  { id: 'namangan', name: { uz: 'Namangan viloyati', ru: 'Наманганская область', en: 'Namangan Region' } },
  { id: 'kashkadarya', name: { uz: 'Qashqadaryo viloyati', ru: 'Кашкадарьинская область', en: 'Kashkadarya Region' } },
]

export const districts: District[] = [
  { id: 'chilanzar', regionId: 'tashkent', name: { uz: 'Chilonzor tumani', ru: 'Чиланзарский район', en: 'Chilanzar District' } },
  { id: 'yunusabad', regionId: 'tashkent', name: { uz: 'Yunusobod tumani', ru: 'Юнусабадский район', en: 'Yunusabad District' } },
  { id: 'mirzo-ulugbek', regionId: 'tashkent', name: { uz: 'Mirzo Ulug\'bek tumani', ru: 'Мирзо-Улугбекский район', en: 'Mirzo Ulugbek District' } },
  { id: 'sergeli', regionId: 'tashkent', name: { uz: 'Sergeli tumani', ru: 'Сергелийский район', en: 'Sergeli District' } },
  { id: 'yakkasaray', regionId: 'tashkent', name: { uz: 'Yakkasaroy tumani', ru: 'Яккасарайский район', en: 'Yakkasaray District' } },
  { id: 'olmaliq', regionId: 'tashkent-region', name: { uz: 'Olmaliq shahri', ru: 'Город Алмалык', en: 'Olmaliq City' } },
  { id: 'angren', regionId: 'tashkent-region', name: { uz: 'Angren shahri', ru: 'Город Ангрен', en: 'Angren City' } },
  { id: 'samarkand-city', regionId: 'samarkand', name: { uz: 'Samarqand shahri', ru: 'Город Самарканд', en: 'Samarkand City' } },
  { id: 'urgut', regionId: 'samarkand', name: { uz: 'Urgut tumani', ru: 'Ургутский район', en: 'Urgut District' } },
  { id: 'bukhara-city', regionId: 'bukhara', name: { uz: 'Buxoro shahri', ru: 'Город Бухара', en: 'Bukhara City' } },
]

export const taskTypes: TaskType[] = [
  { id: 'heating', name: { uz: 'Isitish tizimi', ru: 'Система отопления', en: 'Heating System' } },
  { id: 'roof', name: { uz: 'Tom holati', ru: 'Состояние крыши', en: 'Roof Condition' } },
  { id: 'windows', name: { uz: 'Derazalar', ru: 'Окна', en: 'Windows' } },
  { id: 'toilet', name: { uz: 'Hojatxona', ru: 'Туалет', en: 'Toilet' } },
  { id: 'playground', name: { uz: 'O\'yin maydoni', ru: 'Игровая площадка', en: 'Playground' } },
  { id: 'furniture', name: { uz: 'Mebel', ru: 'Мебель', en: 'Furniture' } },
  { id: 'electricity', name: { uz: 'Elektr ta\'minoti', ru: 'Электроснабжение', en: 'Electricity' } },
  { id: 'water', name: { uz: 'Suv ta\'minoti', ru: 'Водоснабжение', en: 'Water Supply' } },
]

export const schools: School[] = [
  {
    id: '1',
    number: '15',
    name: { uz: '15-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №15', en: 'Secondary School No. 15' },
    regionId: 'tashkent',
    districtId: 'chilanzar',
    address: { uz: 'Chilonzor tumani, 12-mavze, 5-uy', ru: 'Чиланзарский район, 12-массив, дом 5', en: 'Chilanzar District, 12th block, building 5' },
    status: 'good',
    totalReports: 45,
    completedTasks: 38,
    pendingIssues: 2,
    lastReportDate: '2026-03-14',
  },
  {
    id: '2',
    number: '67',
    name: { uz: '67-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №67', en: 'Secondary School No. 67' },
    regionId: 'tashkent',
    districtId: 'yunusabad',
    address: { uz: 'Yunusobod tumani, 4-mavze, 15-uy', ru: 'Юнусабадский район, 4-массив, дом 15', en: 'Yunusabad District, 4th block, building 15' },
    status: 'issue',
    totalReports: 32,
    completedTasks: 20,
    pendingIssues: 8,
    lastReportDate: '2026-03-13',
  },
  {
    id: '3',
    number: '142',
    name: { uz: '142-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №142', en: 'Secondary School No. 142' },
    regionId: 'tashkent',
    districtId: 'mirzo-ulugbek',
    address: { uz: 'Mirzo Ulug\'bek tumani, Buyuk Ipak Yo\'li ko\'chasi, 45', ru: 'Мирзо-Улугбекский район, ул. Великий Шёлковый Путь, 45', en: 'Mirzo Ulugbek District, Great Silk Road Street, 45' },
    status: 'good',
    totalReports: 28,
    completedTasks: 25,
    pendingIssues: 1,
    lastReportDate: '2026-03-12',
  },
  {
    id: '4',
    number: '89',
    name: { uz: '89-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №89', en: 'Secondary School No. 89' },
    regionId: 'tashkent',
    districtId: 'sergeli',
    address: { uz: 'Sergeli tumani, 7-mavze, 22-uy', ru: 'Сергелийский район, 7-массив, дом 22', en: 'Sergeli District, 7th block, building 22' },
    status: 'pending',
    totalReports: 15,
    completedTasks: 10,
    pendingIssues: 3,
    lastReportDate: '2026-03-10',
  },
  {
    id: '5',
    number: '23',
    name: { uz: '23-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №23', en: 'Secondary School No. 23' },
    regionId: 'samarkand',
    districtId: 'samarkand-city',
    address: { uz: 'Samarqand shahri, Registon ko\'chasi, 12', ru: 'Город Самарканд, ул. Регистан, 12', en: 'Samarkand City, Registan Street, 12' },
    status: 'good',
    totalReports: 52,
    completedTasks: 48,
    pendingIssues: 1,
    lastReportDate: '2026-03-14',
  },
  {
    id: '6',
    number: '8',
    name: { uz: '8-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №8', en: 'Secondary School No. 8' },
    regionId: 'bukhara',
    districtId: 'bukhara-city',
    address: { uz: 'Buxoro shahri, Navoiy ko\'chasi, 34', ru: 'Город Бухара, ул. Навои, 34', en: 'Bukhara City, Navoi Street, 34' },
    status: 'issue',
    totalReports: 22,
    completedTasks: 14,
    pendingIssues: 5,
    lastReportDate: '2026-03-11',
  },
  {
    id: '7',
    number: '56',
    name: { uz: '56-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №56', en: 'Secondary School No. 56' },
    regionId: 'tashkent',
    districtId: 'yakkasaray',
    address: { uz: 'Yakkasaroy tumani, Shota Rustaveli ko\'chasi, 78', ru: 'Яккасарайский район, ул. Шота Руставели, 78', en: 'Yakkasaray District, Shota Rustaveli Street, 78' },
    status: 'good',
    totalReports: 38,
    completedTasks: 35,
    pendingIssues: 0,
    lastReportDate: '2026-03-14',
  },
  {
    id: '8',
    number: '112',
    name: { uz: '112-sonli umumiy o\'rta ta\'lim maktabi', ru: 'Общеобразовательная школа №112', en: 'Secondary School No. 112' },
    regionId: 'tashkent-region',
    districtId: 'olmaliq',
    address: { uz: 'Olmaliq shahri, Amir Temur ko\'chasi, 56', ru: 'Город Алмалык, ул. Амира Темура, 56', en: 'Olmaliq City, Amir Temur Street, 56' },
    status: 'pending',
    totalReports: 18,
    completedTasks: 12,
    pendingIssues: 4,
    lastReportDate: '2026-03-09',
  },
]

export const reports: Report[] = [
  {
    id: '1',
    schoolId: '1',
    taskType: 'heating',
    result: 'completed',
    comment: 'Isitish tizimi to\'liq ishlamoqda. Hamma sinfxonalarda issiq.',
    images: [],
    createdAt: '2026-03-14T10:30:00Z',
    verified: true,
  },
  {
    id: '2',
    schoolId: '2',
    taskType: 'roof',
    result: 'issue',
    comment: 'Tom qisman oqmoqda. Ta\'mirlash kerak.',
    images: [],
    createdAt: '2026-03-13T14:20:00Z',
    verified: true,
  },
  {
    id: '3',
    schoolId: '2',
    taskType: 'windows',
    result: 'issue',
    comment: 'Ba\'zi derazalar singan. Shisha almashtirilishi kerak.',
    images: [],
    createdAt: '2026-03-13T09:15:00Z',
    verified: false,
  },
  {
    id: '4',
    schoolId: '3',
    taskType: 'playground',
    result: 'completed',
    comment: 'O\'yin maydoni yangilandi. Bolalar xavfsiz o\'ynashlari mumkin.',
    images: [],
    createdAt: '2026-03-12T16:45:00Z',
    verified: true,
  },
  {
    id: '5',
    schoolId: '5',
    taskType: 'toilet',
    result: 'completed',
    comment: 'Hojatxona ta\'mirlandi va tozalandi.',
    images: [],
    createdAt: '2026-03-14T08:00:00Z',
    verified: true,
  },
  {
    id: '6',
    schoolId: '6',
    taskType: 'electricity',
    result: 'issue',
    comment: 'Ba\'zi sinflarda elektr chiroqlari ishlamayapti.',
    images: [],
    createdAt: '2026-03-11T11:30:00Z',
    verified: true,
  },
]

export const defaultBadges: Badge[] = [
  {
    id: 'first-report',
    name: { uz: 'Birinchi xabar', ru: 'Первое сообщение', en: 'First Report' },
    description: { uz: 'Birinchi xabaringizni yubordingiz', ru: 'Вы отправили первое сообщение', en: 'You sent your first report' },
    icon: 'star',
    unlocked: false,
  },
  {
    id: 'active-observer',
    name: { uz: 'Faol kuzatuvchi', ru: 'Активный наблюдатель', en: 'Active Observer' },
    description: { uz: '5 ta xabar yubordingiz', ru: 'Вы отправили 5 сообщений', en: 'You sent 5 reports' },
    icon: 'eye',
    unlocked: false,
  },
  {
    id: 'trusted-user',
    name: { uz: 'Ishonchli foydalanuvchi', ru: 'Надёжный пользователь', en: 'Trusted User' },
    description: { uz: '10 ta tasdiqlangan xabar', ru: '10 подтверждённых сообщений', en: '10 verified reports' },
    icon: 'shield',
    unlocked: false,
  },
  {
    id: 'community-leader',
    name: { uz: 'Mahalla faoli', ru: 'Лидер сообщества', en: 'Community Leader' },
    description: { uz: '25 ta foydali xabar', ru: '25 полезных сообщений', en: '25 helpful reports' },
    icon: 'trophy',
    unlocked: false,
  },
]

export const mockUser: User = {
  id: 'guest',
  name: 'Mehmon',
  totalReports: 3,
  verifiedReports: 2,
  points: 35,
  badges: [
    { ...defaultBadges[0], unlocked: true, unlockedAt: '2026-03-10T12:00:00Z' },
    ...defaultBadges.slice(1),
  ],
}

export const leaderboard: LeaderboardEntry[] = [
  { userId: '1', userName: 'Aziza M.', points: 450, reportsCount: 42, rank: 1 },
  { userId: '2', userName: 'Bobur K.', points: 380, reportsCount: 35, rank: 2 },
  { userId: '3', userName: 'Dilnoza S.', points: 320, reportsCount: 28, rank: 3 },
  { userId: '4', userName: 'Eldor N.', points: 290, reportsCount: 25, rank: 4 },
  { userId: '5', userName: 'Feruza A.', points: 250, reportsCount: 22, rank: 5 },
]

export const statistics: Statistics = {
  totalSchools: 1248,
  totalReports: 8567,
  completedTasks: 6234,
  pendingIssues: 892,
  reportsWithImages: 4521,
  activeRegions: 14,
  topRegions: [
    { regionId: 'tashkent', reportsCount: 2845 },
    { regionId: 'samarkand', reportsCount: 1567 },
    { regionId: 'fergana', reportsCount: 1234 },
    { regionId: 'bukhara', reportsCount: 987 },
    { regionId: 'andijan', reportsCount: 856 },
  ],
}

// Helper functions
export function getSchoolById(id: string): School | undefined {
  return schools.find(s => s.id === id)
}

export function getSchoolsByRegion(regionId: string): School[] {
  return schools.filter(s => s.regionId === regionId)
}

export function getSchoolsByDistrict(districtId: string): School[] {
  return schools.filter(s => s.districtId === districtId)
}

export function getDistrictsByRegion(regionId: string): District[] {
  return districts.filter(d => d.regionId === regionId)
}

export function getRegionById(id: string): Region | undefined {
  return regions.find(r => r.id === id)
}

export function getDistrictById(id: string): District | undefined {
  return districts.find(d => d.id === id)
}

export function getReportsBySchool(schoolId: string): Report[] {
  return reports.filter(r => r.schoolId === schoolId)
}

export function searchSchools(query: string, regionId?: string, districtId?: string, status?: string): School[] {
  return schools.filter(school => {
    const matchesQuery = !query || 
      school.number.includes(query) ||
      school.name.uz.toLowerCase().includes(query.toLowerCase()) ||
      school.name.ru.toLowerCase().includes(query.toLowerCase()) ||
      school.name.en.toLowerCase().includes(query.toLowerCase())
    
    const matchesRegion = !regionId || school.regionId === regionId
    const matchesDistrict = !districtId || school.districtId === districtId
    const matchesStatus = !status || status === 'all' || school.status === status
    
    return matchesQuery && matchesRegion && matchesDistrict && matchesStatus
  })
}
