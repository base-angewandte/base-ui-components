import{bQ as t,aZ as n,aL as e,u as p,G as i,I as h}from"./chunks/framework.CLfPTWt2.js";const y=JSON.parse('{"title":"BaseNotification","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseNotification.md","filePath":"components/BaseNotification.md","lastUpdated":null}'),l={name:"components/BaseNotification.md"};function k(o,s,r,E,d,g){const a=n("vue-live");return e(),p("div",null,[s[0]||(s[0]=i("",10)),h(a,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseNotification :has-header="false" group="custom-group" />
    <BaseButton text="Trigger Notification" @clicked="triggerNotification" />
  </div>
</template>
<script>
export default {
  methods: {
    triggerNotification() {
      this.$notify({
        group: "custom-group",
        title: "Something went wrong!!",
        text: "This is how your error notification will look like.",
        type: "error",
        duration: 1000,
      });
    },
  },
};
<\/script>
`,requires:{}}),s[1]||(s[1]=i("",5))])}const u=t(l,[["render",k]]);export{y as __pageData,u as default};
