## Demo

Test you component configuration on this example component!
(Some settings only have an effect in edit mode or view mode respectively)
```vue live

<template>
  <div class="section-canvas">
    <div class="options-section">
      <BaseToggle
        v-model="isLoading"
        name="toggle is loading"
        label="isLoading"
        class="options-toggle" />
      <BaseToggle
        v-model="showHeader"
        name="toggle show header"
        label="showHeader"
        class="options-toggle" />
      <BaseToggle
        v-model="showOptions"
        name="toggle show options"
        label="showOptions"
        class="options-toggle" />
      <BaseToggle
        v-model="editMode"
        name="set edit mode from outside"
        label="editMode"
        class="options-toggle" />
      <BaseToggle
        v-model="showActionButtonBoxes"
        name="show bottom action button boxes"
        label="showActionButtonBoxes"
        class="options-toggle" />
      <BaseToggle
        v-model="jumpToTop"
        name="jump to top on page change"
        label="jumpToTop"
        class="options-toggle" />
      <BaseToggle
        v-model="draggable"
        name="items draggable in edit mode"
        label="draggable"
        class="options-toggle" />
      <BaseToggle
        v-model="useExpandMode"
        name="use expand mode"
        label="useExpandMode"
        class="options-toggle" />
      <BaseToggle
        v-model="usePagination"
        name="use pagination"
        label="usePagination"
        class="options-toggle" />
    </div>
    <div class="options-section">
      <BaseInput
        v-model="maxShowMoreRows"
        :disabled="!useExpandMode"
        label="maxShowMoreRows"
        field-type="number"
        placeholder="choose a number of rows to be shown in expand mode"
        class="options-input" />
      <BaseInput
        v-model="maxRows"
        :disabled="!usePagination"
        label="maxRows"
        field-type="number"
        placeholder="choose a number of rows to be shown with pagination"
        class="options-input" />
      <BaseInput
        v-model="numberOfBoxes"
        label="visible boxes (max 24)"
        field-type="number"
        placeholder="specify a number of visible boxes, max. 24"
        class="options-input" />
    </div>
    <BaseResultBoxSection
      v-model="visibleBoxes"
      :is-loading="isLoading"
      :show-header="showHeader"
      :showOptions="showOptions"
      :selected-list.sync="selectedBoxes"
      :options-button-text="{
        show: 'Edit/Show Options',
        hide: 'Return/Hide Options',
      }"
      :options-button-icon="{
        show: 'options-menu',
        hide: 'remove',
      }"
      :box-breakpoints="[
        [0, 1],
        [200, 2],
        [400, 3],
        [600, 4],
        [800, 5],
      ]"
      :edit-mode.sync="editMode"
      :selectOptionsText="{
        selectAll: 'Custom select all',
        selectNone: 'Custom select none',
        entriesSelected: {
          string: !selectedBoxes.length || selectedBoxes.length > 1 ? 'entries selected' : 'entry selected',
          count: selectedBoxes.length,
        },
      }"
      :expand-text="{
        expand: 'Custom more objects',
        collapse: 'Custom collapse',
      }"
      :total="visibleBoxes.length"
      :max-show-more-rows="maxShowMoreRows"
      :jump-to-top="jumpToTop"
      :show-action-button-boxes="showActionButtonBoxes"
      :use-pagination="usePagination"
      :use-expand-mode="useExpandMode"
      :max-rows="maxRows"
      :draggable="draggable"
      :expanded="!useExpandMode"
      header-text="This is the header text"
      @entry-selected="entrySelected" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    isLoading: false,
    showHeader: true,
    showOptions: true,
    editMode: false,
    maxShowMoreRows: 1,
    maxRows: 2,
    jumpToTop: false,
    showActionButtonBoxes: true,
    useExpandMode: false,
    usePagination: false,
    draggable: false,
    numberOfBoxes: 12,
    entriesList: [
        {
          id: 'pCSLggvdsi8vvvb3lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'An extra extra long title',
          subtext: 'A subtext',
          description: 'Collaboration',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8vvvb3lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllzR4gfTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 2',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllzR4gfTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3123lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 1',
          subtext: 'A subtext',
          description: 'Article',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3123lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3l323llzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 2',
          subtext: 'A subtext',
          description: 'Scientific Paper',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3l323llzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllzRTfgsdfgggggLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 3',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllzRTfgsdfgggggLM4dJR/460/341',
        },
        {
          id: 'pCSLggvds3222i8b3lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 4',
          subtext: 'Difference is the key',
          description: 'Performance & Art',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvds3222i8b3lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllz444RTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 5',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllz444RTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllz777RTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 6',
          subtext: 'A subtext',
          description: 'Workshop',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllz777RTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b0003lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 7',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b0003lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllz789RTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 8',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllz789RTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsirtz8b3lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 9',
          subtext: 'A subtext',
          description: 'Mission',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsirtz8b3lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3l456llzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 10',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3l456llzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllzRT456LM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 11',
          subtext: 'A subtext',
          description: 'Conference',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllzRT456LM4dJR/460/341',
        },
        {
          id: 'pCSLgg234vdsi8b3lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 12',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLgg234vdsi8b3lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3lllzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 13',
          subtext: 'A subtext',
          description: 'Exhibition',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3lllzRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3zRdddTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 14',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3zRdddTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8bbbb3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 15',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8bbbb3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8oiouiob3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 16',
          subtext: 'A subtext',
          description: 'Exhibition',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8oiouiob3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggasdfvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 17',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggasdfvdsi8b3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8asdb3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 18',
          subtext: 'A subtext',
          description: 'Master Work',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8asdb3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8ffsdb3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 19',
          subtext: 'A subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8ffsdb3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 29',
          subtext: 'A different long subtext',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsi8b3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Unknown',
          subtext: 'Lets find it out and look deeper',
          description: 'Bachelor',
          imageUrl: 'https://picsum.photos/seed/pCSLggvdsiasdf8b3zRTLM4dJR/460/341',
        },
        {
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'TBD',
          subtext: 'Misterious',
          text: ['Random text 1', 'Random text 2'],
        },
    ],
    selectedBoxes: [],
    };
  },
  computed: {
    visibleBoxes: {
      get() {
        return this.entriesList.slice(0, this.numberOfBoxes);
      },
      set(val) {
        const nonVisibleBoxes = this.entriesList.slice(this.numberOfBoxes -1, this.entriesList.length - 1);
        this.entriesList = [...val, ...nonVisibleBoxes];
      },
    },
  },
  methods: {
    entrySelected({ entryId, selected }) {
      if (selected && !this.selectedBoxes.includes(entryId)) {
        this.selectedBoxes.push(entryId);
      } else if (!selected) {
        this.selectedBoxes = this.selectedBoxes.filter(boxId => boxId !== entryId);
      }
    },
    selectEntries(selectAll) {
      if (selectAll) {
        this.selectedBoxes = this.entriesList.map(entry => entry.id);
      } else {
        this.selectedBoxes = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .section-canvas {
    padding: 16px;
    background: rgb(240, 240, 240);
  }

  .result-box {
    margin-right: 16px;
  }
  .options-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .options-toggle {
    margin: 8px;
  }
  .options-input {
    width: 30% !important;
    margin: 8px;
  }
</style>
```




