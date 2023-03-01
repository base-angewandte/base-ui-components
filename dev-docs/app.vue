<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <div class="controls">
      <BaseToggle
        v-model="selectMode"
        label="Select Mode"
        class="control" />
      <BaseToggle
        v-model="showOptions"
        label="Show Options"
        class="control" />
      <BaseToggle
        v-model="showSort"
        label="Show Sorting Drop Down"
        class="control" />
      <BaseToggle
        v-model="showTypesFilter"
        label="Show Types Filter"
        class="control" />
      <BaseToggle
        v-model="isLoading"
        label="Is Loading"
        class="control" />
      <BaseToggle
        v-model="useCustomText"
        label="Use Custom Texts"
        class="control"
        @clicked="selectMode = true; noResults = true" />
      <BaseToggle
        v-model="noResults"
        label="No search Results"
        class="control" />
      <BaseToggle
        v-model="showPagination"
        label="Show Pagination"
        class="control" />
    </div>
    <div class="controls">
      <BaseToggle
        v-model="useHeadSlot"
        label="Use 'head' Slot"
        class="control" />
      <BaseToggle
        v-model="useActionsSlot"
        label="Use 'option-actions' Slot"
        class="control"
        @clicked="selectMode = true" />
      <BaseToggle
        v-model="useAfterOptionsSlot"
        label="Use 'after-options' Slot"
        class="control" />
      <BaseToggle
        v-model="useEntriesSlot"
        label="Use 'entries' Slot"
        class="control"
        @clicked="useThumbnailsSlot = false" />
      <BaseToggle
        v-model="useThumbnailsSlot"
        :disabled="useEntriesSlot"
        label="Use 'thumbnails' Slot"
        class="control" />
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
            name="eye" />
        </template>
      </template>
      <template #entries="{ selectEntry }">
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
              })" />
            <div>
              <b>Selected Entries:</b>
              {{ selectedEntries.map(entry => entry.id) }}
            </div>
          </div>
        </template>
      </template>
    </BaseEntrySelector>

    <div v-if="editExpandList">
      <BaseCheckmark
        v-model="toggleElements"
        :radio-value="'button'"
        :show-label="true"
        label="Use button elements"
        mark-style="radio" />
      <BaseCheckmark
        v-model="toggleElements"
        :radio-value="'toggle'"
        :show-label="true"
        label="Use toggle elements"
        mark-style="radio" />
    </div>
    <BaseEditControl
      title="Activities"
      :controls="true"
      :subtitle="'(' + baseExpandList.filter(item => !item.hidden).length + ')'"
      :edit="editExpandList"
      @activated="activateExpandList"
      @canceled="cancelExpandList"
      @saved="saveExpandList" />

    <BaseExpandList
      ref="baseExpandList"
      :data.sync="displayData"
      :edit="editExpandList"
      :control-type="toggleElements"
      @saved="saveExpandListEdit">
      <template
        #content="props">
        <BaseLink
          :url="props.data.url"
          :value="props.data.value"
          :source="props.data.source"
          :space-after="!!props.data.additional"
          :tooltip="props.data.additional"
          :type="props.data.type" />
        <template v-if="props.data.attributes">
          - {{ props.data.attributes.join(', ') }}
        </template>
      </template>
    </BaseExpandList>
  </div>
</template>

<script>
import BaseCheckmark from '@/components/BaseCheckmark/BaseCheckmark';
import BaseExpandList from '@/components/BaseExpandList/BaseExpandList';
import BaseLink from '@/components/BaseLink/BaseLink';
import BaseEditControl from '@/components/BaseEditControl/BaseEditControl';

import BaseToggle from '@/components/BaseToggle/BaseToggle';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseEntrySelector from '@/components/BaseEntrySelector/BaseEntrySelector';

export default {
  components: {
    BaseCheckmark,
    BaseEditControl,
    BaseExpandList,
    BaseLink,
    BaseButton,
    BaseIcon,
    BaseToggle,
    BaseEntrySelector,
  },
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
