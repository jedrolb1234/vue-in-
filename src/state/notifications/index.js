export default {
  state() {
    return {
      id: 0,
      notifications: [],
      templates: {
        account_created: {
          label:'Konto zostało utworzone pomyślnie',
          description:'Link aktywacyjny został wysłany na twoją skrytkę pocztową.',
          type: 'info'
        },
        registration_form_invalid: {
          label:'Wypełnij formularz poprawnymi danymi.',
          description:'Pamiętaj, że hasło musi posiadać minimum 8 znaków oraz powinno zawierać małą i dużą literę, cyfrę oraz znaku specjalny. ',
          type: 'error'
        }
      }
    }
  },
  mutations: {
    addNotification(state, notification) {
      state.notifications.unshift(notification);
    },
    removeNotification(state, id) {
      state.notifications = state.notifications.filter(el => el.id !=id )
    },
    incrementId(state) {
      state.id++;
    }
  },
  actions: {
    showNotification(context, notification) {
      const n = {
        id: context.getters.getId,
        ...notification
      };
      context.commit('incrementId');
      context.commit('addNotification', n);
    },
    hideNotification(context, id) {
      context.commit('removeNotification', id);
    }
  },
  getters: {
    getNotificationTemplates(state) {
      return state.templates;
    },
    getNotifications(state) {
      return state.notifications;
    },
    getId(state) {
      return state.id;
    }
  }
};