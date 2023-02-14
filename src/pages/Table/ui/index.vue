<template>
  <div>content here...</div>
  <ProjectsTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosApi from "@/apps/main/infrasturcture/api/axios";
import useTableStore from "../ds/store/store";
import Repository from "../ds/repository/mainRepository";
import ProjectsTable from "./components/ProjectsTable.vue";

export default defineComponent({
  name: "TablePage",
  components: {
    ProjectsTable,
  },

  async setup() {
    const store = useTableStore();

    // . init repo and get data from server
    const repo = new Repository(axiosApi, store);
    await repo.init();
  },
});
</script>
