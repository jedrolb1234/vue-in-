export default {
  state() {
    return {
      notifications: [],
      templates: {
        account_created: {
          label:'Konto zostało utworzone pomyślnie',
          description:'Link aktywacyjny został wysłany na twoją skrytkę pocztową.',
          type: 'info'
        },
        resetpassword_email_sent: {
          label:'Email został pomyślnie wysłany',
          description:'Link do zmiany hasła został wygenerowany i wysłany na twoją skrzynke pocztową. ',
          type: 'info'
        },
        password_changed: {
          label:'Hasło zostało pomyślnie zmienione',
          description:'Podczas logowania skorzystaj z nowego hasła.',
          type: 'info'
        },
        registration_form_invalid: {
          label:'Wypełnij formularz poprawnymi danymi.',
          description:'Pamiętaj, że hasło musi posiadać minimum 8 znaków oraz powinno zawierać małą i dużą literę, cyfrę oraz znaku specjalny.',
          type: 'error'
        },
        common_error: {
          label:'Coś poszło nie tak!',
          description:'Wystąpił nieznany błąd.',
          type: 'error'
        },
        login_form_invalid: {
          label:'Wypełnij formularz poprawnymi danymi.',
          description:'Podaj prawidłowy email oraz hasło.',
          type: 'error'
        },
        user_logged: {
          label: 'Zalogowałeś sie pomyślnie!',
          description: 'Zosatniesz przekierowany do panelu użytkownika.',
          type: 'info'},
        user_name: {
          label: 'Wprowadono niepoprawne dane!',
          description: 'Użyto niedozwolonych znaków.',
          type: 'info',
        },
        user_name_to_short: {
          label: 'Wprowadono niepoprawne dane!',
          description: 'Nazwa użtkownika musi zawierać conajmniej 1 literę.',
          type: 'info',
        },
        game_romm_created: {
          label: 'Pokój gry został poprawnie utowrzony!',
          description: 'Zaproś znajomych i rozpocznij rozgrywkę.',
          type: 'info',
        }
      }
    }
  },
  mutations: {
    addNotification(state, notification) {
      state.notifications.push(notification);
    },
    removeNotification(state, id) {
      state.notifications = state.notifications.filter(el => el.id !=id )
    }
  },
  actions: {
    showNotification(context, notification) {
      const n = {
        id: new Date().getTime(),
        ...notification
      };
      context.commit('addNotification', n);

      setTimeout(() => {
        context.dispatch('hideNotification', n.id);
      }, 60000);
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
    }
  }
};