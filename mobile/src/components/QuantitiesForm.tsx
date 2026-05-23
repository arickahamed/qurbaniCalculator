import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { Quantities } from "../lib/calculate";
import { Button, Card, ErrorText, Input, Label } from "./ui";
import { colors, spacing } from "../theme";

interface QuantitiesFormProps {
  onQuantitiesSubmit: (quantities: Quantities) => void;
  onBack: () => void;
}

export function QuantitiesForm({
  onQuantitiesSubmit,
  onBack,
}: QuantitiesFormProps) {
  const { t } = useTranslation();
  const [meat, setMeat] = useState("");
  const [kolija, setKolija] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSubmit = () => {
    const newErrors: Record<string, string> = {};
    const meatNum = parseFloat(meat);
    const kolijaNum = parseFloat(kolija);
    const telNum = parseFloat(tel);

    if (!meat || Number.isNaN(meatNum) || meatNum <= 0) {
      newErrors.meat = t("validNumber");
    }
    if (!kolija || Number.isNaN(kolijaNum) || kolijaNum < 0) {
      newErrors.kolija = t("validNumber");
    }
    if (!tel || Number.isNaN(telNum) || telNum < 0) {
      newErrors.tel = t("validNumber");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onQuantitiesSubmit({
        meat: meatNum,
        kolija: kolijaNum,
        tel: telNum,
      });
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const next = { ...errors };
      delete next[field];
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
        <Text style={styles.title}>{t("quantitiesTitle")}</Text>

        <View style={styles.field}>
          <Label>{t("meatQuantity")}</Label>
          <Input
            value={meat}
            keyboardType="decimal-pad"
            placeholder="0"
            onChangeText={(v) => {
              setMeat(v);
              clearError("meat");
            }}
          />
          {errors.meat && <ErrorText>{errors.meat}</ErrorText>}
        </View>

        <View style={styles.field}>
          <Label>{t("kolijaMeat")}</Label>
          <Input
            value={kolija}
            keyboardType="decimal-pad"
            placeholder="0"
            onChangeText={(v) => {
              setKolija(v);
              clearError("kolija");
            }}
          />
          {errors.kolija && <ErrorText>{errors.kolija}</ErrorText>}
        </View>

        <View style={styles.field}>
          <Label>{t("telQuantity")}</Label>
          <Input
            value={tel}
            keyboardType="decimal-pad"
            placeholder="0"
            onChangeText={(v) => {
              setTel(v);
              clearError("tel");
            }}
          />
          {errors.tel && <ErrorText>{errors.tel}</ErrorText>}
        </View>

        <View style={styles.row}>
          <Button title={t("goBack")} variant="outline" onPress={onBack} />
          <Button title={t("calculate")} onPress={validateAndSubmit} />
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
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
