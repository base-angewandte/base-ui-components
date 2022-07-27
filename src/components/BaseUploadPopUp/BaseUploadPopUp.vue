<template>
  <BasePopUp
    :show="!!fileList.length"
    :title="getI18nTerm(getLangLabel(uploadText.title))"
    @close="cancelUpload">
    <transition-group name="list-complete">
      <div
        v-if="userQuotaExceeded"
        key="user-warning"
        class="base-uploader-user-warning">
        <BaseIcon
          name="attention"
          class="icon base-uploader-user-warning-icon" />
        {{ getI18nTerm(getLangLabel(uploadText.quotaExceeded), 1, {
          space: convertSpace(userSpace) }) }}
      </div>

      <div
        key="upload-area"
        class="popup-upload-area">
        <transition-group
          name="bar-move"
          class="transition">
          <BaseProgressBar
            v-for="(file, index) of fileList"
            :key="file.name"
            :progress="uploadPercentage[index]"
            :file-name="file.name"
            :file-size="userQuotaExceeded ? convertSpace(file.size) : ''"
            :status="getStatus(file.name)"
            :show-remove="currentStatus === 'initial' && fileList.length > 1"
            class="upload-bar"
            @remove-item="removeFile(index)" />
        </transition-group>
      </div>
    </transition-group>

    <!-- @slot slot for additional content -->
    <slot />

    <template slot="button-row">
      <BaseButton
        v-if="currentStatus === 'initial' || currentStatus === 'failed'"
        :text="getI18nTerm(cancelButtonText)"
        :icon="'remove'"
        :icon-position="'right'"
        :icon-size="'small'"
        class="base-upload-bar-button"
        @clicked="cancelUpload" />

      <BaseButton
        ref="uploadButton"
        :text="buttonText"
        :icon="currentStatus !== 'saving' && currentStatus !== 'failed' ? 'check-mark' : ''"
        :icon-position="'right'"
        :icon-size="'small'"
        :disabled="currentStatus === 'saving' || userQuotaExceeded"
        class="base-upload-bar-button"
        @clicked="startUpload">
        <template
          v-if="currentStatus === 'saving'"
          slot="right-of-text">
          <span class="base-upload-bar-loader">
            <BaseLoader />
          </span>
        </template>
      </BaseButton>
    </template>
  </BasePopUp>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseLoader from '../BaseLoader/BaseLoader';
