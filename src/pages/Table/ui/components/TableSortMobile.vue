<template>
  <div class="sorting">
    <label class="sorting__label" for="select">
      <div class="sorting__text">
        <span>{{ label }}</span>

        <span class="sorting__direction">
          <span>a</span>
          <i v-if="mobileSorting?.direction === 'down'" class="sorting__arrow">
            <ArrowLeftSvg />
          </i>
          <i v-else class="sorting__arrow">
            <ArrowRightSvg />
          </i>
          <span>z</span>
        </span>
      </div>

      <select id="select" @change="onSortingChange">
        <option
          v-for="(item, index) in allMobileSortingOptions"
          :key="index"
          :selected="item.id === mobileSorting?.id"
          :value="index"
        >
          {{ item.name }}

          <template v-if="item.direction === 'down'">&nbsp;a &larr; z</template>
          <template v-else>&nbsp;a &rarr; z</template>
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import useTableStore from "../../ds/store/store";
import ArrowRightSvg from "@/libs/ui/components/SvgComponents/ArrowRightSvg.vue";
import ArrowLeftSvg from "@/libs/ui/components/SvgComponents/ArrowLeftSvg.vue";

export default defineComponent({
  name: "TableSortMobile",
  components: {
    ArrowLeftSvg,
    ArrowRightSvg,
  },
  setup() {
    const store = useTableStore();
    const { mobileSorting, allMobileSortingOptions } = storeToRefs(store);

    const label = computed(() => {
      if (!mobileSorting.value?.id) {
        return "Sort by";
      }
      return mobileSorting.value.name;
    });

    const onSortingChange = (event: Event) => {
      const optionIndex = (event.target as any).value;
      store.setActiveSortingItemByIndex(optionIndex);
    };

    return {
      mobileSorting,
      allMobileSortingOptions,
      label,
      onSortingChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.sorting {
  display: block;
  position: relative;

  @include mobile {
    margin-bottom: 5rem;
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 2.75rem;
    display: block;
    width: 8px;
    height: 8px;
    border-top: 2px solid $green;
    border-right: 2px solid $green;
    user-select: none;
    transform: rotate(135deg) translateX(-10px);
    transform-origin: center center;
    transition: rotate 0.3s $easeInOutExpo, translate 0.3s $easeInOutExpo;
  }

  &__label {
    display: block;
    width: 100%;
    background-color: $grayLight;
    border-radius: 50px;
    height: 5rem;
    border: none;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    color: $gray;
    position: relative;
  }

  select {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  select:hover,
  select:focus,
  select:active {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  &__text {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-right: 3rem;
  }

  &__direction {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    i {
      width: 26px;
      height: 1.2rem;
      margin: 0px 6px;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
  }
}
</style>
