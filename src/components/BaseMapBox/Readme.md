Displays a Leaflet-map and an expandable address block

```vue
<template>
  <div>
    <BaseMapBox
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
```

Displays an address block if latitude/longitude is not set

```vue
<template>
  <div>
    <BaseMapBox
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
      }
    };
  }
}
</script>
```
