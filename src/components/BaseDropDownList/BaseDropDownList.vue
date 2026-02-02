<script setup>
import { highlightText } from '@/utils/utils.js';
import { useI18n } from '@/composables/useI18n.js';
import { computed, useSlots, toRef, useTemplateRef, watch } from 'vue';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';

/** a multipurpose drop-down list */

defineOptions({
  name: 'BaseDropDownList',
});


const props = defineProps({
  /**
   * list of options to select from, this needs to be an object with identifier
   * and label (the actual property names can be adapted with
   * `identifierPropertyName` and `labelPropertyName` respectively)
   */
  dropDownOptions: {
    type: Array,
    default: () => [],
  },
  /**
   * specify the name of a property that can be used as identifier
   */
  identifierPropertyName: {
    type: String,
    default: 'id',
  },
  /**
   * specify the name of the property that should be displayed
   */
  labelPropertyName: {
    type: String,
    default: 'value',
  },
  /**
   * specify the currently active option (will have gray background
   * if not disabled by setting `activeStyled` `false`) for example for
   * combination with input and keyboard use
   */
  activeOption: {
    type: [Object],
    default: () => ({}),
  },
  /**
   * specify the currently selected option (will appear in app color if not disabled
   * by setting `selectStyled` `false`, but also used for `aria-selected`).
   *   the v-model directive can be used here
   */
  selectedOption: {
    type: [Object],
    default: () => ({}),
  },
  /**
   * in order to link the drop-down body to an <input> element specify a list
   * id and use the `list` attribute on the input
   */
  listId: {
    type: String,
    default: '',
  },
  /**
   * add styling to the list body (e.g. max-height) (useful
   * if slots `before-list` or `after-list` should not be part of scroll container)
   */
  listBodyStyle: {
    type: Object,
    default: () => ({}),
  },
  /**
   * flag if the currently active element should be styled
   * (gray background)
   */
  activeStyled: {
    type: Boolean,
    default: true,
  },
  /**
   * flag if the currently selected entry should be styled
   * (only makes sense for single select, color: app-color)
   */
  selectStyled: {
    type: Boolean,
    default: false,
  },
  /**
   * if `true` the element will be styled as a drop-down element with
   * box-shadow
   */
  displayAsDropDown: {
    type: Boolean,
    default: true,
  },
  /**
   * message displayed when no selectable options are available
   */
  dropDownNoOptionsInfo: {
    type: String,
    default: '',
  },
  /**
   * specify a language (ISO 639-1) (used for label if label is language specific object
   * e.g. `{ de: 'xxx', en: 'yyy' }`
   */
  language: {
    type: String,
    default: '',
  },
  /**
   * this adds the possibility of nested options (thus a second list nested within the first one),
   * if an active sub-option is added, this will have consequences for scroll adjustment of list
   * on keyboard use and how the active option is determined (the identifier property will be used)
   */
  activeSubOption: {
    type: [Object, null],
    default: () => null,
  },
  /**
   * in case a custom option background should be set to the currently active option
   *   (this will also apply if `activeStyled` is set `false`).
   * if you want to use this option please set the css variable `--option-background`
   * in your app
   */
  useCustomOptionActiveBackgroundColor: {
    type: Boolean,
    default: false,
  },
  /**
   * set true if option characters matching a string provided in `highlightStringMatch`
   *  should be highlighted
   */
  useHighlightStringMatch: {
    type: Boolean,
    default: false,
  },
  /**
   * if `useHighlightStringMatch` is set to `true`, provide a string to match with the
   *  option label here
   */
  highlightStringMatch: {
    type: String,
    default: '',
  },
  /**
   * provide tag names to style the matched characters
   *  (without '<' and '>', e.g. ['b'] for <b>)
   */
  highlightStringTags: {
    type: Array,
    default: () => ([]),
  },
});

const emits = defineEmits([
  /**
   * inform parent if option was selected by mouse click
   * (v-model on prop selectedOption can be used)
   *
   * @event update:selected-option
   * @param {Object} - the selected option
   */
  'update:selected-option',
]);

/** INTERNATIONALIZATION */
const { getLangLabel } = useI18n(toRef(props, 'language'));

/** GENERAL */
/**
 * a reference to the single list options
 * @type {Readonly<ShallowRef<HTMLElement[] | null>>}
 */
const options = useTemplateRef('optionsEl');
/**
 * a reference to the outermost element container - either this element or
 * dropDownList could be scroll container
 * @type {Readonly<ShallowRef<HTMLElement | null>>}
 */
const dropDownContainer = useTemplateRef('dropDownContainerEl');
/**
 * a reference to the <ul> element - either this element or
 * dropDownContainer could be scroll container
 * @type {Readonly<ShallowRef<HTMLElement | null>>}
 */
const dropDownList = useTemplateRef('dropDownListEl');

/**
 * filter out options that don't have a value to display
 * @type {ComputedRef<Object[]>}
 */
