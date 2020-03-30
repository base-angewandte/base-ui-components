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
      :use-form-field-styling="useFormFieldStyling"
      :is-active="inputFieldActive"
      @clicked-outside="onInputBlur"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @keydown="checkKeyEvent"
      @keypress.enter.prevent="addSelected()"
      @click-input-field="insideInput = true"
      v-on="$listeners">
      <template
        v-if="sortable"
        v-slot:label-addition>
        <div
          class="base-chips-input-sort"
          @click="sortSelectedList(selectedListInt)">
          {{ sortText }}
        </div>
      </template>
      <template
        v-if="!allowMultipleEntries || chipsInline"
        v-slot:input-field-addition-before>
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
                @hoverbox-active="hoverBoxActive($event, entry)" />
            </transition-group>
          </draggable>
        </div>
      </template>
      <template v-slot:input-field-addition-after>
        <div
          v-if="isLoading"
          class="base-chips-input-loader">
          <BaseLoader />
        </div>
        <div
          v-if="!allowMultipleEntries && useFormFieldStyling"
          class="base-chips-input-single-dropdown">
          <SvgIcon
            :class="[
              'base-chips-input-single-dropdown-icon',
              { 'base-chips-input-single-dropdown-icon-rotated': dropDownActive }
            ]"
            name="drop-down" />
        </div>
      </template>
    </BaseInput>
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
import { sort } from '../../utils/utils';

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
    /**
     * set this false if included drop down should not be used
     */
    useDefaultDropDown: {
      type: Boolean,
      default: true,
    },
    /**
     * define if standard form field styling should be
     * used (otherwise no border, no box shadow)
     */
    useFormFieldStyling: {
      type: Boolean,
      default: true,
    },
    dropDownActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // the current text input
      input: '',
      // list of selected entries
      selectedListInt: [],
      selectedMenuEntryIndex: 0,
      insideInput: false,
      returnAsObject: false,
      timeout: null,
      fired: '',
      drag: false,
      chipActiveForRemove: -1,
    };
  },
  computed: {
    inputFieldActive() {
      return this.insideInput || this.dropDownActive;
    },
  },
  watch: {
    input(val) {
      /**
       * event to fetch drop down entries with changing input
       *
       * @event text-input
       * @type { string }
       *
       */
      // still inform parent of the text input
      this.$emit('text-input', val);
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
  },
  mounted() {
    // initialize the internal selected list with props.selectedList
    this.setSelectedList(this.selectedList);
  },
  methods: {
    /** selected list manipulations and related functionalities */
    // add an entry from the drop down to the list of selected entries
    addSelected() {
      // check if entry was selected in drop down
      const selected = {
        label: this.input,
        idInt: this.createIdInt(),
      };
      // set focus back to input-field
      this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus();
      // add selected to the selected list
      if (selected) {
        if (this.allowMultipleEntries) {
          // this adds the entry who's index is currently set
          if (this.addSelectedEntryDirectly) {
            this.selectedListInt.push(selected);
          }
        } else {
          // replace the existing entry or set new one
          console.log('TriggeredÄ');
          this.$set(this.selectedListInt, 0, selected);
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
      }
    },
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      this.insideInput = true;
      this.selectedListInt.splice(index, 1);
      // for single entries focus on input again
      // TODO: not working!
      if (!this.allowMultipleEntries) {
        this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
      }
      this.emitSelectedList();
    },
    createIdInt() {
      return Math.random().toString(36).substr(2, 9);
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
    setSelectedList(val) {
      if (val && val.length) {
        this.selectedListInt = val.map((entry) => {
          if (typeof entry === 'object') {
            this.returnAsObject = true;
            return Object.assign({}, entry, {
              idInt: this.identifier && (entry[this.identifier] === 0 || entry[this.identifier])
                ? entry[this.identifier]
                : entry.idInt
                || this.createIdInt(),
              [this.objectProp]: entry[this.objectProp],
            });
          }
          return Object.assign({}, {
            idInt: this.createIdInt(),
            [this.objectProp]: entry,
          });
        });
      } else {
        this.selectedListInt = [];
      }
    },
    emitSelectedList() {
      console.log('emit');
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

    /** draggable functionalities */
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

    /** sorting */
    sortSelectedList() {
      sort(this.selectedListInt, 'label');
      this.updateParentList(this.selectedListInt);
    },

    /** keyboard handling for chips */
    checkKeyEvent(event) {
      const key = event.code;
      // if event was Delete check if a chip should be deleted
      if (key === 'Backspace' || key === 'Delete') {
        // if backspace (once) is used make last chip active
        if (key === 'Backspace' && !this.fired
          && !this.input && this.chipActiveForRemove < 0) {
          this.chipActiveForRemove = this.selectedListInt.length - 1;
          // on second backspace set timeout for delete
        } else if (this.chipActiveForRemove >= 0 && !this.fired && !this.input) {
          // check if there is actually anything left to remove
          this.removeEntry(
            this.selectedListInt[this.chipActiveForRemove],
            this.chipActiveForRemove,
          );
          this.chipActiveForRemove = -1;
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
      } else if (!this.input && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        const isIndexUp = event.key === 'ArrowRight';
        const activeChip = this.navigate(
          this.selectedListInt,
          isIndexUp,
          this.chipActiveForRemove,
          true,
        );
        this.chipActiveForRemove = this.selectedListInt.indexOf(activeChip);
      } else {
        this.chipActiveForRemove = -1;
      }
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
      z-index: map-get($zindex, dropdown);
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
