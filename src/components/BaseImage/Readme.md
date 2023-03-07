## Demo

```vue live
<template>
  <div>
    <BaseImage
      :alt="alt"
      :src="src"
      :srcset="srcset"
      :lazyload="true" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      alt: 'description',
      src: 'https://picsum.photos/seed/test/460/341',
      srcset: [
        {
          "640w": "https://picsum.photos/seed/test/640/541"
        },
        {
          "1024w": "https://picsum.photos/seed/test/1024/741"
        },
      ],
    };
  },
};
</script>
```
