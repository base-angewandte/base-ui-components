## Demo

A box with event firing on drop

```vue live
<template>
  <div>
    <div class="box-container">
        <BaseDropBox
          :icon="'calendar-many'"
          text="Drop a file here"
          subtext="Add more info"
          class="drop-box"
          @dropped-file="handleFileSelect($event)"
        />

        <BaseDropBox
          :icon="'file-object'"
          :show-plus="true"
          text="Box with Plus"
          subtext="Add more info"
          class="drop-box"
        />
        <BaseDropBox
          :icon="'file-object'"
          :box-size="{ width: 'calc(50%)' }"
          box-ratio="50"
          text="Ratio 50"
          subtext="Add more info"
          class="drop-box"
        />
    </div>
    <div>
      <p
        v-for="(file, index) in filesToUpload"
        :key="index">
        {{ file.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filesToUpload: [],
    }
  },
  methods: {
    handleFileSelect(e) {
      const files = e.dataTransfer.files;
      // check if it was actual files that were dragged in
      if (files && files.length) {
        for (let i = 0; i < files.length; i += 1) {
          this.filesToUpload.push(files[i]);
        }
      }
    },
  },
}
</script>

<style>
.box-container {
  display: flex;
}

.drop-box {
  margin: 8px;
}

</style>

```
