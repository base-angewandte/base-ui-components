<template>
  <div id="app">
    <!-- <base-hover-box
      :box-text="[
        'Alias: Max Mustermann, Stephan Mustermann',
        'Mitglied der Gruppe für Gestaltung'
      ]"
      title="Andreas M."
      subtext="*1970 Steyr, Oberösterreich"/> -->
    <div class="form-field">
      <base-chips-below
        :chips-inline="false"
        v-model="selectedList"
        :chips-editable="true"
        :list="['Herbert Marcuse', 'Erich From', 'Georg Werth']"
        label="chips-below-test"/>
      <base-upload-bar
        :progress="progress"
        :filename="'testfile.jpg'"/>
      <base-button
        :active="false"
        :text="'Change Progress'"
        icon-size="large"
        button-style="row"
        @clicked="changeProgress"/>
    </div>
    <div class="canvas flex">
      <base-image-box
        :selectable="selectable"
        :show-title="false"
        :image-url="require('./static/images/icons.png')"
        description="Bildserie"
        title="Afterlife II Ausstellungsansichten"
        class="image-box"/>
      <base-image-box
        :selectable="selectable"
        :image-url="require('./static/images/icons.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box"/>
      <base-image-box
        :selectable="selectable"
        :image-url="require('./static/images/roboto_detail_fullscreen_12pt.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box"/>
      <base-button
        :active="false"
        :text="'Activate Select'"
        icon-size="large"
        button-style="row"
        @clicked="enableSelect()"/>
    </div>
    <div class="canvas">
      <base-multiline-text-input
        v-model="multilineInputObj"
        :label="'Label'"
        :tabs="['German', 'English']"
        :placeholder="'Enter Text'"
        @tabSwitch="tabSwitched">
        <div class="multiline-dropdown">
          <base-drop-down
            :default-select="'Textart'"
            :selection-list="['Beschreibung', 'Ausstellungseinladung', 'Zeitungsartikel']" />
        </div>
      </base-multiline-text-input>
      <base-button
        :active="false"
        icon="sheet-plus"
        icon-size="large"
        button-style="row"
        @clicked="changeInput()"/>
    </div>
    <div class="canvas">
      <base-button
        :active="false"
        icon="sheet-plus"
        icon-size="large"
        button-style="row" />
    </div>
    <div class="canvas">
      <base-search
        :show-image="true"
        @input="triggerInput"/>
    </div>
    <div class="form-field">
      <base-date-input
        :type="'datetime'"
        :label="'unknown'"/>
      <base-date-input
        :label="'unknown'"/>
      <base-autocomplete-input
        :list="dropDownInput"
        :placeholder="'Select Your Marxccccc'"
        :object-prop="'title'"
        v-model="autocompleteInput"
        label="text input with dynamic autocomplete"
        @selected="fetchOther($event, 'this is my type')"
        @autocomplete="fetch({ value: $event })"/>
      <base-input :label="'unknown'"/>
      <base-chips-input
        :list="dropDownInput"
        :placeholder="'Select Your Marx'"
        :selected-list="chipsInput"
        :allow-multiple-entries="true"
        :allow-dynamic-drop-down-entries="true"
        :object-prop="'title'"
        :chips-inline="false"
        :chips-editable="true"
        label="A label"
        @fetchDropDownEntries="fetch"/>
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

    </div>
    <base-menu-list
      :selected="showCheckbox"
      :list="list"
      @clicked="activateMenuEntry"/>
    <base-menu-entry
      :id="'asingleentry'"
      :icon="'sheet-empty'"
      :active="menuEntryActive"
      :select-active="showCheckbox"
      :is-selectable="true"
      :thumbnails="['attention', 'people']"
      title="Poesie oh Poesisssssssssssssssssssssssssssssssssse"
      subtext="Aus einer anderen Weltsssssssssssssssssssssssssss"
      description="Gemälde"
      @clicked="menuEntryActive = true"/>
    <base-button
      text="blaaa"
      @clicked="showCheckbox = !showCheckbox"/>
    <div class="flex row">
      <base-drop-box
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="camera"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @dropped="dropped($event)"
        @clicked="boxClicked"/>
      <base-drop-box />
    </div>
    <div>
      <ul>
        <li
          v-for="item in elements"
          :key="item.id">{{ item.title }}</li>
      </ul>
    </div>

    <base-button
      draggable="true"
      icon="options-menu"
      @clicked="showPopUp = true"/>
    <base-drop-down
      :label="'select type'"
      :default-select="'Alle Typ'"
      :selection-list="['Bild', 'Publikation', 'Film/Video']" />
    <base-drop-down
      :default-select="'Alle Typen'"
      :selection-list="['Bild', 'Publikation', 'Film/Videobbbbbbbbbbbbb']" />
    <div>
      More text test xtxts atea
    </div>
    <base-pop-up
      :show="showPopUp"
      title="Bild entfernen"
      button-left-text="Cancel"
      button-right-text="Submit"
      @clicked="buttonTriggered"
      @close="showPopUp = false">
      <div>
        text text text
      </div>
      <div class="popup-text">
        <base-input
          :label="'Test1'"
          type="text"
          placeholder="Enter your Name"/>
        <base-input
          :label="'Test'"
          type="text"
          placeholder="Enter your Name" />
      </div>
      <div class="popup-text">
        <base-drop-down
          :label="'select type'"
          :default-select="'Alle Typen'"
          :selection-list="['Bild', 'Publikation', 'Film/Videobbbbbbbbbbbbb']"
          :background-color="'rgb(240, 240, 240)'"
          :fixed-width="true"/>
        <base-drop-down
          :default-select="'Alle Typenasdfasdf'"
          :selection-list="['Bild', 'Publikation', 'Film/Videobbbbbbbbbbbbb']"
          :background-color="'rgb(240, 240, 240)'"
          :fixed-width="true" />
      </div>
    </base-pop-up>
    <div class="form-field">
      <div class="flex">
        <base-input
          :label="'Test3'"
          type="text"
          placeholder="Enter your Name" />
        <base-input
          :label="'Test4'"
          type="text"
          placeholder="Enter your Name" />
      </div>
      <base-input
        :label="'x'"
        type="text"
        placeholder="Enter your Name" />
      <base-input
        :label="'y'"
        type="text"
        placeholder="Enter your Name" />
      <base-input
        :label="'c'"
        type="text"
        placeholder="Enter your Name" />
    </div>
    <div class="flex">

      <base-box-button
        :box-style="'small'"
        :show-plus="false"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        @clicked="boxClicked($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        @clicked="boxClicked($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen bis morgen oder gar nicht"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="boxClicked($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Vorhandenen Eintrag hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="boxClicked($event)"/>
    </div>

    <base-box-button
      :show-plus="true"
      :box-size="{ width: '25%' }"
      icon="sheet-plus"
      text="Datei hinzufügen"
      subtext="(Click oder durch drag'n drop hinzufügen)"
      @clicked="boxClicked($event)"/>
    <base-box-button
      :show-plus="true"
      :box-size="{ width: '25%' }"
      icon="sheet-plus"
      text="Datei hinzufügen"
      @clicked="boxClicked($event)"/>

  </div>
</template>

<script>
import axios from 'axios';
import BaseMenuEntry from './components/BaseMenuEntry/BaseMenuEntry';
import BasePopUp from './components/BasePopUp/BasePopUp';
import BaseDropDown from './components/BaseDropDown/BaseDropDown';
import BaseInput from './components/BaseInput/BaseInput';
import BaseBoxButton from './components/BaseBoxButton/BaseBoxButton';
import BaseButton from './components/BaseButton/BaseButton';
import BaseDropBox from './components/BaseDropBox/BaseDropBox';
import BaseBox from './components/BaseBox/BaseBox';
import BaseMenuList from './components/BaseMenuList/BaseMenuList';
import BaseMenuTableRow from './components/BaseMenuTableRow';
import BaseChipsInput from './components/BaseChipsInput/BaseChipsInput';
import BaseSearch from './components/BaseSearch';
import BaseMultilineTextInput from './components/BaseMultilineTextInput/BaseMultilineTextInput';
import BaseImageBox from './components/BaseImageBox/BaseImageBox';
import BaseUploadBar from './components/BaseUploadBar';
import BaseAutocompleteInput from './components/BaseAutocompleteInput/BaseAutocompleteInput';
import BaseChipsBelow from './components/BaseChipsBelow/BaseChipsBelow';
import BaseHoverBox from './components/BaseHoverBox/BaseHoverBox';
import BaseDateInput from './components/BaseDateInput/BaseDateInput';

export default {
  name: 'App',
  components: {
    BaseHoverBox,
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
    BaseBoxButton,
    BaseButton,
    BaseDropBox,
    BaseBox,
    BaseMenuTableRow,
  },
  data() {
    return {
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
      selectable: false,
      progress: 0,
      autocompleteInput: 'testtttttttttttt',
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
          type: 'Bild',
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
    changeProgress() {
      if (this.progress <= 75) {
        this.progress += 25;
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
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        this.files.push(e.dataTransfer.files[i]);
      }
      if (e.dataTransfer.items) {
        const id = e.dataTransfer.getData('text');
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

<style>
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
</style>
