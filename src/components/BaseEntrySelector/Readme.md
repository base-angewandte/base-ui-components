## Demo

```vue live

<template>
  <div class="body">
    <div class="controls">
      <BaseToggle
        v-model="selectMode"
        label="Select Mode"
        class="control"/>
      <BaseToggle
        v-model="showOptions"
        label="Show Options"
        class="control"/>
      <BaseToggle
        v-model="showSort"
        label="Show Sorting Drop Down"
        class="control"/>
      <BaseToggle
        v-model="showTypesFilter"
        label="Show Types Filter"
        class="control"/>
      <BaseToggle
        v-model="isLoading"
        label="Is Loading"
        class="control"/>
      <BaseToggle
        v-model="useCustomText"
        label="Use Custom Texts"
        class="control"
        @clicked="selectMode = true; noResults = true" />
      <BaseToggle
        v-model="noResults"
        label="No search Results"
        class="control"/>
      <BaseToggle
        v-model="showPagination"
        label="Show Pagination"
        class="control"/>
      <BaseToggle
        v-model="useSearch"
        :disabled="useHeadSlot"
        label="Use Search"
        class="control"/>
    </div>
    <div class="controls">
      <BaseToggle
        v-model="useHeadSlot"
        label="Use 'head' Slot"
        class="control"/>
      <BaseToggle
        v-model="useActionsSlot"
        label="Use 'option-actions' Slot"
        class="control"
        @clicked="selectMode = true" />
      <BaseToggle
        v-model="useAfterOptionsSlot"
        label="Use 'after-options' Slot"
        class="control"/>
      <BaseToggle
        v-model="useEntriesSlot"
        label="Use 'entries' Slot"
        class="control"
        @clicked="useThumbnailsSlot = false"/>
      <BaseToggle
        v-model="useThumbnailsSlot"
        :disabled="useEntriesSlot"
        label="Use 'thumbnails' Slot"
        class="control"/>
    </div>
    <BaseEntrySelector
      :entries="baseEntrySelectorEntries"
      :entries-total="entries.length"
      :entries-per-page="entriesPerPage"
      :active-entry="baseEntrySelectorEntries.map(entry => entry.id).indexOf(activeEntry)"
      :entries-selectable.sync="selectMode"
      :options-hidden="!showOptions"
      :sort-options="showSort ? sortOptions : []"
      :sort-config="{
        label: 'Sort Entries',
        default: {
          label: 'A - Z',
          value: 'title',
        },
        valuePropertyName: 'value',
      }"
      :entry-types="showTypesFilter ? entryTypes : []"
      :entry-types-config="{
        label: 'Filter By Type',
        default: {
          label: {
            de: 'Alle Typen',
            en: 'All Types',
          },
          source: '',
        },
        valuePropertyName: 'source',
      }"
      :is-loading="isLoading"
      :use-search="useSearch"
      language="de"
      v-bind="entrySelectorText"
      @selected-changed="selectedEntries = $event"
      @fetch-entries="getNewEntries"
      @entry-clicked="activeEntry = $event">
      <template #head>
        <template v-if="useHeadSlot">
          <div class="custom-slot">
            Put your custom head slot elements here
          </div>
        </template>
      </template>
      <template #option-actions>
        <template v-if="useActionsSlot">
          <div class="custom-slot">
            <BaseButton
              text="Publish"
              icon="eye" />
          </div>
        </template>
      </template>
      <template #after-options>
        <template v-if="useAfterOptionsSlot">
          <div class="custom-slot">
            Custom after-options element
          </div>
        </template>
      </template>
      <template #thumbnails="{ item }">
        <template v-if="useThumbnailsSlot">
          <BaseIcon
            v-if="item.has_media"
            :style="{ width: '14px' }"
            name="eye"/>
        </template>
      </template>
      <template #entries="{ entries, selectEntry }">
        <template v-if="useEntriesSlot">
          <div class="custom-slot">
            This could be your custom entries display
            <BaseButton
              v-if="selectMode"
              text="Select Entry"
              icon="plus"
              @clicked="selectEntry({
                index: 0,
                selected: true,
              })"/>
            <div>
              <b>Selected Entries:</b>
              {{ selectedEntries.map(entry => entry.id) }}
            </div>
          </div>
        </template>
      </template>
    </BaseEntrySelector>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entries: [
        {
          id: '9WMh6vEFRZv83g5CSNxWX',
          icon: 'file-object',
          has_media: true,
          description: 'An advanced project',
          title: 'Portfolio & Showroom',
        },
        {
          id: 'b9TWZjUg268vrFAKwD3c3X',
          icon: 'file-object',
          has_media: true,
          title: 'Album of Airbrushes',
          description: 'More to come',
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWX',
          icon: 'file-object',
          has_media: true,
          title: 'More Entries',
          description: 'And it continues',
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWg',
          icon: 'file-object',
          has_media: true,
          title: 'My List',
          description: 'Nowhere',
        },
        {
          id: '9WMh6sfgsr465e83g5CSNxWX',
          icon: 'calendar-many',
          has_media: true,
          title: 'The Road',
          description: 'Oh so long',
        },
      ],
      page: 1,
      activeEntry: -1,
      selectedEntries: [],
      showSort: true,
      showTypesFilter: true,
      selectMode: false,
      showOptions: true,
      isLoading: false,
      useCustomText: false,
      noResults: false,
      showPagination: true,
      useSearch: true,
      sortOptions: [
        {
          label: 'By Type',
          value: 'type_en',
        },
        {
          label: 'A - Z',
          value: 'title',
        },
      ],
      entryTypes: [
        {
          label: {
            de: 'Alle Typen',
            en: 'All Types',
          },
          source: '',
        },
        {
          label: {
            de: 'Album',
            en: 'Album',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
        },
      ],
      useHeadSlot: false,
      useEntriesSlot: false,
      useThumbnailsSlot: true,
      useActionsSlot: false,
      useAfterOptionsSlot: false,
    };
  },
  computed: {
    baseEntrySelectorEntries() {
      if (!this.noResults) {
        const start = (this.page - 1) * this.entriesPerPage;
        return this.entries.slice(start, start + this.entriesPerPage);
      }
      return [];
    },
    entrySelectorText() {
      if (this.useCustomText) {
        return {
          entrySelectorText: {
            noEntriesTitle: 'Custom No Match Title',
            noEntriesSubtext: 'Custom No Match Subtext.',
            options: {
              show: 'Custom Options',
              hide: 'Custom Exit',
            },
            search: 'Custom Search Text',
            selectAll: 'Custom Select All',
            selectNone: 'Custom Select None',
            entriesSelected: 'Custom Items Selected',
          },
        };
      }
      return {};
    },
    entriesPerPage() {
      return this.showPagination ? 2 : 5;
    }
  },
  methods: {
    getNewEntries({ page }) {
      this.page = Number(page);
    },
  }
}
</script>

<style scoped>
.body {
  padding: 16px;
  background: rgb(240, 240, 240);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.control {
  margin: 8px;
}

.custom-slot {
  border: 1px solid red;
  padding: 16px;
  text-align: center;
}
</style>
```
