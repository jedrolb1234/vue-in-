import AxiosInstance from '@/mixins/axiosInstance'

export default {
  namespaced: true,
  state() {
    return {
      id: null,
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
      rowHeight: 38
    }
  },
  mutations: {
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
      // console.log('isFriend', state.isFriends)
    },
    setHasInvitation(state, value) {
      state.invId = value;
      // console.log('invId', state.invId)
    },
    setUser(state, user) {
      let inputDate = new Date(user.dateOfBirth);
      let day = inputDate.getDate().toString().padStart(2, '0');
      let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      let year = inputDate.getFullYear().toString();
      let formattedDate = `${year}-${month}-${day}`;
      state.user = user;
      state.user.dateOfBirth = formattedDate;
      // console.log(state.user)
    },
    setUserId(state, value) {
      state.userId = value;
    },
    setHistory(state, value){
      state.history = value;
      for (let i = 0; i < state.history.length; i++) {
        let inputDate = new Date(state.history[i].endDate);
        let day = inputDate.getDate().toString().padStart(2, '0');
        let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        let year = inputDate.getFullYear().toString();
        let formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate)
        state.history[i].endDate = formattedDate;
      }if (state.history.length != 10) {
        state.dynamicHeight = (state.itemsPerPage - state.history.length) * state.rowHeight;
      }console.log(state.history.endDate)
    },
    setHistPages(state, value){
      state.historyPages = value;
    },
    setHistCount(state, value){
      state.historyCount = value;
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    getHistPage(state) {
      return state.currentPage;
    },
    getHistory(state) {
      console.log(state.history)
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
    getIsFriend(state) {console.log(state.user)
      // console.log(state.user.isFriendStatus)
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
      // console.log(state.id)
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
    async downloadHistory(context, id){
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        const res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_HISTORY + "/" + id, null);
        if (res.status === 200){  
          context.commit('setHistory', res.data.items);
          context.commit('setHistCount', res.data.totalItemsCount)
          context.commit('setHistPages', res.data.totalPages)
          console.log(res)
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
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      console.log(userId)
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
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async getData(context, userId) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + "/account/" + userId + "/profile");
        if (res.status === 200) {
          context.commit('setUser', res.data);
          context.commit('setUserId', userId);
          console.log(res.data, 'data')
          console.log(userId)
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
  }
}
