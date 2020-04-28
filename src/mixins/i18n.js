export default {
  computed: {
    hasI18n() {
      return Boolean(this.$i18n);
    },
  },
  methods: {
    getI18nTerm(term, count = -1, variables) {
      if (this.hasI18n && this.$te(term)) {
        if (count >= 0) {
          return this.$tc(term, count, variables);
        }
        return this.$t(term, variables);
      }
      const termPath = term.split('.');
      return termPath.pop();
    },
    setLangLabels(key, locales) {
      return locales
        .reduce((prev, curr) => {
          this.$set(prev, curr, this.$i18n ? this.$t(key, curr) : key.split('.').pop());
          return prev;
        }, {});
    },
    getLangLabel(value, useAny = false) {
      if (typeof value === 'string') return value;
      if (value && this.language && value[this.language]) {
        return value[this.language];
      }
      if (value && this.language && useAny) {
        const lang = Object.keys(value).find(key => !!value[key]);
        // return the first one that has content
        return value[lang] || value[this.language];
      }
      return value;
    },
  },
};
