<script setup>
import { ref } from 'vue';
import { withBase } from 'vitepress'

const currentlyUsedApps = ref([
  {
    name: 'Showroom',
    icon: 'showroom.svg',
    link: 'https://portfolio-showroom.ac.at/',
  },
  {
    name: 'Portfolio',
    icon: 'portfolio.svg',
    link: 'https://portfolio-showroom.ac.at/',
  },
  {
    name: 'Image',
    icon: 'image.svg',
    link: 'https://imageplus.at/',
  },
]);
</script>

<template>
  <div
    class="home-below">
    <p
      class="home-below__text">
      Currently put to use in the following base Applications:
    </p>
    <div
      class="home-below__apps">
      <a
        v-for="app in currentlyUsedApps"
        :key="app.name"
        :href="app.link"
        class="home-below__app-link">
        <img
          :src="withBase(app.icon)"
          :alt="app.name"
          class="home-below__app-icon">
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-below {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // to have same padding as rest of app
  padding: 48px;

  @media (max-width: $mobile) {
    // to have same padding as rest of app
    padding: 24px;
  }

  .home-below__text {
    font-size: $font-size-large;
    font-weight: 600;
    color: $font-color-second;
    text-align: center;
  }

  .home-below__apps {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: $spacing-large;

    .home-below__app-link {
      padding: $spacing;
      display: block;
      border: 1px solid transparent;
      border-radius: 12px;
      height: 100%;
      -webkit-transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s;
      transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s;

      &:hover {
        box-shadow: $box-shadow-hov;
      }

      &:active, &:focus {
        border: 1px solid var(--app-color);
      }

      &:active {
        border: 1px solid var(--app-color-secondary);
      }

      & + .home-below__app-link {
        margin-left: $spacing-large;
      }

      .home-below__app-icon {
        height: 96px;
        width: 96px;
      }
    }
  }
}
</style>
