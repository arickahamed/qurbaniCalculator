import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "./ui";
import { spacing } from "../theme";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Button
        title="EN"
        variant={i18n.language === "en" ? "primary" : "outline"}
        onPress={() => i18n.changeLanguage("en")}
      />
      <Button
        title="BN"
        variant={i18n.language === "bn" ? "primary" : "outline"}
        onPress={() => i18n.changeLanguage("bn")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    alignSelf: "flex-end",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    width: 120,
  },
});
