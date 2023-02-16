<template>
  <div class="head-item">
    <div
      v-if="itemBlock.isInteractive"
      class="head-item__inner"
      @click="onFilterClick(itemBlock.id)"
    >
      <button
        class="head-item__button"
        type="button"
        :class="{ '--muted': item.id === openFilterId }"
      >
        <span>
          {{ itemBlock.title }}
        </span>
        <span v-if="checkedValuesQty > 0">
          {{ `( ${checkedValuesQty} )` }}
        </span>
      </button>
      <OnClickOutside @trigger="onFilterClose">
        <div
          class="head-item__toggle"
          :class="{ '--open': item.id === openFilterId }"
        >
          <div class="head-item__list">
            <div
              v-for="(filter, index) in itemBlock.options"
              :key="index"
              class="head-item__filter"
            >
              <label class="head-item__filter-label">
                <input
                  type="checkbox"
                  name="project-filters"
                  class="visually-hidden head-item__filter-checkbox"
                  :value="filter"
                  :checked="filter.isChecked"
                  @change="onSetFilter(index, itemBlock.id, filter.title)"
                />
                <span class="head-item__filter-value">{{ filter.title }}</span>
              </label>
            </div>

            <div class="head-item__reset" @click="onClearFilters">
              <button type="button" class="head-item__filter-checkbox">
                <span> {{ clearButtonText }}</span>
              </button>
              <span class="head-item__reset-icon" />
            </div>
          </div>
        </div>
      </OnClickOutside>
    </div>

    <div v-else>
      <div class="head-item__no-button">
        <span>{{ itemBlock.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, type PropType } from "vue";
import type { FilterUI, OptionValue } from "../bl";
import useTableStore, { FilterTitle } from "../../../../ds/store/store";
import { storeToRefs } from "pinia";
import { OnClickOutside } from "@vueuse/components";

const CLEAR_BUTTON_TEXT = "Clear all";

export default defineComponent({
  name: "HeadItem",
  components: {
    OnClickOutside,
  },
  props: {
    item: {
      type: Object as PropType<FilterUI>,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const itemBlock = ref({} as FilterUI);
    const openFilterId = ref("-1");
    const clearButtonText = ref(CLEAR_BUTTON_TEXT);

    const store = useTableStore();
    const { activeFilters } = storeToRefs(store);

    // computed
    const checkedValuesQty = computed(() => {
      if (!itemBlock.value.options) {
        return 0;
      }
      const checkedOptions = itemBlock.value.options.filter(
        (x: OptionValue) => x.isChecked
      );
      return checkedOptions.length;
    });

    onMounted(() => {
      //. create a copy in order to mutate later
      itemBlock.value = Object.assign({}, props.item);
    });

    const onFilterClick = (id: FilterTitle): void => {
      openFilterId.value === id
        ? (openFilterId.value = "-1")
        : (openFilterId.value = id);
    };

    const onFilterClose = (): void => {
      if (openFilterId.value !== "-1") {
        openFilterId.value = "-1";
      }
    };

    const onClearFilters = (): void => {
      if (!itemBlock.value.options) {
        return;
      }

      // . remove isChecked for all options in ui
      itemBlock.value.options.forEach(
        (x: OptionValue) => (x.isChecked = false)
      );

      // . save active filters from store to mutate later
      const afs = Object.assign({}, activeFilters.value);

      const id = itemBlock.value.id as
        | FilterTitle.Geos
        | FilterTitle.Sectors
        | FilterTitle.Rounds;

      // . get active options of this filter from store
      const optionNamesStore: string[] = afs[id];

      // . get all options from ui
      const optionNamesUi = itemBlock.value.options.map(
        (x: OptionValue) => x.title
      );

      // .  check if optionNamesStore contains any of ui options
      optionNamesUi.forEach((x: string) => {
        if (optionNamesStore.includes(x)) {
          // ..  if mathes - need to delete
          const indexInArray = optionNamesStore.indexOf(x);
          optionNamesStore.splice(indexInArray, 1);
        }
      });

      // . finally update store
      store.setActiveFilters(afs);
    };

    const onSetFilter = (
      index: number,
      filterId: string,
      title: string
    ): void => {
      if (!itemBlock.value.options) {
        return;
      }

      itemBlock.value.options[index].isChecked =
        !itemBlock.value.options[index].isChecked;

      // . save active filters from store to mutate later
      const afs = Object.assign({}, activeFilters.value);

      const id = filterId as
        | FilterTitle.Geos
        | FilterTitle.Sectors
        | FilterTitle.Rounds;

      // . get active options of this filter from store
      const optionNamesStore: string[] = afs[id];

      if (optionNamesStore.length === 0) {
        optionNamesStore.push(title);
      } else {
        // . check if incoming title is already in store
        const isInStore = optionNamesStore.includes(title);

        if (isInStore) {
          // .. if yes, delete
          const index = optionNamesStore.indexOf(title);
          optionNamesStore.splice(index, 1);
        } else {
          // .. if not, add
          optionNamesStore.push(title);
        }
      }

      // . finally update store
      store.setActiveFilters(afs);
    };

    return {
      itemBlock,
      onFilterClick,
      onFilterClose,
      onClearFilters,
      onSetFilter,
      checkedValuesQty,
      clearButtonText,
      openFilterId,
    };
  },
});
</script>

<style lang="scss" scoped>
.head-item {
  color: $gray;

  &__inner {
    position: relative;
    background-color: $grayFA;
    border-radius: 20px;

    @include tablet {
      left: -1.5rem;
    }

    @include desktop {
      left: -2rem;
    }
  }

  &__button {
    @include button-reset;
    position: relative;
    display: flex;
    align-items: center;
    min-height: 5rem;
    width: 100%;

    @include tablet {
      padding: 1rem 4rem 1rem 1.5rem;
    }

    @include desktop {
      padding: 1rem 4rem 1rem 2rem;

      &:not(.--muted) {
        &:hover {
          color: darken($gray, 10%);
        }
      }
    }

    span {
      display: inline-block;
    }

    span + span {
      margin-left: 0.5rem;
    }

    &:after {
      content: "";
      position: absolute;
      top: 38%;
      right: 2rem;
      display: block;
      width: 6px;
      height: 6px;
      border-top: 2px solid currentColor;
      border-right: 2px solid currentColor;
      user-select: none;
      transform: rotate(135deg);
      transform-origin: center center;
      cursor: pointer;
      transition: rotate 0.2s $defaultEasing, transform 0.2s $defaultEasing;
    }
  }

  &__no-button {
    display: flex;
    align-items: center;
    min-height: 5rem;
    padding: 1rem 0;
    padding-right: 4rem;
  }
}

/* toggle*/
.head-item {
  &__toggle {
    display: none;
    // position: absolute;

    &.--open {
      display: block;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    padding-bottom: 1.5rem;
  }

  &__filter + &__filter {
    margin-top: 1.6rem;
  }

  &__filter-label {
    position: relative;
    display: block;
    cursor: pointer;
    transition: color 0.2s $defaultEasing;

    @include desktop {
      &:hover {
        color: darken($gray, 10%);

        &::after {
          border: 1px solid darken($gray, 10%);
        }
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0.8rem;
      right: 0;
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 1px;
      border: 1px solid $gray;
      transform: translateY(-50%);
      box-sizing: border-box;
      cursor: pointer;
    }
  }

  &__filter-value {
    display: inline-block;
    max-width: 80%;
    user-select: none;
  }

  &__filter-checkbox {
    @include button-reset;

    &:checked + .head-item__filter-value {
      &::after {
        content: "";
        position: absolute;
        top: 3px;
        right: -1px;
        display: block;
        width: 8px;
        height: 8px;
        background-color: $green;
        transform: translateX(-4px);
      }

      @media (min-width: 1023px) and (max-width: 1050px) {
        &::after {
          top: 2px;
        }
      }

      @media (min-width: 1439px) {
        &::after {
          top: 4px;
        }
      }

      @media (min-width: 1919px) {
        &::after {
          top: 6px;
        }
      }
    }
  }
}

.head-item {
  &__reset {
    position: relative;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid $gray;
    cursor: pointer;

    @include desktop {
      &:hover {
        color: darken($gray, 10%);

        .head-item__reset-icon {
          &::before,
          &::after {
            background-color: darken($gray, 10%);
          }
        }
      }
    }
  }

  &__reset-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 1rem;
      bottom: 0;
      right: 6px;
      width: 1px;
      height: 18px;
      display: block;
      background-color: $gray;
      transform-origin: center;
    }

    &::after {
      transform: rotate(45deg);
    }

    &::before {
      transform: rotate(-45deg);
    }
  }
}
</style>
