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
        remUser: '',
        friendsCount:0,
        friendsPages:0,
        searchedUser:{ },
        isLoading: true,
        isUsernameValid: false,
        showAddButton: false,
        avilabeInvitations: true,
        findUser: null,
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: null,
        invCurrentPage: 1,
        invPages: 1,
        username: '',
        friends:[ ],
        invitations:[ ],
        dynamicHeight: 0,
        rowHeight: 38,
        visibleMessage: false,
        }
  },
  mutations: {
    previousPage(state){
        state.currentPage--;
    },
    nextPage(state){
        state.currentPage++;
    },
    invPPage(state){
        state.invCurrentPage--;
    },
    invNPage(state){
        state.invCurrentPage++;
    },
    setUserName(state, user){
      state.username = user;
    },
    toogleFindUser(state, value){
      state.findUser = value; 
    },
    tooleIsLoading(state, value){
      state.isLoading = value;
    },
    setSearchedUser(state, value){
      let inputDate = new Date(value.dateOfBirth);
      let day = inputDate.getDate().toString().padStart(2, '0');
      let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      let year = inputDate.getFullYear().toString();
      let formattedDate = `${year}-${month}-${day}`;
      state.searchedUser = value;
      state.searchedUser.dateOfBirth = formattedDate;
    },
    setInvitations(state, value){
      state.invitations = value;
      for (let i = 0; i < state.invitations.length; i++){
        let inputDate = new Date(value.lastActivityDate);
        let day = inputDate.getDate().toString().padStart(2, '0');
        let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        let year = inputDate.getFullYear().toString();
        let formattedDate = `${year}-${month}-${day}`;
        state.invitations[i].lastActivityDate = formattedDate;
      }
    },
    setFriends(state,value){
      state.friends = value;
      for (let i = 0; i < state.friends.length; i++){
        let inputDate = new Date(value.lastActivityDate);
        let day = inputDate.getDate().toString().padStart(2, '0');
        let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        let year = inputDate.getFullYear().toString();
        let formattedDate = `${year}-${month}-${day}`;
        state.friends[i].lastActivityDate = formattedDate;
      }console.log(state.friends)
      if(state.friends.length != 10){
      state.dynamicHeight = (state.itemsPerPage - state.friends.length ) * state.rowHeight;
      }
    },
    showPopup(state, payload){
      state.visibleMessage = payload.visible;
      state.id = payload.id;
      state.remUser = payload.user;
    },
    hidePopup(state, payload){
      state.visibleMessage = payload;
      state.id = null;
      state.remUser = null;
    },
    setFriendsCount(state, value){
      state.friendsCount = value;
    },
    setFriendsPages(state, value){
      state.friendsPages = value;
    },
    setInvCount(state, value){
      state.invCount = value;
    },
    setInvPages(state, value){
      state.invPages = value;
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    pageNr(state){
      return state.currentPage;
    },
    invPageNr(state){
      return state.invCurrentPage;
    },
    getInvPages(state){
      return state.invPages;
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
    },
    getDynamicHeight(state){
      return state.dynamicHeight;
    },
    getIsVisibleMessage(state){
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
    },
    getRemUser(state){
      return state.remUser;
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
        context.commit('showPopup', {visible:false, id:null, index:null});
        context.dispatch('downloadFriends')
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
      if (res.status === 200) {
          context.commit('setSearchedUser', res.data);
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
        const params = {
          PageNumber: context.state.invCurrentPage,
          PageSize: context.state.itemsPerPage,
        }
      const axios = require('axios');
      let res;
      try {
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_INVITATIONS_ENDPOINT, {headers: headers, params:params});

      if (res.status === 200) {
          context.commit('setInvitations', res.data.items);
          context.commit('setInvCount', res.data.totalItemsCount)
          context.commit('setInvPages', res.data.totalPages)
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
        const params = {
          PageNumber: context.state.currentPage,
          PageSize: context.state.itemsPerPage,
        }
      const axios = require('axios');
      let res;
      try { 
      res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT, {headers:headers, params:params}); 
      if (res.status === 200) {
        console.log(res.data, 'aaa')
          context.commit('setFriends', res.data.items);          
          context.commit('tooleIsLoading', false);
          context.commit('setFriendsCount', res.data.totalItemsCount)
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
    previousPage(context) {
      if (context.state.currentPage > 1){
          context.commit('previousPage');
          context.dispatch('downloadFriends');
      }
    },
    nextPage(context ) {
      if(context.state.currentPage < context.state.friendsPages){
        context.commit('nextPage');
        context.dispatch('downloadFriends');
      }
    },
    invPreviousPage(context) {
      if(context.state.invCurrentPage > 1){
        context.commit('invPPage');
        context.dispatch('downloadInvitations')
      }
    },
    invNextPage(context) {
      if(context.state.invCurrentPage < context.state.invPages){
        context.commit('invNPage');
        context.dispatch('downloadInvitations')
      }
    },
    showRemovePopup(context, f){
      context.commit('showPopup', {visible:true, id:f.userId, user:f.userName});
      },
    hideRemovePopup(context, payload){
      context.commit('hidePopup', payload);

    }
  },
}