A basic example

```vue
<template>
  <div
  class="container">
    <base-button
      text="Click me"
      @clicked="showPopUp = true" />
    <base-pop-up
      :show="showPopUp"
      title="An Example Pop Up"
      button-right-text="Custom Submit"
      @close="showPopUp = false"
      @button-left="showPopUp = false"
      @button-right="action">
      <div class="body">Specify Content here</div>
    </base-pop-up>
</div>
</template>

<script>
export default {
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    action() {
      alert('Pop Up Action confirmed!');
    },
  },
};
</script>

<style>
  .container {
    position: relative;
  }

  .body {
    height: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

```
