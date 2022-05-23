```vue
<template>
  <div style="position: relative;">
    <div style="display: flex;">
      <BaseImageBox
        v-for="(item, index) in media"
        :key="index"
        :box-size="{ width: 'calc(20% - 12px)' }"
        :title="item.title"
        :image-url="item.mediaUrlSmall"
        style="margin-right: 10px"
        @clicked="preview(index)" />
    </div>
    <base-media-carousel
      :show-preview="showPreview"
      :initial-slide="initialSlide"
      :items="media"
      :autoplay-media="true"
      :allow-download="false"
      @hide="showPreview = false" />
  </div>
</template>

<script>
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox';
import BaseMediaCarousel from '@/components/BaseMediaCarousel/BaseMediaCarousel';

export default {
  components: {
    BaseImageBox,
    BaseMediaCarousel,
  },
  data() {
    return {
      initialSlide: null,
      showPreview: false,
      media: [
        {
          title: 'Image',
          additionalInfo: ['Taken from: https://placeimg.com/1260/800/arch.jpg'],
          mediaUrl: 'https://placeimg.com/1260/800/arch.jpg',
          mediaUrlSmall: 'https://placeimg.com/400/300/arch.jpg',
        },
        {
          title: 'Image',
          additionalInfo: [
              'Taken from: https://placeimg.com/1260/800/arch.jpg',
              'Archive Id: 6548976543156498'
          ],
          mediaUrl: 'https://placeimg.com/800/1260/arch.jpg',
          mediaUrlSmall: 'https://placeimg.com/400/300/arch.jpg',
        },
        {
          title: 'Video',
          additionalInfo: ['Taken from: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'],
          mediaUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          mediaPosterUrl: 'https://placeimg.com/1200/650/arch.jpg',
          displaySize: { width: '1000px' },
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
