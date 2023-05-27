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
    }
  },
  mutations: {
    login(_state, authenticationKey) {
      localStorage.setItem('token', JSON.stringify(authenticationKey));
    },
    logout() {
      localStorage.setItem('token', null);
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
          console.log(error.response.data.errors);
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
    logOutUser() {
      localStorage.removeItem('token');
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
          console.log(error.response.data.errors);
          informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async changePassword(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      console.log(payload);
      let res;
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_PASSWORD_CHANGE_ENDPOINT, payload);
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.password_changed, { root: true });
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
  },
  getters: {
    isAuthenticated() {
      let token = JSON.parse(localStorage.getItem('token'));
      if (token == null)
        return false;
      return true;
    }
  }
};