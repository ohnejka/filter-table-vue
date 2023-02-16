<template>
  <div v-if="isError">
    <h1 class="error">
      <p>Sorry, can't fetch data from server.</p>
      <p>Please come back later...</p>
    </h1>
  </div>
  <div v-else>
    <ProjectsTable v-if="isDesktopMq" />
    <ProjectsTableMobile v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosApi from "@/apps/main/infrasturcture/api/axios";
import useTableStore from "../ds/store/store";
import Repository from "../ds/repository/mainRepository";
import ProjectsTable from "./components/ProjectsTable.vue";
import ProjectsTableMobile from "./components/ProjectsTableMobile.vue";
import { storeToRefs } from "pinia";
import useMqStore from "@/libs/scripts/mediaQuery/store";

export default defineComponent({
  name: "TablePage",
  components: {
    ProjectsTable,
    ProjectsTableMobile,
  },

  async setup() {
    const tableStore = useTableStore();
    const { isError } = storeToRefs(tableStore);

    const mqStore = useMqStore();
    const { isDesktopMq } = storeToRefs(mqStore);

    // . init repo and get data from server
    const repo = new Repository(axiosApi, tableStore);
    await repo.init();

    return {
      isDesktopMq,
      isError,
    };
  },
});
</script>

<style lang="scss" scoped>
.error {
  color: $green;

  p + p {
    margin-top: 1rem;
  }
}
</style>
