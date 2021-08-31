<template>
  <div
    :class="['base-expand-row',
             { 'base-expand-row--expandable': expandable },
             { 'base-expand-row--expanded': expanded }]">
    <component
      :is="expandable ? 'button' : 'div'"
      :aria-expanded="expandable ? expanded.toString() : null"
      :type="expandable ? 'button' : null"
      class="base-expand-row-header"
      @click="expandable ? clicked() : null">
      <div
        v-if="icon || hasIconSlot"
        class="base-expand-row-icon">
        <!-- @slot slot to inject icon/image left side before label  -->
        <slot name="icon">
          <base-icon
            :name="icon"
            title="open" />
        </slot>
      </div>

      <div class="base-expand-row-title base-text-fade-out">
        {{ label }}
      </div>

      <base-icon
        v-if="expandable"
        name="drop-down"
        title="open"
        class="base-expand-row-collapse-icon" />
    </component>
    <div
      role="region"
      :aria-labelledby="'base-expand-row-' + id"
      :aria-hidden="!expanded ? 'true' : 'false'"
      :class="['base-expand-row-body', {'base-expand-row-body-bg': bodyHasBackground}]">
      <!-- @slot slot for expanded content -->
      <slot />
    </div>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';

export default {
  name: 'BaseExpandRow',
  components: {
    BaseIcon,
  },
  props: {
    /**
     * specify if box is expandable
     */
    expandable: {
      type: Boolean,
      default: true,
    },
    /**
     * label for the expand row
     */
    label: {
      type: String,
      default: 'Label',
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
      expanded: this.isExpanded,
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
      this.expanded = !this.expanded;
    },
  },
};
</script>

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

    &.base-expand-row--expandable {

      .base-expand-row-header {

        &:focus,
        &:hover {
          cursor: pointer;

          .base-expand-row-collapse-icon {
            color: $app-color;
          }
        }
      }
    }

    &.base-expand-row--expanded {

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
