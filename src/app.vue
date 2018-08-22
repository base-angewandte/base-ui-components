<template>
  <div id="app">
    <demo />
  </div>
</template>

<script>
import Demo from './components/Demo';

export default {
  name: 'App',
  components: {
    Demo,
  },
};
</script>

<style lang="scss">
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

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }
</style>
