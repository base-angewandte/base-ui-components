## Demo

BaseNotification is a plugin based on [vue3-notification](https://github.com/kyvg/vue3-notification).
Use it by adding the plugin on app initialization:

```javascript
import { createApp } from 'vue';
import App from '@/App.vue';
import {
  BaseNotifications,
} from 'base-ui-components';

const app = createApp(App);
app.use(BaseNotifications);
app.mount('#app');
```

The plugin can then be triggered with `$notifiy(options)`.

```vue live
<template>
  <div>
    <BaseNotification
      :has-header="false" />
    <BaseButton
      text="Trigger Notification"
      @clicked="triggerNotification" />
  </div>
</template>
<script>
export default {
  methods: {
    triggerNotification() {
      this.$notify({
        group: 'request-notifications',
        title: 'Something went wrong!!',
        text: 'This is how your error notification will look like.',
        type: 'error',
        duration: 1000,
      });
    },
  },
};
</script>
```
