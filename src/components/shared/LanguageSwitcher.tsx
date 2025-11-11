// Minimal version
"use client";

import { defaultLocale, Locale, localeNames, locales } from "@/i18n/config";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = (pathname.split("/")[1] || defaultLocale) as Locale;

  const switchLanguage = (newLang: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        🌐 {currentLang.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                locale === currentLang ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}