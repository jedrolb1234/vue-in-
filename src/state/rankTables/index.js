export default {
  state() {
    return {
        warcabyHidden: false,
        statkiHidden: false,
        polacz4Hidden: false,
        isLoading: false
      }
  },
  mutations: {
        isWarcabyHidden(state) {
          state.warcabyHidden = !state.warcabyHidden;
        },
        isStatkiHidden(state) {
          state.statkiHidden = !state.statkiHidden;
        },
        isPolacz4Hidden(state) {
          state.polacz4Hidden = !state.polacz4Hidden;
        }
    },
  actions: {
    toogleWarcabyTable(context){
        context.commit('isWarcabyHidden');
    },
    toogleStatkiTable(contex){
        contex.commit('isStatkiHidden');
    },
    tooglePolacz4Table(contex){
        contex.commit('isPolacz4Hidden');
    }
  },
  getters: {
    warcabyTable(state) {
      return state.warcabyHidden;
    },
    statkiTable(state) {
      return state.statkiHidden;
    },
    polacz4Table(state) {
      return state.polacz4Hidden;
    },
    isLoading(state){
      return state.isLoading;
    }
  }
};