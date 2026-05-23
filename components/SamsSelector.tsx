"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SamsSelectorProps {
  onSelect: (numSams: number) => void;
  onBack: () => void;
}

export function SamsSelector({ onSelect, onBack }: SamsSelectorProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              {t("howManySams", "How many Sams (Animals)?")}
            </h2>
            <p className="text-sm text-slate-600">
              {t(
                "selectNumberSams",
                "Select the number of animals for distribution",
              )}
            </p>
          </div>

          <div className="space-y-3">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => onSelect(num)}
                className="w-full p-4 border-2 border-slate-200 rounded-lg text-center font-semibold transition-all hover:border-indigo-500 hover:bg-indigo-50 active:scale-95"
              >
                {num} {t("sams", "Sams")}
              </button>
            ))}
          </div>

          <Button onClick={onBack} variant="outline" className="w-full">
            {t("back", "Back")}
          </Button>
        </div>
      </div>
    </main>
  );
}
