<template>
  <div
    class="base-edit-control">
    <component
      :is="renderTitleAs"
      v-if="title"
      class="base-edit-control__title">
      {{ title }}
      <span
        v-if="subtitle"
        class="base-edit-control__title__additional">
        {{ subtitle }}
      </span>
    </component>

    <div class="base-edit-control__buttons">
      <base-button
        v-if="!edit"
        icon="edit"
        text="edit"
        @clicked="activate" />

      <base-button
        v-if="edit"
        icon="remove"
        text="cancel"
        @clicked="cancel" />

      <base-button
        v-if="edit"
        icon="save-file"
        text="save"
        @clicked="save" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';

export default {
  name: 'BaseEditControl',
  components: {
    BaseButton,
  },
  props: {
    /**
     * set edit mode
     */
    edit: {
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
      default: 'Subtitle',
    },
    /**
     * render title as e.g.: 'h2' | 'h3'
     */
    renderTitleAs: {
      type: String,
      default: 'h2',
    },
    /**
     * button text edit
     */
    editButtonText: {
      type: String,
      default: 'Show all',
    },
    /**
     * button text cancel
     */
    cancelButtonText: {
      type: String,
      default: 'Show all',
    },
    /**
     * button text save
     */
    saveButtonText: {
      type: String,
      default: 'Show all',
    },
  },
  methods: {
    activate(event) {
      this.editInt = true;
      /**
       * event emitted on activate click
       *
       * @type {Event}
       */
      this.$emit('activated', event);
    },
    cancel(event) {
      this.editInt = false;
      /**
       * event emitted on cancel click
       *
       * @type {Event}
       */
      this.$emit('canceled', event);
    },
    save(event) {
      /**
       * event emitted on save click
       *
       * @type {Event}
       */
      this.$emit('saved', event);
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

    &__title {
      flex-grow: 1;
      justify-self: flex-start;
      margin-bottom: 0;

      &__additional {
        font-weight: inherit;
        color: $font-color-second;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
    }
  }
</style>
