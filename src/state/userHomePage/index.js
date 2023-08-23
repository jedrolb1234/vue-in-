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
      history: [
        {
          id: 0,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id: 1,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id: 2,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'lose',
          points: 5
        },
        {
          id: 3,
          game: 'warcaby',
          date: '2023-09-01',
          status: 'win',
          points: 100
        },
        {
          id: 4,
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
      state.isLoading = !state.isLoading;
    },
    previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--;
      }
    },
    nextPage(state) {
      console.log('+++')
      if (state.currentPage < Math.ceil(state.history.length / state.itemsPerPage)) {
        // console.log('++')
        state.currentPage++;
      }
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
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    currentPage(state) {
      let startIndex = (state.currentPage - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      return state.history.slice(startIndex, endIndex);
    },
    pageNr(state) {
      return state.currentPage;
    },
    allPages(state) {
      return Math.ceil(state.history.length / state.itemsPerPage);
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
    getIsFriend(state) {console.log(state.user)
      console.log(state.user.isFriendStatus)
      return state.user.isFriendStatus
      
    },
    getName(state) {
      // console.log(state.user)
      return state.user.firstName;
    },
    getSurname(state) {
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
    getInvitationId(state){
      console.log(state.id)
      console.log(state.invitations)
      for(let i = 0; i< state.invitations.length; i++){
        if (state.invitations[i].userId === state.id){
        console.log(state.invitations[i].userId)
        return state.invitations[i].userId;
        }
      }
    // return state.rootGetters.getInvitationId;
    }
  },
  actions: {
    previousPage(context) {
      context.commit('previousPage');
    },
    nextPage(context) {
      context.commit('nextPage');
    },
    async sendInvitation(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        await AxiosInstance.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT
          + "/" + payload, null);
          context.dispatch('getData', context.state.userId);
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
        await AxiosInstance.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT
          + "/" + userId + process.env.VUE_APP_INVITATION_ACCEPT_ENDPOINT, null);
          context.dispatch('getData', context.state.userId);
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
          // console.log(res.data, 'data')
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
