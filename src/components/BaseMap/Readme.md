```vue
<template>
  <BaseMap
    :markers="markers"
  />
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
