```vue live
<template>
  <base-hls-video
    ref="baseMediaVideo"
    :display-size="{ 'width': '100%', 'max-width': '1000px' }"
    :media-url="'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'"
    :media-poster-url="'https://picsum.photos/seed/video/1200/650.jpg'"
    :autoplay="false"
    class="base-media-preview-image base-media-preview-video" />
</template>
```
