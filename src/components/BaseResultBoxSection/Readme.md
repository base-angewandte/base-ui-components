An example without using any slots

```vue

<template>
  <div class="section-canvas">
    <BaseResultBoxSection
      :entry-list="entriesList"
      :action="activeAction"
      :is-loading="false"
      :selected-list="selectedBoxes"
      message-text="This is the message Text"
      message-subtext="This is the message Subtext"
      option-button-text="This is the option button text"
      action-button-text="This is the action button text"
      cancel-text="this is the cancel text"
      header-text="This is the header text"
      @selected="selectEntries($event)"
      @cancel-action="activeAction = ''"
      @set-action="activeAction = $event"
      @entry-selected="entrySelected" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    activeAction: '',
    entriesList: [
        {
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'An extra extra long title',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          imageUrl: require('@/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Unknown',
          subtitle: 'Lets find it out and look deeper',
          description: 'Novel',
          imageUrl: require('@/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'TBD',
          subtitle: 'Misterious',
          text: ['Random text 1', 'Random text 2'],
        },
    ],
    selectedBoxes: [],
    };
  },
  methods: {
    entrySelected({ entryId, selected }) {
      console.log(entryId);
      console.log(selected);
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
</style>
```

An example with custom ImageBoxes and demonstrating other slots

```vue

<template>
  <div class="section-canvas">
    <BaseResultBoxSection
      :entry-list="entriesList"
      :action="activeAction"
      :is-loading="false"
      :selected-list="selectedBoxes"
      message-text="This is the message Text"
      message-subtext="This is the message Subtext"
      option-button-text="This is the option button text"
      action-button-text="This is the action button text"
      cancel-text="this is the cancel text"
      header-text="This is the header text"
      @selected="selectEntries($event)"
      @cancel-action="activeAction = ''"
      @set-action="activeAction = $event">
      <template
        v-slot:option-buttons="scope">
        <BaseButton
          text="Custom Option 1"
          icon-size="large"
          icon="licence"
          button-style="single"
          @clicked="scope.setAction('license')" />
        <BaseButton
          text="Custom Option 2"
          icon-size="large"
          icon="eye"
          button-style="single"
          @clicked="scope.setAction('publish')" />
      </template>
      <template
        v-slot:result-box="props">
        <BaseImageBox
          :key="props.item.id"
          :selectable="props.selectActive"
          :selected="selectedBoxes.map(entry => entry.id || entry).includes(props.item.id)"
          :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
          :title="props.item.parent.title"
          :subtext="props.item.parent.subtitle"
          :description="props.item.parent.type.label.en"
          :image-url="props.item.parent.image"
          class="result-box"
          show-title
          @select-triggered="entrySelected(props.item.id, $event)" />
      </template>
      <template
        v-slot:options-message-area-after>
        <div key="after-options-message">This is the options-message-area-after slot</div>
      </template>
    </BaseResultBoxSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
    activeAction: '',
    entriesList: [
        {
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAvxpqrKsV',
            title: 'Item 1',
            subtitle: 'More text',
            type: {
              label: {
                de: 'Album',
                en: 'album',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: require('@/assets/images/img1.png'),
          },
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdRAddddvxpqrKsV',
            title: 'Item 2',
            type: {
              label: {
                de: 'Album',
                en: 'book',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: require('@/assets/images/img1.png'),
          },
        },
        {
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          parent: {
            id: '8MuVSYmDy5wdhhhhRAvxpqrKsV',
            title: 'Item 3',
            subtitle: 'More subtitle',
            type: {
              label: {
                de: 'Album',
                en: 'record',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
            },
            image: require('@/assets/images/img1.png'),
          },
        },
    ],
    selectedBoxes: [],
    };
  },
  methods: {
    entrySelected(id, selected) {
      if (selected && !this.selectedBoxes.includes(id)) {
        this.selectedBoxes.push(id);
      } else if (!selected) {
        this.selectedBoxes = this.selectedBoxes.filter(boxId => boxId !== id);
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
</style>
```
