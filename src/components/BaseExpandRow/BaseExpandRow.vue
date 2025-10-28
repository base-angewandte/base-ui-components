<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseCheckmark from '@/components/BaseCheckmark/BaseCheckmark.vue';
import { computed, ref, useSlots } from 'vue';
import { useId } from '@/composables/useId.js';
import { useI18n } from '@/composables/useI18n.js';
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
    /**
     * provide assistive text for screen readers
     * **label**: if `title` or `subtitle` is empty this text is read
     */
    assistiveText: {
      type: Object,
      default: () => ({
        label: 'Expandable element',
      }),
      validator: val => Object.keys(val).every(key => ['label'].includes(key)),
    },
  },
  emits: ['selected', 'expanded'],
  setup(props) {
    /** INTERNAL ID */
    const internalId = useId();
    /** INTERNATIONALIZATION */
    const { getI18nTerm } = useI18n();
    /** SLOTS */
    // access slots to check if it is filled later
    const slots = useSlots();
    /**
     * check if slot `default` has content
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const { slotHasContent: hasDefaultSlot } = useHasSlotContent(slots.default);
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
    const isExpandedInternal = ref(props.isExpanded && hasDefaultSlot.value);
    /**
     * check if component is expandable
     * @type {ComputedRef<boolean>}
     */
    const isExpandable = computed(() => props.expandable && hasDefaultSlot.value);

    return {
      internalId,
      isExpandable,
      isExpandedInternal,
      isSelectedInternal,
      getI18nTerm,
      hasDefaultSlot,
      hasIconSlot,
    }
  },
  watch: {
    /**
     * watch for expandable state changes from outside
     * @param {boolean} val - the prop value set from outside
     */
    expandable(val) {
      // when component is not expandable, collapse the content area
      if (!val) this.isExpandedInternal = false;
    },
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

<template>
  <div
    :class="['base-expand-row',
             { 'base-expand-row--expandable': isExpandable },
             { 'base-expand-row--expanded': isExpandedInternal }]">
    <div class="base-expand-row__header">
      <BaseCheckmark
        v-if="isSelectable"
        :key="internalId + 'checkmark'"
        mark-style="checkbox"
        :model-value="isSelected"
        class="base-expand-row__header__checkbox"
        @update:model-value="checkboxClicked" />
      <component
        :is="isExpandable ? 'button' : 'div'"
        :id="'base-expand-row-' + internalId"
        :aria-controls="isExpandable ? 'base-expand-row-panel-' + internalId : undefined"
        :aria-expanded="isExpandable ? isExpandedInternal : undefined"
        :type="isExpandable ? 'button' : undefined"
        :class="['base-expand-row__header__button', { selectable: isSelectable }]"
        @click="isExpandable ? clicked() : null">
        <div
          v-if="icon || hasIconSlot"
          class="base-expand-row__header__icon">
          <!-- @slot slot to inject icon/image left side before label -->
          <slot name="icon">
            <BaseIcon
              :name="icon" />
          </slot>
        </div>

        <div
          class="base-expand-row__header__wrapper">
          <div
            v-if="!title && !subtitle"
            class="hide">
            {{ getI18nTerm(assistiveText.label) }}
          </div>
          <div
            v-if="title"
            class="base-expand-row__header__title base-text-fade-out">
            {{ title }}
          </div>
          <div
            v-if="subtitle"
            class="base-expand-row__header__subtitle base-text-fade-out">
            {{ subtitle }}
          </div>
        </div>
        <BaseIcon
          v-if="isExpandable"
          name="drop-down"
          class="base-expand-row__header__collapse-icon" />
      </component>
    </div>
    <div
      :id="'base-expand-row-panel-' + internalId"
      :aria-labelledby="'base-expand-row-' + internalId"
      :aria-hidden="!isExpandedInternal ? 'true' : 'false'"
      :role="'region'"
      :class="['base-expand-row__body', { 'base-expand-row__body--bg': bodyHasBackground }]">
      <!-- @slot slot for expanded content -->
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

  .base-expand-row {
    margin-bottom: $border-width;
    background-color: $background-color;

    .base-expand-row__header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: $box-color;
      box-shadow: $box-shadow-reg;
      transition: $box-transition;

      .base-expand-row__header__checkbox {
        padding: 0 $spacing;
        width: $spacing * 3;
      }

      .base-expand-row__header__button {
        height: $row-height-large;
        padding: 0 $spacing;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .base-expand-row__header__wrapper {
          flex: auto;
          margin-right: $spacing;
          overflow: hidden;
        }

        .base-expand-row__header__title {
          color: $font-color;
          text-align: left;
          white-space: nowrap;
        }

        .base-expand-row__header__subtitle {
          font-size: $font-size-small;
          color: $font-color-second;
          text-align: left;
          white-space: nowrap;
        }

        .base-expand-row__header__icon {
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

        .base-expand-row__header__collapse-icon {
          transition: $drop-down-arrow-animation;
          height: $icon-small;
          width: $icon-small;
          min-width: $icon-small;
          color: $font-color;
        }

        &.selectable {
          // if row is selectable, we must account for the width of the check box.
          // therefore, decrease 100% width by the width of .base-expand-row__header__checkbox
          width: calc(100% - #{$spacing} * 3);
          padding: 0 $spacing 0 0;
        }
      }

      &:focus {
        outline: none;
      }
    }

    .base-expand-row__body {
      padding: $spacing;

      &.base-expand-row__body--bg {
        margin-top: $border-width;
        background-color: $box-color;
      }
    }

    &.base-expand-row--expandable {
      .base-expand-row__header__button {

        &:focus,
        &:hover {
          cursor: pointer;

          .base-expand-row__header__collapse-icon {
            color: $app-color;
          }
        }
      }
    }

    &.base-expand-row--expanded {
      .base-expand-row__header {
        .base-expand-row__header__button {
          .base-expand-row__header__wrapper {
            .base-expand-row__header__title {
              color: $font-color;
              font-weight: bold;
            }
          }
        }
      }

      .base-expand-row__body {
        display: block;
      }

      .base-expand-row__header__collapse-icon {
        transform: rotate(180deg);
      }
    }

    .base-expand-row__body {
      display: none;
    }
  }
</style>
