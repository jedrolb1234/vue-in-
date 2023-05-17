export default {
  state() {
    return {
      isHidden: true
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