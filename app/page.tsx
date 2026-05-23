"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { QuestionScreen } from "@/components/QuestionScreen";
import { GroupForm } from "@/components/GroupForm";
import { QuantitiesForm } from "@/components/QuantitiesForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SiteFooter } from "@/components/SiteFooter";
import {
  calculateDistribution,
  type Group,
  type Quantities,
  type CalculationResult,
} from "@/lib/calculate";

type Step = "question" | "groups" | "quantities" | "results";

export default function Page() {
  const [step, setStep] = useState<Step>("question");
  const [isMultipleSams, setIsMultipleSams] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({
    meat: 0,
    kolija: 0,
    tel: 0,
  });
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleQuestionAnswer = (answer: boolean) => {
    setIsMultipleSams(answer);
    setStep("groups");
  };

  const handleGroupsSubmit = (groupData: Group[]) => {
    setGroups(groupData);
    setStep("quantities");
  };

  const handleQuantitiesSubmit = (quantityData: Quantities) => {
    setQuantities(quantityData);
    const calculatedResults = calculateDistribution(
      groups,
      quantityData,
      isMultipleSams,
    );
    setResults(calculatedResults);
    setStep("results");
  };

  const handleReset = () => {
    setStep("question");
    setIsMultipleSams(false);
    setGroups([]);
    setQuantities({ meat: 0, kolija: 0, tel: 0 });
    setResults(null);
  };

  const handleBack = () => {
    if (step === "groups") {
      setStep("question");
    } else if (step === "quantities") {
      setStep("groups");
    }
  };

  const isPreResultStep = step !== "results";

  return (
    <main
      className={
        isPreResultStep
          ? "w-full h-dvh flex flex-col overflow-hidden"
          : "w-full min-h-screen flex flex-col"
      }
    >
      <div
        className={
          isPreResultStep
            ? "flex flex-1 flex-col min-h-0 overflow-y-auto"
            : "flex-1"
        }
      >
        <LanguageSelector />

        {step === "question" && (
          <QuestionScreen onAnswer={handleQuestionAnswer} />
        )}

        {step === "groups" && (
          <GroupForm
            isMultipleSams={isMultipleSams}
            onGroupsSubmit={handleGroupsSubmit}
            onBack={handleBack}
          />
        )}

        {step === "quantities" && (
          <QuantitiesForm
            onQuantitiesSubmit={handleQuantitiesSubmit}
            onBack={handleBack}
          />
        )}

        {step === "results" && results && (
          <ResultsDisplay results={results} onReset={handleReset} />
        )}
      </div>
      <SiteFooter className={isPreResultStep ? "shrink-0" : undefined} />
    </main>
  );
}
