import Router from '@/router';
import apiResponseErrors from '@/mixins/apiResponseErrors';
import AxiosInstance from '@/mixins/axiosInstance';

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
        // context.dispatch('obtainUserInfo', null, { root: true });
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
    context.dispatch('resetUserData');
    context.commit('logout');
    Router.push({ name: 'landing-page' });
  },
  redirectPassword(context) {
    context.commit('logout');
    Router.push({ name: 'resetpassword' });
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
      context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
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
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    }
  },
  async deleteAccount(context) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    let res;
    try {
      res = await AxiosInstance.delete(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT);
      if (res.status == 200) {
        context.dispatch('showNotification', notificationTemplates.account_deleted, { root: true });
        context.dispatch('logOutUser');
      }
    } catch (error) {
      context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
    }
  },
  async downloadSettings(context) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT + process.env.VUE_APP_SETTING);
      if (res.status === 200) {
        context.commit('setSettings', res.data)
        context.commit('setUserAvatar', res.data.avatar)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401 || error.response.data == 'InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else if (error.response.data === "UserNotExist") {
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
  async sendSettings(context) {
    let settings = context.state.settings;
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    let res;
    try {
      res = await AxiosInstance.put(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT, settings);
      if(res.status == 200 )
        context.dispatch('showNotification', notificationTemplates.settings_saved, {root: true});
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
  setUserAvatar(context, avatar) {
    context.commit('changeUserAvatar', avatar)
  },
  setTheme(context, theme) {
    context.commit('changeTheme', theme)
  },
  setUsername(context, username) {
    context.commit('changeUsername', username);
  },
  setDescription(context, description) {
    context.commit('changeDescription', description);
  },
  setName(context, name) {
    context.commit('changeName', name);
  },
  setSurname(context, surname) {
    context.commit('changeSurname', surname);
  },
  setBirthDate(context, birthDate) {
    context.commit('changeBirthDate', birthDate);
  },
  setEmail(context, email) {
    context.commit('changeEmail', email);
  },
  async obtainUserInfo(context) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_ACCOUNT + '/' + context.getters.getUserId);
      if (res.status == 200) {
        return;
      }
    } catch (error) {
      if (error.response.status == 401 || error.response.data == 'InvalidRefreshToken') {
        context.dispatch('logOutUser');
      }
      else {
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    }
  },
  resetPassword(context) {
    context.commit('popupPassword', true)
  },
  hidePopup(context) {
    context.commit('popupPassword', false)
  },
  showDeletePopup(context) {
    context.commit('popupDelete', true)
  },
  hideDeletePopup(context) {
    context.commit('popupDelete', false)
  },
  async downloadTheme(context) {
    const notificationTemplates = context.rootGetters.getNotificationTemplates;
    let res;
    try {
      res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + '/account/settings');
      if (res.status === 200) {
        context.commit('setTheme', res.data.theme)
      }
    } catch (error) {
      if (error.response.status == 401 || error.response.data == 'InvalidRefreshToken') {
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
  resetUserData(context) {
    context.commit('setSettings', {});
  }
}