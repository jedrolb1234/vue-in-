export default {
    state() {
      return {
        isLoading: true
      }
    },
    mutations: {
      loading(state) {
        state.isLoading=!state.isLoading;
      }
    },
    getters: {
      isLoading(state) {
        return state.isLoading;
      }
    }
  };