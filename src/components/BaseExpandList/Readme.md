Component to render list data

```vue
<template>
  <!--BaseEditControl
    title="Activities"
    :subtitle="`(${baseExpandList.filter(item => item.visible).length})`"
    :edit="editExpandList"
    @activated="activateExpandList"
    @canceled="cancelExpandList"
    @saved="saveExpandList" /-->

  <BaseExpandList
    ref="baseExpandList"
    :data="editExpandList ? baseExpandList : baseExpandList.filter(item => item.visible)"
    :edit="editExpandList"
    @saved="saveExpandListEdit" />
</template>

<script>
// import BaseEditControl from '../BaseEditControl/BaseEditControl';
import BaseExpandList from './BaseExpandList';

export default {
  components: {
    // BaseEditControl,
    BaseExpandList,
  },
  data() {
    return {
      editExpandList: false,
      baseExpandList: [
        {
          label: 'Monographien',
          visible: true, // TODO: define naming, maybe 'hidden' better
          data: [
            {
              label: 'Beiträge in Sammelband',
              data: [
                {
                  value: '1 qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  id: '29', // TODO: should be id (change in open-api-definition)
                  href: '#',
                },
                {
                  value: '2 animi voluptates',
                  attributes: [
                    'ut eum et',
                    'quis odit est',
                  ],
                  id: '31',
                  href: '#',
                },
                {
                  value: '3 officiis quisquam',
                  attributes: [
                    'qui et sit',
                    'occaecati facere temporibus',
                  ],
                  id: '44',
                  href: '#',
                },
              ],
            },
            {
              label: 'Konferenzbeiträge',
              data: [
                {
                  value: '1 qui reiciendis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  id: '19',
                  href: '#',
                },
                {
                  value: '2 quia quisquam',
                  attributes: [
                    'quae laudantium expedita',
                    'maxime omnis accusamus',
                  ],
                  id: '28',
                  href: '#',
                },
                {
                  value: '3 qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  id: '29',
                  href: '#',
                },
              ],
            },
          ],
        },
        {
          label: 'Film/Video',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
        {
          label: 'Audio',
          visible: true,
          data: [
            {
              value: 'sed et',
              attributes: [
                'est quos sed',
                'sed molestiae veritatis',
              ],
              id: '5',
              href: '#',
            },
            {
              value: 'quis quis',
              attributes: [
                'non possimus possimus',
                'nobis recusandae sed',
              ],
              id: '20',
              href: '#',
            },
            {
              value: 'mollitia quo',
              attributes: [
                'non magnam eius',
                'harum exercitationem non',
              ],
              id: '48',
              href: '#',
            },
          ],
        },
        {
          label: 'Preise und Stipendien',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
        {
          label: 'Konferenzen & Symposien',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
      ],
    };
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
