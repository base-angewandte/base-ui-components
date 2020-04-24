<template>
  <div id="app">
    <div class="canvas flex">
      <!-- BASE IMAGE BOX TEST -->
      <BaseImageBox
        :selectable="selectable"
        :show-title="false"
        :image-url="require('@/assets/images/img1.png')"
        description="Bildserie"
        title="Afterlife II Ausstellungsansichten"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        :image-url="require('@/static/images/icons.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        :image-url="require('@/static/images/roboto_detail_fullscreen_12pt.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseButton
        :active="false"
        :text="'Activate Select'"
        icon-size="large"
        button-style="row"
        @clicked="enableSelect()" />
    </div>
    <div class="form-field canvas">
      <!-- testing all the altered componenents here -->
      <BaseDateInput
        v-model="inputDateTime"
        :type="'datetime'"
        :label="'unknown'" />
      <BaseDateInput
        :label="'unknown'"
        :input="inputDate"
        language="de"
        type="daterange"
        format="date_year" />
      <BaseToggle
        name="BaseToggle"
        label="Zeige Einträge anderen Benutzer*innen auf meinem Showroom-Profil an." />
      <BaseChipsInput
        :list="dropDownInput"
        :placeholder="'Select Your Marx'"
        :selected-list="chipsInput"
        :allow-multiple-entries="true"
        :allow-dynamic-drop-down-entries="true"
        :object-prop="'value'"
        :chips-inline="true"
        :chips-editable="true"
        :identifier="'id'"
        draggable
        label="A label"
        @fetchDropDownEntries="fetch" />
      <BaseChipsInput
        :list="[
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '***', source: '1' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '**', source: '2' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '*', source: '3' },
          { title: 'in denen der Mensch', source: '4' },
          { title: 'ein erniedrigtes, ein geknechtetes', source: '5' },
          { title: 'ein verlassenes, ein verächtliches', source: '6' },
          { title: 'Wesen ist', source: '7' }]"
        :placeholder="'Select your Marx'"
        :object-prop="'title'"
        :chips-editable="true"
        :identifier="'source'"
        :label="'single choice with special drop down body'"
        :allow-unknown-entries="true"
        :add-new-chip-text="'asdfasdfasdfasdf'"
        :allow-multiple-entries="false">
        <template
          v-slot:drop-down-entry="props">
          <span>{{ props.item.title }}</span>
          <span>{{ props.item.additional }}</span>
          <span>{{ props.item.remark }}</span>
        </template>
      </BaseChipsInput>
      <BaseAutocompleteInput
        v-model="autocompleteInput"
        :list="dropDownInput"
        :placeholder="'Fetching from SkosMos'"
        :object-prop="'prefLabel'"
        label="text input with dynamic autocomplete"
        @selected="fetchOther($event, 'this is my type')"/>
      <BaseChipsBelow
        v-model="selectedList"
        :chips-inline="false"
        :chips-editable="true"
        :allow-unknown-entries="false"
        :list="[{
                  id: '1',
                  name: 'Herbert Marcuse'
                },
                {
                  id: '2',
                  name: 'Erich From',
                },
                {
                  id: '',
                  name: 'Georg Werth',
                }]"
        :role-options="['Farmer', 'Magician', 'Priest']"
        :hoverbox-content="hoverboxContent"
        identifier="id"
        object-prop="name"
        label="chips-below-test"
        @hoverbox-active="setHoverBox" />
      <BaseInput
        :show-label="false"
        label="This label says Specify any text below"
        placeholder="A custom placeholder" />
      <BaseMenuList
        :selected="showCheckbox"
        :list="list"
        @clicked="activateMenuEntry" />
      <BaseButton
        text="toggle checkboxes"
        button-style="row"
        @clicked="showCheckbox = !showCheckbox" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import BaseInput from './components/BaseInput/BaseInput';
import BaseMenuList from './components/BaseMenuList/BaseMenuList';
import BaseChipsInput from './components/BaseChipsInput/BaseChipsInput';
import BaseAutocompleteInput from './components/BaseAutocompleteInput/BaseAutocompleteInput';
import BaseChipsBelow from './components/BaseChipsBelow/BaseChipsBelow';
import BaseDateInput from './components/BaseDateInput/BaseDateInput';
import BaseButton from './components/BaseButton/BaseButton';
import BaseImageBox from './components/BaseImageBox/BaseImageBox';
import BaseToggle from './components/BaseToggle/BaseToggle';

