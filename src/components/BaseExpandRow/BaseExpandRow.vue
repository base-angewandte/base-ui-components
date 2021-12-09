<template>
  <div
    :data-group="groupName !== '' ? groupName : false"
    :class="['base-expand-row', {'expanded': isVisible}]">
    <div
      :id="'base-expand-row-' + id"
      class="base-expand-row-header"
      :aria-expanded="isVisible ? 'true' : 'false'">
      <base-checkmark
        v-if="isSelectable"
        :key="id + 'checkmark'"
        title="checkbox"
        mark-style="checkbox"
        class="base-expand-row-checkbox"
        :checked="isSelected"
        @clicked="checkboxClicked" />
      <button
        type="button"
        :class="[ 'base-expand-row-button', {'selectable': isSelectable}]"
        @click="clicked">
        <div
          v-if="icon || hasIconSlot"
          class="base-expand-row-icon">
          <!-- @slot slot to inject icon/image left side before the title  -->
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
          name="drop-down"
          title="open"
          class="base-expand-row-collapse-icon" />
      </button>
    </div>
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
import BaseIcon from '../BaseIcon/BaseIcon';

export default {
  name: 'BaseExpandRow',
  components: {
    BaseIcon,
  },
  props: {
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
     * group components by name, only one component is expanded at once
     * Todo: implement logic
     */
    groupName: {
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
     * Lets you specify if the row should be in expanded state by default.
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
      isVisible: this.isExpanded,
      isSelectedInternal: false,
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
    this.isSelectedInternal = this.isSelected;
  },
  methods: {
    clicked() {
      this.isVisible = !this.isVisible;
    },
    checkboxClicked() {
      this.isSelectedInternal = !this.isSelectedInternal;
      /**
       * Event triggered when the *check box* is clicked; this is applicable
       * only if the row is selectable and thus has a check box.
       * The payload indicates the selected state (true or false).
       *
       * @event selected
       * @param {Boolean}
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
            color: $font-color-second;
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
          min-width: $icon-small;
          color: $font-color;
        }

        &.selectable {
          // if row is selectable, we must account for the width of the check box.
          // therefore, decrease 100% width by the width of .base-expand-row-checkbox
          width: calc(100% - #{$spacing} * 3);
          padding: 0 $spacing 0 0;
        }
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
