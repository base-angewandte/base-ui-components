/* eslint-disable-next-line */
export const setLanguageMixin = {
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
  },
};
