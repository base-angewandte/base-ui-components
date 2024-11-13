<script setup>
import {computed, ref} from 'vue';
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox.vue';
import BaseMediaCarousel from '@/components/BaseMediaCarousel/BaseMediaCarousel.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseToggle from '@/components/BaseToggle/BaseToggle.vue';


import '@/styles/lib.scss';

const initialSlide = ref(null);
const showPreview = ref(false);
const media = ref([
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
]);

function preview(index) {
  initialSlide.value = index;
  showPreview.value = true;
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      WORKING!!
    </div>
  </header>

  <main
    :style="{
      height: '800px',
    }">
    <div class="container">
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
      <BaseMediaCarousel
          :show-preview="showPreview"
          :initial-slide="initialSlide"
          :items="media"
          :allow-download="false"
          @hide="showPreview = false" />
    </div>
  </main>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.test {
  height: 24px;
  width: 24px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.box {
  visibility: visible;
}

.hover-box {
  height: 100px;
  width: 100px;
  background-color: cornflowerblue;
}

.hidden {
  visibility: hidden;
}
.listcontainer {
  background: rgb(240, 240, 240);
  padding: 16px;
}
.listbutton {
  margin-top: 16px;
}
.show {
  margin-top: 16px;
}
.icon {
  width: 12px;
  height: 12px;
}
</style>
