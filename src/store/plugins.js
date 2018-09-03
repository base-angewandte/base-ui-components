/* eslint-disable arrow-parens */
/* eslint-disable default-case */
/* eslint-disable no-underscore-dangle */
import {
  STORAGE_KEY,
  SESSION_ID,
} from './index';
import HELPERS from '../helpers';

// helper for checking error code for full storage
function isQuotaExceeded(e) {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}


// helper function for filtering for properties that need to be persistent.
function filterForPersistantProperties(stateObj) {
  const result = {};
  const modules = Object.keys(stateObj);
  // const values = Object.values(stateObj); // obj: {name: value }
  for (let k = 0; k < modules.length; k += 1) {
    result[modules[k]] = {};
    const m = stateObj[modules[k]];
    const p = m.p || [];
    for (let i = 0; i < p.length; i += 1) {
      result[modules[k]][p[i]] = m[p[i]];
    }
  }
  return result;
}

const localStoragePlugin = store => {
  let localStorage;
  try {
    localStorage = window.localStorage;
  } catch (e) {
    store.commit('n3/updateStorageStatus', false);
  }
  if (localStorage) {
    store.subscribe((mutation, state) => {
      const triggerMutations = ['n3/stopProcessing', 'JSONschema/setEntry', 'JSONschema/setSchema'];
      if (triggerMutations.indexOf(mutation.type) > -1) {
        const pState = filterForPersistantProperties(state);
        const currentStore = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
        const now = Date.now();
        currentStore[SESSION_ID] = { pState,
          date: now,
          dateString: HELPERS.methods.dateToString(new Date(now)),
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStore));
          store.commit('n3/updateStorageStatus', true);
        } catch (e) {
          if (isQuotaExceeded(e)) {
            store.commit('n3/updateStorageStatus', false);
            // Storage full, maybe notify user or do some clean-up
          }
          store.commit('n3/updateStorageStatus', false);
        }
      }
    });
  }
};

export default [localStoragePlugin];
