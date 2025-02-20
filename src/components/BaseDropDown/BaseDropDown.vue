<template>
  <div
    ref="baseDropDownElement"
    v-click-outside="() => showDropDown = false"
    class="base-drop-down">
    <div
      :class="['base-drop-down-label-wrapper',
               { hide: !getLangLabel(label, true) || !showLabel }]">
      <!-- TODO: check if this is correct HTML - label associated with button? -->
      <!-- eslint-disable-next-line  vuejs-accessibility/label-has-for -->
      <label
        :for="getLangLabel(label) + '-' + idInt"
        class="base-drop-down-label">
        {{ getLangLabel(label, true) }}
      </label>
    </div>
    <button
      :id="getLangLabel(label) + '-' + idInt"
      :aria-expanded="String(showDropDown)"
      :style="{ 'background-color': headerBackgroundColor }"
      :disabled="isDisabled"
      :class="['base-drop-down-head', { 'base-drop-down-head-spacing': withSpacing }]"
      aria-haspopup="listbox"
      type="button"
      @click.prevent="showDropDown = !showDropDown"
      @keydown.enter.esc.down.up.prevent="selectByKey"
      @keydown.tab="selectByKey">
      <div
        ref="dropDownButtonElement"
        :class="['base-drop-down-head-text-wrapper',
                 { 'base-drop-down-head-text-fade-out': showFadeOut }]">
        <span
          ref="headTextElement"
          class="base-drop-down-head-text">
          {{ selectedOptionInt }}
        </span>
      </div>
      <!-- @slot place elements right of header -->
      <slot name="header-right">
        <BaseIcon
          :class="['base-drop-down-icon', { 'base-drop-down-icon-rotated': showDropDown }]"
          name="drop-down" />
      </slot>
    </button>
    <div
      v-if="showDropDown"
      ref="dropDownContainerElement"
      :style="{ [alignDropDown]: 0, 'max-height': maxDropDownHeight }"
      class="base-drop-down-body">
      <!-- @slot create custom drop down body -->
      <slot>
        <ul
          :aria-labelledby="getLangLabel(label) + '-' + idInt"
          role="listbox"
          class="base-drop-down-body-list">
          <li
            v-for="(option, index) in options"
            ref="option"
            :key="option[valueProp]"
            :class="[
              'base-drop-down-option',
              {
                'base-drop-down-option-selected': modelValue
                  && option[valueProp] === modelValue[valueProp],
              },
              { 'base-drop-down-option-key-selected': keySelectedIndex === index }]"
            role="option"
            :aria-selected="(modelValue
              && option[valueProp] === modelValue[valueProp]).toString()"
            tabindex="0"
            @keydown.enter="selectValue(option)"
            @keydown.tab="selectByKey"
            @click="selectValue(option)">
            {{ getLangLabel(option.label, true) }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useI18n } from '@/composables/useI18n.js';
import { computed, ref, toRef, useTemplateRef, watch } from 'vue';
import { useId } from '@/composables/useId.js';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useDebounce } from '@/composables/useDebounce.js';

/**
 * Accessible drop down component
 */
