import type {
  School,
  PromiseItem,
  Verification,
  DashboardSummary,
  RegionOption,
  DistrictOption,
  CategoryOption,
  Report,
  CompareData
} from '@/types'

export const regions: RegionOption[] = [
  { value: 'tashkent', label: { uz: "Toshkent shahri", ru: "Город Ташкент", en: "Tashkent City" } },
  { value: 'tashkent_region', label: { uz: "Toshkent viloyati", ru: "Ташкентская область", en: "Tashkent Region" } },
  { value: 'samarkand', label: { uz: "Samarqand viloyati", ru: "Самаркандская область", en: "Samarkand Region" } },
  { value: 'bukhara', label: { uz: "Buxoro viloyati", ru: "Бухарская область", en: "Bukhara Region" } },
  { value: 'fergana', label: { uz: "Farg'ona viloyati", ru: "Ферганская область", en: "Fergana Region" } },
  { value: 'andijan', label: { uz: "Andijon viloyati", ru: "Андижанская область", en: "Andijan Region" } },
  { value: 'namangan', label: { uz: "Namangan viloyati", ru: "Наманганская область", en: "Namangan Region" } },
  { value: 'khorezm', label: { uz: "Xorazm viloyati", ru: "Хорезмская область", en: "Khorezm Region" } }
]

export const districts: DistrictOption[] = [
  { value: 'chilanzar', regionValue: 'tashkent', label: { uz: "Chilonzor tumani", ru: "Чиланзарский район", en: "Chilanzar District" } },
  { value: 'yakkasaray', regionValue: 'tashkent', label: { uz: "Yakkasaroy tumani", ru: "Яккасарайский район", en: "Yakkasaray District" } },
  { value: 'mirzo_ulugbek', regionValue: 'tashkent', label: { uz: "Mirzo Ulug'bek tumani", ru: "Мирзо-Улугбекский район", en: "Mirzo Ulugbek District" } },
  { value: 'sergeli', regionValue: 'tashkent', label: { uz: "Sergeli tumani", ru: "Сергелийский район", en: "Sergeli District" } },
  { value: 'yunusabad', regionValue: 'tashkent', label: { uz: "Yunusobod tumani", ru: "Юнусабадский район", en: "Yunusabad District" } },
  { value: 'olmaliq', regionValue: 'tashkent_region', label: { uz: "Olmaliq shahri", ru: "Город Алмалык", en: "Olmaliq City" } },
  { value: 'chirchiq', regionValue: 'tashkent_region', label: { uz: "Chirchiq shahri", ru: "Город Чирчик", en: "Chirchiq City" } },
  { value: 'samarkand_city', regionValue: 'samarkand', label: { uz: "Samarqand shahri", ru: "Город Самарканд", en: "Samarkand City" } },
  { value: 'bukhara_city', regionValue: 'bukhara', label: { uz: "Buxoro shahri", ru: "Город Бухара", en: "Bukhara City" } },
  { value: 'fergana_city', regionValue: 'fergana', label: { uz: "Farg'ona shahri", ru: "Город Фергана", en: "Fergana City" } }
]

export const categories: CategoryOption[] = [
  { value: 'repair', label: { uz: "Ta'mirlash ishlari", ru: "Ремонтные работы", en: "Repair works" } },
  { value: 'equipment', label: { uz: "Jihozlar", ru: "Оборудование", en: "Equipment" } },
  { value: 'furniture', label: { uz: "Mebel", ru: "Мебель", en: "Furniture" } },
  { value: 'heating', label: { uz: "Isitish tizimi", ru: "Система отопления", en: "Heating system" } },
  { value: 'sports', label: { uz: "Sport maydonchasi", ru: "Спортивная площадка", en: "Sports ground" } },
  { value: 'canteen', label: { uz: "Oshxona", ru: "Столовая", en: "Canteen" } },
  { value: 'library', label: { uz: "Kutubxona", ru: "Библиотека", en: "Library" } },
  { value: 'computer', label: { uz: "Kompyuter sinfi", ru: "Компьютерный класс", en: "Computer class" } }
]

