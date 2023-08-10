import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import './moment/locale/en-au'
import en from "./locales/en";
import vi from "./locales/vi";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: en,
    },
    vi: {
      translations: vi,
    }
  },

  lng: "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
