import {createStore} from 'vuex'
import Notifications from './notifications/index.js';
import Users from './users/index.js';

const state = createStore({
  modules: {
    Notifications,
    Users
  },
  state() {
    return {
      isAuthenticated: false
    }
  },
  mutations: {
    authenticateUser() {
      this.isAuthenticated=true;
    },
    unauthenticateUser() {
      this.isAuthenticated=false;
    }
  },
  actions: {
    login() {
      this.authenticateUser()
    },
    logout() {
      this.unauthenticateUser();
    }
  }
});

export default state;