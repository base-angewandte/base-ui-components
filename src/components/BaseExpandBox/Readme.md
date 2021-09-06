Example of BaseExpandBox to display expandable text, unordered list, datalist elements

```vue
<template>
  <div>
    <BaseExpandBox>
      <BaseTextList
        render-label-as="h2"
        :data="data"
        :cols2="true" />
      <template v-slot:footer>
        <div style="display: flex;">
          <BaseButton
            :icon-colored="true"
            :has-background-color="false"
            icon="print"
            icon-position="top"
            icon-size="large"
            text="Print"
            style="padding-left: 0;" />

          <BaseButton
            :icon-colored="true"
            :has-background-color="false"
            icon="share"
            icon-position="top"
            icon-size="large"
            text="Share" />
        </div>
      </template>
    </BaseExpandBox>
  </div>
</template>

<script>
import BaseExpandBox from './BaseExpandBox';
import BaseButton from '../BaseButton/BaseButton';
import BaseTextList from '../BaseTextList/BaseTextList';

export default {
  components: {
    BaseExpandBox,
    BaseButton,
    BaseTextList,
  },
  data() {
    return {
      data: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
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
              value: 'https://base.uni-ak.ac.at',
              url: 'https://base.uni-ak.ac.at',
            },
            {
              label: 'email',
              value: 'base@uni-ak.ac.at',
              url: 'mailto:base@uni-ak.ac.at',
            },
          ],
        },
      ],
    };
  },
}
</script>
```
