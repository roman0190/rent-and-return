"use client";
import { Button } from "@/components/ui/button";
import { Search, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("home");
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem("hero-hidden");
    if (hidden === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("hero-hidden", "true");
    }, 300); // Match the transition duration
  };

  if (!isVisible) return null;
  return (
    <div
      className={`bg-indigo-700 rounded-xl p-8 text-white relative transition-all duration-300 ease-in-out ${
        isAnimatingOut
          ? "transform -translate-x-full opacity-0"
          : "transform translate-x-0 opacity-100"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        aria-label={t("hideWelcomeMessage")}
      >
        <X className="w-5 h-5" />
      </button>
      <h1 className="mb-2 text-lg font-medium">{t("title")}</h1>
      <p className="text-indigo-100 mb-6 font-light text-sm">{t("subtitle")}</p>
      <div className="flex flex-wrap gap-3 ">
        <Link href={"/items"}>
          <Button
            size={"lg"}
            variant={"secondary"}
            className="cursor-context-menu"
          >
            <Search className="w-4 h-4 mr-2" />
            {t("browseItems")}
          </Button>
        </Link>
        <Link href={"/items/add-item"}>
          <Button
            size={"lg"}
            className="border border-white bg-transparent text-white hover:bg-white/10 cursor-cell"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("listYourItem")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
