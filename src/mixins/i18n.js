export default {
  computed: {
    hasI18n() {
      return Boolean(this.$i18n);
    },
  },
  methods: {
    getI18nTerm(term, count = -1) {
      if (this.hasI18n && this.$te(term)) {
        if (count >= 0) {
          return this.$tc(term, count);
        }
        return this.$t(term);
      }
      return null;
    },
    setLangLabels(key, locales) {
      return locales
        .reduce((prev, curr) => {
          this.$set(prev, curr, this.$i18n ? this.$t(key, curr) : key);
          return prev;
        }, {});
    },
  },
};
