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
            icon="link"
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
    };
  },
}
</script>
```

Example of BaseExpandBox to display an expandable map and address data

```vue
<template>
  <div>
    <base-expand-box
      show-more-text="Show Map and Address"
      show-less-text="Collapse Map and Address">
      <base-map
        :lat-long="location"
        style="height: 368px; margin-bottom: 0.84211rem;" />

      <base-text-list
        render-label-as="h2"
        :data="locationAddress" />
    </base-expand-box>
  </div>
</template>

<script>
import BaseExpandBox from './BaseExpandBox';
import BaseMap from '../BaseMap/BaseMap';
import BaseTextList from '../BaseTextList/BaseTextList';

export default {
  components: {
    BaseExpandBox,
    BaseMap,
    BaseTextList,
  },
  data() {
    return {
      location: [48.208370, 16.384510],
      locationAddress: [
        {
          label: 'Address',
          data: [
            'Vordere Zollamtsstrasse 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
    };
  },
}
</script>
```
