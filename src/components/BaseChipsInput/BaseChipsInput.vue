<template>
  <div
    class="base-chips-input">

    <!-- INPUT LABEL AND FIELD -->
    <base-input
      ref="baseInput"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? $props.placeholder : ''"
      :label="label"
      :show-label="showLabel"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      :show-input-border="showInputBorder"
      :is-active="showDropDown"
      v-model="input"
      @clicked-outside="insideInput = false"
      @input-focus="onInputFocus"
      @input-blur="onInputBlur"
      @arrow-key="triggerArrowKey"
      @enter="addSelected()"
      @click-input-field="insideInput = true">
      <template
        v-if="sortable"
        slot="label-addition">
        <!-- TODO: this should be language specific!! -->
        <div
          class="base-chips-input-sort"
          @click="sort">Sortieren von A-Z</div>
      </template>
      <template
        v-if="!allowMultipleEntries || chipsInline"
        slot="input-field-addition">
        <draggable
          :options="{ disabled: !draggable, setData: setDragElement }"
          v-model="selectedListInt"
          @end="onDragEnd">
          <base-chip
            v-for="(entry, index) in selectedListInt"
            ref="baseChip"
            :id="'base-chip' + index"
            :key="entry.idInt"
            v-model="entry[objectProp]"
            :chip-editable="chipsEditable"
            :hover-box-content="hoverboxContent"
            :is-linked="alwaysLinked || entry[identifier] === 0 || !!entry[identifier]"
            @mouse-down="chipActive = index"
            @remove-entry="removeEntry(entry, index)"
            @hoverbox-active="$emit('hoverbox-active', $event, entry)"
            @valueChanged="$event === entry[objectProp] ? null : $set(entry, 'idInt', null)" />
        </draggable>
      </template>
    </base-input>

    <!-- DROP DOWN MENU -->
    <div
      v-click-outside="() => insideDropDown = false"
      v-if="showDropDown"
      ref="dropdownContainer"
      class="base-chips-drop-down"
      @mouseenter="insideDropDown = true"
      @mouseleave="checkLeave">
      <div
        v-for="(entry, index) in dropDownListInt"
        ref="option"
        :key="index"
        :class="{ 'base-chips-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex }"
        class="base-chips-drop-down-entry-wrapper"
        @click="addSelected()"
        @mouseover="selectedMenuEntryIndex = index"
        @mouseleave="allowUnknownEntries ? selectedMenuEntryIndex = -1 : null">

        <!-- @slot THIS IS A SLOT TO PROVIDE MORE ADVANCED DROP DOWN ENTRIES -->
        <slot
          :item="entry"
          name="drop-down-entry">
          <!-- SLOT DEFAULT -->
          <div
            class="base-chips-drop-down-entry">
            {{ entry[objectProp] }}
          </div>
        </slot>

      </div>
      <!--
        @slot a slot to expand the drop down area (needed for "Expand Functionality"
      -->
      <slot
        name="drop-down-extended" />
      <!--
        @slot customize what is displayed when no drop down options are available
      -->
      <slot
        v-if="!dropDownList.length"
        name="no-options">
        <div
          class="base-chips-drop-down-entry-wrapper">
          {{ dropDownNoOptionsInfo }}
        </div>
      </slot>
    </div>
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
          v-model="entry[objectProp]"
          :key="entry.idInt"
          :chip-editable="chipsEditable"
          class="base-chips-input-chip"
          @remove-entry="removeEntry($event, index)"/>
      </slot>
    </div>

  </div>
</template>

<script>
/**
 * Base Chips Input component with autocomplete function
 *
 */

import ClickOutside from 'vue-click-outside';
import Draggable from 'vuedraggable';
import BaseInput from '../BaseInput/BaseInput';
import BaseChip from '../BaseChip/BaseChip';

export default {
  components: {
    BaseInput,
    BaseChip,
    Draggable,
  },
  directives: {
    ClickOutside,
  },
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
      default() {
        return [];
      },
    },
    /**
     * @model
     *
     * list of already selected options (strings or objects), displayed as chips
     */
    selectedList: {
      type: Array,
      default() {
        return [];
      },
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
     * define if chips should be editable
     */
    chipsEditable: {
      type: Boolean,
      default: false,
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
     * for dynamic drop down entries a unique identifier (id, uuid) is needed
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
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // the current text input
      input: null,
      // list of selected entries
      selectedListInt: [],
      // create a original list from text or object with internal id
      dropDownListOrig: [],
      // list of selectable entries received from parent component
      dropDownList: [],
      selectedMenuEntryIndex: this.getAllowUnknown(),
      insideDropDown: false,
      insideInput: false,
      returnAsObject: false,
      chipActive: -1,
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
              this.returnAsObject = true;
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
          this.dropDownList = list.filter(entry => !this.selectedListInt
            .map(selected => selected[this.identifier]).includes(entry[this.identifier]));
        } else {
          this.dropDownList = list.filter(entry => !this.selectedListInt
            .map(selected => selected.idInt).includes(entry.idInt));
        }
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
        /**
         * event to fetch drop down entries with changing input
         *
         * @event fetch-dropdown-entries
         * @type { object }
         *
         */
        this.$emit('fetch-dropdown-entries', { value: val, type: this.objectProp });
      } else {
        const oldEntry = this.dropDownListInt[this.selectedMenuEntryIndex];
        // if content is static filter the existing entries for the ones matching input
        this.dropDownListInt = val
          ? this.dropDownListOrig
            .filter(entry => entry.toLowerCase().includes(val.toLowerCase()))
          : this.dropDownListOrig;
        this.selectedMenuEntryIndex = this.getIndex(oldEntry);
      }
    },
    // watch selectedList prop for changes triggered from outside
    selectedList: {
      handler(val) {
        this.setSelectedList(val);
      },
      deep: true,
    },
    list(val) {
      const oldEntry = this.dropDownListInt[this.selectedMenuEntryIndex];
      this.dropDownListInt = val;
      this.dropDownListOrig = [].concat(val);
      this.selectedMenuEntryIndex = this.getIndex(oldEntry);
    },
    showDropDown(val) {
      // allow also for static drop down entries to be loaded on first drop down show only
      if (!this.allowDynamicDropDownEntries && !this.dropDownListInt.length) {
        this.$emit('fetch-dropdown-entries', { value: val, type: this.objectProp });
      }
      if (val) {
        this.selectedMenuEntryIndex = this.getAllowUnknown();
        if (!this.chipsEditable) {
          this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
        }
        /**
         * event triggered on show drop down
         *
         * @event show-dropdown
         * @type None
         *
         */
        this.$emit('show-dropdown');
      } else {
        /**
         * event triggered on hide drop down
         *
         * @event hide-dropdown
         * @type None
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
    // if dropdown entries are static set the copy for subsequent references (e.g. filtering)
    if (!this.allowDynamicDropDownEntries) {
      this.dropDownListOrig = [].concat(this.list);
    }
  },
  methods: {
    // add an entry from the drop down to the list of selected entries
    addSelected() {
      debugger;
      this.showDropDown = true;
      // check if entry was selected in drop down
      const selected = this.dropDownListInt[this.selectedMenuEntryIndex];
      if (selected) {
        if (this.allowMultipleEntries) {
          // this adds the entry who's index is currently set
          if (this.addSelectedEntryDirectly) {
            this.selectedListInt.push(selected);
          }
        } else {
          this.selectedListInt = [selected];
        }
        if (!this.allowMultipleEntries || !this.chipsInline) {
          this.showDropDown = false;
          const inputElems = this.$refs.baseInput.$el.getElementsByTagName('input');
          if (inputElems && inputElems.length) {
            inputElems[0].blur();
          }
        } else {
          this.insideDropDown = true;
        }
        // reset input
        this.input = '';
        // if there is an input and unknown entries are allowed add an entry to selected list
      } else if (this.input && this.allowUnknownEntries) {
        this.selectedListInt.push({
          [this.objectProp]: this.input,
          idInt: this.getInternalId(this.input + this.selectedListInt.length),
        });
        // reset input
        this.input = '';
      }
      if (!this.allowDynamicDropDownEntries) {
        // filter the selected entry from the list of drop down menu entries
        // TODO: check if this is still working for entries that are objects!
        this.dropDownListInt = selected && selected[this.objectProp] && !this.returnAsObject
          ? this.dropDownListOrig
            .filter(entry => entry.toLowerCase()
              !== selected[this.objectProp].toLowerCase())
          : this.dropDownListOrig;
      } else {
        this.dropDownListInt = this.dropDownListInt.filter(entry => !this.selectedListInt
          .map(sel => sel.idInt).includes(entry.idInt));
      }
      /**
       * event triggered when an entry from the drop down was selected or enter was pressed
       *
       * @event selected
       * @type {object}
       */
      this.emitSelectedList();
    },
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      this.insideInput = true;
      if (!this.allowDynamicDropDownEntries) {
        // check if item has an id (= is not an custom entry)
        // TODO: is this the desired behaviour?? (or should unknown entry also appear
        // in drop down?
        if (item.idInt === 0 || item.idInt) {
          this.dropDownListInt.push(item);
          // sort all entries by id to restore the original order
          this.sort();
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
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex < this.dropDownListInt.length - 1
          ? this.selectedMenuEntryIndex + 1 : 0;
      } else if (event.key === 'ArrowUp') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex > 0
          ? this.selectedMenuEntryIndex - 1 : this.dropDownListInt.length - 1;
      }
      if (this.$refs.dropdownContainer.scrollHeight !== this.$refs.dropdownContainer.clientHeight) {
        this.$refs.option[this.selectedMenuEntryIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
    getAllowUnknown() {
      return this.$props.allowUnknownEntries ? -1 : 0;
    },
    onInputBlur() {
      if (!this.insideDropDown) {
        if (this.input && this.selectedMenuEntryIndex < 0 && this.allowUnknownEntries) {
          this.selectedListInt.push({ [this.objectProp]: this.input });
          this.emitSelectedList();
        }
        this.input = '';
      }
      this.insideInput = false;
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
          return this.getAllowUnknown();
        }
        return index;
      }
      return this.getAllowUnknown();
    },
    sort() {
      this.selectedListInt.sort((a, b) => {
        // TODO: alternatively - make prop flag sortByLastName (however also
        // problematic if names in diff format...) or make sort just event emit?
        const compA = this.objectProp === 'name' ? a[this.objectProp].split(' ').pop() : a[this.objectProp];
        const compB = this.objectProp === 'name' ? b[this.objectProp].split(' ').pop() : b[this.objectProp];
        if (compA > compB) {
          return 1;
        }
        return -1;
      });
      this.emitSelectedList();
    },
    setSelectedList(val) {
      if (val && val.length) {
        this.selectedListInt = val.map((entry, index) => {
          if (typeof entry === 'object') {
            this.returnAsObject = true;
            return Object.assign({}, entry, {
              idInt: this.identifier && (entry[this.identifier] === 0 || entry[this.identifier])
                ? entry[this.identifier] : entry.idInt,
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
      if (e.relatedTarget.closest('.base-chips-input')
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
      const elem = document.getElementById('chip-inline-drag');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-chips-input {
    position: relative;
    width: 100%;
    text-align: left;

    .base-chips-input-sort {
      cursor: pointer;

      &:hover {
        color: $app-color;
      }
    }

    .base-chips-drop-down {
      position: absolute;
      background: white;
      width: 100%;
      max-height: 10 * $row-height-small;
      overflow-y: auto;
      z-index: 2;
      box-shadow: $drop-shadow;
      cursor: pointer;

      .base-chips-drop-down-entry-wrapper {
        padding: 0 $spacing;
        line-height: $row-height-small;

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
  }
</style>