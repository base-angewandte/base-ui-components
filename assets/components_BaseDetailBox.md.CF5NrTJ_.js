import{_ as l,a as o,b as d,o as r,aL as n,I as a,i}from"./chunks/framework.wIfPYfir.js";const g=JSON.parse('{"title":"BaseDetailBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDetailBox.md","filePath":"components/BaseDetailBox.md","lastUpdated":1679928144000}'),s={name:"components/BaseDetailBox.md"};function p(c,e,u,m,b,x){const t=o("vue-live");return r(),d("div",null,[e[0]||(e[0]=n('<h1 id="basedetailbox" tabindex="-1">BaseDetailBox <a class="header-anchor" href="#basedetailbox" aria-label="Permalink to &quot;BaseDetailBox&quot;">​</a></h1><blockquote><p>conveniently display key value pairs in a list</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>data</td><td>an array with objects to pass the data to be displayed, expecting an object with<br><code>label</code> and <code>value</code> properties - if different please use <code>valuePropertyName</code><br>and <code>labelPropertyName</code> respectively!</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>valuePropertyName</td><td>customize the value property displayed</td><td>string</td><td>-</td><td>&#39;value&#39;</td></tr><tr><td>labelPropertyName</td><td>customize the label property displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>language</td><td>specify a language (ISO 639-1) (used for label if label is language specific object<br>e.g. <code>{ de: &#39;xxx&#39;, en: &#39;yyy&#39; }</code>)</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>An Element to render data in datalist tags</p>',7)),a(t,{layoutProps:{lang:"vue"},code:`<template>
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
