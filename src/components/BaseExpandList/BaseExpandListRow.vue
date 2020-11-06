<template>
  <component
    :is="renderAs"
    :class="[{
      'base-expand': !edit,
      'expanded': expanded,
      'hidden': hide }]">
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
            class="base-expand__head__additional">({{ data.data.length }})</span>
        </span>
        <base-icon
          name="drop-down"
          title="open"
          class="base-expand-item__col base-expand__head__icon" />
      </button>

      <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="leave"
        @after-leave="afterLeave">
        <ul
          v-show="expanded"
          :id="'base-expand-region-' + _uid"
          role="region"
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
            render-as="li" />
        </ul>
      </transition>
    </template>

    <template
      v-if="!edit && data.value">
      <div class="base-expand-item base-expand-item--intend">
        <span class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <a
            v-if="data.href"
            :href="data.href"
            :title="`${data.value}${data.attributes ? ` - ${data.attributes.join(', ')}` : ''}`"
            class="base-expand-item__href">{{ `${data.value} ` }}</a>
          <template v-if="data.href">{{ ` - ` }}</template>
          <template v-if="data.attributes">{{ data.attributes.join(', ') }}</template>
        </span>
      </div>
    </template>

    <template
      v-if="edit">
      <div
        :class="['base-expand-item', { 'base-expand-item--movable': movableInt }]">
        <button
          ref="baseExpandItemHandle"
          class="base-expand-item__col base-expand-item__handle"
          @keyup.down="moveItem('down')"
          @keyup.up="moveItem('up')"
          @keyup.space="movableInt =! movableInt"
          @keyup.esc="movableInt = false"
          @blur="movableInt = false">
          <base-icon
            title="drag items"
            name="drag-lines" />
        </button>
        <div class="base-expand-item__col base-expand-item__label base-text-fade-out">
          <span
            :class="[
              'base-expand__head__label',
              { 'base-expand__head__label--disabled': !data.visible }]">{{ data.label }}</span>
          <span
            class="base-expand__head__additional">({{ data.data.length }})</span>
        </div>
        <div class="base-expand-item__col base-expand-item__controls">
          <base-button
            :icon="data.visible ? 'eye-hide': 'eye'"
            :text="data.visible ? 'Hide' : 'Show'"
            :has-background-color="false"
            icon-size="large"
            class="base-expand-item__controls__fixed"
            @clicked="data.visible =! data.visible" />
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

export default {
  name: 'BaseExpandListRow',
  components: {
    BaseButton,
    BaseExpandListRow,
    BaseIcon,
  },
  props: {
    /**
     * data to display
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
     * initial hide component
     */
    hide: {
      type: Boolean,
      default: false,
    },
    /**
     * set move mode from outside
     */
    movable: {
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
  },
  data() {
    return {
      expanded: false,
      movableInt: this.movable,
    };
  },
  watch: {
    /**
     * Set focus to active movable item
     *
     * @params {string}
     */
    movableInt(val) {
      if (val) {
        this.$el.querySelector('.base-expand-item__handle')
          .focus();
      }
    },
  },
  methods: {
    /**
     * move item
     *
     * @param {string} direction values: 'up' | 'down'
     */
    moveItem(direction = 'up ') {
      if (this.movableInt) {
        this.movableInt = false;
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
            this.closeRows(row.$children);
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
     * event triggered on finished leave transition
     *
     * @params {object} el
     */
    afterLeave() {
      // close expanded rows of current level
      if (!this.multiple) {
        this.closeRows(this.$refs.baseExpandListRow);
      }
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

  &__col {
    display: flex;
    align-items: center;
    min-height: $row-height-large;
  }

  &__href {
    color: $app-color;
    transition: $link-transition;
    margin-right: 5px; // Todo: find better solution for spacing

    &:hover,
    &:focus {
      color: $app-color;
    }
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
      padding-left: $spacing-small;
    }
  }

  &--movable {
    position: relative;
    z-index: 1;
    outline: 1px solid $app-color;
  }
}
</style>

<style lang="scss">
@import "../../styles/variables";

.expand-enter-active,
.expand-leave-active {
  transition-duration: 500ms;
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
