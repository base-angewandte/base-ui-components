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
      <!-- A FORM ROW -->
      <div
        v-for="(element, rowIndex) in formFieldListInt"
        :key="`form-row-${formId}-${rowIndex}`"
        :class="['base-form__form-row', `base-form__form-row--${element.type}`]">
        <!-- A SINGLE PROPERTY IN THE FORM FIELDS DEFINITION -->
        <template v-for="(field, index) in element.data">
          <!-- FOR A SINGLE FORM FIELD - RENDER BASEFORMFIELDCREATOR COMPONENT -->
          <BaseFormFieldCreator
            v-if="!allowMultiply(field)"
            ref="baseFormField"
            :key="`${field.name}_${rowIndex}_${index}_${formId}`"
            v-bind="formFieldComponentProps(field, index, rowIndex)"
            :class="[
              'base-form__input-field',
              `base-form__input-field--${element.type}`,
              { 'base-form__input-field--top-margin': field.type === 'boolean' },
              { 'base-form__input-field--date-switch-spacing': fieldIsDateSwitch(field['x-attrs'])},
            ]"
            @field-value-changed="setFieldValue($event, field.name)"
            @fetch-autocomplete="fetchAutocomplete"
            @input-complete="onInputComplete($event, field.name)">
            <template #label-addition="{ fieldName, groupNames }">
              <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="label-addition"
                :field-name="fieldName"
                :group-names="groupNames" />
            </template>
            <template #pre-input-field="{ fieldName, groupNames }">
              <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="pre-input-field"
                :field-name="fieldName"
                :group-names="groupNames" />
            </template>
            <template
              #input-field-addition-before="{ fieldName, groupNames }">
              <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="input-field-addition-before"
                :field-name="fieldName"
                :group-names="groupNames" />
            </template>
            <template #input-field-inline-before="{ fieldName, groupNames }">
              <!-- @slot to add elements directly inline before the input (contrary to `input-field-addition-before` this does not wrap. for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="input-field-inline-before"
                :field-name="fieldName"
                :group-names="groupNames" />
              <span
                v-if="element['x-attrs'] && element['x-attrs'].text_before"
                class="base-form__input-field__text-before">
                {{ element['x-attrs'].text_before }}
              </span>
            </template>
            <template #input-field-addition-after="{ fieldName, groupNames }">
              <span
                v-if="element['x-attrs'] && element['x-attrs'].text_after"
                class="base-form__input-field__text-after">
                {{ element['x-attrs'].text_after }}
              </span>
              <!-- @slot for adding elements after input
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="input-field-addition-after"
                :field-name="fieldName"
                :group-names="groupNames" />
            </template>
            <template #post-input-field="{ fieldName, groupNames }">
              <!-- @slot for adding elements at the end covering the whole height
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
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
              @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
              @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                name="below-input"
                :field-name="fieldName"
                :group-names="groupNames" />
            </template>
            <template #drop-down-entry="{ option, fieldName, groupNames }">
              <!-- @slot customize the form field drop down options
                @binding {object} option - the option object
                @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
              <slot
                :field-name="fieldName"
                :group-names="groupNames"
                :option="option"
                name="drop-down-entry" />
            </template>
          </BaseFormFieldCreator>

          <!-- FOR REPEATABLE FIELDS - ALLOW FOR MULTIPLE VALUES PER FIELD -->
          <div
            v-else-if="allowMultiply(field)"
            :key="`${field.name}_${index}_${formId}_wrapper`"
            :class="['base-form__input-field',
                     `base-form__input-field--${element.type}`,
                     { 'base-form__input-field--date-switch-spacing': fieldIsDateSwitch(field['x-attrs'])}]">
            <!-- wrapper around form field group and remove button -->
            <div
              v-for="(value, valueIndex) in valueListInt[field.name]"
              :ref="field.name"
              :key="`${field.name}_${index}_${valueIndex}_${formId}_wrapper`"
              :class="[{ 'base-form__repeatable-field': multiplyButtonsInline(field) }]">
              <BaseFormFieldCreator
                :key="`${field.name}_${index}_${valueIndex}_${formId}`"
                ref="baseFormField"
                v-bind="formFieldComponentProps(field, index, rowIndex, valueIndex)"
                :class="['base-form__input-component',
                         { 'base-form__input-component--margin-bottom': !multiplyButtonsInline(field) }]"
                @field-value-changed="setFieldValue(
                  $event,
                  field.name,
                  valueIndex)"
                @fetch-autocomplete="fetchAutocomplete"
                @input-complete="onInputComplete(
                  $event,
                  field.name,
                  valueIndex)">
                <template #label-addition="{ fieldName, groupNames }">
                  <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
                    @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                    @binding {number} index - the array index of field values
                    @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    name="label-addition"
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :index="valueIndex" />
                </template>
                <template #pre-input-field="{ fieldName, groupNames }">
                  <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
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
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    name="input-field-addition-before"
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :index="valueIndex" />
                </template>
                <template #input-field-inline-before="{ fieldName, groupNames }">
                  <span
                    v-if="element['x-attrs'] && element['x-attrs'].text_before"
                    class="base-form__input-field__text-before">
                    {{ element['x-attrs'].text_before }}
                  </span>
                  <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap. for an example see [BaseInput](BaseInput)
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    name="input-field-inline-before"
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :index="valueIndex" />
                </template>
                <template #input-field-addition-after="{ fieldName, groupNames }">
                  <span
                    v-if="element['x-attrs'] && element['x-attrs'].text_after"
                    class="base-form__input-field__text-after">
                    {{ element['x-attrs'].text_after }}
                  </span>
                  <!-- @slot for adding elements after input
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    name="input-field-addition-after"
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :index="valueIndex" />
                </template>
                <template #post-input-field="{ fieldName, groupNames }">
                  <!-- @slot for adding elements at the end covering the whole height
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
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
                  @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                  @binding {number} index - the array index of field values
                  @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    name="below-input"
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :index="valueIndex" />
                </template>
                <template #drop-down-entry="{ option, fieldName, groupNames }">
                  <!-- @slot customize the form field drop down options
                    @binding {object} option - the option object
                    @binding {string} field-name - the name of the displayed field (for time range fields there is a '-time' suffix added)
                    @binding {string[]} group-names - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
                  <slot
                    :field-name="fieldName"
                    :group-names="groupNames"
                    :option="option"
                    name="drop-down-entry" />
                </template>
              </BaseFormFieldCreator>

              <!-- INLINE MULTIPLY FOR TEXT AND DATE FIELDS -->
              <template
                v-if="multiplyButtonsInline(field)">
                <div
                  ref="multiplyButtons"
                  class="base-form__inline-buttons">
                  <BaseButton
                    v-if="valueListInt[field.name].length > 1
                      || checkFieldContent(field.name, 0)"
                    :icon-title="valueListInt[field.name].length === 1
                      ? getI18nTerm('form.clearField') || 'Clear'
                      : getI18nTerm('form.removeField', -1, { fieldType: getFieldName(element) })"
                    :has-background-color="false"
                    text=""
                    button-style="single"
                    icon="remove"
                    icon-size="large"
                    class="base-form__inline-button"
                    @clicked="removeField(field, valueIndex)" />
                  <BaseButton
                    :icon-title="valueIndex !== (valueListInt[field.name].length - 1)
                      ? getI18nTerm('form.addGroupBelow', -1, {
                        fieldType: getFieldName(field),
                      }) : getI18nTerm('form.addGroup', -1, {
                        fieldType: getFieldName(field),
                      })"
                    :has-background-color="false"
                    text=""
                    button-style="single"
                    icon="plus"
                    icon-size="large"
                    class="base-form__inline-button"
                    @clicked="multiplyField(field, valueIndex)" />
                </div>
              </template>

              <!-- MULTIPLY FOR MULTILINE FIELDS AND FIELD GROUPS -->
              <div class="base-form__multiply-buttons">
                <!-- if there is field content show a 'remove all content' button -->
                <BaseButton
                  v-if="!multiplyButtonsInline(field) && (valueListInt[field.name].length > 1
                    || checkFieldContent(field.name, 0))"
                  :text="valueListInt[field.name].length === 1
                    ? getI18nTerm('form.clearField') || 'Clear'
                    : getI18nTerm('form.removeField', -1, { fieldType: getFieldName(field) })"
                  :has-background-color="false"
                  icon-position="right"
                  icon="remove"
                  :class="['base-form__multiply-button', 'base-form__multiply-button--remove']"
                  @clicked="removeField(field, valueIndex)" />
                <!-- multiply button -->
                <BaseButton
                  v-if="!multiplyButtonsInline(field)"
                  :text="getI18nTerm('form.addGroup', -1, {
                    fieldType: getFieldName(field),
                  })"
                  :has-background-color="false"
                  icon-position="right"
                  icon="plus"
                  class="base-form__multiply-button"
                  @clicked="multiplyField(field, valueIndex)" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFormFieldCreator from '@/components/BaseFormFieldCreator/BaseFormFieldCreator';
