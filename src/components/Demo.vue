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
          <template
            slot="drop-down-entry"
            slot-scope="props">
            <span>{{ props.item.title }}</span>
            <span id="chips-additional">{{ props.item.additional }}</span>
            <span id="chips-remark">{{ props.item.remark }}</span>
          </template>
        </base-chips-input>
        <base-chips-input
          :list="dropDownInput"
          :label="`Multiselect with dynamically fetched options and
          the option to change selected from outside`"
          :placeholder="'Select Your Marx'"
          :selected-list="chipsInput"
          :allow-multiple-entries="true"
          :allow-dynamic-drop-down-entries="true"
          @fetchDropDownEntries="fetch"/>
        <base-button
          text="change input"
          @clicked="changeInput" />
      </div>
    </demo-section>
  </div>
</template>

<script>
import axios from 'axios';
import BaseChipsInput from './BaseChipsInput';
import BaseButton from './BaseButton';
import DemoSection from './DemoSection';
import { COMPONENT_DATA } from '../assets/data/component-data';

export default {
  components: {
    BaseChipsInput,
    BaseButton,
    DemoSection,
  },
  data() {
    return {
      componentInfo: COMPONENT_DATA,
      chipsInput: [],
      dropDownInput: [],
    };
  },
  methods: {
    changeInput() {
      const index = Math.floor((Math.random() * 10) + 1);
      this.chipsInput = ['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'].splice(index, 2);
    },
    async fetch(string) {
      if (!string || string.length > 3) {
        const result = await axios.get('http://localhost:9900/fetch', {
          params:
            {
              string,
            },
        });
        this.dropDownInput = result.data;
      }
    },
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