export default {
  name: 'App',
  components: {
    BaseImageBox,
    BaseButton,
    BaseChipsBelow,
    BaseDateInput,
    BaseAutocompleteInput,
    BaseChipsInput,
    BaseMenuList,
    BaseInput,
    BaseToggle,
  },
  data() {
    return {
      selectionList: [
        { label: 'Option 1', value: 'option 1' },
        { label: 'Option 2', value: 'option 2' },
        { label: 'Option 3', value: 'option 3' },
        { label: 'Option 4', value: 'option 4' },
        { label: 'Option 44444444444444444444', value: 'option 4466' },
        { label: 'Option 44444444444444444444', value: 'option 4455' },
        { label: 'Option 44444444444444444444', value: 'option 44166' },
        { label: 'Option 44444444444444444444', value: 'option 44143' },
        { label: 'Option 44444444444444444444', value: 'option 4412' },
        { label: 'Option 44444444444444444444', value: 'option 4490' },
        { label: 'Option 44444444444444444444', value: 'option 449' },
        { label: 'Option 44444444444444444444', value: 'option 448' },
        { label: 'Option 44444444444444444444', value: 'option 447' },
        { label: 'Option 44444444444444444444', value: 'option 446' },
        { label: 'Option 44444444444444444444', value: 'option 445' },
        { label: 'Option 44444444444444444444', value: 'option 443' },
        { label: 'Option 44444444444444444444', value: 'option 444' },
        { label: 'Option 44444444444444444444', value: 'option 442' },
        { label: 'Option 44444444444444444444', value: 'option 441' },
      ],
      selectedVal: {},
      newEntity: {
        title: '',
        subtitle: '',
        type: '',
      },
      selectedList: ['Leo Löwenthal', 'Eike Geisel', 'Theodor Adorno'],
      chipsInput: [],
      dropDownInput: [
        '...alle Verhältnisse umzuwerfen',
        'in denen der Mensch',
        'ein erniedrigtes, ein geknechtetes',
        'ein verlassenes, ein verächtliches',
        'Wesen ist'],
      menuEntryActive: false,
      showCheckbox: false,
      showPopUp: false,
      files: [],
      elements: [],
      multilineInput: 'test',
      multilineTest: '',
      selectable: false,
      progress: 0,
      autocompleteInput: 'testtttttttttttt',
      inputDate: {
        date_from: '2019',
        date_to: '',
      },
      inputDateTime: {
        date: '12.12.2019',
        time: '',
      },
      multilineInputObj: {
        English: 'testeng',
        German: 'testger',
      },
      langTab: 'English',
      list: [
        {
          id: '1',
          title: 'On a lovely Summers Day',
          active: false,
          type: 'Wissenschaftliche Abhandlungggggggggggggggggg',
          selected: false,
          shared: true,
          error: true,
        },
        {
          id: '2',
          title: 'Oh this hot hot heat',
          active: false,
          type: '',
          selected: false,
        },
        {
          id: '3',
          title: 'And then again a different title',
          active: false,
          type: 'Ausstellung',
          selected: false,
          shared: true,
        },
        {
          id: '4',
          title: 'Allons-y!eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!',
          active: false,
          type: 'Bild',
          selected: false,
        },
      ],
      hoverboxContent: {},
      togglePreview: false,
      value12: '',
    };
  },
  computed: {
    multiline: {
      get() {
        return this.langTab === 'English' ? this.multilineInputObj[0].value : this.multilineInputObj[1].value;
      },
      set(event) {
        if (event.tab === 'English') {
          this.$set(this.multilineInputObj[0], 'value', event.val);
        } else {
          this.$set(this.multilineInputObj[1], 'value', event.val);
        }
      },
    },
  },
  watch: {
    async autocompleteInput(val) {
      if (!val || val.length > 3) {
        const result = await axios.get('http://localhost:9900/fetch', {
          params:
            {
              string: val,
            },
        });
        this.dropDownInput = result.data;
      }
    },
  },
  methods: {
    handleMultilineInput(val) {
      console.log(val);
    },
    setHoverBox(val, entry) {
      if (val) {
        console.log(entry);
        this.hoverboxContent = { title: 'test' };
      } else {
        this.hoverboxContent = {};
      }
    },
    changeProgress() {
      if (this.progress <= 0.75) {
        this.progress += 0.25;
      } else {
        this.progress = 0;
      }
    },
    enableSelect() {
      this.selectable = !this.selectable;
    },
    triggerInput(val) {
      console.log(val);
    },
    changeInput() {
      const index = Math.floor((Math.random() * 10) + 1);
      this.chipsInput = ['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'].splice(index, 2);
      this.multilineInput = ['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'].splice(index, 1);
    },
    boxClicked() {
      console.log('clicked');
    },
    buttonTriggered(event) {
      if (event === 'buttonLeft') {
        this.showPopUp = false;
      }
    },
    dropped(e) {
      if (e.dataTransfer && e.dataTransfer.files.length) {
        for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
          this.files.push(e.dataTransfer.files[i]);
        }
      } else {
        const id = e;
        if (!this.elements.find(item => item.id === id)) {
          this.elements.push(this.list.find(item => item.id === id));
        }
      }
    },
    activateMenuEntry(index) {
      // TODO: this should be a functionality INSIDE menu list!!
      if (!this.list[index].active) {
        this.list.forEach(item => this.$set(item, 'active', false));
        this.$set(this.list[index], 'active', true);
      } else {
        this.$set(this.list[index], 'active', false);
      }
    },
    async fetch(string) {
      if (!string.value || string.value.length > 3) {
        const result = await axios.get('http://localhost:9900/fetch', {
          params:
            {
              string: string.value,
            },
        });
        this.dropDownInput = result.data;
      }
    },
    tabSwitched(val) {
      this.langTab = val;
    },
    fetchOther(value, type) {
      console.log(value);
      console.log(type);
    },
  },
};
</script>

<style lang="scss">
  @import "./styles/variables.scss";

  .dropdown-extended {
    border-top: $separation-line;
    padding: $spacing;

    .show-more-toggle {
      color: $app-color;
    }
  }

  .canvas {
    padding: 16px;
  }

  .flex {
    display: flex;
  }

  .row {
    max-height: 300px;
  }

  div > .base-box-button {
    margin: 8px;
  }

  button {
    display:block;
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
  }

  .popup-text > div:first-of-type {
    margin-right: 16px;
  }

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }

  .image-box {
    margin: 8px;
  }

  .multiline-dropdown {
    margin-bottom: -4px;
  }
  .spacer {
    height: 300px;
  }
</style>
