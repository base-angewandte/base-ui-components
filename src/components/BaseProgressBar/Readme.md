A simple progress bar

```vue
<template>
  <div>
    <BaseProgressBar
      :progress="progress" />
    <div class="spacer"></div>
    <BaseButton
      text="changeProgress"
      @clicked="changeProgress" />
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      progress: 0,
    };
  },
  methods: {
    changeProgress() {
      if (this.progress <= 0.75) {
        this.progress += 0.25;
      } else {
        this.progress = 0;
      }
    },
  }

};
</script>
<style lang="scss" scoped>
  .spacer {
    height: 20px;
  }
</style>
```

A file upload bar

```vue
<template>
  <div>
    <BaseProgressBar
      :progress="1"
      :show-remove="false"
      status="success"
      file-name="myFileToUploadSucceeded.txt"
      file-size="22kB" />
    <div
      class="spacer" />
    <BaseProgressBar
      :progress="1"
      :show-remove="false"
      status="fail"
      file-name="myFileToUploadFailed.txt"
      file-size="22kB" />
    <div
      v-if="showSecondBar"
      class="spacer" />
    <BaseProgressBar
      v-if="showSecondBar"
      :progress="progress"
      :show-remove="true"
      file-name="myFileToUploadWithAReallyReallyReallyReallyReallyReallyReallyLongFileName.txt"
      file-size="22kB"
      @remove-item="showSecondBar = false" />
    <div
      class="spacer" />
    <BaseButton
      v-if="showSecondBar"
      text="change Progress"
      @clicked="changeProgress" />
    <BaseButton
      v-if="!showSecondBar"
      text="Reappear second bar"
      @clicked="showSecondBar = true" />
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      progress: 0,
      showSecondBar: true,
    };
  },
  methods: {
    changeProgress() {
      if (this.progress <= 0.75) {
        this.progress += 0.25;
      } else {
        this.progress = 0;
      }
    },
  }

};
</script>
<style lang="scss" scoped>
  .spacer {
    height: 20px;
  }
</style>
```
