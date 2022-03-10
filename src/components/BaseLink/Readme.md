```vue
<template>
  <div>
    <h2>types</h2>
    <template
      v-for="(link, index) in links">
      <BaseLink
        :key="index"
        :source="link.source"
        :tooltip="link.tooltip"
        :tooltip-async="link.additional"
        :tooltip-styles="{ 'min-width': '300px', top: '500px' }"
        :type="link.type"
        :url="link.url"
        :value="link.value"
        @tooltipClicked="asyncTooltip($event, index)" /><!-- eslint-disable --><template v-if="index !== links.length - 1">, </template><!-- eslint-enable -->
    </template>
  </div>
</template>
<script>
import BaseLink from './BaseLink';

export default {
  components: {
    BaseLink,
  },
  data() {
    return {
      links: [
        {
          value: 'text',
        },
        {
          value: 'external link',
          url: 'https://base.uni-ak.ac.at',
        },
        {
          value: 'email link',
          url: 'mailto:email@uni-ak.ac.at',
        },
        {
          value: 'internal link',
          source: 'internal.link',
        },
        {
          value: 'tooltip',
          tooltip: [
            {
              label: 'label',
              value: 'value',
            },
            {
              label: 'label',
              value: 'external link',
              url: 'https://base.uni-ak.ac.at',
            },
          ],
        },
        {
          value: 'aync tooltip',
          additional: [
            {
              label: 'label',
              value: 'value',
            },
          ],
        },
        {
          value: 'internal link (chips)',
          source: 'internal.link',
          type: 'activity'
        },
      ],
    };
  },
  methods: {
    asyncTooltip(value, index) {
      setTimeout(() => {
        this.$set(this.links[index], 'tooltip', [
          {
            label: 'label',
            value: 'value',
          },
          {
            label: 'label',
            value: 'external link',
            url: 'https://base.uni-ak.ac.at',
          },
        ]);
      }, 500);
    },
  },
};
</script>
```
