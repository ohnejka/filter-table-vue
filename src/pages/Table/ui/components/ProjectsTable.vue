<template>
  <div class="table">
    <!-- <Tabs class="tabs-wrapper" :tabs="tabs" />
      <TableHead :titles="tableTitles" class="table-head" />
   -->
    <div
      v-for="(project, index) in filteredAdaptedProjects"
      :key="index"
      class="table__row"
    >
      {{ project.company }}
      <!-- <TableRow :item="project" /> -->
    </div>

    <div
      v-if="filteredAdaptedProjects.length === 0 && isLoaded"
      class="table__no-result"
    >
      <p>Sorry, nothing here...</p>
      <p>Keep in touch to follow further updates</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  nextTick,
  type ComputedRef,
  type Ref,
} from "vue";
import { storeToRefs } from "pinia";
import useTableStore from "../../ds/store/store";
import type {
  Project,
  ProjectWithCombinedFilters,
  Tab,
} from "../../bl/entities";

export default defineComponent({
  name: "ProjectsTable",
  // components: {
  //   Tabs,
  //   TableRow,
  //   TableHead,
  // },
  setup() {
    const isLoaded = ref(false);
    const adaptedProjects: Ref<ProjectWithCombinedFilters[]> = ref([]);

    const store = useTableStore();
    const { allTabs, allProjects, tableTitles, activeFilters } =
      storeToRefs(store);

    const filteredAdaptedProjects: ComputedRef<ProjectWithCombinedFilters[]> =
      computed(() => {
        const currentFilters = activeFilters.value;

        // . filter projects by tab filter
        const filteredByTab = adaptedProjects.value.filter(
          (x: ProjectWithCombinedFilters) => {
            const projectTabStrings = x.tabs.map((tab: Tab) => tab.title);

            const isRelevant = projectTabStrings.includes(currentFilters.tab);
            return isRelevant;
          }
        );

        // . filter projects by all other filters
        const filteredBySelection = filteredByTab.filter(
          (x: ProjectWithCombinedFilters) => {
            const isOkForRoundsFilter =
              currentFilters.rounds.length === 0
                ? true
                : currentFilters.rounds.includes(x.round);

            const isOkForSectorsFilter =
              currentFilters.sectors.length === 0
                ? true
                : currentFilters.sectors.includes(x.sector);
            const isOkForGeosFilters =
              currentFilters.geos.length === 0
                ? true
                : currentFilters.geos.includes(x.location);

            const isTotallyOk =
              isOkForRoundsFilter && isOkForSectorsFilter && isOkForGeosFilters;

            return isTotallyOk;
          }
        );

        return filteredBySelection;
      });

    onMounted(async () => {
      await nextTick();
      isLoaded.value = true;

      adaptedProjects.value = allProjects.value.map((x: Project) => {
        const tabStrings = x.tabs.map((x: Tab) => x.title);

        const adapted: ProjectWithCombinedFilters = {
          ...x,
          allFilters: [x.sector, x.round, x.location, ...tabStrings],
        };

        return adapted;
      });

      console.log("on mounted end");
    });

    return {
      isLoaded,
      adaptedProjects,
      filteredAdaptedProjects,
      allTabs,
      tableTitles,
    };
  },
});
</script>

<style lang="scss">
.table {
  position: relative;
  font-family: $fontBasic;
  font-size: 1.8rem;

  &__row {
    @include desktop {
      &:nth-child(3) {
        margin-top: 10rem;
      }
    }
  }

  &__no-result {
    margin-top: 18rem;
    margin-bottom: 8rem;
    color: $greenLight;

    @include desktop {
      p {
        display: block;
        font-size: 1.8rem;
      }

      p + p {
        margin-top: 1rem;
      }
    }
  }
}

.table-head {
  @include desktop {
    margin-top: 4rem;
    margin-bottom: 1rem;
  }
}
</style>
