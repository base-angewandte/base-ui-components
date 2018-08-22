<template>
  <div>
    <h1 class="demo-header">Portfolio Component Demo</h1>
    <div class="demo-section">
      <h3 class="demo-section-header">Base Chips Input</h3>
      <div class="component-description">
        <h4 class="demo-subsection-header">Component Description</h4>

        <h5 class="description-title">Properties</h5>
        <h5 class="description-title">Events</h5>
        <h5 class="description-title">Slots</h5>
      </div>
      <div class="component-demo">
        <h4 class="demo-subsection-header">Component Demo</h4>
        <div class="component-demo-body">
          <div class="form-field">
            <base-chips-input
              :list="[
                '...alle Verhältnisse umzuwerfen',
                'in denen der Mensch',
                'ein erniedrigtes, ein geknechtetes',
                'ein verlassenes, ein verächtliches',
                'Wesen ist']"
              :label="'multiselect chips input with string array'"
              :placeholder="'Select Your Marx'"
              :allow-multiple-entries="true"/>
            <base-chips-input
              :list="[
                { title: '...alle Verhältnisse umzuwerfen',
                  additional: 'part1', remark: '***' },
                { title: '...alle Verhältnisse umzuwerfen',
                  additional: 'part1', remark: '**' },
                { title: '...alle Verhältnisse umzuwerfen',
                  additional: 'part1', remark: '*' },
                { title: 'in denen der Mensch' },
                { title: 'ein erniedrigtes, ein geknechtetes' },
                { title: 'ein verlassenes, ein verächtliches' },
                { title: 'Wesen ist' }]"
              :placeholder="'Select your Marx'"
              :label="'single choice with special drop down body'"
              :allow-multiple-entries="false">
              <!-- TODO: should allow to add custom-class! -->
              <template
                slot="drop-down-entry"
                slot-scope="props">
                <span>{{ props.item.title }}</span>
                <span id="chips-additional">{{ props.item.additional }}</span>
                <span id="chips-remark">{{ props.item.remark }}</span>
              </template>
            </base-chips-input>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BaseChipsInput from './BaseChipsInput';

export default {
  components: {
    BaseChipsInput,
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables";

  .demo-header {
    text-align: center;
    margin: 32px;
  }

  .demo-section {

    .demo-section-header {
      padding: 16px;
    }

    .demo-subsection-header {
      padding: 16px;
    }

    .component-description {
      .description-title {
        font-size: 19px;
        font-weight: normal;
        font-style: italic;
        padding: 16px;
      }
    }

    .component-demo-body {

    }
  }

  #chips-additional {
    padding-left: 16px;
    font-size: 14px;
    color: $font-color-second;
  }

  #chips-remark {
    float: right;
  }
</style>
