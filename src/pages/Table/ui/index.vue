<template>
  <div>
    <div>content here...</div>
    {{ allMobileSortingOptions }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import useTableStore from "../ds/store";

export default defineComponent({
  name: "TablePage",
  setup() {
    const store = useTableStore();
    const { allMobileSortingOptions } = storeToRefs(store);

    return {
      allMobileSortingOptions,
    };
  },
});
</script>
