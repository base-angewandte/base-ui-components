<template>
  <div
    class="base-form"
    :style="formStyle">
    <!-- OPTIONAL HEADER -->
    <component
      :is="renderHeaderAs"
      v-if="formHeader"
      class="base-form__header">
      {{ formHeader }}
    </component>
    <!-- FORM -->
    <div
      class="base-form__body">
      <template
        v-for="(element, index) in formFieldListInt">
        <!-- SINGLE FORM FIELD -->
        <BaseFormFieldCreator
          v-if="!allowMultiply(element)"
          ref="baseFormField"
          :key="`${element.name}_${index}_${formId}`"
          :class="['base-form-field',
                   formFieldsHalf.indexOf(element) >= 0
                     ? 'base-form-field-half' : 'base-form-field-full',
                   { 'base-form-field-top-margin': formFieldsHalf.indexOf(element) >= 0
                     && element.type === 'boolean' },
                   { 'base-form-field-left-margin': isHalfFieldSecond(element)}]"
          v-bind="formFieldComponentProps(element, index)"
          @field-value-changed="setFieldValue($event, element.name)"
          @fetch-autocomplete="fetchAutocomplete"
          @input-complete="onInputComplete($event, element.name)"
          v-on="inputListeners">
          <template #label-addition="{ fieldName, groupNames }">
            <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="label-addition"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
          <template #pre-input-field="{ fieldName, groupNames }">
            <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="pre-input-field"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
          <template
            #input-field-addition-before="{ fieldName, groupNames }">
            <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="input-field-addition-before"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
          <template #input-field-inline-before="{ fieldName, groupNames }">
            <!-- @slot to add elements directly inline before the input (contrary to `input-field-addition-before` this does not wrap. for an example see [BaseInput](BaseInput)
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="input-field-inline-before"
              :field-name="fieldName"
              :group-names="groupNames" />
            <span
              v-if="element['x-attrs'] && element['x-attrs'].text_before"
              class="base-form-field__text-before">
              {{ element['x-attrs'].text_before }}
            </span>
          </template>
          <template #input-field-addition-after="{ fieldName, groupNames }">
            <span
              v-if="element['x-attrs'] && element['x-attrs'].text_after"
              class="base-form-field__text-after">
              {{ element['x-attrs'].text_after }}
            </span>
            <!-- @slot for adding elements after input
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="input-field-addition-after"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
          <template #post-input-field="{ fieldName, groupNames }">
            <!-- @slot for adding elements at the end covering the whole height
            @binding {string} fieldName - the name of the displayed field
            @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              name="post-input-field"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
          <template #error-icon>
            <!-- @slot use a custom icon instead of standard error/warning icon -->
            <slot name="error-icon" />
          </template>
          <template #remove-icon>
            <!-- @slot use a custom icon instead of standard remove icon -->
            <slot name="remove-icon" />
          </template>
          <template #below-input="{ fieldName, groupNames }">
            <!-- @slot below-input slot added to e.g. add drop down
            @binding {string} fieldName - the name of the displayed field -->
            <slot
              name="below-input"
              :field-name="fieldName"
              :group-names="groupNames" />
          </template>
        </BaseFormFieldCreator>

        <!-- REPEATABLE FIELDS - ALLOW FOR MULTIPLE VALUES PER FIELD -->
        <template v-else>
          <!-- wrapper around form field group and remove button -->
          <div
            v-for="(value, valueIndex) in valueListInt[element.name]"
            :ref="element.name"
            :key="`${element.name}_${index}_${valueIndex}_${formId}_wrapper`"
            :class="['base-form-field',
                     { 'base-form-field__multiple__inline': multiplyButtonsInline(element) },
                     { 'base-form-field__multiple__inline--has-title': valueIndex === 0 },
                     formFieldsHalf.indexOf(element) >= 0
                       ? 'base-form-field-half' : 'base-form-field-full',
                     { 'base-form-field-left-margin': isHalfFieldSecond(element) }]">
            <BaseFormFieldCreator
              :key="`${element.name}_${index}_${valueIndex}_${formId}`"
              ref="baseFormField"
              v-bind="formFieldComponentProps(element, index, valueIndex)"
              class="base-form-field__multiple__inline-element"
              @field-value-changed="setFieldValue(
                $event,
                element.name,
                valueIndex,
                (element['x-attrs'] ? element['x-attrs'].equivalent : ''))"
              @fetch-autocomplete="fetchAutocomplete"
              @input-complete="onInputComplete(
                $event,
                element.name,
                valueIndex)"
              v-on="inputListeners">
              <template #label-addition="{ fieldName, groupNames }">
                <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="label-addition"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template #pre-input-field="{ fieldName, groupNames }">
                <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="pre-input-field"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template
                #input-field-addition-before="{ fieldName, groupNames }">
                <!-- @slot Slot to allow for additional elements in the input field \<div\>
                  (before \<input\>)
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="input-field-addition-before"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template #input-field-inline-before="{ fieldName, groupNames }">
                <span
                  v-if="element['x-attrs'] && element['x-attrs'].text_before"
                  class="base-form-field__text-before">
                  {{ element['x-attrs'].text_before }}
                </span>
                <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap. for an example see [BaseInput](BaseInput)
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="input-field-inline-before"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template #input-field-addition-after="{ fieldName, groupNames }">
                <span
                  v-if="element['x-attrs'] && element['x-attrs'].text_after"
                  class="base-form-field__text-after">
                  {{ element['x-attrs'].text_after }}
                </span>
                <!-- @slot for adding elements after input
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="input-field-addition-after"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template #post-input-field="{ fieldName, groupNames }">
                <!-- @slot for adding elements at the end covering the whole height
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="post-input-field"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
              <template #error-icon>
                <!-- @slot use a custom icon instead of standard error/warning icon -->
                <slot name="error-icon" />
              </template>
              <template #remove-icon>
                <!-- @slot use a custom icon instead of standard remove icon -->
                <slot name="remove-icon" />
              </template>
              <template #below-input="{ fieldName, groupNames }">
                <!-- @slot below-input slot added to e.g. add drop down
                @binding {string} fieldName - the name of the displayed field
                @binding {number} index - the array index of field values -->
                <slot
                  name="below-input"
                  :field-name="fieldName"
                  :group-names="groupNames"
                  :index="valueIndex" />
              </template>
            </BaseFormFieldCreator>

            <!-- if there is field content show a 'remove all content' button -->
            <div
              v-if="!multiplyButtonsInline(element) && (checkFieldContent(valueList[element.name])
                || valueListInt[element.name].length > 1)"
              :key="`${index}_button_${valueIndex}_${formId}`"
              class="group-add">
              <button
                class="field-group-button"
                type="button"
                @click.prevent="removeField(element, valueIndex)">
                <span>
                  {{ valueListInt[element.name].length === 1
                    ? getI18nTerm('form.clearField') || 'Clear'
                    : getI18nTerm('form.removeField', -1, { fieldType: getFieldName(element) }) }}
                </span>
                <span>
                  <base-icon
                    class="field-group-icon"
                    name="remove" />
                </span>
              </button>
            </div>
            <template
              v-if="multiplyButtonsInline(element)">
              <div
                class="base-form__inline-icons">
                <base-icon
                  v-if="checkFieldContent(valueList[element.name])
                    || valueListInt[element.name].length > 1"
                  :title="valueListInt[element.name].length === 1
                    ? getI18nTerm('form.clearField') || 'Clear'
                    : getI18nTerm('form.removeField', -1, { fieldType: getFieldName(element) })"
                  role="button"
                  tabindex="0"
                  class="base-form__inline-icon"
                  name="remove"
                  @click.native="removeField(element, valueIndex)"
                  @keydown.enter.native="removeField(element, valueIndex)" />
                <base-icon
                  :title="valueIndex !== (valueListInt[element.name].length - 1)
                    ? getI18nTerm('form.addGroupBelow', -1, {
                      fieldType: getFieldName(element),
                    }) : getI18nTerm('form.addGroup', -1, {
                      fieldType: getFieldName(element),
                    })"
                  role="button"
                  tabindex="0"
                  class="base-form__inline-icon"
                  name="plus"
                  @click.native="multiplyField(element, valueIndex)"
                  @keydown.enter.native="multiplyField(element, valueIndex)" />
              </div>
            </template>
          </div>
          <!-- multiply button -->
          <div
            v-if="!multiplyButtonsInline(element)"
            :key="'multiplyButton' + index"
            class="group-multiply">
            <button
              class="field-group-button"
              type="button"
              @click.prevent="multiplyField(element)">
              <span>
                {{ getI18nTerm('form.addGroup', -1, {
                  fieldType: getFieldName(element),
                }) }}
              </span>
              <span>
                <base-icon
                  class="field-group-icon"
                  name="plus" />
              </span>
            </button>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';
