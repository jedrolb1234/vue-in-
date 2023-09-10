import AxiosInstance from '@/mixins/axiosInstance';

export default {
  namespaced: true,
  state() {
    return {
      checkersHidden: true,
      warShipHidden: true,
      connect4Hidden: true,
      // isLoadingWar: true,
      // isLoadingStat: true,
      // isLoadingPol: true,
      itemsPerPage: 10,
      currentPageWar: 1,
      currentPageStat: 1,
      currentPagePol: 1,
      checkersRank: [],
      checkersCount: 0,
      checkersPages: 0,
      warShipRank: [],
      warShipCount:0,
      warShipPages: 0,
      connect4Rank: [],
      connect4Count: 0,
      connect4Pages:0,
    }
  },
  mutations: {
    isCheckersHidden(state) {
      state.checkersHidden = !state.checkersHidden;
    },
    isWarShipHidden(state) {
      state.warShipHidden = !state.warShipHidden;
    },
    isConnect4Hidden(state) {
      state.connect4Hidden = !state.connect4Hidden;
    },
      previousPageW(state){
        if (state.currentPageWar > 1){
          state.currentPageWar--;
        }
      },
      previousPageS(state){
        if (state.currentPageStat > 1){
          state.currentPageStat--;
        }
      },
      previousPageP(state){
        if (state.currentPagePol > 1){
          state.currentPagePol--;
      }
    },
    setCheckers(state, value){
      state.checkersRank = value;
      // if (state.checkersRank.length != 10) {
      //   state.dynamicHeightW = (state.itemsPerPage - state.checkersRank.length) * state.rowHeight;
      // }state.dynamicHeightW = 0;
    },
    setWarShip(state, value){
      state.warShipRank = value;
      // if (state.warShipRank.length != 10) {
      //   state.dynamicHeightS = (state.itemsPerPage - state.warShipRank.length) * state.rowHeight;
      // }
      // else state.dynamicHeightS = 0;

    },
    setConnect4(state, value){
      state.connect4Rank = value;
      // if (state.connect4Rank.length != 10) {
      //   state.dynamicHeightP = (state.itemsPerPage - state.connect4Rank.length) * state.rowHeight;
      // }else state.dynamicHeightP = 0;
    },
    nextPageW(state){
        state.currentPageWar++;
    },
    nextPageS(state){
        state.currentPageStat++;
    },
    nextPageP(state){
        state.currentPagePol++;
    },
    toogleIsLoadingWar(state, value){
      state.isLoadingWar = value;
    },
    toogleIsLoadingStat(state, value){
      state.isLoadingStat = value;
    },
    toogleIsLoadingPol(state, value){
      state.isLoadingPol = value;
    },
    setCheckersCount(state, value){
      state.setCheckersCount = value;
    },
    setCheckersPages(state, value){
      state.checkersPages = value;
    },
    setWarShipPages(state, value){
      state.warShipPages = value;
    },    
    setWarShipCount(state, value){
      state.warShipCount = value;
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
    toogleWarShipTable(context){
      context.commit('isWarShipHidden')
      // if(context.state.warShipHidden === false)
        // context.dispatch('downloadWarShip', 1);
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
    nextPageS(context){
      context.commit('nextPageS');
    },
    nextPageP(context){
      context.commit('nextPageP')
    },
    previousPageW(context){
      context.commit('previousPageW');
    },
    previousPageS(context){
      context.commit('previousPageS');
    },
    previousPageP(context){
      context.commit('previousPageP')
    },
  
  async downloadCheckers(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageWar,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      console.log(res)
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
  async downloadWarShip(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageStat,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        // console.log(res.data.items, 'aaa')
        context.commit('setWarShip', res.data.items);
        // context.commit('toogleIsLoadingStat', false);
        context.commit('setWarShipCount', res.data.totalItemsCount)
        context.commit('setWarShipPages', res.data.totalPages)
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
      PageNumber: context.state.currentPagePol,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        // console.log(res.data.items, 'aaa')
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
    getIsLoadingWar(state){
      return state.isLoadingWar;
    },
    getIsLoadingStat(state){
      return state.isLoadingStat;
    },
    getIsLoadingPol(state){
      return state.isLoadingPol;
    },
    checkersTable(state) {
      return state.checkersHidden;
    },
    warShipTable(state) {
      return state.warShipHidden;
    },
    connect4Table(state) {
      return state.connect4Hidden;
    },
    getCheckers(state){
      return state.checkersRank;
    },
    getWarShip(state){
      return state.warShipRank;
    },
    getConnect4(state){
      return state.connect4Rank;
    },
    getCurrentPageWar(state){
      return state.currentPageWar;
    },
    getCurrentPageStat(state){
      return state.currentPageStat;
    },
    getCurrentPagePol(state){
      return state.currentPagePol;
    },
    getItemsPerPage(state){
      return state.itemsPerPage;
    },
    getDynamicHeightP(state){
      return state.dynamicHeightP;
    },
    getDynamicHeightW(state){
      return state.dynamicHeightW;
    },
    getDynamicHeightS(state){
      return state.dynamicHeightS;
    },
    pageNrW(state){
        return state.currentPageWar;
    },
    pageNrS(state){
        return state.currentPageStat;
    },
    pageNrP(state){
        return state.currentPagePol;
    },
    allPagesW(state){
        return Math.ceil(state.checkersRank.length / state.itemsPerPage);
    },
    allPagesS(state){
        return Math.ceil(state.warShipRank.length / state.itemsPerPage);
    },
    allPagesP(state){
        return Math.ceil(state.connect4Rank.length / state.itemsPerPage);
    },
  }
}