An example demonstrating slots

```vue live

<template>
  <div class="section-canvas">
    <BaseResultBoxSection
      :entry-list="entriesList"
      :is-loading="false"
      :selected-list.sync="selectedBoxes"
      show-action-button-boxes
      title-property-name="parent.title"
      message-text="This is the custom message Text"
      message-subtext="This is the custom message Subtext"
      @submit-action="submitAction">
      <template
        #header>
        <div class="custom-header">
            <h2 class="header-text">This is a custom header</h2>
            <base-drop-down
              :showLabel="false"
              v-model="selected"
              :options="[
                { label: 'A-Z', value: 'alphabetical_down' },
                { label: 'Z-A', value: 'alphabetical_up' },
                { label: 'Type', value: 'type' },
                { label: 'Newest First', value: 'date_created_down' },
                { label: 'Oldest First', value: 'date_created_up' }]"
              header-style="single"
              label="Sort"
              placeholder="Sort"
            />
        </div>

      </template>
      <template
        #optionButtons="scope">
        <BaseButton
          text="Custom Option 1"
          icon-size="large"
          icon="licence"
          button-style="single"
          class="custom-button"
          @clicked="submitAction('license')" />
        <BaseButton
          text="Custom Option 2"
          icon-size="large"
          icon="eye"
          button-style="single"
          class="custom-button"
          @clicked="submit('publish')" />
      </template>
      <template
        #resultBox="props">
        <BaseImageBox
          :key="props.item.id"
          :selectable="props.selectActive"
          :selected="selectedBoxes.map(entry => entry.id || entry).includes(props.item.id)"
          :title="props.item.parent.title"
          :subtext="props.item.parent.subtext"
          :description="props.item.parent.type.label.en"
          :image-url="props.item.parent.image"
          lazyload
          show-title
          class="custom-button"
          @select-triggered="props.entrySelected"
          @clicked="entryClicked(props.item.parent.id)"/>
      </template>
      <template
        #optionsMessageAreaAfter>
        <div class="after-slot">
          This is the options-message-area-after slot
        </div>
      </template>
      <template #actionButtons="{ itemsPerRow, elementId }">
        <BaseBoxButton
          key="custom-action-button"
          text="custom button text"
          :box-size="{ width: 'calc(((100% - (var(--items-per-row) * 8rem/19))/ var(--items-per-row)) - 0.01rem)', height: '100%' }"
          icon="eye"
          box-style="small"
          box-type="button"
          :class="['custom-button',
                   { 'action-box-spacer': itemsPerRow < entriesList.length},
                   `base-result-box-section__box-item-${elementId}`]"
          @clicked="submitAction('customValue')" />
        <BaseBoxButton
          key="custom-action-button-2"
          text="custom button text 2"
          :box-size="{ width: 'calc(((100% - (var(--items-per-row) * 8rem/19))/ var(--items-per-row)) - 0.01rem)', height: '100%' }"
          icon="eye"
          box-style="small"
          box-type="button"
          :class="['custom-button',
                   { 'action-box-spacer': itemsPerRow < entriesList.length},
                   `base-result-box-section__box-item-${elementId}`]"
          @clicked="submitAction('customValue')" />
      </template>
    </BaseResultBoxSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
    selected: {},
    activeAction: '',
    entriesList: [
        {
          uid: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAvxpqrKsV',
            title: 'Custom Box 1',
            subtext: 'More text',
            type: {
              label: {
                de: 'Album',
                en: 'album',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: 'https://picsum.photos/seed/pCSLggvdsi8b3zRTLM4dJR/460/341',
          },
        },
        {
          uid: 'pCSLggvdsi8b3zRThhhhLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAvxpqrKsV',
            title: 'Custom Box 1',
            subtext: 'More text',
            type: {
              label: {
                de: 'Album',
                en: 'album',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: 'https://picsum.photos/seed/pCSLggvdsi8b3zRThhhhLM4dJR/460/341',
          },
        },
        {
          uid: 'pCSLggvdsi8ffffb3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAvxpqrKsV',
            title: 'Custom Box 1',
            subtext: 'More text',
            type: {
              label: {
                de: 'Album',
                en: 'album',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: 'https://picsum.photos/seed/pCSLggvdsi8ffffb3zRTLM4dJR/460/341',
          },
        },
        {
          uid: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAddddvxpqrKsV',
            title: 'Custom Box 2',
            type: {
              label: {
                de: 'Album',
                en: 'book',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: 'https://picsum.photos/seed/pCSLggvdsiasdf8b3zRTLM4dJR/460/341',
          },
        },
        {
          uid: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdhhhhRAvxpqrKsV',
            title: 'Custom Box 3',
            subtext: 'More subtext',
            type: {
              label: {
                de: 'Album',
                en: 'record',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: 'https://picsum.photos/seed/pCSLggvdsi8b3fffzRTLM4dJR/460/341',
          },
        },
    ],
    selectedBoxes: [],
    };
  },
  methods: {
    submitAction(action) {
      alert(`${action} would be executed now`);
    },
    entryClicked(id) {
      alert(`entry with id ${id} was clicked!`);
    },
    calcBoxWidth(itemNumber) {
      return `calc(((100% - (var(--items-per-row) * 8rem/19))
              / var(--items-per-row)) - 0.01rem)`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .section-canvas {
    padding: 16px;
    background: rgb(240, 240, 240);
  }
  .header-text {
    margin: 0;
  }

  .custom-header {
    display: flex;
    align-items: center;
    border: 1px solid red;
  }

  .action-box-spacer {
    margin-top: 16px;
  }

  .after-slot {
    border: 1px solid red;
    font-weight: bold;
    color: black;
  }

  .custom-button {
    border: 1px solid red;
  }

</style>
```
