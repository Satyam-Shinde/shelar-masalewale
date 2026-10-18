import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../data/content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("shelar-lang") || "mr"
  );

  useEffect(() => {
    localStorage.setItem("shelar-lang", language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
