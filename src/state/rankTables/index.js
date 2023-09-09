import AxiosInstance from '@/mixins/axiosInstance';

export default {
  namespaced: true,
  state() {
    return {
      warcabyHidden: true,
      statkiHidden: true,
      polacz4Hidden: true,
      isLoadingWar: true,
      isLoadingStat: true,
      isLoadingPol: false,
      itemsPerPage: 10,
      currentPageWar: 1,
      currentPageStat: 1,
      currentPagePol: 1,
      warcabyRank: [],
      warcabyCount: 0,
      warcabyPages: 0,
      statkiRank: [],
      statkiCount:0,
      statkiPages: 0,
      polacz4Rank: [],
      polacz4Count: 0,
      polacz4Pages:0,
      dynamicHeightP:0,
      dynamicHeightS:0,
      dynamicHeightW:0,
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
    },
      previousPageW(state){
        if (state.currentPageWar > 1){
          console.log('--')
          state.currentPageWar--;
        }
      },
      previousPageS(state){
        if (state.currentPageStat > 1){
          console.log('--')
          state.currentPageStat--;
        }
      },
      previousPageP(state){
        if (state.currentPagePol > 1){
          console.log('--')
          state.currentPagePol--;
      }
    },
    setWarcaby(state, value){
      state.warcabyRank = value;
      if (state.warcabyRank.length != 10) {
        state.dynamicHeightW = (state.itemsPerPage - state.warcabyRank.length) * state.rowHeight;
      }state.dynamicHeightW = 0;
    },
    setStatki(state, value){
      state.statkiRank = value;
      if (state.statkiRank.length != 10) {
        state.dynamicHeightS = (state.itemsPerPage - state.statkiRank.length) * state.rowHeight;
      }
      else state.dynamicHeightS = 0;

    },
    setPolacz4(state, value){
      state.polacz4Rank = value;
      if (state.polacz4Rank.length != 10) {
        state.dynamicHeightP = (state.itemsPerPage - state.polacz4Rank.length) * state.rowHeight;
      }else state.dynamicHeightP = 0;
    },
    nextPageW(state){
      console.log('+++')
        if (state.currentPageWar < Math.ceil(Object.keys(state.warcabyRank).length / state.itemsPerPage)){
        console.log('++')
        state.currentPageWar++;
      }
    },
    nextPageS(state){
      if (state.currentPageStat < Math.ceil(Object.keys(state.statkiRank).length / state.itemsPerPage)){
        console.log('++')
        state.currentPageStat++;
      }
    },
    nextPageP(state){
      if (state.currentPagePol < Math.ceil(Object.keys(state.polacz4Rank).length / state.itemsPerPage)){
        console.log('++')
        state.currentPagePol++;
      }
    },

  },
  actions: {
    toogleWarcabyTable(context){
      context.commit('isWarcabyHidden')
      if(context.state.warcabyHidden === false)
      context.dispatch('downloadWarcaby', 0);
    },
    toogleStatkiTable(context){
      context.commit('isStatkiHidden')
      if(context.state.statkiHidden === false)
        context.dispatch('downloadStatki', 1);
    },
    tooglePolacz4Table(context){
      context.commit('isPolacz4Hidden')
      if(context.state.polacz4Hidden === false)
      context.dispatch('downloadPolacz4', 2);
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
  
  async downloadWarcaby(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageWar,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        console.log(res.data.items, 'aaa')
        context.commit('setWarcaby', res.data.items);
        context.commit('toogleIsWarcabyHidden');
        context.commit('setWarcabyCount', res.data.totalItemsCount)
        context.commit('setWarcabyPages', res.data.totalPages)
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
  async downloadStatki(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPageStat,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        console.log(res.data.items, 'aaa')
        context.commit('setWarcaby', res.data.items);
        context.commit('toogleIsStatkiHidden');
        context.commit('setWarcabyCount', res.data.totalItemsCount)
        context.commit('setWarcabyPages', res.data.totalPages)
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
  async downloadPolacz4(context, index) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    const params = {
      PageNumber: context.state.currentPagePol,
      PageSize: context.state.itemsPerPage,
    }
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_RANK + index, { params: params });
      if (res.status === 200) {
        console.log(res.data.items, 'aaa')
        context.commit('setWarcaby', res.data.items);
        context.commit('toogleIsCheckersHidden');
        context.commit('setWarcabyCount', res.data.totalItemsCount)
        context.commit('setWarcabyPages', res.data.totalPages)
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
    warcabyTable(state) {
      console.log('warcaby', state.warcabyHidden)
      return state.warcabyHidden;
    },
    statkiTable(state) {
      return state.statkiHidden;
    },
    polacz4Table(state) {
      return state.polacz4Hidden;
    },
    getWarcaby(state){
      return state.warcabyRank;
    },
    getStatki(state){
      return state.statkiRank;
    },
    getPolacz4(state){
      console.log('+++++++')
      return state.polacz4Rank;
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
    PageNrS(state){
        return state.currentPageStat;
    },
    PageNrP(state){
        return state.currentPagePol;
    },
    allPagesW(state){
        return Math.ceil(state.warcabyRank.length / state.itemsPerPage);
    },
    allPagesS(state){
        return Math.ceil(state.statkiRank.length / state.itemsPerPage);
    },
    allPagesP(state){
        return Math.ceil(state.polacz4Rank.length / state.itemsPerPage);
    },
  }
}

