import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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
        this.enableBodyScrollIosSafari();
      }
    },
  },
  methods: {
    disableBodyScrollIosSafari() {
      const scrollY = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    },
    enableBodyScrollIosSafari() {
      const scrollY = parseInt(document.body.style.top, 10) * -1;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    },
  },
  updated() {
    this.targetElement = this.$refs[this.targetName];
    if (this.targetElement) {
      if (this.showInt) {
        disableBodyScroll(this.targetElement);
        this.disableBodyScrollIosSafari();
      } else {
        enableBodyScroll(this.targetElement);
        this.enableBodyScrollIosSafari();
      }
    }
  },
  destroyed() {
    clearAllBodyScrollLocks();
    this.enableBodyScrollIosSafari();
  },
};
