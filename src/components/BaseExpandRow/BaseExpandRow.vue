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
     * set the background of collapsed expand-row-body
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
  created() {
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

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-expand-row {
    margin-bottom: $spacing;
    background-color: $background-color;

    .base-expand-row-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: $row-height-large;
      width: 100%;
      padding: 0 $spacing;
      background: $box-color;
      box-shadow: $box-shadow-reg;
      transition: $box-transition;

      .base-expand-row-title {
        flex: auto;
        margin-right: $spacing;
        color: $font-color-second;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
      }

      .base-expand-row-icon {
        height: $icon-large;
        width: $icon-large;
        margin-right: $spacing;
        color: currentColor;
        flex-shrink: 0;

        svg,
        img {
          width: 100%;
        }
      }

      .base-expand-row-collapse-icon {
        transition: $drop-down-arrow-animation;
        height: $icon-small;
        width: $icon-small;
        min-width: $icon-small;
        color: $font-color;
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
        margin-top: $border-width;
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
