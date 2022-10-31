A simple progress bar

```vue
<template>
  <div>
    <BaseProgressBar
      :progress="progress" />
    <div class="spacer"></div>
    <BaseButton
      text="Change Upload State"
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
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
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
      :progress="100"
      :show-remove="false"
      status="success"
      file-name="myFileToUploadSucceeded.txt"
      file-size="22kB" />
    <div
      class="spacer" />
    <BaseProgressBar
      :progress="0"
      :show-remove="false"
      status="fail"
      error-message="Unfortunately an error has occurred."
      file-name="myFileToUploadFailed.txt"
      file-size="22kB" />
    <div
      v-if="showSecondBar"
      class="spacer" />
    <BaseProgressBar
      v-if="showSecondBar"
      :progress="progress"
      :show-remove="progress === 0"
      file-name="myFileToUploadWithAReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongFileName.txt"
      file-size="22kB"
      @remove-item="showSecondBar = false" />
    <div
      class="spacer" />
    <BaseButton
      v-if="showSecondBar"
      text="Change Upload State"
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
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
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
