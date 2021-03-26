<template>
  <div id="app">
    <BaseExpandBox
      show-more-text="Show Map and Address"
      show-less-text="Collapse Map and Address">
      <BaseMap
        :markers="markers"
        :marker-popups="true"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style="height: 368px; margin-bottom: 0.84211rem;" />

      <baseTextList
        render-label-as="h2"
        :data="locationAddress" />
    </BaseExpandBox>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap';
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';
import BaseTextList from '@/components/BaseTextList/BaseTextList';

export default {
  name: 'App',
  components: {
    BaseMap,
    BaseExpandBox,
    BaseTextList,
  },
  data() {
    return {
      markers: [
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.209960, 16.381076],
          data: [
            'University of Applied Arts',
            'Georg-Coch-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.207540, 16.381623],
          data: ['MAK - Museum Angewandte Kunst'],
        },
      ],
      locationAddress: [
        {
          label: 'Address',
          data: [
            'Vordere Zollamtsstrasse 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
    };
  },
  watch: {

  },
  methods: {

  },
};
</script>

<style lang="scss">
  @import "../src/styles/variables";

</style>
