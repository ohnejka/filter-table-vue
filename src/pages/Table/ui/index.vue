<template>
  <div>content here... {{ allTabs }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import axiosApi from "@/apps/main/infrasturcture/api/axios";
import useTableStore from "../ds/store/store";
import Repository from "../ds/repository/mainRepository";

export default defineComponent({
  name: "TablePage",

  async setup() {
    const store = useTableStore();

    // . init repo and get data from server
    const repo = new Repository(axiosApi, store);
    await repo.init();

    const { allTabs } = storeToRefs(store);

    return {
      allTabs,
    };
  },
});
</script>
