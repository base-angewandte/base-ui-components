<template>
  <div
    v-if="!chipsInline && selectedListInt.length"
    class="base-chips-input-chips-container">
    <div
      v-for="(entry,index) in selectedListInt"
      :key="index"
      v-click-outside="() => $set(entry, 'editable', false)"
      :class="['base-chips-input-chip', { 'base-chips-input-chip-edited': entry.edited }]">
      <div
        :contenteditable="$props.chipsEditable && entry.editable"
        class="base-chips-input-chip-text"
        @click="$set(entry, 'editable', true)"
        @keyup="$set(entry, 'edited', true)">
        {{ entry[objectProp] }}
      </div>
      <div
        class="base-chips-input-chip-icon"
        @click="removeEntry(entry, index)">
        <img
          class="base-chips-input-chip-icon-img"
          src="../static/icons/remove.svg">
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  TODO the documentation for this component should not be exported
 */
export default {
  props: {
    selectedList: {
      type: Array,
      default() {
        return [];
      },
      isSortable: {
        type: Boolean,
        default: false,
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
