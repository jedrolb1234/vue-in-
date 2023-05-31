import Router from '@/router';
import apiResponseErrors from '@/mixins/apiResponseErrors';

function informUserAbouErrors(context, errors) {
  let description = "";
  for (const e in errors) {
    for (const m in errors[e]) {
      description += apiResponseErrors[errors[e][m]] + '\n';
    }
  }
  context.dispatch('showNotification',
    {
      label: 'Konto nie mogło zostać stworzone',
      description: description,
      type: 'error'
    },
    { root: true });
}

export default {
  state() {
    return {
      lastLogin: null
    }
  },
  mutations: {
    login(state, data) {
      sessionStorage.setItem('token', JSON.stringify(data.accessToken));
      sessionStorage.setItem('refresh_token', JSON.stringify(data.refreshToken));
      state.lastLogin = Date.now();
    },
    logout(state) {
      sessionStorage.setItem('token', null);
      sessionStorage.setItem('refresh_token', null);
      state.lastLogin = null;
    }
  },
  actions: {
    async registerUser(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_REGISTER_USER_ENDPOINT, payload);
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.account_created, { root: true });
        }
      } catch (error) {
        if (error.response) {
          informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async loginUser(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_LOGIN_ENDPOINT, payload);
        if (res.status == 200) {
          context.commit('login', res.data);
          context.dispatch('showNotification', notificationTemplates.user_logged, { root: true });
          Router.push({ name: 'games' });
        }
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
    },
    async activateUser(_context, id) {
      const axios = require('axios');
      let res;
      try {
        res = await axios.patch(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACTIVATE_USER_ENDPOINT + id);
      } catch (error) {
        if (error.response) {
          return 'failed';
        }
      }
      if (res.status == 200)
        return 'success';
      return 'failed';
    },
    logOutUser(context) {
      context.commit('logout');
      Router.push({ name: 'landing-page' });
    },
    async requestPasswordChange(context, email) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      const formData = new FormData();
      formData.append('emailAddress', email);
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_REQUEST_PASSWORD_CHANGE_ENDPOINT, formData);
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.resetpassword_email_sent, { root: true });
        }
      } catch (error) {
        if (error.response) {
          informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async changePassword(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_PASSWORD_CHANGE_ENDPOINT, payload);
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.password_changed, { root: true });
        }
      } catch (error) {
        if (error.response) {
          informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async refreshToken(context) {
      if (context.getters.getLastLogin + process.env.VUE_APP_REFRESH_TOKEN_TIMEOUT < Date.now()) {
        const notificationTemplates = context.rootGetters.getNotificationTemplates;
        const axios = require('axios');
        const config = {
          headers: {
            refreshToken: JSON.parse(sessionStorage.getItem('refresh_token')),
          }
        }
        let res;
        try {
          res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_REFRESH_TOKEN_ENDPOINT, null, config);
          if (res.status == 200) {
            context.commit('login', res.data);
          }
        } catch (error) {
          if (error.response) {
            context.dispatch('logOutUser');
            context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
          }
        }
      }
    }
  },
  getters: {
    isAuthenticated() {
      const token = JSON.parse(sessionStorage.getItem('token'));
      const refresh_token = JSON.parse(sessionStorage.getItem('refresh_token'));
      if (token == null || refresh_token == null)
        return false;
      return true;
    },
    getLastLogin(state) {
      return state.lastLogin;
    }
  }
};