const populatedAndLocalizedOptions = computed(() => {
  return props.dropDownOptions.reduce((prev, option) => {
    const langLabel = getLangLabel(option[props.labelPropertyName], true);
    if (langLabel) {
      return prev.concat({
        ...option,
        [props.labelPropertyName]: langLabel,
      });
    }
    return prev;
  }, []);
});

/** SELECT OPTION */
/**
 * triggered if option was selected by click
 * @param {Object} selectedOption - the selected option
 */
function selected(selectedOption) {
  // do not emit the modified option but the originally provided one
  const originalOption = props.dropDownOptions
    .find((option) => option[props.identifierPropertyName] === selectedOption[props.identifierPropertyName]);
  emits('update:selected-option', originalOption);
}

/** ACTIVE OPTION HANDLING */
/**
 * determine the scroll container dynamically, since usually it would be the container element
 * however with prop `listBodyStyle` overflow could also be set on the <ul> element (useful
 * if slots `before-list` or `after-list` should not be part of scroll container)
 * @type {ComputedRef<null|HTMLElement>}
 */
const scrollContainerElement = computed(() => {
  if (dropDownList.value && dropDownList.value.scrollHeight > dropDownList.value.clientHeight) {
    return dropDownList.value;
  }
  return dropDownContainer.value;
});
/**
 * since it should not change often also determine the height dynamically
 * @type {ComputedRef<number>}
 */
const scrollContainerHeight = computed(() => {
  return scrollContainerElement.value ? scrollContainerElement.value.clientHeight : 0;
});
/**
 * the index of the currently active option provided by parent
 * @returns {number}
 */
const activeOptionIndex = computed(() => {
  if (!props.activeOption) return -1;
  return populatedAndLocalizedOptions.value.findIndex((option) => {
    return option[props.identifierPropertyName] === props.activeOption[props.identifierPropertyName];
  });
});
/**
 * the currently active option provided by parent
 * @returns {number}
 */
const activeOptionInt = computed(() => {
  return populatedAndLocalizedOptions.value[activeOptionIndex.value] || null;
});

/**
 * get the template element for the currently active option
 * @type {ComputedRef<HTMLElement|null>}
 */
const activeOptionElement = computed(() => {
  if (!options.value) return null;
  // this can NOT be done via activeOptionIndex since the Vue docs state that the element reference
  // array DOES NOT necessarily have the same order!
  // (https://vuejs.org/guide/essentials/template-refs#refs-inside-v-for)
  return options.value
    .find((option) => option.id === activeOptionInt.value[props.identifierPropertyName])
    || null;
});

/**
 * watch prop `activeSubOption` to handle list intoView scrolling of the currently
 * active element
 */
watch(() => props.activeSubOption, (val) => {
  // check if a sub-option is present and active
  if (val) {
    // get the relevant HTML element so the position can be determined
    const subOptionElement = document.getElementById(val.id);
    // make sure an active option and sub-option was found
    if (activeOptionElement.value && subOptionElement) {
      // combine the offsetTop of the active element and the offsetTop of the
      // sub-option (which is relative to the active element)
      const totalOffsetTop = activeOptionElement.value.offsetTop + subOptionElement.offsetTop;
      // check if the sub-option top position is smaller than the scroll container offsetTop or larger
      // than the top position + container size (= the offsetTop is out of the view window)
      // if yes - trigger scroll into view (up)
      if (totalOffsetTop < scrollContainerElement.value.scrollTop
        || totalOffsetTop > scrollContainerElement.value.scrollTop + scrollContainerHeight.value) {
        // scrollIntoView is not working properly here so we set the position manually
        scrollContainerElement.value.scrollTop = totalOffsetTop;
        // or check if the bottom of the active sub-option is not in view anymore - then adjust the
        // scroll as well
        // scrollIntoView is not working properly here so we set the position manually
      } else if (totalOffsetTop + subOptionElement.clientHeight > scrollContainerHeight.value + scrollContainerElement.value.scrollTop) {
        scrollContainerElement.value.scrollTop = scrollContainerElement.value.scrollTop + subOptionElement.clientHeight;
      }
    }
  }
});

watch(activeOptionIndex, (index) => {
  // if the component has sub-options the scrolling will be handled by the props.activeSubOption
  // watcher
  if (props.activeSubOption) return;
  // if active option was removed and drop down is still present scroll back to
  // top
  if (index === -1 && scrollContainerElement.value) {
    scrollContainerElement.value.scrollTo({
      top: 0,
    });
    return;
  }
  // make sure an active option was found
  if (activeOptionElement.value) {
    // store element offsetTop in a variable since used more than once
    const elementOffsetTop = activeOptionElement.value.offsetTop;
    // get the necessary container elements and their top and height variables
    // check if current active option is out of view
    const optionOutOfView = elementOffsetTop < scrollContainerElement.value.scrollTop
      || elementOffsetTop + activeOptionElement.value.clientHeight > scrollContainerHeight.value;

    if (optionOutOfView) {
      activeOptionElement.value.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }
  }
});

