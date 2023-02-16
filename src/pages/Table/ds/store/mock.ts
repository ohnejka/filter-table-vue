export enum ProjectSorting {
  NotSet = "NotSet",
  Company = "Company",
  Round = "Round",
  Location = "Location",
  Sector = "Sector",
  Description = "Description",
}

type SortDirection = "up" | "down";

export type SortingItem = {
  readonly id: number;
  readonly name: ProjectSorting;
  readonly direction: SortDirection;
};

export const mobileSortingOptions: ReadonlyArray<SortingItem> = [
  {
    id: 1,
    name: ProjectSorting.Company,
    direction: "up",
  },
  {
    id: 2,
    name: ProjectSorting.Company,
    direction: "down",
  },
  {
    id: 3,
    name: ProjectSorting.Round,
    direction: "up",
  },
  {
    id: 4,
    name: ProjectSorting.Round,
    direction: "down",
  },
  {
    id: 5,
    name: ProjectSorting.Location,
    direction: "up",
  },
  {
    id: 6,
    name: ProjectSorting.Location,
    direction: "down",
  },
  {
    id: 7,
    name: ProjectSorting.Sector,
    direction: "up",
  },
  {
    id: 8,
    name: ProjectSorting.Sector,
    direction: "down",
  },
  {
    id: 9,
    name: ProjectSorting.Description,
    direction: "up",
  },
  {
    id: 10,
    name: ProjectSorting.Description,
    direction: "down",
  },
];
