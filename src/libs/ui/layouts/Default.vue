<template>
  <Suspense>
    <div class="layout">
      <slot />
    </div>

    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { mediaQueryHandler } from "@/libs/scripts/mediaQuery";
import { debounce } from "throttle-debounce";
import useMqStore from "@/libs/scripts/mediaQuery/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "DefaultLayout",
  setup() {
    onMounted(() => {
      if (typeof window !== "undefined") {
        console.log(
          " Made with 🔥 by" + "%c ohnejka ",
          "color:#32CD32; font-size: 12px; line-height: 27px"
        );

        const mqStore = useMqStore();
        const { list } = storeToRefs(mqStore);

        window.addEventListener(
          "resize",
          debounce(50, () => {
            mediaQueryHandler(mqStore, list.value);
          }),
          false
        );
        window.addEventListener("resize", debounce(100, setCSSVAR), false);

        mediaQueryHandler(mqStore, list.value);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", mediaQueryHandler, false);
    });

    const setCSSVAR = (): void => {
      const root = document.documentElement;
      root.style.setProperty("--viewportHeight", window.innerHeight + "px");
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  min-height: 100vh;

  @include tablet {
    padding: 40px 20px;
  }

  @include mobile {
    padding: 20px 10px;
  }
}
</style>
