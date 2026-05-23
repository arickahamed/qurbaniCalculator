"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuestionScreenProps {
  onAnswer: (isMultipleSams: boolean) => void;
}

export function QuestionScreen({ onAnswer }: QuestionScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-900">
          {t("title")}
        </h1>
        <p className="text-center text-slate-500 mb-8">{t("subtitle")}</p>

        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <p className="text-lg font-semibold text-center text-slate-900">
            {t("question")}
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => onAnswer(false)}
            variant="outline"
            className="flex-1 h-12 text-base"
          >
            {t("no")}
          </Button>
          <Button
            onClick={() => onAnswer(true)}
            className="flex-1 h-12 text-base bg-slate-900 hover:bg-slate-800"
          >
            {t("yes")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
