<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style scoped>
.layout {
  display: flex;
  padding: 50px 100px;
  min-height: 100vh;
}
</style>
