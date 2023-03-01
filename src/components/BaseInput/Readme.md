## Demo

A simple example without label

```vue live
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

A example with label and slot demonstrations. Also enter text to see clearable state or toggle controls to see various properties such as invalid state and the `below-input` slot.
Also it is demonstrated here how to use the `isActive` prop.

All events emitted by the native input element (e.g. `@keydown`) contained in the BaseInput component are also available.

```vue live

<template>
  <div>
    <BaseInput
      id="withslot"
      v-model="input"
      :invalid="invalid"
      :disabled="disabled"
      :required="true"
      :isActive="inputActive || dropdownActive"
      :clearable="clearable"
      :use-form-field-styling="useFormFieldStyling"
      :show-input-border="showInputBorder"
      :show-label="showLabel"
      :show-error-icon="showErrorIcon"
      :field-type="type.value"
      :loadable="true"
      :is-loading="isLoading"
      error-message="Your field is invalid"
      label="This label says Specify any text below"
      placeholder="A custom placeholder"
      @click-input-field="inputActive = true"
      @clicked-outside="inputActive = false">
      <template #label-addition>
        <div>label-addition</div>
      </template>
      <template #pre-input-field>
        <div class="pre-input-field">
          pre-input-field
        </div>
      </template>
      <template #input-field-addition-before>
        <span class="input-field-addition-before">input-field-addition-before</span>
      </template>
      <template #input-field-inline-before>
        <span class="input-field-inline-before">input-field-inline-before</span>
      </template>
      <template #below-input>
        <div
          v-if="dropdownActive"
          class="drop-down-slot">
          Text Box Below Input - e.g. for a drop down
        </div>
      </template>
      <template #input-field-addition-after>
        <span class="input-field-addition-after">
          input-field-addition-after
        </span>
      </template>
      <template #post-input-field>
        <span class="post-input-field">
          post-input-field
        </span>
      </template>
      <template #remove-icon>
        <BaseIcon
          v-if="useCustomRemoveIcon"
          name="clock"
          class="icon"/>
      </template>
      <template #error-icon>
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
export default {
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

.input-field-inline-before{
  background: darkseagreen;
}

.input-field-addition-after {
  background: violet;
}

.pre-input-field {
  background: rosybrown;
  align-self: center;
  flex: 1 1 25%;
}

.post-input-field {
  background: lightgoldenrodyellow;
  align-self: center;
  margin-left: 8px;
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
