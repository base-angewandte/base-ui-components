<template>
  <div
    class="base-chips-input">
    <!--
@clicked-outside="onInputBlur"
@focus="onInputFocus"
@blur="onInputBlur"
@click-input-field="insideInput = true"
-->
    <!-- INPUT LABEL AND FIELD -->
    <BaseInput
      :id="id"
      ref="baseInput"
      v-model="inputInt"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? placeholder : ''"
      :label="label"
      :show-label="showLabel"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      :show-input-border="showInputBorder"
      :is-active="dropDownActive"
      :use-form-field-styling="useFormFieldStyling"
      :drop-down-list-id="dropDownListId"
      :linked-list-option="linkedListOption"
      @keydown.enter.prevent="addEntry"
      @keydown="checkKeyEvent"
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
                :id="entry.idInt"
                ref="baseChip"
                :key="'chip-' + entry.idInt"
                :entry="getLangLabel(entry[objectProp], true)"
                :hover-box-content="hoverboxContent"
                :is-linked="alwaysLinked || entry[identifier] === 0 || !!entry[identifier]"
                :chip-active="chipActiveForRemove === index"
                @remove-entry="removeEntry(entry, index)" />
                <!-- @hoverbox-active="hoverBoxActive($event, entry)" -->
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
import i18n from '../../mixins/i18n';
import navigateMixin from '../../mixins/navigateList';
import { sort, createId } from '../../utils/utils';

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
    i18n,
    navigateMixin,
  ],
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     if field is occuring more then once - set an id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * list of selected options (strings or objects), displayed as chips
     */
    selectedList: {
      type: Array,
      default: () => ([]),
    },
    /**
     * @model
     *
     * input string
     */
    input: {
      type: String,
      default: '',
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
     * this means typed input will be added as chip directly
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: false,
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
     * set from outside if drop down is active and special styling should
     * be applied
     */
    dropDownActive: {
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
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
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
    /**
     * specify the id of a linked drop down list
     */
    dropDownListId: {
      type: String,
      default: '',
    },
    /**
     * specify a linked list option (e.g. drop down) <br>
     *   (will be used in aria-activedescendant attribute)
     */
    linkedListOption: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // internal representation of selectedList
      selectedListInt: [],
      // for removing chips via backspace
      timeout: null,
      // for removing chips via backspace
      fired: '',
      // for dragging functionality (transition)
      drag: false,
      // variable for the currently active chip
      // (for arrow key use)
      chipActiveForRemove: -1,
    };
  },
  computed: {
    // to have base input string available here
    inputInt: {
      get() {
        return this.input;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    selectedList: {
      handler(val) {
        const tempList = val.map(option => ({
          ...option,
          // adding an internal id
          ...{ idInt: option[this.identifier] || this.getIdInt(option) },
        }));
        // only update if internal list is different from outside list
        if (JSON.stringify(tempList) !== JSON.stringify(this.selectedListInt)) {
          this.selectedListInt = tempList;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /** keyboard handling for chips */
    checkKeyEvent(event) {
      const key = event.code;
      // if event was Delete check if a chip should be deleted
      if (key === 'Backspace' || key === 'Delete') {
        // if backspace (once) is used make last chip active
        if (key === 'Backspace' && !this.fired
          && !this.inputInt && this.chipActiveForRemove < 0) {
          this.chipActiveForRemove = this.selectedListInt.length - 1;
          // on second backspace set timeout for delete
        } else if (this.chipActiveForRemove >= 0 && !this.fired && !this.inputInt) {
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
      } else if (!this.inputInt && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
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

    /** list modifications */
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      // remove the item from the internal list
      this.selectedListInt.splice(index, 1);
      // emit an event to inform parent of altered list
      this.updateParentList(this.selectedListInt);
      // also emit event to inform which item was removed
      this.$emit('removed', item);
    },
    addEntry() {
      // if there is input, unknown entries are allowed and direct entry addtion
      // is enabled - we can add the entry to the selected list directly
      if (this.inputInt && this.allowUnknownEntries && this.addSelectedEntryDirectly) {
        // check for duplicates
        const duplicate = this.selectedListInt
          .find(option => option[this.objectProp] === this.inputInt);
        // if no duplicate was found add the entry
        if (!duplicate) {
          // where should new item be placed (added at the end or replacing old entry
          // if single select
          const setIndex = this.allowMultipleEntries ? this.selectedListInt.length : 0;
          // create object to add
          const newEntry = {
            idInt: this.getIdInt(),
            [this.objectProp]: this.inputInt,
          };
          console.log(newEntry);
          // set entry in selectedList
          this.$set(this.selectedListInt, setIndex, newEntry);
          // emit an event to inform parent of altered list
          this.updateParentList(this.selectedListInt);
          // otherwise just emit event to parent (for informing user)
        } else {
          this.$emit('duplicate', duplicate);
        }
        // reset the input
        this.inputInt = '';
      }
    },
    updateParentList(newSelectedListInt) {
      console.log('emit');
      let tempList = JSON.parse(JSON.stringify(newSelectedListInt));
      if (newSelectedListInt.length) {
        // remove internal ids again
        tempList = tempList.map((selected) => {
          this.$delete(selected, 'idInt');
          return selected;
        });
      }
      this.$emit('update:selected-list', tempList);
    },
    getIdInt(option) {
      // check if the selected option already has an internal identifier
      // not applicable for newly created entries so check if option was provided
      if (option) {
        // get matching option by value (this is only for options that dont have an
        // external id provided anyways (also duplicates are excluded in 'addEntry()'
        const matchingOption = this.selectedListInt
          .find(opt => opt[this.objectProp] === option[this.objectProp]);
        // check if there was exactly one matching result
        if (matchingOption) {
          return matchingOption.idInt;
        }
      }
      // else return a new internal id
      return createId();
    },

    /** sorting */
    sortSelectedList() {
      sort(this.selectedListInt, 'label');
      this.updateParentList(this.selectedListInt);
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
      console.log('drag');
      this.drag = false;
      const elem = document.getElementById('chip-inline-drag');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
      // check if dragging led to differently sorted list
      // and inform parent if yes
      if (JSON.stringify(this.selectedList) !== JSON.stringify(this.selectedListInt)) {
        this.updateParentList(this.selectedListInt);
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
