<template>
  <div
    class="table-row"
    :class="{ '--hovered': isActive }"
    @mouseenter="setActive"
    @mouseleave="resetActive"
  >
    <LayoutRow>
      <!-- company -->
      <LayoutCol :lg="1" class="table-row__column">
        <a
          :href="item.companyUrl"
          class="table-row__company-link"
          target="_blank"
        >
          <span class="table-row__emoji-box">
            {{ item.logoEmoji }}
          </span>
          <span class="table-row__company-name">{{ item.company }}</span>
        </a>
      </LayoutCol>

      <!-- round -->
      <LayoutCol :lg="1" class="table-row__column">
        <span> {{ item.round }}</span>
      </LayoutCol>
      <!-- geo -->
      <LayoutCol :lg="1" class="table-row__column">
        <span> {{ item.location }}</span>
      </LayoutCol>
      <!-- sector -->
      <LayoutCol :lg="1" class="table-row__column">
        <span> {{ item.sector }}</span>
      </LayoutCol>
      <!-- bio -->
      <LayoutCol :lg="2" class="table-row__column">
        <ProjectDescription
          :text="item.description"
          :links="item.bio.list"
          :links-label="item.bio.label"
        />
      </LayoutCol>
    </LayoutRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import LayoutCol from "@/libs/ui/components/Col.vue";
import LayoutRow from "@/libs/ui/components/Row.vue";
import type { Project } from "../../../bl/entities";
import ProjectDescription from "./components/ProjectDescription.vue";

export default defineComponent({
  name: "TableRow",
  components: {
    LayoutRow,
    LayoutCol,
    ProjectDescription,
  },
  props: {
    item: {
      type: Object as PropType<Project>,
      required: true,
    },
  },

  setup() {
    const isActive = ref(false);
    const isHovered = ref(false);

    const setActive = (): void => {
      isHovered.value = true;
      setTimeout(() => {
        if (isHovered.value) {
          isActive.value = true;
        }
      }, 100);
    };
    const resetActive = (): void => {
      isHovered.value = false;
      isActive.value = false;
    };

    return {
      isActive,
      setActive,
      resetActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-row {
  border-bottom: 1px solid $grayLight;

  @include desktop {
    &.--hovered {
      .table-row__company-name {
        color: pink;
      }

      .table-row__emoji-box {
        opacity: 1;
      }
    }
  }

  &__company-name {
    color: $green;
    transition: color 0.2s $defaultEasing;
  }

  &__column {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  &__company-link {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &__emoji-box {
    position: absolute;
    top: 4rem;
    opacity: 0;
    transition: opacity 0.2s $defaultEasing;
  }
}
</style>
