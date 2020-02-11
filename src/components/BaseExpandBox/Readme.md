A component to display expandable text, unordered list, datalist elements

```vue
<template>
  <div>
    <baseExpandBox
      render-label-as="h2"
      :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        descriptions: [{
          label: 'Description',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
        },
        {
          label: 'Vero eos et accusam',
          data: [
              {
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
        furtherDetails: [{
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
      },
    }
  }
}
</script>
```
