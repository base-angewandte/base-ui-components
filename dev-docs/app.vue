<template>
  <div
    style="max-width: 1024px; margin: 20px auto;">
    <h2 class="h2">
      mixed columns with nested data structure
    </h2>
    <div
      style="padding: 16px; background: white;">
      <BaseTextList
        render-label-as="h2"
        :cols="2"
        :data="dataImage"
        @chip-clicked="chipClicked($event)" />
    </div>

    <h2 class="h2">
      2 columns
    </h2>
    <div
      style="padding: 16px; background: white;">
      <BaseTextList
        render-label-as="h2"
        :cols="2"
        :data="data"
        @chip-clicked="chipClicked" />
    </div>

    <h2 class="h2">
      single item, 2 columns
    </h2>
    <div
      style="padding: 16px; background: white;">
      <BaseTextList
        render-label-as="h2"
        :data="dataSingle"
        :cols-single-text-object="2"
        @chip-clicked="chipClicked" />
    </div>
  </div>
</template>

<script>
import BaseTextList from '@/components/BaseTextList/BaseTextList';

export default {
  name: 'App',
  components: {
    BaseTextList,
  },
  data() {
    return {
      dataSingle: [
        {
          label: 'Data is string',
          data: 'Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.',
        },
      ],
      dataImage: [
        [
          {
            label: 'Künstler*in',
            data: 'William Turner',
          },
          {
            label: 'Typ',
            data: 'Kunstwerk',
          },
          {
            label: 'Entstehungsort',
            data: 'England',
          },
          {
            label: 'Standort',
            data: 'Museum of fine Arts',
          },
          {
            label: 'Datierung',
            data: '1840',
          },
          {
            label: 'Material/Technik',
            data: 'Öl auf Leinwand',
          },
          {
            label: 'Format',
            data: '90,8 x 122,6cm',
          },
          {
            label: 'Schlagworte',
            id: 'source-type',
            data: [
              {
                value: 'Romantik',
                source: 'source-id',
              },
              {
                value: 'Malerei',
                source: 'malerei-id',
              },
            ],
          },
          // nested columns
          // [
          //   {
          //     label: 'label',
          //     data: 'string',
          //   },
          //   {
          //     label: 'label',
          //     data: 'string',
          //   },
          // ],
        ],
        {
          label: 'Anmerkungen',
          data: 'Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu. \n Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.',
        },
      ],
      data: [
        {
          label: 'Data is string',
          data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
              value: 'additional info in tootlip',
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    chipClicked(obj) {
      console.log(obj);
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

.h2 {
  margin: 32px 0 8px 16px;
}
</style>
