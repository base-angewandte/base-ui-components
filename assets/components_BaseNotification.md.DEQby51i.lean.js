import{_ as t,a as n,b as p,o as e,aL as i,I as h}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseNotification","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseNotification.md","filePath":"components/BaseNotification.md","lastUpdated":null}'),l={name:"components/BaseNotification.md"};function k(E,s,o,r,d,g){const a=n("vue-live");return e(),p("div",null,[s[0]||(s[0]=i("",10)),h(a,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseNotification :has-header="false" />
    <BaseButton text="Trigger Notification" @clicked="triggerNotification" />
  </div>
</template>
<script>
export default {
  methods: {
    triggerNotification() {
      this.$notify({
        group: "request-notifications",
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
