<template>
  <component
    :is="renderAs"
    :class="[{
      'base-expand': !edit,
      'expanded': expanded }]">
    <template
      v-if="!edit && data.label">
      <button
        :id="'base-expand-control-' + _uid"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-controls="'base-expand-region-' + _uid"
        type="button"
        class="base-expand__head base-expand-item"
        @click="expand">
        <span class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <span
            class="base-expand__head__label">{{ data.label }}</span>
          <span
            class="base-expand__head__additional">
            ({{ data.data.length }})
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
            v-for="(items, index) in data.data"
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
      v-if="!edit && data.value">
      <div class="base-expand-item base-expand-item--intend">
        <span class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <!-- @slot a slot to provide customized entry row -->
          <slot
            name="content"
            :data="data">
            {{ data.value }}
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
          :title="data.label"
          tabindex="0"
          class="base-expand-item__col base-expand-item__handle"
          @keyup.down="moveItem('down')"
          @keyup.up="moveItem('up')"
          @keyup.space="movable =! movable"
          @keyup.esc="movable = false"
          @focus="supportiveText('activate')"
          @blur="movable = false">
          <base-icon
            name="drag-lines" />
        </span>
        <div class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <span
            :class="[
              'base-expand__head__label',
              { 'base-expand__head__label--disabled': data.hidden }]">{{ data.label }}</span>
          <span
            class="base-expand__head__additional">
            ({{ data.data.length }})
          </span>
        </div>
        <div class="base-expand-item__col base-expand-item__controls">
          <base-button
            :icon="data.hidden ? 'eye': 'eye-hide'"
            :text="data.hidden ? editShowText : editHideText"
            :has-background-color="false"
            :aria-label="`${data.hidden ? editShowText : editHideText} ${data.label}`"
            icon-size="large"
            align-text="left"
            @clicked="setVisibility" />
        </div>
      </div>
    </template>
  </component>
</template>

<script>
// eslint-disable-next-line
import BaseExpandListRow from '@/components/BaseExpandList/BaseExpandListRow';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import BaseButton from '@/components/BaseButton/BaseButton';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseExpandListRow',
  components: {
    BaseButton,
    BaseExpandListRow,
    BaseIcon,
  },
  mixins: [i18n],
  props: {
    /**
     * data object: { label: 'String', data: [{ value: 'String', }] } <br><br>
     * rendered variants: <br>
     * expandable row: data object contains property 'label'<br>
     * entry row: data object contains property 'value'
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
  },
  data() {
    return {
      expanded: false,
      // referenced in BaseExpandList
      movable: false,
      // referenced in BaseExpandList
      useSupportiveText: true,
    };
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
  },
  methods: {
    /**
     * set visibility and force update
     */
    setVisibility() {
      this.data.hidden = !this.data.hidden;
      this.$forceUpdate();
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
          order: this.data.order,
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
      const maxHeight = elementHeight + elementHeight * this.data.data.length;

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
       * @event
       * @property {string} type
       */
      this.$emit('supportive', type);
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
    overflow: hidden;
    white-space: nowrap;
  }

  &__controls {
    justify-self: flex-end;
    border-left: $border-width solid $background-color;
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
