import Notifications from '@/state/notifications/index.js';

export default {
    namespaced: true,
    modules: {
        Notifications,
    },
    state() {
      return {
        searchedUser:{
            id: 0,
            name: '',
            surname: '',
            lastLogin: '',
            lastGame: ''
        },
        isLoading: false,
        hasFriends: true,
        isUsernameValid: false,
        showAddButton: false,
        findUser: null,
        itemsPerPage: 10,
        currentPage: 1,
        username: '',
        friends:[
            {
                id:0,
                name: 'Andrzej',
                surname: 'Bidermann',
                lastLogin: '2023-05-17',
                lastGame: 'Warcaby'
            },
            {
                id:1,
                name: 'Tomek',
                surname: 'B',
                lastLogin: '2023-05-01',
                lastGame: 'Statki'
            },
            {
                id:2,
                name: 'Rafał',
                surname: 'Rafał',
                lastLogin: '2023-04-10',
                lastGame: 'Warcaby'
            },
            {
                id:0,
                name: 'Daniel',
                surname: 'Daniel',
                lastLogin: '2022-12-17',
                lastGame: 'Polacz4'
            },
            {
                id:0,
                name: 'Andrzej',
                surname: 'Bidermann',
                lastLogin: '2023-05-17',
                lastGame: 'Warcaby'
            },
            {
                id:1,
                name: 'Tomek',
                surname: 'B',
                lastLogin: '2023-05-01',
                lastGame: 'Statki'
            },
            {
                id:2,
                name: 'Rafał',
                surname: 'Rafał',
                lastLogin: '2023-04-10',
                lastGame: 'Warcaby'
            },
            {
                id:0,
                name: 'Daniel',
                surname: 'Daniel',
                lastLogin: '2022-12-17',
                lastGame: 'Polacz4'
            },
            {
                id:0,
                name: 'Andrzej',
                surname: 'Bidermann',
                lastLogin: '2023-05-17',
                lastGame: 'Warcaby'
            },
            {
                id:1,
                name: 'Tomek',
                surname: 'B',
                lastLogin: '2023-05-01',
                lastGame: 'Statki'
            },
            {
                id:2,
                name: 'Rafał',
                surname: 'Rafał',
                lastLogin: '2023-04-10',
                lastGame: 'Warcaby'
            },
            {
                id:0,
                name: 'Daniel',
                surname: 'Daniel',
                lastLogin: '2022-12-17',
                lastGame: 'Polacz4'
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
      if (state.currentPage < Math.ceil(state.friends.length / state.itemsPerPage)){
        state.currentPage++;
      }
    },
    setUserName(state, user){
      state.username = user;
    },
    findFriend(state, username){
      state.username = username;
      console.log(state.username, ' username')
      if (username.length !== 0){
          for (var i = 0; i < state.friends.length; i++){
              var key = state.friends[i].name
              if(key === state.username){
                  state.searchedUser = state.friends[key];
                  state.findUser = true;
                  console.log('znaleziono', state.username);
                  break;
              }
              else{
                  state.searchedUser = {};
                  state.showAddButton = false;
                  state.findUser = false;
                  console.log('nie znaleziono', key, '++++', state.username);
              }
          }
          console.log(state.searchedUser, 'searched');
      }
      else{
          if(state.username.length === 0){
              Notifications.showNotification(Notifications.getNotificationTemplates.user_name_to_short);
          }
          else{
              Notifications.showNotification(Notifications.getNotificationTemplates.user_name);
          }
      }
    },
    addFriend(state){
      state.friends[state.searchedUser.name] = state.searchedUser;
    },
    removeFriend(state, key){
      state.friends.splice(key, 1);
       console.log(state.friends, '000000')
    }
  },
  getters: {
    isLoading(state) {
      console.log(state.isLoading)
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
    avilabeFriends(state){
      console.log(state.hasFriends)
      return state.hasFriends;
    },
    getFindUser(state){
      console.log(state.findUser, 'user')
      return state.findUser;
    },
    getCurrentPage(state){
      return state.currentPage;
    },
    getItemsPerPage(state){
      return state.itemsPerPage;
    }
  },
  actions: {
    previousPage({ commit }) {
      commit('previousPage');
    },
    nextPage({ commit }) {
      commit('nextPage');
    },
    findFriend(context, username){
      context.commit('findFriend', username)
      
    },
    addFriend(context){
        context.commit('addFriend');
    },
    removeFriend(context, payload){
      context.commit('removeFriend', payload)
    }
  },
}