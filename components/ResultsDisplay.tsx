"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CalculationResult } from "@/lib/calculate";

interface ResultsDisplayProps {
  results: CalculationResult;
  onReset: () => void;
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const { t, i18n } = useTranslation();

  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">
            {t("resultsTitle")}
          </h1>
          <p className="text-center text-slate-600">
            {t("totalContributors")}: {results.totalContributors}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.groups.map((group, index) => (
            <Card key={index} className="p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4 text-slate-900">
                {t("groupResults", { name: group.groupName })}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-600 mb-1">
                    {t("meatLabel")}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatNumber(group.finalMeatPerPerson)} kg
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("perPerson")}
                  </p>
                </div>

                <div className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-600 mb-1">
                    {t("kolijaLabel")}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatNumber(group.finalKolijaPerPerson)} kg
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("perPerson")}
                  </p>
                </div>

                <div className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-600 mb-1">{t("telLabel")}</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatNumber(group.finalTelPerPerson)} kg
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("perPerson")}
                  </p>
                </div>

                <div className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-600 mb-1">
                    {t("totalContributors")}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {group.contributors}
                  </p>
                </div>
              </div>

              {(group.sorkariDeduction.meat > 0 ||
                group.sorkariDeduction.kolija > 0 ||
                group.sorkariDeduction.tel > 0) && (
                <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
                  <p className="text-sm font-semibold text-amber-900 mb-2">
                    {t("sorkariDeduction")}
                  </p>
                  <div className="space-y-1 text-sm">
                    {group.sorkariDeduction.meat > 0 && (
                      <p className="flex justify-between text-amber-900">
                        <span>{t("meatLabel")}</span>
                        <span className="font-bold">
                          {formatNumber(group.sorkariDeduction.meat)} kg
                        </span>
                      </p>
                    )}
                    {group.sorkariDeduction.kolija > 0 && (
                      <p className="flex justify-between text-amber-900">
                        <span>{t("kolijaLabel")}</span>
                        <span className="font-bold">
                          {formatNumber(group.sorkariDeduction.kolija)} kg
                        </span>
                      </p>
                    )}
                    {group.sorkariDeduction.tel > 0 && (
                      <p className="flex justify-between text-amber-900">
                        <span>{t("telLabel")}</span>
                        <span className="font-bold">
                          {formatNumber(group.sorkariDeduction.tel)} kg
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-600 mb-2">
                  {t("totalDistribution")}
                </p>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span className="text-slate-700">{t("meatLabel")}:</span>
                    <span className="font-semibold text-slate-900">
                      {formatNumber(group.totalMeat)} kg
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-700">{t("kolijaLabel")}:</span>
                    <span className="font-semibold text-slate-900">
                      {formatNumber(group.totalKolija)} kg
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-700">{t("telLabel")}:</span>
                    <span className="font-semibold text-slate-900">
                      {formatNumber(group.totalTel)} kg
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 border-2 border-slate-900 bg-slate-900 text-white mb-8">
          <h2 className="text-lg font-bold mb-4">{t("totalDistribution")}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs opacity-80 mb-1">{t("meatLabel")}</p>
              <p className="text-2xl font-bold">
                {formatNumber(results.totalMeatDistributed)} kg
              </p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">{t("kolijaLabel")}</p>
              <p className="text-2xl font-bold">
                {formatNumber(results.totalKolijaDistributed)} kg
              </p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">{t("telLabel")}</p>
              <p className="text-2xl font-bold">
                {formatNumber(results.totalTelDistributed)} kg
              </p>
            </div>
          </div>
          {(results.totalSorkariDeduction.meat > 0 ||
            results.totalSorkariDeduction.kolija > 0 ||
            results.totalSorkariDeduction.tel > 0) && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <p className="text-sm mb-3">{t("sorkariDeduction")}</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs opacity-80 mb-1">{t("meatLabel")}</p>
                  <p className="text-xl font-bold">
                    {formatNumber(results.totalSorkariDeduction.meat)} kg
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-80 mb-1">{t("kolijaLabel")}</p>
                  <p className="text-xl font-bold">
                    {formatNumber(results.totalSorkariDeduction.kolija)} kg
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-80 mb-1">{t("telLabel")}</p>
                  <p className="text-xl font-bold">
                    {formatNumber(results.totalSorkariDeduction.tel)} kg
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Button
          onClick={onReset}
          className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-base"
        >
          {t("reset")}
        </Button>
      </div>
    </div>
  );
}
