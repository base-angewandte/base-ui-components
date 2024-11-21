## Demo

```vue live

<template>
  <BaseExpandBox
      show-more-text="Show Map and Addresses"
      show-less-text="Collapse Map and Addresses">
    <BaseMapLocations
        :locations="locations"
        :options="{
            style: 'normal',
            subdomains: ['mapsneu'],
            tileMatrixSet: 'google3857',
            type: 'geolandbasemap',
          }"
        attribution-position="topright"
        label="Addresses"
        tile-layer-service="WMS"
        attribution="Source: <a href='http://basemap.at'>basemap.at</a>"
        copyright="<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"
        url="https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png" />
  </BaseExpandBox>
</template>

<script>
export default {
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
