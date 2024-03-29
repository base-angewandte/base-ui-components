## Demo

```vue live
<template>
  <div style="position: relative;">
    <div style="display: flex; flex-wrap: wrap;">
      <BaseImageBox
        v-for="(item, index) in media"
        :key="index"
        :box-size="{ width: 'calc(25% - 10px)' }"
        :title="item.title"
        :image-url="item.mediaUrlSmall"
        style="margin-right: 10px"
        @clicked="preview(index)" />
    </div>
    <base-media-carousel
      :show-preview="showPreview"
      :initial-slide="initialSlide"
      :items="media"
      :allow-download="false"
      @hide="showPreview = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialSlide: null,
      showPreview: false,
      media: [
        {
          title: 'Image',
          additionalInfo: ['Taken from: https://picsum.photos'],
          mediaUrl: 'https://picsum.photos/seed/firstimage/1260/800.jpg',
          mediaUrlSmall: 'https://picsum.photos/seed/firstimage/400/300.jpg',
        },
        {
          title: 'Image',
          additionalInfo: [
              'Taken from: https://picsum.photos',
              'Archive Id: 6548976543156498'
          ],
          mediaUrl: 'https://picsum.photos/seed/anotherimage/1260/800.jpg',
          mediaUrlSmall: 'https://picsum.photos/seed/anotherimage/400/300.jpg',
        },
        {
          title: 'Video',
          additionalInfo: [
            'Taken from: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            'Archive Id: A987s4e1fsffeABXX57',
          ],
          mediaUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          mediaPosterUrl: 'https://picsum.photos/seed/video/1200/650.jpg',
          mediaUrlSmall: 'https://picsum.photos/seed/video/400/300.jpg',
          displaySize: { 'width': '100%', 'max-width': '1000px' },
        },
        {
          title: 'Audio',
          additionalInfo: ['Audio: Taken from: http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'],
          mediaUrl: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
        },
        {
          title: 'Document',
          additionalInfo: ['Taken from http://www.africau.edu/images/default/sample.pdf'],
          mediaUrl: 'http://www.africau.edu/images/default/sample.pdf',
        },
        {
          title: 'Document',
          additionalInfo: ['Taken from: https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'],
          mediaUrl: 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc',
        },
      ],
    };
  },
  computed: {

  },
  methods: {
    preview(index) {
      this.initialSlide = index;
      this.showPreview = true;
    },
  },
};
</script>
```
