## Demo

Note:<br>
The spriteSheet 'base-ui-icons.svg' needs to be copied into the '/public' folder of your frontend project.<br>
It is possible to set the path to the spriteSheet due a global variable in your frontend project: <br>
<i style="display: inline-block; background-color: #f0f0f0; padding: 0 16px;">var base`_`ui`_`icons = 'path/to/base-ui-icons.svg';</i>

SVGs layers should be grouped and contain only simplified objects path.<br>
<a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a> or <a href="https://iconmoon.io">IcoMoon.io </a>
 are services to harmonize sizes and optimize the icons beforehand.

Available icons:

```vue live
<template>
  <div style="display: flex; flex-wrap: wrap">
    <div
      v-for="icon in icons"
      class="symbol">
      <BaseIcon
        :name="icon"
        :title="icon"
        class="icon" />
      <span class="title">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: ['add-existing-collection', 'add-existing-object', 'add-new-collection', 'add-new-object', 'archive-arrow',
        'archive-empty', 'archive-sheets', 'arrow-left', 'attachment', 'attention', 'audio-object', 'calendar-many',
        'calendar-number', 'camera', 'check-mark', 'clock', 'collection', 'download', 'drag-lines', 'drag-n-drop',
        'drop-down', 'duplicate', 'edit', 'eye-hide', 'eye', 'file-object', 'forbidden', 'grid', 'home', 'image-object',
        'information', 'institution', 'information-solo', 'licence', 'magnifier', 'next', 'options-menu', 'people', 
        'people-filled', 'play', 'plus', 'prev', 'print', 'refresh', 'remove', 'save-file', 'share', 'sort', 'subscribe', 
        'success', 'text', 'unsubscribe', 'video-object', 'waste-bin'],
    };
  },
};
</script>

<style>
  .symbol {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100px;
    margin: 4px;
    padding: 16px;
    background-color: #f0f0f0;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }

  .title {
    font-size: 12px;
  }
</style>
```