export const schools: School[] = [
  {
    id: '1',
    name: "Mirzo Ulug'bek nomidagi maktab",
    number: 45,
    region: 'tashkent',
    district: 'mirzo_ulugbek',
    address: "Mirzo Ulug'bek tumani, Universitet ko'chasi, 15-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'completed',
    totalPromises: 8,
    completedPromises: 7,
    problemsFound: 1,
    totalReports: 24,
    coordinates: { lat: 41.3111, lng: 69.2797 }
  },
  {
    id: '2',
    name: "Alisher Navoiy nomidagi maktab",
    number: 122,
    region: 'tashkent',
    district: 'chilanzar',
    address: "Chilonzor tumani, Bunyodkor ko'chasi, 45-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'problem',
    totalPromises: 6,
    completedPromises: 3,
    problemsFound: 3,
    totalReports: 18,
    coordinates: { lat: 41.2856, lng: 69.2047 }
  },
  {
    id: '3',
    name: "Abdulla Qodiriy nomidagi maktab",
    number: 78,
    region: 'tashkent',
    district: 'yakkasaray',
    address: "Yakkasaroy tumani, Amir Temur ko'chasi, 89-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'under_review',
    totalPromises: 5,
    completedPromises: 4,
    problemsFound: 0,
    totalReports: 12,
    coordinates: { lat: 41.3089, lng: 69.2683 }
  },
  {
    id: '4',
    name: "Ibn Sino nomidagi maktab",
    number: 201,
    region: 'tashkent',
    district: 'yunusabad',
    address: "Yunusobod tumani, Minor ko'chasi, 23-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'completed',
    totalPromises: 10,
    completedPromises: 9,
    problemsFound: 1,
    totalReports: 31,
    coordinates: { lat: 41.3644, lng: 69.2858 }
  },
  {
    id: '5',
    name: "Bobur nomidagi maktab",
    number: 156,
    region: 'tashkent',
    district: 'sergeli',
    address: "Sergeli tumani, Yangi Sergeli ko'chasi, 67-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'not_verified',
    totalPromises: 7,
    completedPromises: 0,
    problemsFound: 0,
    totalReports: 0,
    coordinates: { lat: 41.2344, lng: 69.2186 }
  },
  {
    id: '6',
    name: "Al-Xorazmiy nomidagi maktab",
    number: 89,
    region: 'samarkand',
    district: 'samarkand_city',
    address: "Samarqand shahri, Registon ko'chasi, 34-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'completed',
    totalPromises: 9,
    completedPromises: 8,
    problemsFound: 1,
    totalReports: 27,
    coordinates: { lat: 39.6547, lng: 66.9597 }
  },
  {
    id: '7',
    name: "Temuriylar maktabi",
    number: 34,
    region: 'samarkand',
    district: 'samarkand_city',
    address: "Samarqand shahri, Temur ko'chasi, 12-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'problem',
    totalPromises: 4,
    completedPromises: 1,
    problemsFound: 2,
    totalReports: 15,
    coordinates: { lat: 39.6519, lng: 66.9558 }
  },
  {
    id: '8',
    name: "Buxoro davlat maktabi",
    number: 67,
    region: 'bukhara',
    district: 'bukhara_city',
    address: "Buxoro shahri, Mekhtar ko'chasi, 56-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'under_review',
    totalPromises: 6,
    completedPromises: 5,
    problemsFound: 0,
    totalReports: 14,
    coordinates: { lat: 39.7681, lng: 64.4556 }
  },
  {
    id: '9',
    name: "Farg'ona akademik litseyi",
    number: 12,
    region: 'fergana',
    district: 'fergana_city',
    address: "Farg'ona shahri, Mustaqillik ko'chasi, 78-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'completed',
    totalPromises: 11,
    completedPromises: 10,
    problemsFound: 1,
    totalReports: 35,
    coordinates: { lat: 40.3842, lng: 71.7869 }
  },
  {
    id: '10',
    name: "Chirchiq shahar maktabi",
    number: 23,
    region: 'tashkent_region',
    district: 'chirchiq',
    address: "Chirchiq shahri, Amir Temur ko'chasi, 45-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'problem',
    totalPromises: 5,
    completedPromises: 2,
    problemsFound: 2,
    totalReports: 11,
    coordinates: { lat: 41.4689, lng: 69.5822 }
  },
  {
    id: '11',
    name: "Olmaliq shahridagi 5-maktab",
    number: 5,
    region: 'tashkent_region',
    district: 'olmaliq',
    address: "Olmaliq shahri, Metallurglar ko'chasi, 32-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'not_verified',
    totalPromises: 8,
    completedPromises: 0,
    problemsFound: 0,
    totalReports: 3,
    coordinates: { lat: 40.8444, lng: 69.5992 }
  },
  {
    id: '12',
    name: "Xorazm viloyat maktabi",
    number: 101,
    region: 'khorezm',
    district: 'khorezm',
    address: "Urganch shahri, Al-Xorazmiy ko'chasi, 89-uy",
    image: '/placeholder.svg?height=300&width=400',
    status: 'completed',
    totalPromises: 7,
    completedPromises: 6,
    problemsFound: 1,
    totalReports: 22,
    coordinates: { lat: 41.5500, lng: 60.6333 }
  }
]

