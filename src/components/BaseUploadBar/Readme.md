Example Bar where progress can be set from out side

```vue
<template>
  <div>
    <BaseUploadBar 
      :progress="progress"
      filename="testupload.jpg"
      class="uploadbar"
      />
    <BaseButton 
      text="Change Progress"
      @clicked="changeProgress"
      />
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
      if (this.progress + 0.25 > 1) {
        this.progress = 0;
      } else {
        this.progress = this.progress + 0.25;
      }
    },
  },
};
</script>
<style>
 .uploadbar {
   margin-bottom: 16px;
 }
</style>

```
