import{_ as r,a,b as n,o as s,aL as l,I as o,i as e,x as i}from"./chunks/framework.DNZP2baM.js";const v=JSON.parse('{"title":"BaseChipsInputField","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChipsInputField.md","filePath":"components/BaseChipsInputField.md","lastUpdated":1684331147000}'),p={name:"components/BaseChipsInputField.md"};function c(u,t,h,b,f,m){const d=a("vue-live");return s(),n("div",null,[t[0]||(t[0]=l("",13)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      v-model:selected-list="selectedList"
      :allow-unknown-entries="true"
      :add-selected-entry-directly="true"
      :sortable="true"
      :draggable="true"
      :always-linked="true"
      :is-string-array="true"
      :show-error-icon="true"
      :invalid="true"
      placeholder="type + enter to add chips"
      label="A simple chips input field example"
      @focus="focused = true"
      @blur="focused = false"
    />
    <div>
      {{ "Focus: " + focused }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      selectedList: [],
      focused: false,
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=e("p",null,"Example using the 'chip' slot with all props provided by the slot. Click the chip or use backspace to remove it.",-1)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInputField
    v-model="input"
    v-model:selected-list="selectedList"
    :allow-unknown-entries="true"
    :add-selected-entry-directly="true"
    :sortable="true"
    :draggable="true"
    :always-linked="true"
    :is-string-array="true"
    :invalid="true"
    :is-loading="true"
    placeholder="type + enter to add chips"
    label="Slot example"
  >
    <template #chip="slotProps">
      <!-- if element should be draggable it needs to contain the class 'base-chip__text' -->
      <div
        :key="slotProps.entry.idInt"
        :class="[
          'crazy-chips',
          'base-chip__text',
          {
            'active-for-remove':
              slotProps.chipActiveForRemove === slotProps.index,
          },
        ]"
        @click="slotProps.removeEntry(slotProps.entry, slotProps.index)"
      >
        {{ slotProps.entry.label }}
      </div>
    </template>
    <template #label-addition> label-addition slot </template>
    <template #pre-input-field>
      <span class="pre-input-field"> pre-input-field </span>
    </template>
    <template #input-field-addition-before>
      <div class="input-field-addition-before">input-field-addition-before</div>
    </template>
    <template #input-field-inline-before>
      <div class="input-field-inline-before">input-field-inline-before</div>
    </template>
    <template #input-field-addition-after>
      <div class="input-field-addition-after">input-field-addition-after</div>
    </template>
    <template #post-input-field>
      <span class="post-input-field"> post-input-field </span>
    </template>
    <template #remove-icon>
      <BaseIcon :style="{ height: '16px', width: '16px' }" name="waste-bin" />
    </template>
    <template #error-icon>
      <BaseIcon :style="{ height: '24px', width: '24px' }" name="information" />
    </template>
    <template #below-input> below-input slot </template>
  </BaseChipsInputField>
</template>

<script>
export default {
  data() {
    return {
      input: "Test Input",
      selectedList: [],
    };
  },
};
<\/script>

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

.pre-input-field {
  background: rosybrown;
}

.input-field-addition-before {
  background: darkseagreen;
  width: 100%;
}
.input-field-inline-before {
  background: dodgerblue;
}
.input-field-addition-after {
  background: peachpuff;
}
.post-input-field {
  background: lightgoldenrodyellow;
}
</style>
`,requires:{}}),t[2]||(t[2]=e("p",null,[i("Also see one more example in combination with a "),e("a",{href:"./BaseDropDownList"},"BaseDropDownList"),i(".")],-1))])}const y=r(p,[["render",c]]);export{v as __pageData,y as default};
