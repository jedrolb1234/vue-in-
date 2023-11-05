import Router from '@/router';
import AxiosInstance from '@/mixins/axiosInstance';

export default {
  state() {
    return {
      gameRooms: [],
      selectedGameRoom: {},
      playerTurn: null
    }
  },
  mutations: {
    setPlayerTurn(state, value) {
      console.log(value)
      state.playerTurn = value;
    },
    clearGameRooms(state) {
      state.gameRooms = [];
    },
    clearSelectedGameRoom(state) {
      state.selectedGameRoom = {};
    },
    setSelectedGameRoom(state, selectedGameRoom) {
      console.log(state.selectedGameRoom)
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
    updatePlayerTurn(context, value) {
      context.commit('setPlayerTurn', value);
      console.log(value)
    },
    async createNewGameRoom(context, payload) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_CREATE_GAME_ROOM_ENDPOINT, payload);
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.game_romm_created, { root: true });
          const gameRoomID = res.data;
          Router.push({ name: 'play', params: { gameRoomID: gameRoomID } });
        }
      } catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else if (error.response) {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGameRooms(context, gameID) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.get(process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, { params: { gameTypeId: gameID, status: 0 } });
        if (res.status == 200) {
          const gameRooms = res.data;
          context.commit('clearGameRooms');
          for (let i = 0; i < gameRooms.length; i++) {
            context.commit('addGameRoom', gameRooms[i]);
          }
        }
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 401) {
          context.dispatch('logOutUser');
        }
        else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGameRoom(context, gameRoomID) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      try {
        const res = await AxiosInstance.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, { params: { gameRoomId: gameRoomID } })
        if (res.status == 200) {
          context.commit('clearSelectedGameRoom');
          context.commit('setSelectedGameRoom', res.data[0]);
        }
      }
      catch (error) {
        if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
          context.dispatch('logOutUser');
        }
        else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async closeGameRoom(context, gameRoomID) {
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      let res;
      try {
        res = await AxiosInstance.put(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_CLOSE_GAME_ROOM_ENDPOINT, null, { params: { gameRoomId: gameRoomID } });
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.game_room_closed, { root: true });
        }
      } catch (error) {
        if (error.response) {
          if(error.response.status == 401 || error.response.data=='InvalidRefreshToken') {
            context.dispatch('logOutUser');
          }
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    }
  },
  getters: {
    getPlayerTurn(state) {
      return state.playerTurn;
    },
    getGameRooms(state) {
      return state.gameRooms;
    },
    getSelectedGameRoom(state) {
      return state.selectedGameRoom;
    }
  }
}