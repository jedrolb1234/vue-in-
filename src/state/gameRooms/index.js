export default {
  state() {
    return {
      gameRooms: [
        // {
        //   id: 0,
        //   name: 'nazwa1',
        //   players: [
        //     {
        //       username:'user1',
        //       id: 1231231231231
        //     },
        //     {
        //       username:'user2',
        //       id: 3434343434343
        //     }
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   ownerUsername: 'user1',
        //   ownerID:'12231321312',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 2,
        //   name: 'nazwa2',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: false

        // },
        // {
        //   id: 3,
        //   name: 'nazwa3',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 4,
        //   name: 'nazwa4',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 5,
        //   name: 'nazwa5',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: false

        // },
        // {
        //   id: 6,
        //   name: 'nazwa6',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 7,
        //   name: 'nazwa7',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 8,
        //   name: 'nazwa8',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: false

        // },
        // {
        //   id: 9,
        //   name: 'nazwa9',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 10,
        //   name: 'nazwa10',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // },
        // {
        //   id: 11,
        //   name: 'nazwa11',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: false

        // },
        // {
        //   id: 12,
        //   name: 'nazwa12',
        //   players: [
        //     'user1',
        //     'user2'
        //   ],
        //   rquiredNumberOfPlayers: 3,
        //   owner: 'user1',
        //   game: 0,
        //   isPrivate: true
        // }
      ]
    }
  },
  mutations: {
    addGameRoom(state, gameRoom) {
      state.gameRooms.push({id: gameRoom.id, name: gameRoom.roomName, players: gameRoom.players, rquiredNumberOfPlayers: 2, owner: 'xd', isPrivate: false});
    }
  },
  actions: {
    async createNewGameRoom(context, payload) {
      context.dispatch('refreshToken',{}, {root:true});
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      const headers = {
        Authorization: 'Bearer '+JSON.parse(sessionStorage.getItem('token'))
      };
      try {
        res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_CREATE_GAME_ROOM_ENDPOINT, payload, {headers});
        if (res.status == 200) {
          context.dispatch('showNotification', notificationTemplates.game_romm_created, { root: true });
        }
      } catch (error) {
        if (error.response) {
          //informUserAbouErrors(context, error.response.data.errors);
        } else {
          context.dispatch('showNotification', notificationTemplates.common_error, { root: true });
        }
      }
    },
    async obtainGameRooms(context, gameID) {
      context.dispatch('refreshToken',{}, {root:true});
      const notificationTemplates = context.rootGetters.getNotificationTemplates;
      const axios = require('axios');
      let res;
      const headers = {
        Authorization: 'Bearer '+JSON.parse(sessionStorage.getItem('token'))
      };
      try {
        res = await axios.get(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_OBTAIN_GAME_ROOMS_ENDPOINT, {params: {gameTypeId: gameID}}, {headers});
        if (res.status == 200) {
          const gameRooms = res.data;
          console.log(gameRooms);
          for(let i=0;i<gameRooms.length; i++) {
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
    }
  },
  getters: {
    getGameRooms(state) {
      return state.gameRooms;
    }
  }
}