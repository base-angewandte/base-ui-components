## Demo

The different link types are selected by the properties passed.

| types         | properties                       |
|---------------|----------------------------------|
| chip          | identifierPropertyValue && type  | 
| external      | url                              | 
| internal      | identifierPropertyValue && !type | 
| text          |                                  |
| tooltip       | tooltip                          | 
| tooltip async | tooltipAsync                     | 

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
        :tooltip-async="link.external"
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
          external: [
            {
              // some id
              id: '0000-0003-2731-3077',
              // url to fetch data from
              source: 'https://orcid.org/',
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
    /**
     * fetch the toolTip content
     * @param {Object} value - data from the tooltipAsync prop
     * @param {Number} id - internal id of the BaseLink which triggered the event
     */
    asyncTooltip(value, id) {
      // fetch data with the data from value
      setTimeout(() => {
        this.$set(this.links[id], 'tooltip', [
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
