import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';
import translationIT from './locales/it.json';
import translationES from './locales/es.json';
import translationTR from './locales/tr.json';
import translationAR from './locales/ar.json';
import translationSR from './locales/sr.json';
import translationSQ from './locales/sq.json';

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  de: { translation: translationDE },
  it: { translation: translationIT },
  es: { translation: translationES },
  tr: { translation: translationTR },
  ar: { translation: translationAR },
  sr: { translation: translationSR },
  sq: { translation: translationSQ },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
