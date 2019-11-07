<template>
  <div class="base-form">
    <template v-for="(element, index) in formFieldListInt">
      <!-- SINGLE FORM FIELD -->
      <BaseFormFieldCreator
        v-if="allowMultiply(element)
        :key="`${element.name}_${index}`"
        :field-key="`${element.name}_${index}`"
        :field-value="valueListInt[element.name]"
        :autocomplete-loading="fieldIsLoading === element.name"
        v-bind="formFieldComponentProps"
        :class="['base-form-field',
                 formFieldsHalf.indexOf(element) >= 0
                   ? 'base-form-field-half' : 'base-form-field-full',
                 { 'base-form-field-left-margin': isHalfFieldSecond(element)}]"
        @field-value-changed="setFieldValue($event, element.name)"
        @fetch-autocomplete="fetchAutocomplete" />

      <!-- ALLOW FOR MULTIPLE VALUES PER FIELD -->
      <template ">
        <div
          v-for="(value, valueIndex) in valueListInt[element.name]"
          :ref="element.name"
          :key="`${element.name}_${index}_${valueIndex}_wrapper`"
          :class="['base-form-field',
                   formFieldsHalf.indexOf(element) >= 0
                     ? 'base-form-field-half' : 'base-form-field-full',
                   { 'base-form-field-left-margin': isHalfFieldSecond(element)}]">
          <BaseFormFieldCreator
            :key="`${element.name}_${index}_${valueIndex}`"
            :field-key="`${element.name}_${index}_${valueIndex}`"
            :field-value="value"
            v-bind="formFieldComponentProps"
            @field-value-changed="setFieldValue(
              $event,
              element.name,
              valueIndex,
              (element['x-attrs'] ? element['x-attrs'].equivalent : ''))"
            @fetch-autocomplete="fetchAutocomplete"
            @subform-input="setFieldValue($event, element.name, valueIndex)" />
          <div
            v-if="checkFieldContent(valueList[element.name])
            || valueListInt[element.name].length > 1"
            :key="index + '-button-' + valueIndex"
            class="group-add">
            <button
              class="field-group-button"
              type="button"
              @click.prevent="removeField(element, valueIndex)">
              <span>{{ valueListInt[element.name].length === 1
                ? getI18nTerm('form.clearField') || 'Clear'
              : getI18nTerm('form.removeField', -1, { fieldType: getFieldName(element) }) }}</span>
              <span>
                <RemoveIcon
                  class="field-group-icon" />
              </span>
            </button>
          </div>
        </div>
        <div
          :key="'multiplyButton' + index"
          class="group-multiply">
          <button
            class="field-group-button"
            type="button"
            @click.prevent="multiplyField(element)">
            <span>{{ getI18nTerm('form.addGroup', -1, {
              fieldType: getFieldName(element)
            }) }}</span>
            <span>
              <PlusIcon
                class="field-group-icon" />
            </span>
          </button>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import BaseFormFieldCreator from '../BaseFormFieldCreator/BaseFormFieldCreator';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseForm',
  components: {
    BaseFormFieldCreator,
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
      default() {
        return {};
      },
    },
    /**
     * any drop down lists that already have values
     */
    prefetchedDropDownLists: {
      type: Object,
      default() {
        return {};
      },
    },
    language: {
      type: String,
      default: 'en',
    },
    availableLocales: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // the form values
      valueListInt: {},
      // the drop down lists necessary for form fields with drop downs
      dropdownLists: {},
      // TODO: remove since only necessary for autocomplete fetch
      // (moved to parent)
      timeout: null,
      // variable to specify a field that is currently loading autocomplete data
      fieldIsLoading: '',
      // variable to be able to focus to the field after multipy
      multiplyParams: null,
    };
  },
  computed: {
    // get a list of all form fields that are taking have of the
    // width of a form
    formFieldsHalf() {
      return this.formFieldListInt.filter(field => field['x-attrs'] && field['x-attrs'].field_format === 'half');
    },
    formFieldListInt() {
      return Object.keys(this.formFieldJson)
        // filter out hidden properties and $ref property from JSON
        .filter(key => !this.formFieldJson[key].$ref
          && !(this.formFieldJson[key]['x-attrs'] && this.formFieldJson[key]['x-attrs'].hidden))
        .map(key => Object.assign({}, { name: key }, this.formFieldJson[key]))
        // sort the fields according to their x-attribute (order)
        .sort((a, b) => {
          if (a['x-attrs'] && b['x-attrs']) {
            if (a['x-attrs'].order > b['x-attrs'].order) {
              return 1;
            }
            return -1;
          }
          return -1;
        })
        // set an initial field value according to the field type
        .forEach((field) => {
          this.$set(
            this.valueListInt,
            field.name,
            this.getInitialFieldValue(field),
          );
        });
    },
  },
  watch: {
    valueList: {
      handler(val) {
        const changedValues = Object.keys(this.valueListInt)
          .some(key => JSON.stringify(this.valueListInt[key]) !== JSON.stringify(val[key]));
        if (changedValues) {
          console.log('values changed');
        }
      },
      deep: true,
    },
    formFieldJson: {
      handler() {
        // if new field specifications were set - also reset the properties of the value object
        this.valueListInt = {};
        // initialize value object with new properties
      },
      immediate: true,
    },
    prefetchedDropDownLists(val) {
      Object.keys(val).forEach((dropDown) => {
        if ((val[dropDown] && val[dropDown].length)
          && (!this.dropdownLists[dropDown] || !this.dropdownLists[dropDown].length)) {
          this.setDropDown(val[dropDown], '', '', dropDown);
        }
      });
    },
  },
  updated() {
    if (this.multiplyParams && this.multiplyParams.name) {
      const elements = this.$refs[this.multiplyParams.name];
      if (elements.length) {
        const inputs = elements[this.multiplyParams.index].getElementsByTagName('textarea').length
          ? elements[this.multiplyParams.index].getElementsByTagName('textarea')
          : elements[this.multiplyParams.index].getElementsByTagName('input');
        if (inputs.length) {
          inputs[0].focus();
        }
      }
      this.multiplyParams = null;
    }
  },
  methods: {
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
    },
    // remove multiplied field again
    removeField(field, index) {
      if (index) {
        this.valueListInt[field.name].splice(index, 1);
        this.$emit('values-changed', this.valueListInt);
      } else {
        this.$set(this.valueList, field.name, this.getInitialFieldValue(field.items));
      }
    },
    // check if field is half field and the second of two halves
    isHalfFieldSecond(field) {
      const index = this.formFieldsHalf.indexOf(field);
      return index > 0 && !!(index % 2);
    },
    getFieldName(val) {
      return val.title || this.getI18nTerm(`form.${val.name}` || val.name);
    },
    formFieldComponentProps(element) {
      return {
        field: element,
        tabs: this.availableLocales,
        dropDownList: this.dropdownLists[element.name],
        secondaryDropdown: this.dropdownLists[`${element.name}_secondary`],
        language: this.language,
        availableLocales: this.availableLocales,
        sortText: this.getI18nTerm('form.sort') || 'Sort',
      };
    },
    setFieldValue(value, fieldName, index) {
      if (this.dropdownLists[fieldName]) {
        // TODO: move this to parent!
        // cancel a potentially still ongoing autocomplete search as soon as
        // a value was selected
        // if (cancel) {
        // this.fieldIsLoading = '';
        // cancel('value already selected');
        // }
        const fieldAttrs = this.formFieldJson[fieldName]['x-attrs'];
        // reset the dropdownlist for dynamic autosuggest
        if (fieldAttrs.dynamic_autosuggest) {
          this.setDropDown([], '', fieldAttrs.equivalent, fieldName);
        }
        // if the field has contributors as equivalent set the role!
        if (fieldAttrs.equivalent === 'contributors') {
          const fieldRole = this.$store.state.data.prefetchedTypes.contributors_role
            .find(role => role.source === fieldAttrs.default_role);
          value.forEach(entry => this.$set(entry, 'roles', [fieldRole]));
        }
      }
      if (index >= 0) {
        this.$set(this.valueListInt[fieldName], index, JSON.parse(JSON.stringify(value)));
      } else {
        this.$set(this.valueListInt, fieldName, value ? JSON.parse(JSON.stringify(value)) : value);
      }
      this.$emit('values-changed', this.valueListInt);
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
        return Object.assign({}, initObj, value);
      }
      // if it is not a array or object simply return value from list or empty string
      return (typeof value === 'string' ? value : '');
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
      display: inline;
      padding: 0;
      background-color: inherit;
      border: none;

      &:hover {
        color: $app-color;
        fill: $app-color;
      }

      .field-group-icon {
        margin-left: $spacing;
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
      }
    }
  }
</style>
