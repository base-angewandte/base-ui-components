import{_ as d,a as i,b as n,o as s,aL as l,I as r,i as t,x as a}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseTextList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseTextList.md","filePath":"components/BaseTextList.md","lastUpdated":1679928144000}'),c={name:"components/BaseTextList.md"};function p(u,e,b,m,h,g){const o=i("vue-live");return s(),n("div",null,[e[0]||(e[0]=l("",10)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :cols="2"
      :data="data"
      :identifier-property-name="'source'"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        // items wrapped in an array are rendered as columns.
        // the number of columns is defined with the prop \`cols\`.
        [
          {
            label: "Data is string",
            data: "no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          },
          {
            label: "Data is array of strings",
            data: [
              "Lorem ipsum dolor sit amet",
              "Consetetur sadipscing elitr, sed diam nonumy",
              "Eirmod tempor invidunt",
            ],
          },
          {
            label: "data is an object",
            data: {
              label: "Labore",
              value: "Dolore magna aliquyam erat",
              url: "mailto:base@uni-ak.ac.at",
            },
          },
          {
            label: "data is an object without a label",
            data: {
              value: "Dolore magna aliquyam erat",
              url: "mailto:base@uni-ak.ac.at",
            },
          },
          {
            label: "data is array of objects",
            data: [
              {
                label: "www",
                value: "http://base.uni-ak.ac.at",
                url: "http://base.uni-ak.ac.at",
              },
              {
                label: "email",
                value: "base@uni-ak.ac.at",
                url: "mailto:base@uni-ak.ac.at",
              },
              {
                label: "internal",
                value: "internal link",
                source: "/some-path",
              },
              {
                label: "Labore",
                value: "Dolore magna aliquyam erat",
              },
            ],
          },
          {
            label: "data is array of objects with different link types",
            data: [
              {
                value: "additional info in a tooltip",
                additional: [
                  {
                    label: "www",
                    value: "base",
                    url: "https://base.uni-ak.ac.at",
                  },
                  {
                    label: "label",
                    value: "some value",
                  },
                ],
              },
              {
                value: "external link",
                url: "https://base.uni-ak.ac.at",
              },
              {
                value: "internal link",
                source: "/some-path",
              },
            ],
          },
          {
            label: "data is array of objects rendered as chips",
            id: "keywords",
            path: "/components/BaseTextList.html",
            data: [
              {
                value: "dolore magna",
                source: "keyword-1",
              },
              {
                value: "aliquyam erat",
                source: "keyword-2",
              },
            ],
          },
        ],
        // single column
        {
          label: "Data is string",
          data: "Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.",
        },
      ],
    };
  },
};
<\/script>

<style lang="scss">
/* set z-index equal or lower than styleguides top navigation */
>>> .base-tooltip-box {
  z-index: 10 !important;
}
</style>
`,requires:{}}),e[1]||(e[1]=t("br",null,null,-1)),e[2]||(e[2]=a(" Example of a single data object rendered in two columns, where the data property is typeof ",-1)),e[3]||(e[3]=t("code",null,"string",-1)),e[4]||(e[4]=a(". ",-1)),e[5]||(e[5]=t("p",null,[a("Note: The number of columns can be defined with the "),t("code",null,"colsSingleTextContent"),a(" prop.")],-1)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :data="data"
      :cols-single-text-object="2"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "Vero eos et accusam",
          data: \`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\`,
        },
      ],
    };
  },
};
<\/script>
`,requires:{}}),e[6]||(e[6]=t("br",null,null,-1)),e[7]||(e[7]=a(" Example of a list of chips. ",-1)),e[8]||(e[8]=t("p",null,[a("Note: The properties "),t("code",null,"id"),a(" and "),t("code",null,"path"),a(" are specified once for all chips in that object and processed internally to prepare the structure for a single chip from "),t("a",{href:"./BaseLink"},"BaseLink"),a(".")],-1)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :data="data"
      :identifier-property-name="'id'"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "Vero eos et accusam",
          id: "keywords",
          path: "/components/BaseTextList.html",
          data: [
            {
              value: "dolore magna",
              id: "keyword-1",
            },
            {
              value: "aliquyam erat",
              id: "keyword-2",
            },
            {
              value: "Eos et accusam aliquyam erat.",
            },
          ],
        },
      ],
    };
  },
};
<\/script>

<style lang="scss">
/* set z-index equal or lower than styleguides top navigation */
>>> .base-tooltip-box {
  z-index: 10 !important;
}
</style>
`,requires:{}})])}const v=d(c,[["render",p]]);export{y as __pageData,v as default};
