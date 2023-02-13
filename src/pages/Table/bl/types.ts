export type Project = {
  readonly company: string;
  readonly companyUrl: string;
  readonly round: string;
  readonly sector: string;
  readonly description: string;
  readonly bio: {
    readonly label: string;
    readonly list: ReadonlyArray<{
      url: string;
      type: string;
    }>;
  };
  readonly logoUrl: string | null;
  readonly tabs: ReadonlyArray<{
    readonly title: string;
    readonly queryId: string;
  }>;
};
