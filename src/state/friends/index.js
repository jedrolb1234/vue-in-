import Notifications from '@/state/notifications/index.js';
import AxiosInstance from '@/mixins/axiosInstance';

export default {
  namespaced: true,
  modules: {
    Notifications,
  },
  state() {
    return {
      id: null,
      remUser: '',
      friendsCount: 0,
      friendsPages: 0,
      searchedUser: {},
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
      friends: [],
      invitations: [],
      dynamicHeight: 0,
      rowHeight: 38,
      visibleMessage: false,
    }
  },
  mutations: {
    previousPage(state) {
      state.currentPage--;
    },
    nextPage(state) {
      state.currentPage++;
    },
    invPPage(state) {
      state.invCurrentPage--;
    },
    invNPage(state) {
      state.invCurrentPage++;
    },
    setUserName(state, user) {
      state.username = user;
    },
    toogleFindUser(state, value) {
      state.findUser = value;
    },
    tooleIsLoading(state, value) {
      state.isLoading = value;
    },
    setSearchedUser(state, value) {
      let formattedDate;
      if(value.dateOfBirth === ""){  
        let day = "";
        let month = "";
        let year = "";
        formattedDate = `${year}-${month}-${day}`;
      }else{
        let inputDate = new Date(value.dateOfBirth);
        let day = inputDate.getDate().toString().padStart(2, '0');
        let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        let year = inputDate.getFullYear().toString();   
        formattedDate = `${year}-${month}-${day}`; 
      }
      state.searchedUser = value;
      state.searchedUser.dateOfBirth = formattedDate;
    },
    setInvitations(state, value) {
      state.invitations = value;
      for (let i = 0; i < state.invitations.length; i++) {
        let inputDate = new Date(state.invitations[i].lastActivityDate);
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
          if(Math.floor(diffrentMinutes) > 1 && Math.floor(diffrentMinutes) >= 5 )
            formattedDate = `${Math.floor(diffrentMinutes)} minut temu`;
        }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays === 0 && diffrentMonths === 0 && diffrentYears === 0){
          if(Math.floor(diffrentHours)  === 1)
            formattedDate = `${Math.floor(diffrentHours)} godzię temu`;
          if(Math.floor(diffrentHours) > 1 && Math.floor(diffrentHours) < 5)
            formattedDate = `${Math.floor(diffrentHours)} godziny temu`;
          if(Math.floor(diffrentHours) >= 5)
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
          if(Math.floor(diffrentMonths) >= 5) 
            formattedDate = `${Math.floor(diffrentMonths)} miesięcy temu`;        
         }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays > 0 && diffrentMonths > 0 && diffrentYears > 0){
          if(Math.floor(diffrentYears) === 1)
            formattedDate = `${Math.floor(diffrentYears)} rok temu`;
          else formattedDate = `${Math.floor(diffrentYears)} lata temu`;}
      state.invitations[i].lastActivityDate = formattedDate;
      }
    },
    setFriends(state, value) {
      state.friends = value; 
      for (let i = 0; i < state.friends.length; i++) {
        let inputDate = new Date(state.friends[i].lastActivityDate);
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
          if(Math.floor(diffrentMinutes) > 1 && Math.floor(diffrentMinutes) >= 5 )
            formattedDate = `${Math.floor(diffrentMinutes)} minut temu`;
        }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays === 0 && diffrentMonths === 0 && diffrentYears === 0){
          if(Math.floor(diffrentHours)  === 1)
            formattedDate = `${Math.floor(diffrentHours)} godzię temu`;
          if(Math.floor(diffrentHours) > 1 && Math.floor(diffrentHours) < 5)
            formattedDate = `${Math.floor(diffrentHours)} godziny temu`;
          if(Math.floor(diffrentHours) >= 5)
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
          if(Math.floor(diffrentMonths) >= 5) 
            formattedDate = `${Math.floor(diffrentMonths)} miesięcy temu`;        
         }
        if(diffrentMinutes >=0 && diffrentHours > 0 && diffrentDays > 0 && diffrentMonths > 0 && diffrentYears > 0){
          if(Math.floor(diffrentYears) === 1)
            formattedDate = `${Math.floor(diffrentYears)} rok temu`;
          else formattedDate = `${Math.floor(diffrentYears)} lata temu`;}
      state.friends[i].lastActivityDate = formattedDate;
      }
      for (let i = 0; i < value.length; i++) {      
        if(value[i].lastGameTypeId === 0)
          state.friends[i].lastGame ='Warcaby';
        if(value[i].lastGameTypeId === 1)
          state.friends[i].lastGame ='Okręty';
        if(value[i].lastGameTypeId === 2)
          state.friends[i].lastGame = 'Połącz 4';
      }
    },
    showPopup(state, payload) {
      state.visibleMessage = payload.visible;
      state.id = payload.id;
      state.remUser = payload.user;
    },
    hidePopup(state, payload) {
      state.visibleMessage = payload;
      state.id = null;
      state.remUser = null;
    },
    setFriendsCount(state, value) {
      state.friendsCount = value;
    },
    setFriendsPages(state, value) {
      state.friendsPages = value;
    },
    setInvCount(state, value) {
      state.invCount = value;
    },
    setInvPages(state, value) {
      state.invPages = value;
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    pageNr(state) {
      return state.currentPage;
    },
    invPageNr(state) {
      return state.invCurrentPage;
    },
    getInvPages(state) {
      return state.invPages;
    },
    getFriends(state) {
      return state.friends;
    },
    getUser(state) {
      return state.searchedUser;
    },
    getFindUser(state) {
      return state.findUser;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getItemsPerPage(state) {
      return state.itemsPerPage;
    },
    getAvilabeInvitations(state) {
      return state.invitations.length;
    },
    getInvitations(state) {
      return state.invitations;
    },
    getDynamicHeight(state) {
      return state.dynamicHeight;
    },
    getIsVisibleMessage(state) {
      return state.visibleMessage;
    },
    getId(state) {
      return state.id;
    },
    getIndex(state) {
      return state.index;
    },
    getFriendsPages(state) {
      return state.friendsPages;
    },
    getFriendsCount(state) {
      return state.friendsCount;
    },
    getRemUser(state) {
      return state.remUser;
    }
  },
  actions: {
    find(context, username) {
      if (username.length === 0) {
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        context.dispatch('showNotification', notificationTemplates.user_name_to_short);
      } else
        return context.dispatch('findFriend', username);
    },
    async removeFriend(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.delete(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT
          + "/" + payload);
        if (res.status === 200) {
          context.commit('showPopup', { visible: false, id: null, index: null });
          context.dispatch('downloadFriends')
          //zrobic downloadFriends z numerem strony na ktrej kasowalismy uzytkownika
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
    async removeFriendInvitation(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT + '/'
          + payload + process.env.VUE_APP_INVITATION_REJECT_ENDPOINT, null);
        if (res.status === 200) {
          context.dispatch('downloadInvitations', payload);
        }
      } catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
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
    clearSearchFriend(context) {
      context.commit('setSearchedUser', {});
      context.commit('toogleFindUser', null);
    },
    async findFriend(context, username) {
      context.username = username;
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_ACCOUNT_ENDPOINT + context.username);
        if (res.status === 200) {
          context.commit('setSearchedUser', res.data);
          context.commit('toogleFindUser', true);
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
    async downloadInvitations(context) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const params = {
        PageNumber: context.state.invCurrentPage,
        PageSize: context.state.itemsPerPage,
      }
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_INVITATIONS_ENDPOINT, { params: params });

        if (res.status === 200) {
          context.commit('setInvitations', res.data.items);
          context.commit('setInvCount', res.data.totalItemsCount)
          context.commit('setInvPages', res.data.totalPages)
        }
      } catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
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
    async downloadFriends(context) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const params = {
        PageNumber: context.state.currentPage,
        PageSize: context.state.itemsPerPage,
      }
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_GET_FRIENDSHIP_ENDPOINT, { params: params });
        if (res.status === 200) {
          context.commit('setFriends', res.data.items);
          context.commit('tooleIsLoading', false);
          context.commit('setFriendsCount', res.data.totalItemsCount)
          context.commit('setFriendsPages', res.data.totalPages)
        }
      } catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
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
    previousPage(context) {
      if (context.state.currentPage > 1) {
        context.commit('previousPage');
        context.dispatch('downloadFriends');
      }
    },
    nextPage(context) {
      if (context.state.currentPage < context.state.friendsPages) {
        context.commit('nextPage');
        context.dispatch('downloadFriends');
      }
    },
    invPreviousPage(context) {
      if (context.state.invCurrentPage > 1) {
        context.commit('invPPage');
        context.dispatch('downloadInvitations')
      }
    },
    invNextPage(context) {
      if (context.state.invCurrentPage < context.state.invPages) {
        context.commit('invNPage');
        context.dispatch('downloadInvitations')
      }
    },
    showRemovePopup(context, f) {
      context.commit('showPopup', { visible: true, id: f.userId, user: f.userName });
    },
    hideRemovePopup(context, payload) {
      context.commit('hidePopup', payload);

    }
  },
}