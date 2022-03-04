<template>
  <div
    class="base-edit-control">
    <component
      :is="renderTitleAs"
      v-if="title"
      class="base-edit-control__title  base-text-fade-out-background">
      <!-- @slot title slot -->
      <slot>
        {{ title }}
        <span
          v-if="subtitle"
          class="base-edit-control__title__additional">
          {{ subtitle }}
        </span>
      </slot>
    </component>

    <div
      v-if="controls"
      class="base-edit-control__buttons">
      <base-button
        v-if="!edit"
        :disabled="disabled"
        :has-background-color="false"
        :icon="!isLoading ? 'edit' : ''"
        :text="getI18nTerm(editButtonText)"
        class="base-edit-control__button"
        @clicked="activate">
        <template
          v-if="isLoading"
          slot="left-of-text">
          <span class="base-edit-control__loader">
            <BaseLoader />
          </span>
        </template>
      </base-button>

      <base-button
        v-if="edit"
        :has-background-color="false"
        :icon="saveButtonIcon"
        :text="getI18nTerm(saveButtonTextInt)"
        class="base-edit-control__button"
        @clicked="save">
        <template
          v-if="isLoading"
          slot="left-of-text">
          <span class="base-edit-control__loader">
            <BaseLoader />
          </span>
        </template>
      </base-button>

      <base-button
        v-if="editMode === 'save' && edit"
        :has-background-color="false"
        icon="remove"
        :text="getI18nTerm(cancelButtonText)"
        class="base-edit-control__button"
        @clicked="cancel" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseLoader from '@/components/BaseLoader/BaseLoader';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseEditControl',
  components: {
    BaseButton,
    BaseLoader,
  },
  mixins: [
    i18n,
  ],
  props: {
    /**
     * toggle control buttons
     */
    controls: {
      type: Boolean,
      default: false,
    },
    /**
     * disable edit button
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * set edit mode
     */
    edit: {
      type: Boolean,
      default: false,
    },
    /**
     * flag to set if loader should be shown (for autocomplete requests
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * define title
     */
    title: {
      type: String,
      default: 'Title',
    },
    /**
     * define subtitle
     */
    subtitle: {
      type: String,
      default: '',
    },
    /**
     * render title as e.g.: 'h2' | 'h3'
     */
    renderTitleAs: {
      type: String,
      default: 'h2',
    },
    /**
     * define button text<br>
     * could be string or path to i18n json as well
     */
    editButtonText: {
      type: String,
      default: 'Edit',
    },
    /**
     * define button text<br>
     * could be string or path to i18n json as well
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * define button text<br>
     * could be string or path to i18n json as well
     */
    saveButtonText: {
      type: String,
      default: '',
    },
    /**
     * decide on buttons presented in edit mode<br>
     *  <b>save</b>: element has a 'save' and 'cancel' button
     *  <b>done</b>: element solely has a 'done' button. this button is also emitting
     *    a 'saved' event when clicked and uses the saveButtonText
     */
    editMode: {
      type: String,
      default: 'save',
      validator: val => ['save', 'done'].includes(val),
    },
  },
  computed: {
    /**
     * set icon depending on editMode
     * @returns {string}
     */
    saveButtonIcon() {
      if (this.isLoading) {
        return '';
      }
      return this.editMode === 'done' ? 'check-mark' : 'save-file';
    },
    /**
     * set default save button text depending on editMode
     * @returns {string}
     */
    saveButtonTextInt() {
      return this.saveButtonText || (this.editMode === 'done' ? 'Done' : 'Save');
    },
  },
  watch: {
    edit: {
      handler(val) {
        if (val) {
          window.addEventListener('keyup', this.escEventHandler);
        } else {
          window.removeEventListener('keyup', this.escEventHandler);
        }
      },
    },
  },
  methods: {
    activate(event) {
      /**
       * event emitted by click on edit button
       *
       * @type {PointerEvent}
       */
      this.$emit('activated', event);
    },
    cancel(event) {
      /**
       * event emitted by click on cancel button
       *
       * @type {PointerEvent}
       */
      this.$emit('canceled', event);
    },
    save(event) {
      /**
       * event emitted by click on save button
       *
       * @type {PointerEvent}
       */
      this.$emit('saved', event);
    },
    /**
     * intercept escape key event and reset edit mode
     */
    escEventHandler(e) {
      if (e.key === 'Escape') {
        this.cancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-edit-control {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: $row-height-small;

    &__title {
      flex-grow: 1;
      justify-self: flex-start;
      margin-bottom: 0;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      z-index: 0;

      &__additional {
        font-weight: normal;
        font-size: $font-size-small;
        color: $font-color-second;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
    }

    &__button {
      &:last-of-type {
        padding-right: 0;
        transition-property: color;
      }
    }

    &__loader {
      position: relative;
      margin-right: $spacing;
      transform: scale(0.45);
      /* adjusted for 'save-file' icon */
      top: 2px;
      height: 12px;
      width: 12px;
    }
  }
</style>
