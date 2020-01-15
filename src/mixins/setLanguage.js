/* eslint-disable-next-line */
export default {
  methods: {
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
    getI18nString(val, sub, valueObject) {
      const accessString = sub ? `${sub}.${val}` : val;
      if (this.$i18n && this.$te(accessString)) {
        return this.$t(accessString, valueObject);
      }
      return val;
    },
  },
};
