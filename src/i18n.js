import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Connect wallet": "Connect wallet",
      "Connected wallet address":"Connected wallet address",
      "Account":"Account",
      "Details":"Details",
      "Log out":"Log out",
      "Copy successfully":"Copy successfully",
      "Open app":"Open app",
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  },
  cht: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "Connect wallet": "連接錢包",
      "Connected wallet address":"連接的錢包地址",
      "Account":"賬號",
      "Details":"詳細信息",
      "Log out":"登出",
      "Copy successfully":"複製成功",
      "Open app":"打開應用",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "cht", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;