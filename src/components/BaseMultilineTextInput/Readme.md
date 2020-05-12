Basic example with no extra settings

```vue
<template>
  <div>
    <BaseMultilineTextInput
      label="Simple Multiline Label"
      placeholder="Enter Text here"
      v-model="textInput"/>
    <div>{{ 'Your text was: ' + textInput }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: '',
    };
  },
};
</script>

```

Example with Tabs

```vue
<template>
  <div>
    <BaseMultilineTextInput
      :tabs="['English', 'German']"
      label="Multiline Label Tabs"
      placeholder="Enter Text here"
      v-model="textInput"/>
    <div
        v-for="item of Object.keys(textInput)"
        :key="item">
      <span>{{ item + ': ' + textInput[item] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: {
        English: 'Text Set from Outside',
        German: '',
      },
    };
  },
};
</script>

```
