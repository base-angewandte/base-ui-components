## Demo

The different link types are selected by the properties passed.

| types         | properties                       |
|---------------|----------------------------------|
| chip          | identifierPropertyValue && type  | 
| external      | url                              | 
| internal      | identifierPropertyValue && !type | 
| text          |                                  |
| tooltip       | tooltip                          | 
| tooltip async | asyncTooltip                     | 

```vue live
<template>
  <div>
    <h2>examples of different link types:</h2>
    <template
      v-for="(link, index) in links">
      <BaseLink
        :key="index"
        :identifier-property-name="'id'"
        :identifier-property-value="link.id"
        :chip-query-name="'chip-link'"
        :path="link.path"
        :tooltip="link.tooltip"
        :tooltip-async="link.additional"
        :tooltip-styles="{ 'min-width': '300px', top: '500px' }"
        :type="link.type"
        :url="link.url"
        :value="link.value"
        @tooltip-clicked="asyncTooltip($event, index)" /><!-- eslint-disable --><template v-if="index !== links.length - 1">, </template><!-- eslint-enable -->
    </template>
  </div>
</template>
<script>
export default {
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
          id: '/components/BaseSearch',
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
          value: 'async tooltip',
          additional: [
            {
              label: 'label',
              value: 'value',
            },
          ],
        },
        {
          path: '/some-path',
          id: 'some-id',
          type: 'keywords',
          value: 'chip'
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

<style>
  /* reset chip hover style due the styleguide css would overwrite the component ones */
  .base-link.base-link--chip:hover {
    text-decoration: none !important;
  }
</style>
```
