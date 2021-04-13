Example of BaseExpandBox to display expandable text, unordered list, datalist elements

```vue
<template>
  <div>
    <BaseExpandBox>
      <div class="base-expand-box-columns">
        <div class="base-expand-box-column">
          <BaseTextList
            render-label-as="h2"
            :data="data.column1" />
          </div>
        <div class="base-expand-box-column">
          <BaseTextList
            render-label-as="h2"
            :data="data.column2" />
        </div>
      </div>
    </BaseExpandBox>
  </div>
</template>

<script>
import BaseExpandBox from './BaseExpandBox';
import BaseTextList from '../BaseTextList/BaseTextList';

export default {
  components: {
    BaseExpandBox,
    BaseTextList,
  },
  data() {
    return {
      data: {
        column1: [{
          label: 'Description',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
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
            ],
          },
        ],
        column2: [{
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
    };
  },
}
</script>
```
