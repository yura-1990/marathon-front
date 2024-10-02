import { createI18n } from 'vue-i18n'
import languages from '../locales'

const messages = Object.assign(languages)
const defaultLocale: string = "ru"
const storageLocale: string|null = localStorage.getItem("language")

const i18n = createI18n({
  locale: storageLocale ?? defaultLocale,
  fallbackLocale: "ru",
  messages,
  legacy: false
})

export default i18n