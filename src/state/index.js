import {createStore} from 'vuex'
import Notifications from '@/state/notifications/index.js';
import Users from '@/state/users/index.js';
import LeftPanelState from '@/state/leftPanel/index.js';

const state = createStore({
  modules: {
    Notifications,
    Users,
    LeftPanelState
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