export const promiseItems: PromiseItem[] = [
  {
    id: 'p1',
    schoolId: '1',
    title: { uz: "Sport zali ta'mirlash", ru: "Ремонт спортзала", en: "Sports hall renovation" },
    description: { uz: "Sport zalini to'liq ta'mirlash va yangi jihozlar o'rnatish", ru: "Полный ремонт спортзала и установка нового оборудования", en: "Full renovation of sports hall and installation of new equipment" },
    category: 'sports',
    status: 'completed',
    deadline: '2025-06-01',
    createdAt: '2025-01-15'
  },
  {
    id: 'p2',
    schoolId: '1',
    title: { uz: "Kompyuter sinfi jihozlash", ru: "Оснащение компьютерного класса", en: "Computer class equipment" },
    description: { uz: "30 ta yangi kompyuter va zamonaviy texnika o'rnatish", ru: "Установка 30 новых компьютеров и современной техники", en: "Installation of 30 new computers and modern equipment" },
    category: 'computer',
    status: 'completed',
    deadline: '2025-03-01',
    createdAt: '2024-12-01'
  },
  {
    id: 'p3',
    schoolId: '1',
    title: { uz: "Oshxona ta'mirlash", ru: "Ремонт столовой", en: "Canteen renovation" },
    description: { uz: "Oshxonani zamonaviy standartlarga moslashtirish", ru: "Модернизация столовой по современным стандартам", en: "Modernizing canteen to current standards" },
    category: 'canteen',
    status: 'problem',
    deadline: '2025-04-15',
    createdAt: '2025-01-01'
  },
  {
    id: 'p4',
    schoolId: '2',
    title: { uz: "Isitish tizimi yangilash", ru: "Обновление отопления", en: "Heating system upgrade" },
    description: { uz: "Butun maktab bo'ylab isitish tizimini yangilash", ru: "Обновление системы отопления по всей школе", en: "Upgrading heating system throughout the school" },
    category: 'heating',
    status: 'problem',
    deadline: '2025-02-01',
    createdAt: '2024-10-15'
  },
  {
    id: 'p5',
    schoolId: '2',
    title: { uz: "Yangi mebel sotib olish", ru: "Закупка новой мебели", en: "New furniture purchase" },
    description: { uz: "Barcha sinflar uchun yangi partalr va stullar", ru: "Новые парты и стулья для всех классов", en: "New desks and chairs for all classrooms" },
    category: 'furniture',
    status: 'completed',
    deadline: '2025-01-15',
    createdAt: '2024-11-01'
  },
  {
    id: 'p6',
    schoolId: '3',
    title: { uz: "Kutubxona modernizatsiyasi", ru: "Модернизация библиотеки", en: "Library modernization" },
    description: { uz: "Kutubxonani zamonaviy raqamli formatga o'tkazish", ru: "Перевод библиотеки в современный цифровой формат", en: "Converting library to modern digital format" },
    category: 'library',
    status: 'under_review',
    deadline: '2025-05-01',
    createdAt: '2025-02-01'
  }
]

