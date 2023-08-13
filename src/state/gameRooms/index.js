import Router from '@/router';
import axios from 'axios';

export default {
  state() {
    return {
      gameRooms: [],
      selectedGameRoom: {}
    }
  },
  mutations: {
    clearGameRooms(state) {
      state.gameRooms = [];
    },
    clearSelectedGameRoom(state) {
      state.selectedGameRoom = {};
    },
    setSelectedGameRoom(state, selectedGameRoom) {
      state.selectedGameRoom = selectedGameRoom;
    },
    addGameRoom(state, gameRoom) {
      const players = gameRoom.players.map((player) => {
        return player.userName
      })
      state.gameRooms.push({ id: gameRoom.id, name: gameRoom.roomName, players: players, rquiredNumberOfPlayers: gameRoom.requiredNumberOfPlayers, owner: gameRoom.ownerUsername, isPrivate: gameRoom.isPrivate });
    }
  },
  actions: {
    async createNewGameRoom(context, payload) {
      context.dispatch('refreshToken', {}, { root: true });
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      const headers = {
        Authorization: 'Bearer ' + context.rootGetters.getToken
      };
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_CREATE_GAME_ROOM_ENDPOINT, payload, { headers });
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.game_romm_created, { root: true });
          const gameRoomID = res.data;
          Router.push({ name: 'play', params: { gameRoomID: gameRoomID } });
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGameRooms(context, gameID) {
      context.dispatch('refreshToken', {}, { root: true });
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      const headers = {
        Authorization: 'Bearer ' + context.rootGetters.getToken,
        'Accept-Encoding': 'application/json'
      };
      try {
        res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, { params: { gameTypeId: gameID, status: 0 } }, { headers });
        if (res.status == 200) {
          const gameRooms = res.data;
          context.commit('clearGameRooms');
          for (let i = 0; i < gameRooms.length; i++) {
            context.commit('addGameRoom', gameRooms[i]);
          }
        }
      } catch (error) {
        if (error.response) {
          //informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGameRoom(context, gameRoomID) {
      context.dispatch('refreshToken', {}, { root: true });
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const headers = {
        Authorization: 'Bearer ' + context.rootGetters.getToken
      };
      try {
        const res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, { params: { gameRoomId: gameRoomID } }, { headers })
        if(res.status == 200) {
          context.commit('clearSelectedGameRoom');
          context.commit('setSelectedGameRoom', res.data[0]);
        }
      }
      catch (error) {
        context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
      }
    },
    async closeGameRoom(context, gameRoomID) {
      context.dispatch('refreshToken', {}, { root: true });
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      const headers = {
        Authorization: 'Bearer ' + context.rootGetters.getToken
      };
      try {
        res = await axios.put(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_CLOSE_GAME_ROOM_ENDPOINT, null, { params: { gameRoomId: gameRoomID } }, { headers });
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.game_room_closed, { root: true });
        }
      } catch (error) {
        if (error.response) {
          //informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    }
  },
  getters: {
    getGameRooms(state) {
      return state.gameRooms;
    },
    getSelectedGameRoom(state) {
      return state.selectedGameRoom;
    }
  }
}