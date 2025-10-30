import{_ as o,a,b as d,o as r,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseUploadPopUp","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseUploadPopUp.md","filePath":"components/BaseUploadPopUp.md","lastUpdated":1679928144000}'),l={name:"components/BaseUploadPopUp.md"};function n(p,e,c,u,h,b){const t=a("vue-live");return r(),d("div",null,[e[0]||(e[0]=s('<h1 id="baseuploadpopup" tabindex="-1">BaseUploadPopUp <a class="header-anchor" href="#baseuploadpopup" aria-label="Permalink to &quot;BaseUploadPopUp&quot;">​</a></h1><blockquote><p>A component taking care of uploads within a pop up</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>fileList</td><td>register files to upload<br>array with file-object(s) from file-input field</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>currentStatus</td><td>define current status</td><td>string</td><td><code>initial</code>, <code>saving</code>, <code>success</code>, <code>failed</code></td><td>&#39;initial&#39;</td></tr><tr><td>cancelButtonText</td><td>define button text<br>could be string or path to i18n json as well</td><td>string</td><td>-</td><td>&#39;cancel&#39;</td></tr><tr><td>uploadText</td><td>specify informational texts for the component -<br>this needs to be an object with the following properties:<br><br> <strong>title</strong> <code>string</code> - text used in the popup header<br> <strong>upload</strong> <code>string</code> - default button text<br> <strong>done</strong> <code>string</code> - button text when upload finished<br> <strong>retry</strong> <code>string</code> - button text when an upload error occurs<br> <strong>quotaExceeded</strong> <code>- string</code> text used when user quota is exceeded<br><br>The values of this object might be plain text or a key for an i18n file</td><td>object</td><td>-</td><td>{<br> title: &#39;File Upload&#39;,<br> upload: &#39;Upload&#39;,<br> done: &#39;Done&#39;,<br> retry: &#39;Try Again&#39;,<br><br> quotaExceeded: &#39;Unfortunately you exceeded your quota, because you have &#39;<br> + &#39;only {space} of space left. Please remove some files to enable uploading.&#39;<br>}</td></tr><tr><td>uploadPercentage</td><td>current upload progress in percent per file<br>array with current upload progress per file<br>e.g. [11, 55, 100]</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>userSpace</td><td>define current free storage space (bytes)</td><td>number</td><td>-</td><td>10000000</td></tr><tr><td>rejectedFiles</td><td>define rejected files<br>array with filename(s)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>uploadedFiles</td><td>define uploaded files<br>array with filename(s)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>fileErrors</td><td>define errors for rejected files<br>array with objects<br>eg: <code>[{ name: &#39;foo.txt&#39;, message: &#39;The file may include a virus&#39; }]</code><br>Note: each object must contain the properties: <code>name</code>, <code>message</code></td><td>array</td><td>-</td><td>[]</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>remove-file</td><td><strong>undefined</strong> <code>number</code> - index of the file entry</td><td>Event emitted when remove button on file entry is clicked</td></tr><tr><td>start-upload</td><td></td><td>Event emitted when upload button is clicked</td></tr><tr><td>cancel-upload</td><td></td><td>Event emitted when cancel button is clicked</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>default</td><td>slot for additional content after upload bars but before buttons</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',10)),i(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseButton
      button-style="row"
      icon="camera"
      icon-size="large"
      :text="'Upload Files'"
      @clicked="openFileDialogue"
    />

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
      @start-upload="startUpload"
    >
      <div key="popup-text" class="popup-text">
        <BaseDropDown
          v-model="license"
          :label="'Choose a License'"
          :header-background-color="'rgb(240, 240, 240)'"
          :options="licenses"
          :show-label="true"
          class="upload-dropdown"
        />
        <BaseDropDown
          v-model="publish"
          :label="'Publish files?'"
          :header-background-color="'rgb(240, 240, 240)'"
          :options="publishOptions"
          :show-label="true"
          class="upload-dropdown"
        />
      </div>
    </BaseUploadPopUp>

    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileSelect"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      currentStatus: "initial",
      userSpace: 10000000,
      uploadPercentage: [],
      rejectedFiles: [],
      uploadedFiles: [],
      license: {},
      licenses: [
        { label: "Copyright", value: "Copyright" },
        {
          label: "Creative Commons Attribution 4.0",
          value: "Creative Commons Attribution 4.0",
        },
        {
          label: "Creative Commons Attribution No Derivatives 4.0",
          value: "Creative Commons Attribution No Derivatives 4.0",
        },
      ],
      publish: {},
      publishOptions: [
        { label: "no", value: "false" },
        { label: "yes", value: "true" },
      ],
    };
  },
  computed: {
    uploadText() {
      return {
        title: "File Upload",
        upload: "Upload",
        done: "Done",
        retry: "Try Again",
        quotaExceeded: \`Unfortunately you exceeded your quota, because you have only \${this.convertSpace(
          this.userSpace
        )} of space left. Please remove some files to enable uploading.\`,
      };
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
      this.$refs.fileInput.dispatchEvent(new MouseEvent("click"));
    },
    cancelUpload() {
      this.reset();
    },
    reset() {
      this.currentStatus = "initial";
      this.uploadedFiles = [];
      this.rejectedFiles = [];
      this.fileList = [];
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    startUpload() {
      if (this.currentStatus === "initial") {
        alert("start upload");
        this.currentStatus = "success";
        return;
      }
      this.reset();
    },
    convertSpace(bytes, si) {
      let newBytes = bytes;
      const thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return \`\${bytes} B\`;
      }
      const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
      let u = -1;
      do {
        newBytes /= thresh;
        u += 1;
      } while (Math.abs(newBytes) >= thresh && u < units.length - 1);
      return \`\${newBytes.toFixed(1)} \${units[u]}\`;
    },
  },
};
<\/script>

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
`,requires:{}})])}const g=o(l,[["render",n]]);export{m as __pageData,g as default};
