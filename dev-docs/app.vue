<template>
  <div
    id="app"
    style="max-width: 900px; margin: 0 auto;">
    <base-edit-control
      title="Activities"
      :subtitle="`(${baseExpandList.filter(item => !item.hidden).length})`"
      :edit="editExpandList"
      @activated="activateExpandList"
      @canceled="cancelExpandList"
      @saved="saveExpandList" />

    <base-expand-list
      ref="baseExpandList"
      :data="editExpandList ? baseExpandList : baseExpandList.filter(item => !item.hidden)"
      :edit="editExpandList"
      @saved="saveExpandListEdit">
      <template
        v-slot:content="props">
        <a :href="props.data.href">{{ props.data.value }}</a>
      </template>
    </base-expand-list>
  </div>
</template>

<script>
// import axios from 'axios';
import BaseExpandList from '@/components/BaseExpandList/BaseExpandList';
import BaseEditControl from '@/components/BaseEditControl/BaseEditControl';

export default {
  name: 'App',
  components: {
    BaseEditControl,
    BaseExpandList,
  },
  data() {
    return {
      toggleList: false,
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
                  value: '1 qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  id: '29',
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
                // {
                //   label: 'Sammelbände',
                //   data: [
                //     {
                //       value: '1 qui reiciendis',
                //       attributes: [
                //         'rerum corporis voluptatibus',
                //         'beatae occaecati non',
                //       ],
                //       id: '19',
                //       href: '#',
                //     },
                //   ],
                // },
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
          hidden: false,
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
          hidden: false,
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
          hidden: false,
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
  computed: {},
  watch: {},
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

<style lang="scss">
@import "../src/styles/variables";

.dropdown-extended {
  border-top: $separation-line;
  padding: $spacing;

  .show-more-toggle {
    color: $app-color;
  }
}

.canvas {
  padding: 16px;
}

.flex {
  display: flex;
}

.row {
  max-height: 300px;
}

div > .base-box-button {
  margin: 8px;
}

button {
  display: block;
}

.popup-text {
  display: flex;
  align-items: flex-end;
}

.popup-text > div:first-of-type {
  margin-right: 16px;
}

.form-field {
  background-color: white;
  padding: 16px;
  margin-bottom: 32px;
}

.image-box {
  margin: 8px;
}

.multiline-dropdown {
  margin-bottom: -4px;
}

.spacer {
  height: 300px;
}

.result-box {
  margin-top: 8px;
  margin-bottom: 8px;
}

.result-box:nth-of-type(2n), .result-box:nth-of-type(3n) {
  margin-left: 16px;
}

.base-map {
  height: 400px;
}

.base-expand-row {
  margin: 16px;
}

.background {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.base-box {
  margin-right: 16px;
}

.base-box:nth-of-type(4n) {
  margin-right: 0;
}

.example-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.slide-move {
  transition: all .15s ease-out;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-#{$spacing});
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-#{$spacing});
}

.slide-leave-active {
  position: absolute;
  width: 100%;
  margin: auto;
  transition: opacity 0.15s ease, transform 0.3s ease;
}

.bounce-enter-active {
  opacity: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
