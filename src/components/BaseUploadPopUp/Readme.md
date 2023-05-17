## Demo

```vue live
<template>
  <div class="container">
    <BaseButton
      button-style="row"
      icon="camera"
      icon-size="large"
      :text="'Upload Files'"
      @clicked="openFileDialogue" />

    <BaseUploadPopUp
      ref="uploadPopUp"
      :show="!!fileList.length"
      :cancel-button-text="'Cancel'"
      :current-status="currentStatus"
      :file-list="fileList"
      :user-space="userSpace"
      :upload-percentage="uploadPercentage"
      :rejected-files="rejectedFiles"
      :uploaded-files="uploadedFiles"
      :upload-text="uploadText"
      @cancel-upload="cancelUpload"
      @remove-file="removeFile"
      @start-upload="startUpload">
      <div
        key="popup-text"
        class="popup-text">
        <BaseDropDown
          v-model="license"
          :label="'Choose a License'"
          :header-background-color="'rgb(240, 240, 240)'"
          :options="licenses"
          :show-label="true"
          class="upload-dropdown" />
        <BaseDropDown
          v-model="publish"
          :label="'Publish files?'"
          :header-background-color="'rgb(240, 240, 240)'"
          :options="publishOptions"
          :show-label="true"
          class="upload-dropdown" />
      </div>
    </BaseUploadPopUp>

    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileSelect">
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      currentStatus: 'initial',
      userSpace: 10000000,
      uploadPercentage: [],
      rejectedFiles: [],
      uploadedFiles: [],
      errorFiles: [],
      license: {},
      licenses: [
        { label: 'Copyright', value: 'Copyright' },
        { label: 'Creative Commons Attribution 4.0', value: 'Creative Commons Attribution 4.0' },
        { label: 'Creative Commons Attribution No Derivatives 4.0', value: 'Creative Commons Attribution No Derivatives 4.0' },
      ],
      publish: {},
      publishOptions: [
        { label: 'no', value: 'false' },
        { label: 'yes', value: 'true' },
      ],
    };
  },
  computed: {
    uploadText() {
      return {
        title: 'File Upload',
        upload: 'Upload',
        done: 'Done',
        retry: 'Try Again',
        quotaExceeded: `Unfortunately you exceeded your quota, because you have only ${this.convertSpace(this.userSpace)} of space left. Please remove some files to enable uploading.`,
      }
    },
  },
  methods: {
    handleFileSelect(e) {
      // get files - depending if dragged or selected from file browse different event prop
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      // check if it was actual files that were dragged in
      if (files && files.length) {
        for (let i = 0; i < files.length; i += 1) {
          this.fileList.push(files[i]);
        }
      }
    },
    openFileDialogue() {
      this.$refs.fileInput.dispatchEvent(new MouseEvent('click'));
    },
    cancelUpload() {
      this.reset();
    },
    reset() {
      this.currentStatus = 'initial';
      this.uploadedFiles = [];
      this.rejectedFiles = [];
      this.fileList = [];
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    startUpload() {
      if (this.currentStatus === 'initial') {
        alert('start upload');
        this.currentStatus = 'success';
        return;
      }
      this.reset();
    },
    convertSpace(bytes, si) {
      let newBytes = bytes;
      const thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return `${bytes} B`;
      }
      const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      do {
        newBytes /= thresh;
        u += 1;
      } while (Math.abs(newBytes) >= thresh && u < units.length - 1);
      return `${newBytes.toFixed(1)} ${units[u]}`;
    }
  },
};
</script>

<style>
  .container {
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }

  .hidden {
    position: absolute !important;
    top: auto !important;
    left: -9999px !important;
  }

  .popup-text {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .upload-dropdown {
    width: calc(50% - 16px / 2);
    flex: 0 0 auto;
  }
</style>

```
