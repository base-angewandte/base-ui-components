## Demo

Component to render list data

```vue live

<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <div v-if="editExpandList">
      <BaseCheckmark
        v-model="toggleElements"
        :radio-value="'button'"
        :show-label="true"
        label="Use button elements"
        mark-style="radio" />
      <BaseCheckmark
        v-model="toggleElements"
        :radio-value="'toggle'"
        :show-label="true"
        label="Use toggle elements"
        mark-style="radio" />
    </div>
    <BaseEditControl
      title="Activities"
      :controls="true"
      :subtitle="'(' + baseExpandList.filter(item => !item.hidden).length + ')'"
      :edit="editExpandList"
      @activated="activateExpandList"
      @canceled="cancelExpandList"
      @saved="saveExpandList"/>

    <BaseExpandList
      ref="baseExpandList"
      :data.sync="displayData"
      :edit="editExpandList"
      :control-type="toggleElements"
      @saved="saveExpandListEdit">
      <template
        #content="{ data }">
        <BaseLink
          :url="data.url"
          :value="data.value"
          :identifier-property-value="data.source"
          :space-after="!!data.additional"
          :tooltip="data.additional"
          :type="data.type"/>
        <template v-if="data.attributes"> - {{ data.attributes.join(', ') }}</template>
      </template>
    </BaseExpandList>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editExpandList: false,
      baseExpandList: [
        {
          label: 'Monographien',
          hidden: false,
          data: [
            {
              label: 'Beiträge in Sammelband',
              data: [
                {
                  value: 'qui nesciunt officiis quisquam officiis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  source: 'asdfasdf',
                },
                {
                  value: 'animi voluptates',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  additional: [
                    {
                      label: 'label',
                      value: 'value',
                    },
                  ],
                },
                {
                  value: 'officiis quisquam',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
              ],
            },
            {
              label: 'Konferenzbeiträge',
              data: [
                {
                  value: 'qui reiciendis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
                {
                  value: 'quia quisquam',
                  attributes: [
                    'quae laudantium expedita',
                    'maxime omnis accusamus',
                  ],
                  url: '#',
                },
                {
                  value: 'qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  url: '#',
                },
              ],
            },
          ],
        },
        {
          label: 'Film/Video',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Audio',
          hidden: false,
          data: [
            {
              value: 'sed et',
              attributes: [
                'est quos sed',
                'sed molestiae veritatis',
              ],
              url: '#',
            },
            {
              value: 'quis quis',
              attributes: [
                'non possimus possimus',
                'nobis recusandae sed',
              ],
              url: '#',
            },
            {
              value: 'mollitia quo',
              attributes: [
                'non magnam eius',
                'harum exercitationem non',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Preise und Stipendien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Konferenzen & Symposien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
      ],
      toggleElements: 'toggle',
    };
  },
  computed: {
    displayData: {
      set(val) {
        this.baseExpandList = val;
      },
      get() {
        return this.editExpandList ? this.baseExpandList
          : this.baseExpandList.filter(item => !item.hidden);
      },
    }
  },
  methods: {
    activateExpandList() {
      this.editExpandList = true;
    },
    cancelExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.reset();
    },
    saveExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.save();
    },
    saveExpandListEdit(val) {
      this.baseExpandList = val;
    },
  },
};
</script>
```
