<template>
  <div
    :data-group="groupName !== '' ? groupName : false"
    :class="['base-expand-row', {'expanded': isVisible}]">
    <button
      :id="'base-expand-row-' + id"
      :aria-expanded="isVisible ? 'true' : 'false'"
      type="button"
      class="base-expand-row-header"
      @click="clicked">
      <div
        v-if="icon || hasIconSlot"
        class="base-expand-row-icon">
        <!-- @slot slot to inject icon/image left side before label  -->
        <slot name="icon">
          <SvgIcon
            :name="icon"
            title="open" />
        </slot>
      </div>

      <div class="base-expand-row-title base-text-fade-out">
        {{ label }}
      </div>

      <SvgIcon
        name="drop-down"
        title="open"
        class="base-expand-row-collapse-icon" />
    </button>
    <div
      role="region"
      :aria-labelledby="'base-expand-row-' + id"
      :aria-hidden="!isVisible ? 'true' : 'false'"
      :class="['base-expand-row-body', {'base-expand-row-body-bg': bodyHasBackground}]">
      <!-- @slot slot for expanded content -->
      <slot />
    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import '../../assets/icons/index';

export default {
  name: 'BaseExpandRow',
  components: {
    SvgIcon,
  },
  props: {
    /**
     * label for the expand row
     */
    label: {
      type: String,
      default: 'Label',
    },
    /**
     * group components by name, only one component is expanded at once
     * Todo: implement logic
     */
    groupName: {
      type: String,
      default: '',
    },
    /**
     * specify an icon that is displayed before the label
     * available values: see ***
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * set the background color of collapsed expand-row-body
     */
    bodyHasBackground: {
      type: Boolean,
      default: true,
    },
    /**
     * open expand-row-body on load
     */
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: null,
      isVisible: this.isExpanded,
    };
  },
  computed: {
    hasIconSlot() {
      return !!this.$slots.icon;
    },
  },
  mounted() {
    // eslint-disable-next-line
    this.id = this._uid;
  },
  methods: {
    /**
     * event emitted when clicked on header
     *
     * @event clicked
     */
    clicked() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-expand-row {
    margin-bottom: $spacing;

    .base-expand-row-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 3em;
      width: 100%;
      padding: 0 $spacing;
      background: $box-color;
      box-shadow: $box-shadow-reg;
      transition: $box-transition;
      color: $font-color-second;

      .base-expand-row-title {
        flex: auto;
        margin-right: $spacing;
        color: $font-color-second;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
      }

      .base-expand-row-icon {
        display: flex;
        align-items: center;
        height: 24px;
        width: 24px;
        margin-right: $spacing;
        color: currentColor;

        svg,
        img {
          width: 100%;
        }
      }

      .base-expand-row-collapse-icon {
        color: currentColor;
        width: 12px;
        min-width: 12px;
        height: 12px;
        transition: all 250ms ease-in-out;
      }

      &:focus,
      &:hover {
        cursor: pointer;
        box-shadow: $box-shadow-hov;

        .base-expand-row-collapse-icon {
          color: $app-color;
        }
      }

      &:focus {
        outline: none;
      }
    }

    .base-expand-row-body {
      padding: $spacing;

      &.base-expand-row-body-bg {
        margin-top: 2px;
        background-color: $box-color;
      }
    }

    &.expanded {

      .base-expand-row-title {
        color: $font-color;
        font-weight: bold;
      }

      .base-expand-row-body {
        display: block;
      }

      .base-expand-row-collapse-icon {
        transform: rotate(180deg);
      }
    }

    .base-expand-row-body {
      display: none;
    }
  }
</style>
