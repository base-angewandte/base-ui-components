<template>
  <div id="app">
    <!-- VIDEO TEST -->
    <!-- <video
      width="320"
      height="240"
      controls >
      <source
        src="/home/shauzmayer/index.m3u8"
        type="application/x-mpegURL">
      Your browser does not support the video tag.
    </video> -->
    <BaseMediaPreview
      :show-preview="togglePreview"
      :media-url="'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8'"
      :download-url="'https://mnmedias.api.telequebec.tv/m3u8/29880.pdf'"
      @hide-preview="togglePreview = false" />
    <BaseButton
      text="Show Preview"
      @clicked="togglePreview = !togglePreview" />

    <!-- PAGINATION TEST -->
    <BasePagination :total="100" />

    <!-- CHIPS BELOW TEST -->
    <div class="form-field">
      <!-- UPLOAD BAR TEST -->
      <base-upload-bar
        :progress="progress"
        :filename="'testfile.jpg'" />
      <base-button
        :active="false"
        :text="'Change Progress'"
        icon-size="large"
        button-style="row"
        @clicked="changeProgress" />
    </div>

    <div class="canvas flex">
      <!-- BASE IMAGE BOX TEST -->
      <base-image-box
        :selectable="selectable"
        :show-title="false"
        :image-url="require('./static/images/icons.png')"
        description="Bildserie"
        title="Afterlife II Ausstellungsansichten"
        class="image-box" />
      <base-image-box
        :selectable="selectable"
        :image-url="require('./static/images/icons.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <base-image-box
        :selectable="selectable"
        :image-url="require('./static/images/roboto_detail_fullscreen_12pt.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <base-button
        :active="false"
        :text="'Activate Select'"
        icon-size="large"
        button-style="row"
        @clicked="enableSelect()" />
    </div>

    <div class="canvas">
      <!-- MULTILINE WITH TABS TEST -->
      <base-multiline-text-input
        v-model="multilineInputObj"
        :label="'Label'"
        :tabs="['German', 'English']"
        :placeholder="'Enter Text'"
        @tab-switch="tabSwitched">
        <div class="multiline-dropdown">
          <base-drop-down
            :selected-option="{ label: 'Textart', value: '' }"
            :options="[{
                         value: 'Beschreibung',
                         label: 'Beschreibung',
                       },
                       {
                         value: 'Ausstellungseinladung',
                         label: 'Ausstellungseinladung',
                       },
                       {
                         label: 'Textart',
                         value: '',
                       },
                       {
                         value: 'Zeitungsartikel',
                         label: 'Zeitungsartikel',
                       }]" />
        </div>
      </base-multiline-text-input>
      <base-multiline-text-input
        :input="multilineTest"
        :label="'Label'"
        :placeholder="'Enter Text'"
        @text-input="handleMultilineInput" />
    </div>

    <!-- SEARCH TEST -->
    <div class="canvas">
      <base-search
        :show-image="true"
        @input="triggerInput" />
    </div>

    <!-- FORM FIELD TESTING -->
    <div class="form-field">
      <base-date-input
        :type="'datetime'"
        v-model="inputDateTime"
        :label="'unknown'" />
      <base-date-input
        :label="'unknown'"
        :input="inputDate"
        type="daterange"
        format="date_year" />
      <base-autocomplete-input
        v-model="autocompleteInput"
        :list="dropDownInput"
        :placeholder="'Fetching from SkosMos'"
        :object-prop="'prefLabel'"
        label="text input with dynamic autocomplete"
        @selected="fetchOther($event, 'this is my type')" />
      <base-chips-input
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
      <base-button
        text="change input"
        icon="remove"
        @clicked="changeInput" />
      <base-chips-input
        :list="[
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '***' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '**' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '*' },
          { title: 'in denen der Mensch' },
          { title: 'ein erniedrigtes, ein geknechtetes' },
          { title: 'ein verlassenes, ein verächtliches' },
          { title: 'Wesen ist' }]"
        :placeholder="'Select your Marx'"
        :object-prop="'title'"
        :chips-editable="true"
        :label="'single choice with special drop down body'"
        :allow-multiple-entries="false">
        <template
          slot="drop-down-entry"
          slot-scope="props">
          <span>{{ props.item.title }}</span>
          <span>{{ props.item.additional }}</span>
          <span>{{ props.item.remark }}</span>
        </template>
      </base-chips-input>
      <base-chips-below
        v-model="selectedList"
        :chips-inline="false"
        :chips-editable="true"
        :allow-unknown-entries="true"
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
    </div>

    <!-- MENU LIST TEST -->
    <base-menu-list
      :selected="showCheckbox"
      :list="list"
      @clicked="activateMenuEntry" />
    <base-menu-entry
      :entry-id="'asingleentry'"
      :icon="'sheet-empty'"
      :active="menuEntryActive"
      :select-active="showCheckbox"
      :is-selectable="true"
      :thumbnails="['attention', 'people']"
      title="Poesie oh Poesisssssssssssssssssssssssssssssssssse"
      subtext="Aus einer anderen Weltsssssssssssssssssssssssssss"
      description="Gemälde"
      @clicked="menuEntryActive = true" />
    <base-button
      text="toggle checkboxes"
      button-style="row"
      @clicked="showCheckbox = !showCheckbox" />

    <!-- DROP BOX TEST -->
    <div class="flex row">
      <base-drop-box
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        drop-type="elements"
        icon="camera"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @dropped-element="dropped($event)"
        @clicked="boxClicked" />
      <base-drop-box />
    </div>
    <div>
      <ul>
        <li
          v-for="item in elements"
          :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- POP UP TEST -->
    <base-button
      draggable="true"
      icon="options-menu"
      @clicked="showPopUp = true" />
    <base-pop-up
      :show="showPopUp"
      title="Bild entfernen"
      button-left-text="Cancel"
      button-right-text="Submit"
      @clicked="buttonTriggered"
      @close="showPopUp = false">
      <div>
        Test Create Entity
      </div>
      <div class="popup-text">
        <base-input
          :label="'Test1'"
          type="text"
          placeholder="Enter your Name" />
        <base-input
          :label="'Test'"
          type="text"
          placeholder="Enter your Name" />
      </div>
      <div class="popup-text">
        <base-drop-down
          :label="'select type'"
          :option-selected="{ label: 'Alle Typen', value: '' }"
          :options="[
            { label: 'Alle Typen', value: '' },
            { label: 'Bild', value: 'picture' },
            { label: 'Publikation', value: 'publication' },
            { label: 'Film/Videobbbbbbbbbbbbb', value: 'movie'},
          ]"
          :header-background-color="'rgb(240, 240, 240)'" />
        <base-drop-down
          :label="'select type'"
          :option-selected="{ label: 'Alle Typen', value: '' }"
          :options="[
            { label: 'Alle Typen', value: '' },
            { label: 'Bild', value: 'picture' },
            { label: 'Publikation', value: 'publication' },
            { label: 'Film/Videobbbbbbbbbbbbb', value: 'movie'},
          ]"
          :header-background-color="'rgb(240, 240, 240)'" />
      </div>
    </base-pop-up>

    <!-- DROP DOWN TEST -->
    <base-drop-down
      v-model="selectedVal"
      :label="'select type'"
      :show-label="true"
      :options="selectionList" />
    <base-drop-down
      :options="selectionList" />
    <div class="spacer" />
  </div>