import i18n from '@/mixins/i18n';

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
    BaseButton: () => import('@/components/BaseButton/BaseButton').then(m => m.default || m),
    BaseIcon: () => import('@/components/BaseIcon/BaseIcon').then(m => m.default || m),
    BaseFormFieldCreator,
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
       * internal representation of valueList (containing values for all input fields)
       * @type {Object}
       * @property {?string|?Array|?Object} [the name of the input field]
       */
      valueListInt: {},
    };
  },
  computed: {
    /**
     * the form fields provided in the prop `formFieldJson` as filtered (remove unneeded and hidden fields)
     * and sorted list with the field key added to the object as `name` property.
     * @returns {(*&{name: *})[]}
     */
    cleanedAndSortedFormFieldList() {
      return Object.entries(this.formFieldJson)
        // filter out hidden properties and $ref property from JSON
        .filter(([, value]) => !value.$ref && !value['x-attrs']?.hidden)
        // map all fields to include the field key as property `name`
        .map(([key, value]) => ({ name: key, ...value }))
        // sort the fields according to their x-attribute (order)
        .sort((a, b) => (a['x-attrs']?.order > b['x-attrs']?.order ? 1 : -1));
    },
    /**
     * internal form field list, sorted and with additional name property to save
     * the name of the input field in a variable, also filtered from fields that
     * should not be shown
     *
     * @returns {Object}
     * @property {string} name - the name of the input field
     * @property {*} [*] all other properties contained in the swagger
     */
    formFieldListInt() {
      // now get the list in the desired structure of grouping fields with identical field_format
      // together in the way: [{ type: [field_format], data: [fieldList] }]
      // where fieldList is an array with all fields that consecutively have the same field format
      return this.cleanedAndSortedFormFieldList.reduce((prev, curr) => {
        // save the field_format in a variable
        const { field_format: fieldFormat, order, field_type: fieldType } = curr['x-attrs'];
        const lastArrayElementIndex = prev.length - 1;
        // check if fields should be grouped (only for 'half' and 'third')
        if (fieldFormat && fieldType !== 'group'
          && ['half', 'third'].includes(fieldFormat)
          && prev[lastArrayElementIndex]
          // and if the last element of the list already has the same format as the current one
          // and thus an entry for that field format already exists
          && prev[lastArrayElementIndex]?.type === fieldFormat
          // also make sure that there are not more than 2 or 3 elements in a row array respectively
          && ((fieldFormat === 'half' && prev[lastArrayElementIndex].data.length < 2)
            || (fieldFormat === 'third' && prev[lastArrayElementIndex].data.length < 3))
          // lastly check if order of elements is sequential so in it is possible to leave a field empty by
          // skipping a number
          && prev[lastArrayElementIndex].data.at(-1)['x-attrs'].order + 1 >= order) {
          // if yes - push the current element to the already existing array
          prev[lastArrayElementIndex].data.push(curr);
          // else create a new array entry with the new format for that group (or single field)
        } else {
          prev.push({
            // field type group should always be full
            type: fieldFormat && curr['x-attrs']?.field_type !== 'group'
              ? fieldFormat : 'full',
            data: [curr],
          });
        }
        // return the updated array
        return prev;
      }, []);
    },
    /**
     * get the title string for the form header if one was set in the OpenAPI definition
     * @returns {string}
     */
    formHeader() {
      // find a field with the x-attr form_group_title (formFieldListInt is already sorted
      // by order x-attr so the title of the field with the lowest order will automatically
      // be chosen
      const groupTitleField = this.cleanedAndSortedFormFieldList
        .find(field => field['x-attrs'] && field['x-attrs'].form_group_title);
      // return the title string for the header to set if one was found
      return groupTitleField ? groupTitleField['x-attrs'].form_group_title : '';
    },
  },
  watch: {
    /**
     * watch the prop to see if it has changed from outside
     */
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
    /**
     * if the form fields definition was changed from outside - reinitialize the internal value list
     */
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
  mounted() {
    // inform parent that form was mounted
    this.$nextTick(() => {
      this.$emit('form-mounted');
    });
  },
  methods: {
    /** FORM INPUT HANDLING */

    fetchAutocomplete(params) {
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
    /**
     * triggered if value in form field changed
     * @param {*} value - the altered field value
     * @param {string} fieldName - the property name of the altered field
     * @param {number} index - the field index if field is repeatable
     */
    setFieldValue(value, fieldName, index = -1) {
      if (index >= 0) {
        this.$set(this.valueListInt[fieldName], index, JSON.parse(JSON.stringify(value)));
      } else {
        this.$set(this.valueListInt, fieldName, value ? JSON.parse(JSON.stringify(value)) : value);
      }
      this.propagateValueListChanges();
    },
    /**
     * emit the value list changes (only triggered by repeatable field manipulation)
     */
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

    /** FIELD VALUE INITIALIZATION */

    /**
     * go through all fields relevant for display and assign an appropriate value
     */
    initializeValueObject() {
      this.cleanedAndSortedFormFieldList.forEach((field) => {
        this.$set(
          this.valueListInt,
          field.name,
          this.getInitialFieldValue(field),
        );
      });
    },
    /**
     * function to determine the appropriate value for a field
     * @param {Object} field - the openAPI definition of the field
     * @returns {{[p: string]: *}|*|boolean|string|string|*[]}
     */
    getInitialFieldValue({ name, 'x-attrs': xAttrs, type, items, properties }) {
      // get the current field value
      const value = this.valueList[name];
      // get the OpenAPI x-attrs (that we use for form config) field type
      const xAttrsFieldType = xAttrs?.field_type;
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
        if (!xAttrs || !xAttrsFieldType
          || (xAttrsFieldType && !xAttrsFieldType.includes('chips'))) {
          return [].concat(this.getInitialFieldValue(items));
        }
        // else return empty array
        return [];
        // check if field is object
      } if (type === 'object') {
        const initObj = {};
        // for each property in the object also get initial values
        Object.keys(properties).forEach((key) => {
          this.$set(initObj, key, this.getInitialFieldValue(properties[key]));
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

    /** REPEATABLE FIELDS */

    /**
     * triggered on user clicking multiply button
     * @param {Object} field - the openAPI information of the form field
     * @param {number} index - the index of the field where the multiply button was pressed
     */
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
    /**
     * remove multiplied field again
     * @param {Object} field - the openAPI information of the form field
     * @param {number} index - the index of the field where the remove button was pressed
     */
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
      this.$emit('input-complete', this.valueListInt);
    },

    /** VALIDATION */

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

    /** HELPER FUNCTIONS FOR INDIVIDUAL FIELDS */

    /**
     * get all the component properties per field that are necessary for the BaseFormFieldCreator
     *  component
     * @param {Object} element - the openAPI field definition information
     * @param {number} index - element row index
     * @param {number} groupIndex - index of element within a row
     * @param {number?} [valueIndex=1] - index of element if field is repeatable
     * @returns {{fieldGroupParams: ({readonly labelPropertyName: string, readonly identifierPropertyName: string, readonly validationTexts: Object, readonly renderHeaderAs: string, readonly fieldProps: Object, readonly clearable: boolean, readonly showErrorIcon: boolean, readonly dropDownLists: Object, readonly fieldIsLoading: string, readonly fieldsWithTabs: *[], readonly formStyle: Object, readonly formId: string, readonly availableLocales: *[], readonly language: string, readonly valueList: Object, readonly formFieldJson: Object}|null), showErrorIcon: boolean, labelPropertyName: string, clearable: boolean, validationTexts: (*|Object), dropDownList: *, fieldKey: string, autocompleteLoading: boolean, sortText: (string|string), language: string, label: (*|string), fieldValue: *, showLabel: boolean, identifierPropertyName: string, availableLocales: *[], field, secondaryDropdown: *, fieldProps: (any|{})}}
     */
    formFieldComponentProps(element, index, groupIndex, valueIndex = -1) {
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
      const comboIndex = fieldRepeatable ? `${index}_${groupIndex}_${valueIndex}` : `${index}_${groupIndex}`;

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
        fieldGroupParams: this.cleanedAndSortedFormFieldList
          .some(field => field['x-attrs'] && field['x-attrs'].field_type === 'group')
          ? this.$props : null,
        clearable: this.clearable,
        showErrorIcon: this.showErrorIcon,
        validationTexts: singleFieldProps.validationTexts || this.validationTexts,
        identifierPropertyName: this.identifierPropertyName,
        labelPropertyName: this.labelPropertyName,
      };
    },
    /**
     * check if field can be multiplied
     * @param {Object} el - the openAPI field definition information
     * @returns {boolean}
     */
    allowMultiply(el) {
      // field can be multiplied if it is an array and not a chips or chips-below
      // field
      return el.type === 'array' && (!el['x-attrs'] || !el['x-attrs'].field_type || (el['x-attrs']
        && !['chips', 'chips-below'].includes(el['x-attrs'].field_type)));
    },
    /**
     * check if field should display multiply buttons inline (all but 'group' and 'multiline')
     * @param {Object} el - the openAPI field definition information
     * @returns {boolean}
     */
    multiplyButtonsInline(el) {
      return !['group', 'multiline'].includes(el['x-attrs'].field_type);
    },
    /**
     * check if field is a date field with switch buttons above - this means it needs
     *  more margin on top
     * @param {Object} fieldXAttrs - the openAPI field information 'x-attrs'
     * @returns {boolean}
     */
    fieldIsDateSwitch(fieldXAttrs) {
      // check if field is date and is switchable (= date_format is date_year or date_month_year)
      return fieldXAttrs?.field_type?.includes('date') && fieldXAttrs?.date_format?.includes('_');
    },
    /**
     * get a field name to display
     * @param {Object} el - the openAPI field definition information
     * @returns {string}
     */
    getFieldName(el) {
      // use the openAPI definition title or see if there is a i18n translation key with the field key
      return el.title || this.getI18nTerm(`form.${el.name}` || el.name);
    },
    /**
     * determine if field has content to see if multiply buttons should be shown
     * @param {string} fieldName - the field key / property name
     * @param {number} index - index in the repeated field
     * @returns {boolean}
     */
    checkFieldContent(fieldName, index = -1) {
      return this.hasValues(index < 0
        ? this.valueListInt[fieldName][index] : this.valueListInt[fieldName]);
    },
    /**
     * loop through all field values depending on the type of value
     * @param {*} fieldValues - the values assigned to a form field
     * @returns {boolean}
     */
    hasValues(fieldValues) {
      let hasContent = false;
      if (fieldValues && typeof fieldValues === 'object') {
        if (fieldValues.length >= 0) {
          fieldValues.forEach((values) => {
            hasContent = this.hasValues(values) || hasContent;
          });
        } else {
          const objectKeys = Object.keys(fieldValues);
          objectKeys
            .forEach((key) => {
              hasContent = this.hasValues(fieldValues[key]) || hasContent;
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
  @import "../../styles/variables";

  .base-form {
    position: relative;

    .base-form__header {
      position: relative;
      margin: $spacing-small $spacing;
      color: $font-color-second;
    }

    .base-form__body {
      background-color: white;
      display: flex;
      flex-direction: column;
      gap: $spacing;
      padding: $spacing;

      @media screen and (max-width: $mobile) {
        padding: $spacing $spacing-small $spacing;
        gap: $spacing-small;
      }

      .base-form__form-row {
        display: flex;
        flex-direction: row;
        gap: $spacing;
        width: 100%;
        // this is flex-start to keep nice alignment if error message is shown!
        align-items: flex-start;

        &.base-form__form-row--full {
          flex-direction: column;
        }

        // from 870px switch all fields to full width
        @media screen and (max-width: 870px) {
          &.base-form__form-row--half, &.base-form__form-row--third {
            flex-direction: column;
          }
        }

        // on mobile reduce the gap between single fields
        @media screen and (max-width: $mobile) {
          gap: $spacing-small;
        }

        .base-form__input-field {
          flex: 0 1 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: $spacing;

          &.base-form__input-field--date-switch-spacing {
            gap: 0;
          }

          @media screen and (max-width: 870px) {
            &.base-form__input-field--date-switch-spacing {
              margin-top: $spacing-small-half;
            }
          }

          @media screen and (max-width: $mobile) {
            gap: $spacing-small;
            &.base-form__input-field--date-switch-spacing {
              margin-top: calc(#{$spacing-small} + #{$spacing-small-half});
              gap: $spacing-small;
            }
          }

          &.base-form__input-field--half {
            // needed to add the 0.01rem for edge...
            flex: 0 1 calc(50% - #{$spacing-small} - 0.01rem);
            max-width: calc(50% - #{$spacing-small} - 0.01rem);

            @media screen and (max-width: 870px) {
              flex: 0 0 100%;
              max-width: 100%;
            }
          }

          &.base-form__input-field--third {
            // needed to add the 0.01rem for edge...
            flex: 0 1 calc(33% - #{$spacing-small} - 0.01rem);
            max-width: calc(33% - #{$spacing-small} - 0.01rem);

            @media screen and (max-width: 870px) {
              flex: 0 0 100%;
              max-width: 100%;
            }
          }

          &.base-form__input-field--top-margin {
            margin-top: $line-height + $spacing-small;

            // since field switches to only one field per row - remove top margin
            @media screen and (max-width: 870px) {
              margin-top: 0;
            }
          }

          .base-form__repeatable-field {
            display: flex;
            align-items: flex-end;
            transform: none;
            // this gap needs to be here for the flex box to not go beyond boarder
            gap: $spacing;

            .base-form__inline-buttons {
              flex: 0 0 auto;
              display: flex;
              align-items: center;
              color: $font-color-second;
              // align buttons with the form
              margin: 0 0 0 (-#{$spacing-small});

              .base-form__inline-button {
                flex: 0 0 auto;
                // reduce the button spacing
                padding: 0 $spacing-small;
              }
            }
          }

          &.base-form__input-field--date-switch-spacing {
            .base-form__repeatable-field:not(:first-child) {
              margin-top: calc(#{$spacing-small} + #{$spacing-small-half});
            }
          }

          .base-form__input-component {
            flex: 1 1 auto;

            &.base-form__input-component--margin-bottom {
              margin-bottom: $spacing-small;

              @media screen and (max-width: $mobile) {
                margin-bottom: calc(#{$spacing-small} + #{$spacing-small-half});
              }
            }
          }

          .base-form__multiply-buttons {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: -($spacing);

            @media screen and (max-width: $mobile) {
              flex-direction: row;
              flex-wrap: wrap;
              margin-top: -($spacing-small);
            }

            .base-form__multiply-button {
              color: $font-color-second;
            }
          }

          .base-form__input-field__text-before {
            margin-right: $spacing-small;
          }

          .base-form__input-field__text-after {
            margin-left: $spacing-small;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../styles/variables.scss";

  .base-form__input-field--third {
    .base-form-field-creator__date-field-wrapper {
      flex-direction: column;
    }
  }

  @media screen and (min-width: $mobile) {
    .base-form__input-field {
      .base-drop-down-list__container {
        max-width: calc(100% - #{$spacing} * 2);
      }
    }
  }
</style>
