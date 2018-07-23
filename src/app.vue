<template>
  <div id="app">
    <button @click="showPopUp = true">Click</button>
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
    <div>
      <base-input
        :label="'Test3'"
        type="text"
        placeholder="Enter your Name" />
      <base-input
        :label="'Test4'"
        type="text"
        placeholder="Enter your Name" />
    </div>
    <div>
      <base-input
        :label="''"
        type="text"
        placeholder="Enter your Name" />
    </div>

  </div>
</template>

<script>
import BasePopUp from './components/BasePopUp';
import BaseDropDown from './components/BaseDropDown';
import BaseInput from './components/BaseInput';

export default {
  name: 'App',
  components: {
    BaseDropDown,
    BasePopUp,
    BaseInput,
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
  button {
    display:block;
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
  }

  .popup-text .base-input, .popup-text .dropdown-box {
    margin-right: 16px;
  }

  .popup-text .base-input:last-child, .popup-text .dropdown-box:last-child {
    margin-right: 0;
  }
</style>
