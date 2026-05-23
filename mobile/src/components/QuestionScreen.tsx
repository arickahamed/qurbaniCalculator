import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Card } from "./ui";
import { colors, spacing } from "../theme";

export function QuestionScreen({
  onAnswer,
}: {
  onAnswer: (isMultipleSams: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.center}>
      <Card>
        <Text style={styles.title}>{t("title")}</Text>
        <Text style={styles.subtitle}>{t("subtitle")}</Text>
        <View style={styles.questionBox}>
          <Text style={styles.question}>{t("question")}</Text>
        </View>
        <View style={styles.row}>
          <Button title={t("no")} variant="outline" onPress={() => onAnswer(false)} />
          <Button title={t("yes")} onPress={() => onAnswer(true)} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  questionBox: {
    backgroundColor: colors.slate50,
    borderRadius: 8,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