/** STRING HIGHLIGHTING */
/**
 * create an object out of prop `highlightStringTags` so it can be
 *  spread into the options of the `highlightText` function
 * @returns {ComputedRef<{highlightTags: []}|{}>}
 */
const highlightTags = computed(() => {
  return props.highlightStringTags?.length
    ? { highlightTags: props.highlightStringTags } : {};
});

/**
 * function to highlight characters of a string
 * @param {string} word - the option that should be matched with query string
 * @returns {string} - the string to fill into v-html
 */
function highlight(word) {
  return highlightText({
    word,
    queryString: props.highlightStringMatch,
    // this is an empty object if prop `highlightStringTags` was not used
    ...highlightTags,
  });
}

/** NO OPTIONS SLOT */
const slots = useSlots();
// determine if no-options slot has any template or text content
// (simply using !!slots['no-options'] does not work anymore in Vue 3 since comments etc
// are evaluating to true as well
const { slotHasContent } = useHasSlotContent(slots['no-options']);
/**
 * determine if no options info element should be shown
 * @returns {ComputedRef<boolean>}
 */
const showNoOptions = computed(() => {
  return !props.dropDownOptions.length && (slotHasContent.value || props.dropDownNoOptionsInfo);
});
</script>

<template>
  <div
    ref="dropDownContainerEl"
    :class="['base-drop-down-list__container',
             { 'base-drop-down-list__container-drop-down-style': displayAsDropDown }]"
    class="base-drop-down-list__container">
    <!-- @slot for adding elements before the options list -->
    <slot name="before-list" />
    <ul
      :id="listId"
      ref="dropDownListEl"
      :style="listBodyStyle"
      :aria-activedescendant="activeOption ? activeOption[identifierPropertyName] : undefined"
      role="listbox"
      class="base-drop-down-list">
      <template
        v-for="(dropDownOption, optionIndex) in populatedAndLocalizedOptions"
        :key="dropDownOption[identifierPropertyName]">
        <li
          :id="dropDownOption[identifierPropertyName]"
          ref="optionsEl"
          :value="dropDownOption[labelPropertyName]"
          :aria-selected="(selectStyled
            && dropDownOption[identifierPropertyName] === selectedOption[identifierPropertyName])
            || null"
          :class="[
            'base-drop-down-list__option',
            { 'base-drop-down-list__option__hover': activeStyled },
            {
              'base-drop-down-list__option__selected': selectStyled
                && dropDownOption[identifierPropertyName] === selectedOption[identifierPropertyName],
            },
            {
              'base-drop-down-list__option__active': activeStyled
                && optionIndex === activeOptionIndex,
            },
            {
              'base-drop-down-list__option__active-custom': useCustomOptionActiveBackgroundColor
                && optionIndex === activeOptionIndex,
            }]"
          role="option"
          tabindex="0"
          @keydown.enter="selected(dropDownOption)"
          @click.stop="selected(dropDownOption)"
          @touchstart.stop.passive="">
          <!-- @slot a slot to customize every single option (e.g. display of information other than `[valuePropertyName]`)
            @binding {Object} option - the current option in the options list-->
          <slot
            name="option"
            :option="dropDownOption">
            <template v-if="useHighlightStringMatch">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="highlight(dropDownOption[labelPropertyName])" />
            </template>
            <template v-else>
              {{ dropDownOption[labelPropertyName] }}
            </template>
          </slot>
        </li>
      </template>
      <li
        v-if="showNoOptions"
        :class="[
          'base-drop-down-list__option',
          'base-drop-down-list__no-options',
        ]">
        <!--
          @slot customize what is displayed when no drop down options are available
        -->
        <slot
          v-if="!dropDownOptions.length"
          name="no-options">
          {{ dropDownNoOptionsInfo }}
        </slot>
      </li>
    </ul>
    <!-- @slot to add elements after the options list -->
    <slot name="after-list" />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/variables" as *;

.base-drop-down-list__container {
  background: inherit;

  &.base-drop-down-list__container-drop-down-style {
    box-shadow: $drop-shadow;
    z-index: map.get($zindex, dropdown);
    max-height: 10 * $row-height-small;
    overflow-y: auto;
    position: absolute;
  }

  .base-drop-down-list {
    position: relative;
    overflow-y: auto;

    .base-drop-down-list__option {
      display: flex;
      align-items: center;
      min-height: $row-height-small;
      padding: $spacing-small-half $spacing;
      line-height: $line-height;
      width: 100%;
      transition: all 0.2s ease;
      cursor: pointer;

      &.base-drop-down-list__no-options {
        cursor: default;
        align-items: center;
        padding: 0 $spacing;
      }

      &.base-drop-down-list__option__selected {
        color: $app-color;
      }

      &.base-drop-down-list__option__hover:hover {
        background-color: $button-header-color;
      }

      &.base-drop-down-list__option__active,
      &.base-drop-down-list__option__active:hover {
        background-color: $keyboard-active-color;
      }

      &.base-drop-down-list__option__active-custom {
        background-color: var(--option-background);
      }
    }
  }
}
</style>
