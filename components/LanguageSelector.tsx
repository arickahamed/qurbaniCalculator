"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <Button
        onClick={() => i18n.changeLanguage("en")}
        variant={i18n.language === "en" ? "default" : "outline"}
        size="sm"
        className={i18n.language === "en" ? "bg-slate-900" : ""}
      >
        EN
      </Button>
      <Button
        onClick={() => i18n.changeLanguage("bn")}
        variant={i18n.language === "bn" ? "default" : "outline"}
        size="sm"
        className={i18n.language === "bn" ? "bg-slate-900" : ""}
      >
        BN
      </Button>
    </div>
  );
}
