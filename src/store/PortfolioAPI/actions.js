import * as Api from './api';

const $config = {
  withCredentials: true,
};

export default {
  init({ commit, dispatch }, config) {
    const p = [];
    return new Promise((resolve, reject) => {
      if (![
        'baseURL',
      ].every(opt => Boolean(config[opt]))) {
        // TODO: we need to have some overall error handling to inject here
        reject(new Error('baseURL is required in the config object.'));
      }
      Api.setDomain(config.baseURL);
      commit('setApiLib', Api);
      p.push(dispatch('fetchSchemas'));
      p.push(dispatch('fetchUser'));
      Promise.all(p).then((res) => {
        console.log(res);
      }).catch(err => reject(err));
    });
  },
  fetchSchemas({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', 'Fetching available Schemas');
      state.apilib.api_v1_jsonschema_list({ $config }).then((res) => {
        commit('setSchemas', res.data);
        commit('setLoadingFinished', 'Fetching available Schemas finished');
        resolve(res.data);
      }).catch((error) => {
        commit('setLoadingFinished', 'Error while fetching available Schemas');
        reject(error);
      });
    });
  },
  fetchUser({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', 'Fetching User Data');
      state.apilib.api_v1_user_read({ $config }).then((res) => {
        commit('setUser', res.data);
        commit('setLoadingFinished', 'Fetching User Data finished');
        resolve(res.data);
      }).catch((error) => {
        commit('setLoadingFinished', 'Error while fetching User Data');
        reject(error);
      });
    });
  },
  errorHandler({ state }, error) {
    // TODO: how do we want to handle error notifications?
    // it's probably better to let the component decide what to do with an error
    console.log(state, error);
  },
};
