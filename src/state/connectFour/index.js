import CallHub from "@/mixins/callHub";
import Store from '@/state/index';

export default {
  state() {
    return {
      empty: 0,
      red: 1,
      blue: 2,
      board: Array(6).fill().map(() => Array(7).fill(0)),
      winner: null,
      playerTurn: null,
      pawnClass: '',
    }
  },
  getters: {
    getBoard(state) {
      return state.board;
    },
    getPlayerTurn(state) {
      return state.playerTurn;
    },
    getPawnClass(state) {
      return state.pawnClass;
    },
    getWinner(state) {
      return state.winner;
    },
    getWinnerPawns(state) {
      return state.winnerPawns;
    },
    isGameStarted(state) {
      return state.gameStarted;
    }
  },
  mutations: {
    setPawnClass(state, value) {
      state.pawnClass = value
    },
    setPlayerTurn(state, player) {
      state.playerTurn = player;
    },
    setWinner(state, value) {
      state.winner = value;
    },
    setWinnerPawns(state, value) {
      state.winnersPawns = value;
    },
    setPlayers(state, players) {
      state.players = players;
    },
    setBoard(state, board) {
      state.board = board;
    }
  },
  actions: {
    dropBall(context, c) {
      if (context.getters.getPlayerTurn != context.rootGetters.getUserId)
        return
      if (context.state.winner != null)
        return
      for (let i = 5; i >= 0; i--) {
        if (context.state.board[i][c] == context.state.empty) {
          CallHub.client.invoke('MakeMoveConnectFour', context.rootGetters.getSelectedGameRoom.id, context.rootGetters.getUserId, c);
          // context.state.board[i][c] = context.state.playerTurn;
          // context.dispatch('checkWinner');
          // if (context.state.playerTurn === context.state.red) {
          //   context.commit('setPlayerTurn', context.state.blue);
          // }
          // else {
          //   context.commit('setPlayerTurn', context.state.red);
          // }
          break;
        }
      }
    },
    updateBoard(context, board) {
      context.commit('setBoard', board);
    },
    updatePlayerTurn(context, player) {
      context.commit('setPlayerTurn', player)
    },
    updateWinner(context, winner) {
      context.commit('setWinner', winner);
    },
    updatePlayers(context, players) {
      const play = players.map(player => player.playerId);
      context.commit('setPlayers', play);
    },
    resetGameCoonectFour(context) {
      const board = Array(6).fill().map(() => Array(7).fill(0));
      context.dispatch('updateBoard', board);
      context.dispatch('updateWinner', null);
      context.dispatch('updatePlayerTurn', null);
    }
  } 
}

CallHub.client.on('NewUserConnectedToTheRoom', (roomId) => {
  CallHub.client.invoke('GetCurrentGameRoomState', roomId);
})

CallHub.client.on("GameStarted", (board, playerTurn) => {
  Store.dispatch('obtainGameRoom', Store.getters.getSelectedGameRoom.id, { root: true })
  Store.dispatch('updatePlayers', Store.getters.getSelectedGameRoom.players, { root: true });
  Store.dispatch('updateBoard', board, { root: true });
  Store.dispatch('updatePlayerTurn', playerTurn, { root: true });
})

CallHub.client.on("GameRoomJoined", () => {
  Store.dispatch('obtainGameRoom', Store.getters.getSelectedGameRoom.id, { root: true })
})

CallHub.client.on("UpdateBoardState", (board, playerTurn, winner, isFinished) => {
  if (isFinished)
    Store.dispatch('obtainGameRoom', Store.getters.getSelectedGameRoom.id, { root: true })
  Store.dispatch('updateWinner', winner, { root: true });
  Store.dispatch('updateBoard', board, { root: true });
  Store.dispatch('updatePlayerTurn', playerTurn, { root: true });
}
)