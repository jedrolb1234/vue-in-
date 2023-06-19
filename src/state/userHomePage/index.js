import { refreshToken } from '@/state/users/actions.js';

export default {
    namespaced: true,
    state() {
      return {
        id: null,
        isLoading: false,
        hasInvitation: false,
        isFriend: false,

        itemsPerPage: 10,
        currentPage: 1,
        name: 'Andrzej',
        surname: 'Bidermann',
        birthDate: '1984-09-27',
        invitations:null,
        invitation:null,
        invId: null,        
        invSended: false,
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
          console.log('--')
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
      setInvSended(state, value){
        state.invSended = value;
        console.log(state.invSended)
      },
      toogleIsFriend(state, value){
        state.isFriend = value;
      },
      setId(state, value){
        state.id = value;
      },
      setIsFriend(state, value){
        state.isFriend = value;
      },
      setHasInvitation(state, value){
        state.hasInvitation = value;
      },
      setInvitations(state, value){
        state.invitations = value;
        console.log(state.invitations);
        // if(state.invitations[i].id == state.invId){

        // }
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
        return state.name;
      },
      getSurname(state){
        return state.surname;
      },
      getBirthDate(state){
        return state.birthDate;
      },
    },
    actions: {
      previousPage(context) {
        context.commit('previousPage');
      },
      nextPage(context) {
        context.commit('nextPage');
      },
      async sendInvitation(context, payload){
        await refreshToken();
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const token = JSON.parse(sessionStorage.getItem('token'))
        const headers = {
          Authorization: `Bearer ${token}`,
          };
          console.log(headers)
        const axios = require('axios');
        let res;
        console.log(payload)
        console.log(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
          + "/" + payload)
        try { 
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                              + "/" + payload, {headers}); 

          if (res.status === 200) {
            context.commit('setInvSended', true)
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
      async acceptInvitation(context, payload){
        await refreshToken();
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const token = JSON.parse(sessionStorage.getItem('token'))
        const headers = {
          Authorization: `Bearer ${token}`,
          };
        const axios = require('axios');
        let res;
        try { 
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                              + "/" + payload + process.env.VUE_APP_INVITATION_ACCEPT_ENDPOINT, {headers}); 
          if (res.status === 200) {
            context.commit('setIsFriend', true)
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

      async downloadInvitations(context){
        await refreshToken();
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
    }
  }
  