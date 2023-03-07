## Demo

Image View Box

```vue live
<template>
  <div
  class="container">
    <BaseImageBox
      :show-title="false"
      :image-url="getImgUrl"
      style="width: 200px"
      @clicked="showPreview = true"/>
    <BaseMediaPreview
      :display-size="{ 'max-width': '100%' }"
      :show-preview="showPreview"
      :media-url="getImgUrl"
      :previews="[
        { '640w': 'https://picsum.photos/seed/random/640/541.jpg' },
        { '1024w': 'https://picsum.photos/seed/random/1024/741.jpg' },
      ]"
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
      const url = 'https://picsum.photos/seed/random/640/400';
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

```vue live
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

```vue live
<template>
  <div>
      <BaseButton
        text="Show Video File"
        @clicked="showPreview = true"/>

      <BaseMediaPreview
        :show-preview="showPreview"
        :allow-download="false"
        :display-size="{}"
        display-name="Taken from https://test-streams.mux.dev"
        media-url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        media-poster-url="https://picsum.photos/seed/video/1920/1200"
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

```vue live
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
