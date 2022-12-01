<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto; padding: 16px;">
    <div>
      <base-entry-selector
        ref="entrySelector"
        :entries="baseEntrySelectorEntries"
        :entries-number="baseEntrySelector.length"
        :entries-per-page="entriesPerPage"
        :entries-selectable="entriesSelectable"
        :entry-types="entryTypes"
        :height="'calc(60vh - 32px)'"
        :is-loading="isLoading"
        :sort-options="sortOptions"
        @selected-changed="selectedEntries = $event"
        @toggle-options="toggleOptions">
        <template
          #optionActions>
          <BaseButton
            :text="'publish'"
            :disabled="isLoading"
            :has-background-color="false"
            icon-size="large"
            icon="eye"
            button-style="single"
            @clicked="handleAction('publish')" />
          <BaseButton
            :text="'offline'"
            :disabled="isLoading"
            :has-background-color="false"
            icon-size="large"
            icon="forbidden"
            button-style="single"
            @clicked="handleAction('offline')" />
          <BaseButton
            :text="'duplicate'"
            :disabled="isLoading"
            :has-background-color="false"
            icon-size="large"
            icon="duplicate"
            button-style="single"
            @clicked="handleAction('offline')" />
          <BaseButton
            :text="'delete'"
            :disabled="isLoading"
            :has-background-color="false"
            icon-size="large"
            icon="waste-bin"
            button-style="single"
            @clicked="handleAction('delete')" />
        </template>
      </base-entry-selector>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseEntrySelector from '@/components/BaseEntrySelector/BaseEntrySelector';

export default {
  name: 'App',
  components: {
    BaseButton,
    BaseEntrySelector,
  },
  data() {
    return {
      isLoading: false,
      selectedEntries: [],
      entriesSelectable: false,
      entriesPerPage: null,
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
        {
          label: {
            de: 'Animationsfilm',
            en: 'Animated Film',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/animated_film',
        },
        {
          label: {
            de: 'Forschungsprojekt',
            en: 'Research Project',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
        },
      ],
      sortOptions: [
        {
          label: 'By Type',
          value: 'type_en',
        },
        {
          label: 'A - Z',
          value: 'title',
        },
        {
          label: 'Z - A',
          value: '-title',
        },
        {
          label: 'Last Created',
          value: '-date_created',
        },
        {
          label: 'First Created',
          value: 'date_created',
        },
        {
          label: 'Last Modified',
          value: 'date_modified',
        },
      ],
      baseEntrySelector: [
        {
          id: '9WMh6vEFRZv83g5CSNxWX',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg268vrFAKwD3c3X',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWX',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg268vrFrD3c3X',
          parents: [],
          relations: [],
          icon: 'calendar-many',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5Z83g5CSNxWX',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg888vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ7773g5CSNxWX',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg666vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5553g5CSNxWX',
          parents: [],
          relations: [],
          icon: 'file-object',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg444vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: 'calendar-many',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
      ],
    };
  },
  computed: {
    baseEntrySelectorEntries() {
      return this.baseEntrySelector.slice(0, this.entriesPerPage);
    },
  },
  watch: {},
  mounted() {
    this.entriesPerPage = this.calcEntriesPerPage();
  },
  methods: {
    toggleOptions(value) {
      this.entriesSelectable = value;
    },
    handleAction(action) {
      console.log('action', action);
      console.log('selected entries', this.selectedEntries);
    },
    calcEntriesPerPage() {
      const { entrySelector } = this.$refs;
      let bodyHeight = entrySelector.$refs.body.clientHeight;
      // if pagination element is not present yet (on initial render) deduct height and spacing
      // from sidebar height
      if (!entrySelector.$refs.pagination) {
        bodyHeight = bodyHeight - 48 - 16;
      }
      // hardcoded because unfortunately no other possibility found
      const entryHeight = this.isMobile ? 48 : 57;
      const numberOfEntries = Math.floor(bodyHeight / entryHeight) - 1;

      return numberOfEntries > 4 ? numberOfEntries : 4;
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

.base-advanced-search {
  margin-top: 32px;
}

.activity-showcase {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-showcase__header {
  font-size: $font-size-regular;
  margin: 0 0 0 $spacing;
}

.activity-showcase-after {
  display: flex;
}

.dropdown-extended {
  border-top: $separation-line;
  padding: $spacing;

  .show-more-toggle {
    color: $app-color;
  }
}

  .canvas {
    padding: 16px;
  }

  .flex {
    display: flex;
  }

  .row {
    max-height: 300px;
  }

  div > .base-box-button {
    margin: 8px;
  }

  button {
    display:block;
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
  }

  .popup-text > div:first-of-type {
    margin-right: 16px;
  }

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }

  .image-box {
    margin: 8px;
  }

  .multiline-dropdown {
    margin-bottom: -4px;
  }
  .spacer {
    height: 50px;
  }
</style>
