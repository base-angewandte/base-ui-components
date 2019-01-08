import * as Api from './api';

const $config = {
  withCredentials: true,
};

export default {
  fetchSchemas({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', 'Loading available Schemas.');
      state.apilib.jsonschema_list({ $config }).then((res) => {
        resolve(res);
        // fetch all available schemas one by one - sensible?
      }).catch((error) => {
        // TODO: we need to have some overall error handling to inject here
        commit('setLoadingFinished');
        reject(error);
      });
    });
  },
  init({ commit, dispatch }, config) {
    return new Promise((resolve, reject) => {
      if (![
        'baseURL',
      ].every(opt => Boolean(config[opt]))) {
        // TODO: we need to have some overall error handling to inject here
        reject(new Error('baseURL is required in the config object.'));
      }
      Api.setDomain(config.baseURL);
      commit('setApiLib', Api);
      dispatch('fetchSchemas').then((res) => {
        resolve(res);
      });
    });
  },
};
