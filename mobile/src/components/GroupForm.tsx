import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { Group } from "../lib/calculate";
import { Button, Card, ErrorText, Input, Label } from "./ui";
import { colors, spacing } from "../theme";

const MIN_CONTRIBUTORS = 1;
const MAX_CONTRIBUTORS = 7;

interface GroupFormProps {
  isMultipleSams: boolean;
  onGroupsSubmit: (groups: Group[]) => void;
  onBack: () => void;
}

export function GroupForm({
  isMultipleSams,
  onGroupsSubmit,
  onBack,
}: GroupFormProps) {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Group[]>([
    { name: "", contributors: 1 },
  ]);
  const [contributorInputs, setContributorInputs] = useState<string[]>(["1"]);
  const [errors, setErrors] = useState<
    Partial<Record<number | "form", string>>
  >({});

  const parsedContributors = contributorInputs.map((value) =>
    parseInt(value.trim(), 10),
  );
  const totalContributors = parsedContributors.reduce(
    (sum, n) => sum + (Number.isNaN(n) ? 0 : n),
    0,
  );

  const validateForm = (): Group[] | null => {
    const newErrors: Partial<Record<number | "form", string>> = {};
    const validatedGroups: Group[] = [];

    groups.forEach((group, index) => {
      const raw = contributorInputs[index]?.trim() ?? "";
      const parsed = parseInt(raw, 10);

      if (isMultipleSams && !group.name.trim()) {
        newErrors[index] = t("enterGroupName");
      }
      if (!raw || Number.isNaN(parsed) || !Number.isInteger(Number(raw))) {
        newErrors[index] = newErrors[index] ?? t("validNumber");
        return;
      }
      if (parsed < MIN_CONTRIBUTORS) {
        newErrors[index] = newErrors[index] ?? t("enterContributors");
        return;
      }
      if (!isMultipleSams && parsed > MAX_CONTRIBUTORS) {
        newErrors[index] = t("contributorsOutOfRange");
        return;
      }
      validatedGroups.push({ ...group, contributors: parsed });
    });

    if (isMultipleSams && groups.length < 2) {
      newErrors.form = t("atLeastTwoGroups");
    }
    if (isMultipleSams && validatedGroups.length === groups.length) {
      const sum = validatedGroups.reduce((s, g) => s + g.contributors, 0);
      if (sum < MIN_CONTRIBUTORS) {
        newErrors.form = t("contributorsSumTooLow");
      } else if (sum > MAX_CONTRIBUTORS) {
        newErrors.form = t("contributorsSumExceedMax");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? validatedGroups : null;
  };

  const handleAddGroup = () => {
    setGroups([...groups, { name: "", contributors: 1 }]);
    setContributorInputs([...contributorInputs, "1"]);
  };

  const handleRemoveGroup = (index: number) => {
    if (groups.length > 1) {
      setGroups(groups.filter((_, i) => i !== index));
      setContributorInputs(contributorInputs.filter((_, i) => i !== index));
    }
  };

  const handleGroupChange = (
    index: number,
    field: keyof Group,
    value: string,
  ) => {
    if (field === "name") {
      const newGroups = [...groups];
      newGroups[index].name = value;
      setGroups(newGroups);
    } else {
      const newInputs = [...contributorInputs];
      newInputs[index] = value.replace(/\D/g, "");
      setContributorInputs(newInputs);
    }
    if (errors[index]) {
      const next = { ...errors };
      delete next[index];
      setErrors(next);
    }
    if (errors.form) {
      const next = { ...errors };
      delete next.form;
      setErrors(next);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <Text style={styles.title}>
          {isMultipleSams ? t("multipleGroupsTitle") : t("singleGroupTitle")}
        </Text>

        {groups.map((group, index) => (
          <View key={index} style={styles.groupBlock}>
            {groups.length > 1 && (
              <Text style={styles.groupLabel}>
                {t("groupCount", { count: index + 1 })}
              </Text>
            )}
            {isMultipleSams && (
              <View style={styles.field}>
                <Label>{t("groupName")}</Label>
                <Input
                  value={group.name}
                  placeholder={t("groupNamePlaceholder")}
                  onChangeText={(v) => handleGroupChange(index, "name", v)}
                />
              </View>
            )}
            <View style={styles.field}>
              <Label>{t("numberOfContributors")}</Label>
              <Input
                value={contributorInputs[index] ?? ""}
                keyboardType="number-pad"
                onChangeText={(v) =>
                  handleGroupChange(index, "contributors", v)
                }
              />
              {!isMultipleSams && (
                <Text style={styles.hint}>{t("contributorsRangeHint")}</Text>
              )}
            </View>
            {errors[index] && <ErrorText>{errors[index]}</ErrorText>}
            {groups.length > 1 && (
              <Button
                title={t("removeGroup")}
                variant="dangerOutline"
                onPress={() => handleRemoveGroup(index)}
              />
            )}
          </View>
        ))}

        {isMultipleSams && (
          <>
            <Text style={styles.totalCount}>
              {t("totalContributorsCount", {
                current: totalContributors,
                max: MAX_CONTRIBUTORS,
              })}
            </Text>
            <Button title={t("addGroup")} variant="outline" onPress={handleAddGroup} />
          </>
        )}

        {errors.form && <ErrorText>{errors.form}</ErrorText>}

        <View style={styles.row}>
          <Button title={t("goBack")} variant="outline" onPress={onBack} />
          <Button title={t("next")} onPress={() => {
            const validated = validateForm();
            if (validated) onGroupsSubmit(validated);
          }} />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  groupBlock: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  field: {
    marginBottom: spacing.md,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  totalCount: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