import i18n from '../../mixins/i18n';
import BaseFormFieldCreator from '../BaseFormFieldCreator/BaseFormFieldCreator';

/**
 * Component creating a form according to a provided [openAPI](https://www.openapis.org/) standard
 */

// list all the fieldProps here that can be set individually for each repeatable field
const INDIVIDUAL_REPEATABLE_FIELDPROPS = [
  'errorMessage',
  'invalid',
  'isActive',
  'isLoading',
  'linkedListOption',
  'activeTab',
  'validationTexts',
];

export default {
  name: 'BaseForm',
  components: {
    BaseFormFieldCreator,
    BaseIcon,
  },
  mixins: [i18n],
  props: {
    /**
     * the json object containing all the field information incl. `x-attrs` custom field
     * for placeholder, field type, etc. (for further documentation and configuration options see
     * further down below [slots](BaseForm.html#slots))
     */
    formFieldJson: {
      type: Object,
      required: true,
    },
    /**
     * the values for each field if any already present
     */
    valueList: {
      type: Object,
      default: () => ({}),
    },
    /**
     * set current language
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * provide information about all available languages
     */
    availableLocales: {
      type: Array,
      default: () => [],
    },
    /**
     * an id for field groups to still have unique field ids
     */
    formId: {
      type: String,
      default: '',
    },
    /**
     * define additional style for the form
     * should be an object e.g. `{ 'padding-top': 0 }`
     */
    formStyle: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define fields (specify field name!) for which tabs should be shown
     */
    fieldsWithTabs: {
      type: Array,
      default: () => [],
    },
    /**
     * enter the field name of a field that is currently fetching autocomplete
     * results
     */
    fieldIsLoading: {
      type: String,
      default: '',
    },
    /**
     * provide an object that contains the options list for all
     * fields with autocomplete / chips input
     * for field type `group` provide a nested object with field names
     * as properties and an array for each field to ensure the correct options are assigned
     * even if field names within different groups are identical
     */
    dropDownLists: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define if error icon should be shown.
     * for an example on how it looks on an individual form field see [BaseInput](BaseInput)
     */
    showErrorIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * if `true` a remove icon will be shown allowing to remove
     * all input at once.
     * for an example on how it looks on an individual form field see [BaseInput](BaseInput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * provide an object with settings and properties for each field. This takes an object
     * with the field name as properties with the props nested.
     * `{ [fieldName1]: { required: false, ... }, [fieldName2]: { ... } }`
     *
     * find the possible variables at the respective input components:
     * [BaseInput](BaseInput)
     * [BaseAutocompleteInput](BaseAutocompleteInput)
     * [BaseMultilineTextInput](BaseMultilineTextInput)
     * [BaseChipsInput](BaseChipsInput)
     * [BaseChipsBelow](BaseChipsBelow)
     * [BaseDateInput](BaseDateInput)
     * [BaseToggle](BaseToggle)
     *
     * **special case repeatable fields**: the following field props can be set individually
     * per repeated field:
     *  `errorMessage`, `invalid`, `isActive`, `isLoading`,
     *  `linkedListOption`, `activeTab`
     *  the field property value should be set as object specifying the field index as key:
     *  `{ [fieldIndex]: [value to be set] }` (e.g. `{ required: { 0: false }}`)
     */
    fieldProps: {
      type: Object,
      default: () => ({}),
      validator: val => Object.keys(val).length === 0 || Object.values(val)
        .every(fieldProps => Object.keys(fieldProps)),
    },
    /**
     * in case the field `form_group_title` was added to the `x-attrs` field, this is
     * is rendered as a header above the form and here the HTML tag may be defined.
     */
    renderHeaderAs: {
      type: String,
      default: 'div',
    },
    /**
     * define validation texts to be displayed below form field if input is invalid.
     * for an example see [BaseInput](BaseInput)
     */
    validationTexts: {
      type: Object,
      default: () => ({
        text: {
          min: 'Value must be greater than or equal to {value}.',
          max: 'Value must be less than or equal to {value}.',
          minLength: 'Text must be at least {value} character(s) long.',
          maxLength: 'Text cannot be longer than {value} characters.',
        },
        chips: {
          required: 'Select an option.',
        },
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['text'].every(prop => Object.keys(val).includes(prop))
        && ['min', 'max', 'minLength', 'maxLength']
          .every(prop => Object.keys(val.text).includes(prop)),
    },
    /**
     * specify the object property that should be used as identifier.
     * used for chips input as well as dropdowns.
     */
    identifierPropertyName: {
      type: String,
      default: 'source',
    },
    /**
     * specify the object property that should be used as value to be displayed.
     * used for chips input as well as dropdowns.
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      /**
       * variable to be able to focus to the field after multiply
       * @type {?Object}
       * @property {number} index - the index of the new field in the array
       * @property {string} name - the name of the field
       */
      multiplyParams: null,
      /**
       * remember the field for which autocomplete is fetching
       * @type {string}
       */
      fetchingAutocompleteFor: '',
      /**
       * variable saving the current field input string during
       * autocomplete functionality
       * @type {string}
       */
      currentInputString: '',
      /**
       * internal representation of valueList (containing values for all input fields)
       * @type {Object}
       * @property {?string|?Array|?Object} [the name of the input field]
       */
      valueListInt: {},
    };
  },
  computed: {
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // stop custom events from bubbling up - we just want native events from input
          'field-value-changed': () => {},
          'values-changed': () => {},
          'fetch-autocomplete': () => {},
          'input-complete': () => {},
        },
      };
    },
    /**
     * get a list of all form fields that are taking half of the
     * width of a form
     * @returns {Object[]}
     */
    formFieldsHalf() {
      return this.formFieldListInt.filter(field => field['x-attrs'] && field['x-attrs'].field_format === 'half');
    },
    /**
     * internal form field list, sorted and with additional name property to save
     * the name of the input field in a variable, also filtered from fields that
     * should not be shown
     *
     * @returns {Object[]}
     * @property {string} name - the name of the input field
     * @property {*} [*] all other properties contained in the swagger
     */
    formFieldListInt() {
      return Object.keys(this.formFieldJson)
        // filter out hidden properties and $ref property from JSON
        .filter(key => !this.formFieldJson[key].$ref
          && !(this.formFieldJson[key]['x-attrs'] && this.formFieldJson[key]['x-attrs'].hidden))
        .map(key => ({ ...{ name: key }, ...this.formFieldJson[key] }))
        // sort the fields according to their x-attribute (order)
        .sort((a, b) => {
          if (a['x-attrs'] && b['x-attrs']) {
            if (a['x-attrs'].order > b['x-attrs'].order) {
              return 1;
            }
            return -1;
          }
          return -1;
        });
    },
    /**
     * get the title string for the form header if one was set in the OpenAPI definition
     * @returns {string}
     */
    formHeader() {
      // find a field with the x-attr form_group_title (formFieldListInt is already sorted
      // by order x-attr so the the title of the field with the lowest order will automatically
      // be chosen
      const groupTitleField = this.formFieldListInt
        .find(field => field['x-attrs'] && field['x-attrs'].form_group_title);
      // return the title string for the header to set if one was found
      return groupTitleField ? groupTitleField['x-attrs'].form_group_title : '';
    },
  },
  watch: {
    valueList: {
      handler(val) {
        const changedValues = Object.keys(this.valueListInt)
          .some(key => JSON.stringify(this.valueListInt[key]) !== JSON.stringify(val[key]));
        if (changedValues) {
          this.initializeValueObject();
        }
      },
      deep: true,
    },
    formFieldJson: {
      handler() {
        // if new field specifications were set - also reset the properties of the value object
        this.valueListInt = {};
        // initialize value object with new properties
        this.initializeValueObject();
      },
      immediate: true,
    },
  },
  updated() {
    if (this.multiplyParams && this.multiplyParams.name) {
      const elements = this.$refs[this.multiplyParams.name];
      if (elements.length) {
        // this seems like a stupid hack however had to do this because if 'getElementsByTagName'
        // was evaluated immediately it came back empty for 'textarea' since for some reason
        // this was not in the DOM tree yet... (no problems for input fields / subforms tho)
        setTimeout((params) => {
          const inputs = elements[params.index].getElementsByTagName('textarea').length
            ? elements[params.index].getElementsByTagName('textarea')
            : elements[params.index].getElementsByTagName('input');
          if (inputs.length) {
            inputs[0].focus();
          }
        }, 50, this.multiplyParams);
      }
      this.multiplyParams = null;
    }
  },
  methods: {
    fetchAutocomplete(params) {
      this.currentInputString = params.value;
      this.fetchingAutocompleteFor = params.name;
      /**
       * triggered if field has an autocomplete functionality
       * (chips-input, autocomplete-input, chips-below-input)
       *
       * @event fetch-autocomplete
       *
       * @property {string} value - the string to autocomplete
       * @property {string} name - the name of the field
       * @property {string} source - the url to request the data from
       * @property {?string} equivalent - string specified for related fields. e.g. for contributor roles equivalent is `contributor`
       * @property {?string[]} parentFields - in case the autocomplete event originates from a subform the subform id's (field property names) are specififed in this array (most nested property last)
       */
      this.$emit('fetch-autocomplete', params);
    },
    /**
     * function triggered when an input field input was completed (e.g. an option selected in chips input or
     *  an enter key triggered in BaseInput or after a date was validated)
     *
     * @param {string|number|Object|Array} value - the updated value
     * @param {string} fieldName - the name of the field in question
     * @param {number} index - if field is repeatable - the index in the valueList array
     */
    onInputComplete(value, fieldName, index = -1) {
      // update the valueListInt
      this.setFieldValue(value, fieldName, index);
      /**
       * event emitted once an input was completed (e.g. an option selected in chips input or
       *  an enter key triggered in BaseInput or after a date was validated)
       *  @event input-complete
       *  @property {string, number, Object, Array} - the updated value
       */
      this.$emit('input-complete', this.valueListInt);
    },
    // check if field can be multiplied
    allowMultiply(el) {
      // field can be multiplied if it is an array and not a chips or chips-below
      // field
      return el.type === 'array' && (!el['x-attrs'] || !el['x-attrs'].field_type || (el['x-attrs']
        && !['chips', 'chips-below'].includes(el['x-attrs'].field_type)));
    },
    multiplyButtonsInline(el) {
      return !['group', 'multiline'].includes(el['x-attrs'].field_type);
    },
    // triggered on user clicking multiply button
    multiplyField(field, index) {
      // get the initialized new field values
      const newFieldValues = this.getInitialFieldValue(field.items);
      // check if function call is coming from an input field where field can only be
      // inserted at last position
      if (!index && index !== 0) {
        // add field at the end of array
        this.valueListInt[field.name].push(newFieldValues);
        // else its coming from an inline repeatable field
      } else {
        // insert at the correct level
        this.valueListInt[field.name].splice(index + 1, 0, newFieldValues);
      }
      this.multiplyParams = {
        index: !index && index !== 0
          ? this.valueListInt[field.name].length - 1 : index + 1,
        name: field.name,
      };
      // inform parent of changes
      this.propagateValueListChanges();
    },
    // remove multiplied field again
    removeField(field, index) {
      const fieldGroupValues = this.valueListInt[field.name];
      // only splice off group if more than one field visible
      if (fieldGroupValues && fieldGroupValues.length > 1) {
        fieldGroupValues.splice(index, 1);
        // else just clear the fields
      } else {
        this.$set(fieldGroupValues, index, this.getInitialFieldValue(field.items));
      }
      // inform parent of changes
      this.propagateValueListChanges();
    },
    propagateValueListChanges() {
      /**
       * event triggered when the values of a field were altered or a form
       * field was added or removed
       *
       * @event values-changed
       * @param {Object[]} - the changed value list
       * @param {Object} - the field information of the changed field
       */
      this.$emit('values-changed', this.valueListInt);
    },
    // check if field is half field and the second of two halves
    isHalfFieldSecond(field) {
      const index = this.formFieldsHalf.indexOf(field);
      return index > 0 && !!(index % 2);
    },
    getFieldName(val) {
      return val.title || this.getI18nTerm(`form.${val.name}` || val.name);
    },
    formFieldComponentProps(element, index, valueIndex) {
      // get the element.name for easier access
      const { name } = element;
      // get all fieldProps of that field if set, otherwise set empty array
      // important to create an independent copy because properties eventually get deleted
      // later on
      let singleFieldProps = this.fieldProps[name]
        ? JSON.parse(JSON.stringify(this.fieldProps[name])) : {};
      // store in variable if field is repeatable
      const fieldRepeatable = valueIndex >= 0;
      // check if field is repeatable
      if (fieldRepeatable) {
        // if yes get the field Props that are actually settable for each field individually
        // and present in the fieldProps object
        const existingIndividualFieldProps = Object.entries(singleFieldProps)
          .filter(([key]) => INDIVIDUAL_REPEATABLE_FIELDPROPS.includes(key));
        // now check if any individually settable field props were found for the field
        if (existingIndividualFieldProps.length) {
          // now get an object that only contains the fieldProps of repeatable fields where the
          // index is present in the value object
          // otherwise delete the value object from the fieldProps completely (since usually not
          // compatible with actual fieldProp type and values not usable
          const repeatableFieldProps = existingIndividualFieldProps.reduce((prev, [key, value]) => {
            // check if the input field index exists as a key in the value object
            if (Object.keys(value).includes(valueIndex.toString())) {
              // if yes - add it to the object with the appropriate value
              return {
                ...prev,
                [key]: value[valueIndex.toString()],
              };
            }
            // else delete the fieldProp from the fieldProps object completely
            delete singleFieldProps[key];
            // and just return the unmodified object
            return prev;
          }, {});
          // finally actually combine the original fieldProps object with the properties settable
          // per repeated field
          singleFieldProps = {
            ...singleFieldProps,
            ...repeatableFieldProps,

          };
        }
      }
      // create a unique string for identifier(key) purposes out of field index
      // and (if field is repeatable) value index
      const comboIndex = fieldRepeatable ? `${index}_${valueIndex}` : index;

      return {
        field: element,
        label: singleFieldProps && singleFieldProps.label
          ? singleFieldProps.label : this.getFieldName(element),
        fieldProps: singleFieldProps,
        showLabel: !this.allowMultiply(element)
          || !this.multiplyButtonsInline(element) || valueIndex === 0,
        dropDownList: this.dropDownLists[name],
        secondaryDropdown: this.dropDownLists[`${name}_secondary`],
        language: this.language,
        availableLocales: this.availableLocales,
        sortText: this.getI18nTerm('form.sort') || 'Sort',
        fieldKey: `${name}_${comboIndex}_${this.formId}`,
        fieldValue: fieldRepeatable ? this.valueListInt[name][valueIndex]
          : this.valueListInt[name],
        autocompleteLoading: this.fieldIsLoading === name,
        // add component props to form fields creator props if list contains a field_type 'group'
        fieldGroupParams: this.formFieldListInt
          .some(field => field['x-attrs'] && field['x-attrs'].field_type === 'group')
          ? this.$props : null,
        clearable: this.clearable,
        showErrorIcon: this.showErrorIcon,
        validationTexts: singleFieldProps.validationTexts || this.validationTexts,
        identifierPropertyName: this.identifierPropertyName,
        labelPropertyName: this.labelPropertyName,
      };
    },
    setFieldValue(value, fieldName, index = -1) {
      this.currentInputString = '';
      if (index >= 0) {
        this.$set(this.valueListInt[fieldName], index, JSON.parse(JSON.stringify(value)));
      } else {
        this.$set(this.valueListInt, fieldName, value ? JSON.parse(JSON.stringify(value)) : value);
      }
      this.$emit('values-changed', this.valueListInt);
    },
    initializeValueObject() {
      this.formFieldListInt.forEach((field) => {
        this.$set(
          this.valueListInt,
          field.name,
          this.getInitialFieldValue(field),
        );
      });
    },
    getInitialFieldValue(field) {
      // get the current field value
      const value = this.valueList[field.name];
      // get the OpenAPI definition field type
      const { type } = field;
      // get the OpenAPI x-attrs (that we use for form config) field type
      const xAttrsFieldType = field['x-attrs'] && field['x-attrs'].field_type
        ? field['x-attrs'].field_type : undefined;
      // valid types in OpenAPI definition are 'number' and 'integer'
      if (['number', 'integer'].includes(type)) {
        return value || '';
      }
      // check special case single-choice chips (is chips but is saved as
      // (multilang) object on backend)
      if (xAttrsFieldType && xAttrsFieldType.includes('chips')
        && type === 'object') {
        if (value && Object.keys(value).length) {
          return [].concat(value);
        }
        return [];
      }
      // check if field is array
      if (type === 'array') {
        // check if values are already present and set those if yes
        if (typeof value === 'object' && value && value.length) {
          return [].concat(value);
        }
        if (!field['x-attrs'] || !field['x-attrs'].field_type
          || (xAttrsFieldType && !xAttrsFieldType.includes('chips'))) {
          return [].concat(this.getInitialFieldValue(field.items));
        }
        // else return empty array
        return [];
        // check if field is object
      } if (type === 'object') {
        const initObj = {};
        // for each property in the object also get initial values
        Object.keys(field.properties).forEach((key) => {
          this.$set(initObj, key, this.getInitialFieldValue(field.properties[key]));
        });
        return ({ ...initObj, ...value });
      }

      // check if field is boolean
      if (type === 'boolean') {
        return value || false;
      }
      // if it is not an array or object simply return value from list or empty string
      return (typeof value === 'string' ? value : '');
    },
    checkFieldContent(fieldValues) {
      let hasContent = false;
      if (fieldValues && typeof fieldValues === 'object') {
        if (fieldValues.length >= 0) {
          fieldValues.forEach((values) => {
            hasContent = this.checkFieldContent(values) || hasContent;
          });
        } else {
          const objectKeys = Object.keys(fieldValues);
          objectKeys
            .forEach((key) => {
              hasContent = this.checkFieldContent(fieldValues[key]) || hasContent;
            });
        }
      } else {
        hasContent = fieldValues === 0 || !!fieldValues || hasContent;
      }
      return hasContent;
    },
    /**
     * Trigger public validate function for each form component
     * Note: Currently a validation function is only implemented for baseChipsBelow
     *
     * @public
     * @returns {boolean} - forms error state
     */
    validate() {
      const errors = [];
      // get form elements to iterate through
      const formFields = this.$refs.baseFormField;
      // iterate through all form fields, trigger components validation function and
      // set error state if needed
      formFields.forEach((field) => {
        if (Object.keys(field.$refs).length) {
          // get first ref name
          const refName = Object.keys(field.$refs)[0];
          // check if component has a validate function
          if (field.$refs[refName].validate !== undefined) {
            // validate component
            const hasErrors = field.$refs[refName].validate();
            // set error state if needed
            if (hasErrors) { errors.push(hasErrors); }
          }
        }
      });
      // return error state
      return !!errors.length;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-form {
    .base-form__header {
      margin: $spacing-small $spacing;
      color: $font-color-second;
    }

    .base-form__body {
      background-color: white;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: $spacing $spacing 0;

      .base-form-field {
        margin-bottom: $spacing;
      }

      .base-form-field-full, .group-multiply {
        flex: 0 0 100%;
      }

      .base-form-field-half {
        // needed to add the 0.01rem for edge...
        flex: 0 1 calc(50% - #{$spacing-small} - 0.01rem);
        max-width: calc(50% - #{$spacing-small} - 0.01rem);
      }

      .base-form-field-left-margin {
        margin-left: $spacing;
      }

      .base-form-field-top-margin {
        margin-top: $line-height + $spacing-small;
      }

      .group-multiply {
        margin-bottom: $spacing + $spacing-small;
      }

      .group-add {
        margin-top: $spacing;
      }

      .field-group-button {
        color: $font-color-second;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background-color: inherit;
        border: none;

        &:hover {
          color: $app-color;
          fill: $app-color;
        }

        .field-group-icon {
          flex: 0 0 auto;
          margin: 0 $spacing;
          height: $icon-small;
          width: $icon-small;
        }

        &:focus .field-group-icon {
          fill: $app-color;
        }
      }
    }
  }

  .base-form-field__text-before {
    margin-right: $spacing-small;
  }

  .base-form-field__text-after {
    margin-left: $spacing-small;
  }

  .base-form-field__multiple__inline {
    display: flex;
    align-items: flex-start;

    &.base-form-field__multiple__inline--has-title {
      .base-form__inline-icons {
        margin-top: $line-height + $spacing-small;
      }
    }

    .base-form-field__multiple__inline-element {
      flex: 1 1 auto;
    }

    .base-form__inline-icons {
      margin-left: $spacing-small;
      flex: 0 0 auto;
      min-height: $row-height-small;
      display: flex;
      align-items: center;

      .base-form__inline-icon {
        height: $icon-medium;
        width: $icon-medium;
        flex: 0 0 auto;
        color: $font-color-second;
        margin: $spacing-small;
        cursor: pointer;

        &:hover, &:focus, &:active {
          color: $app-color;
        }
      }
    }
  }

  @media screen and (max-width: 870px) {
    .base-form {
      .base-form__body {
        .base-form-field-half {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .base-form-field-left-margin {
          margin-left: 0;
        }

        .base-form-field-top-margin {
          margin-top: 0;
        }
      }
    }

  }

  @media screen and (max-width: $mobile) {
    .base-form {
      .base-form__body {
        padding: $spacing $spacing-small $spacing-small;

        .base-form-field {
          margin-bottom: $spacing-small;
        }

        .base-form-field-half {
          flex: 0 0 100%;
        }

        .base-form-field-left-margin {
          margin-left: 0;
        }

        .group-multiply {
          margin-bottom: $spacing-small + $spacing-small-half;
          margin-top: $spacing-small;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../styles/variables.scss";

  @media screen and (min-width: $mobile) {
    .base-form-field {
      .base-drop-down-list__container {
        max-width: calc(100% - #{$spacing} * 2);
      }

      .base-form-subform-wrapper {
        .base-drop-down-list__container {
          max-width: calc(100% - #{$spacing} * 4.5 - 3px);
        }

        .base-form-field-left-margin {
          .base-drop-down-list__container {
            right: calc(#{$spacing} * 2.5 - 3px);
          }
        }
      }
    }
  }
</style>