</template>

<script>
import axios from 'axios';
import BaseMenuEntry from './components/BaseMenuEntry/BaseMenuEntry';
import BasePopUp from './components/BasePopUp/BasePopUp';
import BaseDropDown from './components/BaseDropDown/BaseDropDown';
import BaseInput from './components/BaseInput/BaseInput';
import BaseButton from './components/BaseButton/BaseButton';
import BaseDropBox from './components/BaseDropBox/BaseDropBox';
import BaseMenuList from './components/BaseMenuList/BaseMenuList';
import BaseChipsInput from './components/BaseChipsInput/BaseChipsInput';
import BaseSearch from './components/BaseSearch/BaseSearch';
import BaseMultilineTextInput from './components/BaseMultilineTextInput/BaseMultilineTextInput';
import BaseImageBox from './components/BaseImageBox/BaseImageBox';
import BaseUploadBar from './components/BaseUploadBar/BaseUploadBar';
import BaseAutocompleteInput from './components/BaseAutocompleteInput/BaseAutocompleteInput';
import BaseChipsBelow from './components/BaseChipsBelow/BaseChipsBelow';
import BaseDateInput from './components/BaseDateInput/BaseDateInput';
import BasePagination from './components/BasePagination/BasePagination';
import BaseMediaPreview from './components/BaseMediaPreview/BaseMediaPreview';

export default {
  name: 'App',
  components: {
    BaseMediaPreview,
    BasePagination,
    BaseChipsBelow,
    BaseDateInput,
    BaseAutocompleteInput,
    BaseUploadBar,
    BaseImageBox,
    BaseMultilineTextInput,
    BaseSearch,
    BaseChipsInput,
    BaseMenuList,
    BaseMenuEntry,
    BaseDropDown,
    BasePopUp,
    BaseInput,
    BaseButton,
    BaseDropBox,
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
          title: 'Allons-y!!',
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
