<template>
  <div id="app">
    <div class="canvas">
      <base-search
        :show-image="true"
        @input="triggerInput"/>
    </div>
    <div class="form-field">
      <base-autocomplete-input
        :list="dropDownInput"
        :placeholder="'Fetching from SkosMos'"
        :object-prop="'prefLabel'"
        v-model="autocompleteInput"
        label="text input with dynamic autocomplete"
        @selected="fetchOther($event, 'this is my type')"
        @autocomplete="fetchSkosMos({ value: $event })"/>
      <base-chips-input
        :list="dropDownInput"
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
    <base-button
      draggable="true"
      icon="options-menu"
      @clicked="showPopUp = true"/>
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
          :label="'Title'"
          v-model="newEntity.title"
          type="text"
          placeholder="Enter a Title" />
        <base-input
          :label="'Subtitle'"
          v-model="newEntity.subtitle"
          type="text"
          placeholder="Enter a Subtitle" />
      </div>
      <base-autocomplete-input
        :list="$store.state.PortfolioAPI.schemas"
        :placeholder="'Choose a Type'"
        v-model="newEntity.type"
        label="Type"/>
      <base-button
        :label="'Submit'"
        icon="save"
        @clicked="submit(newEntity)"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
import BaseSearch from './components/BaseSearch/BaseSearch';
import BaseMultilineTextInput from './components/BaseMultilineTextInput/BaseMultilineTextInput';
import BaseImageBox from './components/BaseImageBox/BaseImageBox';
import BaseUploadBar from './components/BaseUploadBar/BaseUploadBar';
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
      hoverboxContent: {},
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
  },
  methods: {
    setHoverBox(val, entry) {
      if (val) {
        console.log(entry);
        this.hoverboxContent = { title: 'test' };
      } else {
        this.hoverboxContent = {};
      }
    },
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
    fetchSkosMos(string) {
      console.log('testing', this);
      if (!string.value || string.value.length > 3) {
        this.getSearch({
          query: string.value,
          vocab: 'portfolio',
        }).then((res) => {
          this.dropDownInput = res.data.results;
        });
      }
    },
    submit(e) {
      this.post({
        kind: 'entity',
        data: e,
      }).catch(err => console.log(err));
      axios.defaults.xsrfCookieName = ' csrftoken_portfolio';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios.post('https://basedev.uni-ak.ac.at/portfolio/api/v1/entity/', e, {
        withCredentials: true,
        xsrfCookieName: 'csrftoken_portfolio',
        xsrfHeaderName: 'X-CSRFToken',
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    ...mapActions('SkosmosAPI', [
      'getSearch',
    ]),
    ...mapActions('PortfolioAPI', [
      'get',
      'post',
      'delete',
    ]),
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
</style>
