```vue
<template>
  <div class="container">
    <div 
      class="hover-box"
      @mouseenter="show($event)"
      @mousemove="move($event)"
      @mouseleave="showBox = false">Hover Me</div>
    <base-hover-box
      ref="hoverBox"
      :boxText="['Info Number 1', 'Info Number 2']"
      title="An Example"
      subtext="Subtext"
      :class="['box', { 'hidden': !showBox }]"/>
</div>
</template>

<script>
export default {
  data() {
    return {
      showBox: false,
    };
  },
  methods: {
    show(e) {
      this.showBox = true;
      this.$refs.hoverBox.setPosition(e.layerX, e.layerY);

    },
    move(e) {
      this.$refs.hoverBox.setPosition(e.layerX, e.layerY);
    },
  },
};
</script>

<style>
  .container {
    position: relative;
  }
  
  .box {
    visibility: visible;
  }
  
  .hover-box {
    height: 100px;
    width: 100px;
    background-color: cornflowerblue;
  }
  
  .hidden {
    visibility: hidden;
  }
</style>

```
