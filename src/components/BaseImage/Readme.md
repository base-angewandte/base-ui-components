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
      src: 'https://placeimg.com/640/400/arch/grayscale',
      srcset: [
        {
          "640w": "https://placeimg.com/640/400/arch/grayscale"
        },
        {
          "1024w": "https://placeimg.com/1024/800/arch/grayscale"
        },
      ],
    };
  },
};
</script>
```
