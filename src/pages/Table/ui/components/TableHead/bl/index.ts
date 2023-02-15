import { FilterTitle } from "@/pages/Table/ds/store/store";

type OptionValue = {
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
  titles: ReadonlyArray<{ [key: number]: string }>,
  filters: FilterPayload
): ReadonlyArray<FilterUI> => {
  const { roundFilters, geoFilters, sectorFilters } = filters;

  // @todo: change data format, remove as string
  return [
    {
      id: FilterTitle.Company,
      title: titles[0] as string,
      isInteractive: false,
    },
    {
      id: FilterTitle.Rounds,
      title: titles[1] as string,
      isInteractive: true,
      options: roundFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Geos,
      title: titles[2] as string,
      isInteractive: true,
      options: geoFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Sectors,
      title: titles[3] as string,
      isInteractive: true,
      options: sectorFilters.map((x: string) => ({
        title: x,
        isChecked: false,
      })),
    },
    {
      id: FilterTitle.Bio,
      title: titles[4] as string,
      isInteractive: false,
    },
  ];
};
