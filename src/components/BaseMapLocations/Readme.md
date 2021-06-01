```vue
<template>
  <BaseExpandBox
    show-more-text="Show Map and Addresses"
    show-less-text="Collapse Map and Addresses">
    <base-map-locations
      :locations="locations"
      :options="{ layers: 'OSM-WMS' }"
      attribution="Source: <a href='https://openstreetmap.org/'>OpenStreetMap contributors</a>"
      attribution-position="topright"
      copyright="<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC BY-SA 3.0</a>"
      label="Addresses"
      tile-layer-service="WMS"
      url="https://ows.terrestris.de/osm-gray/service" />
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
        {
          latLng: [48.208248, 16.384965],
          data: [
            'base Angewandte',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
    };
  },
}
</script>
```
