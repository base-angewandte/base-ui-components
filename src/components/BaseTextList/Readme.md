## Demo

Example of different content types and multiple columns based on the data structure.

Note: The column elements are defined via the data structure wrapped by an array. The number of columns can be defined with the `cols` prop.

```vue live
<template>
  <div>
    <BaseTextList
      :cols="2"
      :data="data"
      :identifier-property-name="'source'"
      :render-label-as="'h2'" />
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
                label: 'internal',
                value: 'internal link',
                source: '/some-path',
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
                source: '/some-path',
              },
            ],
          },
          {
            label: 'data is array of objects rendered as chips',
            id: 'keywords',
            path: '/components/BaseTextList.html',
            data: [
              {
                value: 'dolore magna',
                source: 'keyword-1',
              },
              {
                value: 'aliquyam erat',
                source: 'keyword-2',
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
}
</script>

<style>
  /* reset chip hover style due the styleguide css would overwrite the component ones */
  >>> .base-link.base-link--chip:hover {
    text-decoration: none !important;
  }
</style>
```

<br>
Example of a single data object rendered in two columns, where the data property is typeof <code>string</code>.

Note: The number of columns can be defined with the `colsSingleTextContent` prop.
```vue live
<template>
  <div>
    <BaseTextList
      :data="data"
      :cols-single-text-object="2"
      :render-label-as="'h2'" />
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

<br>
Example of a list of chips.

Note:
The properties `id` and `path` are specified once for all chips in that object
and processed internally to prepare the structure for a single chip from [BaseLink](BaseLink).

```vue live
<template>
  <div>
    <BaseTextList
      :data="data"
      :identifier-property-name="'id'"
      :render-label-as="'h2'" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: 'Vero eos et accusam',
          id: 'keywords',
          path: '/components/BaseTextList.html',
          data: [
            {
              value: 'dolore magna',
              id: 'keyword-1',
            },
            {
              value: 'aliquyam erat',
              id: 'keyword-2',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
  /* reset chip hover style due the styleguide css would overwrite the component ones */
  >>> .base-link.base-link--chip:hover {
    text-decoration: none !important;
  }

  /* set z-index equal or higher than styleguides sidebar */
  @media screen and (min-width: $mobile) {
    >>> .base-tooltip-box {
      z-index: 1002 !important;
    }
  }
</style>
```
