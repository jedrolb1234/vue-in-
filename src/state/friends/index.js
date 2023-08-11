import Notifications from '@/state/notifications/index.js';
import Router from '@/router';Router

export default {
    namespaced: true,
    modules: {
        Notifications,
    },
    state() {
      return {
        id: null,
        index: null,
        friendsCount:0,
        friendsPages:0,
        searchedUser:{ },
        isLoading: true,
        // hasFriends: true,
        isUsernameValid: false,
        showAddButton: false,
        avilabeInvitations: true,
        findUser: null,
        itemsPerPage: 10,
        currentPage: 1,
        invCurrentPage: 1,
        username: '',
        friends:[ ],
        invitations:[ ],
        dynamicHeight: 0,
        visibleMessage: false,
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
    setFriends(state,value){
      state.friends = value;
    },
    cutFriends(state, value){
      for(let i = 0; i< state.friends.length;i++){
        if(value === state.friends[i].userId){
         state.friends.splice(i,1)
         console.log(state.friends)
        }
      }
    },
    cutInvitations(state, value){
      console.log(state.invitations)
      for(let i = 0; i<state.invitations.length;i++){
        if(value === state.invitations[i].id){
         state.invitations.splice(i,1)
         console.log(state.invitations)
        }
      }
    },
    showPopup(state, payload){
      state.visibleMessage = payload.visible;
      state.id = payload.id;
      state.index = payload.index;
    },
    hidePopup(state, payload){
      state.visibleMessage = payload;
    },
    setFriendsCount(state, value){
      state.friendsCount = value;
    },
    setFriendsPages(state, value){
      state.friendsPages = value;
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    currentPage(state){
      let startIndex = (state.currentPage - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      let sliced = state.friends.slice(startIndex, endIndex);   
      state.dynamicHeight = (10 - sliced.length ) * 38;
      return sliced;     
    },
    pageNr(state){
      return state.currentPage;
    },
    allPages(state){
      return Math.ceil(state.friends.length / state.itemsPerPage);
    },
    invCurrentPage(state){
      let startIndex = (state.invCurrentPage - 1) * state.itemsPerPage;
      let endIndex = startIndex + state.itemsPerPage;
      let sliced = state.invitations.slice(startIndex, endIndex);   
      state.dynamicHeight = (10 - sliced.length ) * 38;
      return sliced;     
    },
    invPageNr(state){
      return state.invCurrentPage;
    },
    invAllPages(state){
      return Math.ceil(state.invitations.length / state.itemsPerPage);
    },
    getFriends(state){
      console.log(state.friends)
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
    },
    getDynamicHeight(state){
      return state.dynamicHeight;
    },
    getIsVisibleMessage(state){
      console.log(state.visibleMessage)
      return state.visibleMessage;
    },
    getId(state){
      console.log(state.id)
      return state.id;
    },
    getIndex(state){
      return state.index;
    },
    getFriendsPages(state){
      return state.friendsPages;
    },
    getFriendsCount(state){
      return state.friendsCount;
    }
  },
  actions: {
    find(context, username){
      if (username.length === 0){
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
          context.dispatch('showNotification', notificationTemplates.user_name_to_short);
      }else
      return context.dispatch('findFriend', username);
  },
    async removeFriend(context, payload){
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = context.rootGetters.getToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
      res = await axios.delete(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT 
                            + "/" + payload, {headers}); 
      if (res.status === 200) {
        context.commit('cutFriends', payload)
        context.commit('showPopup', {visible:false, id:null, index:null});
        //zrobic downloadFriends z numerem strony na ktrej kasowalismy uzytkownika
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
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = context.rootGetters.getToken
      const headers = {
        Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try { 
      res = await axios.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT +'/'
                            + payload + process.env.VUE_APP_INVITATION_REJECT_ENDPOINT, null, {headers}); 
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
      context.username = username;
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = context.rootGetters.getToken;
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
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = context.rootGetters.getToken;
      const headers = {
            Authorization: `Bearer ${token}`,
        };
      const axios = require('axios');
      let res;
      try {
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_INVITATIONS_ENDPOINT, {headers}); 
      if (res.status === 200) {
          context.commit('setInvitations', res.data.items);
          // console.log(res.data)
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
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const token = context.rootGetters.getToken;
      const headers = {
            Authorization: `Bearer ${token}`,
        };
      // const params = {

      // }
      const axios = require('axios');
      let res;
      try { 
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT, {headers}); 
      if (res.status === 200) {
        console.log(res.data, 'aaa')
          context.commit('setFriends', res.data.items);          
          context.commit('tooleIsLoading', false);
          context.commit('setFriendCount', res.data.totalItemsCount)
          context.commit('setFriendsPages', res.data.totalPages)
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
    previousPage({ commit }) {
      commit('previousPage');
    },
    nextPage({ commit }) {
      commit('nextPage');
    },
    invPreviousPage({ commit }) {
      commit('invPreviousPage');
    },
    invNextPage({ commit }) {
      commit('invNextPage');
    },
    showRemovePopup(context, userId, index){
      context.commit('showPopup', {visible:true, id:userId, index:index});
    },
    hideRemovePopup(context){
      context.commit('hidePopup', false);
    }
  },
}