export default {
  name: 'BaseDropDown',
  components: {
    BaseIcon,
  },
  directives: {
    ClickOutside: vOnClickOutside,
  },
  props: {
    /**
     * specify options to choose from
     *   needs to be an array with label and value properties
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * label for the drop down, recommended to define for accessibility
     */
    label: {
      type: String,
      default: 'Drop Down',
    },
    /**
     * placeholder appearing in select when no option was
     * selected
     */
    placeholder: {
      type: String,
      default: 'Select',
    },
    /**
     * the selected value
     */
    modelValue: {
      type: Object,
      default: () => ({ value: '', label: '' }),
    },
    /**
     * define if label should be shown
     */
    showLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * set the background color of drop down head
     */
    headerBackgroundColor: {
      type: String,
      default: 'inherit',
    },
    /**
     * set a language (ISO 639-1)
     */
    language: {
      type: String,
      default: '',
      validator: val => !val || val.length === 2,
    },
    /**
     * set the name of the property that holds the value
     */
    valueProp: {
      type: String,
      default: 'value',
    },
    /**
     * flag to set drop down inactive
     */
    isDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * flag to disable spacing left and right
     * (needed for sidebar drop downs)
     */
    withSpacing: {
      type: Boolean,
      default: true,
    },
    /**
     * align drop down with left or right border
     */
    alignDropDown: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    /**
     * set id if drop down with this label appears more than once
     */
    id: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    /**
     * generally get a reference to the root template element
     * (used for resize observer (fade out calc) and drop down height calc)
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const baseDropDown = useTemplateRef('baseDropDownElement')
    /** ID HANDLING */
    // create a persistent id via composable
    const internalId = useId();
    // use either the prop provided one or the internally created one
    const idInt = computed(() => props.id || internalId);
    /** INTERNATIONALIZATION */
    const { getLangLabel } = useI18n(toRef(props, 'language'));

    /** RESIZE / FADE OUT HANDLING */
    /**
     * template reference to the area available for selected option text display
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const dropDownButton = useTemplateRef('dropDownButtonElement');
    /**
     * template reference to the actual selected option text
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const headText = useTemplateRef('headTextElement');

    /**
     * handle fade out for selected option text showing (if text does not fit)
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const showFadeOut = ref(false);

    /**
     * calc if the selected option text fits the area available for displaying the text
     */
    function setOverflow() {
      const headerWidth = dropDownButton.value ? dropDownButton.value.getBoundingClientRect().width : 0;
      const textWidth = headText.value ? headText.value.getBoundingClientRect().width : 0;
      showFadeOut.value = textWidth > headerWidth;
    }
    const { debounce } = useDebounce();
    useElementObserver({
      type: 'resize',
      target: baseDropDown,
      callback: () => debounce(setOverflow, 50),
    });

    /** DROP DOWN VISIBILITY & HEIGHT */
    /**
     *
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const showDropDown = ref(false);
    /**
     *
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const maxDropDownHeight = ref(0);

    watch(showDropDown, (val) => {
      if (val) {
        // option container element is not rendered yet so we need to calc the
        // top position from the selected option container
        const { y, height } = baseDropDown.value.getBoundingClientRect() || {};
        // make sure the container will not go above space by ceiling the value
        let dropDownTopPosition = Math.ceil(y + height);
        // don't let drop-down size be larger than window (also taking into account
        // virtual keyboard with visualViewport (which should not be present at this
        // point but just in case)
        // and also leave a little space to the window bottom
        let maxHeight = window.visualViewport.height - dropDownTopPosition;
        // TODO make min and max values configurable?
        // if remaining space is more than 120px use the remaining space or
        // max 300px
        if (maxHeight > 120) {
          // set the css property `max-height`
          maxDropDownHeight.value = `${maxHeight > 300 ? 300 : maxHeight - 16}px`;
          // if there is less than 120px remaining scroll the component into view
        } else {
          window.scrollTo(0, baseDropDown.value.offsetTop);
          // and recalc the remaining space
          const { y: newY, height: newHeight } = baseDropDown.value.getBoundingClientRect() || {};
          dropDownTopPosition = Math.ceil(newY + newHeight);
          maxHeight = window.visualViewport.height - dropDownTopPosition;
          maxDropDownHeight.value = `${maxHeight > 300 ? 300 : maxHeight - 16}px`;
          // also consider here that there could STILL be less than 120px remaining and
          // make this the min
          maxDropDownHeight.value = `${maxHeight > 300 ? 300 : (maxHeight < 120 ? 120 : maxHeight - 16)}px`;
        }
      }
      // reset index on close
      if (!val) {
        keySelectedIndex.value = -1;
      }
    });

    /** DROP DOWN NAVIGATION */
    /**
     * template reference to the options container
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const dropDownContainer = useTemplateRef('dropDownContainerElement');
    /**
     * index of currently active option in keyboard drop down navigation
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const keySelectedIndex = ref(-1);
    return {
      // root element reference
      baseDropDown,
      // id handling
      idInt,
      // internationalization
      getLangLabel,
      // fade out handling
      showFadeOut,
      // drop down handling
      showDropDown,
      maxDropDownHeight,
      dropDownContainer,
      keySelectedIndex,
    };
  },
  computed: {
    selectedOptionInt() {
      return this.getLangLabel(this.modelValue.label, true) || this.placeholder || '';
    },
  },
  methods: {
    // event triggered by clicking on option or Enter after
    // selecting via keys
    selectValue(option) {
      this.showDropDown = false;
      /**
       * Event emitted when an option is selected
       *
       * @event update:modelValue
       * @param { Object } - the selected option
       */
      this.$emit('update:modelValue', option);
    },
    // adding key navigation for accessibility
    selectByKey(event) {
      const { key } = event;
      if (key === 'Space') {
        this.showDropDown = !this.showDropDown;
      } else if (this.showDropDown && (key === 'ArrowUp' || (event.shiftKey && key === 'Tab'))) {
        if (this.keySelectedIndex > 0) {
          this.keySelectedIndex -= 1;
        }
      } else if (this.showDropDown && (key === 'ArrowDown' || key === 'Tab')) {
        if (this.keySelectedIndex < this.options.length - 1) {
          this.keySelectedIndex += 1;
        }
      } else if (key === 'Enter') {
        if (this.showDropDown && this.keySelectedIndex >= 0) {
          this.selectValue(this.options[this.keySelectedIndex]);
        } else {
          this.showDropDown = !this.showDropDown;
        }
      } else if (key === 'Escape') {
        this.showDropDown = false;
      }
      if (this.$refs.option && this.$refs.option[this.keySelectedIndex]
        && this.dropDownContainer.scrollHeight
        !== this.dropDownContainer.clientHeight) {
        this.$refs.option[this.keySelectedIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

  .base-drop-down {
    display: inline-block;
    position: relative;

    .base-drop-down-label-wrapper {
      margin-bottom: $spacing-small;

      .base-drop-down-label {
        color: $font-color-second;
        margin-bottom: $spacing-small;
      }
    }

    .base-drop-down-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $row-height-small;
      width: 100%;
      line-height: $row-height-small;
      cursor: pointer;
      color: $font-color-second;
      fill: $font-color-second;
      background-color: $background-color;
      padding: 0;

      &.base-drop-down-head-spacing {
        padding: 0 $spacing;
      }

      .base-drop-down-head-text-wrapper {
        overflow: hidden;
        position: relative;
        margin-right: $spacing;
        transition: all 0.2s ease;
        width: 100%;
        text-align: left;

        .base-drop-down-head-text {
          white-space: nowrap;
          text-align: left;
        }

        &.base-drop-down-head-text-fade-out::after {
          content: '';
          height: 100%;
          width: $fade-out-width;
          position: absolute;
          top: 0;
          right: -1px;
          background: linear-gradient(to right, rgba(240, 240, 240, 0) , rgba(240, 240, 240, 1));
        }
      }

      &:hover {
        color: $app-color;
        fill: $app-color;
      }

      &:active .base-drop-down-icon, &:focus .base-drop-down-icon {
        fill: $app-color;
      }

      &:disabled {
        cursor: default;
        color: $graytext-color;
        fill: $graytext-color;

        .base-drop-down-icon {
          fill: $graytext-color;
        }
      }

      .base-drop-down-icon {
        transition: $drop-down-arrow-animation;
        height: $icon-small;
        width: $icon-small;
        flex-shrink: 0;

        &.base-drop-down-icon-rotated {
          transform: rotate(180deg);
        }
      }
    }

    .base-drop-down-body {
      position: absolute;
      background-color: white;
      z-index: map.get($zindex, dropdown);
      box-shadow: $drop-shadow;
      max-height: 300px;
      max-width: calc(100vw - 3 * #{$spacing});
      min-width: 100%;
      min-height: 120px;
      overflow-y: auto;
      overflow-x: hidden;
      cursor: pointer;

      .base-drop-down-body-list {

        .base-drop-down-option {
          min-height: $row-height-small;
          padding: $spacing-small-half $spacing;
          line-height: $line-height;
          width: 100%;
          transition: all 0.2s ease;

          &.base-drop-down-option-selected {
            color: $app-color;
          }

          &:hover, &.base-drop-down-option-key-selected {
            background-color: $button-header-color;
          }
        }
      }
    }
  }
</style>
