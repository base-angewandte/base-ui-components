import * as api from './skosmos_api';

api.setDomain('https://voc.uni-ak.ac.at/skosmos/');


const state = {
  apilib: api,
  loading: false,
  loadmsg: '',
  vocabs: {},
};

const $config = {
  withCredentials: true
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */
const getters = {
  availableEndpoints: s => s.apilib.keys,
  f: s => name => s.apilib[name],
  vocab: s => name => s.vocabs[name],
  types: s => s.schemas.keys,
};

const mutations = {
  setConfig(s, config) {
    s.config = config;
  },
  setLoading(s, msg) {
    s.loading = true;
    s.loadmsg = msg;
  },
  setLoadingFinished(s) {
    s.loading = false;
    s.loadmsg = '';
  },
  setVocab(s, { uri, id }) {
    if (uri && id) {
      s.vocabs[id] = uri;
    }
  },
};

const actions = {
  init({ state, commit }) {
    commit('setLoading', 'Loading Database Configuration.');
    state.apilib.getVocabularies( { $config } ).then((res) => {
      if (res.data.vocabularies && res.data.vocabularies.length > 0) {
        const sa = res.data.vocabularies;
        for (let i = 0; i < sa.length; i++) {
          commit('setVocab', sa[i]);
        }
        commit('setLoadingFinished');
      }
    });
  },
  getSearch({ state, commit }, { query, lang, vocab, type, parent, group, maxhits, offset, unique }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (query) {
        commit('setLoading', `Getting ${type} ${id} from Database`);
        p = state.apilib.getSearch({query, lang, vocab, type, parent, group, maxhits, offset, unique, $config });
      } else reject('Invalid or Insufficient Parameters');
      p.then((res) => {
        commit('setLoadingFinished');
        resolve(res);
      })
      .catch((error) => {
        commit('setLoadingFinished');
        reject(error);
      });
    });
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
