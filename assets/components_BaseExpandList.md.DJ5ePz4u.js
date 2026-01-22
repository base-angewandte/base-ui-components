import{_ as a,a as d,b as i,o as s,aL as o,I as r}from"./chunks/framework.DNZP2baM.js";const v=JSON.parse('{"title":"BaseExpandList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseExpandList.md","filePath":"components/BaseExpandList.md","lastUpdated":1679928144000}'),n={name:"components/BaseExpandList.md"};function l(u,t,c,b,p,h){const e=d("vue-live");return s(),i("div",null,[t[0]||(t[0]=o('<h1 id="baseexpandlist" tabindex="-1">BaseExpandList <a class="header-anchor" href="#baseexpandlist" aria-label="Permalink to &quot;BaseExpandList&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>data</td><td>should be an object array with the following properties:<br> <strong>label</strong> <code>string</code> - the displayed label<br> <strong>id</strong> <code>string</code> - an identifier<br> <strong>data</strong> <code>Object[]</code> - an object array with the property:<br> * <strong>label</strong> <code>string</code> (renders component as<br> expandable row) or<br> * <strong>value</strong> <code>string</code> (renders component as entry row)<br><br>optional properties:<br> <strong>count</strong> <code>number</code> - used for the number shown in brackets<br> (else the array length will be used)<br> <strong>hidden</strong> <code>boolean</code> - used to set visibility and is set in edit mode to toggle item<br><br> the v-model directive might be used on this prop</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>edit</td><td>set edit mode from outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>minItems</td><td>specify number of minimal displayed items</td><td>number</td><td>-</td><td>3</td></tr><tr><td>multiple</td><td>expand multiple items</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showMoreText</td><td>button text to show more content</td><td>string</td><td>-</td><td>&#39;Show all&#39;</td></tr><tr><td>showLessText</td><td>button text to show less content</td><td>string</td><td>-</td><td>&#39;Show less&#39;</td></tr><tr><td>editHideText</td><td>button text to hide item</td><td>string</td><td>-</td><td>&#39;Hide&#39;</td></tr><tr><td>editShowText</td><td>button text to show item</td><td>string</td><td>-</td><td>&#39;Show&#39;</td></tr><tr><td>assistiveText</td><td>additional texts for screen-reader users to order items.<br> object that needs to have the following properties:<br> <strong>activate</strong>: Text read when item is focused, use variable {state} to<br> announce item visibility - specify text used in properties &#39;hidden&#39; and &#39;visible&#39;<br> <strong>activated</strong>: Text read after item was activated (selected by enter key)<br> <strong>description</strong>: Text read on initial list focus<br> <strong>moved</strong>: Text read after item was moved; can contain variables {pos} (for new position) and {total}<br> <strong>visible</strong>: string substituted to &#39;activate&#39; text for state variable if item is visible<br> <strong>hidden</strong>: string substituted to &#39;activate&#39; text for state variable if item is hidden</td><td>object</td><td>-</td><td>{<br> activate: &#39;Use the Enter key to select item. Item is currently {state}&#39;,<br> activated: &#39;Item selected. Use arrow keys to order item.&#39;,<br> description: &#39;Use Tab key to navigate to item an order item.&#39;,<br> moved: &#39;Item moved: {pos} of {total}&#39;,<br> visible: &#39;visible&#39;,<br> hidden: &#39;hidden&#39;<br>}</td></tr><tr><td>controlType</td><td>specify the type of visibility switch in edit mode<br> <strong>button</strong>: a <a href="./BaseButton">BaseButton</a> without text<br> <strong>toggle</strong>: a <a href="./BaseToggle">BaseToggle</a> element without text</td><td>string</td><td><code>button</code>, <code>toggle</code></td><td>&#39;button&#39;</td></tr><tr><td>expanded</td><td>define which items are expanded<br>v-model might be used on this property</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>disabled</td><td>option to disable the edit functionalities of the element (toggle and draggable)</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="reset" tabindex="-1">reset <a class="header-anchor" href="#reset" aria-label="Permalink to &quot;reset&quot;">​</a></h3><blockquote><p>reset list data - this always restores the state of the data on last save() triggered (=was triggered in parent)</p></blockquote><h3 id="save" tabindex="-1">save <a class="header-anchor" href="#save" aria-label="Permalink to &quot;save&quot;">​</a></h3><blockquote><p>save changed data</p></blockquote><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>saved</td><td><strong>undefined</strong> <code>object</code> - the data altered and ready for saving</td><td>triggered on button click</td></tr><tr><td>update:expanded</td><td><strong>undefined</strong> <code>Array</code> - array with indices of the expanded item per level; eg: [0, 1]: level1 first item, level2 second item is expanded</td><td>event triggered when expanded state changes</td></tr><tr><td>update:data</td><td><strong>undefined</strong> <code>Object[]</code> - the modified data (e.g. from sorting)</td><td>event emitted when data change internally (e.g. sorting, toggling hidden, etc.).<br> the v-model directive may be used on the corresponding prop</td></tr><tr><td>update:edit-mode-is-ready</td><td><strong>undefined</strong> <code>boolean</code> - the current loading state</td><td>triggered when async component is initialized</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>content</td><td>a slot to provide customized entry row</td><td><strong>data</strong> <code>Object</code> - an object in <code>data</code> array</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Component to render list data</p>',15)),r(e,{layoutProps:{lang:"vue"},code:`<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <div v-if="editControlEditMode">
      <BaseCheckmark
        v-model="toggleElements"
        label="Use button elements"
        :radio-value="'button'"
        :show-label="true"
        mark-style="radio"
      />
      <BaseCheckmark
        v-model="toggleElements"
        label="Use toggle elements"
        :radio-value="'toggle'"
        :show-label="true"
        mark-style="radio"
      />
    </div>

    <BaseEditControl
      title="Activities"
      :controls="true"
      :edit="editControlEditMode"
      :is-loading="expandListIsLoading"
      :subtitle="'(' + expandList.filter((item) => !item.hidden).length + ')'"
      @activated="activateExpandList"
      @canceled="cancelExpandList"
      @saved="saveExpandList"
    />

    <BaseExpandList
      ref="baseExpandList"
      v-model:data="displayData"
      :edit="expandListEditMode"
      :control-type="toggleElements"
      @update:edit-mode-is-ready="expandListIsReady($event)"
      @saved="saveExpandListEdit"
    >
      <template #content="{ data }">
        <BaseLink
          :url="data.url"
          :value="data.value"
          :identifier-property-value="data.source"
          :space-after="!!data.additional"
          :tooltip="data.additional"
          :type="data.type"
          class="link"
        />
        <template v-if="data.attributes">
          - {{ data.attributes.join(", ") }}</template
        >
      </template>
    </BaseExpandList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editControlEditMode: false,
      expandListIsLoading: false,
      expandListEditMode: false,
      expandList: [
        {
          label: "Monographien",
          hidden: false,
          data: [
            {
              label: "Beiträge in Sammelband",
              data: [
                {
                  value: "qui nesciunt officiis quisquam officiis",
                  attributes: [
                    "rerum corporis voluptatibus",
                    "beatae occaecati non",
                  ],
                  source: "BaseExpandList#demo",
                },
                {
                  value: "animi voluptates",
                  attributes: [
                    "rerum corporis voluptatibus",
                    "beatae occaecati non",
                  ],
                  additional: [
                    {
                      label: "label",
                      value: "value",
                    },
                  ],
                },
                {
                  value: "officiis quisquam",
                  attributes: [
                    "rerum corporis voluptatibus",
                    "beatae occaecati non",
                  ],
                  url: "https://base.uni-ak.ac.at",
                },
              ],
            },
            {
              label: "Konferenzbeiträge",
              data: [
                {
                  value: "qui reiciendis",
                  attributes: [
                    "rerum corporis voluptatibus",
                    "beatae occaecati non",
                  ],
                  url: "https://base.uni-ak.ac.at",
                },
                {
                  value: "quia quisquam",
                  attributes: [
                    "quae laudantium expedita",
                    "maxime omnis accusamus",
                  ],
                  url: "https://base.uni-ak.ac.at",
                },
                {
                  value: "qui nesciunt",
                  attributes: ["molestiae commodi ipsum", "eos dolorem in"],
                  url: "https://base.uni-ak.ac.at",
                },
              ],
            },
          ],
        },
        {
          label: "Film/Video",
          hidden: false,
          data: [
            {
              value: "qui nesciunt officiis quisquam officiis",
              attributes: [
                "rerum corporis voluptatibus",
                "beatae occaecati non",
              ],
              source: "BaseExpandList#demo",
            },
            {
              value: "molestiae error",
              attributes: ["nobis voluptatibus quae", "iusto et voluptate"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "cum ut",
              attributes: ["sed ut perferendis", "velit dicta voluptatem"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "totam tenetur",
              attributes: [
                "laudantium temporibus cupiditate",
                "ducimus quos quia",
              ],
              url: "https://base.uni-ak.ac.at",
            },
          ],
        },
        {
          label: "Audio",
          hidden: false,
          data: [
            {
              value: "sed et",
              attributes: ["est quos sed", "sed molestiae veritatis"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "quis quis",
              attributes: ["non possimus possimus", "nobis recusandae sed"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "mollitia quo",
              attributes: ["non magnam eius", "harum exercitationem non"],
              url: "https://base.uni-ak.ac.at",
            },
          ],
        },
        {
          label: "Preise und Stipendien",
          hidden: false,
          data: [
            {
              value: "qui fugit",
              attributes: ["consequatur consequatur ipsa", "et sunt delectus"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "molestiae error",
              attributes: ["nobis voluptatibus quae", "iusto et voluptate"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "cum ut",
              attributes: ["sed ut perferendis", "velit dicta voluptatem"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "totam tenetur",
              attributes: [
                "laudantium temporibus cupiditate",
                "ducimus quos quia",
              ],
              url: "https://base.uni-ak.ac.at",
            },
          ],
        },
        {
          label: "Konferenzen & Symposien",
          hidden: false,
          data: [
            {
              value: "qui fugit",
              attributes: ["consequatur consequatur ipsa", "et sunt delectus"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "molestiae error",
              attributes: ["nobis voluptatibus quae", "iusto et voluptate"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "cum ut",
              attributes: ["sed ut perferendis", "velit dicta voluptatem"],
              url: "https://base.uni-ak.ac.at",
            },
            {
              value: "totam tenetur",
              attributes: [
                "laudantium temporibus cupiditate",
                "ducimus quos quia",
              ],
              url: "https://base.uni-ak.ac.at",
            },
          ],
        },
      ],
      toggleElements: "toggle",
    };
  },
  computed: {
    displayData: {
      set(val) {
        this.expandList = val;
      },
      get() {
        return this.expandListEditMode
          ? this.expandList
          : this.expandList.filter((item) => !item.hidden);
      },
    },
  },
  methods: {
    activateExpandList() {
      this.expandListEditMode = true;
    },
    cancelExpandList() {
      this.expandListEditMode = false;
      this.editControlEditMode = false;
      this.$refs.baseExpandList.reset();
    },
    saveExpandList() {
      this.expandListEditMode = false;
      this.editControlEditMode = false;
      this.$refs.baseExpandList.save();
    },
    saveExpandListEdit(val) {
      this.expandList = val;
    },
    expandListIsReady(val) {
      if (val) {
        // set BaseEditControl component to edit mode
        this.editControlEditMode = true;
        // disable BaseEditControl component loader
        this.expandListIsLoading = false;
        return;
      }
      // enable BaseEditControl component loader
      this.expandListIsLoading = true;
    },
  },
};
<\/script>

<style lang="scss">
.link {
  margin-right: 5px;
}
</style>
`,requires:{}})])}const g=a(n,[["render",l]]);export{v as __pageData,g as default};
