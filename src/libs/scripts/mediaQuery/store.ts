import { defineStore } from "pinia";
import { ref, computed } from "vue";

export enum MqValue {
  Desktop = "desktop",
  Tablet = "tablet",
  Mobile = "mobile",
}

export enum MqKey {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

export type MqObject = {
  key: MqKey;
  value: number;
};

type MqPayload = {
  currentMediaName: MqValue;
  currentMediaKey: MqKey;
};

export const mqStore = defineStore("mediaQuery", () => {
  // state
  const mqValue = ref(MqValue.Desktop);
  const mqKey = ref(MqKey.Sm);
  const list = ref([
    {
      key: MqKey.Sm,
      value: 767,
    },
    {
      key: MqKey.Md,
      value: 1024,
    },
    {
      key: MqKey.Lg,
      value: Infinity,
    },
  ]);

  // getters
  const currentMq = computed(() => mqValue.value);
  const isDesktopMq = computed(() => mqValue.value === MqValue.Desktop);
  const isMobileMq = computed(() => mqValue.value === MqValue.Mobile);
  const isTabletMq = computed(() => mqValue.value === MqValue.Tablet);
  const isNotDesktopMq = computed(
    () => mqValue.value === MqValue.Mobile || mqValue.value === MqValue.Tablet
  );

  function updateMq(payload: MqPayload) {
    mqValue.value = payload.currentMediaName;
    mqKey.value = payload.currentMediaKey;
  }

  return {
    // state
    mqValue,
    mqKey,
    list,
    // getters
    currentMq,
    isDesktopMq,
    isMobileMq,
    isTabletMq,
    isNotDesktopMq,
    // actions
    updateMq,
  };
});

export type MqStore = ReturnType<typeof mqStore>;
export default mqStore;
