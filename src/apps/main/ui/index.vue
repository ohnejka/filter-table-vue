<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/libs/ui/layouts/Default.vue";

export default defineComponent({
  name: "App",
  components: {
    DefaultLayout,
  },
});
</script>
