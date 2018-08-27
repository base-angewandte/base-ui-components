<template>
  <div>
    <h1 class="demo-header">Portfolio Component Demo</h1>
    <demo-section
      :properties="componentInfo.baseChipsInput.properties"
      :events="componentInfo.baseChipsInput.events"
      :slots="componentInfo.baseChipsInput.slots"
      title="Base Chips Input">
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
    </demo-section>
  </div>
</template>

<script>
import BaseChipsInput from './BaseChipsInput';
import DemoSection from './DemoSection';
import { COMPONENT_DATA } from '../assets/data/component-data';

export default {
  components: {
    BaseChipsInput,
    DemoSection,
  },
  data() {
    return {
      componentInfo: COMPONENT_DATA,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables";

  .demo-header {
    text-align: center;
    margin: 32px;
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
