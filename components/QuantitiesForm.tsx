"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Quantities } from "@/lib/calculate";

interface QuantitiesFormProps {
  onQuantitiesSubmit: (quantities: Quantities) => void;
  onBack: () => void;
}

export function QuantitiesForm({
  onQuantitiesSubmit,
  onBack,
}: QuantitiesFormProps) {
  const { t } = useTranslation();
  const [quantities, setQuantities] = useState<Quantities>({
    meat: 0,
    kolija: 0,
    tel: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!quantities.meat || quantities.meat <= 0) {
      newErrors.meat = t("validNumber");
    }
    if (!quantities.kolija || quantities.kolija < 0) {
      newErrors.kolija = t("validNumber");
    }
    if (!quantities.tel || quantities.tel < 0) {
      newErrors.tel = t("validNumber");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof Quantities, value: string) => {
    const numValue = parseFloat(value) || 0;
    setQuantities({ ...quantities, [field]: numValue });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onQuantitiesSubmit(quantities);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">
          {t("quantitiesTitle")}
        </h1>

        <div className="space-y-4 mb-8">
          <div>
            <Label
              htmlFor="meat"
              className="text-sm font-medium text-slate-700"
            >
              {t("meatQuantity")}
            </Label>
            <Input
              id="meat"
              type="number"
              step="0.1"
              min="0"
              value={quantities.meat || ""}
              onChange={(e) => handleChange("meat", e.target.value)}
              className="mt-1"
              placeholder="0"
            />
            {errors.meat && (
              <p className="text-sm text-red-600 mt-1">{errors.meat}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="kolija"
              className="text-sm font-medium text-slate-700"
            >
              {t("kolijaMeat")}
            </Label>
            <Input
              id="kolija"
              type="number"
              step="0.1"
              min="0"
              value={quantities.kolija || ""}
              onChange={(e) => handleChange("kolija", e.target.value)}
              className="mt-1"
              placeholder="0"
            />
            {errors.kolija && (
              <p className="text-sm text-red-600 mt-1">{errors.kolija}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tel" className="text-sm font-medium text-slate-700">
              {t("telQuantity")}
            </Label>
            <Input
              id="tel"
              type="number"
              step="0.1"
              min="0"
              value={quantities.tel || ""}
              onChange={(e) => handleChange("tel", e.target.value)}
              className="mt-1"
              placeholder="0"
            />
            {errors.tel && (
              <p className="text-sm text-red-600 mt-1">{errors.tel}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1">
            {t("goBack")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-slate-900 hover:bg-slate-800"
          >
            {t("calculate")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
