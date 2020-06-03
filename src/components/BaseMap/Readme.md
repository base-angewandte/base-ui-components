A component to display a Leaflet-map

```vue
<template>
  <BaseMap
    :lat-long="latLong"
  />
</template>

<script>
export default {
  data() {
    return {
      latLong: [
        '48.208370',
        '16.384510',
      ],
    };
  }
}
</script>
