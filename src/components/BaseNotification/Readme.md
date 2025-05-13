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

## Using in Nuxt setup

Please note that the [vue3-notification](https://github.com/kyvg/vue3-notification) library does not inherently support Nuxt 3.<br>
To enable compatibility with Nuxt 3, use the [nuxt3-notification](https://github.com/windx-foobar/nuxt3-notifications) wrapper.

Add package to your nuxt frontend
```shell
npm install nuxt3-notification
```

Rename the component name in your nuxt.config.js
```javascript
export default defineNuxtConfig({
  nuxtNotifications: {
    componentName: 'Notifications',
  },
});
```

Add the component to your app
```vue
<script setup>
import { BaseNotification } from 'base-ui-components';
</script>

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

The plugin can then be triggered with `notifiy(options)` from the useNotification composable.
```vue
<script setup>
  const { notify } = useNotification();

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
