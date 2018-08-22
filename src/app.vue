<template>
  <div id="app">
    <div class="form-field">
      <base-input />
      <base-chips-input
        :list="[
          '...alle Verhältnisse umzuwerfen',
          'in denen der Mensch',
          'ein erniedrigtes, ein geknechtetes',
          'ein verlassenes, ein verächtliches',
          'Wesen ist']"
        :placeholder="'Select Your Marx'"
        :selected-list="chipsInput"
        :allow-multiple-entries="true"/>
      <base-button
        text="change input"
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
      @clicked="showPopUp = true" />
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
          placeholder="Enter your Name" />
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
          :fixed-width="true" />
        <base-drop-down
          :default-select="'Alle Typenasdfasdf'"
          :selection-list="['Bild', 'Publikation', 'Film/Videobbbbbbbbbbbbb']"
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
import BaseMenuEntry from './components/BaseMenuEntry';
import BasePopUp from './components/BasePopUp';
import BaseDropDown from './components/BaseDropDown';
import BaseInput from './components/BaseInput';
import BaseBoxButton from './components/BaseBoxButton';
import BaseButton from './components/BaseButton';
import BaseDropBox from './components/BaseDropBox';
import BaseBox from './components/BaseBox';
import BaseMenuList from './components/BaseMenuList';
import BaseMenuTableRow from './components/BaseMenuTableRow';
import BaseChipsInput from './components/BaseChipsInput';

export default {
  name: 'App',
  components: {
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
      chipsInput: [],
      menuEntryActive: false,
      showCheckbox: false,
      showPopUp: false,
      files: [],
      elements: [],
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
          type: 'Bild',
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
  methods: {
    changeInput() {
      const index = Math.floor((Math.random() * 10) + 1);
      this.chipsInput = [(['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'][index])];
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
  },
};
</script>

<style>
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

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }
</style>
