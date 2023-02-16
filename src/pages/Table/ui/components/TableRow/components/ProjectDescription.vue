<template>
  <div class="description">
    <p v-html="text" class="description__text" />
    <div v-if="links && links.length > 0" class="description__body">
      <div class="description__label">
        <ArrowRightSvg class="description__label-arrow" />

        <span v-if="linksLabel"> {{ linksLabel }}</span>
      </div>

      <div v-for="(link, index) in links" :key="index">
        <a
          :href="link.url"
          rel="noreferrer noopener"
          target="_blank"
          class="description__link"
          :class="{ '--hovered': isRoundLinkActive }"
          @mouseenter="setRoundLinkActive"
          @mouseleave="resetRoundLinkActive"
          @click="resetRoundLinkOnClick"
        >
          <span class="visually_hidden">link to {{ link.type }}</span>
          <MediumSvg class="description__link-medium" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import MediumSvg from "../../../../../../libs/ui/components/SvgComponents/MeduimSvg.vue";
import ArrowRightSvg from "../../../../../../libs/ui/components/SvgComponents/ArrowRightSvg.vue";
import useMqStore from "@/libs/scripts/mediaQuery/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ProjectDescription",
  components: {
    MediumSvg,
    ArrowRightSvg,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    linksLabel: {
      type: String,
      default: "",
    },
    links: {
      type: Array as PropType<
        ReadonlyArray<{ readonly url: string; readonly type: string }>
      >,
      default: () => [],
    },
  },
  setup() {
    const mqStore = useMqStore();
    const { isDesktopMq } = storeToRefs(mqStore);

    const isRoundLinkActive = ref(false);

    const setRoundLinkActive = (): void => {
      isRoundLinkActive.value = true;
    };
    const resetRoundLinkActive = (): void => {
      isRoundLinkActive.value = false;
    };

    const resetRoundLinkOnClick = (): void => {
      if (isDesktopMq.value) {
        resetRoundLinkActive();
      } else {
        setRoundLinkActive();

        setTimeout(() => {
          resetRoundLinkActive();
        }, 500);
      }
    };

    return {
      setRoundLinkActive,
      resetRoundLinkActive,
      resetRoundLinkOnClick,
      isRoundLinkActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.description {
  &__body {
    display: flex;
    color: $gray02;

    @include mobile_tablet {
      padding-bottom: 1rem;
      border-bottom: 1px solid $gray01;
    }
  }

  &__text + &__body {
    margin-top: 0.5rem;

    @include mobile_tablet {
      margin-top: 1rem;
    }
  }

  &__label {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: $gray02;

    @include tablet {
      font-size: 1.5rem;
      line-height: 2.2rem;
    }
  }

  &__label-arrow {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 1rem;

    &:deep(svg) {
      color: currentColor;
    }
  }

  &__link {
    color: $gray;
    transition: color 0.2s $defaultEasing;

    &:deep(svg) {
      color: currentColor;
    }

    &.--hovered {
      color: $green;
    }
  }

  &__link-medium {
    width: 3rem;
    height: 3rem;
  }
}
</style>
