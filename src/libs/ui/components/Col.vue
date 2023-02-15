<template>
  <div class="col" :class="colModifer">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

function colValidator(value: number | string) {
  return typeof value === "number" ? true : ["hide", "auto"].includes(value);
}

export default defineComponent({
  name: "LayoutCol",
  props: {
    col: {
      type: [Number, String],
      default: "auto",
      validator: colValidator,
    },
    lg: {
      type: [Number, String],
      default: null,
      validator: colValidator,
    },
    md: {
      type: [Number, String],
      default: null,
      validator: colValidator,
    },
    sm: {
      type: [Number, String],
      default: null,
      validator: colValidator,
    },
    isNoGrow: {
      type: Boolean,
      default: false,
    },
    aligment: {
      type: String,
      default: "start",
      validator(value: string) {
        return ["start", "end", "center", "baseline", "stretch"].includes(
          value
        );
      },
    },
  },
  computed: {
    colModifer() {
      let aligment = "";
      switch (this.aligment) {
        case "end":
          aligment = "as-fe ";
          break;
        case "center":
          aligment = "as-c ";
          break;
        case "baseline":
          aligment = "as-b ";
          break;
        case "stretch":
          aligment = "as-s ";
          break;
        case "start":
        default:
          aligment = "";
      }
      const colsLg = this.lg ? `col-lg-${this.lg} ` : "";
      const colsMd = this.md ? `col-md-${this.md} ` : "";
      const colsSm = this.sm ? `col-sm-${this.sm} ` : "";
      const cols = this.lg && this.md && this.sm ? "" : `col-${this.col} `;

      const isNoGrow = this.isNoGrow ? "no-grow " : "";
      return `${cols}${colsLg}${colsMd}${colsSm}${aligment}${isNoGrow}`;
    },
  },
});
</script>

<style lang="scss" scoped>
$desktop_large: $DESKTOP_LARGE;
$containerWidthDesktop: $CONTAINER_WIDTH_DESKTOP + calc($COL_GAP_DESKTOP / 2);
$colCountDesktop: $COL_COUNT_DESKTOP;
$containerWidthTablet: $CONTAINER_WIDTH_TABLET;
$colCountTablet: $COL_COUNT_TABLE;
$containerWidthMobile: $CONTAINER_WIDTH_MOBILE;
$colCountMobile: $COL_COUNT_MOBILE;
$colGapDesktop: calc($COL_GAP_DESKTOP / 2);
$colGapTablet: calc($COL_GAP_TABLET / 2);
$colGapMobile: calc($COL_GAP_MOBILE / 2);

.col {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;

  @for $colNum from 1 through $colCountDesktop {
    &.col-#{$colNum} {
      position: relative;
      flex: 0 0 floor(calc($colNum / $colCountDesktop) * 100%);
      min-height: 1px;
      max-width: floor(calc($colNum / $colCountDesktop) * 100%);
    }
  }

  &.col-auto {
    flex: 1 1 calc((100% / $colCountDesktop));
    max-width: none;
    width: auto;
  }

  &.no-grow {
    flex-grow: 0 !important;
  }

  &.as-c {
    align-self: center;
  }

  &.as-s {
    align-self: stretch;
  }

  &.as-b {
    align-self: baseline;
  }

  &.as-fs {
    align-self: flex-start;
  }

  &.as-fe {
    align-self: flex-end;
  }

  .no-gap & {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .is-debug {
    .row.no-gap & {
      box-shadow: inset 0 0 0 1px rgba(96, 125, 139, 0.4) !important;
    }
  }
}

@include desktop {
  .is-debug .col {
    box-shadow: inset 0 0 0 1px rgba(96, 125, 139, 0.4),
      inset $colGapDesktop 0 0 0 rgba(128, 203, 196, 0.2),
      inset (-1 * $colGapDesktop) 0 0 0 rgba(128, 203, 196, 0.2);
  }

  .col {
    padding-right: $colGapDesktop;
    padding-left: $colGapDesktop;

    @for $colNum from 1 through $colCountDesktop {
      &.col-lg-#{$colNum} {
        flex: 0 0 floor(calc($colNum / $colCountDesktop) * 100%);
        max-width: floor(calc($colNum / $colCountDesktop) * 100%);
      }
    }

    &-lg-hide {
      display: none;
    }
  }
}

@include tablet {
  .is-debug .col {
    box-shadow: inset 0 0 0 1px rgba(96, 125, 139, 0.4),
      inset $colGapTablet 0 0 0 rgba(128, 203, 196, 0.2),
      inset (-1 * $colGapTablet) 0 0 0 rgba(128, 203, 196, 0.2);
  }

  .col {
    padding-right: $colGapTablet;
    padding-left: $colGapTablet;

    @for $colNum from 1 through $colCountTablet {
      &.col-md-#{$colNum} {
        flex: 0 0 floor(calc($colNum / $colCountTablet) * 100%);
        max-width: floor(calc($colNum / $colCountTablet) * 100%);
      }
    }

    &-md-hide {
      display: none;
    }
  }
}

@include mobile {
  .is-debug .col {
    box-shadow: inset 0 0 0 1px rgba(96, 125, 139, 0.4),
      inset $colGapMobile 0 0 0 rgba(128, 203, 196, 0.2),
      inset (-1 * $colGapMobile) 0 0 0 rgba(128, 203, 196, 0.2);
  }

  .col {
    padding-right: $colGapMobile;
    padding-left: $colGapMobile;

    @for $colNum from 1 through $colCountMobile {
      &.col-sm-#{$colNum} {
        flex: 0 0 floor(calc($colNum / $colCountMobile) * 100%);
        max-width: floor(calc($colNum / $colCountMobile) * 100%);
      }
    }

    &-sm-hide {
      display: none;
    }
  }
}
</style>
