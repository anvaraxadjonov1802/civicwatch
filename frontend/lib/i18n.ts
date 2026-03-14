import type { Language } from '@/types'

export const translations = {
  // Navigation
  nav: {
    home: {
      uz: "Bosh sahifa",
      ru: "Главная",
      en: "Home"
    },
    schools: {
      uz: "Maktablar",
      ru: "Школы",
      en: "Schools"
    },
    dashboard: {
      uz: "Dashboard",
      ru: "Дашборд",
      en: "Dashboard"
    },
    results: {
      uz: "Natijalar",
      ru: "Результаты",
      en: "Results"
    },
    guestUser: {
      uz: "Mehmon foydalanuvchi",
      ru: "Гость",
      en: "Guest user"
    },
    verify: {
      uz: "Tasdiqlash",
      ru: "Подтвердить",
      en: "Verify"
    }
  },

  // Hero section
  hero: {
    title: {
      uz: "Fuqarolik nazorati platformasi",
      ru: "Платформа гражданского контроля",
      en: "Civic Oversight Platform"
    },
    subtitle: {
      uz: "Maktablardagi va'da qilingan ishlarni kuzating, hisobot yuboring va shaffoflikka hissa qo'shing",
      ru: "Следите за обещанными работами в школах, отправляйте отчеты и способствуйте прозрачности",
      en: "Monitor promised infrastructure projects, submit reports, and contribute to transparency"
    },
    viewSchools: {
      uz: "Maktablarni ko'rish",
      ru: "Смотреть школы",
      en: "View Schools"
    },
    viewResults: {
      uz: "Natijalarni ko'rish",
      ru: "Смотреть результаты",
      en: "View Results"
    }
  },

  // School finder
  finder: {
    title: {
      uz: "Maktabni topish",
      ru: "Найти школу",
      en: "Find School"
    },
    searchPlaceholder: {
      uz: "Maktab nomi yoki raqami",
      ru: "Название или номер школы",
      en: "School name or number"
    },
    region: {
      uz: "Viloyat",
      ru: "Область",
      en: "Region"
    },
    district: {
      uz: "Tuman",
      ru: "Район",
      en: "District"
    },
    status: {
      uz: "Holat",
      ru: "Статус",
      en: "Status"
    },
    find: {
      uz: "Topish",
      ru: "Найти",
      en: "Find"
    },
    allRegions: {
      uz: "Barcha viloyatlar",
      ru: "Все области",
      en: "All regions"
    },
    allDistricts: {
      uz: "Barcha tumanlar",
      ru: "Все районы",
      en: "All districts"
    },
    allStatuses: {
      uz: "Barcha holatlar",
      ru: "Все статусы",
      en: "All statuses"
    }
  },

  // Status badges
  status: {
    completed: {
      uz: "Bajarilgan",
      ru: "Выполнено",
      en: "Completed"
    },
    problem: {
      uz: "Muammo bor",
      ru: "Есть проблема",
      en: "Problem found"
    },
    under_review: {
      uz: "Ko'rib chiqilmoqda",
      ru: "На рассмотрении",
      en: "Under review"
    },
    not_verified: {
      uz: "Tekshirilmagan",
      ru: "Не проверено",
      en: "Not verified"
    }
  },

  // School card & details
  school: {
    details: {
      uz: "Batafsil",
      ru: "Подробнее",
      en: "Details"
    },
    verify: {
      uz: "Tekshirish",
      ru: "Проверить",
      en: "Verify"
    },
    reports: {
      uz: "hisobotlar",
      ru: "отчётов",
      en: "reports"
    },
    totalPromises: {
      uz: "Jami va'da qilingan ishlar",
      ru: "Всего обещанных работ",
      en: "Total promised works"
    },
    completedPromises: {
      uz: "Bajarilgan ishlar",
      ru: "Выполненные работы",
      en: "Completed works"
    },
    problemsFound: {
      uz: "Muammo topilgan",
      ru: "Обнаружено проблем",
      en: "Problems found"
    },
    totalReports: {
      uz: "Jami hisobotlar",
      ru: "Всего отчётов",
      en: "Total reports"
    },
    promisedWorks: {
      uz: "Va'da qilingan ishlar",
      ru: "Обещанные работы",
      en: "Promised Works"
    },
    recentVerifications: {
      uz: "So'nggi tekshiruvlar",
      ru: "Последние проверки",
      en: "Recent Verifications"
    },
    verifyThisSchool: {
      uz: "Bu maktabni tekshirish",
      ru: "Проверить эту школу",
      en: "Verify This School"
    },
    address: {
      uz: "Manzil",
      ru: "Адрес",
      en: "Address"
    }
  },

  // Verification page
  verification: {
    quickMode: {
      uz: "Tez tekshiruv",
      ru: "Быстрая проверка",
      en: "Quick Verification"
    },
    detailedMode: {
      uz: "Batafsil tekshiruv",
      ru: "Подробная проверка",
      en: "Detailed Verification"
    },
    schoolName: {
      uz: "Maktab nomi",
      ru: "Название школы",
      en: "School Name"
    },
    selectWork: {
      uz: "Tekshirilayotgan ish",
      ru: "Проверяемая работа",
      en: "Work being verified"
    },
    selectResult: {
      uz: "Natija",
      ru: "Результат",
      en: "Result"
    },
    quickReplies: {
      uz: "Tayyor javoblar",
      ru: "Готовые ответы",
      en: "Quick Replies"
    },
    customComment: {
      uz: "Qo'shimcha izoh",
      ru: "Дополнительный комментарий",
      en: "Additional comment"
    },
    commentPlaceholder: {
      uz: "O'z izohingizni yozing...",
      ru: "Напишите свой комментарий...",
      en: "Write your comment..."
    },
    addPhoto: {
      uz: "Surat qo'shish",
      ru: "Добавить фото",
      en: "Add Photo"
    },
    uploadFromDevice: {
      uz: "Qurilmadan yuklash",
      ru: "Загрузить с устройства",
      en: "Upload from device"
    },
    takePhoto: {
      uz: "Kamera orqali",
      ru: "Сделать фото",
      en: "Take photo"
    },
    photoHelp: {
      uz: "Surat hisobot ishonchliligini oshiradi",
      ru: "Фото повышает достоверность отчёта",
      en: "Photos increase report credibility"
    },
    includeLocation: {
      uz: "Joylashuvni qo'shish",
      ru: "Добавить местоположение",
      en: "Include location"
    },
    submit: {
      uz: "Yuborish",
      ru: "Отправить",
      en: "Submit"
    },
    successTitle: {
      uz: "Muvaffaqiyatli yuborildi!",
      ru: "Успешно отправлено!",
      en: "Successfully submitted!"
    },
    successMessage: {
      uz: "Rahmat, sizning hissangiz shaffoflikka yordam beradi",
      ru: "Спасибо, ваш вклад способствует прозрачности",
      en: "Thank you, your contribution helps transparency"
    },
    verifyAnother: {
      uz: "Yana bir obyektni tekshirish",
      ru: "Проверить другой объект",
      en: "Verify another"
    },
    viewDashboard: {
      uz: "Dashboardni ko'rish",
      ru: "Смотреть дашборд",
      en: "View Dashboard"
    }
  },

  // Quick replies
  quickReplies: {
    completed: {
      workDone: {
        uz: "Ish haqiqatda bajarilgan",
        ru: "Работа действительно выполнена",
        en: "Work is actually done"
      },
      allGood: {
        uz: "Hamma narsa joyida",
        ru: "Всё в порядке",
        en: "Everything is in place"
      },
      promiseVisible: {
        uz: "Va'da qilingan ish ko'rinib turibdi",
        ru: "Обещанная работа видна",
        en: "Promised work is visible"
      },
      conditionGood: {
        uz: "Holat yaxshi",
        ru: "Состояние хорошее",
        en: "Condition is good"
      },
      usable: {
        uz: "Foydalanish mumkin",
        ru: "Можно использовать",
        en: "Can be used"
      }
    },
    problem: {
      notFinished: {
        uz: "Ish hali tugallanmagan",
        ru: "Работа ещё не завершена",
        en: "Work not finished yet"
      },
      notPresent: {
        uz: "Va'da qilingan narsa joyida yo'q",
        ru: "Обещанного нет на месте",
        en: "Promised item not present"
      },
      poorQuality: {
        uz: "Sifati yomon",
        ru: "Плохое качество",
        en: "Poor quality"
      },
      unusable: {
        uz: "Foydalanib bo'lmaydi",
        ru: "Нельзя использовать",
        en: "Cannot be used"
      },
      partial: {
        uz: "Qisman qilingan",
        ru: "Частично выполнено",
        en: "Partially done"
      },
      problemRemains: {
        uz: "Muammo saqlanib qolgan",
        ru: "Проблема осталась",
        en: "Problem remains"
      }
    }
  },

  // Results page
  results: {
    map: {
      uz: "Xarita",
      ru: "Карта",
      en: "Map"
    },
    data: {
      uz: "Ma'lumotlar",
      ru: "Данные",
      en: "Data"
    },
    charts: {
      uz: "Grafiklar",
      ru: "Графики",
      en: "Charts"
    },
    compare: {
      uz: "Solishtirish",
      ru: "Сравнение",
      en: "Compare"
    },
    filters: {
      uz: "Filterlar",
      ru: "Фильтры",
      en: "Filters"
    },
    category: {
      uz: "Kategoriya",
      ru: "Категория",
      en: "Category"
    },
    allCategories: {
      uz: "Barcha kategoriyalar",
      ru: "Все категории",
      en: "All categories"
    },
    rowsPerPage: {
      uz: "Satrlar soni",
      ru: "Строк на странице",
      en: "Rows per page"
    },
    selectFirst: {
      uz: "Birinchi obyektni tanlang",
      ru: "Выберите первый объект",
      en: "Select first item"
    },
    selectSecond: {
      uz: "Ikkinchi obyektni tanlang",
      ru: "Выберите второй объект",
      en: "Select second item"
    },
    completionRate: {
      uz: "Bajarilish darajasi",
      ru: "Уровень выполнения",
      en: "Completion rate"
    },
    reportsWithPhotos: {
      uz: "Suratli hisobotlar",
      ru: "Отчёты с фото",
      en: "Reports with photos"
    }
  },

  // Dashboard
  dashboard: {
    title: {
      uz: "Dashboard",
      ru: "Дашборд",
      en: "Dashboard"
    },
    totalSchools: {
      uz: "Jami maktablar",
      ru: "Всего школ",
      en: "Total Schools"
    },
    totalReports: {
      uz: "Jami hisobotlar",
      ru: "Всего отчётов",
      en: "Total Reports"
    },
    completedWorks: {
      uz: "Bajarilgan ishlar",
      ru: "Выполненные работы",
      en: "Completed Works"
    },
    problemsFound: {
      uz: "Muammoli holatlar",
      ru: "Проблемные случаи",
      en: "Problems Found"
    },
    problematicSchools: {
      uz: "Muammoli maktablar",
      ru: "Проблемные школы",
      en: "Problematic Schools"
    },
    mostReportedIssues: {
      uz: "Eng ko'p muammo tushgan ishlar",
      ru: "Наиболее проблемные работы",
      en: "Most Reported Issues"
    },
    recentReports: {
      uz: "So'nggi hisobotlar",
      ru: "Последние отчёты",
      en: "Recent Reports"
    },
    credibilityIndicators: {
      uz: "Ishonchlilik ko'rsatkichlari",
      ru: "Показатели достоверности",
      en: "Credibility Indicators"
    },
    reportsWithPhotos: {
      uz: "Suratli hisobotlar ulushi",
      ru: "Доля отчётов с фото",
      en: "Reports with photos"
    },
    reviewedReports: {
      uz: "Ko'rib chiqilgan hisobotlar",
      ru: "Рассмотренные отчёты",
      en: "Reviewed reports"
    },
    verifiedUsers: {
      uz: "Tasdiqlangan foydalanuvchilar",
      ru: "Подтверждённые пользователи",
      en: "Verified users"
    }
  },

  // Admin page
  admin: {
    title: {
      uz: "Boshqaruv paneli",
      ru: "Панель управления",
      en: "Admin Panel"
    },
    reports: {
      uz: "Hisobotlar",
      ru: "Отчёты",
      en: "Reports"
    },
    school: {
      uz: "Maktab",
      ru: "Школа",
      en: "School"
    },
    work: {
      uz: "Tekshirilgan ish",
      ru: "Проверенная работа",
      en: "Verified work"
    },
    result: {
      uz: "Natija",
      ru: "Результат",
      en: "Result"
    },
    comment: {
      uz: "Izoh",
      ru: "Комментарий",
      en: "Comment"
    },
    date: {
      uz: "Sana",
      ru: "Дата",
      en: "Date"
    },
    adminStatus: {
      uz: "Holat",
      ru: "Статус",
      en: "Status"
    },
    photo: {
      uz: "Surat",
      ru: "Фото",
      en: "Photo"
    },
    actions: {
      uz: "Amallar",
      ru: "Действия",
      en: "Actions"
    },
    markReviewed: {
      uz: "Ko'rib chiqildi",
      ru: "Рассмотрено",
      en: "Mark reviewed"
    },
    approve: {
      uz: "Tasdiqlash",
      ru: "Подтвердить",
      en: "Approve"
    },
    flagProblem: {
      uz: "Muammo",
      ru: "Проблема",
      en: "Flag problem"
    },
    pending: {
      uz: "Kutilmoqda",
      ru: "Ожидает",
      en: "Pending"
    },
    reviewed: {
      uz: "Ko'rib chiqildi",
      ru: "Рассмотрено",
      en: "Reviewed"
    },
    approved: {
      uz: "Tasdiqlandi",
      ru: "Подтверждено",
      en: "Approved"
    },
    flagged: {
      uz: "Belgilandi",
      ru: "Отмечено",
      en: "Flagged"
    }
  },

  // Footer
  footer: {
    platform: {
      uz: "Fuqarolik nazorati platformasi",
      ru: "Платформа гражданского контроля",
      en: "Civic Oversight Platform"
    },
    description: {
      uz: "Maktablardagi infratuzilma loyihalarini kuzatish va shaffoflikni ta'minlash uchun",
      ru: "Для мониторинга инфраструктурных проектов в школах и обеспечения прозрачности",
      en: "For monitoring infrastructure projects in schools and ensuring transparency"
    },
    rights: {
      uz: "Barcha huquqlar himoyalangan",
      ru: "Все права защищены",
      en: "All rights reserved"
    }
  },

  // Common
  common: {
    loading: {
      uz: "Ma'lumot yuklanmoqda...",
      ru: "Загрузка данных...",
      en: "Loading data..."
    },
    noResults: {
      uz: "Hozircha natija topilmadi",
      ru: "Результаты не найдены",
      en: "No results found"
    },
    error: {
      uz: "Xatolik yuz berdi",
      ru: "Произошла ошибка",
      en: "An error occurred"
    },
    notFound: {
      uz: "Mos obyekt topilmadi",
      ru: "Объект не найден",
      en: "Item not found"
    },
    retry: {
      uz: "Qayta urinib ko'ring",
      ru: "Попробуйте снова",
      en: "Try again"
    },
    search: {
      uz: "Qidirish",
      ru: "Поиск",
      en: "Search"
    },
    clear: {
      uz: "Tozalash",
      ru: "Очистить",
      en: "Clear"
    },
    cancel: {
      uz: "Bekor qilish",
      ru: "Отмена",
      en: "Cancel"
    },
    save: {
      uz: "Saqlash",
      ru: "Сохранить",
      en: "Save"
    },
    delete: {
      uz: "O'chirish",
      ru: "Удалить",
      en: "Delete"
    },
    edit: {
      uz: "Tahrirlash",
      ru: "Редактировать",
      en: "Edit"
    },
    view: {
      uz: "Ko'rish",
      ru: "Смотреть",
      en: "View"
    },
    gridView: {
      uz: "Grid ko'rinishi",
      ru: "Сетка",
      en: "Grid view"
    },
    listView: {
      uz: "Ro'yxat ko'rinishi",
      ru: "Список",
      en: "List view"
    },
    previous: {
      uz: "Oldingi",
      ru: "Предыдущая",
      en: "Previous"
    },
    next: {
      uz: "Keyingi",
      ru: "Следующая",
      en: "Next"
    },
    page: {
      uz: "Sahifa",
      ru: "Страница",
      en: "Page"
    },
    of: {
      uz: "dan",
      ru: "из",
      en: "of"
    }
  },

  // Verify banner
  verifyBanner: {
    title: {
      uz: "Tasdiqlangan foydalanuvchi bo'ling",
      ru: "Станьте подтверждённым пользователем",
      en: "Become a verified user"
    },
    description: {
      uz: "Hisobotlaringiz ko'proq ishonchga ega bo'ladi",
      ru: "Ваши отчёты будут иметь больше доверия",
      en: "Your reports will have more credibility"
    },
    action: {
      uz: "Hozir tasdiqlash",
      ru: "Подтвердить сейчас",
      en: "Verify now"
    },
    later: {
      uz: "Keyinroq",
      ru: "Позже",
      en: "Later"
    }
  }
} as const

export type TranslationKey = keyof typeof translations

export function t(
  key: string,
  lang: Language
): string {
  const keys = key.split('.')
  let value: unknown = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  
  if (value && typeof value === 'object' && lang in value) {
    return (value as Record<Language, string>)[lang]
  }
  
  return key
}
