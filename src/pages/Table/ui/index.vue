<template>
  <ProjectsTable v-if="isDesktopMq" />
  <ProjectsTableMobile v-else />
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
    const store = useTableStore();

    const mqStore = useMqStore();
    const { isDesktopMq } = storeToRefs(mqStore);

    // . init repo and get data from server
    const repo = new Repository(axiosApi, store);
    await repo.init();

    return {
      isDesktopMq,
    };
  },
});
</script>
