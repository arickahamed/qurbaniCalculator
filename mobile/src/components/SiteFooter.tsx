import { Linking, StyleSheet, Text } from "react-native";
import { colors, spacing } from "../theme";

const LINKEDIN_URL = "https://www.linkedin.com/in/arickahamed/";

export function SiteFooter() {
  return (
    <Text style={styles.footer}>
      All rights reserved @{" "}
      <Text style={styles.link} onPress={() => Linking.openURL(LINKEDIN_URL)}>
        arickahamed
      </Text>{" "}
      || 2026
    </Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textMuted,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  link: {
    color: colors.text,
    textDecorationLine: "underline",
  },
});
