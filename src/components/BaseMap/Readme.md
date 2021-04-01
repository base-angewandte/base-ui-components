```vue
<template>
  <BaseMap
    :markers="markers"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</template>

<script>
export default {
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
  }
}
</script>
```

Also see example in combination with [BaseMapLocations](#basemaplocations).
