Simple chips input field example stand alone.

Additionally, to custom events, this component also has all events available emitted by the native input element (e.g. focus or blur events).

Also try to drag or sort the chips!

```vue
<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      :selected-list.sync="selectedList"
      :allow-unknown-entries="true"
      :add-selected-entry-directly="true"
      :sortable="true"
      :draggable="true"
      :always-linked="true"
      :is-string-array="true"
      placeholder="type + enter to add chips"
      label="A simple chips input field example"
      @focus="focused = true"
      @blur="focused = false" />
    <div>
      {{ 'Focus: ' + focused }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      selectedList: [],
      focused: false,
    };
  },
};
</script>
```


Example using the 'chip' slot with all props provided by the slot. Click the chip or use backspace to remove it.

```vue
<template>
  <BaseChipsInputField
    v-model="input"
    :selected-list.sync="selectedList"
    :allow-unknown-entries="true"
    :add-selected-entry-directly="true"
    :sortable="true"
    :draggable="true"
    :always-linked="true"
    :is-string-array="true"
    :invalid="true"
    :is-loading="true"
    placeholder="type + enter to add chips"
    label="Slot example">
    <template v-slot:chip="slotProps">
      <!-- if element should be draggable it needs to contain the class 'base-chip__text' -->
      <div
        :key="slotProps.entry.idInt"
        :class="['crazy-chips', 'base-chip__text',
          { 'active-for-remove': slotProps.chipActiveForRemove === slotProps.index },
        ]"
        @click="slotProps.removeEntry(slotProps.entry, slotProps.index)">
        {{ slotProps.entry.label }}
      </div>
    </template>
    <template v-slot:label-addition>
      label-addition slot
    </template>
    <template v-slot:input-field-addition-before>
      <div>input-field-addition-before</div>
    </template>
    <template v-slot:input-field-addition-after>
      <div>input-field-addition-after</div>
    </template>
    <template v-slot:remove-icon>
      <BaseIcon
        :style="{ height: '16px', width: '16px' }"
        name="waste-bin" />
    </template>
    <template v-slot:error-icon>
      <BaseIcon
        :style="{ height: '24px', width: '24px' }"
        name="information" />
    </template>
    <template v-slot:below-input>
      below-input slot
    </template>
  </BaseChipsInputField>
</template>

<script>
export default {
  data() {
    return {
      input: 'Test Input',
      selectedList: [],
    };
  },
};
</script>

<style>
  .crazy-chips {
    display: flex;
    background: red;
    padding: 32px;
    margin: 2px;
  }

  .active-for-remove {
    background: blue;
  }
</style>
```

Also see one more example in combination with a BaseDropDownList [there](#basedropdownlist).
