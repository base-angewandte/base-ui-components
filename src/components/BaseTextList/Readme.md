Example of BaseTextList to render data in one column

```vue
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data" />
  </div>
</template>

<script>
import BaseTextList from './BaseTextList';
export default {
  components: {
    BaseTextList,
  },
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
        {
          label: 'Vero eos et accusam',
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

```vue
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data"
      :cols2="true" />
  </div>
</template>

<script>
import BaseTextList from './BaseTextList';
export default {
  components: {
    BaseTextList,
  },
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

```vue
<template>
  <div>
    <BaseTextList
      render-label-as="h2"
      :data="data"
      :cols2="true" />
  </div>
</template>

<script>
import BaseTextList from './BaseTextList';
export default {
  components: {
    BaseTextList,
  },
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
