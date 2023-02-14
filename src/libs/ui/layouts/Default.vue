<template>
  <Suspense>
    <div class="layout">
      <slot />
    </div>

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  padding: 50px 100px;
  min-height: 100vh;
}
</style>
