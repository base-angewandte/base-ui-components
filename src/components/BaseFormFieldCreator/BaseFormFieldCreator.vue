<template>
  <div>
    <!-- TEXT FIELD -->
    <!-- AUTOCOMPLETE -->
    <!-- MULTILINE -->
    <component
      :is="fieldElement"
      v-if="fieldType !== 'date' && fieldType !== 'chips'
        && fieldType !== 'chips-below' && fieldType !== 'group'
        && fieldType !== 'boolean'"
      :key="`${fieldKey}-text`"
      :input-id="fieldKey"
      v-bind="fieldPropsInt"
      :label="labelInt"
      :show-label="fieldProps.showLabel !== undefined ? fieldProps.showLabel : showLabel"
      :placeholder="placeholderInt"
      :tabs="fieldType === 'multiline' ? fieldProps.tabs || tabs : null"
      :tab-labels="fieldType === 'multiline'
        ? fieldProps.tabLabels || tabs.map(tab => getI18nTerm(tab)) : null"
      :tabs-legend="fieldType === 'multiline'
        ? fieldProps.tabsLegend || getI18nTerm('form.textTabsLegend') : null"
      :active-tab="fieldType === 'multiline' ? activeTab : null"
      :list="fieldType === 'autocomplete'
        ? dropDownList?.length ? dropDownList : fieldProps.list || [] : null"
      :is-loading="autocompleteLoading"
      :model-value="fieldValueInt"
      :field-type="isNumberField ? 'number' : fieldProps.fieldType || 'text'"
      :invalid="invalid || fieldProps.invalid"
      :required="required || fieldProps.required"
      :error-message="errorMessage || fieldProps.errorMessage"
      :validation-texts="fieldProps.validationTexts
        ? (fieldProps.validationTexts[!isNumberField ? fieldType : 'text']
          || fieldProps.validationTexts)
        : validationTexts[!isNumberField ? fieldType : 'text']"
      :show-error-icon="showErrorIcon"
      :clearable="clearable"
      :min-length="field.minLength || fieldProps.minLength"
      :max-length="field.maxLength || fieldProps.maxLength"
      :min="typeof formFieldXAttrs.min !== 'undefined' ? formFieldXAttrs.min : fieldProps.min"
      :max="typeof formFieldXAttrs.max !== 'undefined' ? formFieldXAttrs.max : fieldProps.max"
      :decimals="allowedDecimals"
      :decimal-separator="fieldProps.decimalSeparator || language === 'de' ? ',' : '.'"
      :assistive-text="assistiveTextInt"
      @keydown.enter="onEnter"
      @blur="emitCompletedInputValues"
      @update:model-value="setInputValue($event)"
      @fetch-dropdown-entries="$emit('fetch-autocomplete', {
        value: $event,
        name: field.name,
        source: formFieldXAttrs.source,
      })">
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
          @binding {string} field-name -->
        <slot
          :field-name="field.name"
          name="label-addition" />
        <BaseDropDown
          v-if="fieldType === 'multiline' && field.items
            && field.items.properties && field.items.properties.type"
          :id="fieldKey"
          :model-value="fieldValueInt && fieldValueInt.type && fieldValueInt.type.source
            ? fieldValueInt.type : textTypeDefault"
          :options="textTypeOptions"
          :label="getI18nTerm('form.texttype')"
          :language="language"
          value-prop="source"
          class="base-form-field-creator__multiline-dropdown"
          @update:model-value="setMultilineDropDown" />
      </template>
      <template #pre-input-field>
        <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="pre-input-field" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="input-field-addition-before" />
      </template>
      <template #input-field-inline-before>
        <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see [BaseInput](BaseInput)
          @binding {string} field-name - the name of the current field for identification purposes-->
        <slot
          :field-name="field.name"
          name="input-field-inline-before" />
      </template>
      <template #input-field-addition-after>
        <!-- @slot for adding elements after input
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="input-field-addition-after" />
      </template>
      <template #post-input-field>
        <!-- @slot for adding elements at the end covering the whole height
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="post-input-field" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot
          name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot use a custom icon instead of standard remove icon -->
        <slot
          name="remove-icon" />
      </template>
      <template #below-input>
        <!-- @slot below-input slot added to e.g. add drop down
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="below-input" />
      </template>
      <template #drop-down-entry="{ item }">
        <template v-if="fieldType === 'autocomplete'">
          <!-- @slot customize the form field drop down options
            @binding {object} option - the option object -->
          <slot
            :field-name="field.name"
            :option="item"
            name="drop-down-entry" />
        </template>
      </template>
    </component>

    <!-- DATE FIELD -->
    <fieldset
      v-else-if="fieldType === 'date'"
      class="base-form-field-creator__date-fieldset">
      <div class="base-form-field-creator__date-field-wrapper">
        <!-- if any date is included in the object (`date`, `date_from` `date_to`) this component is
          rendered -->
        <BaseDateInput
          v-if="dateType === 'single' || dateType.includes('date')"
          :key="fieldKey + '_date'"
          v-model="fieldValueInt"
          :input-id="fieldKey"
          v-bind="fieldPropsInt"
          :label="labelInt"
          :show-label="fieldProps.showLabel !== undefined ? fieldProps.showLabel : showLabel"
          :placeholder="placeholderInt"
          :range-separator="fieldProps.rangeSeparator || getI18nTerm('form.until')"
          :format="formFieldXAttrs.date_format || fieldProps.format"
          :type="dateType.includes('timerange') ? dateType.includes('daterange')
            ? 'daterange' : 'single' : dateType"
          :date-format-labels="fieldProps.dateFormatLabels
            || {
              date: getI18nTerm('form.date'),
              month: getI18nTerm('form.month'),
              year: getI18nTerm('form.year'),
            }"
          :format-tabs-legend="fieldProps.formatTabsLegend || getI18nTerm('form.dateTabsLegend')"
          :language="language"
          :invalid="invalid || fieldProps.invalid"
          :required="required || fieldProps.required"
          :error-message="errorMessage || fieldProps.errorMessage"
          class="base-form-field-creator__date-field"
          @value-validated="emitCompletedInputValues">
          <template
            #label-addition>
            <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
              @binding {string} field-name -->
            <slot
              :field-name="field.name"
              name="label-addition" />
          </template>
          <template #pre-input-field>
            <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="pre-input-field" />
          </template>
          <template
            #input-field-addition-before>
            <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="input-field-addition-before" />
          </template>
          <template #input-field-inline-before>
            <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="input-field-inline-before" />
          </template>
          <template #input-field-addition-after>
            <!-- @slot for adding elements after input
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="input-field-addition-after" />
          </template>
          <template #post-input-field>
            <!-- @slot for adding elements at the end covering the whole height
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="post-input-field" />
          </template>
          <template #error-icon>
            <!-- @slot use a custom icon instead of standard error/warning icon -->
            <slot
              name="error-icon" />
          </template>
          <template #remove-icon>
            <!-- @slot use a custom icon instead of standard remove icon -->
            <slot
              name="remove-icon" />
          </template>
          <template #below-input>
            <!-- @slot below-input slot added to e.g. add drop down
              @binding {string} field-name - the name of the current field for identification purposes -->
            <slot
              :field-name="field.name"
              name="below-input" />
          </template>
        </BaseDateInput>
        <!-- if any time range is included in the object this component is
          rendered -->
        <BaseDateInput
          v-if="dateType.includes('timerange')"
          :key="fieldKey + '_time'"
          v-model="fieldValueInt"
          :input-id="fieldKey"
          v-bind="fieldPropsInt"
          :label="dateType !== 'timerange' && field.properties.time_from.title
            ? field.properties.time_from.title : labelInt"
          :show-label="!dateType.includes('date')"
          :placeholder="placeholderInt.time || placeholderInt"
          :range-separator="fieldProps.rangeSeparator || getI18nTerm('form.until')"
          :invalid="invalid || fieldProps.invalid"
          :required="required || fieldProps.required"
          :error-message="errorMessage || fieldProps.errorMessage"
          type="timerange"
          class="base-form-field-creator__date-field"
          @date-validated="emitCompletedInputValues">
          :class="['base-form-field-creator__date-field',
          { 'base-form-field-creator__date-field--spacing': dateType.includes('date') }]"
          @value-validated="emitCompletedInputValues">
          <!-- only add slot here if it there is no first (date) field row -->
          <template
            #label-addition>
            <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="label-addition" />
          </template>
          <template #pre-input-field>
            <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="pre-input-field" />
          </template>
          <template
            #input-field-addition-before>
            <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added)-->
            <slot
              :field-name="`${field.name}-time`"
              name="input-field-addition-before" />
          </template>
          <template #input-field-inline-before>
            <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="input-field-inline-before" />
          </template>
          <template #input-field-addition-after>
            <!-- @slot for adding elements after input
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="input-field-addition-after" />
          </template>
          <template #post-input-field>
            <!-- @slot for adding elements at the end covering the whole height
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="post-input-field" />
          </template>
          <template #error-icon>
            <!-- @slot use a custom icon instead of standard error/warning icon -->
            <slot
              name="error-icon" />
          </template>
          <template #remove-icon>
            <!-- @slot use a custom icon instead of standard remove icon -->
            <slot
              name="remove-icon" />
          </template>
          <template #below-input>
            <!-- @slot below-input slot added to e.g. add drop down
              @binding {string} field-name - the name of the current field for identification purposes (for time range fields there is a '-time' suffix added) -->
            <slot
              :field-name="`${field.name}-time`"
              name="below-input" />
          </template>
        </BaseDateInput>
      </div>
    </fieldset>

    <!-- CHIPS INPUT -->
    <component
      :is="fieldElement"
      v-else-if="fieldType === 'chips' || fieldType === 'chips-below'"
      :ref="fieldType + fieldKey"
      :key="`${fieldKey}-chips`"
      v-model="fieldValueInt"
      :input-id="fieldKey"
      v-bind="fieldPropsInt"
      :placeholder="placeholderInt"
      :label="labelInt"
      :show-label="fieldProps.showLabel !== undefined ? fieldProps.showLabel : showLabel"
      :list="dropDownList.length ? dropDownList : fieldProps.list || []"
      :allow-dynamic-drop-down-entries="formFieldXAttrs.dynamic_autosuggest
        || !!fieldProps.allowDynamicDropDownEntries"
      :allow-multiple-entries="!isChipsSingleSelect"
      :allow-unknown-entries="formFieldXAttrs.allow_unknown_entries
        || !!fieldProps.allowUnknownEntries"
      :draggable="!!fieldProps.draggable || !isChipsSingleSelect"
      :sortable="formFieldXAttrs.sortable
        || !!fieldProps.sortable"
      :is-loading="autocompleteLoading"
      :sort-text="fieldProps.sortText || sortText"
      :sort-name="fieldProps.sortName || isContributorOrEquivalent"
      :language="formFieldXAttrs.set_label_language
        || fieldType === 'chips-below' ? language : ''"
      :drop-down-no-options-info="fieldProps.dropDownNoOptionsInfo || getI18nTerm('form.noMatch')"
      :additional-prop-options="fieldType === 'chips-below' ? secondaryDropdown : null"
      :additional-prop-placeholder="fieldType === 'chips-below'
        ? fieldProps.additionalPropPlaceholder || getI18nTerm('form.selectRoles') : null"
      :additional-property-name="fieldType === 'chips-below'
        ? fieldProps.additionalPropertyName || 'roles' : null"
      :additional-prop-required="fieldType === 'chips-below'
        ? formFieldXAttrs.additional_prop_required : null"
      :invalid="invalid || fieldProps.invalid"
      :required="field.required || required || fieldProps.required"
      :error-message="errorMessage || fieldProps.errorMessage"
      :validation-texts="validationTexts.chips || fieldProps.validationTexts.chips"
      :show-error-icon="showErrorIcon"
      :identifier-property-name="fieldProps.identifierPropertyName || identifierPropertyName"
      :label-property-name="fieldProps.labelPropertyName || labelPropertyName"
      :assistive-text="assistiveTextInt"
      @update:model-value="emitCompletedInputValues"
      @fetch-dropdown-entries="fetchAutocomplete"
      @input="textInput = $event">
      <template
        #drop-down-entry="{ item }">
        <!-- @slot customize the form field drop down options
          @binding {object} option - the option object -->
        <slot
          :field-name="field.name"
          :option="item"
          name="drop-down-entry">
          <span
            v-insert-text-as-html="{
              value: getLabel(item[labelPropertyName]),
              interpretTextAsHtml: fieldProps.interpretChipsLabelAsHtml,
            }" />
          <span class="base-form-field-creator__chips-dropdown-second">
            {{ item.additional }}
          </span>
          <span class="base-form-field-creator__chips-dropdown-third">
            {{ item.source_name }}
          </span>
        </slot>
      </template>
      <template #no-options>
        <span v-if="formFieldXAttrs.dynamic_autosuggest && !fieldInput">
          {{ getI18nTerm('form.startTyping') }}
        </span>
        <span v-else-if="!formFieldXAttrs.dynamic_autosuggest && textInput">
          {{ getI18nTerm('form.noMatch') }}
        </span>
        <span v-else-if="fieldInput && !fetchingData && !autocompleteLoading">
          {{ getI18nTerm('form.noResult') }}
        </span>
        <span v-else>
          {{ getI18nTerm('form.fetchingResults') }}
        </span>
      </template>
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="label-addition" />
      </template>
      <template #pre-input-field>
        <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="pre-input-field" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="input-field-addition-before" />
      </template>
      <template #input-field-inline-before>
        <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see [BaseInput](BaseInput)
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="input-field-inline-before" />
      </template>
      <template #input-field-addition-after>
        <!-- @slot for adding elements after input
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="input-field-addition-after" />
      </template>
      <template #post-input-field>
        <!-- @slot for adding elements at the end covering the whole height
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="post-input-field" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot
          name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot use a custom icon instead of standard remove icon -->
        <slot
          :field-name="field.name" />
      </template>
      <template #below-input>
        <!-- @slot below-input slot added to e.g. add drop down
          @binding {string} field-name - the name of the current field for identification purposes -->
        <slot
          :field-name="field.name"
          name="below-input" />
      </template>
    </component>

    <!-- FIELD GROUPS -->
    <div
      v-else-if="fieldType === 'group'"
      :key="`${fieldKey}-group`"
      class="base-form-field-creator__field-array">
      <div
        v-if="formFieldXAttrs.show_label"
        class="base-form-field-creator__field-array-label">
        {{ `${labelInt}:` }}
      </div>
      <div
        :key="fieldKey"
        class="base-form-field-creator__subform-wrapper">
        <component
          :is="fieldElement"
          v-bind="fieldGroupParamsInt"
          class="base-form-field-creator__subform"
          @values-changed="setInputValue"
          @input-complete="$emit('input-complete', $event);"
          @fetch-autocomplete="subFormFetchAutocomplete">
          <template
            #label-addition="{ fieldName, groupNames }">
            <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="label-addition" />
          </template>
          <template #pre-input-field="{ fieldName, groupNames }">
            <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="pre-input-field" />
          </template>
          <template
            #input-field-addition-before="{ fieldName, groupNames }">
            <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>)
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="input-field-addition-before" />
          </template>
          <template #input-field-inline-before="{ fieldName, groupNames }">
            <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see [BaseInput](BaseInput)
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="input-field-inline-before" />
          </template>
          <template #input-field-addition-after="{ fieldName, groupNames }">
            <!-- @slot for adding elements after input
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="input-field-addition-after" />
          </template>
          <template #post-input-field="{ fieldName, groupNames }">
            <!-- @slot for adding elements at the end covering the whole height
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="post-input-field" />
          </template>
          <template #error-icon>
            <!-- @slot use a custom icon instead of standard error/warning icon -->
            <slot
              name="error-icon" />
          </template>
          <template #remove-icon>
            <!-- @slot use a custom icon instead of standard remove icon -->
            <slot
              name="remove-icon" />
          </template>
          <template #below-input="{ fieldName, groupNames }">
            <!-- @slot below-input slot added to e.g. add drop down
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              name="below-input" />
          </template>
          <template #drop-down-entry="{ option, fieldName, groupNames }">
            <!-- @slot customize the form field drop down options
              @binding {object} option - the option object
              @binding {string} field-name - the name of the current field for identification purposes
              @binding {string[]} groupNames - in case the slot is for a subform (form group) field, `groupNames` contains the parent field groups names -->
            <slot
              :field-name="fieldName"
              :group-names="(groupNames ? groupNames : []).concat(field.name)"
              :option="option"
              name="drop-down-entry" />
          </template>
        </component>
      </div>
    </div>

    <!-- FIELD BOOLEAN -->
    <BaseToggle
      v-else-if="fieldType === 'boolean'"
      :key="`${fieldKey}-toggle`"
      v-model="fieldValueInt"
      v-bind="fieldPropsInt"
      :input-id="fieldKey"
      :name="fieldKey"
      :label="labelInt"
      :bind-slot-to-state="fieldProps.bindSlotToState || true"
      class="base-form-field-creator__toggle"
      @update:model-value="emitCompletedInputValues">
      <BaseLink
        v-if="formFieldXAttrs.subtext && formFieldXAttrs.subtext.value"
        :identifier-property-value="formFieldXAttrs.subtext.source || ''"
        :url="formFieldXAttrs.subtext.url || ''"
        :value="formFieldXAttrs.subtext.value" />
    </BaseToggle>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useI18n } from '@/composables/useI18n.js';
