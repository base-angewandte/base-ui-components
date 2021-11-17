<template>
  <div
    class="base-form"
    :style="formStyle">
    <template v-for="(element, index) in formFieldListInt">
      <!-- SINGLE FORM FIELD -->
      <BaseFormFieldCreator
        v-if="!allowMultiply(element)"
        :key="`${element.name}_${index}_${formId}`"
        :class="['base-form-field',
                 formFieldsHalf.indexOf(element) >= 0
                   ? 'base-form-field-half' : 'base-form-field-full',
                 { 'base-form-field-left-margin': isHalfFieldSecond(element)}]"
        v-bind="formFieldComponentProps(element, index)"
        @field-value-changed="setFieldValue($event, element.name)"
        @fetch-autocomplete="fetchAutocomplete" />

      <!-- ALLOW FOR MULTIPLE VALUES PER FIELD -->
      <template v-else>
        <!-- wrapper around form field group and remove button -->
        <div
          v-for="(value, valueIndex) in valueListInt[element.name]"
          :ref="element.name"
          :key="`${element.name}_${index}_${valueIndex}_${formId}_wrapper`"
          :class="['base-form-field',
                   formFieldsHalf.indexOf(element) >= 0
                     ? 'base-form-field-half' : 'base-form-field-full',
                   { 'base-form-field-left-margin': isHalfFieldSecond(element)}]">
          <BaseFormFieldCreator
            :key="`${element.name}_${index}_${valueIndex}_${formId}`"
            v-bind="formFieldComponentProps(element, index, valueIndex)"
            @field-value-changed="setFieldValue(
              $event,
              element.name,
              valueIndex,
              (element['x-attrs'] ? element['x-attrs'].equivalent : ''))"
            @fetch-autocomplete="fetchAutocomplete"
            @subform-input="setFieldValue($event, element.name, valueIndex)" />

          <!-- if there is field content show a 'remove all content' button -->
          <div
            v-if="checkFieldContent(valueList[element.name])
              || valueListInt[element.name].length > 1"
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
        </div>
        <!-- multiply button -->
        <div
          :key="'multiplyButton' + index"
          class="group-multiply">
          <button
            class="field-group-button"
            type="button"
            @click.prevent="multiplyField(element)">
            <span>
              {{ getI18nTerm('form.addGroup', -1, {
                fieldType: getFieldName(element)
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
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';
import i18n from '../../mixins/i18n';

/**
 * Component creating a form according to a provided [openAPI](https://www.openapis.org/) standard
 */

export default {
  name: 'BaseForm',
  components: {
    BaseFormFieldCreator: () => import('../BaseFormFieldCreator/BaseFormFieldCreator'),
    BaseIcon,
  },
  mixins: [i18n],
  props: {
    /**
     * the json object containing all the field information incl. x-attributes
     * for placeholder, field type, etc.
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
     * should be an object eg. { 'padding-top': 0 }
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
     * provide a object that contains the options list for all
     * fields with autocomplete / chips input
     */
    dropDownLists: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define if error icon should be shown<br>
     * for an example on how it looks on an individual form field see [BaseInput](#baseinput)
     */
    showErrorIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * if true a remove icon will be shown allowing to remove
     * all input at once<br>
     * for an example on how it looks on an individual form field see [BaseInput](#baseinput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * provide an object with settings and properties for each field, this is used to set
     * `required`, `invalid`, `errorMessage` for each field this is applicable to<br>
     * for an example on how these properties look on an individual form field
     * see [BaseInput](#baseinput)
     */
    fieldProps: {
      type: Object,
      default: () => ({
        required: false,
        invalid: false,
        errorMessage: '',
      }),
      validator: val => Object.values(val)
        .every(fieldProps => Object.keys(fieldProps)
          .every(fieldProp => ['required', 'invalid', 'errorMessage'].includes(fieldProp))),
    },
  },
  data() {
    return {
      /**
       * variable to be able to focus to the field after multipy
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
       * @param {Object} params - the spread object with following properties
       * @property {string} value - the string to autocomplete
       * @property {string} name - the name of the field
       * @property {string} source - the url to request the data from
       * @property {?string} equivalent - string specified for related fields
       * e.g. for contributor roles equivalent is 'contributor'
       */
      this.$emit('fetch-autocomplete', params);
    },
    // check if field can be multiplied
    allowMultiply(el) {
      // field can be multiplied if it is an array and not a chips or chips-below
      // field
      return el.type === 'array' && el['x-attrs']
        && !['chips', 'chips-below'].includes(el['x-attrs'].field_type);
    },
    // triggered on user clicking multiply button
    multiplyField(field) {
      this.valueListInt[field.name]
        .push(this.getInitialFieldValue(field.items));
      this.multiplyParams = { index: this.valueListInt[field.name].length - 1, name: field.name };
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
       * @param {Object[]} valueListInt
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
      const comboIndex = valueIndex >= 0 ? `${index}_${valueIndex}` : index;
      const elementProps = this.fieldProps[element.name];
      return {
        field: element,
        label: this.getFieldName(element),
        dropDownList: this.dropDownLists[element.name],
        secondaryDropdown: this.dropDownLists[`${element.name}_secondary`],
        language: this.language,
        availableLocales: this.availableLocales,
        sortText: this.getI18nTerm('form.sort') || 'Sort',
        fieldKey: `${element.name}_${comboIndex}_${this.formId}`,
        fieldValue: valueIndex >= 0 ? this.valueListInt[element.name][valueIndex]
          : this.valueListInt[element.name],
        autocompleteLoading: this.fieldIsLoading === element.name,
        // add component props to form fields creator props if list contains a field_type 'group'
        fieldGroupParams: this.formFieldListInt
          .some(field => field['x-attrs'] && field['x-attrs'].field_type === 'group')
          ? this.$props : null,
        clearable: this.clearable,
        showErrorIcon: this.showErrorIcon,
        required: elementProps ? elementProps.required : false,
        errorMessage: elementProps ? elementProps.errorMessage : '',
        invalid: elementProps ? elementProps.invalid : false,
      };
    },
    setFieldValue(value, fieldName, index) {
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
      const value = this.valueList[field.name];
      if (field.type === 'integer') {
        return value ? value.toString() : '';
      }
      // check special case single-choice chips (is chips but is saved as
      // (multilang) object on backend)
      if (field['x-attrs'] && field['x-attrs'].field_type
        && field['x-attrs'].field_type.includes('chips')
        && field.type === 'object') {
        if (value && Object.keys(value).length) {
          return [].concat(value);
        }
        return [];
      }
      // check if field is array
      if (field.type === 'array') {
        // check if values are already present and set those if yes
        if (typeof value === 'object' && value && value.length) {
          return [].concat(value);
        }
        if (field['x-attrs'] && !field['x-attrs'].field_type.includes('chips')
          && field.items.type === 'object') {
          return [].concat(this.getInitialFieldValue(field.items));
        }
        // else return empty array
        return [];
        // check if field is object
      } if (field.type === 'object') {
        const initObj = {};
        // for each property in the object also get initial values
        Object.keys(field.properties).forEach((key) => {
          this.$set(initObj, key, this.getInitialFieldValue(field.properties[key]));
        });
        return ({ ...initObj, ...value });
      }

      // check if field is boolean
      if (field.type === 'boolean') {
        return value;
      }

      // if it is not a array or object simply return value from list or empty string
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables.scss";

  .base-form {
    background-color: white;
    display: flex;
    align-items: baseline;
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
    }

    .base-form-field-left-margin {
      margin-left: $spacing;
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

  @media screen and (max-width: 870px) {
    .base-form {
      .base-form-field-half {
        flex: 0 0 100%;
      }

      .base-form-field-left-margin {
        margin-left: 0;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .base-form {
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
        margin-bottom: $spacing-small + ($spacing-small/2);
        margin-top: $spacing-small;
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

      .base-form-field-left-margin {
        .base-drop-down-list__container {
          right: $spacing;
        }
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
