<template>
  <div id="app">
    <div style="max-width: 1400px; margin: 20px auto;">
      <BaseExpandBox>
        <BaseTextList
          render-label-as="h2"
          :data="baseTextList"
          :cols2="false" />
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
    <div style="max-width: 1400px; margin: 20px auto;">
      <BaseExpandBox
        :auto-height="true">
        <BaseTextList
          render-label-as="h2"
          :cols2="true"
          :data="baseTextList2" />
      </BaseExpandBox>
    </div>

    <div style="max-width: 1400px; margin: 20px auto;">
      <BaseExpandBox
        :auto-height="true">
        <BaseTextList
          render-label-as="h2"
          :label-margin-bottom="true"
          :cols2="true"
          :data="baseTextListSingle" />
      </BaseExpandBox>
    </div>
  </div>
</template>

<script>
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseTextList from '@/components/BaseTextList/BaseTextList';

export default {
  name: 'App',
  components: {
    BaseExpandBox,
    BaseButton,
    BaseTextList,
  },
  data() {
    return {
      baseTextListSingle: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
        },
      ],
      baseTextList: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum.`,
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
      baseTextList2: [
        {
          label: 'Vero eos et accusam',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.

          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          `,
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
  computed: {
  },
  watch: {
  },
  methods: {

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
    display:block;
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
    height: 50px;
  }
</style>
