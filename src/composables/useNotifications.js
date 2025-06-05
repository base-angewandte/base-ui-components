import { useNotification } from "@kyvg/vue3-notification";

/**
 * composable to trigger the BaseNotification component
 * @returns {{notify: {(args: (NotificationsOptions | string)): void, close(id: unknown): void}}}
 */
export function useNotifications() {
  const { notify }  = useNotification();

  return {
    notify,
  };
}
