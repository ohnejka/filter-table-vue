<template>
  <div
    class="row-box"
    :class="{ 'is-hovered': isActive }"
    @mouseenter="setActive"
    @mouseleave="resetActive"
  >
    <f-row>
      <!-- company -->
      <f-col :lg="1" class="col-item">
        <a :href="item.companyUrl" class="link-box" target="_blank">
          <span v-if="item.logo" class="logo-box">
            <f-picture
              class="logo"
              :source="item.logo.url"
              :content-type="item.logo.contentType"
              :alt="item.company"
              :sizes="sizes"
              :is-initial-size="false"
              :is-cover="false"
              :quality="90"
            />
          </span>
          <span class="company-name">{{ item.company }}</span>
        </a>
      </f-col>
      <!-- round -->
      <f-col :lg="1" class="col-item">
        <span> {{ item.round }}</span>
      </f-col>
      <!-- geo -->
      <f-col :lg="1" class="col-item">
        <span> {{ item.location }}</span>
      </f-col>
      <!-- sector -->
      <f-col :lg="1" class="col-item">
        <span> {{ item.sector }}</span>
      </f-col>
      <!--bio  -->
      <f-col :lg="2" class="col-item">
        <PortfolioDescription
          :text="item.description"
          :links="item.bioLinksList"
          :links-label="item.bioLinksLabel"
        />
      </f-col>
    </f-row>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue, { PropType } from "vue";
import { Project } from "~/contracts/Project";
import PortfolioDescription from "~/components/PortfolioTable/PortfolioDescription.vue";

export default Vue.extend({
  name: "PortfolioRow",
  components: { PortfolioDescription },
  props: {
    item: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  // data() {
  //   return {
  //     isActive: false,
  //     isHovered: false,
  //     sizes: {
  //       sm: [600, 600],
  //       md: [600, 600],
  //       lg: [600, 600],
  //     },
  //   }
  // },
  // computed: {
  //   ...mapGetters({
  //     isDesktop: 'mediaQuery/isDesktopMq',
  //   }),
  // },
  // methods: {
  //   setActive() {
  //     this.isHovered = true
  //     setTimeout(() => {
  //       if (this.isHovered) {
  //         this.isActive = true
  //       }
  //     }, 100)
  //   },
  //   resetActive() {
  //     this.isHovered = false
  //     this.isActive = false
  //   },
  // },
});
</script>

<style lang="scss" scoped>
.row-box {
  border-bottom: 1px solid rgba(#707070, 0.09);

  @include desktop {
    &.is-hovered {
      .logo-box {
        opacity: 1;
      }

      .company-name {
        opacity: 0;
      }
    }
  }
}

.col-item {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.link-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.logo-box {
  position: absolute;
  display: block;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 75%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.logo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.company-name {
  transition: opacity 0.2s ease;
  color: $green;
  opacity: 1;
}
</style>
