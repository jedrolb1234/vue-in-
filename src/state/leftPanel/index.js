export default {
  state() {
    return {
      isHidden: false
    }
  },
  mutations: {
    toogle(state) {
      state.isHidden=!state.isHidden;
    }
  },
  actions: {
    toogleLeftPanel(context) {
      context.commit('toogle');
    }
  },
  getters: {
    isLeftPanelHidden(state) {
      return state.isHidden;
    }
  }
};