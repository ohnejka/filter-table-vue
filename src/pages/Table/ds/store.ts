import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { mobileSortingOptions, type SortingItem } from "./mock";

type ProjectTab = {
  id: number;
};
type Project = {
  tabs: any;
  round: any;
  sector: any;
  location: any;
};

enum FilterTitle {
  Company = "company",
  Rounds = "rounds",
  Sectors = "sectors",
  Geos = "geos",
  Bio = "bio",
}

type ActiveFiltersData = {
  readonly tab: string;
  readonly [FilterTitle.Rounds]: string[];
  readonly [FilterTitle.Sectors]: string[];
  readonly [FilterTitle.Geos]: string[];
};

export default defineStore("table", () => {
  // state
  const allTabs: Ref<ReadonlyArray<ProjectTab>> = ref([]);
  const relevantTabs: Ref<ReadonlyArray<ProjectTab>> = ref([]);
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
  function setAllTabs(payload: ReadonlyArray<ProjectTab>) {
    allTabs.value = [...payload];
  }

  function setAllProjects(payload: ReadonlyArray<Project>) {
    allProjects.value = payload;
    setRevelantTab();
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

  const setRevelantTab = (): void => {
    const tabsFromProjectList = allProjects.value.map((x: Project) => {
      const tabsIds = x.tabs.map((x: ProjectTab) => x.id);
      return [tabsIds];
    });

    const flatArray = (tabsFromProjectList as any).flat(2);
    const tabsUniqueIds = Array.from(new Set(flatArray));

    const filteredTabs = allTabs.value.filter((x: ProjectTab) =>
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

  return {
    // state
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
    setAllTabs,
    setAllProjects,
    setActiveFilters,
    clearActiveFilters,
    setActiveSortingItem,
    setActiveSortingItemByIndex,
  };
});
