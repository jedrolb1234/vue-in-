import AxiosInstance from '@/mixins/axiosInstance';

export default {
  namespaced: true,
  state() {
    return {
      checkersHidden: true,
      battleShipHidden: true,
      connect4Hidden: true,
      itemsPerPage: 10,
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
        if (state.currentPageCheck > 1){
          state.currentPageCheck--;
        }
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
      // if (state.checkersRank.length != 10) {
      //   state.dynamicHeightW = (state.itemsPerPage - state.checkersRank.length) * state.rowHeight;
      // }state.dynamicHeightW = 0;
    },
    setBattleShip(state, value){
      state.battleShipRank = value;
      // if (state.battleShipRank.length != 10) {
      //   state.dynamicHeightS = (state.itemsPerPage - state.battleShipRank.length) * state.rowHeight;
      // }
      // else state.dynamicHeightS = 0;

    },
    setConnect4(state, value){
      state.connect4Rank = value;
      console.log(state.connect4Rank)
      // if (state.connect4Rank.length != 10) {
      //   state.dynamicHeightP = (state.itemsPerPage - state.connect4Rank.length) * state.rowHeight;
      // }else state.dynamicHeightP = 0;
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
      state.connect4Pages = value;

    },
    setConnect4Count(state, value){
      state.connect4Count = value;
    }
  },
  actions: {
    toogleCheckersTable(context){
      context.commit('isCheckersHidden')
      console.log('aaa')
      // if(context.state.checkersHidden === false)
      // context.dispatch('downloadCheckers', 0);
    },
    toogleBattleShipTable(context){
      context.commit('isBattleShipHidden')
      // if(context.state.battleShipHidden === false)
        // context.dispatch('downloadBattleShip', 1);
    },
    toogleConnect4Table(context){
      context.commit('isConnect4Hidden')
      // if(context.state.connect4Hidden === false)
      // context.dispatch('downloadConnect4', 2);
    },
    isLoading(context, info){
      context.commit('isLoading', info);
    },

    nextPageW(context){
      context.commit('nextPageW');
    },
    nextPageC(context){
      context.commit('nextPageC');
    },
    nextPageC4(context){
      context.commit('nextPageC4')
    },
    previousPageW(context){
      context.commit('previousPageW');
    },
    previosuPageC(context){
      context.commit('previosuPageC');
    },
    previousPageC4(context){
      context.commit('previousPageC4')
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
        // console.log(res.data.items, 'aaa')
        context.commit('setCheckers', res.data.items);
        // context.commit('toogleIsLoadingWar', false);
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
        // console.log(res.data.items, 'aaa')
        context.commit('setBattleShip', res.data.items);
        // context.commit('toogleIsLoadingStat', false);
        context.commit('setBattleShipCount', res.data.totalItemsCount)
        context.commit('setBattleShipPages', res.data.totalPages)
        console.log(res)
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
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        console.log(res.data.items, 'aaa')
        context.commit('setConnect4', res.data.items);
        // context.commit('toogleIsLoadingPol', false);
        context.commit('setConnect4Count', res.data.totalItemsCount)
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
    allPagesC(state){
        return Math.ceil(state.checkersRank.length / state.itemsPerPage);
    },
    allPagesW(state){
        return Math.ceil(state.battleShipRank.length / state.itemsPerPage);
    },
    allPagesC4(state){
        return Math.ceil(state.connect4Rank.length / state.itemsPerPage);
    },
  }
}

