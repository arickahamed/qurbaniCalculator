import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { CalculationResult } from "../lib/calculate";
import { Button, Card } from "./ui";
import { colors, spacing } from "../theme";

interface ResultsDisplayProps {
  results: CalculationResult;
  onReset: () => void;
}

function formatNumber(num: number): string {
  return num.toFixed(2);
}

function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {sub && <Text style={styles.statSub}>{sub}</Text>}
    </View>
  );
}

function SorkariRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.sorkariRow}>
      <Text style={styles.sorkariLabel}>{label}</Text>
      <Text style={styles.sorkariValue}>{value}</Text>
    </View>
  );
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>{t("resultsTitle")}</Text>
      <Text style={styles.subtitle}>
        {t("totalContributors")}: {results.totalContributors}
      </Text>

      {results.groups.map((group, index) => (
        <Card key={index} style={styles.groupCard}>
          <Text style={styles.groupTitle}>
            {t("groupResults", { name: group.groupName })}
          </Text>

          <View style={styles.grid}>
            <StatBox
              label={t("meatLabel")}
              value={`${formatNumber(group.finalMeatPerPerson)} kg`}
              sub={t("perPerson")}
            />
            <StatBox
              label={t("kolijaLabel")}
              value={`${formatNumber(group.finalKolijaPerPerson)} kg`}
              sub={t("perPerson")}
            />
            <StatBox
              label={t("telLabel")}
              value={`${formatNumber(group.finalTelPerPerson)} kg`}
              sub={t("perPerson")}
            />
            <StatBox
              label={t("totalContributors")}
              value={String(group.contributors)}
            />
          </View>

          {(group.sorkariDeduction.meat > 0 ||
            group.sorkariDeduction.kolija > 0 ||
            group.sorkariDeduction.tel > 0) && (
            <View style={styles.sorkariBox}>
              <Text style={styles.sorkariTitle}>{t("sorkariDeduction")}</Text>
              {group.sorkariDeduction.meat > 0 && (
                <SorkariRow
                  label={t("meatLabel")}
                  value={`${formatNumber(group.sorkariDeduction.meat)} kg`}
                />
              )}
              {group.sorkariDeduction.kolija > 0 && (
                <SorkariRow
                  label={t("kolijaLabel")}
                  value={`${formatNumber(group.sorkariDeduction.kolija)} kg`}
                />
              )}
              {group.sorkariDeduction.tel > 0 && (
                <SorkariRow
                  label={t("telLabel")}
                  value={`${formatNumber(group.sorkariDeduction.tel)} kg`}
                />
              )}
            </View>
          )}

          <View style={styles.totalsSection}>
            <Text style={styles.totalsTitle}>{t("totalDistribution")}</Text>
            <SorkariRow
              label={`${t("meatLabel")}:`}
              value={`${formatNumber(group.totalMeat)} kg`}
            />
            <SorkariRow
              label={`${t("kolijaLabel")}:`}
              value={`${formatNumber(group.totalKolija)} kg`}
            />
            <SorkariRow
              label={`${t("telLabel")}:`}
              value={`${formatNumber(group.totalTel)} kg`}
            />
          </View>
        </Card>
      ))}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>{t("totalDistribution")}</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t("meatLabel")}</Text>
            <Text style={styles.summaryValue}>
              {formatNumber(results.totalMeatDistributed)} kg
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t("kolijaLabel")}</Text>
            <Text style={styles.summaryValue}>
              {formatNumber(results.totalKolijaDistributed)} kg
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t("telLabel")}</Text>
            <Text style={styles.summaryValue}>
              {formatNumber(results.totalTelDistributed)} kg
            </Text>
          </View>
        </View>

        {(results.totalSorkariDeduction.meat > 0 ||
          results.totalSorkariDeduction.kolija > 0 ||
          results.totalSorkariDeduction.tel > 0) && (
          <View style={styles.summarySorkari}>
            <Text style={styles.summarySorkariTitle}>
              {t("sorkariDeduction")}
            </Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t("meatLabel")}</Text>
                <Text style={styles.summaryValue}>
                  {formatNumber(results.totalSorkariDeduction.meat)} kg
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t("kolijaLabel")}</Text>
                <Text style={styles.summaryValue}>
                  {formatNumber(results.totalSorkariDeduction.kolija)} kg
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{t("telLabel")}</Text>
                <Text style={styles.summaryValue}>
                  {formatNumber(results.totalSorkariDeduction.tel)} kg
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <Button title={t("reset")} onPress={onReset} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: "center",
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
  groupCard: {
    marginBottom: spacing.md,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statBox: {
    width: "48%",
    backgroundColor: colors.slate50,
    borderRadius: 8,
    padding: spacing.md,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  statSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  sorkariBox: {
    backgroundColor: colors.amberBg,
    borderWidth: 1,
    borderColor: colors.amberBorder,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sorkariTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.amberText,
    marginBottom: spacing.sm,
  },
  sorkariRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  sorkariLabel: {
    fontSize: 14,
    color: colors.amberText,
  },
  sorkariValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.amberText,
  },
  totalsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  totalsTitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  summaryCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryText,
  },
  summarySorkari: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  summarySorkariTitle: {
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: spacing.md,
  },
});
