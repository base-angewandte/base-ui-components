import Notifications from '@kyvg/vue3-notification';
import BaseNotification from '@/components/BaseNotification/BaseNotification.vue';

const BaseNotifications = {
  install(app) {
    app.use(Notifications);
    app.component('BaseNotification', BaseNotification);
  },
};

export default BaseNotifications;
