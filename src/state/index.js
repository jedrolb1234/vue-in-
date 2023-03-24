import {createStore} from 'vuex'

const state = createStore({
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