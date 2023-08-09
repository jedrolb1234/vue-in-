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
      winnerPawns: [],
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
    checkWinner(context) {
      console.log('bbbb')
      const height = context.state.board.length;
      const width = context.state.board[0].length;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const slot = context.state.board[i][j];
          if (slot != context.state.playerTurn) {
            continue;
          }
          if (j + 3 < width && context.state.playerTurn == context.state.board[i][j + 1] && context.state.playerTurn == context.state.board[i][j + 2] && context.state.playerTurn == context.state.board[i][j + 3]) {
            context.commit('setWinner', context.state.playerTurn);
            context.commit('setWinnerPawns', [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]])
            break
          }
          if (i + 3 < height) {
            if (slot == context.state.board[i + 1][j] && slot == context.state.board[i + 2][j] && slot == context.state.board[i + 3][j]) {
              context.commit('setWinner', context.state.playerTurn);
              context.commit('setWinnerPawns', [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]])
              break
            }
            if (j + 3 < width && slot == context.state.board[i + 1][j + 1] && slot == context.state.board[i + 2][j + 2] && slot == context.state.board[i + 3][j + 3]) {
              context.commit('setWinner', context.state.playerTurn);
              context.commit('setWinnerPawns', [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]])
              break
            }
            if (j - 3 < width && slot == context.state.board[i + 1][j - 1] && slot == context.state.board[i + 2][j - 2] && slot == context.state.board[i + 3][j - 3]) {
              context.commit('setWinner', context.state.playerTurn);
              context.commit('setWinnerPawns', [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]])
              break
            }
          }

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
    }
  }
}

CallHub.client.on("GameStarted", () => {
  Store.dispatch('updatePlayers', Store.getters.getSelectedGameRoom.players, {root: true});
})

CallHub.client.on("UpdateBoardState", (board, playerTurn, winner) => {
  Store.dispatch('updateBoard', board, {root: true});
  Store.dispatch('updatePlayerTurn', playerTurn, {root: true});
  Store.dispatch('updateWinner', winner, {root: true});
})