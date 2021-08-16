<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto 1000px; padding: 16px;">
    <div
      style="margin: 20px 0; padding: 16px; background-color: #fff;">
      <h2>Skills</h2>
      <BaseLink
        value="Teaching"
        :tooltip="[]">
        <template v-slot:tooltip>
          asdf
        </template>
      </BaseLink>

      <BaseLink
        value="Research"
        source="V7d8e854gge"
        type="skill" />

      <br><br>
      <h2>Contributors</h2>

      <template
        v-for="(contributor, index) in contributors">
        <BaseLink
          :key="index"
          :url="contributor.url"
          :value="contributor.value"
          :source="contributor.source"
          :tooltip="contributor.tooltip"
          :tooltip-async="contributor.additional"
          :type="contributor.type"
          @tooltipClicked="asyncTooltip($event, index)" />
        <!-- eslint-disable -->
        <template v-if="index !== contributors.length - 1">, </template>
        <!-- eslint-enable -->
      </template>

      <br><br>

      <BaseTextList
        render-label-as="h2"
        :data="baseTextList" />

      <br>
      <BaseTextList
        render-label-as="h2"
        :data="baseTextListLabels">
        <template slot="tooltip">
          tbd
        </template>
      </BaseTextList>
    </div>

    <div>
      <BaseExpandList
        ref="baseExpandList"
        :data="baseExpandList">
        <template
          v-slot:content="props">
          <BaseLink
            :url="props.data.url"
            :value="props.data.value"
            :source="props.data.source"
            :space-after="!!props.data.additional"
            :tooltip="props.data.additional"
            :type="props.data.type" />
          <!-- eslint-disable -->
          <template v-if="props.data.attributes"> - {{ props.data.attributes.join(', ') }}</template>
          <!-- eslint-enable -->
        </template>
      </BaseExpandList>
    </div>
  </div>
</template>

<script>
import BaseLink from '@/components/BaseLink/BaseLink';
import BaseTextList from '@/components/BaseTextList/BaseTextList';
import BaseExpandList from '@/components/BaseExpandList/BaseExpandList';

export default {
  name: 'App',
  components: {
    BaseLink,
    BaseTextList,
    BaseExpandList,
  },
  data() {
    return {
      baseExpandList: [
        {
          label: 'Monographien',
          hidden: false,
          data: [
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
                {
                  label: 'label',
                  value: 'value',
                },
                {
                  label: 'label',
                  value: 'value',
                },
              ],
            },
            {
              value: 'qui nesciunt officiis quisquam officiis',
              attributes: [
                'rerum corporis voluptatibus',
                'beatae occaecati non',
              ],
              source: 'asdfasdf',
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
      ],
      baseTextListLabels: [
        {
          label: 'all with labels',
          data: [
            {
              label: 'label',
              value: 'value',
              additional: [
                {
                  label: 'GND',
                  value: '1036440591',
                  url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
                },
                {
                  label: 'ORCID',
                  value: '0000-0003-2731-3077',
                  url: 'https://orcid.org/0000-0003-2731-3077',
                },
              ],
            },
            {
              label: 'label',
              value: 'value',
              url: '/#',
            },
            {
              label: 'label',
              value: 'value',
              url: '/#',
            },
          ],
        },
      ],
      baseTextList: [
        {
          label: 'without labels',
          data: [
            {
              value: 'additional info in toolip',
              additional: [
                {
                  label: 'GND',
                  value: '1036440591',
                  url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
                },
                {
                  label: 'ORCID',
                  value: '0000-0003-2731-3077',
                  url: 'https://orcid.org/0000-0003-2731-3077',
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
            {
              value: 'just value',
            },
          ],
        },
      ],
      contributors: [
        {
          value: 'Shorty',
          additional: [
            {
              label: 'GND',
              value: '1036440591',
              url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
            },
            {
              label: 'ORCID',
              value: '0000-0003-2731-3077',
              url: 'https://orcid.org/0000-0003-2731-3077',
            },
          ],
        },
        {
          value: 'David Blandy',
          url: 'https:/base.uni-ak.ac.at',
        },
        {
          value: 'Irene Cassini',
          source: 'irene.cassini',
        },
        {
          value: 'Justine A. Chambers',
          additional: [
            {
              label: 'GND',
              value: '1036440591',
              url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
            },
            {
              label: 'ORCID',
              value: '0000-0003-2731-3077',
              url: 'https://orcid.org/0000-0003-2731-3077',
            },
          ],
        },
        {
          value: 'Jerome Morrow',
        },
        {
          value: 'Vincent Freeman',
          additional: [
            {
              label: 'GND',
              value: '1036440591',
              url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
            },
            {
              label: 'ORCID',
              value: '0000-0003-2731-3077',
              url: 'https://orcid.org/0000-0003-2731-3077',
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    async asyncTooltip(value, index) {
      setTimeout(() => {
        this.$set(this.contributors[index], 'tooltip', [
          {
            label: 'GND',
            value: '1036440591',
            url: 'https://portal.dnb.de/opac.htm?method=simpleSearch&cqlMode=true&query=nid%3D1036440591',
          },
          {
            label: 'ORCID',
            value: '0000-0003-2731-3077',
            url: 'https://orcid.org/0000-0003-2731-3077',
          },
        ]);
      }, 100);
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

.base-advanced-search {
  margin-top: 32px;
}

.activity-showcase {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-showcase__header {
  font-size: $font-size-regular;
  margin: 0 0 0 $spacing;
}

.activity-showcase-after {
  display: flex;
}

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
