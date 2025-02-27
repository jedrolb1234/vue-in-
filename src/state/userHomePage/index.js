import AxiosInstance from '@/mixins/axiosInstance'

export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
      hasInvitation: false,
      invitations: [],
      invId: null,
      itemsPerPage: 10,
      currentPage: 1,
      name: '',
      surname: '',
      birthDate: '',
      userId: null,
      user: {},
      history: [],
      hstoryPages: null,
      historyCount: 0,
      rowHeight: 38,
      gamesInProgress: []
    }
  },
  mutations: {
    setGamesInProgress(state, data) {
      state.gamesInProgress = data;
    },
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    previousPage(state) {
      state.currentPage--;
    },
    nextPage(state) {
      state.currentPage++;
    },
    toogleIsFriend(state, value) {
      state.isFriend = value;
    },
    setId(state, value) {
      state.id = value;
    },
    setIsFriend(state, value) {
      state.isFriend = value;
    },
    setHasInvitation(state, value) {
      state.invId = value;
    },
    setUser(state, user) {
      // let inputDate = new Date(user.dateOfBirth);
      // let day = inputDate.getDate().toString().padStart(2, '0');
      // let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      // let year = inputDate.getFullYear().toString();
      // let formattedDate = `${year}-${month}-${day}`;
      state.user = user;
      if (user.dateOfBirth !== null) 
        state.user.dateOfBirth = new Date(user.dateOfBirth).toLocaleDateString();
    },
    setUserId(state, value) {
      state.userId = value;
    },
    setHistory(state, value){
      state.history = value;
      for (let i = 0; i < state.history.length; i++) {
        let inputDate = new Date(state.history[i].endDate);
        let formattedDate;   
        var now = new Date();
        inputDate = inputDate.setHours(inputDate.getHours() + 1)//zmieniać czas letni(+2) - zimowy(+1)
        let diffrentMinutes = Math.floor(Math.abs((now - inputDate) / (1000 * 60)));
        let diffrentHours = Math.floor(diffrentMinutes / 60);
        let diffrentDays = Math.floor(diffrentMinutes / ( 60 * 24 ));
        let diffrentMonths = Math.floor(diffrentMinutes / ( 60 * 24 * 30 ));
        let diffrentYears =Math.floor(diffrentMinutes / ( 60 * 24 * 30 * 365));
        if(diffrentMinutes >=0 && diffrentHours === 0 && diffrentDays === 0 && diffrentMonths === 0 && diffrentYears === 0){
          if(Math.floor(diffrentMinutes) === 0)
            formattedDate = `przed chwilą`;
          if(Math.floor(diffrentMinutes) === 1)
            formattedDate = `${Math.floor(diffrentMinutes)} minutę temu`;
          if(Math.floor(diffrentMinutes) > 1 && Math.floor(diffrentMinutes) < 5 )
            formattedDate = `${Math.floor(diffrentMinutes)} minuty temu`;
          if(Math.floor(diffrentMinutes) > 1 && Math.floor(diffrentMinutes) > 5 )
            formattedDate = `${Math.floor(diffrentMinutes)} minut temu`;
        }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays === 0 && diffrentMonths === 0 && diffrentYears === 0){
          if(Math.floor(diffrentHours)  === 1)
            formattedDate = `${Math.floor(diffrentHours)} godzię temu`;
          if(Math.floor(diffrentHours) > 1 && Math.floor(diffrentHours) < 5)
            formattedDate = `${Math.floor(diffrentHours)} godziny temu`;
          if(Math.floor(diffrentHours) > 5)
            formattedDate = `${Math.floor(diffrentHours)} godzin temu`;
          }        
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays > 0 && diffrentMonths === 0 && diffrentYears === 0){
          if(Math.floor(diffrentDays) === 1)
            formattedDate = `${Math.floor(diffrentDays)} dzień temu`;
          if(Math.floor(diffrentDays) > 1)
            formattedDate = `${Math.floor(diffrentDays)} dni temu`;        
        }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays > 0 && diffrentMonths > 0 && diffrentYears === 0){
          if(Math.floor(diffrentMonths) === 1)
            formattedDate = `${Math.floor(diffrentMonths)} miesiąc temu`;
          if(Math.floor(diffrentMonths) > 1 && Math.floor(diffrentMonths) < 5) 
            formattedDate = `${Math.floor(diffrentMonths)} miesiące temu`;
          if(Math.floor(diffrentMonths) > 5) 
            formattedDate = `${Math.floor(diffrentMonths)} miesięcy temu`;        
         }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays > 0 && diffrentMonths > 0 && diffrentYears > 0){
          if(Math.floor(diffrentYears) === 1)
            formattedDate = `${Math.floor(diffrentYears)} rok temu`;
          else formattedDate = `${Math.floor(diffrentYears)} lata temu`;}
      state.history[i].endDate = formattedDate;
      }
      for (let i = 0; i < state.history.length; i++) {
      if(state.history[i].whoWon === state.history[i].players[0].item1)
          {state.history[i].whoWon = state.history[i].players[0].item2;}
      else
      {state.history[i].whoWon = state.history[i].players[1].item2;}
      }
    },
    setHistPages(state, value){
      state.historyPages = value;
    },
    setHistCount(state, value){
      state.historyCount = value;
    },

  },
  getters: {
    getGamesInProgress(state) {
      return state.gamesInProgress;
    },
    isLoading(state) {
      return state.isLoading;
    },
    getHistPage(state) {
      return state.currentPage;
    },
    getHistory(state) {
      return state.history;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getItemsPerPage(state) {
      return state.itemsPerPage
    },
    getHasInvitation(state) {
      return state.hasInvitation;
    },
    getIsFriend(state) {
      return state.user.isFriendStatus 
    },
    getName(state) {
      if(state.user.firstName === null) return ""
      return state.user.firstName;
    },
    getSurname(state) {
      if(state.user.lastName === null) return ""
      return state.user.lastName;
    },
    getBirthDate(state) {
      return state.user.dateOfBirth;
    },
    getUser(state) {
      return state.user;
    },
    getId(state) {
      return state.id;
    },
    getInvId(state) {
      return state.invId;
    },
    getDynamicHeight(state){
      return state.dynamicHeight;
    },
    getUserId(state){
      return state.userId;
    },
    getGameName(state){
      return state.history.gameName;
    },
    getGameDate(state){
      return state.history.endDate;
    }
  },
  actions: {
    previousPage(context) {
      if (context.state.currentPage > 1) {
        context.commit('previousPage');
        context.dispatch('downloadHistory');
      }
    },
    nextPage(context) {
      if (context.state.currentPage < context.state.historyPages) {
        context.commit('nextPage');
        context.dispatch('downloadHistory');
      }
    },
    async downloadHistory(context){
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const params = {
        PageNumber: context.state.currentPage,
        PageSize: context.state.itemsPerPage,
      }
      try {
        const res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_HISTORY + "/" + context.state.userId, { params: params });
        if (res.status === 200){  
          context.commit('setHistory', res.data.items);
          context.commit('setHistCount', res.data.totalItemsCount)
          context.commit('setHistPages', res.data.totalPages)
        }
        } catch (error) {
        if (error.response) {
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
    async sendInvitation(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        const res = await AxiosInstance.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT
          + "/" + payload, null);
        if (res.status === 200){  
          context.dispatch('getData', context.state.userId);
        }
        } catch (error) {
        if (error.response.status == 401 || error.response.data == 'InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else if (error.response.data === "FriendshipIsAlreadyPendingOrAccepted") {
          context.dispatch('getData', context.state.userId);
        }
        else if (error.response.data === "FriendHasToBeAnotherUser") {
          context.dispatch('showNotification',
            {
              label: 'Wystąpiły błędy!',
              description: 'Nie możesz wysłać zaproszenie tej osobie.',
              type: 'error'
            },
            { root: true });
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
    async acceptInvitation(context, userId) {
      // const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        const res = await AxiosInstance.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT
          + "/" + userId + process.env.VUE_APP_INVITATION_ACCEPT_ENDPOINT, null);
          if(res.status===200){
            context.dispatch('getData', context.state.userId);
          }
      } catch (error) {
        if (error.response.status == 401 || error.response.data == 'InvalidRefreshToken') {
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
        }
      }
    },
    async getData(context, userId) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT + "/" + userId + process.env.VUE_APP_PROFILE);
        if (res.status === 200) {
          context.commit('setUser', res.data);
          context.commit('setUserId', userId);
        }
      } catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else if (error.response) {
          if (error.response.data === "UserNotExist") {
            context.commit('toogleFindUser', false);
          } else {
            context.dispatch('showNotification',
              {
                label: 'Wystąpiły błędy!',
                description: 'Nie udało się pobrać danych.',
                type: 'error'
              },
              { root: true });
          }
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGamesInProgress(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        const res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, { params: payload })
        if (res.status == 200) {
          context.commit('setGamesInProgress', res.data);
        }
      }
      catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
  }
}
