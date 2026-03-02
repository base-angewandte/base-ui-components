import{_ as o,a,b as n,o as r,aM as s,I as d,i}from"./chunks/framework.CJiAeuRk.js";const x=JSON.parse('{"title":"BaseInfoPanel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseInfoPanel.md","filePath":"components/BaseInfoPanel.md","lastUpdated":null}'),l={name:"components/BaseInfoPanel.md"};function c(p,e,h,b,u,m){const t=a("vue-live");return r(),n("div",null,[e[0]||(e[0]=s("",10)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseInfoPanel
      :buttons-config="[
        {
          id: 'return',
          label: 'Return',
          icon: 'home',
        },
      ]"
      :render-panel-header-as="'h1'"
      icon-name="attention"
      panel-header-text="Error found"
      :text="['Site was not found']"
      @action="alert"
    />
  </div>
</template>

<script>
export default {
  methods: {
    alert(action) {
      window.alert(\`action with id "\${action}" triggered!\`);
    },
  },
};
<\/script>

<style scoped>
.background {
  padding: 16px;
  background: rgb(240, 240, 240);
}
</style>
`,requires:{}}),e[1]||(e[1]=i("p",null,"Expandable example using more config and slots",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseInfoPanel
      align-icon="top"
      panel-style="medium"
      :expandable="true"
      :expand-box-config="{
        showMoreText: 'Expand',
        showLessText: 'Collapse',
      }"
      class="expand-panel"
    >
      <template #header>
        <h3>Curriculum Information</h3>
      </template>
      <template #icon>
        <BaseIcon name="information" class="info-icon" />
      </template>
      <template #text>
        <div class="panel-body">
          <p class="paragraph">Study duration: 8 Semesters</p>
          <div class="paragraph">
            <p>First Study Part: 2 Semesters</p>
            <p>Final: 1. Diploma Exam</p>
          </div>
          <div class="paragraph">
            <p>Second Study Part: 6 Semesters</p>
            <p>Final: 2. Diploma Exam</p>
            <p>
              The exam consists of lectures evaluated positively and all partial
              exams passed in from of the exam senate.
            </p>
          </div>
        </div>
      </template>
      <template #bottom>
        <BaseButton
          text="Download Curriculum"
          icon="download"
          icon-position="right"
          @clicked="alert"
        />
      </template>
    </BaseInfoPanel>
  </div>
</template>

<script>
export default {
  methods: {
    alert() {
      window.alert(\`custom button was clicked!\`);
    },
  },
};
<\/script>

<style lang="scss" scoped>
.background {
  padding: 16px;
  background: rgb(240, 240, 240);
}
.expand-panel {
  padding: 0;
}
.info-icon {
  height: 32px;
  width: 32px;
  color: red;

  @media screen and (max-width: 639px) {
    height: 24px;
    width: 24px;
  }
}

.panel-body {
  .paragraph {
    margin-bottom: 16px;
  }
}
</style>
`,requires:{}})])}const g=o(l,[["render",c]]);export{x as __pageData,g as default};
