import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { PageData, Project, Tab } from "../../bl/entities";
import { mobileSortingOptions, type SortingItem } from "./mock";

enum FilterTitle {
  Company = "company",
  Rounds = "rounds",
  Sectors = "sectors",
  Geos = "geos",
  Bio = "bio",
}

type StoreInitData = {
  readonly page: PageData;
  readonly tabs: ReadonlyArray<Tab>;
  readonly projects: ReadonlyArray<Project>;
};

export type ActiveFiltersData = {
  readonly tab: string;
  readonly [FilterTitle.Rounds]: string[];
  readonly [FilterTitle.Sectors]: string[];
  readonly [FilterTitle.Geos]: string[];
};

export const tableStore = defineStore("table", () => {
  // state
  const tableTitles: Ref<
    ReadonlyArray<{
      [key: number]: string;
    }>
  > = ref([]);
  const allTabs: Ref<ReadonlyArray<Tab>> = ref([]);
  const relevantTabs: Ref<ReadonlyArray<Tab>> = ref([]);
  const allProjects: Ref<ReadonlyArray<Project>> = ref([]);
  const roundFilters: Ref<ReadonlyArray<string>> = ref([]);
  const sectorFilters: Ref<ReadonlyArray<string>> = ref([]);
  const geoFilters: Ref<ReadonlyArray<string>> = ref([]);

  const activeFilters: Ref<ActiveFiltersData> = ref({
    tab: "",
    rounds: [],
    sectors: [],
    geos: [],
  });

  const mobileSorting: Ref<SortingItem | null> = ref(null);
  const allMobileSortingOptions: Ref<ReadonlyArray<SortingItem>> = ref([
    ...mobileSortingOptions,
  ]);

  // actions
  function init(payload: StoreInitData) {
    setTableTitles(payload.page);
    setAllTabs(payload.tabs);
    setAllProjects(payload.projects);
  }

  function setAllTabs(payload: ReadonlyArray<Tab>) {
    allTabs.value = [...payload];
  }

  function setAllProjects(payload: ReadonlyArray<Project>) {
    allProjects.value = payload;
    setRelevantTab();
    setRoundFilters();
    setSectorFilters();
    setGeoFilters();
  }

  function setActiveFilters(payload: ActiveFiltersData) {
    activeFilters.value = payload;
  }

  function clearActiveFilters() {
    activeFilters.value = {
      tab: activeFilters.value.tab,
      rounds: [],
      sectors: [],
      geos: [],
    };
  }

  function setActiveSortingItem(payload: SortingItem) {
    mobileSorting.value = payload;
  }

  function setActiveSortingItemByIndex(index: number) {
    const newOption = allMobileSortingOptions.value[index];
    mobileSorting.value = newOption;
  }

  const setRelevantTab = (): void => {
    const tabsFromProjectList = allProjects.value.map((x: Project) => {
      const tabsIds = x.tabs.map((x: Tab) => x.id);
      return [tabsIds];
    });

    const flatArray = (tabsFromProjectList as any).flat(2);
    const tabsUniqueIds = Array.from(new Set(flatArray));

    const filteredTabs = allTabs.value.filter((x: Tab) =>
      tabsUniqueIds.includes(x.id)
    );

    relevantTabs.value = filteredTabs;
  };

  const setRoundFilters = (): void => {
    const roundsFromProjectList = allProjects.value.map(
      (x: Project) => x.round
    );

    const uniqueRounds = Array.from(new Set(roundsFromProjectList));
    const sorted = uniqueRounds.sort((a, b) => a.localeCompare(b));
    roundFilters.value = sorted;
  };

  const setSectorFilters = (): void => {
    const sectorsFromProjectList = allProjects.value.map(
      (x: Project) => x.sector
    );
    const uniqueSectors = Array.from(new Set(sectorsFromProjectList));
    const sorted = uniqueSectors.sort((a, b) => a.localeCompare(b));
    sectorFilters.value = sorted;
  };

  const setGeoFilters = (): void => {
    const geosFromProjectList = allProjects.value.map(
      (x: Project) => x.location
    );
    const uniqueGeos = Array.from(new Set(geosFromProjectList));
    const sorted = uniqueGeos.sort((a, b) => a.localeCompare(b));
    geoFilters.value = sorted;
  };

  const setTableTitles = (payload: PageData): void => {
    const labels = payload.components[0].columnLabels;
    tableTitles.value = labels;
  };

  return {
    // state
    tableTitles,
    allTabs,
    relevantTabs,
    allProjects,
    roundFilters,
    sectorFilters,
    geoFilters,
    activeFilters,
    mobileSorting,
    allMobileSortingOptions,
    // actions
    init,
    setAllTabs,
    setAllProjects,
    setActiveFilters,
    clearActiveFilters,
    setActiveSortingItem,
    setActiveSortingItemByIndex,
  };
});

export type TableStore = typeof tableStore;
export default tableStore;
