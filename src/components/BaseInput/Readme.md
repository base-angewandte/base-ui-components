A simple example without label

```vue
<template>
  <BaseInput
    id="simpleexample"
    label="This label says Specify any text below"
    placeholder="A custom placeholder"/>
</template>
<script>
export default{};
</script>

```

A example with label and slot demonstrations. Also enter text to see clearable state or toggle controls to see various properties such as invalid state and the 'below-input' slot.<br>
Also it is demonstrated here how to use the isActive prop.

All events emitted by the native input element (e.g. @keydown) contained in the BaseInput component are also available.

```vue

<template>
  <div>
    <BaseInput
      id="withslot"
      v-model="input"
      :invalid="invalid"
      :required="true"
      :isActive="inputActive || dropdownActive"
      :clearable="clearable"
      :use-form-field-styling="useFormFieldStyling"
      :show-input-border="showInputBorder"
      :show-label="showLabel"
      :show-error-icon="showErrorIcon"
      :field-type="type.value"
      error-message="Your field is invalid"
      label="This label says Specify any text below"
      placeholder="A custom placeholder"
      @keydown.tab="inputActive = false"
      @click-input-field="inputActive = true"
      @clicked-outside="inputActive = false">
      <template v-slot:label-addition>
        <div>Add elements here</div>
      </template>
      <template v-slot:input-field-addition-before>
        <span class="input-field-addition-before">Or here</span>
      </template>
      <template v-slot:below-input>
        <div
          v-if="dropdownActive"
          class="drop-down-slot">
          Text Box Below Input - e.g. for a drop down
        </div>
      </template>
      <template v-slot:input-field-addition-after>
        <div
          v-if="isLoading"
          :style="{
              margin: '0 16px',
              transform: 'scale(0.5)',
               ['pointer-events']: 'none',
          }">
          <BaseLoader/>
        </div>
      </template>
      <template v-slot:remove-icon>
        <BaseIcon
          v-if="useCustomRemoveIcon"
          name="clock"
          class="icon"/>
      </template>
      <template v-slot:error-icon>
        <BaseIcon
          v-if="useCustomErrorIcon"
          name="eye"
          class="icon"/>
      </template>
    </BaseInput>
    <div class="button-row">
      <BaseToggle
        v-model="invalid"
        label="invalid"
        name="toggle invalid"
        class="toggle"/>
      <BaseToggle
        v-model="disabled"
        label="disabled"
        name="toggle disabled"
        class="toggle"/>
      <BaseToggle
        v-model="dropdownActive"
        label="show drop down"
        name="toggle drop down display"
        class="toggle"/>
      <BaseToggle
        v-model="isLoading"
        label="show loader"
        name="toggle loader"
        class="toggle"/>
      <BaseToggle
        v-model="clearable"
        label="clearable"
        name="toggle clearable"
        class="toggle"/>
      <BaseToggle
        v-model="showInputBorder"
        label="input border"
        name="show input border"
        class="toggle"/>
      <BaseToggle
        v-model="useFormFieldStyling"
        label="form field styling"
        name="use standard form field styling"
        class="toggle"/>
      <BaseToggle
        v-model="showLabel"
        label="show label"
        name="show label"
        class="toggle"/>
      <BaseToggle
        v-model="showErrorIcon"
        label="show error icon"
        name="show error icon"
        class="toggle"/>
      <BaseToggle
        v-model="useCustomErrorIcon"
        :disabled="invalid"
        label="custom error icon"
        name="use a custom error icon"
        class="toggle"/>
      <BaseToggle
        v-model="useCustomRemoveIcon"
        :disabled="!!input"
        label="custom remove icon"
        name="use a custom remove icon"
        class="toggle"/>
    </div>
    <BaseDropDown
      v-model="type"
      :options="[
            {
              label: 'text',
              value: 'text'
            },
            {
              label: 'number',
              value: 'number'
            },
            {
              label: 'password',
              value: 'password'
            },
            {
              label: 'email',
              value: 'email'
            },
            {
              label: 'url',
              value: 'url'
            },
        ]"
      :show-label="true"
      label="Field type" />
  </div>
</template>

<script>
import BaseToggle from '../BaseToggle/BaseToggle';
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseLoader from '../BaseLoader/BaseLoader';
import BaseDropDown from '../BaseDropDown/BaseDropDown';

export default {
  components: {
    BaseDropDown,
    BaseLoader,
    BaseIcon,
    BaseToggle
  },
  data() {
    return {
      invalid: false,
      disabled: false,
      dropdownActive: false,
      inputActive: false,
      isLoading: false,
      clearable: true,
      useFormFieldStyling: true,
      showInputBorder: true,
      showLabel: true,
      showErrorIcon: true,
      useCustomRemoveIcon: false,
      useCustomErrorIcon: false,
      input: 'Test input',
      type: {
        label: 'text',
        value: 'text',
      },
    };
  },
};
</script>
<style>
.input-field-addition-before {
  margin-right: 16px;
  background-color: lightblue;
}

.drop-down-slot {
  width: 100%;
  height: 48px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.icon {
  height: 16px;
  margin: 0 8px;
}

.button-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 16px;
}

.toggle {
  margin-right: 16px;
}
</style>

```
