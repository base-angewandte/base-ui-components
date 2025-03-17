<template>
  <div
    :class="['base-expand-row',
             { 'base-expand-row--expandable': isExpandable },
             { 'base-expand-row--expanded': isExpandedInternal }]">
    <div
      :id="'base-expand-row-' + internalId"
      class="base-expand-row-header"
      :aria-expanded="isExpandable ? isExpandedInternal.toString() : null">
      <BaseCheckmark
        v-if="isSelectable"
        :key="internalId + 'checkmark'"
        title="checkbox"
        mark-style="checkbox"
        class="base-expand-row-checkbox"
        :model-value="isSelected"
        @update:model-value="checkboxClicked" />
      <component
        :is="isExpandable ? 'button' : 'div'"
        :type="isExpandable ? 'button' : null"
        :class="['base-expand-row-button', { selectable: isSelectable }]"
        @click="isExpandable ? clicked() : null">
        <div
          v-if="icon || hasIconSlot"
          class="base-expand-row-icon">
          <!-- @slot slot to inject icon/image left side before label -->
          <slot name="icon">
            <BaseIcon
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
        <BaseIcon
          v-if="isExpandable"
          name="drop-down"
          title="open"
          class="base-expand-row-collapse-icon" />
      </component>
    </div>
    <div
      role="region"
      :aria-labelledby="'base-expand-row-' + internalId"
      :aria-hidden="!isExpandedInternal ? 'true' : 'false'"
      :class="['base-expand-row-body', { 'base-expand-row-body-bg': bodyHasBackground }]">
      <!-- @slot slot for expanded content -->
      <slot />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseCheckmark from '@/components/BaseCheckmark/BaseCheckmark.vue';
import { computed, ref, useSlots } from 'vue';
import { useId } from '@/composables/useId.js';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';

export default {
  name: 'BaseExpandRow',
  components: {
    BaseCheckmark,
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
      default: '',
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
     * For valid values, see [BaseIcon](BaseIcon).
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
     * Set this to `true` if the row should be in expanded state.
     */
    isExpanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Lets you specify if the row is selectable. If `true`, a check box appears
     * on the left side. The `isSelected` prop determines whether the check box is
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
  emits: ['selected', 'expanded'],
  setup(props) {
    /** INTERNAL ID */
    const internalId = useId();
    /** SLOTS */
    // access slots to check if it is filled later
    const slots = useSlots();
    /**
     * check if slot `icon` has content
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const { slotHasContent: hasIconSlot } = useHasSlotContent(slots.icon);
    /** INTERNALS */
    /**
     * check if component is marked as selected
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const isSelectedInternal = ref(props.isSelected);
    /**
     * check if component is expanded
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const isExpandedInternal = ref(props.isExpanded);
    /**
     * check if component is expandable
     * @type {ComputedRef<boolean>}
     */
    const isExpandable = computed(() => props.expandable);

    return {
      internalId,
      isExpandable,
      isExpandedInternal,
      isSelectedInternal,
      hasIconSlot,
    }
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
  methods: {
    clicked() {
      this.isExpandedInternal = !this.isExpandedInternal;
      /**
       * Event triggered when the row is expanded or collapsed.
       * The payload value `true` indicates expanded state, `false` indicates collapsed state.
       *
       * @event expanded
       * @param {Boolean} - is row expanded
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
       * @param {Boolean} - was row selected
       */
      this.$emit('selected', this.isSelectedInternal);
    },
  },
};
</script>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

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
