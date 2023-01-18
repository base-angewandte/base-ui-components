<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto; padding: 16px;">
    {{ valueList }}
    <div>
      <BaseFormGroups
        :form-field-json="fields"
        :value-list="valueList"
        @values-changed="handleInput">
        <template #pre-input-field>
          <!--          <template v-if="fieldName === 'url'">-->
          <!--            {{ fieldName }}-->
          <!--          </template>-->
          {{ 'bla' }}
        </template>
      </BaseFormGroups>
    </div>
  </div>
</template>

<script>
import BaseFormGroups from '@/components/BaseFormGroups/BaseFormGroups';

export default {
  name: 'App',
  components: {
    BaseFormGroups,
  },
  data() {
    return {
      valueList: {},
      fields: {
        contributors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              roles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: {
                      type: 'object',
                      properties: {
                        en: {
                          type: 'string',
                        },
                        de: {
                          type: 'string',
                        },
                        fr: {
                          type: 'string',
                        },
                      },
                      additionalProperties: false,
                    },
                    source: {
                      type: 'string',
                      'x-attrs': {
                        hidden: true,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
              label: {
                type: 'string',
              },
              source: {
                type: 'string',
                'x-attrs': {
                  hidden: true,
                },
              },
            },
            additionalProperties: false,
          },
          title: 'Beteiligung (chips-below)',
          'x-attrs': {
            field_type: 'chips-below',
            placeholder: 'Enter Beteiligung',
            source: '/autosuggest/v1/contributors/',
            source_role: '/autosuggest/v1/roles/',
            prefetch: [
              'source_role',
            ],
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 1,
            form_group_title: 'Form Group 1',
          },
        },
        url4: {
          type: 'string',
          title: 'URL',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 2,
            field_format: 'half',
            form_group: 1,
            form_group_title: 'This title will be ignored',
          },
        },
        actors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
              },
              source: {
                type: 'string',
                'x-attrs': {
                  hidden: true,
                },
              },
            },
            additionalProperties: false,
          },
          title: 'Actors (Multi-select)',
          'x-attrs': {
            field_type: 'chips',
            placeholder: 'Enter Actors',
            source: '/autosuggest/v1/contributors/',
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 3,
            field_format: 'half',
            form_group: 1,
          },
        },
        type: {
          type: 'object',
          additionalProperties: false,
          title: 'Type (Single-select)',
          'x-attrs': {
            field_type: 'chips',
            placeholder: 'Select Type',
            source: '/autosuggest/v1/contributors/',
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 2,
          },
          properties: {
            label: {
              type: 'string',
            },
            source: {
              type: 'string',
              'x-attrs': {
                hidden: true,
              },
            },
          },
        },
        published_in: {
          type: 'string',
          title: 'erschienen in',
          'x-attrs': {
            placeholder: 'Enter erschienen in',
            field_type: 'text',
            field_format: 'half',
            form_group: 2,
            form_group_title: 'Second Group',
            order: 2,
          },
        },
        url: {
          type: 'string',
          title: 'URL',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 3,
            field_format: 'half',
            form_group: 2,
          },
        },
        field: {
          type: 'string',
          title: 'A form group without form_group_title',
          'x-attrs': {
            placeholder: 'Enter String',
            order: 1,
            field_format: 'half',
            form_group: 3,
          },
        },
        display_in_showroom: {
          type: 'boolean',
          title: 'Display in Showroom',
          'x-attrs': {
            placeholder: 'Display in Showroom',
            order: 2,
            field_format: 'half',
            field_type: 'boolean',
            form_group: 3,
          },
        },
        date_location: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location_description: {
                type: 'string',
                title: 'Ortsbeschreibung',
                'x-attrs': {
                  placeholder: 'Enter Ortsbeschreibung',
                  field_type: 'text',
                  order: 3,
                },
              },
              date: {
                type: 'string',
                title: 'Datum',
                additionalProperties: false,
                pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
                'x-attrs': {
                  field_format: 'half',
                  field_type: 'date',
                  date_format: 'date_year',
                  placeholder: {
                    date: 'Datum eintragen',
                  },
                  order: 1,
                },
              },
              location: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    geometry: {
                      type: 'object',
                      properties: {
                        coordinates: {
                          type: 'array',
                          items: {
                            type: 'number',
                            format: 'float',
                          },
                        },
                        type: {
                          type: 'string',
                        },
                      },
                      additionalProperties: false,
                    },
                    region: {
                      type: 'string',
                    },
                    house_number: {
                      type: 'string',
                    },
                    street: {
                      type: 'string',
                    },
                    postcode: {
                      type: 'string',
                    },
                    locality: {
                      type: 'string',
                    },
                    country: {
                      type: 'string',
                    },
                    label: {
                      type: 'string',
                    },
                    source: {
                      type: 'string',
                    },
                  },
                  additionalProperties: false,
                },
                title: 'Ort',
                'x-attrs': {
                  field_format: 'half',
                  field_type: 'chips',
                  dynamic_autosuggest: true,
                  source: '/autosuggest/v1/places/',
                  placeholder: 'Enter Ort',
                  order: 2,
                },
              },
            },
            additionalProperties: false,
          },
          title: 'Datum und Ort',
          'x-attrs': {
            field_type: 'group',
            show_label: false,
            order: 3,
            form_group: 3,
          },
        },
        url2: {
          type: 'string',
          title: 'URL - fields without form group added last',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 7,
            field_format: 'half',
          },
        },
        isan: {
          type: 'array',
          items: {
            type: 'string',
          },
          title: 'ISAN (repeatable)',
          'x-attrs': {
            placeholder: 'Enter ISAN',
            field_format: 'half',
            order: 8,
          },
        },
        date: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date_from: {
                type: 'string',
              },
              date_to: {
                type: 'string',
              },
            },
          },
          title: 'Repeatable Date',
          'x-attrs': {
            placeholder: 'Enter Date',
            order: 9,
            field_type: 'date',
          },
        },
      },
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
          icon: '/portfolio/s/img/sheet-empty.svg',
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
  methods: {
    handleInput(newInput) {
      this.valueList = {
        ...this.valueList,
        ...newInput,
      };
    },
    toggleOptions(value) {
      this.entriesSelectable = value;
    },
    handleAction(action) {
      console.log('action', action);
      console.log('selected entries', this.selectedEntries);
    },
    // calcEntriesPerPage() {
    //   const { entrySelector } = this.$refs;
    //   let bodyHeight = entrySelector.$refs.body.clientHeight;
    //   // if pagination element is not present yet (on initial render) deduct height and spacing
    //   // from sidebar height
    //   if (!entrySelector.$refs.pagination) {
    //     bodyHeight = bodyHeight - 48 - 16;
    //   }
    //   // hardcoded because unfortunately no other possibility found
    //   const entryHeight = this.isMobile ? 48 : 57;
    //   const numberOfEntries = Math.floor(bodyHeight / entryHeight) - 1;
    //
    //   return numberOfEntries > 4 ? numberOfEntries : 4;
    // },
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
