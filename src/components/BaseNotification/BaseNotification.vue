<script setup>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

defineOptions({
  name: 'BaseNotification',
});

const props = defineProps({
  /**
   * time the notification is shown
   */
  duration: {
    type: Number,
    default: 4000,
  },
  /**
   * define if a header is present to display notification below that header
   *
   * if a header is present make sure the css variable `--header-height` is
   * set correctly!
   */
  hasHeader: {
    type: Boolean,
    default: true,
  },
});

// capitalize first letter of title
function notificationTitle(val) {
  return val.slice(0, 1).toUpperCase() + val.slice(1);
}
</script>

<template>
  <div
    :class="[
      'base-notification',
      { 'base-notification--no-base-header': !props.hasHeader }]">
    <div class="base-notification__wrapper">
      <Notifications
        :duration="props.duration"
        :width="'100%'"
        group="request-notifications"
        position="top right"
        animation-name="v-slide">
        <template
          #body="{ item, close }">
          <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions vuejs-accessibility/click-events-have-key-events -->
          <div
            role="alert"
            :class="[`base-notification__notification--${item.type}`, 'base-notification__notification']"
            @click="close">
            <BaseIcon
              v-if="item.type === 'error'"
              name="attention"
              class="icon base-notification__status-icon" />
            <BaseIcon
              v-else-if="item.type === 'success'"
              name="success"
              class="base-notification__status-icon" />
            <div class="base-notification__text">
              <h5
                class="base-notification__title">
                {{ notificationTitle(item.title) }}
              </h5>
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="base-notification__message"
                v-html="item.text" />
              <!-- eslint-enable -->
            </div>

            <button
              class="base-notification__close"
              @click="close">
              <BaseIcon
                name="remove"
                aria-labelledby="title"
                class="base-notification__icon" />
            </button>
          </div>
        </template>
      </Notifications>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;
@use "sass:map";

.base-notification {
  position: sticky;
  top: $header-height;
  z-index: map.get($zindex, notification);
  max-width: 100%;
  margin-top: $header-height;

  @media screen and (min-width: $tablet) {
    max-width: 450px;
  }

  &--no-base-header {
    margin-top: 0;
    top: 0;
  }

  &.fixed {
    position: fixed;
    top: $header-height;
  }

  .base-notification__wrapper {
    position: relative;

    :deep(.vue-notification-wrapper) {
      box-shadow: 0 3px 3px rgba(0, 0, 0, .05);
    }

    :deep(.vue-notification-group) {
      position: absolute;
    }
  }

  @media screen and (max-width: $mobile) {
    z-index: map.get($zindex, notification_mobile);
  }
}

.base-notification__notification {
  position: relative;
  padding: $spacing;
  background-color: white;
  font-size: $font-size-small;
  display: flex;
  align-items: center;
  border-left: 5px solid $app-color;
  border-top: 1px solid $button-header-color;

  .base-notification__text {
    flex-grow: 1;

    .base-notification__title {
      font-size: inherit;
      font-weight: 600;
    }

    .base-notification__message {
      word-break: break-word;
    }
  }

  .base-notification__close {
    margin: auto;
    cursor: pointer;
    flex-shrink: 0;

    .base-notification__icon {
      width: $icon-medium;
      max-height: $icon-medium;
      vertical-align: middle;
      margin-left: $spacing;
    }
  }

  .base-notification__status-icon {
    width: $icon-large;
    max-height: $icon-large;
    margin-right: $spacing;
    fill: $font-color-second;
    stroke: $font-color-second;
    flex-shrink: 0;
  }
}

.v-slide-enter-active,
.v-slide-leave-active,
.v-slide-move {
  transition: all 1s ease;
}

.slide-fade-enter, .v-slide-leave-to {
  background-color: transparent;
  opacity: 0;
}

.v-slide-leave-active {
  z-index: 0;
  position: absolute;
}
</style>
