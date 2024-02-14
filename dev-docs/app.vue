<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <BaseNavigation
      :style="{ marginBottom: 50 }"
      :render-as="renderAs"
      :primary-items="primaryItems"
      :secondary-items="secondaryItems"
      :active-element-id="'0'" />
  </div>
</template>

<script>
import BaseNavigation from '@/components/BaseNavigation/BaseNavigation';

export default {
  components: {
    BaseNavigation,
  },
  data() {
    return {
      primaryItems: [
        {
          id: '0',
          label: 'BaseNavigation',
          shortLabel: 'BNavigation',
          routeMatch: /\//,
          route: '/',
        },
        {
          id: '3',
          label: 'BaseLink 2(this is a vershould cause a switch to shortLabel)',
          shortLabel: 'BLink 2',
          routeMatch: '',
          route: '/',
        },
      ],
      secondaryItems: [
        {
          id: '1',
          label: 'BaseButton',
          shortLabel: 'BButton',
          routeMatch: '',
          route: '/',
        },
        {
          id: '2',
          label: 'BaseLink',
          shortLabel: 'BLink',
          routeMatch: '',
          route: '/',
        },
      ],
      renderAs: 'RouterLink',
      baseTextListData: [
        {
          label: 'data is array of objects, renders different base-link types',
          data: [
            {
              value: 'some value',
            },
            {
              value: 'Klassische Moderne',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'additional info in toolip',
              additional: [
                {
                  label: 'www',
                  value: 'base',
                  url: 'https://base.uni-ak.ac.at',
                },
                {
                  label: 'label',
                  value: 'some value',
                },
              ],
            },
            {
              value: 'external link',
              url: 'https://base.uni-ak.ac.at',
            },
            {
              value: 'internal link',
              source: 'some-id',
            },
            {
              value: 'Klassische Moderne',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Romantik',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Malerei',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Architektur',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Wohnbau',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Malerei',
              source: 'internal.link',
              type: 'activity',
            },
          ],
        },
      ],
      links: [
        {
          value: 'text',
        },
        {
          value: 'external link',
          url: 'https://base.uni-ak.ac.at',
        },
        {
          value: 'email link',
          url: 'mailto:email@uni-ak.ac.at',
        },
        {
          value: 'internal link',
          source: 'internal.link',
        },
        {
          value: 'tooltip',
          tooltip: [
            {
              label: 'label',
              value: 'value',
            },
            {
              label: 'label',
              value: 'external link',
              url: 'https://base.uni-ak.ac.at',
            },
          ],
        },
        {
          value: 'aync tooltip',
          additional: [
            {
              label: 'label',
              value: 'value',
            },
          ],
        },
        {
          value: 'internal link (chips)',
          source: 'internal.link',
          type: 'activity',
        },
      ],
      items: [
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          href: 'http://base.uni-ak.ac.at',
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/tech',
            },
            {
              '640w': 'https://placeimg.com/640/480/tech',
            },
            {
              '768w': 'https://placeimg.com/768/576/tech',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 3',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/nature',
            },
            {
              '640w': 'https://placeimg.com/640/480/nature',
            },
            {
              '768w': 'https://placeimg.com/768/576/nature',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 4',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/people',
            },
            {
              '640w': 'https://placeimg.com/640/480/people',
            },
            {
              '768w': 'https://placeimg.com/768/576/people',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/461/341/arch',
            },
            {
              '640w': 'https://placeimg.com/641/480/arch',
            },
            {
              '768w': 'https://placeimg.com/769/576/arch',
            },
          ],
        },
      ],
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
      marker: [
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'base Angewandte',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
      options: {
        style: 'normal',
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        tileMatrixSet: 'google3857',
        type: 'geolandbasemap',
      },
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
      editExpandList: false,
      baseExpandList: [
        {
          label: 'Monographien',
          hidden: false,
          data: [
            {
              label: 'Beiträge in Sammelband',
              data: [
                {
                  value: 'qui nesciunt officiis quisquam officiis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  source: 'asdfasdf',
                },
                {
                  value: 'animi voluptates',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  additional: [
                    {
                      label: 'label',
                      value: 'value',
                    },
                  ],
                },
                {
                  value: 'officiis quisquam',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
              ],
            },
            {
              label: 'Konferenzbeiträge',
              data: [
                {
                  value: 'qui reiciendis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
                {
                  value: 'quia quisquam',
                  attributes: [
                    'quae laudantium expedita',
                    'maxime omnis accusamus',
                  ],
                  url: '#',
                },
                {
                  value: 'qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  url: '#',
                },
              ],
            },
          ],
        },
        {
          label: 'Film/Video',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Audio',
          hidden: false,
          data: [
            {
              value: 'sed et',
              attributes: [
                'est quos sed',
                'sed molestiae veritatis',
              ],
              url: '#',
            },
            {
              value: 'quis quis',
              attributes: [
                'non possimus possimus',
                'nobis recusandae sed',
              ],
              url: '#',
            },
            {
              value: 'mollitia quo',
              attributes: [
                'non magnam eius',
                'harum exercitationem non',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Preise und Stipendien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Konferenzen & Symposien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
      ],
      toggleElements: 'toggle',
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
    },
    displayData: {
      set(val) {
        this.baseExpandList = val;
      },
      get() {
        return this.editExpandList ? this.baseExpandList
          : this.baseExpandList.filter(item => !item.hidden);
      },
    },
  },
  methods: {
    getNewEntries({ page }) {
      this.page = Number(page);
    },
    activateExpandList() {
      this.editExpandList = true;
    },
    cancelExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.reset();
    },
    saveExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.save();
    },
    saveExpandListEdit(val) {
      this.baseExpandList = val;
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

</style>
