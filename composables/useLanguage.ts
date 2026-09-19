import { ref, computed, onMounted } from 'vue'

export type SupportedLang = 'en' | 'am'

export interface LanguageOption {
  code: SupportedLang
  label: string
  nativeLabel: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'am', label: 'Amharic', nativeLabel: 'አማርኛ' },
]

export const HOME_TRANSLATIONS: Record<SupportedLang, {
  titleLine1: string
  forWord: string
  typedBrand: string
  paragraph: string
  getStarted: string
  browseGuides: string
}> = {
  en: {
    titleLine1: 'The Complete Documentation',
    forWord: 'For',
    typedBrand: 'YeneSchool',
    paragraph: 'Explore comprehensive guides, role-based workflows, and best practices designed to help school leadership, educators, and administrative teams seamlessly operate YeneSchool.',
    getStarted: 'Get Started',
    browseGuides: 'Browse All Guides',
  },
  am: {
    titleLine1: 'ሙሉ የሰነድ እና የተጠቃሚ መመሪያ',
    forWord: 'ለ',
    typedBrand: 'የኔትምህርትቤት',
    paragraph: 'ለትምህርት ቤት አመራሮች፣ ለመምህራን እና ለአስተዳደር ቡድኖች የየኔትምህርትቤት ሥርዓትን በቀላሉ እና በተቀላጠፈ ሁኔታ ለመጠቀም የተዘጋጁ የተሟሉ መመሪያዎችን ይመልከቱ።',
    getStarted: 'አሁኑኑ ይጀምሩ',
    browseGuides: 'ሁሉንም መመሪያዎች ይመልከቱ',
  },
}

export function useLanguage() {
  const currentLang = useState<SupportedLang>('yeneschool_current_lang', () => 'en')

  function initLanguage() {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem('yeneschool_lang') as SupportedLang | null
        if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
          currentLang.value = stored
          document.documentElement.lang = stored
          document.documentElement.dataset.language = stored
        }
      } catch {}
    }
  }

  function setLanguage(code: SupportedLang) {
    currentLang.value = code
    if (import.meta.client) {
      try {
        localStorage.setItem('yeneschool_lang', code)
        localStorage.setItem('language', code)
        document.documentElement.lang = code
        document.documentElement.dataset.language = code
      } catch {}
    }
  }

  const currentStrings = computed(() => {
    return HOME_TRANSLATIONS[currentLang.value] || HOME_TRANSLATIONS.en
  })

  return {
    currentLang,
    languages: SUPPORTED_LANGUAGES,
    t: currentStrings,
    initLanguage,
    setLanguage,
  }
}
