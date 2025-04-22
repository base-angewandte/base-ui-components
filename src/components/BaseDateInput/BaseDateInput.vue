<script>
import { computed, defineAsyncComponent, nextTick, ref, useTemplateRef, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { capitalizeString, debounce } from '@/utils/utils.js';

import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useId } from '@/composables/useId.js';
import { useExtractAttrs } from '@/composables/useExtractAttrs.js';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';
import { useElementObserver } from '@/composables/useElementObserver.js';

/**
 * Form Input Field Component for Date, Date - Date, Date - Time, or Time - Time
 *
 * for date also a format switch between date | year is available
 */

export default {
  name: 'BaseDateInput',
  components: {
    BaseInput,
    BaseIcon,
    BaseSwitchButton: defineAsyncComponent(() => import('@/components/BaseSwitchButton/BaseSwitchButton.vue')),
    // we need to import date picker async to avoid SSR problems
    DatePicker: defineAsyncComponent(() => import('vue-datepicker-next')),
  },
  directives: {
    ClickOutside: vOnClickOutside,
  },
  inheritAttrs: false,
  props: {
    /**
     * select date or datetime or a range
     */
    dateType: {
      type: String,
      default: 'single',
      validator(val) {
        return ['daterange', 'datetime', 'single', 'timerange'].includes(val);
      },
    },
    /**
     * input field settable from outside.
     *   attention: if this is an object it needs to contain all the
     *   properties (e.g. date_from, time_to) already otherwise only
     *   a string will be returned
     */
    modelValue: {
      type: [Object, String, Date],
      required: true,
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property showLabel
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * defines if input label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * set a placeholder for the input field (object with date and time attribute respectively)
     */
    placeholder: {
      type: [Object, String],
      default: () => ({ date: 'Select Date', time: 'Select Time' }),
    },
    /**
     * define the range separator
     */
    rangeSeparator: {
      type: String,
      default: '–',
    },
    /**
     * specify date format.
     *
     *  **date_year**: display tabs that allow for toggle between only choosing year
     *   or complete date
     *  **date_month_year**: display tabs that allow for toggle between choosing only year,
     *   year and month or complete date
     */
    format: {
      type: String,
      default: 'day',
      validator(val) {
        return ['day', 'month', 'year', 'date_year', 'date_month_year'].includes(val);
      },
    },
    /**
     * specify labels displayed instead of 'DD.MM.YYYY' and 'YYYY'
     *   should have the form `{ date: 'xxx', month: 'zzz', year: 'yyy' }`
     */
    dateFormatLabels: {
      type: Object,
      default: () => ({ date: 'DD.MM.YYYY', month: 'MM.YYYY', year: 'YYYY' }),
      validator(val) {
        const labelKeys = Object.keys(val);
        return labelKeys.includes('date') && labelKeys.includes('year');
      },
    },
    /**
     * a legend for the date format switch buttons
     */
    formatTabsLegend: {
      type: String,
      default: 'Switch between date formats',
    },
    /**
     * set calendar language (ISO 639-1).
     * **caveat**: currently only `en`, `de` and `fr` are supported
     *  @values de, en, fr
     */
    language: {
      type: String,
      default: 'en',
      validator: val => ['de', 'en', 'fr'].includes(val),
    },
    /**
     * set id
     */
    inputId: {
      type: [Number, String],
      default: '',
    },
    /**
     * define if standard form field styling should be
     * used (otherwise no border, no box shadow)
     */
    useFormFieldStyling: {
      type: Boolean,
      default: true,
    },
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * mark as required field (currently only used for aria-required)
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field
     * for an example see [BaseInput](BaseInput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * set `true` if input field should be disabled
     * for an example see [BaseInput](BaseInput)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid
     * for an example see [BaseInput](BaseInput)
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown
     * for an example see [BaseInput](BaseInput)
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * if `true` a remove icon will be shown allowing to remove
     * all input at once
     * for an example see [BaseInput](BaseInput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional input field styling
     */
    inputClass: {
      type: String,
      default: '',
    },
    /**
     * use this prop to deactivate automatic setting of focus as soon as input element
     * becomes active - this might require external handling of focus setting!
     */
    setFocusOnActive: {
      type: Boolean,
      default: true,
    },
    /**
     * in order to be able to set input field active state from outside
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * use this prop to set a delay in ms before calender is displayed
     */
    isActiveDelay: {
      type: Number,
      default: 0,
    },
    /**
     * specify input field type for the native HTML <input> element
     * @values text, search
     */
    inputType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'search'].includes(val),
    },
    /**
     * provide assistive text for screen readers
     * **clearInput**: text read for remove input icon if prop `clearable` is set `true`
     *  this could either be just one string that is used for all fields or an object with
     *  field specific text
     */
    assistiveText: {
      type: Object,
      default: () => ({
        clearInput: {
          date_from: 'Clear input from',
          date_to: 'Clear input to',
          time_from: 'Clear input from',
          time_to: 'Clear input to',
          date: 'clear date',
          time: 'clear time',
        },
      }),
    },
  },
  emits: ['click-input-field', 'update:model-value', 'clicked-outside', 'value-validated', 'input', 'update:is-active'],
  setup(props, { emit, slots }) {
    /** INTERNAL ID */
    const generatedId = useId();
    const internalId = computed(() => props.inputId || generatedId);

    /** LOCALIZATION */
    /**
     * determine lang object needed for datepicker dynamically, will be filled in mounted
     * (computed prop does not work reliably)
     * @type {[null] extends [Ref] ? IfAny<null, Ref<null>, null> : Ref<UnwrapRef<null>, UnwrapRef<null> | null>}
     */
    const lang = ref(null);
    /**
     * watch the language prop for changes so vue-datepicker can be updated with the relevant
     * language package
     */
    watch(() => props.language, async (newLang) => {
      // first import the relevant language package
      await import(`./../../../node_modules/vue-datepicker-next/locale/${newLang}.es.js`);
      // then update the vue-datepicker lang variable
      lang.value = newLang;
    });

    /** ATTRS HANDLING */
    const { rootAttrs, forwardAttrs } = useExtractAttrs();

    /** INPUT ELEMENT HANDLING */
    /**
     * get a reference to the BaseInput component
     * @type {{ from: Readonly<ShallowRef<null|HTMLElement>>, to: Readonly<ShallowRef<null|HTMLElement>> }}
     */
    const baseInput = {
      from: useTemplateRef('baseInputFromEl'),
      to: useTemplateRef('baseInputToEl'),
    }
    /**
     * return the native input element found via BaseInput, in case there are two input fields
     * this variable will always return the first one ('from' field)
     * @type {ComputedRef<HTMLElement|null>}
     */
    const inputElement = computed(() => baseInput.from.value?.inputElement || null);

    /**
     * return the native input elements found via BaseInput, this variable returns both `from` and
     * `to` input field in an array
     * @type {ComputedRef<HTMLElement[]|null[]>}
     */
    const inputElements = computed(() => [baseInput.from.value?.inputElement || null, baseInput.to.value?.inputElement || null]);


    /** DATE FORMAT */
    /**
     * variable for toggling format between date and year for date_year format
     * @type {string}
     */
    const dateFormatInt = ref('');

    /** INPUT HANDLING */
    /**
     * internal input representation with all possible values for
     * date and time
     * date format YYYY(-MM(-DD)) (storage format)
     * @typedef {Object} inputInt
     * @property {string} inputInt.date - attribute a single date or datetime date is stored in
     * @property {string} inputInt.date_from - storing daterange from
     * @property {string} inputInt.date_to - storing daterange to
     * @property {string} inputInt.time - storing the time for datetime type
     * @property {string} inputInt.time_from - storing timerange from
     * @property {string} inputInt.time_to - storing timerange to
     */
    const inputInt = ref({
      date: '',
      date_from: '',
      date_to: '',
      time: '',
      time_from: '',
      time_to: '',
    });

    /**
     * determine if the from field is a time field
     * @returns {boolean}
     */
    const isFromTimeField = computed(() => {
      return props.dateType === 'timerange';
    });
    /**
     * determine if the to field is a time field
     * @returns {boolean}
     */
    const isToTimeField = computed(() => {
      return props.dateType === 'datetime' || props.dateType === 'timerange';
    });
    /**
     * check if input is just a single date or an object
     * @returns {boolean}
     */
    const isInputTypeString = computed(() => {
      return typeof props.modelValue === 'string' || !inputProperties.value.length;
    });
    /**
     * compute the properties of the object provided in input prop
     * @returns {string[]}
     */
    const inputProperties = computed(() => {
      // if input is object return those keys // else for a single date it
      // could also be a string - then just return an empty array
      return typeof props.modelValue === 'object' ? Object.keys(props.modelValue) : [];
    });


    /**
     * handle input for the 'from' input field
     */
    const inputFrom = computed({
      /**
       * get back the appropriate inputInt attribute value
       * @returns {string} - a date in the format DD.MM.YYYY
       */
      get() {
        // if it is a time field just return the time_from value
        if (isFromTimeField.value) {
          return inputInt.value.time_from || '';
        }
        // else it is a date (either single or date_from) --> convert it into the
        // correct format for display (DD.MM.YYYY instead of the saved DD-MM-YYY)
        return parseToDateDisplay(inputInt.value.date || inputInt.value.date_from);
      },
      /**
       * also assign them again accordingly
       * @param {string} val - the value provided by the input element
       * @param {string} oldValue - the previous value of inputFrom
       */
      set(val, oldValue) {
        let newDate = val;
        if (isFromTimeField.value) {
          inputInt.value.time_from = newDate;
        } else {
          newDate = parseToDateStorage(val);
          if (inputProperties.value.includes('date_from')) {
            inputInt.value.date_from = newDate;
          } else {
            inputInt.value.date = newDate;
          }
        }
        // watching of computed values does not work so emit event for altered inputInt right here
        // the actual value is not needed here since data were transformed and
        // original object structure with correct data is retrieved with function getInputData
        if (newDate !== oldValue) {
          emitData();
        }
      },
    });

    /**
     * as above - if there is only a single time field get value from 'time' variable
     * if it is a range use 'time_to''
     */
    const inputTo = computed({
      /**
       * get back the appropriate inputInt attribute value
       * @returns {string}
       */
      get() {
        // check if a to time field exists
        if (isToTimeField.value) {
          // return the appropriate attribute value
          return inputInt.value.time || inputInt.value.time_to || '';
        }
        // else return the date_to attribute value
        return parseToDateDisplay(inputInt.value.date_to);
      },
      /**
       * also assign them again accordingly
       * @param {string} val - the value provided by the input element
       * @param {string} oldValue - the previous value of inputTo
       */
      set(val, oldValue) {
        let newValue = val;
        // check if field is date field
        if (!isToTimeField.value) {
          newValue = parseToDateStorage(newValue);
          // if so, set date_to attribute value and transform value appropriately
          // TODO: this could be insufficient since currently no validity checks on input string
          inputInt.value.date_to = newValue;
          // else check if type is timerange
        } else if (inputProperties.value.includes('time_from')) {
          inputInt.value.time_to = newValue;
          // else assume the type is datetime
        } else {
          inputInt.value.time = newValue;
        }
        // watching of computed values does not work so emit event for altered inputInt right here
        // the actual value is not needed here since data were transformed and
        // original object structure with correct data is retrieved with function getInputData
        if (newValue !== oldValue) {
          emitData();
        }
      },
    });
    /**
     * data emit function, transforming data before emit event
     */
    function emitData() {
      // get a data object that only contains fields that were also present
      // in external input
      const data = getInputData();
      /**
       * emit an event when focus leaves the input
       *
       * @event selected
       * @param {string, Object} - the input string or object
       */
      emit('update:model-value', data);
    }
    /**
     * if input was just a single string return that otherwise
     * only return the properties provided by external input
     * if input is empty set value to empty string instead of null (default vue2-datepicker)
     * @returns {string | Object}
     */
    function getInputData() {
      if (isInputTypeString.value) {
        return inputInt.value.date !== null ? inputInt.value.date : '';
      }
      const data = {};
      inputProperties.value.forEach((key) => {
        data[key] = inputInt.value[key] !== null ? inputInt.value[key] : '';
      });
      return data;
    }
    // HELPER METHODS
    /**
     * transform the date to the correct display format
     * @param {string} dateString - the date string in YYYY-MM-DD format
     */
    function parseToDateDisplay(dateString) {
      // if no date string was provided just return an empty string
      if (!dateString) return '';
      // now check if year is negative
      const isNegativeYear = isNegativeStorageDate(dateString);
      // if so, create a positive date string
      const positiveDateString = isNegativeYear
        ? removeYearMinusFromStorageDate(dateString) : dateString;
      // now do the transformation and add the minus to the year again if necessary
      return addYearMinusToDateDisplay(
        positiveDateString.split('-').reverse().join('.'),
        isNegativeYear,
      );
    }
    /**
     * transform the date to the correct storage format
     * @param {string} dateString - the date string in DD.MM.YYYY format
     */
    function parseToDateStorage(dateString) {
      return dateString ? dateString.split('.').reverse().join('-') : '';
    }
    /**
     * check for a negative year in the date that is displayed
     * @param {string} date - date string in the format DD.MM.YYYY
     * @returns {boolean}
     */
    function isNegativeDisplayDate(date) {
      if (!date) return false;
      if (dateFormatInt.value === 'MM.YYYY') {
        return /^\d{0,2}\.-\d{0,4}$/.test(date);
      }
      if (dateFormatInt.value === 'YYYY') {
        return /^-\d{0,4}$/.test(date);
      }
      return /^\d{0,2}\.\d{0,2}\.-\d{0,4}$/.test(date);
    }
    /**
     * check if year is negative in the stored date
     * @param {string} date - a date string in the format YYYY-MM-DD
     * @param {string} [format=undefined] - in case not the current format (this.dateFormatInt) should
     *  be used for evaluation provide it with this param
     * @returns {boolean}
     */
    function isNegativeStorageDate(date, format = undefined) {
      // if there is no date to evaluate just return false
      if (!date) return false;
      // either use the format provided as param or the currently set format in dateFormatInt
      const formatToCheck = format || dateFormatInt.value;
      if (formatToCheck === 'MM.YYYY') {
        return /^-\d{0,4}-\d{0,2}$/.test(date);
      }
      if (formatToCheck === 'YYYY') {
        return /^-\d{0,4}$/.test(date);
      }
      return /^-\d{0,4}-\d{0,2}-\d{0,2}$/.test(date);
    }
    /**
     * since minus has to be temporarily removed for some actions add it again
     *  after with this function (for displayed date)
     * @param {string} date - date in the format DD.MM.YYYY
     * @param {boolean} [isNegative=true] - optionally do not add minus when calling this
     *  function
     * @returns {string}
     */
    function addYearMinusToDateDisplay(date, isNegative = true) {
      if (isNegative) {
        const [year, month, day] = date.split('.').reverse();
        return `${day !== undefined ? `${day}.` : ''}${month !== undefined ? `${month}.` : ''}-${year}`;
      }
      return date;
    }
    /**
     * since minus has to be temporarily removed for some actions add it again
     *  after with this function (for stored date)
     * @param {string} date - date in the format YYYY-MM-DD
     * @param {boolean} [isNegative=true] - optionally do not add minus when calling this
     *  function
     * @returns {string}
     */
    function addYearMinusToDateStorage(date, isNegative = true) {
      if (isNegative) {
        return `-${date}`;
      }
      return date;
    }
    /**
     * remove the minus from the date since some functions (especially Date() ) can
     *  not cope with negative dates (for displayed date)
     * @param {string} date - the date string in format DD.MM.YYYY
     * @returns {string}
     */
    function removeYearMinusFromDisplayDate(date) {
      return isNegativeDisplayDate(date)
        ? date.replace('-', '') : date;
    }
    /**
     * remove the minus from the date since some functions (especially Date()) can
     *  not cope with negative dates (for stored date)
     * @param {string} date - the date string in format YYYY-MM-DD
     * @param {string} [format=undefined] - in case not the currently selected format should be used
     *  for date evaluation provide the format with this param
     * @returns {string}
     */
    function removeYearMinusFromStorageDate(date, format = undefined) {
      return isNegativeStorageDate(date, format)
        ? date.replace('-', '') : date;
    }

    /** DATE FORMAT SWITCH */
    /**
     * check if format switch tabs should be shown
     * @returns {boolean}
     */
    const isSwitchableFormat = computed(() => {
      return props.format === 'date_month_year' || props.format === 'date_year';
    });

    /** LABEL ROW DISPLAY */
    /**
     * check if label-addition slot exists is filled
     */
    const { slotHasContent: labelRowSlotsHaveData } = useHasSlotContent(slots['label-addition']);
    /**
     * determines if label row should be shown
     * @returns {Boolean|boolean}
     */
    const showLabelRow = computed(() => {
      // show label when prop is set true or a label addition was added via slot
      return props.showLabel || isSwitchableFormat.value || labelRowSlotsHaveData.value;
    });

    /** INPUT ACTIVE / PICKER OPEN / CLICK OUTSIDE HANDLING */
    /**
     * to steer closing of date/timepicker from and to input field once date/time is selected
     * (packed into an object to still be able to address it dynamically like so: pickerState[`${origin}Open`]
     * @type {{fromOpen: Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>, toOpen: Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}}
     */
    const pickerState = {
      fromOpen: ref(false),
      toOpen: ref(false),
    }
    /**
     * variable to steer if input fade out of from field should be shown
     * @type {boolean}
     */
    /**
     * variable to keep active state in sync with potential parent prop
     * (this is needed as independent variable from toOpen and fromOpen for example in
     * BaseAdvancedSearchRow to keep dropdown open even if datepicker is closed)
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const isActiveInt = ref(false);

    /**
     * watch for changes in input field active variable to keep in sync with parent
     * @param {boolean} val - the changed internal is active variable
     */
    watch(isActiveInt, (val) => {
      /**
       * replace BaseInput state with BaseDateInput field active state and
       * propagate this one
       *
       * @event update:is-active
       * @param {boolean} - is input field active
       */
      emit('update:is-active', val);
    });

    /**
     * also adjust internal variable when active state changes from outside
     * @param {boolean} val - the changed isActive prop
     */
    watch(() => props.isActive, (val) => {
      if (val !== isActiveInt.value) {
        isActiveInt.value = val;
        // if is active is set from outside also open the first date field
        pickerState.fromOpen.value = val;
      }
      // if isActive is set false from outside also close date picker
      if (!val) {
        pickerState.fromOpen.value = false;
        pickerState.toOpen.value = false;
      }
    }, {
      immediate: true,
    });

    const onClickOutsideHandler = [
      /**
       * handle click outside event and adjust input active variable accordingly
       * @param {MouseEvent} event - the event provided by the click outside directive
       */
        (event) => {
        isActiveInt.value = false;
        /**
         * emit a custom clicked-outside event instead of BaseInput event (propagation stopped)
         *
         * @event clicked-outside
         * @param {MouseEvent} - the native Event
         */
        emit('clicked-outside', event);
      },
    ]

    /**
     * handle click inside the component and adjust input active variable accordingly
     * @param {MouseEvent} event - event triggered by mouse click
     */
    function clickedInside(event) {
      isActiveInt.value = true;
      /**
       * event additionally triggered to BaseInput default click-input-field to also
       * set field active if component sourroundings are clicked
       *
       * @event click-input-field
       * @param {MouseEvent} - the native Event
       */
      emit('click-input-field', event);
    }

    /**
     * in general input field active styling is handled via focusin and
     * clicked-outside, however for special case iOS touch  devices have
     * up and down arrows that do not trigger any event other than blur and will
     * cause the dropdowns of input fields to remain open
     * @param {FocusEvent} event - the native blur event
     * @param {string} origin - did event emit from 'from' or 'to' date field
     */
    function onInputBlur(event, origin) {
      const relatedTargetInput = event.relatedTarget?.parentElement ? event.relatedTarget.parentElement
        .getElementsByTagName('input') : null;
      // so since these arrows only navigate between input fields we check if there is a
      // related target and if this related target is an input field and if yes we make sure
      // the id is different from the input id of this component (the one the event originated from)
      if (event.relatedTarget
        && ((event.relatedTarget.tagName === 'INPUT'
            && (!event.relatedTarget?.id || event.relatedTarget.id !== event.target.id))
          // additionally also set input active false when the BaseInput 'remove' button
          // (displayed if `clearable` is true) is triggered in the other date field of the range
          || (event.relatedTarget?.className === 'base-input__remove-icon-wrapper'
            && relatedTargetInput && relatedTargetInput[0]?.id !== event.target.id))) {
        // set input active state false
        pickerState[`${origin}Open`].value = false;
      }
    }

    /** STYLE AND FADE OUT CALC ON RESIZE */
    /**
     * reference to the root element
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const baseDateInput = useTemplateRef('baseDateInputEl');
    /**
     * reference to the label element
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const labelElement = useTemplateRef('labelEl');
    /**
     * reference to the possible additions to the label row - switch buttons and `label-addition` slot
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const labelAdditions = useTemplateRef('labelAdditionsEl');
    /**
     * reference to the native input elements
     * @type {{ inputElementFrom: Readonly<ShallowRef<null|HTMLElement>>, inputElementTo: Readonly<ShallowRef<null|HTMLElement>> }}
     */
    const nativeInputElements = {
      inputFromElement: useTemplateRef('inputFromEl'),
      inputToElement: useTemplateRef('inputToEl'),
    };
    /**
     * reference to the BaseIcon component
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const baseIcon = useTemplateRef('baseIconEl');
    /**
     * store icon width in a variable
     * @type {ComputedRef<number>}
     */
    const iconWidth = ref(0);
    /**
     * variable to set css class according to label elements wrapping or not
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const wrapLabelRow = ref(false);
    /**
     * variable to steer if icons should be shown (becoming false if not enough
     * space)
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const showIcons = ref(false);
    /**
     * variable to steer if input fade out of to field should be shown
     * @type {boolean}
     */
    const fadeOut = {
      fadeOutFrom: ref(false),
      fadeOutTo: ref(false),
    };

    // create an observer with the fade out calc function
    useElementObserver({
      type: 'resize',
      target: baseDateInput,
      callback: debounce(50, onElementResize),
    });

    if (props.showLabel && (isSwitchableFormat.value || labelRowSlotsHaveData.value)) {
      // second observer to trigger label additions width calc as soon as element is rendered
      useElementObserver({
        type: 'resize',
        target: labelAdditions,
        callback: debounce(50, onLabelAdditionsResize),
      });
    }
    /**
     * callback function for the resize observer calculating fade out and label
     * additions width
     */
    function onElementResize() {
      if (props.showLabel && (isSwitchableFormat.value || labelRowSlotsHaveData.value)) {
        calcLabelAdditionsWidth();
      }
      calcFadeOut(['From', 'To']);
    }
    /**
     * callback function for the resize observer calculating label
     * additions width on label additions render
     */
    function onLabelAdditionsResize(entries, observer) {
      // only do calc when element is filled
      if (entries[0].contentRect.width > 0) {
        calcLabelAdditionsWidth();
        // only do this once as soon as elements are rendered - then disconnect!
        observer.disconnect();
      }
    }

    /**
     * function to correctly style the date format switch buttons and prevent
     * overlay with label
     */
    function calcLabelAdditionsWidth() {
      // get the complete element width
      const observableWidth = baseDateInput.value.clientWidth;
      // get the label margin
      const labelMargin = props.showLabel
        ? Number(getComputedStyle(labelElement.value)['margin-right'].replace('px', '')) : 0;
      const labelWidth = props.showLabel ? labelElement.value.clientWidth : 0;
      // calculate the remaining container space after label, label margin and date switch width
      const spacingLeft = observableWidth
        - labelWidth
        - labelMargin
        - labelAdditions.value.clientWidth;
      // if no space is left set a class that sets label additions width to 100% so element has to wrap
      wrapLabelRow.value = spacingLeft < 0;
    }

    /**
     * function to calculate if fade out in the input fields should be shown, needs to be
     * recalculated after resize or if input changes
     */
    async function calcFadeOut(inputFields) {
      // first we need to determine the iconWidth IF it is shown
      // only get once since the icon width should not change later on, but wait
      // until icon is rendered (has a clientWidth)
      if (!iconWidth.value && baseIcon.value?.$el?.clientWidth) {// get the icon HTML element
        const iconElement = baseIcon.value.$el;
        // get the margin that is also part of the icon width in the input field
        const iconMargin = Number(getComputedStyle(iconElement)['margin-left'].replace('px', ''));
        // set the icon width as width + margin
        iconWidth.value = iconElement.clientWidth + iconMargin;
      }
      // ICONS
      // since we want a uniform appearance
      // across all fields we only do this once with the longest text
      // for input width etc. we use the 'from' field since it should always be
      // present
      // get the 'from' input element
      const inputElement = nativeInputElements.inputFromElement.value;
      // make sure the element was found and since icon removal is only considered if there
      // is input - check if there is actually input (or if this is the initial
      // state were icons are still hidden per default to avoid a short flash if they dont fit)
      if (inputElement && (!showIcons.value || inputFrom.value || inputTo.value)) {
        // but relevant for icon calc is the longest text
        let maxTextWidth = 0;
        // check which element has the longer text
        // create a span
        const span = document.createElement('span');
        // hide the span
        span.setAttribute('class', 'hide');
        // add the from value to the span
        span.innerHTML = inputFrom.value;
        // add the element to the document body
        baseDateInput.value.appendChild(span);
        maxTextWidth = span.offsetWidth;
        // add the to value to the span
        span.innerHTML = inputTo.value;
        const toWidth = span.offsetWidth;
        // update the value if 'to' field text is longer than first determined
        // 'from'
        if (toWidth > maxTextWidth) {
          maxTextWidth = toWidth;
        }
        // remove the element again
        baseDateInput.value.removeChild(span);

        // get inputWidth
        const inputWidth = inputElement.offsetWidth;
        // now make the actual comparisons to set the correct showIcons value
        // if icons are present just check the text against the remaining input width
        if (showIcons.value && maxTextWidth > inputWidth) {
          // if not - remove the icons
          showIcons.value = false;
          // wait for the DOM to update so the input width is correct in fade out calculations
          await nextTick();
          // if icons are not present we need to consider if text would still fit if icons
          // WERE present - only if yes show icons again
        } else if (!showIcons.value && maxTextWidth + iconWidth.value <= inputWidth) {
          showIcons.value = true;
          // wait for the DOM to update so the input width is correct in fade out calculations
          await nextTick();
        }
      }


      // FADE OUT
      // since fade out is determined for each field individually iterate through the relevant fields
      inputFields.forEach((field) => {
        const inputElement = nativeInputElements[`input${field}Element`].value;
        // check if element exists
        if (inputElement) {
          // now get the input field value or the placeholder text
          // we need to take inputFrom/inputTo here because DOM value is not updated yet
          // sometimes after validity check
          const text = (field === 'From' ? inputFrom.value : inputTo.value)
            || inputElement.getAttribute('placeholder');
          // now check if any of the two exists
          if (text) {
            // create a span
            const span = document.createElement('span');
            // hide the span
            span.setAttribute('class', 'hide');
            // add the input extracted text to this span
            span.innerHTML = text;
            // add the element to the document body
            baseDateInput.value.appendChild(span);
            // get the width of that element
            const textWidth = span.offsetWidth;
            // remove the element again
            baseDateInput.value.removeChild(span);
            // now also get the input width
            const inputWidth = inputElement.offsetWidth;
            // and check if the text width fits the input width
            fadeOut[`fadeOut${field}`].value = textWidth > inputWidth;
          }
        }
      });
    }

    return {
      internalId,
      lang,
      rootAttrs,
      forwardAttrs,
      inputElement,
      inputElements,
      dateFormatInt,
      inputInt,
      isFromTimeField,
      isToTimeField,
      isInputTypeString,
      inputProperties,
      inputFrom,
      inputTo,
      emitData,
      getInputData,
      parseToDateStorage,
      parseToDateDisplay,
      isNegativeDisplayDate,
      isNegativeStorageDate,
      addYearMinusToDateDisplay,
      addYearMinusToDateStorage,
      removeYearMinusFromDisplayDate,
      removeYearMinusFromStorageDate,
      labelRowSlotsHaveData,
      isSwitchableFormat,
      showLabelRow,
      isActiveInt,
      onClickOutsideHandler,
      clickedInside,
      onInputBlur,
      fromOpen: pickerState.fromOpen,
      toOpen: pickerState.toOpen,
      baseDateInput,
      labelElement,
      labelAdditions,
      baseIcon,
      inputFromElement: nativeInputElements.inputFromElement,
      inputToElement: nativeInputElements.inputToElement,
      wrapLabelRow,
      showIcons,
      useFadeOutFrom: fadeOut.fadeOutFrom,
      useFadeOutTo: fadeOut.fadeOutTo,
      calcFadeOut,
    };
  },
  data() {
    return {
      /**
       * variable to store the date when switching from date to year in order to be
       * able to restore exact date when switching back
       * @type {inputInt}
       */
      tempDateStore: {},
      /**
       * flag set true on mounted to indicate that its ok to render the datepicker
       * (otherwise SSR or hydration mismatch errors)
       * @type {boolean}
       */
      mounted: false,
    };
  },
  computed: {
    /**
     * this is the format we want to store computed based on what
     * was specified in format and what date toggle tabs (via dateFormatInt) might say
     * TODO: check if this is still needed with custom input
     * @returns {string}
     */
    datePickerValueFormat() {
      if (this.format === 'year' || this.dateFormatInt === 'YYYY') {
        // use single letter for year here to allow negative dates
        return 'Y';
      }
      if (this.format === 'month' || this.dateFormatInt === 'MM.YYYY') {
        // use single letter for year here to allow negative dates
        return 'MM.Y';
      }
      // use single letter for year here to allow negative dates
      return 'DD.MM.Y';
    },
    /**
     * if the format is settable this.format is date_year and can not be
     * used directly for the date picker component
     * @returns {string}
     */
    minDateView() {
      if (this.isSwitchableFormat && this.dateFormatInt === 'YYYY') {
        return 'year';
      }
      if (this.isSwitchableFormat && this.dateFormatInt === 'MM.YYYY') {
        return 'month';
      }
      if (this.isSwitchableFormat && this.dateFormatInt === 'DD.MM.YYYY') {
        return 'day';
      }
      return this.format;
    },
    /**
     * determine if the initially provided date is a year or a full date
     * (used to set the correct date display format and date/year switch button)
     * @returns {boolean}
     */
    isDateFormatYear() {
      return (this.isInputTypeString && this.inputInt.date
          && /^(-?[0-9]{1,4}|-[0-9]{0,4})$/.test(this.inputInt.date))
        || (this.inputProperties.some(key => !!key.includes('date')
          && this.inputInt[key] && /^(-?[0-9]{1,4}|-[0-9]{0,4})$/.test(this.inputInt[key])));
    },
    isDateFormatMonth() {
      return ((this.isInputTypeString && this.inputInt.date
          && /^(-?[0-9]{1,4}|-[0-9]{0,4})-[0-1]?[0-9]$/.test(this.inputInt.date))
        || this.inputProperties.some(key => !!key.includes('date')
          && this.inputInt[key]
          && /^(-?[0-9]{1,4}|-[0-9]{0,4})-[0-1]?[0-9]$/.test(this.inputInt[key])));
    },
    /**
     * return the format options for date, month, year switches
     * @returns {[{label: string, value: string}]}
     */
    tabSwitchOptions() {
      // minimal options
      const options = [
        { label: this.dateFormatLabels.date, value: 'DD.MM.YYYY' },
        { label: this.dateFormatLabels.year, value: 'YYYY' },
      ];
      // if format can be month as well, add month option
      if (this.format === 'date_month_year') {
        options.splice(1, 0, {
          label: this.dateFormatLabels.month,
          value: 'MM.YYYY',
        });
      }
      return options;
    },
  },
  watch: {
    inputInt: {
      /**
       * watch if dateInt (in storage format YYYY(MM-(DD)))
       * changes and inform parent
       */
      handler() {
        /**
         * Event emitted on input, passing input string
         *
         * @event input
         * @param {string} - the input event value however
         * passing only the event.target.value
         *
         */
        this.$emit('input', this.getInputData());
      },
      deep: true,
    },
    /**
     * watch format and set correct dateFormat
     */
    format: {
      handler(val) {
        if (val === 'year') {
          this.dateFormatInt = 'YYYY';
          return;
        }
        if (val === 'month') {
          this.dateFormatInt = 'MM.YYYY';
          return;
        }
        this.dateFormatInt = 'DD.MM.YYYY';
      },
      immediate: true,
    },
    /**
     * watch input set from outside and set internal inputInt accordingly as well as
     * set the correct display format
     */
    modelValue: {
      handler(val) {
        // check if input string is different from inputInt
        if (JSON.stringify(val) !== JSON.stringify(this.getInputData())) {
          if (typeof this.modelValue === 'string') {
            this.inputInt.date = val;
          } else {
            this.inputInt = {
              // keep all inputInt props
              ...this.inputInt,
              // and add the ones set by parent
              ...JSON.parse(JSON.stringify(val)),
            };
          }
          // check if external input was year format and set internal format accordingly
          if (this.isSwitchableFormat) {
            if (this.isDateFormatYear) {
              this.dateFormatInt = 'YYYY';
            } else if (this.isDateFormatMonth) {
              this.dateFormatInt = 'MM.YYYY';
            } else {
              this.dateFormatInt = 'DD.MM.YYYY';
            }
          }
        }
      },
      // to not need to do extra assignment in created()
      immediate: true,
    },
    /**
     * in order to allow user to restore previous date after switching
     * from date to year and back store in temp variable (but only if previous date was full date
     * (check necessary for starting with year where format is switched to 'YYYY'
     * but no previous full date avaliable))
     * @param {string} val - the changed dateFormatInt value
     * @param {string} old - the previous value
     */
    dateFormatInt(val, old) {
      // in order to allow user to restore previous date after switching
      // from date to year and back store in temp variable if
      // a) date is not just format 'YYYY' & switch was made from full date
      if (!this.isDateFormatYear && old === 'DD.MM.YYYY') {
        this.tempDateStore = { ...this.inputInt };
        // b) tab switch was made from month to year
      } else if (!this.isDateFormatYear
        && (val === 'YYYY' && old === 'MM.YYYY')) {
        // if there is no previous stored date just store everything
        if (!this.tempDateStore) {
          this.tempDateStore = { ...this.inputInt };
          // if there was a previous stored date check for every date prop in inputInt
          // if stored date should be overwritten
        } else {
          Object.keys(this.inputInt).filter(key => !!key.includes('date'))
            .forEach((dateKey) => {
              // date should be overwritten if month or year are different from
              // the already stored date
              if (!this.monthAndYearIdent(
                  // check if the positive dates are identical
                  this.removeYearMinusFromStorageDate(this.inputInt[dateKey], old),
                  (/^-/.test(this.tempDateStore[dateKey]) ? this.tempDateStore[dateKey].replace('-', '') : this.tempDateStore[dateKey]),
                  // and also check if the operator in front of year is identical
                ) && this.isNegativeStorageDate(this.inputInt[dateKey], old)
                === /^-/.test(this.tempDateStore[dateKey])) {
                this.tempDateStore[dateKey] = this.inputInt[dateKey];
              }
            });
        }
      }
      this.convertDate(old);
      // since inputInt is manipulated directly in this case (easier with Date conversions)
      // inputFrom and inputTo setters are not triggered and we need to emit the new data manually
      this.emitData();
    },
  },
  async mounted() {
    // in order to avoid SSR and hydration problems only render the datepicker when component is mounted
    // first import the relevant language package
    await import(`./../../../node_modules/vue-datepicker-next/locale/${this.language}.es.js`);
    // then set mounted flag which will serve as the notification to render
    this.mounted = true;
  },
  updated() {
    // this hack is necessary because otherwise keyboard navigation was impaired by the datepicker
    // pop up elements
    // check if datepicker element is actually open
    if (this.fromOpen || this.toOpen) {
      // wait until elements are rendered
      this.$nextTick(() => {
        // get all focusable elements that have the 'mx-' in the class name
        // had to add 'div's as well because of some strange effect in Firefox
        const keyboardfocusableElements = [...this.$el.querySelectorAll(
          'div, a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        )]
          .filter(el => !el.hasAttribute('disabled'))
          .filter(el => el.className.includes('mx-'));
        // iterate through the elements and add tabindex -1
        keyboardfocusableElements.forEach((element) => {
          element.setAttribute('tabindex', -1);
        });
      });
    }
  },
  methods: {
    /**
     * since the complete datepicker lies within the BaseInput, the BaseInput click event
     *  is triggered also when a date is picked from the date picker - this leads to the undesired
     *  side effect that the date picker pop up is reopened when a date was selected there
     *  therefore we only allow the click event to pass on when the user clicks on the input field
     *  DIRECTLY
     * @param {PointerEvent} event - the native click event
     */
    onInputClick(event) {
      if (event.target.tagName !== 'INPUT') {
        event.stopPropagation();
      }
    },
    /**
     * checks done on keydown events
     * a) tab key needs separate handling and only needs to set input field close when
     * there is no clearable button (or shift key was used for going to previous field)
     * b) prevent user from entering chars other than number or period (date) or colon (time)
     * and not more characters than the date format requires
     * @param {KeyboardEvent} event - the keydown event
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    handleInputKeydown(event, origin) {
      let currentInputString = event.target.value;
      // get the key triggering the event
      const { key } = event;
      // now check for the specific input key to preventDefault and prevent unwanted
      // characters
      // create boolean to determine if it is a time field (otherwise date is assumed)
      const isTimeField = this.isTimeInputField(origin);
      // if time ':' is allowed in input regex - otherwise '.'
      const allowedFieldKey = isTimeField ? ':' : '\\.';
      // check if '-' should be an allowed key
      let allowMinus = false;
      if ((this.dateFormatInt === 'DD.MM.YYYY' && /^\d{2}\.\d{2}\.\d{0,4}$/.test(currentInputString))
        || (this.dateFormatInt === 'MM.YYYY' && /^\d{2}\.\d{0,4}$/.test(currentInputString))
        || (this.dateFormatInt === 'YYYY' && /^\d{0,4}$/.test(currentInputString))) {
        allowMinus = true;
      }
      // create regex for allowed keys
      const allowedKeysRegex = new RegExp(`([0-9${allowMinus ? '-' : ''}]|${allowedFieldKey}|Backspace|Delete|Tab|Enter|ArrowRight|ArrowLeft)`);
      // create regex that should not be allowed if max length is reached
      const disallowedKeysOnLengthRegex = new RegExp(`([0-9]|${allowedFieldKey})`);
      // get the max length for the respective format (for time: 'HH:mm' = 5)
      // also check for a minus
      let formatLength = isTimeField ? 5 : this.dateFormatInt.length;
      if (!isTimeField && this.isNegativeDisplayDate(currentInputString)) {
        // add one extra to formatLength for the '-' if date is negative
        formatLength += 1;
      }
      // check if
      // * key was not any of the allowed keys
      // * or was an allowed key but the length is to long for the format in
      //    question (and no text was selected = will be replaced)
      // * if type is date and key was period and date format is year or last char in string was
      //    already a period
      // * if type is time and key was colon and last char was already a colon
      // * and also make sure copy & paste is allowed!
      if ((!allowedKeysRegex.test(key)
          || (disallowedKeysOnLengthRegex.test(key) && currentInputString.length >= formatLength
            && document.activeElement.selectionEnd - document.activeElement.selectionStart === 0)
          || (!isTimeField && key === '.' && (this.dateFormatInt === 'YYYY'
            || currentInputString.charAt(currentInputString.length - 1) === '.'))
          || (isTimeField && key === ':' && currentInputString.charAt(currentInputString.length - 1) === ':'))
        && !(['c', 'v', 'x'].includes(key) && event.ctrlKey)) {
        event.preventDefault();
      }
      // when the user tries to leave the field check if input string is valid
      if (key === 'Enter') {
        this.checkDateValidity(origin);
        currentInputString = this[`input${origin}`];
      }
      // check if key was tab because of reasons specified above and close picker if necessary
      if (key === 'Enter' || (key === 'Tab' && (event.shiftKey || !this.clearable
        || !currentInputString))) {
        // if yes set the relevant input field open status to false
        this[`${origin.charAt(0).toLowerCase()}${origin.slice(1)}Open`] = false;
      }
    },
    /**
     * this function is triggered with the input event - it checks the length of the value and
     * adds the '.' (date) or (':') or '0' in the correct places or removes '-' that was added at
     * a wrong position if necessary
     * @param {InputEvent} event - the input event
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    checkDate(event, origin) {
      // get the value in question
      let modifiedValue = event.target.value;
      // this is a workaround necessary because of the manual input event triggered in BaseInput
      // (~line 610) but since input has not changed with this event we can easily filter it out
      // by only applying the operations if input has changed
      if (modifiedValue === this[`input${origin}`]) return;
      // otherwise continue to check the input
      // determine if input is coming from a time or date field
      const isTimeField = this.isTimeInputField(origin);
      // depending on that different characters need to be added
      const charToAdd = isTimeField ? ':' : '.';
      // check if value is present and if input type is other than 'deleteContentBackward' because
      // otherwise the dots can not be deleted anymore
      if (modifiedValue && event.inputType !== 'deleteContentBackward') {
        // remove a non-matching '-' character
        if (modifiedValue !== '-' && !this.isNegativeDisplayDate(modifiedValue)) {
          modifiedValue = modifiedValue.replace('-', '');
        }
        // now check the date format and if input so far matches the appropriate regex
        if ((!isTimeField && this.dateFormatInt === 'DD.MM.YYYY' && /^(\d{2}$|\d{2}\.\d{2})$/.test(modifiedValue))
          || ((this.dateFormatInt === 'MM.YYYY' || isTimeField) && /^\d{2}$/.test(modifiedValue))) {
          // if so - add a period character
          modifiedValue = `${modifiedValue}${charToAdd}`;
        }
        const firstTwoDigitsRegex = new RegExp(`^[1-9]${isTimeField ? ':' : '\\.'}$`);
        // check if input was a period - if yes - check date validity and add zeros if necessary
        if (firstTwoDigitsRegex.test(modifiedValue)) {
          modifiedValue = `0${modifiedValue}`;
        } else if (/^\d{2}\.\d\.$/.test(modifiedValue)) {
          const [day, month, year] = modifiedValue.split('.');
          modifiedValue = `${day}.0${month}.${year}`;
        }
      }
      this[`input${origin}`] = modifiedValue;
    },
    /**
     * this function is triggered with the blur event on the input and does a last check on the
     * validity of the value
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    checkDateValidity(origin) {
      // important and mostly different checks to make depending if value is date or time
      // so save that in variable
      const isTimeField = this.isTimeInputField(origin);
      // since Date() has problems with negative dates just remove the '-' and add it again after!
      let positiveDate = this.removeYearMinusFromDisplayDate(this[`input${origin}`]);
      // check if there is a value present
      if (positiveDate) {
        // also save the current format length
        const formatLength = isTimeField ? 5 : this.dateFormatInt.length;
        // get the separator depending on time or date field
        const separator = isTimeField ? ':' : '.';
        // get the array length of array with string split up by separator (should be same for
        // format and value string)
        const numberFormatParts = isTimeField ? 2 : this.dateFormatInt.split('.').length;
        // first check if periods (date) or colons (time) are too many
        if (positiveDate.split(separator).length > numberFormatParts) {
          // just remove all the periods or colons - there the next check will add some again
          positiveDate = positiveDate.replaceAll('.', '');
        }
        // check if there are too little separators
        if (numberFormatParts > positiveDate.split(separator).length) {
          // check if day and month (for DDMMYYYY) or month and year (for MMYYYY) or time
          // are without period or colon respectively
          if (formatLength !== 4 && /^\d{3}/.test(positiveDate)) {
            // this assumes the first two digits are for day or month respectively!
            // TODO: not ideal that 2 digits are assumed - see if this can be improved
            positiveDate = `${positiveDate.slice(0, 2)}${separator}${positiveDate.slice(2, positiveDate.length)}`;
          }
          // check if there is a second period between month and year (for DDMMYYYY)
          if (this.dateFormatInt === 'DD.MM.YYYY' && formatLength !== 4 && /^\d{2}\.\d{3}/.test(positiveDate)) {
            // this assumes there are two digits for day and month respectively!
            // TODO: not ideal that 2 digits are assumed - see if this can be improved
            positiveDate = `${positiveDate.slice(0, 5)}.${positiveDate.slice(5, positiveDate.length)}`;
          }
        }
        // second check if the length of the value is correct
        if (positiveDate.length !== formatLength) {
          // distinguish between date and time string
          if (isTimeField) {
            // check if minutes are missing
            if (/^\d{1,2}:?$/.test(positiveDate)) {
              const [hours] = positiveDate.split(':');
              positiveDate = `${hours}:00`;
            }
            // check if zeros out front are missing from hour
            if (/^\d:\d{1,2}$/.test(positiveDate)) {
              const [hours, minutes] = positiveDate.split(':');
              positiveDate = `0${hours}:${minutes}`;
            }
            // check if zeros out front are missing from minute
            if (/^\d{2}:\d$/.test(positiveDate)) {
              const [hours, minutes] = positiveDate.split(':');
              positiveDate = `${hours}:0${minutes}`;
            }
          } else {
            // first check reason for length mismatch is year is
            // completely missing for date format
            if (this.dateFormatInt === 'DD.MM.YYYY' && /^\d{1,2}\.\d{1,2}\.?(\d{0,3})$/.test(positiveDate)) {
              // determine current year
              const currentYear = new Date().getFullYear();
              const [day, month, year] = positiveDate.split('.');
              if (!year) {
                // repair date and add the year if it is missing
                positiveDate = `${day}.${month}.${currentYear}`;
                // else assume there are digits missing from the year and add 0
              } else {
                positiveDate = `${day}.${month}.${year.padStart(4, '0')}`;
              }
            }
            // for month format
            if (this.dateFormatInt === 'MM.YYYY' && /^\d{1,2}\.?(\d{0}|\d{2})$/.test(positiveDate)) {
              // determine current year
              const currentYear = new Date().getFullYear();
              const [month, year] = positiveDate.split('.');
              // repair date and add first two year digits - if date more than 10 years to the
              // future - make it current century - otherwise last century
              const century = (currentYear).toString().slice(0, 2);
              positiveDate = `${month}.${year > (currentYear + 10).toString().slice(2, 4)
                ? Number(century - 1) : century}${year || currentYear.toString().slice(2, 4)}`;
            }
            // second check if the reason for the length not matching is that the day is
            // missing a zero
            if (this.dateFormatInt === 'DD.MM.YYYY' && /^[1-9]\.\d{1,2}\.\d{4}$/.test(positiveDate)) {
              // get the values
              const [day, month, year] = positiveDate.split('.');
              // repair date and add a zero to day
              positiveDate = `0${day}.${month}.${year}`;
            }
            // second check if the reason for mismatching length is that the zero in month
            // is missing
            if (['DD.MM.YYYY', 'MM.YYYY'].includes(this.dateFormatInt) && /^\d{2}?\.?[1-9]\.\d{4}$/.test(positiveDate)) {
              // get values, reverse in order to be able to get also correct values for format
              // 'month'
              const [year, month, day] = positiveDate.split('.').reverse();
              // repair date and add missing zero to month
              positiveDate = `${day}.0${month}.${year}`;
            }
            // if format is year assume there are zeros in the year missing
            if (this.dateFormatInt === 'YYYY') {
              positiveDate = `${positiveDate.padStart(4, '0')}`;
            }
          }
          // now check if time/date has now the correct length - if not still remove the value
          if (positiveDate.length !== formatLength) {
            positiveDate = '';
          }
        }
        // now check for general validity
        if (isTimeField) {
          // just add random date to see if time is valid
          if (Number.isNaN(Date.parse(`1212-12-12T${positiveDate}`))) {
            let [hours, minutes] = positiveDate.split(':');
            // check if valid hours
            if (!/^([0-1][0-9]|2[0-4])$/.test(hours)) {
              hours = '00';
            }
            // check if valid minutes
            if (!/^[0-5][0-9]$/.test(minutes)) {
              minutes = '00';
            }
            // construct a new time
            const newTime = `${hours}:${minutes}`;
            // now check again if time is valid now if yes assign, if no delete the string
            positiveDate = Number.isNaN(Date.parse(`1212-12-12T${newTime}`)) ? '' : newTime;
          }
        } else {
          // now truly check if date is a valid date
          if (Number.isNaN(Date.parse(this.parseToDateStorage(positiveDate)))) {
            // TODO: check if date has appropriate number of periods
            const [year, month, day] = positiveDate.split('.').reverse();
            if (this.dateFormatInt === 'DD.MM.YYYY') {
              // TODO: could this check already be done on input???
              // check if something is wrong with the day
              if (!/^(0[1-9]|[1-2][0-9]|3[0-1])/.test(day)) {
                // replace day with appropriate value
                positiveDate = `01.${month}.${year}`;
              }
            } if (this.dateFormatInt !== 'YYYY') {
              // check if something is wrong with the month
              if (!/^(0[1-9]|1[0-2])/.test(month)) {
                // replace month with appropriate value
                positiveDate = `${day ? `${day}.` : ''}01.${year}`;
              }
            }
          }
          // since technically invalid dates (like 30.02.2000) will also be considered a
          // valid date by Date.parse() just convert to Date and back one more time
          // new Date(input) will always convert to the actual day in the next month
          // e.g. 31.06. --> 01.07. ; 30.02. --> 02.03.
          const tempDate = this.getDateString(this.convertToDate(this.parseToDateStorage(positiveDate)));
          // now check if date in the format YYYY-(MM-(DD)) is valid
          if (!Number.isNaN(Date.parse(this.parseToDateStorage(tempDate)))) {
            // if it is a valid date after conversion and if yes store it so it can
            // be assigned back to inputFrom/inputTo
            positiveDate = this.parseToDateDisplay(tempDate);
          } else {
            positiveDate = '';
          }
        }
        // now add the minus again if necessary
        this[`input${origin}`] = this.addYearMinusToDateDisplay(
          positiveDate,
          this.isNegativeDisplayDate(this[`input${origin}`]),
        );
      }
      // after everything also still check if the new date/time string needs a fade out
      this.calcFadeOut([origin]);
      const data = this.getInputData();
      /**
       * this event is emitted when the value was validated in case input should just be considered
       * after date validation
       *
       * @event value-validated
       * @param {string, Object} - the validated string or input object
       */
      this.$emit('value-validated', data);
    },
    /**
     * a function to have the time picker close automatically as soon as minutes
     * are selected
     * @param {string} origin - is it from the 'from' or 'to' part of the picker
     * @param {string} type - was 'hour' or 'minute' selected
     */
    closeTimePicker({ origin, type }) {
      // else check if value selected was type 'minute' - this will automatically also
      // exclude date fields from any action
      if (type === 'minute') {
        // get capitalized origin here since needed 2x
        const uppercaseOrigin = capitalizeString(origin);
        // check date validity
        this.checkDateValidity(uppercaseOrigin);
        // close the drop down
        this[`${origin}Open`] = false;
      }
    },
    /**
     * function triggered on datepicker 'pick' event, handling date picker closing
     *  caveat: this event is just triggered for DATE picker - not time!
     * @param origin
     */
    datePicked(origin) {
      this[`${origin}Open`] = false;
    },
    /**
     * convert function triggered on format tab switch
     */
    convertDate(oldFormat) {
      // go over each property of inputInt (that includes date - since not applicable to time
      // values)
      Object.entries(this.inputInt).filter(([key]) => !!key.includes('date'))
        .forEach(([dateKey, dateValue]) => {
          // get the date to convert and remove the minus if there is one
          const dateToConvert = this.removeYearMinusFromStorageDate(dateValue, oldFormat);
          if (dateToConvert) {
            if (this.minDateView === 'year') {
              // convert date string to real date in order to get year and convert back to string
              this.inputInt[dateKey] = this.addYearMinusToDateStorage(
                this.convertToDate(dateToConvert).getFullYear().toString(),
                this.isNegativeStorageDate(dateValue, oldFormat),
              );
              return;
            }
            let useStorageDate;
            const storageDate = this.tempDateStore ? this.tempDateStore[dateKey] : null;
            const isNegativeTempStorageDate = !!storageDate && /^-/.test(storageDate);
            const isNegativeNewDateValue = this.isNegativeStorageDate(dateValue, oldFormat);
            const positiveTempStorageDate = isNegativeTempStorageDate ? storageDate.replace('-', '') : storageDate;
            if (this.minDateView === 'month') {
              useStorageDate = !!positiveTempStorageDate
                // get stored date if
                // a) previous date was full date and month and year
                // are identical with stored year and month
                && ((!this.isDateFormatYear
                    && this.monthAndYearIdent(positiveTempStorageDate, dateToConvert))
                  // b) previous date was year and it is identical with stored year
                  || (new Date(positiveTempStorageDate)
                    .getFullYear().toString() === dateToConvert))
                // also check that they have the identical sign
                && (isNegativeTempStorageDate === isNegativeNewDateValue);
              // assume the format is 'date'
            } else {
              // check if a previous date was stored and year (coming from year)
              useStorageDate = !!positiveTempStorageDate && ((this.isDateFormatYear
                  && new Date(positiveTempStorageDate).getFullYear().toString() === dateToConvert
                  && isNegativeTempStorageDate === this.isNegativeStorageDate(dateValue, oldFormat))
                // or month and year (coming from month) was changed or is still the same
                || (this.isDateFormatMonth
                  && this.monthAndYearIdent(positiveTempStorageDate, dateToConvert)
                  && (isNegativeTempStorageDate === isNegativeNewDateValue)));
              // if a previous date was stored use this one else use the input date
            }
            const newDate = useStorageDate ? positiveTempStorageDate : dateToConvert;
            // now assign the new date to the input variable
            this.inputInt[dateKey] = this.addYearMinusToDateStorage(
              this.getDateString(this.convertToDate(newDate)),
              // use the original dates here before minus was removed, depending on which date was used
              (useStorageDate ? isNegativeTempStorageDate : isNegativeNewDateValue),
            );
          }
        });
    },
    /**
     * convert a value to a date in local time at zero hours
     *
     * @param {string} value - the date string stored in db (format YYYY-MM-DD) - this needs to
     *  be a positive date value!! (remove minus from negative years before applying this function)
     * @returns {Date} - (e.g. Fri Jul 30 2021 00:00:00 GMT+0200 (Central European Summer Time))
     */
    convertToDate(value) {
      return new Date(`${value}T00:00:00.000`);
    },
    /**
     * a function to convert a date to a string in the format YYYY-MM-DD
     *
     * @param {Date} date in format
     * @returns {string} - returns a string in format YYYY-MM-DD
     */
    getDateString(date) {
      // there is always a year // add padStart to always have 4 digits
      let dateString = `${date.getFullYear().toString().padStart(4, '0')}`;
      // if date format is not 'year' only - add month
      if (this.dateFormatInt !== 'YYYY') {
        const month = (date.getMonth() + 1).toString();
        dateString = `${dateString}-${month.length < 2 ? '0' : ''}${month}`;
      }
      // if date format is 'date' - add day
      if (this.dateFormatInt === 'DD.MM.YYYY') {
        const day = date.getDate().toString();
        dateString = `${dateString}-${day.length < 2 ? '0' : ''}${day}`;
      }
      return dateString;
    },
    /**
     * compare 2 dates for identical month and year values respectively
     *  these dates need to be positive values (remove the minus from the date
     *  before applying this function)
     * @param {string} date1 - a string in YYYY-MM-DD format
     * @param {string} date2 - a string in YYYY-MM-DD format
     * @returns {boolean}
     */
    monthAndYearIdent(date1, date2) {
      const convertedDate1 = this.convertToDate(date1);
      const convertedDate2 = this.convertToDate(date2);
      const monthDate1 = convertedDate1.getMonth();
      const monthDate2 = convertedDate2.getMonth();
      const yearDate1 = convertedDate1.getFullYear();
      const yearDate2 = convertedDate2.getFullYear();
      return monthDate1 === monthDate2 && yearDate1 === yearDate2;
    },
    isTimeInputField(origin) {
      return this.dateType === 'timerange' || (this.dateType === 'datetime' && origin.toLowerCase() === 'to');
    },
    /**
     * add delay before value is set
     *
     * @param {String} origin - is event originating from 'from' or 'to' field
     * @param {boolean} value
     */
    isActiveHandler(origin, value) {
      // if false set value immediately
      if (!value) {
        this[`${origin}Open`] = value;
        this.isActiveInt = this.fromOpen || this.toOpen;
        // check for date validity here instead of blur event (necessary for time input
        // which is not triggered otherwise)
        this.checkDateValidity(capitalizeString(origin));
        return;
      }

      // otherwise add a delay
      setTimeout(() => {
        this[`${origin}Open`] = value;
        this.isActiveInt = this.fromOpen || this.toOpen;
      }, this.isActiveDelay);
    },
  },
};
</script>

<template>
  <div
    ref="baseDateInputEl"
    v-bind="rootAttrs"
    class="base-date-input">
    <div
      v-if="showLabelRow"
      :class="['base-date-input__label-row',
               { 'base-date-input__label-row--visible': showLabel }]">
      <legend
        v-if="showLabel"
        ref="labelEl"
        class="base-date-input__label"
        @click.prevent="">
        {{ label }}
      </legend>
      <div
        :class="['base-date-input__label-additions',
                 {'base-date-input__label-additions--switch-height': isSwitchableFormat },
                 {'base-date-input__label-additions--wrap': wrapLabelRow }]">
        <div
          ref="labelAdditionsEl"
          :class="['base-date-input__label-additions-inner',
                   {'base-date-input__label-additions-inner--switch': isSwitchableFormat },
                   {'base-date-input__label-additions-inner--no-label-switch': isSwitchableFormat
                     && !showLabel }]">
          <!-- @slot to add additional elements to the label row -->
          <slot name="label-addition" />
          <BaseSwitchButton
            v-if="isSwitchableFormat"
            v-model="dateFormatInt"
            :options="tabSwitchOptions"
            :label="formatTabsLegend"
            :active-tab="dateFormatInt"
            class="base-date-input__switch-buttons" />
        </div>
      </div>
    </div>

    <!-- FORM FIELDS -->
    <!-- vuejs-accessibility/click-events-have-key-events: keydown event is counter productive to workflow here -->
    <!-- vuejs-accessibility/no-static-element-interactions: click is just for handling focus no
      interaction/accessibility needed -->
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events vuejs-accessibility/no-static-element-interactions -->
    <div
      v-click-outside="onClickOutsideHandler"
      class="base-date-input__field-wrapper"
      @click="clickedInside">
      <!-- @slot to add elements within form field but before the input element line for an example see [BaseInput](BaseInput)-->
      <slot name="pre-input-field" />
      <div class="base-date-input__input-fields">
        <!-- @slot add elements within input form field but before all other elements - this field wraps if necessary for an example see [BaseInput](BaseInput) -->
        <slot name="input-field-addition-before" />
        <div class="base-date-input__input-line">
          <!-- @slot add elements directly in the input line (no wrapping) for an example see [BaseInput](BaseInput)-->
          <slot name="input-field-inline-before" />
          <!-- INPUT FROM -->
          <BaseInput
            ref="baseInputFromEl"
            v-model="inputFrom"
            :input-id="`input-${internalId}-from`"
            :label="label"
            :show-label="false"
            :is-active="fromOpen"
            :use-form-field-styling="useFormFieldStyling"
            :show-input-border="showInputBorder"
            :clearable="clearable"
            :assistive-text="{
              clearInput: typeof assistiveText.clearInput === 'string'
                ? assistiveText.clearInput
                : assistiveText.clearInput?.date_from ?? assistiveText.clearInput?.time_from
                  ?? assistiveText.clearInput?.date ?? 'clear input',
            }"
            :required="required"
            :invalid="invalid"
            :disabled="disabled"
            :show-error-icon="showErrorIcon"
            :error-message="errorMessage"
            :input-class="inputClass"
            :set-focus-on-active="setFocusOnActive"
            :use-fade-out="useFadeOutFrom"
            class="base-date-input__input-wrapper"
            @update:is-active="isActiveHandler('from', $event)">
            <template #input>
              <div
                class="base-date-input__datepicker">
                <!-- date picker needs to be added on mounted because otherwise SSR errors or hydration missmatches -->
                <DatePicker
                  v-if="mounted"
                  v-model:value="inputFrom"
                  :placeholder="isFromTimeField ? placeholder.time : placeholder.date"
                  :clearable="false"
                  :append-to-body="false"
                  :lang="lang"
                  :open="fromOpen"
                  :type="isFromTimeField ? 'time' : minDateView"
                  :format="isFromTimeField ? 'HH:mm' : datePickerValueFormat"
                  :value-type="isFromTimeField ? 'format' : datePickerValueFormat"
                  input-class="base-date-input__datepicker-input"
                  @pick="datePicked('from')"
                  @click.prevent="onInputClick"
                  @change="(time, timeType) => closeTimePicker({ origin: 'from', type: timeType })">
                  <template #input>
                    <!-- need to disable because label is there - it is just in BaseInput
                    component -->
                    <!-- eslint-disable-next-line  vuejs-accessibility/form-control-has-label -->
                    <input
                      :id="`input-${internalId}-from`"
                      ref="inputFromEl"
                      enterkeyhint="done"
                      autocomplete="off"
                      v-bind="forwardAttrs"
                      :value="inputFrom"
                      :placeholder="isFromTimeField ? placeholder.time ?? placeholder
                        : placeholder.date ?? placeholder"
                      :type="inputType"
                      :aria-describedby="label + '-' + internalId"
                      :aria-required="required"
                      :aria-invalid="invalid"
                      :required="required"
                      :disabled="disabled"
                      :aria-disabled="disabled"
                      :class="['base-date-input__input', inputClass]"
                      @input="checkDate($event, 'From')"
                      @keydown="handleInputKeydown($event, 'From')"
                      @blur="onInputBlur($event, 'from')"
                      @vue:mounted="calcFadeOut(['From'])">
                  </template>
                  <!-- this empty element is here so that the default icon of datepicker
                  is not used -->
                  <template #icon-calendar>
                    <div class="base-date-input__icon-wrapper" />
                  </template>
                </DatePicker>
              </div>
            </template>
            <template #post-input-field>
              <BaseIcon
                ref="baseIconEl"
                :name="isFromTimeField ? 'clock' : 'calendar-many'"
                :class="['base-date-input__date-icon', { hide: !showIcons }]"
                @click.stop="fromOpen = !fromOpen" />
            </template>
          </BaseInput>

          <span
            v-if="dateType === 'daterange' || dateType === 'timerange'"
            class="base-date-input__separator">{{ rangeSeparator }}</span>

          <!-- INPUT TO -->
          <BaseInput
            v-if="dateType !== 'single'"
            ref="baseInputToEl"
            v-model="inputTo"
            :input-id="`input-${internalId}-to`"
            :label="label"
            :show-label="false"
            :is-active="toOpen"
            :use-form-field-styling="useFormFieldStyling"
            :show-input-border="showInputBorder"
            :clearable="clearable"
            :assistive-text="{
              clearInput: typeof assistiveText.clearInput === 'string'
                ? assistiveText.clearInput
                : assistiveText.clearInput?.date_to ?? assistiveText.clearInput?.time_to
                  ?? assistiveText.clearInput?.time ?? 'clear input',
            }"
            :required="required"
            :invalid="invalid"
            :disabled="disabled"
            :show-error-icon="showErrorIcon"
            :error-message="errorMessage"
            :set-focus-on-active="setFocusOnActive"
            :use-fade-out="useFadeOutTo"
            class="base-date-input__input-wrapper"
            @update:is-active="isActiveHandler('to', $event)">
            <template #input>
              <div
                class="base-date-input__datepicker">
                <!-- date picker needs to be added on mounted because otherwise SSR errors or hydration missmatches -->
                <DatePicker
                  v-if="mounted"
                  v-model:value="inputTo"
                  :placeholder="isToTimeField ? placeholder.time : placeholder.date"
                  :clearable="false"
                  :append-to-body="false"
                  :lang="lang"
                  :open="toOpen"
                  :type="isToTimeField ? 'time' : minDateView"
                  :format="isToTimeField ? 'HH:mm' : datePickerValueFormat"
                  :value-type="isToTimeField ? 'format' : datePickerValueFormat"
                  input-class="base-date-input__datepicker-input"
                  @pick="datePicked('to')"
                  @click.prevent="onInputClick"
                  @change="(time, timeType) => closeTimePicker({ origin: 'to', type: timeType })">
                  <template #input>
                    <!-- need to disable because label is there - it is just in BaseInput
                      component -->
                    <!-- eslint-disable-next-line  vuejs-accessibility/form-control-has-label -->
                    <input
                      :id="`input-${internalId}-to`"
                      ref="inputToEl"
                      enterkeyhint="done"
                      autocomplete="off"
                      v-bind="forwardAttrs"
                      :value="inputTo"
                      :placeholder="isToTimeField ? placeholder.time ?? placeholder
                        : placeholder.date ?? placeholder"
                      :type="inputType"
                      :aria-describedby="label + '-to-' + internalId"
                      :aria-required="required"
                      :aria-invalid="invalid"
                      :required="required"
                      :disabled="disabled"
                      :aria-disabled="disabled"
                      :class="['base-date-input__input', inputClass]"
                      @input="checkDate($event, 'To')"
                      @keydown="handleInputKeydown($event, 'To')"
                      @blur="onInputBlur($event, 'to')"
                      @vue:mounted="calcFadeOut(['To'])">
                  </template>
                  <!-- this empty element is here so that the default icon of
                  datepicker is not used -->
                  <template #icon-calendar>
                    <div class="base-date-input__icon-wrapper" />
                  </template>
                </DatePicker>
              </div>
            </template>
            <template #post-input-field>
              <BaseIcon
                v-if="showIcons"
                :name="isToTimeField ? 'clock' : 'calendar-many'"
                class="base-date-input__date-icon"
                @click.stop="toOpen = !toOpen" />
            </template>
          </BaseInput>
        </div>
      </div>
      <!-- @slot for adding elements after input -->
      <slot name="post-input-field" />
    </div>

    <div class="base-date-input__below">
      <!-- @slot to add elements below input fields e.g. add drop down -->
      <slot name="below-input" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

  .base-date-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    .base-date-input__label-row {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;

      &.base-date-input__label-row--visible {
        margin-bottom: $spacing-small-half;
      }

      .base-date-input__label {
        color: $font-color-second;
        margin-bottom: $spacing-small-half;
        text-align: left;
        align-self: flex-end;
        margin-right: 50px;
      }

      .base-date-input__label-additions {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        flex: 1 1 auto;
        height: $line-height;

        &.base-date-input__label-additions--switch-height {
          height: calc(#{$line-height} + #{$spacing-small-half});

          @media screen and (max-width: $mobile) {
            height: calc(#{$line-height} + #{$spacing-small});
          }

          &.base-date-input__label-additions--wrap {
            margin-top: 2px;
          }
        }

        &.base-date-input__label-additions--wrap {
          width: 100%;
        }
      }

      .base-date-input__label-additions-inner {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        margin-bottom: $spacing-small-half;

        &.base-date-input__label-additions-inner--switch {
          bottom: 0;
          margin-bottom: calc(-#{$spacing-small-half} / 2);

          @media screen and (max-width: $mobile) {
            margin-bottom: calc(-#{$spacing-small} - 2px);
          }
        }
        &.base-date-input__label-additions-inner--no-label-switch {
          margin-bottom:  2px;

          @media screen and (max-width: $mobile) {
            margin-bottom: calc(-#{$spacing-small} + 1px);
          }
        }

        .base-date-input__switch-buttons {
          bottom: 0;
          display: flex;
        }
      }
    }

    .base-date-input__field-wrapper {
      display: flex;
      align-items: baseline;
      width: 100%;

      .base-date-input__input-fields {
        display: flex;
        align-items: center;
        flex: 1 1 auto;
        flex-wrap: wrap;

        .base-date-input__input-line {
          display: flex;
          flex: 1 1 auto;
          align-items: center;

          .base-date-input__input-wrapper {

            & + .base-date-input__input-wrapper {
              margin-left: $spacing;
            }

            .base-date-input__datepicker {
              flex-grow: 1;
              width: auto;
              font-family: inherit;
              font-size: inherit;

              .base-date-input__input {
                min-height: $row-height-small;
                line-height: $row-height-small;
                width: 100%;
                height: 100%;
              }
            }

            .base-date-input__icon-wrapper::before {
              content: '';
            }

            .base-date-input__date-icon {
              position: relative;
              width: $icon-large;
              height: $icon-large;
              color: $font-color-second;
              cursor: pointer;
              flex-shrink: 0;
              align-self: center;
              margin-left: $spacing-small;
            }
          }

          .base-date-input__separator {
            padding: 0 $spacing;
          }
        }
      }
    }

    .base-date-input__below {
      position: relative;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-date-input .base-date-input__label-row .base-date-input__label-additions {
      align-items: center;
    }
  }
</style>

<style lang="scss">
  @use '@/styles/datepicker';
</style>
