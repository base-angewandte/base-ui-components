A component to render data in p | ul | dt tags depending on fieldtype

```vue
<template>
  <div>
    <baseTextList
      render-label-as="h2"
      :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
          label: 'Vero eos et accusam',
          data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        },
        {
          label: 'Vero eos et accusam',
          data: [
            'Lorem ipsum dolor sit amet',
            'Consetetur sadipscing elitr, sed diam nonumy',
            'Eirmod tempor invidunt',
          ],
        },
        {
          label: 'Vero eos et accusam',
          data: [{
              label: 'Labore',
              value: 'Dolore magna aliquyam erat',
            },
            {
              label: 'Labore',
              value: 'Dolore magna aliquyam erat',
            },
            {
              label: 'Labore',
              value: 'Dolore magna aliquyam erat',
            },
          ],
        },
      ],
    }
  }
}
</script>
```
