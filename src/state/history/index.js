export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
      itemsPerPage: 10,
      currentPage: 1,
      dynamigHeight:0,
      history:[
        {
          id:0,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:1,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:2,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'lose',
          points: 5
        },
        {
          id:3,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:4,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:5,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:6,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'lose',
          points: 5
        },
        {
          id:7,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:15,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:8,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:9,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'lose',
          points: 5
        },
        {
          id:10,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:11,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:12,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id:13,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'lose',
          points: 5
        },
        {
          id:14,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        }
      ]
    }
  },
  mutations: {
    loading(state) {
      state.isLoading=!state.isLoading;
    },
    previousPage(state){
      if (state.currentPage > 1){
        state.currentPage--;
      }
    },
    nextPage(state){
      if (state.currentPage < Math.ceil(state.history.length / state.itemsPerPage)){
        state.currentPage++;
      }
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    currentPage(state){
      let startIndex = (state.currentPage - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      let sliced = state.history.slice(startIndex, endIndex);           
      state.dynamicHeight = (10 - sliced.length ) * 38;
      return state.history.slice(startIndex, endIndex);     
    },
    pageNr(state){
      return state.currentPage;

    },
    allPages(state){
      return Math.ceil(state.history.length / state.itemsPerPage);
    },
    getHistory(state){
      return state.history;
    },
    getCurrentPage(state){
      return state.currentPage;
    },
    getItemsPerPage(state){
      return state.itemsPerPage
    },
    getDynamicHeight(state){
      return state.dynamicHeight;
    }
  },
  actions: {
    previousPage({ commit }) {
      commit('previousPage');
    },
    nextPage({ commit }) {
      commit('nextPage');
    },
    
  }
}