export const verifications: Verification[] = [
  {
    id: 'v1',
    schoolId: '1',
    schoolName: "Mirzo Ulug'bek nomidagi maktab #45",
    promiseId: 'p1',
    promiseTitle: "Sport zali ta'mirlash",
    result: 'completed',
    comment: "Sport zali to'liq ta'mirlangan, yangi jihozlar o'rnatilgan",
    quickReplies: ['workDone', 'allGood'],
    images: ['/placeholder.svg?height=200&width=300'],
    hasLocation: true,
    coordinates: { lat: 41.3111, lng: 69.2797 },
    createdAt: '2025-03-10T10:30:00',
    isVerifiedUser: true,
    userName: "Ahmad"
  },
  {
    id: 'v2',
    schoolId: '2',
    schoolName: "Alisher Navoiy nomidagi maktab #122",
    promiseId: 'p4',
    promiseTitle: "Isitish tizimi yangilash",
    result: 'problem',
    comment: "Isitish tizimi hali ham ishlamayapti, qishda sinflarda sovuq",
    quickReplies: ['notFinished', 'unusable'],
    images: ['/placeholder.svg?height=200&width=300', '/placeholder.svg?height=200&width=300'],
    hasLocation: true,
    coordinates: { lat: 41.2856, lng: 69.2047 },
    createdAt: '2025-03-08T14:15:00',
    isVerifiedUser: false
  },
  {
    id: 'v3',
    schoolId: '1',
    schoolName: "Mirzo Ulug'bek nomidagi maktab #45",
    promiseId: 'p2',
    promiseTitle: "Kompyuter sinfi jihozlash",
    result: 'completed',
    comment: "Barcha kompyuterlar ishlayapti, internet tezligi yaxshi",
    quickReplies: ['workDone', 'usable'],
    images: [],
    hasLocation: false,
    createdAt: '2025-03-05T09:00:00',
    isVerifiedUser: true,
    userName: "Dilnoza"
  },
  {
    id: 'v4',
    schoolId: '3',
    schoolName: "Abdulla Qodiriy nomidagi maktab #78",
    promiseId: 'p6',
    promiseTitle: "Kutubxona modernizatsiyasi",
    result: 'under_review',
    comment: "Ishlar davom etmoqda, taxminan 80% tayyor",
    quickReplies: ['partial'],
    images: ['/placeholder.svg?height=200&width=300'],
    hasLocation: true,
    coordinates: { lat: 41.3089, lng: 69.2683 },
    createdAt: '2025-03-12T16:45:00',
    isVerifiedUser: false
  }
]

export const reports: Report[] = verifications.map((v, index) => ({
  ...v,
  adminStatus: index === 0 ? 'approved' : index === 1 ? 'flagged' : index === 2 ? 'reviewed' : 'pending'
}))

export const dashboardSummary: DashboardSummary = {
  totalSchools: 12,
  totalReports: 212,
  completedWorks: 51,
  problemsFound: 12,
  reportsWithPhotos: 156,
  reviewedReports: 189,
  verifiedUserReports: 98
}

export const compareData: CompareData[] = [
  {
    id: 'tashkent',
    name: "Toshkent shahri",
    totalPromises: 36,
    completedPromises: 23,
    problemsFound: 7,
    totalReports: 85,
    reportsWithPhotos: 62,
    completionRate: 64
  },
  {
    id: 'samarkand',
    name: "Samarqand viloyati",
    totalPromises: 13,
    completedPromises: 9,
    problemsFound: 3,
    totalReports: 42,
    reportsWithPhotos: 31,
    completionRate: 69
  },
  {
    id: 'bukhara',
    name: "Buxoro viloyati",
    totalPromises: 6,
    completedPromises: 5,
    problemsFound: 0,
    totalReports: 14,
    reportsWithPhotos: 10,
    completionRate: 83
  },
  {
    id: 'fergana',
    name: "Farg'ona viloyati",
    totalPromises: 11,
    completedPromises: 10,
    problemsFound: 1,
    totalReports: 35,
    reportsWithPhotos: 28,
    completionRate: 91
  }
]

// Helper function to get school by ID
export function getSchoolById(id: string): School | undefined {
  return schools.find(s => s.id === id)
}

// Helper function to get promises by school ID
export function getPromisesBySchoolId(schoolId: string): PromiseItem[] {
  return promiseItems.filter(p => p.schoolId === schoolId)
}

// Helper function to get verifications by school ID
export function getVerificationsBySchoolId(schoolId: string): Verification[] {
  return verifications.filter(v => v.schoolId === schoolId)
}

// Helper function to get districts by region
export function getDistrictsByRegion(regionValue: string): DistrictOption[] {
  return districts.filter(d => d.regionValue === regionValue)
}
