<template>
  <div class="base-form">
    <template v-for="(element, index) in formFieldListInt">
      <!-- ALLOW FOR MULTIPLE VALUES PER FIELD -->
      <template v-if="allowMultiply(element)">
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
            :field="element"
            :field-value="value"
            :tabs="availableLocales"
            :drop-down-list="dropdownLists[element.name]"
            :secondary-dropdown="dropdownLists[element.name + '_secondary']"
            :language="language"
            :available-locales="availableLocales"
            :sort-text="getI18nTerm('form.sort') || 'Sort'"
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
    <BaseFormFieldCreator 
      v
      key="index"
      :field-key="index"
      :field="element"
      :field-value="valueListInt[element.name]"
      :label="getFieldName(element)"
      :placeholder="$t('form.select') + ' ' + getFieldName(element)"
      :drop-down-list="dropdownLists[element.name]"
      :secondary-dropdown="dropdownLists[element.name + '_secondary']"
      :autocomplete-loading="fieldIsLoading === element.name"
      :language="$i18n.locale"
      :available-locales="$i18n.availableLocales"
      :sort-text="$t('form.sort')"
      :class="[
        'base-form-field',
        element['x-attrs'] && element['x-attrs'].field_format === 'half'
          ? 'base-form-field-half' : 'base-form-field-full',
        { 'base-form-field-left-margin': isHalfField(element) }
      ]"
      @field-value-changed="setFieldValue($event, element.name)"
      @fetch-autocomplete="fetchAutocomplete" />

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
      valueListInt: {},
      formFieldListInt: [],
      fieldProperties: [],
      dropdownLists: {},
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
  },
  methods: {
    // check if field can be multiplied
    allowMultiply(el) {
      // field can be multiplied if it is an array and not a chips or chips-below
      // field
      return el.type === 'array' && el['x-attrs']
        && !['chips', 'chips-below'].includes(el['x-attrs'].field_type);
    },
    // check if field is half field and the second of two halves
    isHalfFieldSecond(field) {
      const index = this.formFieldsHalf.indexOf(field);
      return index > 0 && !!(index % 2);
    },
    getFieldName(val) {
      return val.title || this.getI18nTerm(`form.${val.name}` || val.name);
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
