<template>
  <div
    ref="loader"
    :style="{ ...position, ...{ '--loader-color': loaderColor } }"
    class="base-loader">
    <svg
      v-if="!hide"
      class="base-loader-circular">
      <circle
        class="base-loader-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="4"
        stroke-miterlimit="10" />
    </svg>
  </div>
</template>

<script>/**
 * Minimal loader component to be reused in other components
 */
import { ref, watch } from 'vue';
import { useAnnouncer } from '@/composables/useAnnouncer';

export default {
  name: 'BaseLoader',
  props: {
    /**
     * define a color for the loader
     */
    loaderColor: {
      type: String,
      default: '',
    },
    /**
     * add positional properties like for a style object
     */
    position: {
      type: Object,
      default: () => ({}),
    },
    /**
     * set this to `true` if you want to keep element (with height and width) but dont
     * want the loader to show
     */
    hide: {
      type: Boolean,
      default: false,
    },
    /**
     * define a text that should be read as soon as loader appears
     */
    textOnLoaderShow: {
      type: String,
      default: 'loading',
    },
  },
  setup(props) {
    /**
     * set up a reference to the element to be able to attach the announcements element
     * @type {Ref<UnwrapRef<null|HTMLElement>>}
     */
    const loader = ref(null);
    /**
     * timeout variable to only set announcement after a certain time passed
     * @type {Ref<UnwrapRef<null|number>>}
     */
    const timeout = ref(null);
    /**
     * insert an HTML element with aria-live assertive that will announce the
     * loading process
     */
    const { announcement } = useAnnouncer(loader);

    /**
     * function called on changes to the loader element or prop `hide`
     * announcing the text set in prop `textOnLoaderShow`
     */
    function setLoaderAnnouncement() {
      // first check if loader is now present and not hidden
      if (loader.value && !props.hide) {
        // if so need to be working with a timeout here so the announcement
        // is not overwritten by later actions
        if (timeout.value) {
          clearTimeout(timeout.value);
          timeout.value = null;
        }
        timeout.value = setTimeout(() => {
          // now check again if element is still visible
          if (loader.value && !props.hide) {
            // if yes - make loading announcement
            announcement.value = props.textOnLoaderShow;
          }
        }, 1000);
      }
    }

    // watch the element to add the text as soon as it is rendered
    // (other option: prop `hide` is set true - this needed to be handled
    // in options API since watcher not triggering here)
    watch(loader, () => {
      setLoaderAnnouncement();
    });
    return {
      loader,
      announcement,
      setLoaderAnnouncement,
    };
  },
  data() {
    return {
      timeout: null,
    };
  },
  watch: {
    /**
     * for some reason in frontend setup watcher did not trigger for prop `hide`
     * so added it here
     */
    hide() {
      this.setLoaderAnnouncement();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-loader{
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;

    .base-loader-circular{
      animation: rotate 2s linear infinite;
      height: 100px;
      position: relative;
      width: 100px;

      .base-loader-path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        animation:
          dash 1.5s ease-in-out infinite;
        stroke: var(--loader-color, $app-color);
        color: var(--loader-color, $app-color);
      }
    }
  }

  @keyframes rotate{
    100%{
      transform: rotate(360deg);
    }
  }

  @keyframes dash{
    0%{
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50%{
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100%{
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
</style>
