import Notifications from '@/state/notifications/index.js';
import { refreshToken } from '@/state/users/actions.js'

export default {
    namespaced: true,
    modules: {
        Notifications,
    },
    state() {
      return {
        searchedUser:{ },
        isLoading: true,
        // hasFriends: true,
        isUsernameValid: false,
        showAddButton: false,
        avilabeInvitations: true,
        findUser: false,
        itemsPerPage: 10,
        currentPage: 1,
        username: '',
        friends:[ ],
        invitations:[ ]
        }
  },
  mutations: {
    previousPage(state){
      if (state.currentPage > 1){
        state.currentPage--;
      }
    },
    nextPage(state){
      if (state.currentPage < Math.ceil(state.friends.length / state.itemsPerPage)){
        state.currentPage++;
      }
    },
    setUserName(state, user){
      state.username = user;
    },
    addFriend(state){
      state.friends.push(state.searchedUser);
    },
    removeFriend(state, key){
      state.friends.splice(key, 1);
    },
    toogleFindUser(state, value){
      state.findUser = value; 
    },
    tooleIsLoading(state, value){
      state.isLoading = value;
    },
    setSearchedUser(state, value){
    state.searchedUser = value;
    },
    setInvitations(state, value){
      state.invitations = value;
    },
    cutFriends(state, value){
      for(let i; i< state.friends.length;i++){
        if(value === state.friends[i].id){
         state.friends.splice(i,1)
        }
      }
    },
    cutInvitations(state, value){
      for(let i; i<state.invitations.length;i++){
        if(value === state.invitations[i].id){
         state.invitations.splice(i,1)
        }
      }
    },
    setFriends(state,value){
      state.friends = value;
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    currentPage(state){
      let startIndex = (state.currentPage - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      return state.friends.slice(startIndex, endIndex);     
    },
    pageNr(state){
      return state.currentPage;
    },
    allPages(state){
      return Math.ceil(state.friends.length / state.itemsPerPage);
    },
    getFriends(state){
      return state.friends;
    },
    getUser(state){
      return state.searchedUser;
    },
    getFindUser(state){
      return state.findUser;
    },
    getCurrentPage(state){
      return state.currentPage;
    },
    getItemsPerPage(state){
      return state.itemsPerPage;
    },
    getAvilabeInvitations(state){
      return state.invitations.length;
    },
    getInvitations(state){
      return state.invitations;
    }
  },
  actions: {
    async removeFriend(context, payload){
      await refreshToken();
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = JSON.parse(sessionStorage.getItem('token'))
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
      res = await axios.delete(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                            + "/" + context.payload, {headers}); 
      if (res.status === 200) {
        context.commit('cutFriends', payload)
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
    async removeFriendInvitation(context, payload){
      await refreshToken();
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = JSON.parse(sessionStorage.getItem('token'))
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
      res = await axios.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_ACCOUNT_ENDPOINT 
                            + context.payload + process.env.VUE_APP_INVITATION_REJECT_ENDPOINT, {headers}); 
      console.log(res)
      
      if (res.status === 200) {
            context.commit('cutInvitations', payload);
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
    async findFriend(context, username){
      await refreshToken();
      context.username = username;
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = JSON.parse(sessionStorage.getItem('token'))
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_ACCOUNT_ENDPOINT + context.username, {headers}); 
      console.log(res)
      
      if (res.status === 200) {
          context.commit('setSearchedUser', res.data);
          console.log(context.searchedUser)
          context.commit('toogleFindUser', true);
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
          console.log(res.data)
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
    async downloadFriends(context){
      await refreshToken();
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = JSON.parse(sessionStorage.getItem('token'))
      const headers = {
            Authorization: `Bearer ${token}`,
        };
      console.log(headers)
      const axios = require('axios');
      let res;
      try { 
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT, {headers}); 
      console.log(typeof(res.status))
      if (res.status === 200) {
          context.commit('setFriends', res.data);          
          context.commit('tooleIsLoading', false);
          console.log(context.friends, context.isLoading);
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
    previousPage({ commit }) {
      commit('previousPage');
    },
    nextPage({ commit }) {
      commit('nextPage');
    },
  //   addFriend(context){
  //       context.commit('addFriend');
  //   },
  //   removeFriend(context, payload){
  //     context.commit('removeFriend', payload)
  //   },
  //   removeFriendInvitation(context, payload){
  //     context.commit('removeInvitation', payload)
  //   }
  },
}