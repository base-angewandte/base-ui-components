import { computed, getCurrentInstance, ref } from 'vue';

/**
 * component internal i18n functionality, will check if plugin exists
 *  and utilize its functions if present
 * @param {Ref<String>} [language] - provide the currently set locale here
 * @returns {{setLangLabels: (function(string, string[]): {}), getLangLabel: ((function((string|Object), boolean=): (Object|string))|*), getI18nTerm: ((function(string, number=, Object=): string)|*)}}
 */
export function useI18n(language) {
  // in order to check for i18n we need to access the app instance app context
  const { app } = getCurrentInstance().appContext;
  const i18n = ref(null);
  const t = ref(null);
  const te = ref(null);
  const langInt = ref(language);
  /**
   * now we can use it to determine if i18n functionality is available
   * @type {ComputedRef<any|boolean>}
   */
  const hasI18n = computed(() => {
    const i18nEnabled = Boolean(app?.__VUE_I18N__);
    // if the __VUE_I18N__ variable is set - return the global $i18n variable
    if (i18nEnabled) {
      // if i18n is present in the app set all the necessary
      // functionalities (the i18n instance and the translation
      // methods that are stored separately in globalProperties
      i18n.value = app.config.globalProperties.$i18n;
      t.value = app.config.globalProperties.$t;
      te.value = app.config.globalProperties.$te;
      if (!app.config.globalProperties.$i18n) {
        console.warn('$i18n was not found! make sure the plugin is enabled!');
      }
    }
    // make sure i18n was available in globalProperties
    return !!i18n.value && i18nEnabled;
  });

  /**
   * get the i18n term from json files present in your project - this works exactly like
   * vue-i18n except that the count variable can not be skipped if you want to use
   * named formatting
   *
   * @param {string} key - your locale file key
   * @param {number} [count=-1] - your count number for pluralization
   * @param {object} [variables={}] - your object for named formatting - object property needs
   *  to be named like the localization file variable
   *  (https://kazupon.github.io/vue-i18n/guide/formatting.html)
   * @returns {string}
   */
  function getI18nTerm(key, count = -1, variables = {}) {
    if (!key) return '';
    if (hasI18n.value && te.value(key)) {
      if (count >= 0) {
        return t.value(key, count, variables);
      }
      return t.value(key, variables);
    }
    const termPath = key.split('.');
    return termPath.pop() || key;
  }

  /**
   * function to provide an object with translations for all available languages
   * @param {string} key - the locale file key
   * @param {string[]} locales - an array of available locales
   * @returns {Object}
   */
  function setLangLabels(key, locales) {
    return locales
      .reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: hasI18n.value
            ? t.value(key, curr) : key.split('.').pop()
        };
      }, {});
  }

  /**
   * function to
   * a) check if provided value is a language object and if yes
   * b) get the correct label from an object with language (ISO 639-1) as property
   *    (e.g. { de: 'yyy', en: 'xxx' })
   * @param {string|Object} value - the string or object to be processed
   * @param {boolean} [useAny=false] - specify if a label in a different language should be used
   *  if the currently set language has no result
   * @returns {Object|string}
   */
  function getLangLabel(value, useAny = false) {
    const langToUse = hasI18n.value
      ? langInt.value || i18n.value.locale : langInt.value;
    if (typeof value === 'string') return value;
    if (value && langToUse && value[langToUse]) {
      return value[langToUse];
    }
    if (value && langToUse && useAny) {
      const availableLang = Object.keys(value).find(key => !!value[key]);
      // return the first one that has content
      return value[availableLang] || value[langToUse] || '';
    }
    return value;
  }

  return {
    getI18nTerm,
    setLangLabels,
    getLangLabel,
  };
}
