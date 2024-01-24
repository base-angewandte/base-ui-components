## Demo

A simple example

```vue live
<template>
  <div class="background">
    <BaseInfoPanel
      :buttons-config="[{
      id: 'return',
      label: 'Return',
      icon: 'home',
    },
    {
      id: 'return2',
      label: 'Return',
      icon: 'home',
    }]"
      :render-panel-header-as="'h1'"
      icon-name="attention"
      panel-header-text="Error found"
      :text="[
      'Site was not found',
    ]" />
  </div>
</template>

<style scoped>
  .background {
    padding: 16px;
    background: rgb(240, 240, 240);
  }
</style>
```

Advanced Example using more config and slots

```vue live
<template>
  <div class="background">
    <BaseExpandBox
      :max-collapsed-height="200">
      <BaseInfoPanel
        align-icon="top"
        panel-style="medium"
        class="expand-panel">
        <template #header>
          <h4>Curriculum Information</h4>
        </template>
        <template #icon>
          <BaseIcon
            name="information"
            class="info-icon" />
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
              <p>The exam consists of lectures evaluated positively and all partial exams passed in from of the exam senate.</p>
            </div>
          </div>
        </template>
        <template #bottom>
          <BaseButton
            text="Download Curriculum"
            icon="download"
            icon-position="right" />
        </template>
      </BaseInfoPanel>
    </BaseExpandBox>
  </div>
</template>

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
  }

  .panel-body {
    .paragraph {
      margin-bottom: 16px;
    }
  }
</style>
```
