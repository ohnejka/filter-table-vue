import { FilterTitle } from "@/pages/Table/ds/store/store";

export type OptionValue = {
  readonly title: string;
  isChecked: boolean;
};

export type FilterUI = {
  readonly id: FilterTitle;
  readonly title: string;
  readonly isInteractive: boolean;
  readonly options?: ReadonlyArray<OptionValue>;
};

type FilterPayload = {
  readonly roundFilters: ReadonlyArray<string>;
  readonly geoFilters: ReadonlyArray<string>;
  readonly sectorFilters: ReadonlyArray<string>;
};

export const prepareFiltersDataForUi = (
  titles: { [key: number]: string },
  filters: FilterPayload
): ReadonlyArray<FilterUI> => {
  const { roundFilters, geoFilters, sectorFilters } = filters;

  const titlesArray: string[] = Object.keys(titles).map(
    (key: string) => titles[+key]
  );

  return [
    {
      id: FilterTitle.Company,
      title: titlesArray[0],
      isInteractive: false,
    },
    {
      id: FilterTitle.Rounds,
      title: titlesArray[1],
      isInteractive: true,
      options: roundFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Geos,
      title: titlesArray[2],
      isInteractive: true,
      options: geoFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Sectors,
      title: titlesArray[3],
      isInteractive: true,
      options: sectorFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Bio,
      title: titlesArray[4],
      isInteractive: false,
    },
  ];
};
