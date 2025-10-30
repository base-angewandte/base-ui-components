import{_ as s,a as r,b as o,o as d,aL as l,I as a,i}from"./chunks/framework.wIfPYfir.js";const B=JSON.parse('{"title":"BaseProgressBar","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseProgressBar.md","filePath":"components/BaseProgressBar.md","lastUpdated":1679928144000}'),n={name:"components/BaseProgressBar.md"};function p(c,e,h,g,m,u){const t=r("vue-live");return d(),o("div",null,[e[0]||(e[0]=l("",9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseProgressBar :progress="progress" />
    <div class="spacer"></div>
    <BaseButton text="Change Upload State" @clicked="changeProgress" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },
  methods: {
    changeProgress() {
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
    },
  },
};
<\/script>
<style lang="scss" scoped>
.spacer {
  height: 20px;
}
</style>
`,requires:{}}),e[1]||(e[1]=i("p",null,"A file upload bar",-1)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseProgressBar
      :progress="100"
      :show-remove="false"
      status="success"
      file-name="myFileToUploadSucceeded.txt"
      file-size="22kB"
    />
    <div class="spacer" />
    <BaseProgressBar
      :progress="0"
      :show-remove="false"
      status="fail"
      error-message="Unfortunately an error has occurred."
      file-name="myFileToUploadFailed.txt"
      file-size="22kB"
    />
    <div v-if="showSecondBar" class="spacer" />
    <BaseProgressBar
      v-if="showSecondBar"
      :progress="progress"
      :show-remove="progress === 0"
      file-name="myFileToUploadWithAReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongFileName.txt"
      file-size="22kB"
      @remove-item="showSecondBar = false"
    />
    <div class="spacer" />
    <BaseButton
      v-if="showSecondBar"
      text="Change Upload State"
      @clicked="changeProgress"
    />
    <BaseButton
      v-if="!showSecondBar"
      text="Reappear second bar"
      @clicked="showSecondBar = true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      showSecondBar: true,
    };
  },
  methods: {
    changeProgress() {
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
    },
  },
};
<\/script>
<style lang="scss" scoped>
.spacer {
  height: 20px;
}
</style>
`,requires:{}})])}const b=s(n,[["render",p]]);export{B as __pageData,b as default};
