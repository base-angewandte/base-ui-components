## Demo

BaseNotification is a plugin based on [vue3-notification](https://github.com/kyvg/vue3-notification).
Use it by adding the plugin on app initialization:

```javascript
import { createApp } from 'vue';
import App from '@/App.vue';
import {
  BaseNotificationsPlugin,
} from 'base-ui-components';

const app = createApp(App);
app.use(BaseNotificationsPlugin);
app.mount('#app');
```

The plugin can then be triggered with `$notify(options)` in Options API.

```vue live
<template>
  <div>
    <BaseNotification
      :has-header="false"/>
    <BaseButton
      text="Trigger Notification"
      @clicked="triggerNotification"/>
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

In Composition API it can be triggered with `notify(options)` from the useNotifications composable.
```vue
<script setup>
  import { useNotifications } from 'base-ui-components';

  const { notify } = useNotifications();

  function triggerNotification() {
    notify({
      group: 'request-notifications',
      title: 'Something went wrong!!',
      text: 'This is how your error notification will look like.',
      type: 'error',
      duration: 1000,
    });
  }
</script>
```

## Using in Nuxt setup


Add the `BaseNotificationsPlugin` to make the `BaseNotification` component globally available in your Nuxt frontend.

```js
import { BaseNotificationsPlugin } from 'base-ui-components';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BaseNotificationsPlugin);
  // in case you want to expose the $notify method add:
  const notify = nuxtApp.vueApp.config.globalProperties.$notify;
  return {
    provide: {
      notify,
    }
  };
});
```

Add the component to your app

```vue
<template>
  <div>
    <BaseNotification
      :has-header="false" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```
