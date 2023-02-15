<template>
  <section class="tabs">
    <div class="tabs__body">
      <div
        v-for="(tab, i) in allTabs"
        :key="i"
        class="tabs__item-wrapper"
        :class="{ '--active': currentTabIndex === i }"
      >
        <button
          v-html="adaptTitle(i, tab.title)"
          type="button"
          @click="onTabClick(i, tab.title)"
          class="tabs__item"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useTableStore from "../../../../ds/store/store";
import useTabsStore from "../ds/store/store";
import { useRoute, useRouter } from "vue-router";
import TabsRepository from "../ds/repository/mainRepository";

export default defineComponent({
  name: "ProjectTabs",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const tableStore = useTableStore();
    const { allTabs } = storeToRefs(tableStore);

    const tabsStore = useTabsStore();
    const { currentTabIndex } = storeToRefs(tabsStore);

    const tabsRepo = new TabsRepository(tableStore, tabsStore, route, router);

    onMounted(() => tabsRepo.setupTabs());

    // events
    const onTabClick = (index: number, tabTitle: string): void => {
      tabsRepo.setTab(index, tabTitle);
    };

    // ui helpers
    const adaptTitle = (id: number, title: string): string => {
      //@TODO isMobile/isDesktop mq
      const isMobile = false;

      return isMobile ? (id > 0 ? title.split(" ")[0] : title) : title;
    };

    return {
      allTabs,
      currentTabIndex,
      adaptTitle,
      onTabClick,
    };
  },
});
</script>

<style lang="scss">
.tabs {
  &__body {
    display: flex;
    border-bottom: 0.1rem solid #f2f2f2;
  }

  &__item-wrapper {
    padding-bottom: 3rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: $gray;
    transition: all 0.2s $defaultEasing;
    border-bottom: 0.25rem solid transparent;

    &.--active {
      color: $green;
      border-color: $green;
      pointer-events: none;
    }

    &:not(:last-child) {
      margin-right: 10rem;

      @include mobile {
        margin-right: 4.5rem;
      }
    }
  }

  &__item {
    @include button-reset;
  }
}
</style>
