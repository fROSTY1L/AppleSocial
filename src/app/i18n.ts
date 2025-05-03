import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AuthTranslation } from '../features/auth/i18n';

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: {
      'features/auth': AuthTranslation.ru,
    },
  },
});
