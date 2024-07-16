import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

export default {
  data() {
    return {
      targetElement: null,
    };
  },
  watch: {
    showInt(val) {
      if (!val) {
        clearAllBodyScrollLocks();
      }
    },
  },
  updated() {
    this.targetElement = this.$refs[this.targetName];
    if (this.targetElement) {
      if (this.showInt) {
        disableBodyScroll(this.targetElement, { allowTouchMove: () => true });
      } else {
        enableBodyScroll(this.targetElement);
      }
    }
  },
  destroyed() {
    clearAllBodyScrollLocks();
  },
};
