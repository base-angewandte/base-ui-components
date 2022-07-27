<template>
  <div
    :class="['base-expand-row',
             { 'base-expand-row--expandable': expandable },
             { 'base-expand-row--expanded': isExpandedInternal }]">
    <div
      :id="'base-expand-row-' + id"
      class="base-expand-row-header"
      :aria-expanded="expandable ? isExpandedInternal.toString() : null">
      <base-checkmark
        v-if="isSelectable"
        :key="id + 'checkmark'"
        title="checkbox"
        mark-style="checkbox"
        class="base-expand-row-checkbox"
        :checked="isSelected"
        @clicked="checkboxClicked" />
      <component
        :is="expandable ? 'button' : 'div'"
        :type="expandable ? 'button' : null"
        :class="[ 'base-expand-row-button', {'selectable': isSelectable}]"
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

        <div class="base-expand-row-title-subtitle-wrapper">
          <div class="base-expand-row-title base-text-fade-out">
            {{ title }}
          </div>
          <div
            v-if="subtitle"
            class="base-expand-row-subtitle base-text-fade-out">
            {{ subtitle }}
          </div>
        </div>
        <base-icon
          v-if="expandable"
          name="drop-down"
          title="open"
          class="base-expand-row-collapse-icon" />
      </component>
    </div>
    <div
      role="region"
      :aria-labelledby="'base-expand-row-' + id"
      :aria-hidden="!isExpandedInternal ? 'true' : 'false'"
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
     * Title of the row.
     */
    title: {
      type: String,
      default: 'Title',
    },
    /**
     * Optional subtitle of the row.
     */
    subtitle: {
      type: String,
      default: '',
    },
    /**
     * Lets you optionally specify an icon that is displayed before the title.
     * For valid values, see [BaseIcon](#baseicon).
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
     * Set this to **true** if the row should be in expanded state.
     */
    isExpanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Lets you specify if the row is selectable. If **true**, a check box appears
     * on the left side. The *isSelected* prop determines whether the check box is
     * actually selected or not.
     */
    isSelectable: {
      type: Boolean,
      default: false,
    },
    /**
     * Lets you specify if the row is currently selected.
     */
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: null,
      isExpandedInternal: false,
      isSelectedInternal: false,
    };
  },
  computed: {
    hasIconSlot() {
      return !!this.$slots.icon;
    },
  },
  watch: {
    /**
     * watch for expanded/collapsed state changes from outside
     * @param {boolean} val - the prop value set from outside
     */
    isExpanded(val) {
      this.isExpandedInternal = val;
    },
    /**
     * watch for select state changes from outside
     * @param {boolean} val - the prop value set from outside
     */
    isSelected(val) {
      this.isSelectedInternal = val;
    },
  },
  created() {
    // eslint-disable-next-line
    this.id = this._uid;
    this.isSelectedInternal = this.isSelected;
    this.isExpandedInternal = this.isExpanded;
  },
  methods: {
    clicked() {
      this.isExpandedInternal = !this.isExpandedInternal;
      /**
       * Event triggered when the row is expanded or collapsed.
       * The payload value `true` indicates expanded state, `false` indicates collapsed state.
       *
       * @event expanded
       * @type {Boolean}
       */
      this.$emit('expanded', this.isExpandedInternal);
    },
    checkboxClicked() {
      this.isSelectedInternal = !this.isSelectedInternal;
      /**
       * Event triggered when the *check box* is clicked; this is applicable
       * only if the row is selectable and thus has a check box.
       * The payload indicates the selected state (true or false).
       *
       * @event selected
       * @type {Boolean}
       */
      this.$emit('selected', this.isSelectedInternal);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-expand-row {
    margin-bottom: $border-width;
    background-color: $background-color;

    .base-expand-row-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: $box-color;
      box-shadow: $box-shadow-reg;
      transition: $box-transition;

      .base-expand-row-checkbox {
        padding: 0 $spacing;
        width: $spacing * 3;
      }

      .base-expand-row-button {
        height: $row-height-large;
        padding: 0 $spacing;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .base-expand-row-title-subtitle-wrapper {
          flex: auto;
          margin-right: $spacing;
          overflow: hidden;

          .base-expand-row-title {
            color: $font-color;
            text-align: left;
            white-space: nowrap;
          }

          .base-expand-row-subtitle {
            font-size: $font-size-small;
            color: $font-color-second;
            text-align: left;
            white-space: nowrap;
          }
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
          color: $font-color;
        }

        &.selectable {
          // if row is selectable, we must account for the width of the check box.
          // therefore, decrease 100% width by the width of .base-expand-row-checkbox
          width: calc(100% - #{$spacing} * 3);
          padding: 0 $spacing 0 0;
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

    &.base-expand-row--expandable {

      .base-expand-row-button {

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

      .base-expand-row-header {
        .base-expand-row-button {
          .base-expand-row-title-subtitle-wrapper {
            .base-expand-row-title {
              color: $font-color;
              font-weight: bold;
            }
          }
        }
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
