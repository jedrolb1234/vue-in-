export default {
  namespaced: true,
  state() {
    return {
      warcabyHidden: true,
      statkiHidden: true,
      polacz4Hidden: true,
      isLoadingWar: false,
      isLoadingStat: false,
      isLoadingPol: false,
      itemsPerPage: 10,
      currentPageWar: 1,
      currentPageStat: 1,
      currentPagePol: 1,
      warcabyRank:{
        Andrzej:{
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
        },
        Tomek:{
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
        },
        Rafal:{
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
        },
        Daniel:{
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
        },
        1:{
          rank: 1,
          name: 'Andrzej',
          surname: 'Bidermann',
          points: 100
      },
      2:{
          rank: 2,
          name: 'Tomek',
          surname: 'B',
          points: 99
      },
      3:{
          rank: 3,
          name: 'Rafał',
          surname: 'Rafał',
          points: 98
      },
      4:{
          rank: 4,
          name: 'Daniel',
          surname: 'Daniel',
          points: 97
      },
      5:{
        rank: 1,
        name: 'Andrzej',
        surname: 'Bidermann',
        points: 100
    },
    6:{
        rank: 2,
        name: 'Tomek',
        surname: 'B',
        points: 99
    },
    7:{
        rank: 3,
        name: 'Rafał',
        surname: 'Rafał',
        points: 98
    },
    8:{
        rank: 4,
        name: 'Daniel',
        surname: 'Daniel',
        points: 97
    }
      },
    statkiRank:{
      Andrzej:{
          rank: 1,
          name: 'Andrzej',
          surname: 'Bidermann',
          points: 100
      },
      Tomek:{
          rank: 2,
          name: 'Tomek',
          surname: 'B',
          points: 99
      },
      Rafal:{
          rank: 3,
          name: 'Rafał',
          surname: 'Rafał',
          points: 98
      },
      Daniel:{
          rank: 4,
          name: 'Daniel',
          surname: 'Daniel',
          points: 97
      }
    },
    polacz4Rank: {
      Andrzej:{
          rank: 1,
          name: 'Andrzej',
          surname: 'Bidermann',
          points: 100
      },
      Tomek:{
          rank: 2,
          name: 'Tomek',
          surname: 'B',
          points: 99
      },
      Rafal:{
          rank: 3,
          name: 'Rafał',
          surname: 'Rafał',
          points: 98
      },
      Daniel:{
          rank: 4,
          name: 'Daniel',
          surname: 'Daniel',
          points: 97
      }
    },
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
    ifLoading(state, info) {
      if (info === 'W'){
          console.log('isloading', info === 'W', state.isLoadingWar)
        state.isLoadingWar=!state.isLoadingWar;
        }
      if (info === 'S'){
        state.isLoadingStat=!state.isLoadingStat;
        }
      if (info === 'P'){
        state.isLoadingPol=!state.isLoadingPol
        }
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
    },
    isLoading(context, info){
      context.commit('isLoading', info)
    },
    loading(context, info){
      context.commit('ifLoading', info);
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
      console.log('warcaby state: ', state.warcabyRank)
      return state.warcabyRank;
    },
    getStatki(state){
      return state.statkiRank;
    },
    getPolacz4(state){
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
    }
  }
  // actions: {
  // }
}