import InsertTextAsHtml from '@/directives/InsertTextAsHtml.js';

/**
 * A component for form field creation via [openAPI](https://spec.openapis.org/oas/v3.1.0/) standard
 */

export default {
  name: 'BaseFormFieldCreator',
  components: {
    BaseDropDown: defineAsyncComponent(() => import('@/components/BaseDropDown/BaseDropDown.vue')),
    BaseDateInput: defineAsyncComponent(() => import('@/components/BaseDateInput/BaseDateInput.vue')),
    BaseToggle: defineAsyncComponent(() => import('@/components/BaseToggle/BaseToggle.vue')),
    BaseLink: defineAsyncComponent(() => import('@/components/BaseLink/BaseLink.vue')),
  },
  directives: {
    insertTextAsHtml: InsertTextAsHtml,
  },
  props: {
    /**
     * a key to uniquely identify the field
     */
    fieldKey: {
      type: [Number, String],
      required: true,
    },
    /**
     * field information as provided in [openAPI](https://spec.openapis.org/oas/v3.1.0#schema-object) standard
     */
    field: {
      type: Object,
      required: true,
    },
    /**
     * the field value
     */
    fieldValue: {
      type: [Object, String, Array, Date, Number, Boolean],
      required: true,
    },
    /**
     * add properties any input field can take and set values - find the possible variables at the
     * respective input components:
     * [BaseInput](BaseInput)
     * [BaseAutocompleteInput](BaseAutocompleteInput)
     * [BaseMultilineTextInput](BaseMultilineTextInput)
     * [BaseChipsInput](BaseChipsInput)
     * [BaseChipsBelow](BaseChipsBelow)
     * [BaseDateInput](BaseDateInput)
     * [BaseToggle](BaseToggle)
     *
     * **Caveat**: this means several input field properties are settable via separate props as well
     * as via `fieldProps` (e.g. `language`, `required`, `sortText`) the logic here is the following:
     *  separate props will have priority over `fieldProps` values **unless** the separate
     *  prop has a default value other than ones evaluating to `false` (boolean false,
     *  empty string).
     *  Field props that are set via `x-attrs` (e.g. `allowUnknownEntries`) in the OpenAPI definition
     *  have priority over `fieldProps` set values.
     *  Fields for which a unified appearance makes sense (e.g. `clearable`, `showErrorIcon`) or that
     *  are modified internally (e.g. `input`, `selectedList`) might not be settable
     *  via `fieldProps`.
     */
    fieldProps: {
      type: Object,
      default: () => ({}),
    },
    /**
     * a label for the field
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * define if field label should be shown
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * a placeholder for the field
     * per default the placeholder attribute in OpenAPI `x-attrs` field will be used
     * (no need to specify that)
     */
    placeholder: {
      type: [String, Object],
      default: '',
    },
    /**
     * provide an options list for `autocomplete`, `chips` or `chips-below` fields
     * for field type `group` provide a nested object with field names
     * as properties and an array for each field to ensure the correct options are assigned
     * even if field names within different groups are identical
     */
    dropDownList: {
      type: [Array, Object],
      default: () => [],
    },
    /**
     * provide a second options list (needed e.g. for texts field (text type) or
     * contributors field (roles)
     */
    secondaryDropdown: {
      type: Array,
      default: () => [],
    },
    /**
     * possibility to steer field loading (`chips`, `autocomplete`) from outside
     */
    autocompleteLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * set the current language
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * provide available locales
     */
    availableLocales: {
      type: Array,
      default: () => [],
    },
    /**
     * set a sorting text
     */
    sortText: {
      type: String,
      default: 'Sort A - Z',
    },
    /**
     * pass down all necessary options for potential subform.
     *   see [BaseForm props](BaseForm)
     */
    fieldGroupParams: {
      type: Object,
      default: () => ({}),
    },
    /**
     * mark as required field
     *
     * **Caveat**: currently the required prop is only used to trigger [BaseChipsBelow](BaseChipsBelow) validation -
     *             for all other form fields it is only used for the `aria-required` attributes
     * **Note**: if required is also set via OpenAPI definition x-attrs (provided by prop `field`) this will overwrite the prop!
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field.
     * for an example see [BaseInput](BaseInput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid.
     * for an example see [BaseInput](BaseInput)
     */
    errorMessage: {
      type: String,
      default: '',
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
      validator: val => !Object.keys(val).length || (['text'].every(prop => Object.keys(val).includes(prop))
        && ['min', 'max', 'minLength', 'maxLength']
          .every(prop => Object.keys(val.text).includes(prop))),
    },
    /**
     * define if error icon should be shown.
     * for an example see [BaseInput](BaseInput)
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * if `true` a remove icon will be shown allowing to remove
     * all input at once.
     * for an example see [BaseInput](BaseInput)
     */
    clearable: {
      type: Boolean,
      default: true,
    },
    /**
     * specify the object property that should be used as identifier
     */
    identifierPropertyName: {
      type: String,
      default: 'source',
    },
    /**
     * specify the object property that should be used as value to be displayed
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
    /**
     * this prop gives the option to add assistive text for screen readers
     * properties:
     *
     * Options for inputs type `autocomplete`, `chips`, `chips-below`:
     * **loaderActive**: text that is announced when options are being fetched (prop
     *  `isLoading` is set `true`)
     *
     * Options for inputs type `chips`:
     * **optionToRemoveSelected**: text read when option is marked active for removal (by using
     *  backspace in empty input field). string {label} could be added to be replaced
     *  by the actual chip label (value in [`labelPropertyName`])
     *
     * Options for inputs type `chips`, `chips-below`:
     * **resultsRetrieved**: text that is announced when results were retrieved (drop down
     *  list changed)
     * **optionAdded**: text read when option was added to the selected list. string {label}
     *  could be added to be replaced by the actual chip label (value in [`labelPropertyName`])
     * **optionRemoved**: text read when option was removed from the selected list. string {label}
     *  could be added to be replaced by the actual chip label (value in [`labelPropertyName`])
     */
    assistiveText: {
      type: Object,
      default: () => ({
        loaderActive: 'loading.',
        resultsRetrieved: '{number} options in drop down.',
        optionAdded: 'option {label} added to selected list.',
        optionToRemoveSelected: 'option {label} from selected list marked for removal. Press delete or backspace to remove.',
        optionRemoved: 'option {label} removed.',
      }),
    },
  },
  emits: ['input-complete', 'fetch-autocomplete', 'field-value-changed', 'keydown', 'blur'],
  setup(props) {
    const { getLangLabel, hasI18n, getI18nTerm, setLangLabels } = useI18n(props.language);

    return {
      getLangLabel,
      hasI18n,
      getI18nTerm,
      setLangLabels,
    };
  },
  data() {
    return {
      /**
       * internal representation of field value
       * @type {any}
       */
      fieldValueInt: null,
      /**
       * variable for current text input in chips fields
       * @type {string}
       */
      textInput: '',
      /**
       * internal loading indicator
       * @type {boolean}
       */
      fetchingData: false,
      /**
       * internal active tab for multiline text field
       * @type {string}
       */
      activeTab: '',
      /**
       * store a copy of fieldValueInt to only trigger event when value
       *  has changed
       *  @type {any}
       */
      originalFieldValueInt: null,
    };
  },
  computed: {
    /**
     * need internal variable to be able to add event listeners
     * @returns {Object}
     */
    fieldPropsInt() {
      return {
        ...this.inputListeners,
        ...this.fieldProps,
      };
    },
    /**
     * need internal variable to be able to add event listeners
     * @returns {Object}
     */
    fieldGroupParamsInt() {
      return {
        ...this.inputListeners,
        ...this.fieldGroupParams,
        formFieldJson: this.groupFormFields,
        valueList: this.fieldValueInt,
        formId: `${this.fieldKey}_${this.field.name}`,
        fieldProps: this.fieldProps,
        dropDownLists: this.fieldGroupDropDownLists,
      };
    },
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$attrs,
        // and add custom listeners
        ...{
          onBlur: (event) => {
            /**
             * event emitted by field type `multiline`
             * @event blur
             * @param {KeyboardEvent} event - the native keydown event
             * @param {Object} field - the field information in order to be able
             *  to have the information from which field the event came from
             */
            this.$emit('blur', event, this.field);
          },
          onKeydown: (event) => {
            /**
             * event emitted by field type `multiline`
             * @event keydown
             * @param {KeyboardEvent} event - the native keydown event
             * @param {Object} field - the field information in order to be able
             *  to have the information from which field the event came from
             */
            this.$emit('keydown', event, this.field);
          },
          // stop custom events from bubbling up - we just want native events from input
          'values-changed': () => {},
          'fetch-autocomplete': () => {},
        },
      };
    },
    /**
     * import the relevant component
     * @returns {{readonly default?: {components: {BaseIcon: {data(): {baseIcons: null}, computed: {icon(): string, ariaAttribute(): *}, name: string, setup(): {internalId: *|string}, mounted(): void, props: {name: {default: null, validator(*): *, type: String | StringConstructor}, title: {default: string, type: String | StringConstructor}, desc: {default: string, type: String | StringConstructor}}}, BaseLoader: {readonly default?: {data(): {timeout: null}, watch: {hide(): void}, name: string, setup(*): {loader: RefObject<HTMLElement extends ShallowRef<infer V, unknown> ? V : (HTMLElement extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<HTMLElement>) | null extends ShallowRef<infer V, unknown> ? V : (null extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<null>)> | RefCallback<HTMLElement extends ShallowRef<infer V, unknown> ? V : (HTMLElement extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<HTMLElement>) | null extends ShallowRef<infer V, unknown> ? V : (null extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<null>)>, setLoaderAnnouncement: function(): void, announcement: RefObject<UnwrapRef<string>> | RefCallback<UnwrapRef<string>>}, props: {hide: {default: boolean, type: Boolean | BooleanConstructor}, loaderColor: {default: string, type: String | StringConstructor}, position: {default: function(): {}, type: Object | ObjectConstructor}, textOnLoaderShow: {default: string, type: String | StringConstructor}}}}}, emits, data(): {previousInput: string, invalidInt: string, inputInt: string}, computed: {inputListeners(): {onKeydown: function(*): void, onBlur: function(*): void, onInput: function(*): void}, showRemoveIcon(): boolean, allowNegativeNumber(): boolean, showLabelRow(): (Boolean|boolean), inputElement(): (*|null)}, watch: {isActiveInt(boolean): void, invalidInt(boolean): void, errorMessage: {handler(*): void, immediate: boolean}, invalid: {handler(*): void, immediate: boolean}, modelValue: {handler(*): void, immediate: boolean}, inputInt(string): void, isActive: {handler(*): void, immediate: boolean}}, methods: {triggerInputEvent(): void, onInputBlur(FocusEvent): void, clickedInside((FocusEvent|MouseEvent)): void, stringToFloat(string): number, inputIsNaN(string): boolean, blurInput(KeyboardEvent): void, removeMultipleChars(String, String): string, translateFloat(number): string, handleInputTab(*): void, removeInput(): void, roundDecimals(*): string}, name: string, setup(*, {emit: *}): {isActiveInt: Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>, idInt: RefObject<string extends (Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {[RawSymbol]?: true}) ? string : (string extends Map<infer K, infer V> ? (Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof Map<any, any>>>) : (string extends WeakMap<infer K, infer V> ? (WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof WeakMap<any, any>>>) : (string extends Set<infer V> ? (Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof Set<any>>>) : (string extends WeakSet<infer V> ? (WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof WeakSet<any>>>) : (string extends ReadonlyArray<any> ? {[K in keyof string]: UnwrapRefSimple<string[K]>} : (string extends (object & {[ShallowReactiveMarker]?: never}) ? {[P in keyof string]: P extends symbol ? string[P] : UnwrapRef<string[P]>} : string)))))) | number extends (Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {[RawSymbol]?: true}) ? number : (number extends Map<infer K, infer V> ? (Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof Map<any, any>>>) : (number extends WeakMap<infer K, infer V> ? (WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof WeakMap<any, any>>>) : (number extends Set<infer V> ? (Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof Set<any>>>) : (number extends WeakSet<infer V> ? (WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof WeakSet<any>>>) : (number extends ReadonlyArray<any> ? {[K in keyof number]: UnwrapRefSimple<number[K]>} : (number extends (object & {[ShallowReactiveMarker]?: never}) ? {[P in keyof number]: P extends symbol ? number[P] : UnwrapRef<number[P]>} : number))))))> | RefCallback<string extends (Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {[RawSymbol]?: true}) ? string : (string extends Map<infer K, infer V> ? (Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof Map<any, any>>>) : (string extends WeakMap<infer K, infer V> ? (WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof WeakMap<any, any>>>) : (string extends Set<infer V> ? (Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof Set<any>>>) : (string extends WeakSet<infer V> ? (WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<string, keyof WeakSet<any>>>) : (string extends ReadonlyArray<any> ? {[K in keyof string]: UnwrapRefSimple<string[K]>} : (string extends (object & {[ShallowReactiveMarker]?: never}) ? {[P in keyof string]: P extends symbol ? string[P] : UnwrapRef<string[P]>} : string)))))) | number extends (Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {[RawSymbol]?: true}) ? number : (number extends Map<infer K, infer V> ? (Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof Map<any, any>>>) : (number extends WeakMap<infer K, infer V> ? (WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof WeakMap<any, any>>>) : (number extends Set<infer V> ? (Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof Set<any>>>) : (number extends WeakSet<infer V> ? (WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<number, keyof WeakSet<any>>>) : (number extends ReadonlyArray<any> ? {[K in keyof number]: UnwrapRefSimple<number[K]>} : (number extends (object & {[ShallowReactiveMarker]?: never}) ? {[P in keyof number]: P extends symbol ? number[P] : UnwrapRef<number[P]>} : number))))))>, labelLocalized: ComputedRef<Object|string>, setFieldState: function(boolean): void, inputFrame: [null] extends [Ref] ? IfAny<null, Ref<null>, null> : Ref<UnwrapRef<null>, UnwrapRef<null> | null>, errorMessageInt: Ref<UnwrapRef<string>, UnwrapRef<string> | string>, errorMessageLocalized: ComputedRef<Object|string>}, mounted(): void, props: {inputId: {default: string, type: String | StringConstructor}, showErrorIcon: {default: boolean, type: Boolean | BooleanConstructor}, validationTexts: {default: function(): {min: string, max: string, minLength: string, maxLength: string}, validator: function(*): boolean, type: Object | ObjectConstructor}, decimalSeparator: {default: string, type: String | StringConstructor}, loadable: {default: boolean, type: Boolean | BooleanConstructor}, minLength: {default: null, type: Number | NumberConstructor}, assistiveText: {default: function(): {loaderActive: string}, type: Object | ObjectConstructor}, language: {default: string, validator: function(*): *, type: String | StringConstructor}, isActive: {default: null, type: Boolean | BooleanConstructor}, showLabel: {default: boolean, type: Boolean | BooleanConstructor}, required: {default: boolean, type: Boolean | BooleanConstructor}, min: {default: null, type: Number | NumberConstructor}, setFocusOnActive: {default: boolean, type: Boolean | BooleanConstructor}, inputClass: {default: string, type: String | StringConstructor}, disabled: {default: boolean, type: Boolean | BooleanConstructor}, placeholder: {default: string, type: String | StringConstructor}, linkedListOption: {default: null, type: [Number | NumberConstructor,String | StringConstructor]}, clearable: {default: boolean, type: Boolean | BooleanConstructor}, useFadeOut: {default: boolean, type: Boolean | BooleanConstructor}, max: {default: null, type: Number | NumberConstructor}, errorMessage: {default: string, type: String | StringConstructor}, label: {type: String | StringConstructor, required: boolean}, showInputBorder: {default: boolean, type: Boolean | BooleanConstructor}, dropDownListId: {default: string, type: String | StringConstructor}, isLoading: {default: boolean, type: Boolean | BooleanConstructor}, decimals: {default: null, type: Number | NumberConstructor}, invalid: {default: boolean, type: Boolean | BooleanConstructor}, hideInputField: {default: boolean, type: Boolean | BooleanConstructor}, modelValue: {default: string, type: [String | StringConstructor,Number | NumberConstructor]}, fieldType: {default: string, validator: function(*): *, type: String | StringConstructor}, maxLength: {default: null, type: Number | NumberConstructor}, useFormFieldStyling: {default: boolean, type: Boolean | BooleanConstructor}}}}|null}
     */
    fieldElement() {
      if (this.fieldType === 'text' || this.fieldType === 'integer' || this.fieldType === 'float') {
        return defineAsyncComponent(() => import('@/components/BaseInput/BaseInput.vue'));
      } if (this.fieldType === 'multiline') {
        return defineAsyncComponent(() => import('@/components/BaseMultilineTextInput/BaseMultilineTextInput.vue'));
      } if (this.fieldType === 'autocomplete') {
        return defineAsyncComponent(() => import('@/components/BaseAutocompleteInput/BaseAutocompleteInput.vue'));
      } if (this.fieldType === 'chips') {
        return defineAsyncComponent(() => import('@/components/BaseChipsInput/BaseChipsInput.vue'));
      } if (this.fieldType === 'chips-below') {
        return defineAsyncComponent(() => import('@/components/BaseChipsBelow/BaseChipsBelow.vue'));
      } if (this.fieldType === 'group') {
        return defineAsyncComponent(() => import('@/components/BaseForm/BaseForm.vue'));
      }
      return null;
    },
    /**
     * check which date field type was provided and set type accordingly
     * @returns {string}
     */
    dateType() {
      // check if date is an Object with properties or just string (= single date)
      // also need to check items in case date field is repeatable
      const props = this.field.properties || (this.field.items && this.field.items.properties)
        ? Object.keys(this.field.properties || this.field.items.properties) : [];
      if (!this.field.properties && (!this.field.items || !this.field.items.properties)) {
        return 'single';
      }
      if (props.includes('date_to') && props.includes('time_to')) {
        return 'daterangetimerange';
      }
      if (props.includes('date') && props.includes('time_to')) {
        return 'datetimerange';
      }
      if (props.includes('time')) {
        return 'datetime';
      }
      if (props.includes('date_to')) {
        return 'daterange';
      }
      if (props.includes('time_from') && props.includes('time_to')) {
        return 'timerange';
      }
      return 'single';
    },
    /**
     * get field properties from swagger info - necessary for subforms
     * @returns {Object}
     */
    groupFormFields() {
      // check if field group is a list (=repeatable) or not
      if (this.field.type === 'array') {
        return this.field.items.properties;
      }
      return this.field.properties;
    },
    /**
     * function to check if dropdowns for field groups are nested. Nesting was necessary
     * to ensure every field group gets their own dropdown even if field names are identical.
     * For backwards compatibility keep using direct base level fieldName array as fallback.
     * @returns {{ [fieldName]: Object[] }}
     */
    fieldGroupDropDownLists() {
      // get field name
      const fieldName = this.field.name;
      // get parent BaseForm $props.dropDownLists that were passed to BaseFormFieldCreator
      // as fieldGroupParams
      const { dropDownLists } = this.fieldGroupParams;
      // check if the nested object with the fieldName exists, if not fall back to use
      // field name directly
      return dropDownLists && dropDownLists[fieldName]
        ? dropDownLists[fieldName] : dropDownLists;
    },
    formFieldXAttrs() {
      // x-attrs should exist however just in case if not return an empty object
      // so that ['x-attrs'][xAttrProperty] does not throw errors
      return this.field['x-attrs'] || {};
    },
    // the type default for texts field
    textTypeDefault() {
      return {
        // map the language specific labels for no value selected to the default
        [this.labelPropertyName]: this.setLangLabels('form.noTextType', this.availableLocales),
        [this.identifierPropertyName]: '',
      };
    },
    // compute the texts type drop down list specific for texts
    textTypeOptions() {
      return [this.textTypeDefault].concat(this.secondaryDropdown);
    },
    // for chips input fields - check if it is a contributors field
    isContributorOrEquivalent() {
      return this.field.name === 'contributors'
        || this.formFieldXAttrs.equivalent === 'contributors';
    },
    // to determine text display for chips input
    fieldInput() {
      return this.textInput && this.textInput.length > 2;
    },
    // check if chips input is a single select field
    isChipsSingleSelect() {
      return (this.fieldType
        && this.fieldType.includes('chips')
        && this.field.type === 'object');
    },
    // check if label was specified - if not defer from title or check if there is a localized term
    labelInt() {
      if (this.label || this.fieldProps.label) {
        return this.label || this.fieldProps.label;
      }
      return this.field.title || this.getI18nTerm(this.field.name ? `form.${this.field.name}` : this.field.name);
    },
    // check if placeholder was specified - if not defer from
    // title or check if there is a localized term
    placeholderInt() {
      if (this.placeholder || this.fieldProps.placeholder) {
        return this.placeholder || this.fieldProps.placeholder;
      }
      const internalPlaceholder = this.formFieldXAttrs.placeholder || '';
      return internalPlaceholder || `${this.hasI18n ? this.getI18nTerm('form.select') : 'Select'} ${this.labelInt}`;
    },
    // compute field type
    fieldType() {
      return this.formFieldXAttrs.field_type || 'text';
    },
    tabs() {
      if (this.field.items && this.field.items.properties && this.field.items.properties.data
        && this.field.items.properties.data.items
        && this.field.items.properties.data.items.properties
        && this.field.items.properties.data.items.properties.language) {
        return Object.keys(this.field.items.properties
          .data.items.properties
          .language.properties
          .label.properties).filter(lang => this.availableLocales.includes(lang));
      }
      return [];
    },
    /**
     * check if field is either type integer of float
     * @returns {boolean}
     */
    isNumberField() {
      // get OpenAPI json field type and check if its a repeatable field (array)
      const openAPIFieldType = this.field.items ? this.field.items.type : this.field.type;
      // valid OpenAPI number field types are 'integer' and 'number'
      return ['integer', 'number'].includes(openAPIFieldType)
        // include 'text' here for backwards compatibility
        && ['integer', 'float', 'text'].includes(this.fieldType);
    },
    /**
     * check allowed number of decimals
     * @returns {number|null}
     */
    allowedDecimals() {
      // check if decimals were configured with priority for x-attrs
      const decimals = this.formFieldXAttrs.decimals || this.fieldProps.decimals;
      // get OpenAPI definition field type and also consider repeatable fields
      const numberFieldType = this.field.type === 'array' ? this.field.items.type : this.field.type;
      // get the OpenAPI definition field format
      const numberFieldFormat = this.field.type === 'array' ? this.field.items.format : this.field.format;
      // for OpenAPI data type 'number', that have format specified allow endless decimals
      // only 'float' and 'double' are defined in OpenAPI but it is an "open string-valued property"
      // so adding 'decimal' since backend model has data type Decimal
      if ((numberFieldType === 'number' && ['float', 'double', 'decimal'].includes(numberFieldFormat))
        && !(decimals || decimals === 0)) {
        return -1;
      }
      // for type float and decimals set limit to decimals
      if ((numberFieldType === 'number' || this.fieldProps.fieldType === 'number')
        && ['float', 'double', 'decimal'].includes(numberFieldFormat) && (decimals || decimals === 0)) {
        return decimals;
      }
      // for type integer prevent decimals
      if (numberFieldType === 'integer' || this.fieldProps.fieldType === 'number' || decimals === 0) {
        return 0;
      }
      return null;
    },
    /**
     * create the assistiveText object as required by the input component
     * depending on field type
     * @returns {{loaderActive: (string|*)}|Object|undefined|{}}
     */
    assistiveTextInt() {
      if (this.fieldType === 'chips') {
        return this.assistiveText;
      }
      if (this.fieldType === 'autocomplete') {
        return {
          loaderActive: this.assistiveText.loaderActive || '',
        };
      }
      if (this.fieldType === 'chips-below') {
        const textObject = { ...this.assistiveText };
        delete textObject.optionToRemoveSelected;
        return textObject;
      }
      return undefined;
    },
  },
  watch: {
    fieldValue: {
      handler(val) {
        if (JSON.stringify(this.fieldValueInt) !== JSON.stringify(val)) {
          this.setFieldValue(val);
          const tabs = this.fieldProps.tabs || this.tabs;
          if (tabs && tabs.length) {
            this.activeTab = this.setActiveTab();
          }
        }
      },
      immediate: true,
    },
    fieldValueInt: {
      handler(val) {
        // prevent event being fired when change comes from outside
        if (val !== undefined && JSON.stringify(this.fieldValue) !== JSON.stringify(val)) {
          /**
           * Event emitted when field value changed internally
           *
           * @event field-value-changed
           * @property {Object, Array, String, Number} - the changed field value
           */
          this.$emit('field-value-changed', val);
        }
      },
      deep: true,
    },
    dropDownList: {
      handler() {
        this.fetchingData = false;
      },
      deep: true,
    },
  },
  mounted() {
    // the first time the field is mounted set the initial field value
    // and tabs (if applicable)
    this.setFieldValue(this.fieldValue);
    if (this.tabs && this.tabs.length) {
      this.activeTab = this.setActiveTab();
    }
  },
  methods: {
    // function for setting internal field value breaking all potential links to
    // value passed from parent
    setFieldValue(val) {
      if (val && typeof val === 'object') {
        // check if it is array
        if (val.length >= 0) {
          this.fieldValueInt = [].concat(JSON.parse(JSON.stringify(val)));
          // else assume it is object
        } else {
          this.fieldValueInt = { ...JSON.parse(JSON.stringify(val)) };
        }
        // or simply assign directly if string
      } else {
        this.fieldValueInt = val;
      }
    },
    // as above but specific for multiline text input field
    setInputValue(val) {
      if (!val || typeof val === 'string' || typeof val === 'number') {
        this.fieldValueInt = val;
      } else {
        this.fieldValueInt = { ...this.fieldValueInt, ...JSON.parse(JSON.stringify(val)) };
      }
    },
    /**
     * called by chips input autocomplete
     * @param {Object} event - the spread object emitted
     * @property {string} event.value - the string in the input field
     */
    fetchAutocomplete({ value }) {
      this.fetchingData = true;
      this.textInput = value;
      /**
       * Event emitted for text input on autocomplete fields (field types `autocomplete`,
       * `chips`, `chips-below`)
       *
       * @event fetch-autocomplete
       * @property {string} value - the string to autocomplete
       * @property {string} name - the name of the field
       * @property {string} source - the url to request the data from
       * @property {?string} equivalent - string specified for related fields e.g. for contributor roles equivalent is 'contributor'
       * @property {?string[]} parentFields - in case the autocomplete event originates from a subform the subform id's (field property names) are specififed in this array (most nested property last)
       */
      this.$emit('fetch-autocomplete', {
        value,
        name: this.field.name,
        source: this.formFieldXAttrs.source,
        equivalent: this.formFieldXAttrs.equivalent,
      });
    },
    /**
     * called from subform - already contains all the information to pass
     * to parent (see above for details)
     * @param {Object} autocompleteInformation
     */
    subFormFetchAutocomplete(autocompleteInformation) {
      const parentFieldsArary = autocompleteInformation.parentFields || [];
      parentFieldsArary.unshift(this.field.name);
      this.$emit('fetch-autocomplete', {
        ...autocompleteInformation,
        parentFields: parentFieldsArary,
      });
    },
    /**
     * function getting label from all possible label structures (lang object (--> get
     // correct lang) or simple string)
     * @param {string|Object} value - the language string or object - if object it contains
     * all the languages e.g. { de: '', en: '' }
     * @returns {string}
     */
    getLabel(value) {
      return this.getLangLabel(value, this.language, true);
    },
    // functionality for multiline text input with language tabs
    setActiveTab() {
      // check which locales have content
      const localesWithContent = this.availableLocales.filter(lang => !!this.fieldValueInt[lang]);
      // if none of the locales has content or the current locale has content
      // - return current locale - else first alternative
      return !localesWithContent.length || this.fieldValueInt[this.language]
        ? this.language : localesWithContent[0];
    },
    // function for mulitline text input to set drop down field correctly
    setMultilineDropDown(val) {
      // set texts type value if present - otherwise set empty
      // TODO: source is still hardcoded here??
      this.fieldValueInt.type = val.source ? val : null;
      this.emitCompletedInputValues();
    },
    // prevent default action for everything except multiline
    onEnter(event) {
      if (this.fieldType !== 'multiline') {
        event.preventDefault();
        // also emit event that input was completed (e.g. for triggering search)
        this.emitCompletedInputValues();
      }
    },
    /**
     * function to trigger event informing parent that input on that specific input field was completed
     */
    emitCompletedInputValues() {
      // check if the value actually changed
      if (JSON.stringify(this.fieldValueInt) !== JSON.stringify(this.originalFieldValueInt)) {
        // store the new reference value in the original variable
        this.originalFieldValueInt = JSON.parse(JSON.stringify(this.fieldValueInt));
        /**
         * event emitted once an input was completed (e.g. an option selected in chips input or
         *  an enter key triggered in BaseInput or after a date was validated)
         *  @event input-complete
         *  @property {string, number, Object, Array} - the updated value
         */
        this.$emit('input-complete', this.fieldValueInt);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

  .base-form-field-creator__field-array {
    margin-top: $spacing-small;
    display: flex;
    flex-direction: column;

    .base-form-field-creator__field-array-label {
      color: $font-color-second;
      margin-bottom: $spacing-small;
      z-index: map.get($zindex, boxcontent);
    }

    .base-form-field-creator__subform-wrapper {
      border-right: 3px solid rgb(240, 240, 240);
      border-left: 3px solid rgb(240, 240, 240);

      .base-form-field-creator__subform {
        position: relative;
        margin: -$spacing auto;
        width: calc(100% - 6px);

        @media screen and (max-width: $mobile) {
          margin: -$spacing auto;
        }
      }
    }
  }

  // this class is used in BaseForm.vue!
  .base-form-field-creator__date-field-wrapper {
    display: flex;
    flex-direction: row;
    gap: $spacing;

    @media screen and (max-width: 1260px) {
      flex-direction: column;
    }

    @media screen and (max-width: $mobile) {
      gap: $spacing-small;
    }

    .base-form-field-creator__date-field--spacing {
      @media screen and (min-width: 1261px) {
        margin-top: calc(#{$line-height} + #{$spacing-small});
      }
    }
  }

  .base-form-field-creator__multiline-dropdown {
    text-transform: capitalize;
  }

  .base-form-field-creator__chips-dropdown-second {
    margin-left: $spacing;
    color: $font-color-second;
    font-size: $font-size-small;
    margin-top: 1px;
    flex-grow: 2;
  }

  .base-form-field-creator__chips-dropdown-third {
    color: $font-color-third;
    font-size: $font-size-small;
    margin-top: auto;
    white-space: nowrap;
  }

  .base-form-field-creator__date-fieldset {
    display: contents;
  }

  .base-form-field-creator__toggle {
    display: flex;
    flex-direction: column;
  }
</style>
