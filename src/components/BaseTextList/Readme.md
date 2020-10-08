A component to render data in p | ul | dt tags depending on fieldtype

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
