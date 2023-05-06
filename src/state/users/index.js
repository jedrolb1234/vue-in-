export default {
    state() {
      return {
      }
    },
    mutations: {
    //   addNotification(state, notification) {
    //     state.notifications.push(notification);
    //   }
    },
    actions: {
    //   showNotification(context, notification) {
    //     const n = {
    //       id: new Date().getTime(),
    //       ...notification
    //     };
    //     context.commit('incrementId');
    //     context.commit('addNotification', n);
  
    //     setTimeout(() => {
    //       context.dispatch('hideNotification', n.id);
    //     }, 60000);
    //   },
    //   hideNotification(context, id) {
    //     context.commit('removeNotification', id);
    //   }
    async createUser(context, payload) {

      const notificationTemplates = context.rootGetters.getNotificationTemplates;

      const axios = require('axios');

      let res;

      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL+'/api/account/register', payload);
      } catch(error) {
        if (error.response) {
          context.dispatch('showNotification',
          {
            label: error.response.status,
            description: error.response.data.errors,
            type:'error'
          },
          {root : true});
        } else {
          // Anything else
          context.dispatch('showNotification', notificationTemplates.common_error, {root:true});
        }
      }
      
      //console.log(res);
      
      if (res.status==200) {
        context.dispatch('showNotification', notificationTemplates.account_created, {root:true});
      }
    }
    },
    getters: {
    //   getNotificationTemplates(state) {
    //     return state.templates;
    //   },
    }
  };