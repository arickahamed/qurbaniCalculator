"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Group } from "@/lib/calculate";

const MIN_CONTRIBUTORS = 1;
const MAX_CONTRIBUTORS = 7;

const initialMultipleGroups = (): Group[] => [{ name: "", contributors: 1 }];
const initialSingleGroup = (): Group[] => [{ name: "", contributors: 1 }];

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
  const [groups, setGroups] = useState<Group[]>(
    isMultipleSams ? initialMultipleGroups() : initialSingleGroup(),
  );
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
    if (Object.keys(newErrors).length > 0) {
      return null;
    }

    return validatedGroups;
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
    const newGroups = [...groups];
    if (field === "name") {
      newGroups[index][field] = value;
      setGroups(newGroups);
    } else {
      const newInputs = [...contributorInputs];
      newInputs[index] = value.replace(/\D/g, "");
      setContributorInputs(newInputs);
    }

    if (errors[index]) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
    if (errors.form) {
      const newErrors = { ...errors };
      delete newErrors.form;
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    const validated = validateForm();
    if (validated) {
      onGroupsSubmit(validated);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">
          {isMultipleSams ? t("multipleGroupsTitle") : t("singleGroupTitle")}
        </h1>

        <div className="space-y-6 mb-8">
          {groups.map((group, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              {groups.length > 1 && (
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  {t("groupCount", { count: index + 1 })}
                </p>
              )}

              <div className="space-y-4">
                {isMultipleSams && (
                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      {t("groupName")}
                    </Label>
                    <Input
                      type="text"
                      placeholder={t("groupNamePlaceholder")}
                      value={group.name}
                      onChange={(e) =>
                        handleGroupChange(index, "name", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    {t("numberOfContributors")}
                  </Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={contributorInputs[index] ?? ""}
                    onChange={(e) =>
                      handleGroupChange(index, "contributors", e.target.value)
                    }
                    className="mt-1 no-spinner"
                  />
                  {!isMultipleSams && (
                    <p className="text-xs text-slate-500 mt-1">
                      {t("contributorsRangeHint")}
                    </p>
                  )}
                </div>

                {errors[index] && (
                  <p className="text-sm text-red-600">{errors[index]}</p>
                )}
              </div>

              {groups.length > 1 && (
                <Button
                  onClick={() => handleRemoveGroup(index)}
                  variant="outline"
                  className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {t("removeGroup")}
                </Button>
              )}
            </div>
          ))}
        </div>

        {isMultipleSams && (
          <>
            <p className="text-sm text-center text-slate-600 mb-4">
              {t("totalContributorsCount", {
                current: totalContributors,
                max: MAX_CONTRIBUTORS,
              })}
            </p>
            <Button
              onClick={handleAddGroup}
              variant="outline"
              className="w-full mb-4"
            >
              {t("addGroup")}
            </Button>
          </>
        )}

        {errors.form && (
          <p className="text-sm text-red-600 mb-4 text-center">{errors.form}</p>
        )}

        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" className="flex-1">
            {t("goBack")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-slate-900 hover:bg-slate-800"
          >
            {t("next")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
