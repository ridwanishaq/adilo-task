import { createStore } from "vuex";

const loadSettings = () => {
  return JSON.parse(localStorage.getItem('preferredSettings')) || {};
};

export default createStore({
  state: {
    preferredSettings: loadSettings(),
  },
  getters: {
    getPreferredSettings: (state) => state.preferredSettings,
  },
  mutations: {
    setPreferredSettings(state, settings) {
      state.preferredSettings = settings;
      localStorage.setItem('preferredSettings', JSON.stringify(settings));
    },
  },
  actions: {
    updatePreferredSettings({ commit }, settings) {
      commit('setPreferredSettings', settings);
    },
  },
});
