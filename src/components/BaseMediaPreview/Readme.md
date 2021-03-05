Image View Box

```vue
<template>
  <div
  class="container">
    <BaseImageBox
      :show-title="false"
      :image-url="getImgUrl"
      @clicked="showPreview = true"/>
    <BaseMediaPreview
          :show-preview="showPreview"
          :media-url="getImgUrl"
          @hide-preview="showPreview = false"/>
</div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false,
    };
  },
  computed: {
    getImgUrl() {
      /* eslint-disable-next-line */
      const url = require('@/../dev-docs/assets/images/img1.png');
      return url;
    },
  },
  methods: {
    action() {
      alert('Pop Up Action confirmed!');
    },
  },
};
</script>

<style>
  .container {
    position: relative;
  }
</style>

```

An audio example

```vue
<template>
  <div>
      <BaseButton
        text="Show Audio File"
        @clicked="showPreview = true"/>

      <BaseMediaPreview
        :show-preview="showPreview"
        :allow-download="false"
        display-name="Taken from http://www.hochmuth.com/mp3-samples.htm"
        media-url="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3"
        @hide-preview="showPreview = false"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      showPreview: false,
    };
  },
};
</script>


```

An video example

```vue
<template>
  <div>
      <BaseButton
        text="Show Video File"
        @clicked="showPreview = true"/>

      <BaseMediaPreview
        :show-preview="showPreview"
        :allow-download="false"
        display-name="Taken from https://test-streams.mux.dev"
        media-url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        @hide-preview="showPreview = false"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      showPreview: false,
    };
  },
};
</script>


```

An pdf example

```vue
<template>
  <div>
      <BaseButton
        text="Show PDF File"
        @clicked="showPreview = true"/>

      <BaseMediaPreview
        :show-preview="showPreview"
        display-name="Taken from http://www.africau.edu/images/default/sample.pdf"
        media-url="http://www.africau.edu/images/default/sample.pdf"
        @hide-preview="showPreview = false"/>
  </div>
</template>

<script>
export default{
  data() {
    return {
      showPreview: false,
    };
  },
};
</script>


```
