<template>
  <component
    :is="renderAs"
    :class="[{
      'base-expand': !edit,
      'expanded': expanded }]">
    <template
      v-if="!edit && dataInt.label">
      <button
        :id="'base-expand-control-' + _uid"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-controls="'base-expand-region-' + _uid"
        type="button"
        class="base-expand__head base-expand-item"
        @click="expand">
        <span class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <span
            class="base-expand__head__label">{{ dataInt.label }}</span>
          <span
            class="base-expand__head__additional">
            ({{ dataInt.count !== undefined ? dataInt.count : dataInt.data.length }})
          </span>
        </span>
        <base-icon
          name="drop-down"
          class="base-expand-item__col base-expand__head__icon" />
      </button>

      <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @before-leave="beforeLeave">
        <ul
          v-show="expanded"
          :id="'base-expand-region-' + _uid"
          :aria-labelledby="'base-expand-control-' + _uid"
          :aria-hidden="!expanded ? 'true' : 'false'"
          class="base-expand__body">
          <!-- Todo: limit levels (counter) -->
          <base-expand-list-row
            v-for="(items, index) in dataInt.data"
            ref="baseExpandListRow"
            :key="'item_' + index"
            :data="items"
            :multiple="multiple"
            render-as="li">
            <template
              v-slot:content="dataNextLevel">
              <!-- @slot a slot to provide customized entry row in next level -->
              <slot
                name="content"
                :data="dataNextLevel.data" />
            </template>
          </base-expand-list-row>
        </ul>
      </transition>
    </template>

    <template
      v-if="!edit && dataInt.value">
      <div
        :class="['base-expand-item',
                 'base-expand-item--intend',
                 { 'base-text-fade-out-left': fadeOutLeft,
                   'base-text-fade-out': fadeOutRight }]">
        <span
          ref="listItemScrollable"
          class="base-expand-item__col base-expand-item__label">
          <!-- @slot a slot to provide customized entry row -->
          <slot
            name="content"
            :data="dataInt">
            {{ dataInt.value }}
          </slot>
        </span>
      </div>
    </template>

    <template
      v-if="edit">
      <div
        :class="['base-expand-item', { 'base-expand-item--movable': movable }]">
        <span
          ref="baseExpandItemHandle"
          :title="dataInt.label"
          tabindex="0"
          class="base-expand-item__col base-expand-item__handle"
          @keydown.down.prevent.stop="moveItem('down')"
          @keydown.up.prevent.stop="moveItem('up')"
          @keydown.space.prevent.stop="movable =! movable"
          @focus="supportiveText('activate')"
          @keyup.esc="cancelMovable"
          @blur="cancelMovable">
          <base-icon
            name="drag-lines" />
        </span>
        <div class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <div
            v-if="!itemVisible"
            class="base-expand-item__overlay" />
          <span
            :class="[
              'base-expand__head__label',
              { 'base-expand__head__label--disabled': !itemVisible }]">
            {{ dataInt.label }}
          </span>
          <span
            class="base-expand__head__additional">
            ({{ dataInt.count !== undefined ? dataInt.count : dataInt.data.length }})
          </span>
        </div>
        <div class="base-expand-item__col base-expand-item__controls">
          <base-button
            v-if="controlType === 'button'"
            :icon="itemVisible ? 'eye': 'eye-hide'"
            :text="''"
            :has-background-color="false"
            :aria-label="`${itemVisible ? editHideText : editShowText } ${dataInt.label}`"
            icon-size="large"
            icon-position="left"
            @clicked="setVisibility(!itemVisible)" />
          <BaseToggle
            v-else-if="controlType === 'toggle'"
            v-model="itemVisible"
            :hide-label="true"
            :label="`${editShowText} ${dataInt.label}`"
            class="base-expand-item__toggle" />
        </div>
      </div>
    </template>
  </component>
</template>

