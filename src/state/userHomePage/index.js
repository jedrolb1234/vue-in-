import Users from '@/state/users/index.js'; Users;
export default {
    namespaced: true,
    state() {
      return {
        id: null,
        isLoading: false,
        hasInvitation: false,
        isFriend: false,
        invId:null,
        itemsPerPage: 10,
        currentPage: 1,
        name: 'Andrzej',
        surname: 'Bidermann',
        birthDate: '1984-09-27',
        invitations: null,
        invitation: null,
        invSended: false,
        user: { },
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
        console.log('+++')
        if (state.currentPage < Math.ceil(state.history.length / state.itemsPerPage)){
          console.log('++')
          state.currentPage++;
        }
      },
      toogleIsFriend(state, value){
        state.isFriend = value;
      },
      setId(state, value){
        state.id = value;
      },
      setIsFriend(state, value){
        state.isFriend = value;
        console.log('isFriend', state.isFriends)
      },
      setInvSended(state, value){
        state.invSended = value;
        console.log('invSended', state.invSended)
      },
      setHasInvitation(state, value){
        state.invId = value;
        console.log('invId', state.invId)
      },
      setInvitations(state, value){
        state.invitations = value;
      },
      setUser(state, user){
        state.user = user;
      }
    },
    getters: {
      isLoading(state) {
        return state.isLoading;
      },
      currentPage(state){
        let startIndex = (state.currentPage - 1) * state.itemsPerPage;
        let endIndex = startIndex + state.itemsPerPage;
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
      getHasInvitation(state){
        return state.hasInvitation;
      },
      getIsFriend(state){
        return state.isFriend;
      },
      getIsInvSended(state){
        return state.invSended;
      },
      getName(state){
        console.log(state.user)
        return state.user.firstName;
      },
      getSurname(state){
        return state.user.lastName;
      },
      getBirthDate(state){
        return state.user.dateOfBirth;
      },
      getUser(state){
        return state.user;
      }
    },
    actions: {
        previousPage(context) {
        context.commit('previousPage');
      },
      nextPage(context) {
        context.commit('nextPage');
      },
      async sendInvitation(context, payload){
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const token = JSON.parse(sessionStorage.getItem('token'))
        const headers = {
          Authorization: `Bearer ${token}`,
          };
          console.log(headers)
        const axios = require('axios');
        let res;
        console.log(payload)
        try { 
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                              + "/" + payload, null, { headers }); 

          if (res.status === 200) {
            console.log(res.status)
            context.commit('setInvSended', true)
            }
        } catch (error) {
          console.log(error)
          if(error.response.data === "FriendshipIsAlreadyPendingOrAccepted"){
            context.commit('setInvSended', true)
          }
          else if(error.response.data === "FriendHasToBeAnotherUser"){
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
      async acceptInvitation(context, payload){
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const token = JSON.parse(sessionStorage.getItem('token'))
        const headers = {
          Authorization: `Bearer ${token}`,
          };
        const axios = require('axios');
        let res;
        try { 
        res = await axios.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                              + "/" + payload + process.env.VUE_APP_INVITATION_ACCEPT_ENDPOINT, null, {headers}); 
          if (res.status === 200) {
            context.commit('setIsFriend', true);
            context.commit('setHasInvitation', 'null');
            context.commit('setInvSended', false);
            }
          } catch (error) {
            console.log(error)
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

      async downloadInvitations(context){
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const token = JSON.parse(sessionStorage.getItem('token'))
        const headers = {
              Authorization: `Bearer ${token}`,
          };
        const axios = require('axios');
        let res;
        try { 
        res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_INVITATIONS_ENDPOINT, {headers}); 
        if (res.status === 200) {
            context.commit('setInvitations', res.data);
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
      async getData(context,userId){
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = JSON.parse(sessionStorage.getItem('token'))
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
        // console.log(userId)
        // console.log(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT + userId + process.env.VUE_APP_PROFILE) 
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + "/account/" + userId + "/profile", {headers}); 
      if (res.status === 200) {  
        context.commit('setUser', res.data)
      }
      } catch (error) {
      if (error.response) {
        if(error.response.data === "UserNotExist"){
          context.commit('toogleFindUser', false);
        }else{
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
  