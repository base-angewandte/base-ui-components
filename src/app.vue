<template>
  <div id="app">
    <base-button @clicked="showPopUp = true">Click</base-button>
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
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="buttonTriggered($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="buttonTriggered($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="buttonTriggered($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="buttonTriggered($event)"/>
      <base-box-button
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        icon="sheet-plus"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @clicked="buttonTriggered($event)"/>
    </div>

    <base-box-button
      :show-plus="true"
      :box-size="{ width: '25%' }"
      icon="sheet-plus"
      text="Datei hinzufügen"
      subtext="(Click oder durch drag'n drop hinzufügen)"
      @clicked="buttonTriggered($event)"/>
    <base-box-button
      :show-plus="true"
      :box-size="{ width: '25%' }"
      icon="sheet-plus"
      text="Datei hinzufügen"
      @clicked="buttonTriggered($event)"/>

  </div>
</template>

<script>
import BasePopUp from './components/BasePopUp';
import BaseDropDown from './components/BaseDropDown';
import BaseInput from './components/BaseInput';
import BaseBoxButton from './components/BaseBoxButton';
import BaseButton from './components/BaseButton';

export default {
  name: 'App',
  components: {
    BaseDropDown,
    BasePopUp,
    BaseInput,
    BaseBoxButton,
    BaseButton,
  },
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    buttonTriggered(event) {
      if (event === 'buttonLeft') {
        this.showPopUp = false;
      }
    },
  },
};
</script>

<style>
  .flex {
    display: flex;
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
