import{_ as o,a as s,b as r,o as n,aL as d,I as a}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BaseEntrySelector","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseEntrySelector.md","filePath":"components/BaseEntrySelector.md","lastUpdated":1679928144000}'),i={name:"components/BaseEntrySelector.md"};function l(c,e,u,h,b,p){const t=s("vue-live");return n(),r("div",null,[e[0]||(e[0]=d('<h1 id="baseentryselector" tabindex="-1">BaseEntrySelector <a class="header-anchor" href="#baseentryselector" aria-label="Permalink to &quot;BaseEntrySelector&quot;">​</a></h1><blockquote><p>Component to select elements from a list, including search, options and pagination elements.</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>entries</td><td>list of entries to display. Unless the slot <code>entries</code> is used this should be an object with<br>properties compatible with <a href="./BaseMenuList">BaseMenuList</a> <code>list</code> object array</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>entriesTotal</td><td>provide the total number of entries for pagination calculations</td><td>number</td><td>-</td><td>null</td></tr><tr><td>entriesPerPage</td><td>number of entries per page (this does not steer the number of entries displayed.<br>(the correct number needs to be provided by <code>entries</code>) but is solely<br>needed for correct pagination calculations)</td><td>number</td><td>-</td><td>10</td></tr><tr><td>entriesSelectable</td><td>define if entries are selectable - thus if checkboxes are available</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>maxSelectedEntries</td><td>specify a maximum number of entries that can be selected.<br>specify <code>0</code> if there should be no limit</td><td>number</td><td>-</td><td>0</td></tr><tr><td>height</td><td>specify a custom height - mainly useful if component is within a pop-up.<br>Use a valid CSS height property value.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>isLoading</td><td>flag to set if loader should be shown (for fetch requests)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>activeEntry</td><td>specify the index of an entry to be marked active (color border on left side).</td><td>number</td><td>-</td><td>-1</td></tr><tr><td>language</td><td>specify a language (ISO 639-1) (used for label if label is language specific object<br>e.g. <code>{ de: &#39;xxx&#39;, en: &#39;yyy&#39; }</code>)</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>optionsHidden</td><td>hide options completely (necessary if only before or after slot elements should remain)<br>if the complete options row should be hidden set <code>showOptionsRow</code> to <code>false</code> instead!</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>entryTypes</td><td>define options to filter entries<br>structure e.g.: <code>[{ label: { de: &quot;Alle Typen&quot;, en: &quot;All Types&quot; }, source: &quot;&quot; }]</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>entryTypesConfig</td><td>specify config options for your sorting drop down element (if <code>sortOptions</code> are<br>provided).<br>Needs to be an object with the following properties:<br> <strong>label</strong> <code>string</code> - specify a label for the sort options drop down (purely for accessibility purposes)<br> <strong>default</strong> <code>?Object</code> - specify a default option that the dropdown is initialized with.<br> this needs to have the same object structure as the objects in <code>entryTypes</code>.<br> if no default is provided the first option in the list will be selected.<br> <strong>valuePropertyName</strong> <code>string</code> - specify the name of the property that contains a unique value</td><td>object</td><td>-</td><td>{<br> label: &#39;filter by type&#39;,<br> default: null,<br> valuePropertyName: &#39;value&#39;<br>}</td></tr><tr><td>sortOptions</td><td>define options for sorting entries.<br>structure e.g: <code>[{ label: &#39;By Type&#39;, value: &#39;type_en&#39; }]</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>sortConfig</td><td>specify config options for your sorting drop down element (if <code>sortOptions</code> are<br>provided).<br>Needs to be an object with the following properties:<br> <strong>label</strong> <code>string</code> - specify a label for the sort options drop down (purely for accessibility purposes)<br> <strong>default</strong> <code>?Object</code> - specify a default option that the dropdown is initialized with.<br> this needs to have the same object structure as the objects in <code>entryTypes</code>.<br> if no default is provided the first option in the list will be selected.<br> <strong>valuePropertyName</strong> <code>string</code> - specify the name of the property that contains a unique value</td><td>object</td><td>-</td><td>{<br> label: &#39;sort entries&#39;,<br> default: null,<br> valuePropertyName: &#39;value&#39;<br>}</td></tr><tr><td>entrySelectorText</td><td>specify informational texts for the component (especially helpful to provide language<br>specific text) - this needs to be an object with the following<br>properties (if you don&#39;t want to display any text leave an empty string):<br><br> <strong>noEntriesTitle</strong>: Header text shown if search for string returned no results.<br> <strong>noEntriesSubtext</strong>: subtext shown if search for string returned no result.<br> <strong>options</strong>: Text for title button.<br> This needs to be an object containing a <code>show</code> and <code>hide</code> property that are shown when<br> <code>entriesSelectable</code> is <code>true</code> or <code>false</code> respectively.<br> <strong>search</strong>: placeholder in search input field.<br> <strong>selectAll</strong>: Text for &#39;Select All&#39; button.<br> <strong>selectNone</strong>: Text for &#39;Select None&#39; button.<br> <strong>entriesSelected</strong>: Text for number of entries (x) selected. information displayed as<br> <code>x {provided text}</code>.<br><br> The values of this object might be plain string or a key for an i18n file (in case it is not<br> an object that is required! - in that case the above applies to the values within that<br> object)</td><td>object</td><td>-</td><td>{<br> noEntriesTitle: &#39;No matching entries found&#39;,<br> noEntriesSubtext: &#39;Please adjust your search criteria.&#39;,<br><br> options: {<br> show: &#39;options&#39;,<br> hide: &#39;options&#39;,<br> },<br><br> search: &#39;Search&#39;,<br> selectAll: &#39;Select All&#39;,<br> selectNone: &#39;Select None&#39;,<br> entriesSelected: &#39;entries selected&#39;,<br> maxEntriesReached: &#39;Maximum Number Exceeded!&#39;<br>}</td></tr><tr><td>useSearch</td><td>define if search field should be shown.<br>this will have no effect if <code>head</code> slot is used.</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>showOptionsRow</td><td>this will remove the complete row between search and entries list.<br>This means also the slots <code>options</code> and <code>afterOptions</code> are not available anymore!<br>(if only the options menu should be hidden use <code>optionsHidden</code> instead)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>useDraggable</td><td>make the single menu list items draggable</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers.<br>properties:<br><strong>loaderActive</strong>: text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>resultsFound</strong>: provide text that should be announced when the search has<br> yielded results. Adding the string &#39;{number}&#39; will announce the total number<br> of results found<br><strong>noResultsFound</strong>: provide text that should be announced when no search results<br> were round</td><td>object</td><td>-</td><td>{<br> resultsFound: &#39;{number} Results found.&#39;,<br> noResultsFound: &#39;No results found.&#39;,<br> loaderActive: &#39;Loading.&#39;,<br> clearInput: &#39;Clear input&#39;<br>}</td></tr><tr><td>paginationAssistiveText</td><td>this prop gives the option to add assistive text for the pagination:<br><br> <strong>currentPage</strong>: aria-label for the current page<br> <strong>nextPage</strong>: aria-label for the next page<br> <strong>pagination</strong>: aria-label for the pagination element description<br> <strong>previousPage</strong>: aria-label for the previous page<br> <strong>toPage</strong>: aria-label for all page buttons except the current one<br><br>The values of this object might be plain text or a key for an i18n file</td><td>object</td><td>-</td><td>{<br> currentPage: &#39;Current Page, Page&#39;,<br> nextPage: &#39;Go to next page&#39;,<br> pagination: &#39;Pagination&#39;,<br> previousPage: &#39;Go to previous page&#39;,<br> toPage: &#39;Go to page&#39;<br>}</td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="selectentry" tabindex="-1">selectEntry <a class="header-anchor" href="#selectentry" aria-label="Permalink to &quot;selectEntry&quot;">​</a></h3><blockquote><p>function to trigger from slot <code>entries</code> when an entry was selected</p></blockquote><h4 id="params" tabindex="-1">Params <a class="header-anchor" href="#params" aria-label="Permalink to &quot;Params&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Param name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>obj</td><td>Object</td><td>selected entry</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>entry-clicked</td><td><strong>undefined</strong> <code>string</code> - the id of the clicked entry</td><td>Triggered when the entry is clicked</td></tr><tr><td>fetch-entries</td><td><strong>page</strong> <code>string</code> - current pagination page<br><strong>query</strong> <code>string</code> - the search string<br><strong>sort</strong> <code>object</code> - the sort filter<br><strong>type</strong> <code>object</code> - the type filter</td><td>Event emitted to fetch entries</td></tr><tr><td>selected-changed</td><td><strong>undefined</strong> <code>Object[]</code> - array of updated selected entries</td><td>event emitted every time the selected entries change</td></tr><tr><td>update:entries-selectable</td><td><strong>undefined</strong> <code>boolean</code> - are entries selectable</td><td>emit event to inform parent about toggle triggered and keep prop variable<br><code>entriesSelectable</code> in sync</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>head</td><td>per default this element contains the search element of the component. Use this slot to replace it with your own elements</td><td></td></tr><tr><td>after-options</td><td>to add custom elements at the end of the options row, e.g. custom drop downs</td><td></td></tr><tr><td>option-actions</td><td>add custom action (buttons)</td><td></td></tr><tr><td>entries</td><td>the component <a href="./BaseMenuList">BaseMenuList</a> is used per default to display the list of entries - if something different is required use this slot.</td><td><strong>entries</strong> <code>Object[]</code> - list of entries to display<br><strong>select-entry</strong> <code>Function</code> - function to trigger when entry was selected - takes two arguments: @property <strong>index</strong> <code>number</code>: the index of the element in the entries list. <strong>selected</strong> <code>boolean</code>: if element was selected or deselected</td></tr><tr><td>text-content</td><td>use this slot to individualize the displayed text per selector entry.</td><td><strong>item</strong> <code>Object</code> - the data of one single selector entry provided with <code>entries</code></td></tr><tr><td>entry-right-side-elements</td><td>use this slot to add elements to the right side of an entry. This slot content will be rendered in place of thumbnails and select checkbox so it will effectively disable the display of selection elements and if select mode is desired, custom elements should be provided</td><td><strong>is-selected</strong> <code>boolean</code> - was item selected<br><strong>select-active</strong> <code>boolean</code> - is select mode of entry selector active<br><strong>item</strong> <code>Object</code> - the complete entry provided by list</td></tr><tr><td>thumbnails</td><td>add custom elements at the end of the item row (see also <a href="./BaseMenuList">BaseMenuList</a>). this slot can only be be used if the <code>entries</code> slot is not used</td><td><strong>item</strong> <code>Object</code> - the data of one entry provided by <code>entries</code> prop</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',15)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="body">
    <div class="controls">
      <BaseToggle v-model="selectMode" label="Select Mode" class="control" />
      <BaseToggle v-model="showOptions" label="Show Options" class="control" />
      <BaseToggle
        v-model="showSort"
        label="Show Sorting Drop Down"
        class="control"
      />
      <BaseToggle
        v-model="showTypesFilter"
        label="Show Types Filter"
        class="control"
      />
      <BaseToggle v-model="isLoading" label="Is Loading" class="control" />
      <BaseToggle
        v-model="useCustomText"
        label="Use Custom Texts"
        class="control"
        @update:model-value="
          selectMode = true;
          noResults = true;
        "
      />
      <BaseToggle
        v-model="noResults"
        label="No search Results"
        class="control"
      />
      <BaseToggle
        v-model="showPagination"
        label="Show Pagination"
        class="control"
      />
      <BaseToggle
        v-model="useSearch"
        :disabled="useHeadSlot"
        label="Use Search"
        class="control"
      />
      <BaseToggle
        v-model="showOptionsRow"
        :disabled="useHeadSlot"
        label="Show Options Row"
        class="control"
      />
    </div>
    <div class="controls">
      <BaseToggle
        v-model="useHeadSlot"
        label="Use 'head' Slot"
        class="control"
      />
      <BaseToggle
        v-model="useActionsSlot"
        :disabled="!showOptionsRow"
        label="Use 'option-actions' Slot"
        class="control"
        @update:model-value="selectMode = true"
      />
      <BaseToggle
        v-model="useAfterOptionsSlot"
        :disabled="!showOptionsRow"
        label="Use 'after-options' Slot"
        class="control"
      />
      <BaseToggle
        v-model="useEntriesSlot"
        label="Use 'entries' Slot"
        class="control"
        @update:model-value="
          useThumbnailsSlot = false;
          useEntryTextContentSlot = false;
          useEntryRightSideSlot = false;
        "
      />
      <BaseToggle
        v-model="useEntryTextContentSlot"
        :disabled="useEntriesSlot"
        label="Use 'entry-text-content' Slot"
        class="control"
      />
      <BaseToggle
        v-model="useEntryRightSideSlot"
        :disabled="useEntriesSlot"
        label="Use 'entry-right-side-elements' Slot"
        class="control"
        @update:model-value="useThumbnailsSlot = false"
      />
      <BaseToggle
        v-model="useThumbnailsSlot"
        :disabled="useEntriesSlot || useEntryRightSideSlot"
        label="Use 'thumbnails' Slot"
        class="control"
      />
    </div>
    <BaseEntrySelector
      v-model:entries-selectable="selectMode"
      :entries="baseEntrySelectorEntries"
      :entries-total="entries.length"
      :entries-per-page="entriesPerPage"
      :active-entry="
        baseEntrySelectorEntries.map((entry) => entry.id).indexOf(activeEntry)
      "
      :options-hidden="!showOptions"
      :sort-options="showSort ? sortOptions : []"
      :use-search="useSearch"
      :show-options-row="showOptionsRow"
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
      class="entrySelector"
      @selected-changed="selectedEntries = $event"
      @fetch-entries="getNewEntries"
      @entry-clicked="activeEntry = $event"
    >
      <template #head>
        <template v-if="useHeadSlot">
          <div class="custom-slot">Put your custom head slot elements here</div>
        </template>
      </template>
      <template #option-actions>
        <template v-if="useActionsSlot">
          <div class="custom-slot">
            <BaseButton text="Publish" icon="eye" />
          </div>
        </template>
      </template>
      <template #after-options>
        <template v-if="useAfterOptionsSlot">
          <div class="custom-slot">Custom after-options element</div>
        </template>
      </template>
      <template #entry-text-content="{ item }" v-if="useEntryTextContentSlot">
        {{ "create your custom content here" + item.title }}
      </template>
      <template #entry-right-side-elements v-if="useEntryRightSideSlot">
        <div class="custom-right-side">
          <BaseButton
            button-style="row"
            icon="edit"
            text="Edit"
            class="custom-buttons"
          />
          <BaseButton
            button-style="row"
            icon="remove"
            text="Remove"
            class="custom-buttons"
          />
        </div>
      </template>
      <template #thumbnails="{ item }">
        <template v-if="useThumbnailsSlot">
          <BaseIcon
            v-if="item.has_media"
            :style="{ width: '14px' }"
            name="eye"
          />
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
              @clicked="
                selectEntry({
                  index: 0,
                  selected: true,
                })
              "
            />
            <div>
              <b>Selected Entries:</b>
              {{ selectedEntries.map((entry) => entry.id) }}
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
          id: "9WMh6vEFRZv83g5CSNxWX",
          icon: "file-object",
          has_media: true,
          description: "An advanced project",
          title: "Portfolio & Showroom",
        },
        {
          id: "b9TWZjUg268vrFAKwD3c3X",
          icon: "file-object",
          has_media: true,
          title: "Album of Airbrushes",
          description: "More to come",
        },
        {
          id: "9WMh6vEFRZ5e83g5CSNxWX",
          icon: "file-object",
          has_media: true,
          title: "More Entries",
          description: "And it continues",
        },
        {
          id: "9WMh6vEFRZ5e83g5CSNxWg",
          icon: "file-object",
          has_media: true,
          title: "My List",
          description: "Nowhere",
        },
        {
          id: "9WMh6sfgsr465e83g5CSNxWX",
          icon: "calendar-many",
          has_media: true,
          title: "The Road",
          description: "Oh so long",
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
      showOptionsRow: true,
      sortOptions: [
        {
          label: "By Type",
          value: "type_en",
        },
        {
          label: "A - Z",
          value: "title",
        },
      ],
      entryTypes: [
        {
          label: {
            de: "Alle Typen",
            en: "All Types",
          },
          source: "",
        },
        {
          label: {
            de: "Album",
            en: "Album",
          },
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
        },
      ],
      useHeadSlot: false,
      useEntriesSlot: false,
      useThumbnailsSlot: true,
      useActionsSlot: false,
      useAfterOptionsSlot: false,
      useEntryTextContentSlot: false,
      useEntryRightSideSlot: false,
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
            noEntriesTitle: "Custom No Match Title",
            noEntriesSubtext: "Custom No Match Subtext.",
            options: {
              show: "Custom Options",
              hide: "Custom Exit",
            },
            search: "Custom Search Text",
            selectAll: "Custom Select All",
            selectNone: "Custom Select None",
            entriesSelected: "Custom Items Selected",
            maxEntriesReached: "Custom Max Number of items selected",
          },
        };
      }
      return {};
    },
    entriesPerPage() {
      return this.showPagination ? 2 : 5;
    },
  },
  methods: {
    getNewEntries({ page }) {
      this.page = Number(page);
    },
  },
};
<\/script>

<style scoped>
.body {
  padding: 16px;
  background: rgb(240, 240, 240);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 16px;
}

.control {
  margin: 8px;
}

.custom-slot {
  border: 1px solid red;
  padding: 16px;
  text-align: center;
}

.custom-buttons {
  border-left: 2px solid rgb(240, 240, 240);
}

.entrySelector >>> .custom-right-side {
  display: flex;
  flex-direction: row;
}
</style>
`,requires:{}})])}const f=o(i,[["render",l]]);export{m as __pageData,f as default};
