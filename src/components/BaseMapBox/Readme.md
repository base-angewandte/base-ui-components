A component to display a Leaflet-map and a expandable address block

```vue
<template>
  <div>
    <baseMapBox
      :location="location"
      render-label-as="h2"
      show-more-text="Show Map and Address"
      show-less-text="Collapse Map and Address"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: {
        city: 'Vienna',
        postalCode: '1030',
        street: 'Vordere Zollamtsstrasse',
        number: '7',
        country: 'Austria',
        latitude: '48.208370',
        longitude: '16.384510',
      }
    };
  }
}
</script>
