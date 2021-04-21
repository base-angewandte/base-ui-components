<template>
  <div id="app">
    <BaseExpandBox
      show-more-text="Show Map and Address"
      show-less-text="Collapse Map and Address">
      <base-map-locations
        label="Addresses"
        :locations="locations" />
    </BaseExpandBox>
  </div>
</template>

<script>
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';
import BaseMapLocations from '@/components/BaseMapLocations/BaseMapLocations';

export default {
  name: 'App',
  components: {
    BaseExpandBox,
    BaseMapLocations,
  },
  data() {
    return {
      locations: [
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
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
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
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 2',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 2',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 3',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 4',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 5',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts - Room 7',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          coordinates: [16.381076, 48.209960],
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
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts - Room 432',
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
