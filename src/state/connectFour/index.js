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
    updateBoard(context, board) {
      context.commit('setBoard', board);
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