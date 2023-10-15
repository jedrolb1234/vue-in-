import AxiosInstance from '@/mixins/axiosInstance';

export default {
  namespaced: true,
  state() {
    return {
      checkersHidden: true,
      battleShipHidden: true,
      connect4Hidden: true,
      itemsPerPage: 1,
      currentPageCheck: 1,
      currentPageWar: 1,
      currentPageC4: 1,
      checkersRank: [],
      checkersCount: 0,
      checkersPages: 0,
      battleShipRank: [],
      battleShipCount:0,
      battleShipPages: 0,
      connect4Rank: [],
      connect4Count: 0,
      connect4Pages:0,
    }
  },
  mutations: {
    isCheckersHidden(state) {
      state.checkersHidden = !state.checkersHidden;
    },
    isBattleShipHidden(state) {
      state.battleShipHidden = !state.battleShipHidden;
    },
    isConnect4Hidden(state) {
      state.connect4Hidden = !state.connect4Hidden;
    },
      previousPageC(state){
          state.currentPageCheck--;
      },
      previosuPageW(state){
        if (state.currentPageWar > 1){
          state.currentPageWar--;
        }
      },
      previousPageP(state){
        if (state.currentPageC4 > 1){
          state.currentPageC4--;
      }
    },
    setCheckers(state, value){
      state.checkersRank = value;
    },
    setBattleShip(state, value){
      state.battleShipRank = value;
    },
    setConnect4(state, value){
      state.connect4Rank = value;
    },
    nextPageC(state){
        state.currentPageCheck++;
    },
    nextPageW(state){
        state.currentPageWar++;
    },
    nextPageC4(state){
        state.currentPageC4++;
    },

    setCheckersCount(state, value){
      state.setCheckersCount = value;
    },
    setCheckersPages(state, value){
      state.checkersPages = value;
    },
    setBattleShipPages(state, value){
      state.battleShipPages = value;
    },    
    setBattleShipCount(state, value){
      state.battleShipCount = value;
    },
    setConnect4Pages(state, value){
      console.log(value)
      state.connect4Pages = value;

    },
    setConnect4Count(state, value){
      console.log(value)
      state.connect4Count = value;
    }
  },
  actions: {
    toogleCheckersTable(context){
      context.commit('isCheckersHidden')
    },
    toogleBattleShipTable(context){
      context.commit('isBattleShipHidden')
    },
    toogleConnect4Table(context){
      context.commit('isConnect4Hidden')
    },
    isLoading(context, info){
      context.commit('isLoading', info);
    },
    nextPageW(context){
      if(context.state.currentPageC4 < context.state.battleShipPages){
      context.commit('nextPageW');
      context.dispattch('downloadBattleShip');
      }
    },
    nextPageC(context){
      if(context.state.currentPageCheck < context.state.checkersPages){
      context.commit('nextPageC');
      context.state.dispatch('downloadCheckers');
      }
    },
    nextPageC4(context){
      if(context.state.currentPageC4 < context.state.connect4Pages){
      context.commit('nextPageC4')
      context.state.dispatch('downloadConnect4');
      }
    },
    previousPageW(context){
      if (context.state.currentPageWar > 1){
      context.commit('previousPageW');
      context.dispatch('downloadBattleShip');
      }
    },
    previousPageC(context){
      if (context.state.currentPageCheck > 1){
      context.commit('previosuPageC');
      context.dispatch('downloadCheckers');
      }
    },
    previousPageC4(context){
      if (context.state.currentPageC4 > 1){
      context.commit('previousPageC4');
      context.dispatch('downloadConnect4');
      }
    },
  async downloadCheckers(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageCheck,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        context.commit('setCheckers', res.data.items);
        context.commit('setCheckersCount', res.data.totalItemsCount)
        context.commit('setCheckersPages', res.data.totalPages)
      }
    } catch (error) {
      if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
        context.dispatch('logOutUser');
      }
      else if (error.response) {
        context.dispatch('showNotification',
          {
            label: 'Wystąpiły błędy!',
            description: 'Nie udało się pobrać danych.',
            type: 'error'
          },
          { root: true });
      } else {
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    }
  },
  async downloadBattleShip(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageWar,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        context.commit('setBattleShip', res.data.items);
        context.commit('setBattleShipCount', res.data.totalItemsCount)
        context.commit('setBattleShipPages', res.data.totalPages)
      }
    } catch (error) {
      if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
        context.dispatch('logOutUser');
      }
      else if (error.response) {
        context.dispatch('showNotification',
          {
            label: 'Wystąpiły błędy!',
            description: 'Nie udało się pobrać danych.',
            type: 'error'
          },
          { root: true });
      } else {
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    }
  },
  async downloadConnect4(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageC4,
      PageSize: context.state.itemsPerPage,
    }
    console.log('items per pages',context.state.itemsPerPage)
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        context.commit('setConnect4', res.data.items);
        context.commit('setConnect4Count', res.data.totalItemsCount)
        console.log('total pages',res.data.totalPages)
        context.commit('setConnect4Pages', res.data.totalPages)
      }
    } catch (error) {
      if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
        context.dispatch('logOutUser');
      }
      else if (error.response) {
        context.dispatch('showNotification',
          {
            label: 'Wystąpiły błędy!',
            description: 'Nie udało się pobrać danych.',
            type: 'error'
          },
          { root: true });
      } else {
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    }
  }
},
  getters: {    
    checkersTable(state) {
      return state.checkersHidden;
    },
    battleShipTable(state) {
      return state.battleShipHidden;
    },
    connect4Table(state) {
      return state.connect4Hidden;
    },
    getCheckers(state){
      return state.checkersRank;
    },
    getBattleShip(state){
      return state.battleShipRank;
    },
    getConnect4(state){
      return state.connect4Rank;
    },
    getCurrentPageChec(state){
      return state.currentPageCheck;
    },
    getCurrentPageWar(state){
      return state.currentPageWar;
    },
    getCurrentPageC4(state){
      return state.currentPageC4;
    },
    getItemsPerPage(state){
      return state.itemsPerPage;
    },
    pageNrC(state){
        return state.currentPageCheck;
    },
    pageNrW(state){
        return state.currentPageWar;
    },
    pageNrC4(state){
        return state.currentPageC4;
    },
    getCheckersPages(state){
      return state.checkersPages;
    },
    allPagesC(state){
        return state.checkersPages;
    },
    allPagesW(state){
        return state.battleShipPages;
    },
    allPagesC4(state){
        return state.connect4Pages;
    },
  }
}

