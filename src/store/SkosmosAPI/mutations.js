/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  setLoading(s, msg) {
    s.loading = true;
    s.loadmsg = msg;
  },
  setLoadingFinished(s) {
    s.loading = false;
    s.loadmsg = 'inactive';
  },
  setApiLib(s, lib) {
    if (lib) {
      s.apilib = lib;
    }
  },
  setVocab(s, { uri, id }) {
    if (uri && id) {
      s.vocabs[id] = uri;
    }
  },
  setLang(s, lang) {
    if (lang) s.lang = lang;
  },
};
