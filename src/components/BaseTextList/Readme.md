## Demo

Example of BaseTextList to render data in one column

```vue live
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
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
          label: 'data is array of objects with additional info in tooltip',
          data: [
            {
              value: 'additional info in toolip',
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
      ],
    }
  }
}
</script>
```

Example of BaseTextList to render data in two columns

```vue live
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data"
      :cols2="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
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
      ],
    }
  }
}
</script>
```

Note: If data is a single Object and field type is 'string', then data will be rendered in two columns

```vue live
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data"
      :cols2="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          `,
        },
      ],
    }
  }
}
</script>
```
