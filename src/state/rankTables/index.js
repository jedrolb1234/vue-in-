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
      warcabyRank:[
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          },
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points:  100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          },
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          }
        ],
        statkiRank:[
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          }
        ],
        polacz4Rank: [
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
             points: 97
          },
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          },
          {
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
          },
          {
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
          },
          {
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
          },
          {
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
          }
      ],
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
    // ifLoading(state, info) {
    //   if (info === 'W'){
    //     state.isLoadingWar=!state.isLoadingWar;
    //     }
    //   if (info === 'S'){
    //     state.isLoadingStat=!state.isLoadingStat;
    //     }
    //   if (info === 'P'){
    //     state.isLoadingPol=!state.isLoadingPol
    //     }
    //   },
 
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
    toogleStatkiTable(context){
        context.commit('isStatkiHidden');
    },
    tooglePolacz4Table(context){
      console.log('aaaa')
      context.commit('isPolacz4Hidden');
    },
    isLoading(context, info){
      context.commit('isLoading', info);
    },
    // loading(context, info){
    //   context.commit('ifLoading', info);
    // },
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
    currentPageW(state){//, info){
        let startIndex = (state.currentPageWar - 1) * state.itemsPerPage;
        let endIndex = startIndex + state.itemsPerPage;
        let sliced = state.warcabyRank.slice(startIndex, endIndex);   
        state.dynamicHeightW= (10 - sliced.length ) * 38;
        return sliced;
    },
    currentPageS(state){//, info){
        let startIndex = (state.currentPageStat - 1) * state.itemsPerPage;
        let endIndex = startIndex + state.itemsPerPage;
        let sliced = state.statkiRank.slice(startIndex, endIndex); 
        state.dynamicHeightS = (10 - sliced.length ) * 38;
        return sliced;
    },  
    currentPageP(state){//, info){
      let startIndex = (state.currentPagePol - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      let sliced = state.polacz4Rank.slice(startIndex, endIndex); 
      state.dynamicHeightP = (10 - sliced.length ) * 38;
      console.log(sliced, state.polacz4Rank)
      return sliced;
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
