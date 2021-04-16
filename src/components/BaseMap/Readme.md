```vue
<template>
  <BaseMap
    :marker="marker"
    :options="options"
    attribution="Source: <a href='http://basemap.at'>basemap.at</a>"
    copyright="<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"
    url="https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png" />
</template>

<script>
export default {
  data() {
    return {
      marker: [
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
  }
}
</script>
```
