<template>
  <div class="table">
    <TableSortMobile class="table__sorting" />
    <Tabs />
    <div
      v-for="(project, index) in filteredAdaptedProjects"
      :key="index"
      class="table__row"
    >
      {{ project.company }}
      <!-- <TableRowMobile :key="updateKey" :item="project" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  type Ref,
} from "vue";
import { storeToRefs } from "pinia";
import useTableStore from "../../ds/store/store";
import type {
  Project,
  ProjectWithCombinedFilters,
  Tab,
} from "../../bl/entities";
import Tabs from "../widgets/ProjectsTab/ui/index.vue";
import TableSortMobile from "./TableSortMobile.vue";

export default defineComponent({
  name: "ProjectsTableMobile",
  components: {
    Tabs,
    TableSortMobile,
    // TableRowMobile,
  },
  setup() {
    const isLoaded = ref(false);
    const updateKey = ref(0);
    const adaptedProjects: Ref<ProjectWithCombinedFilters[]> = ref([]);

    const store = useTableStore();
    const { allProjects, activeFilters, mobileSorting } = storeToRefs(store);

    const filteredAdaptedProjects: Ref<
      ReadonlyArray<ProjectWithCombinedFilters>
    > = computed(() => {
      // . filter by tabs
      const filteredByTab = adaptedProjects.value.filter(
        (x: ProjectWithCombinedFilters) => {
          const projectTabStrings = x.tabs.map((tab: Tab) => tab.title);

          const isRelevant = projectTabStrings.includes(
            activeFilters.value.tab
          );
          return isRelevant;
        }
      );

      // . if no sorting applied - return as is
      if (!mobileSorting.value?.id) {
        return filteredByTab;
      }

      // . else, do the sorting
      let nameToSortBy: string = mobileSorting.value.name.toLowerCase();

      const direction = mobileSorting.value.direction;

      type IndexableObject = {
        [key: string]: string;
      };

      const filteredAndSorted = filteredByTab.sort(
        (a: ProjectWithCombinedFilters, b: ProjectWithCombinedFilters) => {
          if (
            !(a as any as IndexableObject)[nameToSortBy] ||
            !(b as any as IndexableObject)[nameToSortBy]
          ) {
            throw new Error(
              `Error in sorting by ${nameToSortBy}, check mobile sorting props`
            );
          }

          const aName = (a as any as IndexableObject)[
            nameToSortBy
          ].toLowerCase();
          const bName = (b as any as IndexableObject)[
            nameToSortBy
          ].toLowerCase();

          if (direction === "up") {
            return aName.localeCompare(bName);
          } else {
            return bName.localeCompare(aName);
          }
        }
      );

      return filteredAndSorted;
    });

    watch(filteredAdaptedProjects, () => {
      updateKey.value++;
    });

    onMounted(async () => {
      await nextTick();
      isLoaded.value = true;

      adaptedProjects.value = allProjects.value.map((x: Project) => {
        const tabStrings = x.tabs.map((x: Tab) => x.title);

        const adapted: ProjectWithCombinedFilters = {
          ...x,
          allFilters: [...tabStrings],
        };

        return adapted;
      });
    });

    return {
      filteredAdaptedProjects,
      isLoaded,
      updateKey,
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  &__sorting {
    @include tablet {
      position: relative;
      width: 45%;
      left: -1.5rem;
      margin-bottom: 5rem;
    }
  }

  &__row {
    &:nth-child(3) {
      margin-top: 4.3rem;
    }
  }
}
</style>
