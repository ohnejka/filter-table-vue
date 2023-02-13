export type Tab = {
  readonly id: string;
  readonly title: string;
  readonly queryId: string;
};

export type PageData = {
  readonly components: ReadonlyArray<{
    readonly title: string;
    readonly columnLabels: ReadonlyArray<{
      [key: number]: string;
    }>;
  }>;
};

export type Project = {
  readonly company: string;
  readonly companyUrl: string;
  readonly round: string;
  readonly sector: string;
  readonly location: string;
  readonly description: string;
  readonly bio: {
    readonly label: string;
    readonly list: ReadonlyArray<{
      url: string;
      type: string;
    }>;
  };
  readonly logoUrl: string | null;
  readonly tabs: ReadonlyArray<Tab>;
};