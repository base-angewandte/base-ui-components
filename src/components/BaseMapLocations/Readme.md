```vue
<template>
  <BaseExpandBox
    show-more-text="Show Map and Addresses"
    show-less-text="Collapse Map and Addresses">

    <BaseMap
      :markers="locations"
      :highlight-marker="highlightedMarker"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      style="height: 368px; margin-bottom: 0.84211rem;"
      @selected="highlightLocation" />

    <BaseMapLocations
      label="Addresses"
      :locations="locations"
      :highlight-location="highlightedLocation"
      @selected="highlightMarker" />
  </BaseExpandBox>
</template>

<script>
export default {
  data() {
    return {
      highlightedMarker: null,
      highlightedLocation: null,
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
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
    };
  },
  methods: {
    highlightLocation(value) {
      this.highlightedLocation = value;
    },
    highlightMarker(value) {
      this.highlightedMarker = value;
    },
  },
}
</script>
```
