<template>
  <div class="table-head">
    <LayoutRow>
      <LayoutCol
        v-for="(item, index) in filtersUi"
        :key="index"
        :lg="getLargeColQty(index)"
      >
        <HeadItem :item="item" :item-index="index" />
      </LayoutCol>
    </LayoutRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import { prepareFiltersDataForUi } from "./bl";
import { storeToRefs } from "pinia";
import useTableStore from "../../../ds/store/store";
import LayoutCol from "@/libs/ui/components/Col.vue";
import LayoutRow from "@/libs/ui/components/Row.vue";
import HeadItem from "./components/HeadItem.vue";

export default defineComponent({
  name: "TableHead",
  components: {
    LayoutRow,
    LayoutCol,
    HeadItem,
  },
  props: {
    titles: {
      type: Object as PropType<{ [key: number]: string }>,
      required: true,
    },
  },
  setup(props) {
    const store = useTableStore();
    const { roundFilters, geoFilters, sectorFilters } = storeToRefs(store);

    const preparedFilters = prepareFiltersDataForUi(props.titles, {
      roundFilters: roundFilters.value,
      geoFilters: geoFilters.value,
      sectorFilters: sectorFilters.value,
    });

    const filtersUi = ref(preparedFilters);

    const getLargeColQty = (index: number): number => {
      return index === Object.keys(props.titles).length - 1 ? 2 : 1;
    };

    return {
      filtersUi,
      getLargeColQty,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-head {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
