export default {
  computed: {
    /**
     * check if i18n plugin is available
     * @returns {boolean}
     */
    hasI18n() {
      return Boolean(this.$i18n);
    },
  },
  methods: {
    /**
     * get the i18n term from json files present in your project - this works exactly like
     * vue-i18n except that the count variable can not be skipped if you want to use
     * named formatting
     *
     * @param {string} key - your locale file key
     * @param {number} count - your count number for pluralization
     * @param {object} variables - your object for named formatting - object property needs
     *  to be named like the localization file variable
     *  (https://kazupon.github.io/vue-i18n/guide/formatting.html)
     * @returns {string}
     */
    getI18nTerm(key, count = -1, variables) {
      if (this.hasI18n && this.$te(key)) {
        if (count >= 0) {
          return this.$tc(key, count, variables);
        }
        return this.$t(key, variables);
      }
      const termPath = key.split('.');
      return termPath.pop() || key;
    },
    /**
     * function to provide an object with translations for all available languages
     * @param {string} key - the locale file key
     * @param {string[]} locales - an array of available locales
     * @returns {Object}
     */
    setLangLabels(key, locales) {
      return locales
        .reduce((prev, curr) => {
          this.$set(prev, curr, this.$i18n ? this.$t(key, curr) : key.split('.').pop());
          return prev;
        }, {});
    },
    /**
     * function to
     * a) check if provided value is a language object and if yes
     * b) get the correct label from an object with language (ISO 639-1) as property
     *    (e.g. { de: 'yyy', en: 'xxx' })
     * @param {string|Object} value - the string or object to be processed
     * @param {boolean} useAny - specify if a label in a different language should be used
     *  if the currently set language has no result
     * @returns {Object|string}
     */
    getLangLabel(value, useAny = false) {
      const language = this.hasI18n ? this.language || this.$i18n.locale : this.language;
      if (typeof value === 'string') return value;
      if (value && language && value[language]) {
        return value[language];
      }
      if (value && language && useAny) {
        const availableLang = Object.keys(value).find(key => !!value[key]);
        // return the first one that has content
        return value[availableLang] || value[language];
      }
      return value;
    },
  },
};
