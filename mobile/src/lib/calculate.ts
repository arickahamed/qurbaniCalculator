export interface Group {
  name: string;
  contributors: number;
}

export interface Quantities {
  meat: number;
  kolija: number;
  tel: number;
}

export interface SorkariDeduction {
  meat: number;
  kolija: number;
  tel: number;
}

export interface GroupResult {
  groupName: string;
  contributors: number;
  meatPerPerson: number;
  kolijaMeatPerPerson: number;
  telPerPerson: number;
  finalMeatPerPerson: number;
  finalKolijaPerPerson: number;
  finalTelPerPerson: number;
  totalMeat: number;
  totalKolija: number;
  totalTel: number;
  sorkariDeduction: SorkariDeduction;
}

export interface CalculationResult {
  groups: GroupResult[];
  totalContributors: number;
  totalMeatDistributed: number;
  totalKolijaDistributed: number;
  totalTelDistributed: number;
  totalSorkariDeduction: SorkariDeduction;
}

export function calculateDistribution(
  groups: Group[],
  quantities: Quantities,
  isMultipleSams: boolean,
): CalculationResult {
  const totalContributors = groups.reduce((sum, g) => sum + g.contributors, 0);

  const largestGroupIndex = groups.reduce((maxIndex, _current, index) => {
    return groups[index].contributors > groups[maxIndex].contributors
      ? index
      : maxIndex;
  }, 0);

  const round = (n: number) => Math.round(n * 100) / 100;

  const results: GroupResult[] = groups.map((group, index) => {
    const meatPerPerson = quantities.meat / totalContributors;
    const kolijaMeatPerPerson = quantities.kolija / totalContributors;
    const telPerPerson = quantities.tel / totalContributors;

    const groupTotalMeat = meatPerPerson * group.contributors;
    const groupTotalKolija = kolijaMeatPerPerson * group.contributors;
    const groupTotalTel = telPerPerson * group.contributors;

    const sorkariDeduction: SorkariDeduction = { meat: 0, kolija: 0, tel: 0 };
    let finalMeatPerPerson = meatPerPerson;
    let finalKolijaPerPerson = kolijaMeatPerPerson;
    let finalTelPerPerson = telPerPerson;

    const isLargestGroup = index === largestGroupIndex && isMultipleSams;
    const appliesSorkari = !isMultipleSams || isLargestGroup;

    if (appliesSorkari) {
      sorkariDeduction.meat = groupTotalMeat / 3;
      sorkariDeduction.kolija = groupTotalKolija / 3;
      sorkariDeduction.tel = groupTotalTel / 3;
      finalMeatPerPerson =
        (groupTotalMeat - sorkariDeduction.meat) / group.contributors;
      finalKolijaPerPerson =
        (groupTotalKolija - sorkariDeduction.kolija) / group.contributors;
      finalTelPerPerson =
        (groupTotalTel - sorkariDeduction.tel) / group.contributors;
    }

    return {
      groupName: group.name || `Group ${index + 1}`,
      contributors: group.contributors,
      meatPerPerson: round(meatPerPerson),
      kolijaMeatPerPerson: round(kolijaMeatPerPerson),
      telPerPerson: round(telPerPerson),
      finalMeatPerPerson: round(finalMeatPerPerson),
      finalKolijaPerPerson: round(finalKolijaPerPerson),
      finalTelPerPerson: round(finalTelPerPerson),
      totalMeat: round(groupTotalMeat - sorkariDeduction.meat),
      totalKolija: round(groupTotalKolija - sorkariDeduction.kolija),
      totalTel: round(groupTotalTel - sorkariDeduction.tel),
      sorkariDeduction: {
        meat: round(sorkariDeduction.meat),
        kolija: round(sorkariDeduction.kolija),
        tel: round(sorkariDeduction.tel),
      },
    };
  });

  return {
    groups: results,
    totalContributors,
    totalMeatDistributed: Math.round(quantities.meat * 100) / 100,
    totalKolijaDistributed: Math.round(quantities.kolija * 100) / 100,
    totalTelDistributed: Math.round(quantities.tel * 100) / 100,
    totalSorkariDeduction: {
      meat: round(
        results.reduce((sum, g) => sum + g.sorkariDeduction.meat, 0),
      ),
      kolija: round(
        results.reduce((sum, g) => sum + g.sorkariDeduction.kolija, 0),
      ),
      tel: round(results.reduce((sum, g) => sum + g.sorkariDeduction.tel, 0)),
    },
  };
}
