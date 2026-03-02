import{_ as l,a as o,b as d,o as r,aM as n,I as a,i}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseDetailBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDetailBox.md","filePath":"components/BaseDetailBox.md","lastUpdated":1679928144000}'),s={name:"components/BaseDetailBox.md"};function p(c,e,u,m,b,x){const t=o("vue-live");return r(),d("div",null,[e[0]||(e[0]=n("",7)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <BaseDetailBox :data="data" />
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "Telefon",
          value: "01234455767",
        },
        {
          label: "Fax",
          value: "01234455767 123",
        },
        {
          label: "Mobile",
          value: "098012345678",
        },
        {
          label: "Email",
          value: "name@domain.com",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}}),e[1]||(e[1]=i("p",null,"Example with custom properties and language specific label",-1)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseDetailBox
      :data="data"
      :language="lang"
      label-property-name="name"
      value-property-name="text"
    />
    <div class="button-row">
      <BaseButton
        :active="lang === 'en'"
        text="English"
        class="language-button"
        @clicked="lang = 'en'"
      />
      <BaseButton
        :active="lang === 'de'"
        text="German"
        class="language-button"
        @clicked="lang = 'de'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "en",
      data: [
        {
          name: {
            de: "Telefon",
            en: "Telephone",
          },
          text: "01234455767",
        },
        {
          name: {
            de: "Fax",
            en: "Fax",
          },
          text: "01234455767 123",
        },
        {
          name: {
            de: "Mobil",
            en: "Mobile",
          },
          text: "098012345678",
        },
        {
          name: {
            de: "Email",
            en: "Email",
          },
          text: "name@domain.com",
        },
      ],
    };
  },
};
<\/script>

<style>
.button-row {
  display: flex;
  margin-top: 16px;
}
.language-button {
  margin-right: 16px;
}
</style>
`,requires:{}})])}const y=l(s,[["render",p]]);export{g as __pageData,y as default};
