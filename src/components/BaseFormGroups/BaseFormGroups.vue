<template>
  <div
    class="base-form-groups">
    <BaseForm
      v-for="(formGroup, index) of formFieldsGrouped"
      :key="`${groupsId}-${index}`"
      :form-field-json="formGroup"
      v-bind="formProps"
      class="base-form-groups__group"
      v-on="$listeners">
      <template #label-addition="{ fieldName }">
        <!-- @slot Slot to allow for additional elements on the right side of the label row
        \<div\> (e.g. language tabs))
        @binding {string} field-name - in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="label-addition"
          :field-name="fieldName" />
      </template>
      <template #pre-input-field="{ fieldName }">
        <!-- @slot slot to add elements within the form field but in a row before the actual
        input field<br>
        for an example see [BaseInput](#baseinput)
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="pre-input-field"
          :field-name="fieldName" />
      </template>
      <template
        #input-field-addition-before="{ fieldName }">
        <!-- @slot Slot to allow for additional elements in the input field \<div\>
          (before \<input\>)
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="input-field-addition-before"
          :field-name="fieldName" />
      </template>
      <template #input-field-inline-before="{ fieldName }">
        <!-- @slot to add elements directly inline before the input
            (contrary to input-field-addition-before this does not wrap<br>
        for an example see [BaseInput](#baseinput)
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="input-field-inline-before"
          :field-name="fieldName" />
      </template>
      <template #input-field-addition-after="{ fieldName }">
        <!-- @slot for adding elements after input
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="input-field-addition-after"
          :field-name="fieldName" />
      </template>
      <template #post-input-field="{ fieldName }">
        <!-- @slot for adding elements at the end covering the whole height
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="post-input-field"
          :field-name="fieldName" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot for adding elements after input (e.g. used to add loader)
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot name="remove-icon" />
      </template>
      <template #below-input="{ fieldName }">
        <!-- @slot below-input slot added to e.g. add drop down
        @binding {string} field-name in order to use slot for only one field use a if condition
          with the form field name (the object property) -->
        <slot
          name="below-input"
          :field-name="fieldName" />
      </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm/BaseForm';
import { createId } from '@/utils/utils';

export default {
  name: 'BaseFormGroups',
  components: {
    BaseForm,
  },
  props: {
    /**
     * the json object containing all the field information incl. `x-attrs` custom field
     * for placeholder, field type, etc. For more information on the attributes see
     * [BaseForm](#baseform).<br>
     * Most importantly the `x-attrs` needs to include the field `form_group` assigning
     *  a number (1-based index!) to each form field by which fields are grouped.<br>
     * Optional: add an attribute `form_group_title` to any group field (the field with the
     *  lowest order takes precedent) to add a form group header.
     */
    formFieldJson: {
      type: Object,
      required: true,
      // validator: (val) =>
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
     * define additional style for the form
     * should be an object eg. { 'padding-top': 0 }<br>
     *  note: this applies to [BaseForm](#baseform) not the wrapper
     *  component
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
     * if `true` a remove icon will be shown allowing to remove
     * all input at once<br>
     * for an example on how it looks on an individual form field see [BaseInput](#baseinput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * provide an object with settings and properties for each field. This takes an object
     * with the field name as properties with the props nested.<br>
     * { fieldName1: { required: false, ... }, fieldName2: { ... } }<br>
     * <br>
     * find the possible variables at the respective input components: <br>
     * [BaseInput](#baseinput)<br>
     * [BaseAutocompleteInput](#baseautocompleteinput)<br>
     * [BaseMultilineTextInput](#basemultilinetextinput)<br>
     * [BaseChipsInput](#basechipsinput)<br>
     * [BaseChipsBelow](#basechipsbelow)<br>
     * [BaseDateInput](#basedateinput)<br>
     * [BaseToggle](#basetoggle)<br>
     */
    fieldProps: {
      type: Object,
      default: () => ({}),
      validator: val => Object.keys(val).length === 0 || Object.values(val)
        .every(fieldProps => Object.keys(fieldProps)),
    },
  },
  computed: {
    /**
     * modify the component $props so they can be forwarded to BaseForm directly via
     * v-bind
     * @returns {{}}
     */
    formProps() {
      const newProps = {
        ...this.$props,
      };
      // this will be added in html per group
      delete newProps.formFieldJson;
      return newProps;
    },
    /**
     * the formFieldJSON needs to be separated in to the specific groups according
     * to `form_group` `x-attrs` field.
     *  Fields that do not have the attribute set will be added at the end.
     * @returns {Object[]}
     */
    formFieldsGrouped() {
      const groupedFormFields = [];
      const noGroupFields = {};
      Object.entries(this.formFieldJson).forEach(([key, value]) => {
        // check if the array index position exists already
        if (value['x-attrs'] && value['x-attrs'].form_group) {
          // if yes add the field information object to it (-1 because it is a 1-based
          // index number and we need to set position in groups array)
          const groupIndex = value['x-attrs'].form_group - 1;
          // check if that array position already has content
          if (groupedFormFields[groupIndex]) {
            // if yes - add the object property
            groupedFormFields[groupIndex][key] = value;
          } else {
            // if not set an object with first property
            groupedFormFields[groupIndex] = {
              [key]: value,
            };
          }
        } else {
          // if not - save the field to a separate object that will be added last
          // this.$set(noGroupFields, key, value);
          noGroupFields[key] = value;
        }
      });
      if (Object.keys(noGroupFields).length) {
        groupedFormFields.push(noGroupFields);
      }
      return groupedFormFields;
    },
    /**
     * create an internal id for looping purposes
     * @returns {string}
     */
    groupsId() {
      return createId();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.base-form-groups {
  .base-form-groups__group:nth-of-type(n+2) {
    margin-top: $spacing;
  }
}
</style>
