<script>
import { useId } from '@/composables/useId.js';
import BaseForm from '@/components/BaseForm/BaseForm.vue';
import { useExtractAttrs } from '@/composables/useExtractAttrs.js';
import { computed, ref } from 'vue';

export default {
  name: 'BaseFormGroups',
  components: {
    BaseForm,
  },
  inheritAttrs: false,
  props: {
    /**
     * the json object containing all the field information incl. `x-attrs` custom field
     * for placeholder, field type, etc. For more information on the attributes see
     * [BaseForm](BaseForm).
     * Most importantly the `x-attrs` needs to include the field `form_group` assigning
     *  a number (1-based index!) to each form field by which fields are grouped.
     * Optional: add an attribute `form_group_title` to any group field (the field with the
     *  lowest order takes precedent) to add a form group header.
     */
    formFieldJson: {
      type: Object,
      required: true,
    },
    /**
     * the values for each field if any already present
     */
    modelValue: {
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
     * should be an object eg. `{ 'padding-top': 0 }`.
     *  note: this applies to [BaseForm](BaseForm) not the wrapper
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
     * provide an object that contains the options list for all
     * fields with autocomplete / chips input
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
     * `{ fieldName1: { required: false, ... }, fieldName2: { ... } }`.
     *
     * find the possible variables at the respective input components:
     * [BaseInput](BaseInput)
     * [BaseAutocompleteInput](BaseAutocompleteInput)
     * [BaseMultilineTextInput](BaseMultilineTextInput)
     * [BaseChipsInput](BaseChipsInput)
     * [BaseChipsBelow](BaseChipsBelow)
     * [BaseDateInput](BaseDateInput)
     * [BaseToggle](BaseToggle)
     */
    fieldProps: {
      type: Object,
      default: () => ({}),
      validator: val => Object.keys(val).length === 0 || Object.values(val)
        .every(fieldProps => Object.keys(fieldProps)),
    },
  },
  emits: ['update:model-value', 'input-complete', 'fetch-autocomplete', 'form-mounted'],
  setup(props, { emit }) {
    /** INTERNAL ID */
    /**
     * create an internal id for looping purposes
     * @returns {string}
     */
    const groupsId = useId();

    /** ATTRS HANDLING */
    const { rootAttrs, forwardAttrs } = useExtractAttrs();

    /**
     * the formFieldJSON needs to be separated in to the specific groups according
     * to `form_group` `x-attrs` field.
     *  Fields that do not have the attribute set will be added at the end.
     * @returns {Object[]}
     */
    const formFieldsGrouped = computed(() => {
      const groupedFormFields = [];
      const noGroupFields = {};
      Object.entries(props.formFieldJson).forEach(([key, value]) => {
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
          noGroupFields[key] = value;
        }
      });
      if (Object.keys(noGroupFields).length) {
        groupedFormFields.push(noGroupFields);
      }
      return groupedFormFields;
    });

    /**
     * provide the necessary values to each form specifically by mapping
     * from the grouped form fields json
     * @returns {{[fieldName: string]: *}[]}
     */
    const formValuesGrouped = computed(() => {
      return formFieldsGrouped.value.map((group) => {
        return Object.fromEntries(Object.keys(group).map((key) => [key, props.modelValue[key]]));
      });
    });

    /**
     * to only emit value when all forms are mounted - keep state with this variable
     * @type {Ref<UnwrapRef<boolean[]>, UnwrapRef<boolean[]> | boolean[]>}
     */
    const formsMounted = ref(Array.from({length: formFieldsGrouped.value.length}, () => false));

    /**
     * call when a form was mounted
     * @param {number} index - index of the form in the forms array
     */
    function formMounted(index) {
      // set the state variable true
      formsMounted.value[index] = true;
      // and check if all forms were mounted already
      if (allFormsMounted.value) {
        // if yes - emit value
        emit('form-mounted');
      }
    }

    function updateFormValues(val) {
      emit('update:model-value', {
        ...props.modelValue,
        ...JSON.parse(JSON.stringify(val)),
      });
    }

    const allFormsMounted = computed(() => !formsMounted.value.some(mountedVal => !mountedVal));

    return {
      groupsId,
      rootAttrs,
      forwardAttrs,
      formFieldsGrouped,
      formValuesGrouped,
      formMounted,
      updateFormValues,
      allFormsMounted,
    };
  },
  computed: {
    /**
     * modify the component $props, so they can be forwarded to BaseForm directly via
     * v-bind
     * @returns {{}}
     */
    formProps() {
      const newProps = JSON.parse(JSON.stringify(this.$props));
      delete newProps.formFieldJson;
      delete newProps.formId;
      delete newProps.modelValue;
      return {
        ...this.forwardAttrs,
        ...newProps,
      };
    },
  },
};
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="base-form-groups">
    <!-- form-field-json and model-value are below v-bind because we want to overwrite
      the values provided in props -->
    <BaseForm
      v-for="(formGroup, index) of formFieldsGrouped"
      :key="`${groupsId}-${index}`"
      v-bind="formProps"
      :form-field-json="formGroup"
      :model-value="formValuesGrouped[index]"
      :form-id="`${formId}-${index}`"
      class="base-form-groups__group"
      @fetch-autocomplete="$emit('fetch-autocomplete', $event)"
      @input-complete="$emit('input-complete', $event)"
      @form-mounted="formMounted(index)"
      @update:model-value="updateFormValues">
      <template #label-addition="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
        @binding {string} field-name - in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="label-addition"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template #pre-input-field="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot slot to add elements within the form field but in a row before the actual input field. For an example see [BaseInput](BaseInput).
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="pre-input-field"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template
        #input-field-addition-before="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>).
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="input-field-addition-before"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template #input-field-inline-before="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap. For an example see [BaseInput](BaseInput).
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="input-field-inline-before"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template #input-field-addition-after="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot for adding elements after input
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="input-field-addition-after"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template #post-input-field="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot for adding elements at the end covering the whole height
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="post-input-field"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot use a custom icon instead of standard remove icon
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property) -->
        <slot name="remove-icon" />
      </template>
      <template #below-input="{ fieldName, groupNames, index: fieldIndex }">
        <!-- @slot below-input slot added to e.g. add drop down
        @binding {string} field-name in order to use slot for only one field use a if condition with the form field name (the object property)
        @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names
        @binding {number} index - in case field is repeatable the index of the field -->
        <slot
          name="below-input"
          :field-name="fieldName"
          :group-names="groupNames"
          :index="fieldIndex" />
      </template>
    </BaseForm>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.base-form-groups {
  .base-form-groups__group:nth-of-type(n+2) {
    margin-top: $spacing;
  }
}
</style>
