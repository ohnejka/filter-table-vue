import type { Ref } from "vue";
import { storeToRefs } from "pinia";
import type { RouteLocationNormalizedLoaded, Router } from "vue-router";
import type {
  ActiveFiltersData,
  TableStore,
} from "../../../../../ds/store/store";
import type { Tab } from "../../../../../bl/entities";
import type { TabsStore } from "../store/store";

class TabsRepository {
  private static ALL_TAB_QUERY_ID = "all";
  private static ALL_TAB_TITLE = "All funds";
  private allTabs: Ref<ReadonlyArray<Tab>>;
  private activeFilters: Ref<ActiveFiltersData>;

  constructor(
    private tableStore: TableStore,
    private tabsStore: TabsStore,
    private route: RouteLocationNormalizedLoaded,
    private router: Router
  ) {
    const { allTabs, activeFilters } = storeToRefs(this.tableStore);

    this.allTabs = allTabs;
    this.activeFilters = activeFilters;
  }

  public setupTabs = () => {
    const tab = this.route.query.tab;
    const relevantTabFromQuery = this.allTabs.value.find(
      (x: Tab) => x.queryId === tab
    );

    // . if query matches a tab
    if (relevantTabFromQuery) {
      this.updateActiveFilters(relevantTabFromQuery.title);

      const relevantIndex = this.allTabs.value.indexOf(relevantTabFromQuery);
      this.tabsStore.setCurrentTabIndex(relevantIndex);
      return;
    }

    // . if not - set defaults
    console.log("Tab query empty or doesnt match tabs options from DB");

    const allTab = this.allTabs.value.find(
      (x: Tab) => x.queryId === TabsRepository.ALL_TAB_QUERY_ID
    );

    const finalTitle = allTab ? allTab.title : TabsRepository.ALL_TAB_TITLE;
    this.updateActiveFilters(finalTitle);
    this.tabsStore.setCurrentTabIndex(0);
  };

  public setTab = (index: number, tabTitle: string): void => {
    const { currentTabIndex } = storeToRefs(this.tabsStore);

    this.tabsStore.setCurrentTabIndex(index);
    this.updateActiveFilters(tabTitle);
    const relevantTab = this.allTabs.value[currentTabIndex.value];

    this.updateTabQueryParam(relevantTab.queryId);
  };

  private updateTabQueryParam = (query: string): void => {
    this.router.push({
      query: {
        ...this.route.query,
        tab: query,
      },
    });
  };

  private updateActiveFilters = (tabTitle: string): void => {
    this.saveFiltersInStore({
      ...this.activeFilters.value,
      tab: tabTitle,
    });
  };

  private saveFiltersInStore = (filters: ActiveFiltersData): void => {
    this.tableStore.setActiveFilters(filters);
  };
}

export default TabsRepository;
