```vue
<template>
  <BaseExpandBox
    show-more-text="Show Map and Addresses"
    show-less-text="Collapse Map and Addresses">
    <base-map-locations
      :locations="locations"
      :options="options"
      attribution="Source: <a href='http://basemap.at'>basemap.at</a>"
      attribution-position="topright"
      copyright="<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"
      label="Addresses"
      url="https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png" />
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
      options: {
        style: 'normal',
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        tileMatrixSet: 'google3857',
        type: 'geolandbasemap',
      },
    };
  },
}
</script>
```
