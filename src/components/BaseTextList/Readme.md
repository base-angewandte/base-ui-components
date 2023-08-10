## Demo

Example of different content types and multiple columns based on the data structure.

Note: The column elements are defined via the data structure wrapped by an array. The number of columns can be defined with the 'cols' property.

```vue live
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :cols="2"
      :data="data"
      @chip-clicked="chipClicked" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        // items wrapped in an array are rendered as columns.
        // the number of columns is defined with the prop `cols`.
        [
          {
            label: 'Data is string',
            data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          },
          {
            label: 'Data is array of strings',
            data: [
              'Lorem ipsum dolor sit amet',
              'Consetetur sadipscing elitr, sed diam nonumy',
              'Eirmod tempor invidunt',
            ],
          },
          {
            label: 'data is an object',
            data: {
              label: 'Labore',
              value: 'Dolore magna aliquyam erat',
              url: 'mailto:base@uni-ak.ac.at',
            },
          },
          {
            label: 'data is an object without a label',
            data: {
              value: 'Dolore magna aliquyam erat',
              url: 'mailto:base@uni-ak.ac.at',
            },
          },
          {
            label: 'data is array of objects',
            data: [
              {
                label: 'www',
                value: 'http://base.uni-ak.ac.at',
                url: 'http://base.uni-ak.ac.at',
              },
              {
                label: 'email',
                value: 'base@uni-ak.ac.at',
                url: 'mailto:base@uni-ak.ac.at',
              },
              {
                label: 'Labore',
                value: 'Dolore magna aliquyam erat',
              },
            ],
          },
          {
            label: 'data is array of objects with different link types',
            data: [
              {
                value: 'additional info in a tooltip',
                additional: [
                  {
                    label: 'www',
                    value: 'base',
                    url: 'https://base.uni-ak.ac.at',
                  },
                  {
                    label: 'label',
                    value: 'some value',
                  },
                ],
              },
              {
                value: 'external link',
                url: 'https://base.uni-ak.ac.at',
              },
              {
                value: 'internal link',
                source: 'some-id',
              },
            ],
          },
          {
            label: 'data is array of objects rendered as chips',
            id: 'source-type',
            data: [
              {
                value: 'dolore magna',
                source: 'source-id',
              },
              {
                value: ' aliquyam erat',
                source: 'source-id',
              },
            ],
          },
        ],
        // single column
        {
          label: 'Data is string',
          data: 'Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.',
        },
      ],
    }
  },
  methods: {
    chipClicked(obj) {
      console.log(obj);
    },
  },
}
</script>
```

<br>
Example of a single data object rendered in two columns, where the data property is typeof 'string'.

Note: The number of columns can be defined with the 'colsSingleTextContent' property.
```vue live
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data"
      :cols-single-text-object="2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
        },
      ],
    }
  }
}
</script>
```
