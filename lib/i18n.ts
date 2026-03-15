import type { Language } from '@/types'

export const translations = {
  // Navigation
  nav: {
    home: {
      uz: 'Bosh sahifa',
      ru: 'Главная',
      en: 'Home'
    },
    schools: {
      uz: 'Maktablar',
      ru: 'Школы',
      en: 'Schools'
    },
    results: {
      uz: 'Natijalar',
      ru: 'Результаты',
      en: 'Results'
    },
    dashboard: {
      uz: 'Dashboard',
      ru: 'Панель',
      en: 'Dashboard'
    },
    guest: {
      uz: 'Mehmon',
      ru: 'Гость',
      en: 'Guest'
    },
    verify: {
      uz: 'Tasdiqlash',
      ru: 'Подтвердить',
      en: 'Verify'
    }
  },

  // Hero section
  hero: {
    title: {
      uz: 'Maktab holatini kuzating',
      ru: 'Отслеживайте состояние школ',
      en: 'Monitor School Conditions'
    },
    subtitle: {
      uz: 'Maktabdagi holat haqida bir necha daqiqada xabar bering',
      ru: 'Сообщите о состоянии школы за несколько минут',
      en: 'Report school conditions in just a few minutes'
    },
    findSchool: {
      uz: 'Maktabni topish',
      ru: 'Найти школу',
      en: 'Find School'
    },
    viewResults: {
      uz: 'Natijalarni ko\'rish',
      ru: 'Посмотреть результаты',
      en: 'View Results'
    }
  },

  // School finder
  finder: {
    title: {
      uz: 'Maktabni topish',
      ru: 'Найти школу',
      en: 'Find School'
    },
    schoolNameOrNumber: {
      uz: 'Maktab raqami yoki nomi',
      ru: 'Номер или название школы',
      en: 'School number or name'
    },
    region: {
      uz: 'Viloyat',
      ru: 'Область',
      en: 'Region'
    },
    district: {
      uz: 'Tuman',
      ru: 'Район',
      en: 'District'
    },
    status: {
      uz: 'Holat',
      ru: 'Статус',
      en: 'Status'
    },
    search: {
      uz: 'Topish',
      ru: 'Найти',
      en: 'Search'
    },
    all: {
      uz: 'Barchasi',
      ru: 'Все',
      en: 'All'
    }
  },

  // How it works
  howItWorks: {
    title: {
      uz: 'Qanday ishlaydi?',
      ru: 'Как это работает?',
      en: 'How it works?'
    },
    step1Title: {
      uz: 'Maktabni toping',
      ru: 'Найдите школу',
      en: 'Find a school'
    },
    step1Desc: {
      uz: 'Ro\'yxatdan maktabingizni toping',
      ru: 'Найдите вашу школу в списке',
      en: 'Find your school from the list'
    },
    step2Title: {
      uz: 'Holat haqida xabar bering',
      ru: 'Сообщите о состоянии',
      en: 'Report the condition'
    },
    step2Desc: {
      uz: 'Muammo yoki bajarilgan ish haqida ma\'lumot yuboring',
      ru: 'Отправьте информацию о проблеме или выполненной работе',
      en: 'Send information about an issue or completed work'
    },
    step3Title: {
      uz: 'Natijalarni kuzating',
      ru: 'Отслеживайте результаты',
      en: 'Track results'
    },
    step3Desc: {
      uz: 'Xarita va statistikada natijalarni ko\'ring',
      ru: 'Смотрите результаты на карте и в статистике',
      en: 'View results on map and statistics'
    }
  },

  // Trust messages
  trust: {
    message1: {
      uz: 'Siz yuborgan ma\'lumotlar ko\'rib chiqiladi',
      ru: 'Ваши данные будут рассмотрены',
      en: 'Your data will be reviewed'
    },
    message2: {
      uz: 'Ota-onalar va o\'qituvchilar uchun qulay xizmat',
      ru: 'Удобный сервис для родителей и учителей',
      en: 'Convenient service for parents and teachers'
    }
  },

  // School card
  schoolCard: {
    details: {
      uz: 'Batafsil',
      ru: 'Подробнее',
      en: 'Details'
    },
    report: {
      uz: 'Holatni bildirish',
      ru: 'Сообщить о состоянии',
      en: 'Report Status'
    },
    reports: {
      uz: 'xabar',
      ru: 'сообщений',
      en: 'reports'
    }
  },

  // Status labels
  status: {
    good: {
      uz: 'Yaxshi',
      ru: 'Хорошо',
      en: 'Good'
    },
    issue: {
      uz: 'Muammo bor',
      ru: 'Есть проблема',
      en: 'Has Issues'
    },
    pending: {
      uz: 'Kutilmoqda',
      ru: 'Ожидается',
      en: 'Pending'
    },
    unknown: {
      uz: 'Noma\'lum',
      ru: 'Неизвестно',
      en: 'Unknown'
    }
  },

  // Report form
  report: {
    title: {
      uz: 'Holat haqida xabar berish',
      ru: 'Сообщить о состоянии',
      en: 'Report Condition'
    },
    subtitle: {
      uz: 'Muammo yoki bajarilgan ish haqida ma\'lumot yuboring',
      ru: 'Отправьте информацию о проблеме или выполненной работе',
      en: 'Send information about an issue or completed work'
    },
    school: {
      uz: 'Maktab',
      ru: 'Школа',
      en: 'School'
    },
    taskType: {
      uz: 'Tekshirilayotgan holat',
      ru: 'Проверяемое состояние',
      en: 'Task being checked'
    },
    result: {
      uz: 'Natija',
      ru: 'Результат',
      en: 'Result'
    },
    completed: {
      uz: 'Bajarilgan',
      ru: 'Выполнено',
      en: 'Completed'
    },
    hasIssue: {
      uz: 'Muammo bor',
      ru: 'Есть проблема',
      en: 'Has Issue'
    },
    quickResponses: {
      uz: 'Tayyor javoblar',
      ru: 'Готовые ответы',
      en: 'Quick responses'
    },
    comment: {
      uz: 'Izoh',
      ru: 'Комментарий',
      en: 'Comment'
    },
    commentPlaceholder: {
      uz: 'Qo\'shimcha ma\'lumot yozing...',
      ru: 'Напишите дополнительную информацию...',
      en: 'Write additional information...'
    },
    addImage: {
      uz: 'Rasm qo\'shish',
      ru: 'Добавить фото',
      en: 'Add Photo'
    },
    fromDevice: {
      uz: 'Qurilmadan yuklash',
      ru: 'Загрузить с устройства',
      en: 'Upload from device'
    },
    fromCamera: {
      uz: 'Kamera orqali',
      ru: 'Сделать фото',
      en: 'Take photo'
    },
    submit: {
      uz: 'Yuborish',
      ru: 'Отправить',
      en: 'Submit'
    },
    quickMode: {
      uz: 'Tez yuborish',
      ru: 'Быстрая отправка',
      en: 'Quick Submit'
    },
    detailedMode: {
      uz: 'Batafsil yuborish',
      ru: 'Подробная отправка',
      en: 'Detailed Submit'
    }
  },

  // Quick responses for completed
  quickCompleted: {
    done: {
      uz: 'Ish bajarilgan',
      ru: 'Работа выполнена',
      en: 'Work completed'
    },
    allGood: {
      uz: 'Hamma narsa joyida',
      ru: 'Всё в порядке',
      en: 'Everything is fine'
    },
    canUse: {
      uz: 'Foydalanish mumkin',
      ru: 'Можно использовать',
      en: 'Can be used'
    },
    goodCondition: {
      uz: 'Holat yaxshi',
      ru: 'Состояние хорошее',
      en: 'Good condition'
    }
  },

  // Quick responses for issues
  quickIssue: {
    notSolved: {
      uz: 'Muammo hal bo\'lmagan',
      ru: 'Проблема не решена',
      en: 'Problem not solved'
    },
    notFinished: {
      uz: 'Ish tugallanmagan',
      ru: 'Работа не завершена',
      en: 'Work not finished'
    },
    poorQuality: {
      uz: 'Sifati yaxshi emas',
      ru: 'Качество плохое',
      en: 'Poor quality'
    },
    cantUse: {
      uz: 'Foydalanib bo\'lmaydi',
      ru: 'Нельзя использовать',
      en: 'Cannot be used'
    },
    partial: {
      uz: 'Qisman qilingan',
      ru: 'Частично выполнено',
      en: 'Partially done'
    }
  },

  // Success state
  success: {
    title: {
      uz: 'Rahmat!',
      ru: 'Спасибо!',
      en: 'Thank you!'
    },
    message: {
      uz: 'Sizning hissangiz muhim',
      ru: 'Ваш вклад важен',
      en: 'Your contribution matters'
    },
    helpMessage: {
      uz: 'Sizning xabaringiz maktab holatini yaxshilashga yordam beradi',
      ru: 'Ваше сообщение поможет улучшить состояние школы',
      en: 'Your report helps improve school conditions'
    },
    viewAnother: {
      uz: 'Yana bir maktabni ko\'rish',
      ru: 'Посмотреть другую школу',
      en: 'View another school'
    },
    viewResults: {
      uz: 'Natijalarni ko\'rish',
      ru: 'Посмотреть результаты',
      en: 'View results'
    },
    myAchievements: {
      uz: 'Mening yutuqlarim',
      ru: 'Мои достижения',
      en: 'My achievements'
    },
    pointsEarned: {
      uz: 'ball oldingiz',
      ru: 'баллов получено',
      en: 'points earned'
    },
    progressMessage: {
      uz: 'Yana {count} ta foydali xabar yuborsangiz, \'{badge}\' belgisi ochiladi',
      ru: 'Отправьте ещё {count} полезных сообщений, чтобы получить значок \'{badge}\'',
      en: 'Send {count} more helpful reports to unlock \'{badge}\' badge'
    }
  },

  // Badges
  badges: {
    firstReport: {
      name: {
        uz: 'Birinchi xabar',
        ru: 'Первое сообщение',
        en: 'First Report'
      },
      description: {
        uz: 'Birinchi xabaringizni yubordingiz',
        ru: 'Вы отправили первое сообщение',
        en: 'You sent your first report'
      }
    },
    activeObserver: {
      name: {
        uz: 'Faol kuzatuvchi',
        ru: 'Активный наблюдатель',
        en: 'Active Observer'
      },
      description: {
        uz: '5 ta xabar yubordingiz',
        ru: 'Вы отправили 5 сообщений',
        en: 'You sent 5 reports'
      }
    },
    trustedUser: {
      name: {
        uz: 'Ishonchli foydalanuvchi',
        ru: 'Надёжный пользователь',
        en: 'Trusted User'
      },
      description: {
        uz: '10 ta tasdiqlangan xabar',
        ru: '10 подтверждённых сообщений',
        en: '10 verified reports'
      }
    },
    communityLeader: {
      name: {
        uz: 'Mahalla faoli',
        ru: 'Лидер сообщества',
        en: 'Community Leader'
      },
      description: {
        uz: '25 ta foydali xabar',
        ru: '25 полезных сообщений',
        en: '25 helpful reports'
      }
    }
  },

  // Results page
  results: {
    title: {
      uz: 'Natijalar',
      ru: 'Результаты',
      en: 'Results'
    },
    map: {
      uz: 'Xarita',
      ru: 'Карта',
      en: 'Map'
    },
    table: {
      uz: 'Jadval',
      ru: 'Таблица',
      en: 'Table'
    },
    charts: {
      uz: 'Grafiklar',
      ru: 'Графики',
      en: 'Charts'
    },
    compare: {
      uz: 'Solishtirish',
      ru: 'Сравнение',
      en: 'Compare'
    }
  },

  // Dashboard
  dashboard: {
    title: {
      uz: 'Umumiy natijalar',
      ru: 'Общие результаты',
      en: 'Overall Results'
    },
    totalSchools: {
      uz: 'Jami maktablar',
      ru: 'Всего школ',
      en: 'Total Schools'
    },
    totalReports: {
      uz: 'Jami xabarlar',
      ru: 'Всего сообщений',
      en: 'Total Reports'
    },
    completedTasks: {
      uz: 'Bajarilgan ishlar',
      ru: 'Выполненные работы',
      en: 'Completed Tasks'
    },
    pendingIssues: {
      uz: 'Muammoli holatlar',
      ru: 'Проблемные состояния',
      en: 'Pending Issues'
    },
    topRegions: {
      uz: 'Eng faol hududlar',
      ru: 'Самые активные регионы',
      en: 'Most Active Regions'
    },
    topUsers: {
      uz: 'Eng faol foydalanuvchilar',
      ru: 'Самые активные пользователи',
      en: 'Most Active Users'
    },
    myContribution: {
      uz: 'Mening hissam',
      ru: 'Мой вклад',
      en: 'My Contribution'
    },
    communityActivity: {
      uz: 'Jamoa faolligi',
      ru: 'Активность сообщества',
      en: 'Community Activity'
    }
  },

  // Admin
  admin: {
    title: {
      uz: 'Boshqaruv paneli',
      ru: 'Панель управления',
      en: 'Admin Panel'
    },
    reports: {
      uz: 'Xabarlar',
      ru: 'Сообщения',
      en: 'Reports'
    },
    schools: {
      uz: 'Maktablar',
      ru: 'Школы',
      en: 'Schools'
    },
    users: {
      uz: 'Foydalanuvchilar',
      ru: 'Пользователи',
      en: 'Users'
    },
    verified: {
      uz: 'Tasdiqlangan',
      ru: 'Подтверждено',
      en: 'Verified'
    },
    pending: {
      uz: 'Kutilmoqda',
      ru: 'Ожидает',
      en: 'Pending'
    },
    approve: {
      uz: 'Tasdiqlash',
      ru: 'Подтвердить',
      en: 'Approve'
    },
    reject: {
      uz: 'Rad etish',
      ru: 'Отклонить',
      en: 'Reject'
    }
  },

  // School detail
  schoolDetail: {
    address: {
      uz: 'Manzil',
      ru: 'Адрес',
      en: 'Address'
    },
    totalReports: {
      uz: 'Jami xabarlar',
      ru: 'Всего сообщений',
      en: 'Total Reports'
    },
    completedTasks: {
      uz: 'Bajarilgan ishlar',
      ru: 'Выполненные работы',
      en: 'Completed Tasks'
    },
    pendingIssues: {
      uz: 'Muammoli holatlar',
      ru: 'Проблемные состояния',
      en: 'Pending Issues'
    },
    recentReports: {
      uz: 'So\'nggi xabarlar',
      ru: 'Последние сообщения',
      en: 'Recent Reports'
    },
    plannedTasks: {
      uz: 'Rejalashtirilgan ishlar',
      ru: 'Запланированные работы',
      en: 'Planned Tasks'
    },
    reportCondition: {
      uz: 'Holat haqida xabar berish',
      ru: 'Сообщить о состоянии',
      en: 'Report Condition'
    }
  },

  // Task types
  taskTypes: {
    heating: {
      uz: 'Isitish tizimi',
      ru: 'Система отопления',
      en: 'Heating System'
    },
    roof: {
      uz: 'Tom holati',
      ru: 'Состояние крыши',
      en: 'Roof Condition'
    },
    windows: {
      uz: 'Derazalar',
      ru: 'Окна',
      en: 'Windows'
    },
    toilet: {
      uz: 'Hojatxona',
      ru: 'Туалет',
      en: 'Toilet'
    },
    playground: {
      uz: 'O\'yin maydoni',
      ru: 'Игровая площадка',
      en: 'Playground'
    },
    furniture: {
      uz: 'Mebel',
      ru: 'Мебель',
      en: 'Furniture'
    },
    electricity: {
      uz: 'Elektr ta\'minoti',
      ru: 'Электроснабжение',
      en: 'Electricity'
    },
    water: {
      uz: 'Suv ta\'minoti',
      ru: 'Водоснабжение',
      en: 'Water Supply'
    }
  },

  // Common
  common: {
    loading: {
      uz: 'Yuklanmoqda...',
      ru: 'Загрузка...',
      en: 'Loading...'
    },
    error: {
      uz: 'Xatolik yuz berdi',
      ru: 'Произошла ошибка',
      en: 'An error occurred'
    },
    noResults: {
      uz: 'Natija topilmadi',
      ru: 'Результаты не найдены',
      en: 'No results found'
    },
    cancel: {
      uz: 'Bekor qilish',
      ru: 'Отмена',
      en: 'Cancel'
    },
    save: {
      uz: 'Saqlash',
      ru: 'Сохранить',
      en: 'Save'
    },
    delete: {
      uz: 'O\'chirish',
      ru: 'Удалить',
      en: 'Delete'
    },
    edit: {
      uz: 'Tahrirlash',
      ru: 'Редактировать',
      en: 'Edit'
    },
    back: {
      uz: 'Orqaga',
      ru: 'Назад',
      en: 'Back'
    },
    next: {
      uz: 'Keyingi',
      ru: 'Далее',
      en: 'Next'
    },
    previous: {
      uz: 'Oldingi',
      ru: 'Назад',
      en: 'Previous'
    }
  },

  // Footer
  footer: {
    description: {
      uz: 'Ota-onalar va o\'qituvchilar uchun maktab holatini kuzatish platformasi',
      ru: 'Платформа для мониторинга состояния школ для родителей и учителей',
      en: 'School condition monitoring platform for parents and teachers'
    },
    rights: {
      uz: 'Barcha huquqlar himoyalangan',
      ru: 'Все права защищены',
      en: 'All rights reserved'
    }
  },

  // Verification modal
  verifyModal: {
    title: {
      uz: 'Hisobni tasdiqlash',
      ru: 'Подтверждение аккаунта',
      en: 'Verify Account'
    },
    description: {
      uz: 'Xabarlaringiz samaradorligini oshirish uchun hisobingizni tasdiqlang',
      ru: 'Подтвердите аккаунт для повышения эффективности ваших сообщений',
      en: 'Verify your account to increase the effectiveness of your reports'
    },
    phone: {
      uz: 'Telefon raqami',
      ru: 'Номер телефона',
      en: 'Phone number'
    },
    sendCode: {
      uz: 'Kod yuborish',
      ru: 'Отправить код',
      en: 'Send code'
    },
    enterCode: {
      uz: 'Kodni kiriting',
      ru: 'Введите код',
      en: 'Enter code'
    },
    verify: {
      uz: 'Tasdiqlash',
      ru: 'Подтвердить',
      en: 'Verify'
    },
    skip: {
      uz: 'Keyinroq',
      ru: 'Позже',
      en: 'Later'
    }
  }
} as const

export type TranslationKey = keyof typeof translations

export function t(
  key: string,
  lang: Language,
  params?: Record<string, string | number>
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
    let text = (value as Record<Language, string>)[lang]
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue))
      })
    }
    
    return text
  }
  
  return key
}
