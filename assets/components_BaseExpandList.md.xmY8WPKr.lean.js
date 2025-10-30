import{_ as a,a as d,b as i,o as s,aL as o,I as r}from"./chunks/framework.wIfPYfir.js";const v=JSON.parse('{"title":"BaseExpandList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseExpandList.md","filePath":"components/BaseExpandList.md","lastUpdated":1679928144000}'),n={name:"components/BaseExpandList.md"};function l(u,t,c,b,p,h){const e=d("vue-live");return s(),i("div",null,[t[0]||(t[0]=o("",15)),r(e,{layoutProps:{lang:"vue"},code:`<template>
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
