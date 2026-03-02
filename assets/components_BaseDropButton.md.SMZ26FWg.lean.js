import{_ as a,a as o,b as r,o as n,aM as i,I as l}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseDropButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropButton.md","filePath":"components/BaseDropButton.md","lastUpdated":1679928144000}'),s={name:"components/BaseDropButton.md"};function d(c,t,b,p,u,h){const e=o("vue-live");return n(),r("div",null,[t[0]||(t[0]=i("",12)),l(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="flex">
    <BaseDropButton
      :buttons="buttons1"
      expand-button-label="Show more actions"
      primary-button="delete"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons2"
      :primary-button="primary2"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons3"
      :primary-button="primary3"
      label-property-name="text"
      identifier-property-name="value"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons4"
      :primary-button="primary4"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons5"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :primary-button="primary6"
      :buttons="[primary6]"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons7"
      :primary-button="primary7"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseButton
      text="Switch primary button 7"
      icon="sort"
      expand-button-label="Show more actions"
      @clicked="primary7 = primary7 === 'delete' ? 'print' : 'delete'"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttons1: [
        {
          label: "Delete 1",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary2: {
        label: "Delete 2",
        action: "delete",
        icon: "waste-bin",
      },
      buttons2: [
        {
          label: "Delete",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary3: {
        text: "Delete 3",
        value: "delete",
        icon: "waste-bin",
      },
      buttons3: [
        {
          text: "Delete",
          value: "delete",
          icon: "waste-bin",
        },
        {
          text: "Print",
          value: "print",
          icon: "print",
        },
        {
          text: "Archive",
          value: "archive",
          icon: "archive-sheets",
        },
      ],
      buttons4: [
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary4: {
        label: "Delete 4",
        action: "delete",
        icon: "waste-bin",
      },
      buttons5: [
        {
          label: "Delete 5",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary6: {
        label: "Delete 6",
        action: "delete",
        icon: "waste-bin",
      },
      primary7: "delete",
      buttons7: [
        {
          label: "Delete 7",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print 7",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive 7",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
    };
  },
  methods: {
    alert(action) {
      alert(\`Button with action \${action} was clicked!\`);
    },
  },
};
<\/script>

<style>
.flex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const f=a(s,[["render",d]]);export{y as __pageData,f as default};
