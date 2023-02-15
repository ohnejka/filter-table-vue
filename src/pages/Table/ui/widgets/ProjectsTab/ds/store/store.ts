import { defineStore, type Store, type _UnwrapAll } from "pinia";
import { type Ref, ref } from "vue";

export const tabsStore = defineStore("tabs", () => {
  // state
  const currentTabIndex: Ref<number> = ref(0);

  function setCurrentTabIndex(index: number) {
    currentTabIndex.value = index;
  }

  return {
    // state
    currentTabIndex,
    // actions
    setCurrentTabIndex,
  };
});

export type TabsStore = ReturnType<typeof tabsStore>;
export default tabsStore;
