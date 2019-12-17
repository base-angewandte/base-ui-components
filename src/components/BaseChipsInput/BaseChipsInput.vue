<template>
  <div
    class="base-chips-input">
    <!-- INPUT LABEL AND FIELD -->
    <BaseInput
      :id="id"
      ref="baseInput"
      v-model="input"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? $props.placeholder : ''"
      :label="label"
      :show-label="showLabel"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      :show-input-border="showInputBorder"
      :is-active="showDropDown"
      @clicked-outside="onInputBlur"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @keydown.up.down.prevent="triggerArrowKey"
      @keydown="checkKeyEvent"
      @keypress.enter.prevent="addSelected()"
      @click-input-field="insideInput = true">
      <template
        v-if="sortable"
        slot="label-addition">
        <div
          class="base-chips-input-sort"
          @click="sort(selectedListInt)">
          {{ sortText }}
        </div>
      </template>
      <template
        v-if="!allowMultipleEntries || chipsInline"
        slot="input-field-addition-before">
        <div class="base-chips-input-chips">
          <draggable
            v-model="selectedListInt"
            :disabled="!draggable"
            :set-data="setDragElement"
            :force-fallback="true"
            :animation="200"
            handle=".base-chip-text"
            @start="drag = true"
            @end="onDragEnd">
            <transition-group
              :name="!drag ? 'flip-list' : null"
              type="transition">
              <BaseChip
                v-for="(entry, index) in selectedListInt"
                :id="entry[identifier] || entry.idInt"
                ref="baseChip"
                :key="'chip-' + entry.idInt"
                :entry="getLangLabel(entry[objectProp], true)"
                :hover-box-content="hoverboxContent"
                :is-linked="alwaysLinked || entry[identifier] === 0 || !!entry[identifier]"
                :chip-active="chipActiveForRemove === index"
                @remove-entry="removeEntry(entry, index)"
                @hoverbox-active="hoverBoxActive($event, entry)"
                @value-changed="modifyChipValue($event, entry)" />
            </transition-group>
          </draggable>
        </div>
      </template>
      <template slot="input-field-addition-after">
        <div
          v-if="isLoading"
          class="base-chips-input-loader">
          <BaseLoader />
        </div>
        <div
          v-if="!allowMultipleEntries"
          class="base-chips-input-single-dropdown">
          <SvgIcon
            :class="[
              'base-chips-input-single-dropdown-icon',
              { 'base-chips-input-single-dropdown-icon-rotated': showDropDown }
            ]"
            name="drop-down" />
        </div>
      </template>
    </BaseInput>

    <!-- DROP DOWN MENU -->
    <ul
      v-if="showDropDown"
      ref="dropdownContainer"
      v-click-outside="() => insideDropDown = false"
      :style="{ 'min-width': dropDownMinWidth }"
      class="base-chips-drop-down"
      @mouseenter="insideDropDown = true"
      @mouseleave="checkLeave">
      <template v-for="(entry, index) in dropDownListInt">
        <li
          v-if="allowUnknownEntries && !entry[identifier]"
          ref="option"
          :key="index"
          :class="{ 'base-chips-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex }"
          class="base-chips-drop-down-entry-wrapper"
          @click="addSelected()"
          @mouseover="selectedMenuEntryIndex = index">
          {{ addNewChipText ? `${addNewChipText} ${getLangLabel(entry[objectProp], true)}`
            : getI18nString('Add', 'form', { value: getLangLabel(entry[objectProp], true) })
              + ' ' + ' ...' }}
        </li>
        <li
          v-else
          ref="option"
          :key="index"
          :class="{ 'base-chips-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex }"
          class="base-chips-drop-down-entry-wrapper"
          @click="addSelected()"
          @mouseover="selectedMenuEntryIndex = index">
          <!-- @slot THIS IS A SLOT TO PROVIDE MORE ADVANCED DROP DOWN ENTRIES -->
          <slot
            :item="entry"
            name="drop-down-entry">
            <!-- SLOT DEFAULT -->
            <div
              class="base-chips-drop-down-entry">
              {{ getLangLabel(entry[objectProp], true) }}
            </div>
          </slot>
        </li>
      </template>
      <!--
        @slot a slot to expand the drop down area (needed for "Expand Functionality"
      -->
      <slot
        name="drop-down-extended" />
      <div
        v-if="!dropDownList.length"
        class="base-chips-drop-down-entry-wrapper">
        <!--
          @slot customize what is displayed when no drop down options are available
        -->
        <slot name="no-options">
          {{ dropDownNoOptionsInfo }}
        </slot>
      </div>
    </ul>
    <!-- CHIPS BELOW -->
    <div
      v-if="$props.allowMultipleEntries && !$props.chipsInline && selectedListInt.length"
      class="base-chips-input-chips-container">
      <!-- @slot a slot to customize the chips display below the input field -->
      <slot
        :list="selectedListInt"
        name="chips-area">
        <!-- SLOT DEFAULT -->
        <base-chip
          v-for="(entry, index) in selectedListInt"
          :key="entry.idInt"
          v-model="entry[objectProp]"
          class="base-chips-input-chip"
          @remove-entry="removeEntry($event, index)" />
      </slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import Draggable from 'vuedraggable';
import SvgIcon from 'vue-svgicon';
import BaseInput from '../BaseInput/BaseInput';
import BaseChip from '../BaseChip/BaseChip';
import BaseLoader from '../BaseLoader/BaseLoader';
import { setLanguageMixin } from '../../mixins/setLanguage';

/**
 * Base Chips Input component with autocomplete function
 *
 */

export default {
  components: {
    BaseLoader,
    BaseInput,
    BaseChip,
    Draggable,
    SvgIcon,
  },
  directives: {
    ClickOutside,
  },
  mixins: [
    setLanguageMixin,
  ],
  model: {
    prop: 'selectedList',
    event: 'selected',
  },
  props: {
    /**
     * list of selectable options (strings or objects)
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * @model
     *
     * list of already selected options (strings or objects), displayed as chips
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * if object array was passed - define the property that should be
     * displayed in the chip
     */
    objectProp: {
      type: String,
      default: 'name',
    },
    /**
     * input field label
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * define if label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * input field placeholder
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * message displayed when no selectable obtions are available
     */
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    /**
     * define if the user can add an option that is not in the list
     */
    // can the user add Entries that are not available in the vocabulary (selectable list)
    allowUnknownEntries: {
      type: Boolean,
      default: false,
    },
    /**
     * define only a single or multiple options can be selected
     */
    // define if one or several entries can be selected from drop down menu
    allowMultipleEntries: {
      type: Boolean,
      default: true,
    },
    /**
     * define if selectable list options should be fetched every time of if the
     * list passed in the beginning is used
     */
    allowDynamicDropDownEntries: {
      type: Boolean,
      default: false,
    },
    /**
     * define if chips should be displayed in the input field (inline) or below
     */
    chipsInline: {
      type: Boolean,
      default: true,
    },
    /**
     * this prop was added because there was some action needed to be done before entry was added
     * so this is possible if entry is not added to selectedList directly but only in parent
     * component
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: true,
    },
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * if true a button with that functionality will be visible
     */
    sortable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if chips should be draggable (currently only available for inline)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * for dynamic drop down entries a unique identifier (id, uuid)
     * is needed - specify the attribute name here
     */
    identifier: {
      type: String,
      default: '',
    },
    /**
     * define if entries should always appear linked (-> with grey background)
     */
    alwaysLinked: {
      type: Boolean,
      default: false,
    },
    /**
     * set content for the info box activatable by click <br>
     * see [BaseHoverBox](#basehoverbox) for more details
     */
    hoverboxContent: {
      type: Object,
      default: () => ({}),
    },
    /**
     * show spinner to indicate that something is loading
     * (for dynamically fetched entries that need to do backend requests)
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * if sorting is enabled this will be the text shown in the button
     */
    sortText: {
      type: String,
      default: 'Sort A – Z',
    },
    /**
     * if true sorting will consider the last string in a label or if a comma is
     * present the string before the comma
     */
    sortName: {
      type: Boolean,
      default: false,
    },
    /**
     * set a language (ISO 639-1)
     */
    language: {
      type: String,
      default: '',
    },
    /**
     * set a chips text for adding a new chip
     * (alternatively add a 'form.Add' value to your localization files)
     */
    addNewChipText: {
      type: String,
      default: '',
    },
    /**
    if field is occuring more then once - set an id
     */
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // the current text input
      input: '',
      // list of selected entries
      selectedListInt: [],
      // create a original list from text or object with internal id
      dropDownListOrig: [],
      // list of selectable entries received from parent component
      dropDownList: [],
      selectedMenuEntryIndex: 0,
      insideDropDown: false,
      insideInput: false,
      returnAsObject: false,
      timeout: null,
      fired: '',
      drag: false,
      chipActiveForRemove: -1,
      dropDownMinWidth: '100%',
      dropDownYPosition: 0,
    };
  },
  computed: {
    dropDownListInt: {
      get() {
        return this.dropDownList;
      },
      set(val) {
        // get the values from props.list and assign an internal id (idInt) if not already set
        let list = val;
        if (val.length) {
          list = val.map((entry, index) => {
            if (typeof entry === 'object') {
              let id = entry.idInt;
              if (id !== 0 && !id) {
                id = this.identifier && (entry[this.identifier] === 0 || entry[this.identifier])
                  ? entry[this.identifier] : entry[this.objectProp] + index;
              }
              return Object.assign({}, entry, {
                idInt: id,
                [this.objectProp]: entry[this.objectProp],
              });
            }
            // TODO: this could still cause issues with duplicate keys!!
            return Object.assign({}, {
              idInt: entry + index,
              [this.objectProp]: entry,
            });
          });
        }
        // filter already selected entries from the drop down
        if (this.identifier) {
          list = list.filter(entry => !this.selectedListInt
            .map(selected => selected[this.identifier]).includes(entry[this.identifier]));
        } else {
          list = list.filter(entry => !this.selectedListInt
            .map(selected => selected.idInt).includes(entry.idInt));
        }
        // if unknown entries are allowed and a string is in input field and if the string
        // was not added already add a option to add this string as chip
        if (this.allowUnknownEntries && this.input
          && !this.selectedList.some(entry => !entry[this.identifier]
            && this.getLangLabel(entry[this.objectProp]) === this.input)) {
          list.unshift({
            [this.objectProp]: this.language ? { [this.language]: this.input } : this.input,
            idInt: this.getInternalId(this.input + this.selectedListInt.length),
          });
        }
        this.dropDownList = [].concat(list);
      },
    },
    showDropDown: {
      get() {
        return this.insideDropDown || this.insideInput;
      },
      set(val) {
        this.insideInput = val;
        this.insideDropDown = val;
      },
    },
  },
  watch: {
    input(val) {
      // if dropdown content is dynamic alert parent to fetch new relevant entries (if desired)
      if (this.allowDynamicDropDownEntries) {
        this.selectedMenuEntryIndex = -1;
        this.$emit('fetch-dropdown-entries', { value: val, type: this.objectProp });
      } else {
        /**
         * event to fetch drop down entries with changing input
         *
         * @event text-input
         * @type { string }
         *
         */
        // still inform parent of the text input
        this.$emit('text-input', val);
        const oldEntry = this.dropDownListInt[this.selectedMenuEntryIndex];
        // if content is static filter the existing entries for the ones matching input
        this.dropDownListInt = val
          ? this.dropDownListOrig
            .filter((entry) => {
              // cover case of options list being string or object array
              const dropDownValue = this.getLangLabel(entry[this.objectProp]) || entry;
              return dropDownValue.toLowerCase().includes(val.toLowerCase());
            })
          : this.dropDownListOrig;
        this.selectedMenuEntryIndex = this.getIndex(oldEntry);
      }
    },
    // watch selectedList prop for changes triggered from outside
    selectedList: {
      handler(val) {
        const outsideSelected = val.map(sel => sel[this.objectProp]);
        const insideSelected = this.selectedListInt.map(sel => sel[this.objectProp]);
        if (JSON.stringify(outsideSelected) !== JSON.stringify(insideSelected)) {
          this.setSelectedList(val);
        }
      },
      deep: true,
    },
    list(val) {
      const oldEntry = this.dropDownListInt[this.selectedMenuEntryIndex];
      this.dropDownListInt = val;
      if (val && val.length) {
        this.returnAsObject = typeof val[0] === 'object';
      }
      this.dropDownListOrig = [].concat(val);
      this.selectedMenuEntryIndex = this.getIndex(oldEntry);
    },
    showDropDown(val) {
      // allow also for static drop down entries to be loaded on first drop down show only
      if (val && !this.allowDynamicDropDownEntries && !this.dropDownListInt.length) {
        /**
         * event to fetch drop down entries with changing input
         *
         * @event fetch-dropdown-entries
         * @type { object }
         *
         */
        this.$emit('fetch-dropdown-entries', { value: this.input, type: this.objectProp });
      }
      if (val) {
        this.calcDropDownMinWidth();
        this.selectedMenuEntryIndex = 0;
        this.dropDownYPosition = 0;
        this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
        /**
         * event triggered on show drop down
         *
         * @event show-dropdown
         * @type {none}
         *
         */
        this.$emit('show-dropdown');
      } else {
        // clear input on drop down close if unknown entries are not allowed
        if (document.activeElement.tagName === 'BODY') {
          this.input = '';
        }
        /**
         * event triggered on hide drop down
         *
         * @event hide-dropdown
         * @type {none}
         *
         */
        this.$emit('hide-dropdown');
      }
    },
  },
  mounted() {
    // initialize the internal selected list with props.selectedList
    this.setSelectedList(this.selectedList);
    // initialize the drop down list with props.list
    this.dropDownListInt = this.list;
    if (this.list && this.list.length) {
      this.returnAsObject = typeof this.list[0] === 'object';
    }
    // if dropdown entries are static set the copy for subsequent references (e.g. filtering)
    if (!this.allowDynamicDropDownEntries) {
      this.dropDownListOrig = [].concat(this.dropDownList);
    }
  },
  methods: {
    // add an entry from the drop down to the list of selected entries
    addSelected() {
      this.showDropDown = true;
      // check if entry was selected in drop down
      const selected = this.dropDownListInt[this.selectedMenuEntryIndex];
      // add selected to the selected list
      if (selected) {
        if (this.allowMultipleEntries) {
          // this adds the entry who's index is currently set
          if (this.addSelectedEntryDirectly) {
            this.selectedListInt.push(selected);
          }
        } else {
          // check if an entry is present - if yes - remove it first
          if (this.selectedListInt.length) {
            this.removeEntry(this.selectedListInt[0], 0);
          }
          this.selectedListInt = [].concat(selected);
        }
        if (!this.allowMultipleEntries || !this.chipsInline) {
          this.showDropDown = false;
          this.blurInput();
        } else {
          this.insideDropDown = true;
        }
        /**
         * event triggered when an entry from the drop down was selected or enter was pressed
         *
         * @event selected
         * @type {object}
         */
        this.emitSelectedList();
        // reset input
        this.input = '';
        // reset the drop down list
        if (!this.allowDynamicDropDownEntries) {
          // filter the selected entry from the list of drop down menu entries
          this.dropDownListInt = selected && selected[this.objectProp] && !this.returnAsObject
            ? this.dropDownListOrig
              .filter((entry) => {
                const origEntry = entry[this.objectProp] || entry;
                return origEntry.toLowerCase()
                  !== selected[this.objectProp].toLowerCase();
              })
            : this.dropDownListOrig;
        } else {
          this.dropDownListInt = this.dropDownListInt.filter(entry => !this.selectedListInt
            .map(sel => sel.idInt).includes(entry.idInt));
        }
      }
    },
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      this.insideInput = true;
      if (!this.allowDynamicDropDownEntries) {
        // check if item has an id (= is not an custom entry)
        if (item.idInt === 0 || item.idInt) {
          this.dropDownListInt.push(item);
          // sort all entries by id to restore the original order
          this.sort(this.dropDownListInt);
        }
      }
      this.selectedListInt.splice(index, 1);
      // if dropdown is already open keep open!
      this.insideInput = this.showDropDown;
      // for single entries focus on input again
      // TODO: not working!
      if (!this.allowMultipleEntries) {
        this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
      }
      this.emitSelectedList();
    },
    // allow for navigation with arrow keys
    triggerArrowKey(event) {
      if (event.key === 'ArrowDown') {
        if (this.selectedMenuEntryIndex < this.dropDownListInt.length - 1) {
          this.selectedMenuEntryIndex += 1;
        }
        if (this.$refs.option[this.selectedMenuEntryIndex].offsetTop
          >= this.$refs.dropdownContainer.clientHeight) {
          this.dropDownYPosition += this.$refs.option[this.selectedMenuEntryIndex].clientHeight;
        }
      } else if (event.key === 'ArrowUp') {
        if (this.selectedMenuEntryIndex > 0) {
          this.selectedMenuEntryIndex -= 1;
        }
        if (this.$refs.option[this.selectedMenuEntryIndex].offsetTop
          >= this.$refs.dropdownContainer.clientHeight) {
          this.dropDownYPosition -= this.$refs.option[this.selectedMenuEntryIndex].clientHeight;
        } else {
          this.dropDownYPosition = 0;
        }
      }
      this.$refs.dropdownContainer.scrollTop = this.dropDownYPosition;
    },
    onInputBlur() {
      this.insideInput = false;
      this.chipActiveForRemove = -1;
      if (!this.insideDropDown && document.activeElement.tagName === 'BODY') {
        this.input = '';
      }
    },
    onInputFocus() {
      this.insideInput = true;
      this.insideDropDown = false;
    },
    getIndex(oldEntry) {
      if (!this.dropDownListInt.length) {
        return -1;
      }
      // set the index to the entry previously selected (if any)
      if (oldEntry) {
        const index = this.dropDownListInt.map(e => e.idInt).indexOf(oldEntry.idInt);
        if (index < 0) {
          return 0;
        }
        return index;
      }
      return 0;
    },
    sort(list) {
      list.sort((a, b) => {
        let compA = this.getLangLabel(a[this.objectProp]).toLowerCase();
        let compB = this.getLangLabel(b[this.objectProp]).toLowerCase();
        if (this.sortName) {
          let firstA = '';
          let firstB = '';
          [compA, firstA] = this.getNameSortValue(compA);
          [compB, firstB] = this.getNameSortValue(compB);

          if (compA === compB) {
            compA = firstA;
            compB = firstB;
          }
        }
        if (compA > compB) {
          return 1;
        }
        return -1;
      });
      this.emitSelectedList();
    },
    getNameSortValue(compValue) {
      const compValueSansNum = compValue.replace(/,? [0-9-]+/g, '');
      if (compValueSansNum.includes(',')) {
        const compArray = compValueSansNum.split(', ');
        return [compArray[0], compArray.splice(1).join()];
      }
      const compArray = compValueSansNum.split(' ');
      return [compArray.pop(), compValueSansNum];
    },
    setSelectedList(val) {
      if (val && val.length) {
        this.selectedListInt = val.map((entry, index) => {
          if (typeof entry === 'object') {
            this.returnAsObject = true;
            return Object.assign({}, entry, {
              idInt: this.identifier && (entry[this.identifier] === 0 || entry[this.identifier])
                ? entry[this.identifier]
                : entry.idInt
                || this.getInternalId(entry[this.objectProp] + this.list.length + index),
              [this.objectProp]: entry[this.objectProp],
            });
          }
          return Object.assign({}, {
            idInt: this.getInternalId(entry + this.list.length + index),
            [this.objectProp]: entry,
          });
        });
      } else {
        this.selectedListInt = [];
      }
      this.dropDownListInt = this.list;
    },
    checkLeave(e) {
      if (e.relatedTarget && e.relatedTarget.closest('.base-chips-input')
        !== e.target.parentElement) {
        this.insideDropDown = false;
      }
    },
    getInternalId(val) {
      let id = val;
      if (this.selectedListInt.map(e => e.idInt).includes(id)) {
        id = this.getInternalId(id + 1);
      }
      return id;
    },
    emitSelectedList() {
      if (!this.returnAsObject) {
        this.$emit('selected', this.selectedListInt.map(sel => sel[this.objectProp]));
      } else {
        const sendArr = [];
        this.selectedListInt
          .forEach((sel, index) => this.$set(sendArr, index, Object.assign({}, sel)));
        sendArr.forEach(sel => this.$delete(sel, 'idInt'));
        /**
         * event emitting selected list upon changes
         *
         * @type {Array}
         *
         */
        this.$emit('selected', sendArr);
      }
    },
    // need to set custom due to some strange effects not showing correct element in some cases
    setDragElement(dataTransfer, dragEl) {
      const img = dragEl.cloneNode(true);
      img.id = 'chip-inline-drag';
      img.style.position = 'absolute';
      img.style.top = '-99999px';
      img.style.left = '-99999px';

      // add the element to the dom
      document.body.appendChild(img);
      dataTransfer.setDragImage(img, 0, 0);
    },
    onDragEnd() {
      this.drag = false;
      const elem = document.getElementById('chip-inline-drag');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
      // check if dragging led to differently sorted list
      // and inform parent if yes
      if (JSON.stringify(this.selectedList) !== JSON.stringify(this.selectedListInt)) {
        this.emitSelectedList(this.selectedListInt);
      }
    },
    checkKeyEvent(event) {
      if (event.key === 'Backspace') {
        const lastIndex = this.selectedListInt.length - 1;
        if (!this.fired && !this.input && this.chipActiveForRemove < 0) {
          // on first backspace make chip active
          this.chipActiveForRemove = lastIndex;
          // on second backspace set timeout for delete
        } else if (this.chipActiveForRemove >= 0 && !this.fired && !this.input) {
          // check if there is actually anything left to remove
          if (lastIndex >= 0) {
            this.removeEntry(this.selectedListInt[lastIndex], lastIndex);
            this.chipActiveForRemove = -1;
          }
        }
        // necessary to prevent accidential delete of chips when user keeps backspace pressed
        this.fired = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(() => {
          this.fired = false;
        }, 200);
      } else {
        this.chipActiveForRemove = -1;
      }
      // if user has input and uses semicolon add input
      if (event.code === 'Comma' && event.shiftKey && this.input) {
        event.preventDefault();
        this.addSelected();
        this.input = '';
      }
      if (event.key === 'Tab') {
        this.insideInput = false;
        this.insideDropDown = false;
      }
    },
    modifyChipValue(newString, entry) {
      // if the string was completely deleted remove the chip from the array
      if (!newString) {
        this.selectedListInt = this.selectedListInt
          .filter(selected => selected.idInt !== entry.idInt);
        // check if the string was modified
      } else if (newString !== entry[this.objectProp]) {
        if (this.language) {
          this.$set(entry, this.objectProp, { [this.language]: newString });
        } else {
          this.$set(entry, this.objectProp, newString);
        }
        // if the entry has an identifier, remove it to indicate this is not the entry fetched from
        // external sources anymore
        if (this.identifier) {
          this.$set(entry, this.identifier, '');
        }
      }
      this.emitSelectedList();
    },
    blurInput() {
      const inputElems = this.$refs.baseInput.$el.getElementsByTagName('input');
      if (inputElems && inputElems.length) {
        inputElems[0].blur();
      }
    },
    hoverBoxActive(value, entry) {
      /**
       * event emitted on show / hide hoverbox, emitting event and originating entry
       *
       * @type {Event, Object}
       */
      this.$emit('hoverbox-active', { value, entry });
    },
    calcDropDownMinWidth() {
      const inputElement = this.$refs.baseInput;
      if (inputElement && inputElement.$el && inputElement.$el.clientWidth) {
        this.dropDownMinWidth = `${inputElement.$el.closest('.base-input').clientWidth}px`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-chips-input {
    width: 100%;
    text-align: left;

    .base-chips-input-chips {
      max-width: 100%;
    }

    .base-chips-input-sort {
      cursor: pointer;
      margin-left: $spacing;
      white-space: nowrap;
      transition: all 0.2s ease;

      &:hover {
        color: $app-color;
      }
    }

    .base-chips-input-loader {
      transform: scale(0.5);
      margin-right: $spacing-large;
    }

    .base-chips-drop-down {
      position: absolute;
      background: white;
      max-height: 10 * $row-height-small;
      overflow-y: auto;
      z-index: 2;
      box-shadow: $drop-shadow;
      cursor: pointer;

      .base-chips-drop-down-entry-wrapper {
        padding: $spacing-small/2 $spacing;
        min-height: $row-height-small;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.base-chips-drop-down-entry-wrapper-active {
          background: $background-color;
        }

        .base-chips-drop-down-entry-additional {
          color: $font-color-second;
          margin-left: $spacing-small;
        }

        .base-chips-drop-down-entry-remark {
          float: right;
        }
      }


    }

    .base-chips-input-chips-container {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing;
    }

    .base-chips-input-single-dropdown {
      margin: 0 $spacing;

      .base-chips-input-single-dropdown-icon {
        transition: transform 0.5s ease, color 0.2s ease, fill 0.2s ease;
        height: $icon-small;
        flex-shrink: 0;

        &.base-chips-input-single-dropdown-icon-rotated {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
