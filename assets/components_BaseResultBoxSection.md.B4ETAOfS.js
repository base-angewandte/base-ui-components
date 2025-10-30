import{_ as d,a as s,b as i,o as a,aL as r,I as o,i as n}from"./chunks/framework.wIfPYfir.js";const x=JSON.parse('{"title":"BaseResultBoxSection","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseResultBoxSection.md","filePath":"components/BaseResultBoxSection.md","lastUpdated":1679928144000}'),l={name:"components/BaseResultBoxSection.md"};function c(b,e,p,u,m,g){const t=s("vue-live");return a(),i("div",null,[e[0]||(e[0]=r('<h1 id="baseresultboxsection" tabindex="-1">BaseResultBoxSection <a class="header-anchor" href="#baseresultboxsection" aria-label="Permalink to &quot;BaseResultBoxSection&quot;">​</a></h1><blockquote><p>A component to display rows of boxes with or without pagination</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>actual entries list - if slot <code>result-box</code> is not used to use custom elements this<br>object array should have the following properties to be displayed<br>in a <a href="./BaseImageBox">BaseImageBox</a>:<br><br> <strong>id</strong> <code>string</code> - a unique identifier<br> <strong>title</strong> <code>?string</code> - the title of the box<br> <strong>subtext</strong> <code>?string</code> - a subtitle<br> <strong>description</strong> <code>?string</code> - text displayed at the bottom of the box<br> <strong>imageUrl</strong> <code>?string</code> - url to display an image<br> <strong>text</strong> <code>?string[]</code> - an array with strings that will be<br> displayed if no image is provided<br><br> if a different schema is used please use the slot &#39;result-box&#39; to create your own<br> elements - only id and title should still be provided but can also<br> be customized via <code>identifierPropertyName</code> and <code>titlePropertyName</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>showHeader</td><td>if <code>false</code> the header row (title and options) will not be available<br> <strong>Caveat</strong>: for draggable functionality this needs to be true</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>headerText</td><td>title of section<br>it is recommended to also set the <code>headerText</code> even if slot <code>header</code> is used for header<br>for accessibility reasons</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showOptions</td><td>define if options should be shown</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>optionsButtonText</td><td>set text for the options button if <code>showOptions</code> is <code>true</code><br> this needs to be an object with <code>show</code> (displayed when options are hidden)<br> and <code>hide</code> (displayed when options are visible) attributes</td><td>object</td><td>-</td><td>{<br> show: &#39;edit&#39;,<br> hide: &#39;editReturn&#39;<br>}</td></tr><tr><td>optionsButtonIcon</td><td>set the icon for the options button.<br>if <code>showOptions</code> is <code>true</code> this needs to be an object with <code>show</code><br> (displayed when options are hidden) and <code>hide</code> (displayed when<br> options are visible) attributes</td><td>object</td><td>-</td><td>{<br> show: &#39;edit&#39;,<br> hide: &#39;remove&#39;<br>}</td></tr><tr><td>boxBreakpoints</td><td>specify how many boxes should be displayed in a row in an array<br>with &quot;tupples&quot; (array with min-size and number of boxes).<br>depending on the size of the container (not screen width - unless<br><code>calcBoxNumberRelativeToWindow</code> is set to <code>true</code>)<br>like the following:<br> <code>[[0, [number of boxes]], [[min px size for this number of boxes], [number of boxes]], ...]</code></td><td>array</td><td>-</td><td>[[0, 2], [640, 4], [1024, 6]]</td></tr><tr><td>isLoading</td><td>set component loader active</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>editMode</td><td>flag if component should be in edit mode (dragging, deleting,<br>other custom options visible)<br> the v-model directive may be used on this prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>editModeWhiteBackground</td><td>set this variable <code>true</code> if <code>background-color</code> should be white in edit mode</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>selectedList</td><td>provide a list of selected entries for select options (can<br>be entry objects or entry ids).<br> the v-model directive may be used on this prop</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>selectOptionsText</td><td>set a text for &#39;[x] entries selected&#39; and &#39;select all / none&#39;</td><td>object</td><td>-</td><td>{<br> selectAll: &#39;select all&#39;,<br> selectNone: &#39;select none&#39;,<br> entriesSelected: &#39;entries selected&#39;<br>}</td></tr><tr><td>messageText</td><td>if slot <code>options-message-area</code> is not used this variable<br>can be used to customize message text.<br> this should be a string or an object with the actions needed (default: <code>delete</code>,<br> if <code>draggable</code> is <code>true</code> than also a <code>drag</code> property with suiting text is needed).<br> in case of a string the same text is used for all actions</td><td>string</td><td>-</td><td>&#39;Drag or Select&#39;</td></tr><tr><td>messageSubtext</td><td>if slot <code>options-message-area</code> is not used this variable<br>can be used to customize message subtext.<br> this should be a string or an object with the actions needed (default: <code>delete</code>,<br> if <code>draggable</code> is <code>true</code> than also a <code>drag</code> property with suiting text is needed).<br> in case of a string the same text is used for all actions</td><td>string</td><td>-</td><td>&#39;Drag&#39;n Drop to reorder or select the relevant items and choose an action&#39;</td></tr><tr><td>draggable</td><td>determine if boxes can be dragged<br> (only applicable if <code>showHeader</code> and <code>showOptions</code> is set to <code>true</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>usePagination</td><td>set <code>true</code> if pagination should be used</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>maxRows</td><td>if <code>usePagination</code> is set <code>true</code> this will determine the number of<br>rows shown on one page<br> (only applicable if <code>usePagination</code> is set <code>true</code>)</td><td>number</td><td>-</td><td>5</td></tr><tr><td>useExpandMode</td><td>set this <code>true</code> if only a limited number of boxes should be shown<br>and rest can be displayed by clicking a &quot;show more&quot; button</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>expanded</td><td>if <code>useExpandMode</code> is <code>true</code> set the state of &#39;show more&#39; from outside<br> the v-model directive may be used on this prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>expandText</td><td>Provide text that should be shown within the button with the<br>expand / collapse functionality.<br> should be an object with props <code>expand</code> for text to expand<br> and <code>collapse</code> for text to collapse</td><td>object</td><td>-</td><td>{<br> expand: &#39;more objects&#39;,<br> collapse: &#39;collapse&#39;<br>}</td></tr><tr><td>total</td><td>add a number of total elements (needed for <code>useExpandMode</code> and<br><code>usePagination</code>)</td><td>number</td><td>-</td><td>null</td></tr><tr><td>currentPageNumber</td><td>set the current page number from outside if <code>usePagination</code> is <code>true</code>.<br> the v-model directive may be used on this prop</td><td>number</td><td>-</td><td>1</td></tr><tr><td>maxShowMoreRows</td><td>how many rows should be shown with show more button (expandMode)<br> (only applicable with <code>useExpandMode true</code>)</td><td>number</td><td>-</td><td>1</td></tr><tr><td>jumpToTop</td><td>define if the section should scroll to top on page change<br> (only applicable with <code>usePagination true</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showActionButtonBoxes</td><td>define if the big button box at the end of all attached items should be shown</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>actionButtonsConfig</td><td>set some config for each action used - needs to be an array of objects with the<br> following properties:<br><br> <strong>text</strong> <code>string</code> - the text displayed in the button<br> <strong>icon</strong> <code>string</code> - the icon name to display<br> (for available icons see <a href="./BaseIcon">BaseIcon</a> )<br> <strong>value</strong> <code>string</code> - the value emitted on button click<br> <strong>[display=&#39;all&#39;]</strong> <code>?string</code> - define where the action should be displayed:<br> <em>top</em>: only in top row<br> <em>bottom</em>: only in action button box at bottom of list<br> <em>all</em>: on top as well as bottom<br> <strong>disabled</strong> <code>?boolean</code> - disable button</td><td>array</td><td>-</td><td>[{<br> text: &#39;delete&#39;,<br> icon: &#39;waste-bin&#39;,<br> value: &#39;delete&#39;,<br> display: &#39;all&#39;,<br> disabled: false,<br>}]</td></tr><tr><td>identifierPropertyName</td><td>define a custom identifier property name for objects in your<br><code>modelValue</code> array.<br> if relevant property is contained in a nested object the string can<br> be in dot notation. e.g. <code>nestedObject.id</code></td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>titlePropertyName</td><td>define a custom title property name for objects in your<br><code>modelValue</code> array.<br> if relevant property is contained in a nested object the string can<br> be in dot notation. e.g. <code>nestedObject.title</code></td><td>string</td><td>-</td><td>&#39;title&#39;</td></tr><tr><td>usePaginationLinkElement</td><td>specify if pagination elements should be a link element - if pagination element should<br>be a link element - please specify the kind of element either as a string (e.g. <code>&#39;RouterLink&#39;</code><br>or pass the component directly (currently only Vue components (e.g.<br><a href="https://router.vuejs.org/guide/#router-link" target="_blank" rel="noreferrer"><code>RouterLink</code></a>,<br><a href="https://nuxtjs.org/docs/features/nuxt-components/#the-nuxtlink-component" target="_blank" rel="noreferrer"><code>NuxtLink</code></a>) are supported)<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|boolean|object</td><td>-</td><td>false</td></tr><tr><td>fetchDataExternally</td><td>set this variable <code>true</code> if pagination is used and data fetching is done per page</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>scrollToOffset</td><td>specify an additional number of px for the position the page<br>should jump to on page change</td><td>number</td><td>-</td><td>0</td></tr><tr><td>initialItemsPerRow</td><td>specify an initial number of items per row that should be assumed before<br>rendering the page</td><td>number</td><td>-</td><td>6</td></tr><tr><td>assistiveText</td><td>add text for screen reader users that helps them navigate list and use edit mode<br>functionalities.<br>object should have the following properties:<br><br> <strong>description</strong>: Text read on edit mode activation<br> <strong>activated</strong>: Text read after item was activated for reordering<br> (selected by enter key)<br> property moved can contain variable <code>{pos}</code> which will be filled with current<br> position<br> <strong>moved</strong>: Text read after item was moved<br> property moved can contain variables <code>{pos}</code> (new position) and <code>{total}</code> (total number<br> of list items)</td><td>object</td><td>-</td><td>{<br> description: &#39;Select items via space bar to carry out actions or use enter &#39;<br> + &#39;key to select an item for reordering. Use Tab key to navigate between items.&#39;,<br><br> activated: &#39;Item at position {pos} selected for reordering. Use arrow keys to order item.&#39;,<br> moved: &#39;Item moved to position {pos} of {total}&#39;,<br> loaderActive: &#39;loading.&#39;<br>}</td></tr><tr><td>paginationAssistiveText</td><td>this prop gives the option to add assistive text for the pagination:<br><br> <strong>currentPage</strong>: aria-label for the current page<br> <strong>nextPage</strong>: aria-label for the next page<br> <strong>pagination</strong>: aria-label for the pagination element description<br> <strong>previousPage</strong>: aria-label for the previous page<br> <strong>toPage</strong>: aria-label for all page buttons except the current one<br><br>The values of this object might be plain text or a key for an i18n file</td><td>object</td><td>-</td><td>{<br> currentPage: &#39;Current Page, Page&#39;,<br> nextPage: &#39;Go to next page&#39;,<br> pagination: &#39;Pagination&#39;,<br> previousPage: &#39;Go to previous page&#39;,<br> toPage: &#39;Go to page&#39;<br>}</td></tr><tr><td>disableListElementFocus</td><td><code>BaseResultBoxSection</code> is for example used to display search results - which contain a link<br>to the entry - in this case the focus should be on the link element so that navigation to<br>route link triggers on enter and focus on the list element itself is disabled (if not edit<br>mode!)</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>entry-clicked</td><td><strong>entryId</strong> <code>string</code> - the id of the clicked entry</td><td>event emitted from default image box when clicked</td></tr><tr><td>items-per-row-changed</td><td></td><td></td></tr><tr><td>submit-action</td><td><strong>undefined</strong> <code>string</code> - the action type</td><td>event triggered when an action is triggered (after selecting boxes)</td></tr><tr><td>update:edit-mode</td><td><strong>undefined</strong> <code>Boolean</code> - flag for edit mode active</td><td>emitted on edit mode toggle (options toggle).<br> the v-model directive may be used on the corresponding prop</td></tr><tr><td>update:expanded</td><td><strong>undefined</strong> <code>Boolean</code> - true if list is expanded</td><td>event emitted on expand toggle.<br> the v-model directive may be used on the corresponding prop</td></tr><tr><td>update:current-page-number</td><td><strong>undefined</strong> <code>number</code> - the new page number</td><td>emitted when pagination is used and page number was changed</td></tr><tr><td>update:selected-list</td><td><strong>undefined</strong> <code>Array</code> - the list of selected entry ids</td><td>inform the parent of the changes in <code>selectedList</code> and provide<br>the ids of all selected.<br> the v-model directive may be used on the corresponding prop</td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object[]</code> - the updated list of entries</td><td>event emitted when the list of entries changed internally<br>(relevant if <code>draggable</code> is set <code>true</code>)</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>header</td><td>add a custom header instead of headerText</td><td></td></tr><tr><td>optionButtons</td><td>add custom option/action elements in the header row</td><td><strong>submit-action</strong> <code>Function</code> - the method that should be called after the action button was clicked</td></tr><tr><td>optionsMessageAreaAfter</td><td>add a custom element after the message area</td><td></td></tr><tr><td>result-box</td><td>for custom result boxes</td><td><strong>item</strong> <code>Object</code> - one list item of boxes to be displayed<br><strong>index</strong> <code>number</code> - the index of the item<br><strong>select-active</strong> <code>boolean</code> - are items in select mode<br><strong>is-entry-selected</strong> <code>boolean</code> - is the particular item currently selected<br><strong>entry-selected</strong> <code>Function</code> - method that should be called when an entry was selected</td></tr><tr><td>actionButtons</td><td>add custom elements after result elements list use scoped slot prop <code>itemsPerRow</code> or dynamically adjusted css variable <code>--items-per-row</code> to adjust element width in accordance with other boxes</td><td><strong>items-per-row</strong> <code>number</code> - items per row calculated from container or page width<br><strong>element-id</strong> <code>string</code> - add a class <code>base-result-box-section__box-item-${elementId}</code> to action button element to include it in box size and styling calculations</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Test you component configuration on this example component! (Some settings only have an effect in edit mode or view mode respectively)</p>',11)),o(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="section-canvas">
    <div class="options-section">
      <BaseToggle
        v-model="isLoading"
        name="toggle is loading"
        label="isLoading"
        class="options-toggle"
      />
      <BaseToggle
        v-model="showHeader"
        name="toggle show header"
        label="showHeader"
        class="options-toggle"
      />
      <BaseToggle
        v-model="showOptions"
        name="toggle show options"
        label="showOptions"
        class="options-toggle"
      />
      <BaseToggle
        v-model="editMode"
        name="set edit mode from outside"
        label="editMode"
        class="options-toggle"
      />
      <BaseToggle
        v-model="showActionButtonBoxes"
        name="show bottom action button boxes"
        label="showActionButtonBoxes"
        class="options-toggle"
      />
      <BaseToggle
        v-model="jumpToTop"
        name="jump to top on page change"
        label="jumpToTop"
        class="options-toggle"
      />
      <BaseToggle
        v-model="draggable"
        name="items draggable in edit mode"
        label="draggable"
        class="options-toggle"
      />
      <BaseToggle
        v-model="useExpandMode"
        name="use expand mode"
        label="useExpandMode"
        class="options-toggle"
      />
      <BaseToggle
        v-model="usePagination"
        name="use pagination"
        label="usePagination"
        class="options-toggle"
      />
    </div>
    <div class="options-section">
      <BaseInput
        v-model="maxShowMoreRows"
        :disabled="!useExpandMode"
        label="maxShowMoreRows"
        input-type="number"
        placeholder="choose a number of rows to be shown in expand mode"
        class="options-input"
      />
      <BaseInput
        v-model="maxRows"
        :disabled="!usePagination"
        label="maxRows"
        input-type="number"
        placeholder="choose a number of rows to be shown with pagination"
        class="options-input"
      />
      <BaseInput
        v-model="numberOfBoxes"
        label="visible boxes (max 24)"
        input-type="number"
        placeholder="specify a number of visible boxes, max. 24"
        class="options-input"
      />
    </div>
    <BaseResultBoxSection
      v-model="visibleBoxes"
      v-model:selected-list="selectedBoxes"
      v-model:edit-mode="editMode"
      :is-loading="isLoading"
      :show-header="showHeader"
      :showOptions="showOptions"
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
      :selectOptionsText="{
        selectAll: 'Custom select all',
        selectNone: 'Custom select none',
        entriesSelected: {
          string:
            !selectedBoxes.length || selectedBoxes.length > 1
              ? 'entries selected'
              : 'entry selected',
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
      @entry-selected="entrySelected"
    />
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
          id: "pCSLggvdsi8vvvb3lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "An extra extra long title",
          subtext: "A subtext",
          description: "Collaboration",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8vvvb3lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllzR4gfTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 2",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllzR4gfTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3123lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 1",
          subtext: "A subtext",
          description: "Article",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3123lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3l323llzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 2",
          subtext: "A subtext",
          description: "Scientific Paper",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3l323llzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllzRTfgsdfgggggLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 3",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllzRTfgsdfgggggLM4dJR/460/341",
        },
        {
          id: "pCSLggvds3222i8b3lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 4",
          subtext: "Difference is the key",
          description: "Performance & Art",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvds3222i8b3lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllz444RTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 5",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllz444RTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllz777RTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 6",
          subtext: "A subtext",
          description: "Workshop",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllz777RTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b0003lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 7",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b0003lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllz789RTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 8",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllz789RTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsirtz8b3lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 9",
          subtext: "A subtext",
          description: "Mission",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsirtz8b3lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3l456llzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 10",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3l456llzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllzRT456LM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 11",
          subtext: "A subtext",
          description: "Conference",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllzRT456LM4dJR/460/341",
        },
        {
          id: "pCSLgg234vdsi8b3lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 12",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLgg234vdsi8b3lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3lllzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 13",
          subtext: "A subtext",
          description: "Exhibition",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3lllzRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3zRdddTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 14",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8b3zRdddTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8bbbb3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 15",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8bbbb3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8oiouiob3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 16",
          subtext: "A subtext",
          description: "Exhibition",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8oiouiob3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggasdfvdsi8b3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 17",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggasdfvdsi8b3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8asdb3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 18",
          subtext: "A subtext",
          description: "Master Work",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8asdb3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8ffsdb3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 19",
          subtext: "A subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsi8ffsdb3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Title 29",
          subtext: "A different long subtext",
          description: "Performance",
          source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
          imageUrl: "https://picsum.photos/seed/pCSLggvdsi8b3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsiasdf8b3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "Unknown",
          subtext: "Lets find it out and look deeper",
          description: "Bachelor",
          imageUrl:
            "https://picsum.photos/seed/pCSLggvdsiasdf8b3zRTLM4dJR/460/341",
        },
        {
          id: "pCSLggvdsi8b3fffzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          title: "TBD",
          subtext: "Misterious",
          text: ["Random text 1", "Random text 2"],
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
        const nonVisibleBoxes = this.entriesList.slice(
          this.numberOfBoxes - 1,
          this.entriesList.length - 1
        );
        this.entriesList = [...val, ...nonVisibleBoxes];
      },
    },
  },
  methods: {
    entrySelected({ entryId, selected }) {
      if (selected && !this.selectedBoxes.includes(entryId)) {
        this.selectedBoxes.push(entryId);
      } else if (!selected) {
        this.selectedBoxes = this.selectedBoxes.filter(
          (boxId) => boxId !== entryId
        );
      }
    },
    selectEntries(selectAll) {
      if (selectAll) {
        this.selectedBoxes = this.entriesList.map((entry) => entry.id);
      } else {
        this.selectedBoxes = [];
      }
    },
  },
};
<\/script>

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
`,requires:{}}),e[1]||(e[1]=n("p",null,"An example demonstrating slots",-1)),o(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="section-canvas">
    <BaseResultBoxSection
      v-model:selected-list="selectedBoxes"
      :model-value="entriesList"
      :is-loading="false"
      show-action-button-boxes
      title-property-name="parent.title"
      message-text="This is the custom message Text"
      message-subtext="This is the custom message Subtext"
      @submit-action="submitAction"
    >
      <template #header>
        <div class="custom-header">
          <h2 class="header-text">This is a custom header</h2>
          <BaseDropDown
            :showLabel="false"
            v-model="selected"
            :options="[
              { label: 'A-Z', value: 'alphabetical_down' },
              { label: 'Z-A', value: 'alphabetical_up' },
              { label: 'Type', value: 'type' },
              { label: 'Newest First', value: 'date_created_down' },
              { label: 'Oldest First', value: 'date_created_up' },
            ]"
            header-style="single"
            label="Sort"
            placeholder="Sort"
          />
        </div>
      </template>
      <template #optionButtons>
        <BaseButton
          text="Custom Option 1"
          icon-size="large"
          icon="licence"
          button-style="single"
          class="custom-button"
          @clicked="submitAction('license')"
        />
        <BaseButton
          text="Custom Option 2"
          icon-size="large"
          icon="eye"
          button-style="single"
          class="custom-button"
          @clicked="submit('publish')"
        />
      </template>
      <template #resultBox="props">
        <BaseImageBox
          :key="props.item.id"
          :selectable="props.selectActive"
          :selected="
            selectedBoxes
              .map((entry) => entry.id || entry)
              .includes(props.item.id)
          "
          :title="props.item.parent.title"
          :subtext="props.item.parent.subtext"
          :description="props.item.parent.type.label.en"
          :image-url="props.item.parent.image"
          lazyload
          show-title
          class="custom-button"
          @select-triggered="props.entrySelected"
          @clicked="entryClicked(props.item.parent.id)"
        />
      </template>
      <template #optionsMessageAreaAfter>
        <div class="after-slot">
          This is the options-message-area-after slot
        </div>
      </template>
      <template #actionButtons="{ itemsPerRow, elementId }">
        <BaseBoxButton
          key="custom-action-button"
          text="custom button text"
          :box-size="{
            width:
              'calc(((100% - (var(--items-per-row) * 8rem/19))/ var(--items-per-row)) - 0.01rem)',
            height: '100%',
          }"
          icon="eye"
          box-style="small"
          render-element-as="button"
          :class="[
            'custom-button',
            { 'action-box-spacer': itemsPerRow < entriesList.length },
            \`base-result-box-section__box-item-\${elementId}\`,
          ]"
          @clicked="submitAction('customValue')"
        />
        <BaseBoxButton
          key="custom-action-button-2"
          text="custom button text 2"
          :box-size="{
            width:
              'calc(((100% - (var(--items-per-row) * 8rem/19))/ var(--items-per-row)) - 0.01rem)',
            height: '100%',
          }"
          icon="eye"
          box-style="small"
          render-element-as="button"
          :class="[
            'custom-button',
            { 'action-box-spacer': itemsPerRow < entriesList.length },
            \`base-result-box-section__box-item-\${elementId}\`,
          ]"
          @clicked="submitAction('customValue')"
        />
      </template>
    </BaseResultBoxSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
      activeAction: "",
      entriesList: [
        {
          uid: "pCSLggvdsi8b3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          parent: {
            id: "8MuVSYmDy5wdRAvxpqrKsV",
            title: "Custom Box 1",
            subtext: "More text",
            type: {
              label: {
                de: "Album",
                en: "album",
              },
              source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
            },
            image: "https://picsum.photos/seed/pCSLggvdsi8b3zRTLM4dJR/460/341",
          },
        },
        {
          uid: "pCSLggvdsi8b3zRThhhhLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          parent: {
            id: "8MuVSYmDy5wdRAvxpqrKsV",
            title: "Custom Box 1",
            subtext: "More text",
            type: {
              label: {
                de: "Album",
                en: "album",
              },
              source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
            },
            image:
              "https://picsum.photos/seed/pCSLggvdsi8b3zRThhhhLM4dJR/460/341",
          },
        },
        {
          uid: "pCSLggvdsi8ffffb3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          parent: {
            id: "8MuVSYmDy5wdRAvxpqrKsV",
            title: "Custom Box 1",
            subtext: "More text",
            type: {
              label: {
                de: "Album",
                en: "album",
              },
              source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
            },
            image:
              "https://picsum.photos/seed/pCSLggvdsi8ffffb3zRTLM4dJR/460/341",
          },
        },
        {
          uid: "pCSLggvdsiasdf8b3zRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          parent: {
            id: "8MuVSYmDy5wdRAddddvxpqrKsV",
            title: "Custom Box 2",
            type: {
              label: {
                de: "Album",
                en: "book",
              },
              source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
            },
            image:
              "https://picsum.photos/seed/pCSLggvdsiasdf8b3zRTLM4dJR/460/341",
          },
        },
        {
          uid: "pCSLggvdsi8b3fffzRTLM4dJR",
          date_created: "2020-04-27T11:01:37.246606Z",
          parent: {
            id: "8MuVSYmDy5wdhhhhRAvxpqrKsV",
            title: "Custom Box 3",
            subtext: "More subtext",
            type: {
              label: {
                de: "Album",
                en: "record",
              },
              source: "http://base.uni-ak.ac.at/portfolio/taxonomy/album",
            },
            image:
              "https://picsum.photos/seed/pCSLggvdsi8b3fffzRTLM4dJR/460/341",
          },
        },
      ],
      selectedBoxes: [],
    };
  },
  methods: {
    submitAction(action) {
      alert(\`\${action} would be executed now\`);
    },
    entryClicked(id) {
      alert(\`entry with id \${id} was clicked!\`);
    },
    calcBoxWidth(itemNumber) {
      return \`calc(((100% - (var(--items-per-row) * 8rem/19))
              / var(--items-per-row)) - 0.01rem)\`;
    },
  },
};
<\/script>

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
`,requires:{}})])}const f=d(l,[["render",c]]);export{x as __pageData,f as default};
