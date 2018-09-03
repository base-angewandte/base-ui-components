import * as api from './mock_api';

api.setDomain('https://portfolio.acdh-dev.oeaw.ac.at/api/v1');


const state = {
  apilib: api,
  loading: false,
  loadmsg: '',
  schemas: {},
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
  schema: s => name => s.schemas[name],
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
  setSchema(s, { type, attributes }) {
    if (type && attributes) {
      s.schemas[type] = attributes;
    }
  },
};

const actions = {
  init({ state, commit }) {
    commit('setLoading', 'Loading Database Configuration.');
    state.apilib.get( { $config } ).then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const sa = res.data.data;
        for (let i = 0; i < sa.length; i++) {
          commit('setSchema', sa[i]);
        }
        commit('setLoadingFinished');
      }
    });
  },
  get({ state, commit }, { type, id, sort, skip, limit, query, populate }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Getting ${type} ${id} from Database`);
        p = state.apilib[`get${t}ById`]({ id, $config });
      } else if (type && !id) {
        commit('setLoading', `Getting Queryset of ${type} from Database`);
        p = state.apilib[`get${t}`]({ sort, skip, limit, query, populate, $config });
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
  post({ state, commit }, { type, id, body }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Updating ${type} ${id} to Database`);
        p = state.apilib[`post${t}ByID`]({ id, [type]: body, $config });
      } else if (type && !id) {
        commit('setLoading', `Creating a ${type} in Database`);
        p = state.apilib[`post${t}`]({ [type]: body, $config });
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
  delete({ state, commit }, { type, id }) {
    let p = {};
    let t = type.charAt(0).toUpperCase() + type.slice(1);
    return new Promise((resolve, reject) => {
      if (type && id) {
        commit('setLoading', `Deleting ${type} ${id} in Database`);
        p = state.apilib[`delete${t}ByID`]({ id });
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
