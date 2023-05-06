export default {
  state() {
    return {
    }
  },
  mutations: {
    login(_state, authenticationKey) {
      localStorage.setItem( 'token', JSON.stringify(authenticationKey) );
    },
    logout() {
      localStorage.setItem( 'token', null );
    }
  },
  actions: {
    async registerUser(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + '/api/account/register', payload);
      } catch (error) {
        if (error.response) {
          context.dispatch('showNotification',
            {
              label: error.response.status,
              description: error.response.data.errors,
              type: 'error'
            },
            { root: true });
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
      if (res.status == 200) {
        context.dispatch('showNotification', notificationTemplates.account_created, { root: true });
      }
    },
    async loginUser(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + '/api/account/login', payload);
      } catch (error) {
        if (error.response) {
          context.dispatch('showNotification',
            {
              label: 'Logowanie się nie powiodło!',
              description: 'Dane logowania są nieprawidłowe.',
              type: 'error'
            },
            { root: true });
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
      if (res.status == 200) {
        context.commit('login', res.data);
        context.dispatch('showNotification', notificationTemplates.user_logged, { root: true });
      }
    },
    async activateUser(_context, id) {
      const axios = require('axios');
      let res;
      try {
        res = await axios.patch(process.env.VUE_APP_BACKEND_URL + '/api/account/activate/' + id);
      } catch (error) {
        if (error.response) {
         return 'failed';
        }
      }
      if (res.status == 200)
        return 'success';
      return 'failed';
    }
  },
  getters: {
    isAuthenticated() {
      let token = JSON.parse( localStorage.getItem('token') );
      if (token==null)
        return false;
      return true;
    }
  }
};