<script>
// eslint-disable-next-line
import BaseExpandListRow from '@/components/BaseExpandList/BaseExpandListRow';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseExpandListRow',
  components: {
    BaseToggle: () => import('../BaseToggle/BaseToggle'),
    BaseButton: () => import('../BaseButton/BaseButton'),
    BaseExpandListRow,
    BaseIcon,
  },
  mixins: [i18n],
  props: {
    /**
     * data object: { label: 'String', data: [{ value: 'String', }],
     *  [hidden]: boolean, [count]: number }<br><br>
     * optional properties:<br>
     *  count: used for the number shown in brackets
     *    (else the array length will be used)<br>
     *  hidden: used to set visibility and is set in edit mode to toggle item<br><br>
     * rendered variants: <br>
     *  expandable row: data object contains property 'label'<br>
     *  entry row: data object contains property 'value'
     */
    data: {
      type: Object,
      default: () => {
      },
    },
    /**
     * set edit mode
     */
    edit: {
      type: Boolean,
      default: false,
    },
    /**
     * expand multiple items
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * render component as e.g.: 'div' | 'li'
     */
    renderAs: {
      type: String,
      default: 'div',
    },
    /**
     * button text to hide item
     */
    editHideText: {
      type: String,
      default: 'Hide',
    },
    /**
     * button text to show item
     */
    editShowText: {
      type: String,
      default: 'Show',
    },
    /**
     * specify the type of visibility switch in edit mode<br>
     *  <b>button</b>: a [BaseButton](#basebutton) without text<br>
     *  <b>button</b>: a [BaseToggle](#basetoggle) element without text<br>
     */
    controlType: {
      type: String,
      default: 'button',
      validator: val => ['button', 'toggle'].includes(val),
    },
  },
  data() {
    return {
      expanded: false,
      // referenced in BaseExpandList
      movable: false,
      // referenced in BaseExpandList
      useSupportiveText: true,
      // internal representation of data
      dataInt: null,
      // fade out overlays
      fadeOutLeft: false,
      fadeOutRight: true,
    };
  },
  computed: {
    itemVisible: {
      set(val) {
        this.$set(this.dataInt, 'hidden', !val);
      },
      get() {
        return !this.dataInt.hidden;
      },
    },
  },
  watch: {
    /**
     * Set focus to active movable item
     *
     * @params {string}
     */
    movable(val) {
      const dragHandle = this.$el.querySelector('.base-expand-item__handle');

      if (val) {
        dragHandle.focus();
      }

      // check if dragHandle has focus
      if (document.activeElement === dragHandle) {
        // emit supportive text for aria-live
        this.supportiveText(this.movable ? 'activated' : 'activate');
      }

      // enable supportive text (disabled by moveItem())
      this.useSupportiveText = true;
    },
    dataInt: {
      handler(val) {
        // check if data has values (and is not initial null) and if it differs
        // from parent data
        if (!!val && JSON.stringify(val) !== JSON.stringify(this.data)) {
          // if yes update parent data
          this.$emit('update:data', val);
        }
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler(val) {
        // check if parent data differ from internal data - if yes update
        if (JSON.stringify(val) !== JSON.stringify(this.dataInt)) {
          this.dataInt = JSON.parse(JSON.stringify(val));
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    if (this.$refs.listItemScrollable) {
      const scrollable = this.$refs.listItemScrollable;
      scrollable.addEventListener('scroll', () => this.scrollHandler(scrollable));
    }
  },
  destroyed() {
    if (this.$refs.listItemScrollable) {
      const scrollable = this.$refs.listItemScrollable;
      scrollable.removeEventListener('scroll', () => this.scrollHandler(scrollable));
    }
  },
  methods: {
    /**
     * cancel movable state, stop propagation if needed<br>
     *   e.g. further esc key event
     * @param {KeyboardEvent} e - event
     */
    cancelMovable(e) {
      if (this.movable) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        e.cancelBubble = false;
        this.movable = false;
      }
    },
    /**
     * set visibility if button was clicked
     */
    setVisibility(val) {
      this.itemVisible = val;
    },
    /**
     * move item
     *
     * @param {string} direction values: 'up' | 'down'
     */
    moveItem(direction = 'up ') {
      if (this.movable) {
        // disable supportive text to avoid message cue
        this.useSupportiveText = false;
        this.movable = false;
        this.$emit('sorted', {
          direction,
        });
      }
    },
    /**
     * expand item
     */
    expand() {
      if (this.expanded) {
        this.expanded = false;
        return;
      }

      // close expanded rows
      if (!this.multiple) {
        const rows = this.$parent.$refs.baseExpandListRow;

        if (rows) {
          rows.forEach((row) => {
            // eslint-disable-next-line
            row.expanded = false;
          });
        }
      }

      this.expanded = true;
    },
    /**
     * calc max height for transition
     *
     * @params {object} el
     */
    maxHeight(el) {
      const elementHeight = this.$el.querySelector('.base-expand-item').offsetHeight;
      const maxHeight = elementHeight + elementHeight * this.dataInt.data.length;

      el.setAttribute('style', `max-height: ${maxHeight}px`);
    },
    /**
     * close expanded rows
     *
     * @params {array} rows
     */
    closeRows(rows) {
      if (rows) {
        rows.forEach((row) => {
          // eslint-disable-next-line
          row.expanded = false;
        });
      }
    },
    /**
     * event triggered on enter transition
     *
     * @params {object} el
     */
    enter(el) {
      this.maxHeight(el);
    },
    /**
     * event triggered on finished enter transition
     *
     * @params {object} el
     */
    afterEnter(el) {
      el.style.removeProperty('max-height');
    },
    /**
     * event triggered on leave transition
     *
     * @params {object} el
     */
    leave(el) {
      const elementHeight = this.$el.offsetHeight;
      el.setAttribute('style', `max-height: ${elementHeight}px`);
    },
    /**
     * event triggered on before leave transition
     */
    beforeLeave() {
      // close expanded rows of current level
      if (!this.multiple) {
        this.closeRows(this.$refs.baseExpandListRow);
      }
    },
    /**
     * supportive text for screen readers
     */
    supportiveText(type = 'activate') {
      if (!this.useSupportiveText) {
        return;
      }
      /**
       * event emitted on dragHandle toggle
       *
       * @event supportive
       * @property {string} type
       */
      this.$emit('supportive', type);
    },
    /**
     * set fadeOut elements depending on scroll position
     *
     * @param {object} row
     */
    scrollHandler(row) {
      this.fadeOutLeft = !!row.scrollLeft;
      this.fadeOutRight = row.scrollWidth - row.scrollLeft !== row.offsetWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-expand-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: $border-width;
  padding-left: calc(#{$spacing} - #{$border-active-width});
  padding-right: $spacing;
  outline: 1px solid $background-color;
  border-left: $border-active-width solid transparent;
  transition: border-left-color 500ms ease-in-out;
  overflow: hidden;

  a {
    color: $app-color;
    transition: $link-transition;
    margin-right: 5px; // Todo: find better solution for spacing

    &:hover,
    &:focus {
      color: $app-color-secondary;
    }
  }

  &__col {
    display: flex;
    align-items: center;
    min-height: $row-height-large;
    overflow: hidden;
  }

  &__handle {
    margin-right: $spacing-small;
    color: $font-color-second;

    svg {
      transition: $drop-down-arrow-animation;
      height: $icon-medium;
      width: $icon-medium;
      min-width: $icon-small;
    }

    &:hover,
    &:focus {
      cursor: grab;
      color: $app-color;
      outline: none;
    }
  }

  &__label {
    flex-grow: 1;
    white-space: nowrap;
    // enable scroll and hide scrollBars
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */

    &::-webkit-scrollbar { /* WebKit */
      width: 0;
      height: 0;
    }

    & .base-expand-item__overlay {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      background: rgba(255, 255, 255, 40%);
    }
  }

  &__controls {
    justify-self: flex-end;
    border-left: $border-width solid $background-color;
    margin-right: -$spacing;

    .base-expand-item__toggle {
      margin: 0 $spacing;
    }
  }

  &.base-text-fade-out::after {
    right: $spacing-small;
  }

  &.base-text-fade-out-left::before {
    left: calc(#{$spacing-large} - #{$border-active-width});

    @media screen and (max-width: $mobile) {
      left: calc(#{$spacing} - #{$border-active-width});
    }
  }

  &--intend {
    padding-left: calc(#{$spacing-large} - #{$border-active-width});

    @media screen and (max-width: $mobile) {
      padding-left: calc(#{$spacing} - #{$border-active-width});
    }
  }

  &--movable {
    position: relative;
    z-index: 1;
    outline: 1px solid $app-color;
  }

  &:focus {
    .base-expand-item__handle {
      color: $app-color;
    }
  }
}
</style>

<style lang="scss">
@import "../../styles/variables";

.expand-enter-active,
.expand-leave-active {
  transition-duration: $base-expand-list-transition-duration;
  transition-timing-function: ease-in-out;
}

.expand-enter-to,
.expand-leave {
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  overflow: hidden;
  max-height: 0 !important;
}

.expand-enter {
  .base-expand-item {
    border-color: transparent !important;
  }
}

.expand-enter-to {
  .base-expand-item {
    border-color: $app-color-secondary !important;
  }
}
</style>

<style lang="scss">
@import "../../styles/baseExpand";
</style>