import BasePopUp from '../BasePopUp/BasePopUp';
import BaseProgressBar from '../BaseProgressBar/BaseProgressBar';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseUploadPopUp',
  components: {
    BaseButton,
    BaseIcon,
    BaseLoader,
    BasePopUp,
    BaseProgressBar,
  },
  mixins: [i18n],
  props: {
    /**
     * register files to upload<br>
     * array with file-object(s) from file-input field
     */
    fileList: {
      type: Array,
      default: () => [],
    },
    /**
     * define current status<br>
     * possible values: 'initial' | 'saving' | 'success' | 'failed'
     */
    currentStatus: {
      type: String,
      default: 'initial',
      validate(val) {
        return ['initial', 'saving', 'success', 'failed'].includes(val);
      },
    },
    /**
     * define button text<br>
     * could be string or path to i18n json as well
     */
    cancelButtonText: {
      type: String,
      default: 'cancel',
    },
    /**
     * specify informational texts for the component -
     * this needs to be an object with the following properties<br>
     * <br>
     *   <b>title</b>: text used in the popup header<br>
     *   <b>upload</b>: default button text<br>
     *   <b>done</b>: button text when upload finished<br>
     *   <b>retry</b>: button text when an upload error occurs<br>
     *   <b>quotaExceeded</b>: text used when user quota is exceeded<br>
     * <br>
     * The values of this object might be plain text or a key for an i18n file<br>
     */
    uploadText: {
      type: Object,
      default: () => ({
        title: 'File Upload',
        upload: 'Upload',
        done: 'Done',
        retry: 'Try Again',
        quotaExceeded: 'Unfortunately you exceeded your quota, because you have only {space} of space left. Please remove some files to enable uploading.',
      }),
    },
    /**
     * current upload progress in percent per file<br>
     * array with current upload progress per file<br>
     * e.g. [11, 55, 100]
     */
    uploadPercentage: {
      type: Array,
      default: () => [],
    },
    /**
     * define current free storage space (bytes)
     */
    userSpace: {
      type: Number,
      default: 10000000,
    },
    /**
     * define rejected files<br>
     * array with filename(s)
     */
    rejectedFiles: {
      type: Array,
      default: () => [],
    },
    /**
     * define uploaded files<br>
     * array with filename(s)
     */
    uploadedFiles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    buttonText() {
      if (this.currentStatus === 'initial' || this.currentStatus === 'saving') {
        return this.getI18nTerm(this.getLangLabel(this.uploadText.upload));
      }
      if (this.rejectedFiles.length) {
        return this.getI18nTerm(this.getLangLabel(this.uploadText.retry));
      }
      return this.getI18nTerm(this.getLangLabel(this.uploadText.done));
    },
    userQuotaExceeded() {
      return this.userSpace < this.fileList
        .reduce((prev, curr) => prev + curr.size, 0);
    },
  },
  methods: {
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
    },
    getStatus(fileName) {
      if (this.uploadedFiles.includes(fileName)) {
        return 'success';
      }
      if (this.rejectedFiles.includes(fileName)) {
        return 'fail';
      }
      return '';
    },
    cancelUpload() {
      /**
       * Event emitted when cancel button is clicked
       *
       * @type {Event}
       */
      this.$emit('cancelUpload');
    },
    startUpload() {
      /**
       * Event emitted when upload button is clicked
       *
       * @type {Event}
       */
      this.$emit('startUpload');
    },
    removeFile(index) {
      /**
       * Event emitted when remove button on file entry is clicked
       *
       * @type {Event}
       * @property {number} index - index of the file entry
       */
      this.$emit('removeFile', index);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-uploader-user-warning {
    color: $warning-color;
    fill: $warning-color;
    margin-bottom: $spacing;
    display: flex;
    align-items: center;

    .icon {
      height: $icon-large;
      width: $icon-large;
      max-width: $icon-large;

      &.base-uploader-user-warning-icon {
        margin-right: $spacing-small;
        flex: 0 0 auto;
      }
    }
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
    margin-top: $spacing;

    .upload-dropdown {
      width: calc(50% - #{$spacing-small});
      flex: 0 0 auto;
    }
  }

  .popup-text > div:first-of-type {
    margin-right: $spacing;
  }

  .files-popup-input-field {
    margin-bottom: $spacing;
  }

  .popup-upload-area {
    max-height: ($row-height-small + $spacing) * 10;
    overflow-y: auto;

    .upload-bar:not(:last-child) {
      margin-bottom: $spacing;
    }
  }

  .base-upload-bar-button {
    flex-basis: 100%;
  }

  .base-upload-bar-button + .base-upload-bar-button {
    margin-left: $spacing;
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .list-complete-move {
    transition: all 200ms;
  }

  .transition {
    display: flex;
    flex-direction: column;
  }

  .bar-move-leave-active {
    opacity: 0;
    transition: all 250ms;
  }

  @media screen and (max-width: $mobile) {
    .popup-upload-area {
      max-height: ($row-height-small + $spacing) * 5;
    }

    .base-upload-bar-button + .base-upload-bar-button {
      margin-left: 0;
      margin-top: $spacing;
    }
  }
</style>

<style lang="scss">
@import "../../styles/variables";

.base-upload-bar-loader {
  position: relative;
  transform: scale(0.5);
  margin-left: $spacing;
  padding-left: $spacing;
}
</style>
