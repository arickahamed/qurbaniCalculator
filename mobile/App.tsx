import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import "./src/i18n";
import i18n from "./src/i18n";
import {
  calculateDistribution,
  type CalculationResult,
  type Group,
  type Quantities,
} from "./src/lib/calculate";
import { LanguageSelector } from "./src/components/LanguageSelector";
import { SiteFooter } from "./src/components/SiteFooter";
import { QuestionScreen } from "./src/components/QuestionScreen";
import { GroupForm } from "./src/components/GroupForm";
import { QuantitiesForm } from "./src/components/QuantitiesForm";
import { ResultsDisplay } from "./src/components/ResultsDisplay";
import { colors } from "./src/theme";

type Step = "question" | "groups" | "quantities" | "results";

export default function App() {
  const [step, setStep] = useState<Step>("question");
  const [isMultipleSams, setIsMultipleSams] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const isPreResultStep = step !== "results";

  const handleQuestionAnswer = (answer: boolean) => {
    setIsMultipleSams(answer);
    setStep("groups");
  };

  const handleGroupsSubmit = (groupData: Group[]) => {
    setGroups(groupData);
    setStep("quantities");
  };

  const handleQuantitiesSubmit = (quantityData: Quantities) => {
    setResults(calculateDistribution(groups, quantityData, isMultipleSams));
    setStep("results");
  };

  const handleReset = () => {
    setStep("question");
    setIsMultipleSams(false);
    setGroups([]);
    setResults(null);
  };

  const handleBack = () => {
    if (step === "groups") setStep("question");
    else if (step === "quantities") setStep("groups");
  };

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
          <StatusBar style="dark" />
          <View style={styles.container}>
            <LanguageSelector />
            <View style={styles.content}>
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
            </View>
            {isPreResultStep && <SiteFooter />}
          </View>
          {!isPreResultStep && (
            <View style={styles.resultsFooter}>
              <SiteFooter />
            </View>
          )}
        </SafeAreaView>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  resultsFooter: {
    paddingBottom: 8,
  },
});
