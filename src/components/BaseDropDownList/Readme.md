## Demo

A list in drop down style. Click the button to display!

```vue live
<template>
    <div class="drop-down-test">
        <div class="button-display-area">
            <BaseButton
                text="toggle Dropdown"
                @clicked="showDropDown = !showDropDown" />
            <div>
                {{ 'Selected Option: ' + selected.value }}
            </div>
        </div>

        <BaseDropDownList
            v-if="showDropDown"
            :selected-option.sync="selected"
            :select-styled="true"
            :drop-down-options="list"
            list-id="aSimpleTestList"
         />
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDropDown: false,
            selected: {},
            list: [
                {
                    value: "Test 1",
                    id: '1',
                },
                {
                    value: "Test 12",
                    id: '12',
                },
                {
                    value: "Test 13",
                    id: '13',
                },
                {
                    value: "Test 14",
                    id: '14',
                },
            ],
        };
    },
};
</script>

<style>
    .drop-down-test {
      background: white;
    }
    .button-display-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
```

An example connected with an input field (displayAsDropDown: false)

```vue live

<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      :show-label="false"
      :selected-list.sync="selectedList"
      drop-down-list-id="aSimpleTestList"
      identifier-property-name="id"
      label-property-name="value"
      placeholder="Add new chips via enter"
      label="A basic input for drop down"
      @keydown.up.down.prevent="navigate"
      @keydown.enter.prevent="addChipByKeyboard"/>
    <BaseDropDownList
        :active-option.sync="active"
        :drop-down-options="optionsListInt"
        :display-as-drop-down="false"
        list-id="aSimpleTestList"
        class="base-drop-down-list-example"
        @update:selected-option="addChipByClick">
      <template #before-list>
          <div class="slot">
            This is a slot before the list
          </div>
      </template>
      <template #after-list>
        <div class="slot">
          This is a slot after the list
        </div>
      </template>
      <template #no-options>
        Add a custom text or elements when no options
        are available via 'no-options' slot
      </template>
      <template #option="items">
        <div class="option">
          {{ items.option.value }}<span class="customized-option">this is customized via option slot!'</span>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      active: {},
      selectedList: [],
      optionsList: [
        {
            value: "Lion",
            id: '1',
        },
        {
            value: "Lioness",
            id: '12',
        },
        {
            value: "Tiger",
            id: '13',
        },
        {
            value: "Elephant",
            id: '14',
        },
      ],
    };
  },
  computed: {
    optionsListInt() {
      return this.optionsList
        .filter(option => !this.selectedList.map(sel => sel.id).includes(option.id))
        .filter(option => option.value.toLowerCase().includes(this.input.toLowerCase()));
    },
  },
  watch: {
    optionsListInt() {
      if (this.active && Object.keys(this.active).length) {
        this.active = this.optionsListInt.length ? this.optionsListInt[0] : null;
      }
    },
  },
  methods: {
    addChipByKeyboard() {
      if (this.active) {
        this.selectedList.push(this.active);
        this.input = '';
      }
    },
    addChipByClick(option) {
      this.selectedList.push(option);
      this.input = '';
    },
    navigate(event) {
      const currentIndex = this.optionsListInt.indexOf(this.active);
      const listLength = this.optionsListInt.length;
      if (event.key === 'ArrowUp') {
        const newIndex = currentIndex - 1;
        this.active = newIndex >= 0 ? this.optionsListInt[currentIndex - 1]
          : this.optionsListInt[listLength - 1];
      } else if (event.key === 'ArrowDown') {
        const newIndex = currentIndex + 1;
        this.active = this.optionsListInt[newIndex < listLength ? newIndex : 0];
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .base-drop-down-list-example {
    max-width: 100%;
    border: 1px solid lightgrey;
  }
  .slot {
    background: lightblue;
    padding: 0 16px;
    line-height: 32px;
  }
  .option {
    padding: 0 16px;
  }
  .customized-option {
    color: red;
    margin-left: 16px;
  }
</style>
```
