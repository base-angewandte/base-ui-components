A list in drop down style. Click the button to display!

```vue
<template>
    <div class="drop-down-test">
        <div class="button-display-area">
            <BaseButton
                text="toggle Dropdown"
                @clicked="showDropDown = !showDropDown" />
            <div>
                {{ 'Selected Option: ' + selected.value }}
            </div>
            <div>
                {{ 'Active Option: ' + active.value }}
            </div>
        </div>

        <BaseDropDownList
            v-if="showDropDown"
            :active-option.sync="active"
            :selected-option.sync="selected"
            :select-styled="true"
            :drop-down-options="list"
            list-id="aSimpleTestList"
         />
    </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';

export default {
    components: {
        BaseButton,
    },
    data() {
        return {
            showDropDown: false,
            active: {},
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
    .button-display-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
```

An example connected with an input field (displayAsDropDown: false)

```vue

<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      :show-label="false"
      :selected-list.sync="selectedList"
      identifier-property-name="id"
      value-property-name="value"
      placeholder="Add new chips via enter"
      label="A basic input for drop down"
      @keydown.enter.prevent="addChip"/>
    <BaseDropDownList
        :active-option.sync="active"
        :drop-down-options="optionsListInt"
        :display-as-drop-down="false"
        list-id="aSimpleTestList"
        class="base-drop-down-list-example">
      <template v-slot:before-list>
          <div class="slot">
            This is a slot before the list
          </div>
      </template>
      <template v-slot:after-list>
        <div class="slot">
          This is a slot after the list
        </div>
      </template>
      <template v-slot:no-options>
        Add a custom text or elements when no options
        are available via 'no-options' slot
      </template>
      <template v-slot:option="items">
        <div>
          {{ items.option.value }}<span class="customized-option">this is customized via option slot!'</span>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';

export default {
  components: {
    BaseChipsInputField,
  },
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
      this.active = this.optionsListInt.length ? this.optionsListInt[0] : null;
    },
  },
  methods: {
    addChip() {
      if (this.active) {
        this.selectedList.push(this.active);
        this.input = '';
      }
    },
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
  .customized-option {
    color: red;
    margin-left: 16px;
  }
</style>





```

