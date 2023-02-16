<template>
  <div class="table-row">
    <LayoutRow class="table-row__row table-row__row--header">
      <LayoutCol :sm="12" :md="12">
        <a :href="item.companyUrl" class="table-row__link" target="_blank">
          <span class="company-name">
            {{ item.company }}
          </span>
        </a>
      </LayoutCol>
    </LayoutRow>

    <LayoutRow class="table-row__row">
      <LayoutCol :sm="3" :md="2" class="table-row__column">
        <span class="table-row__emoji-box">
          {{ item.logoEmoji }}
        </span>
      </LayoutCol>
      <LayoutCol :sm="9" :md="4">
        <ProjectDescription
          :text="item.description"
          :links="item.bio.list"
          :links-label="item.bio.label"
        />
        <div class="table-row__details">
          <span> {{ item.round }},</span>
          <span> {{ item.location }},</span>
          <span> {{ item.sector }}</span>
        </div>
      </LayoutCol>
    </LayoutRow>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import ProjectDescription from "./components/ProjectDescription.vue";
import LayoutCol from "@/libs/ui/components/Col.vue";
import LayoutRow from "@/libs/ui/components/Row.vue";
import type { Project } from "@/pages/Table/bl/entities";

export default defineComponent({
  name: "TableRowMobile",
  components: {
    ProjectDescription,
    LayoutRow,
    LayoutCol,
  },
  props: {
    item: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.table-row {
  font-size: 1.5rem;
  line-height: 2.2rem;

  @include tablet {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }

  &__row {
    padding-top: 2rem;
    padding-bottom: 3rem;

    &--header {
      border-bottom: 1px solid $gray01;
    }
  }

  &__column {
    display: flex;
    justify-content: flex-end;
  }

  &__link {
    display: block;
    padding-top: 1.8rem;
    padding-bottom: 1rem;
    color: $green;
  }

  &__details {
    margin-top: 1rem;
    color: $gray;
  }
}
</style>
