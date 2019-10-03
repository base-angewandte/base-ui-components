<template>
  <div>
    <div
      v-for="item in data"
      :key="item.value">

      <BaseToggle
        ref="baseToggle"
        :name="name"
        :label="item.label"
        :checked="item.checked"
        type="radio"
        @clicked="updateCheckedStatus"
      />

    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseToggle from '../BaseToggle/BaseToggle';

/**
 * ToggleGroup Component <br>
 * Display group of radiobuttons
 */
export default {
  components: {
    SvgIcon,
    BaseToggle,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            value: 'value1',
            label: 'Label1',
          },
          {
            value: 'value2',
            label: 'Label2',
          },
        ];
      },
    },
    /**
     * specify a discriptive name <br>
     * this will not be displayed but is only there for usability purposes
     */
    name: {
      type: String,
      default: 'BaseToggleGroup',
    },
  },
  methods: {
    /**
     * Reset un-checked radiobutton s
     */
    updateCheckedStatus() {
      if (this.$refs.baseToggle.length > 1) {
        this.$refs.baseToggle.forEach((element) => {
          element.setCheckedInt(element.$el.querySelector('input').checked);
        });
      }
    },
  },
};
</script>
