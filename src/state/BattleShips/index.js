export default {
  namespaced: true,
  state() {
    return {
      board: Array(10).fill().map(() => Array(10).fill(0)),
      oponentBoard: Array(10).fill().map(() => Array(10).fill(0)),
      empty: 0,
      ship: 1,
      hit: 2,
      miss: 3,
      shipOponent: 'shipOponent',
      empty2: 'empty2',
      emptyOponent: 'emptyOponent',
      hitOponent: 'hitOponent',
      missedOponent: 'missedOponent',
      counter: 12,
      clicked: [],
      oponentRecive: [],
      setShipCounter: 12,
      firstLoad: true,
      disable_animation: 'disable-animation',
      boardTable1: 'board-table1',
      fourCounter: 1,
      threeCounter: 2,
      twoCounter: 3,
      oneCounter: 4,
      isCheckFalse: false,
      isCheckClicked: false,
      clickedIn: false,
      clickedNotIn: false,
      index: 0,
      isAbleToPut: true,
    }
  },
  getters: {
    getEmpty(state) {
      return state.empty
    },
    getShip(state) {
      return state.ship;
    },
    getHit(state) {
      return state.hit;
    },
    getMiss(state) {
      return state.miss;
    },
    getBoard(state) {
      return state.board;
    },
    getOponentBoard(state) {
      return state.oponentBoard;
    },
    getOneCounter(state) {
      return state.oneCounter;
    },
    getTwoCounter(state) {
      return state.twoCounter;
    },
    getThreeCounter(state) {
      return state.threeCounter;
    },
    getFourCounter(state) {
      return state.fourCounter;
    }
  },
  mutations: {
    check(state, field) {
      state.isCheckFalse = !state.clicked.includes(field);
    },
    checkClicked(state, field) {
      state.isCheckClicked = state.clicked.includes(field);
    },
    clickedField(state, field) {
      state.index = state.clicked.indexOf(field);
    },
    cutClicked(state, index) {
      state.clicked.splice(index, 1);
    },
    setBoard(state, board) {
      state.board = board
    },
    setOponentBoard(state,board) {
      state.oponentBoard = board;
    },
    setBoardShip(state, key) {
      state.board[key] = state.ship;
    },
    clickedPush(state, field) {
      state.clicked.push(field);
    },
    setShipCounter(state, value) {
      state.setShipCounter += value;
    },
    setOponentRecive(state, value) {
      state.oponentRecive.push(value);
    },
    selectTag(state, field) {
      return state.oponentBoard[field];
    },
    clickedNotIn(state, field) {
      state.clickedNotIn = !state.clicked.includes(field)
    },
    setClickedIn(state, field) {
      state.clickedIn = state.clicked.includes(field)
    },
    isAbleToPut(state, value) {
      state.isAbleToPut = value;
    },
    incCounter(state, value) {
      state.counter += value;
    },
    setOneCounter(state, value) {
      state.oneCounter = value;
    },
    setTwoCounter(state, value) {
      state.twoCounter = value;
    },
    setThreeCounter(state, value) {
      state.threeCounter = value;
    },
    setFourCounter(state, value) {
      state.fourCounter = value;
    }
  },
  actions: {
    updateBoard({commit}, board) {
      commit('setBoard', board);
    },
    updateBoards({commit}, boards) {
      commit('setBoard', boards[0]);
      commit('setOponentBoard', boards[1]);
    },
    chooseMethod({ getters, dispatch }, field) {
      const board = getters.getBoard
      if (board[field[0]][field[1]] == getters.getEmpty) {
        board[field[0]][field[1]] = getters.getShip
      }
      else {
        board[field[0]][field[1]] = getters.getEmpty
      }
      dispatch('updateBoard', board);
    },
    setShip(context, field) {
      context.firstLoad = false;
      context.commit('isAbleToPut', true);
      context.commit('clickedNotIn', field);
      context.dispatch('checkLocation', field);
      context.dispatch('checkNeighbor', field);
      if (context.state.isAbleToPut) {
        // if(context.dispatch('checkLocation', field) && context.dispatch('checkNeighbor', field)){
        if (context.state.clickedNotIn) {
          context.commit('clickedPush', field);
          context.commit('setBoardShip', field);
        }
      }
      context.dispatch('shipNumber');
    },
    unSetShip({ commit, dispatch, state }, field) {
      commit('setClickedIn', field);
      if (state.clickedIn) {
        commit('setShipCounter', 1);
        commit('clickedField', { key: field, value: state.hitOponent });
        commit('cutClicked', state.index);
        commit('setBoard', field);
      }
      dispatch('shipNumber');
    },

    // unSetShip({ commit, context }, field){
    //     commit('setClickedIn', field)
    //     console.log(field)
    //     console.log(context.clickedIn)
    //     if(context.clickedIn){
    //         context.commit('setShipCounter', 1);
    //         let index = commit('clickedField', { key: field, value: context.state.hitOponent });
    //         context.commit('clickedField', index);
    //         context.commit('setBoard', field);
    //         console.log('board', context.state.board[field]);
    //         console.log('tablica', context.state.clicked);
    //     }
    //     context.dispatch('shipNumber');
    //     },

    checkLocation(context, field) {
      //let isAbleToPut = true;
      let x = parseInt(field[0]);
      let y = parseInt(field[1]);
      let xTmp = x + 1;
      let yTmp = y + 1;
      let position = xTmp.toString() + yTmp.toString();
      if (context.state.board[position] === context.state.ship) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x + 1;
      yTmp = y - 1;
      position = xTmp.toString() + yTmp.toString();
      if (context.state.board[position] === context.state.ship) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x - 1;
      yTmp = y + 1;
      position = xTmp.toString() + yTmp.toString();
      if (context.state.board[position] === context.state.ship) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x - 1;
      yTmp = y - 1;
      position = xTmp.toString() + yTmp.toString();
      if (context.state.board[position] === context.state.ship) {
        context.commit('isAbleToPut', false);
      }
    },
    checkNeighbor(context, field) {
      // let isAbleToPut = true;
      let x = parseInt(field[0]);
      let y = parseInt(field[1]);
      let xTmp = x + 1;
      let xTmp2 = x + 2;
      let xTmp3 = x + 3;
      let xTmp4 = x + 4;
      let yTmp = y;
      let yTmp2, yTmp3, yTmp4;
      let position = xTmp.toString() + yTmp.toString();
      let position2 = xTmp2.toString() + yTmp.toString();
      let position3 = xTmp3.toString() + yTmp.toString();
      let position4 = xTmp4.toString() + yTmp.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) &&
        (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x - 1;
      xTmp2 = x - 2;
      xTmp3 = x - 3;
      xTmp4 = x - 4;
      yTmp = y;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp2.toString() + yTmp.toString();
      position3 = xTmp3.toString() + yTmp.toString();
      position4 = xTmp4.toString() + yTmp.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x + 1;
      xTmp2 = x + 2;
      xTmp3 = x - 1;
      xTmp4 = x - 2;
      yTmp = y;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp2.toString() + yTmp.toString();
      position3 = xTmp3.toString() + yTmp.toString();
      position4 = xTmp4.toString() + yTmp.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x + 1;
      xTmp2 = x - 1;
      xTmp3 = x - 2;
      xTmp4 = x - 3;
      yTmp = y;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp2.toString() + yTmp.toString();
      position3 = xTmp3.toString() + yTmp.toString();
      position4 = xTmp4.toString() + yTmp.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      xTmp = x + 1;
      xTmp2 = x + 2;
      xTmp3 = x + 3;
      xTmp4 = x - 1;
      yTmp = y;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp2.toString() + yTmp.toString();
      position3 = xTmp3.toString() + yTmp.toString();
      position4 = xTmp4.toString() + yTmp.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      yTmp = y + 1;
      yTmp2 = y + 2;
      yTmp3 = y + 3;
      yTmp4 = y + 4;
      xTmp = x;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp.toString() + yTmp2.toString();
      position3 = xTmp.toString() + yTmp3.toString();
      position4 = xTmp.toString() + yTmp4.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) &&
        (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      yTmp = y - 1;
      yTmp2 = y - 2;
      yTmp3 = y - 3;
      yTmp4 = y - 4;
      xTmp = x;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp.toString() + yTmp2.toString();
      position3 = xTmp.toString() + yTmp3.toString();
      position4 = xTmp.toString() + yTmp4.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      yTmp = y + 1;
      yTmp2 = y + 2;
      yTmp3 = y - 1;
      yTmp4 = y - 2;
      xTmp = x;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp.toString() + yTmp2.toString();
      position3 = xTmp.toString() + yTmp3.toString();
      position4 = xTmp.toString() + yTmp4.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) &&
        (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
      xTmp = y + 1;
      yTmp2 = y - 1;
      yTmp3 = y - 2;
      yTmp4 = y - 3;
      xTmp = x;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp.toString() + yTmp2.toString();
      position3 = xTmp.toString() + yTmp3.toString();
      position4 = xTmp.toString() + yTmp4.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
        && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }

      yTmp = y + 1;
      yTmp2 = y + 2;
      yTmp3 = y + 3;
      yTmp4 = y - 1;
      xTmp = x;
      position = xTmp.toString() + yTmp.toString();
      position2 = xTmp.toString() + yTmp2.toString();
      position3 = xTmp.toString() + yTmp3.toString();
      position4 = xTmp.toString() + yTmp4.toString();
      if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) &&
        (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)) {
        context.commit('isAbleToPut', false);
      }
    },

    shipNumber(context) {
      let oneCounter = 5;
      let twoCounter = 4;
      let threeCounter = 3;
      let fourCounter = 2;
      let field, field1, field2, field3, field4, iTmp, x1, jTmp, y1, y2, y3, yLower1, yLower2, yLower3, upField;
      let counter = 0;
      for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 8; i++) {
          iTmp = i.toString();
          jTmp = j.toString();
          field = iTmp + jTmp;
          if (context.state.board[field] === context.state.ship) {
            y1 = j - 1;
            upField = iTmp + y1.toString();
            if (context.state.board[upField] === context.state.ship) {
              continue;
            }
            y1 = j + 1;
            y2 = j + 2;
            y3 = j + 3;
            yLower1 = y1.toString();
            yLower2 = y2.toString();
            yLower3 = y3.toString();
            field1 = iTmp + yLower1;
            field2 = iTmp + yLower2;
            field3 = iTmp + yLower3;

            if (context.state.board[field1] !== context.state.ship) {
              counter++;
            }
            if ((context.state.board[field1] === context.state.ship) && (context.state.board[field2] !== context.state.ship)) {
              counter = 2;
            }
            else if ((context.state.board[field1] === context.state.ship) && (context.state.board[field2] === context.state.ship)
              && context.state.board[field3] !== context.state.ship) {
              counter = 3;
            }
            else if ((context.state.board[field1] === context.state.ship) && (context.state.board[field2] === context.state.ship)
              && (context.state.board[field3] === context.state.ship)) {
              counter = 4;
            }
          }
          x1 = i + 1;
          field4 = x1.toString() + jTmp;
          if ((context.state.board[field4] !== context.state.ship)) {
            if (counter === 1) {
              oneCounter--;
              counter = 0;
            }
            else if (counter === 2) {
              twoCounter--;
              counter = 0;
            }
            else if (counter === 3) {
              threeCounter--;
              counter = 0;
            }
            else if (counter === 4) {
              fourCounter--;
              counter = 0;
            }
          }
        }
      }
      context.commit('setOneCounter', oneCounter);
      context.commit('setTwoCounter', twoCounter);
      context.commit('setThreeCounter', threeCounter);
      context.commit('setFourCounter', fourCounter);
    },
    resetBoardBattleShips({commit}) {
      commit('setBoard', Array(10).fill().map(() => Array(10).fill(0)));
      commit('setOponentBoard', Array(10).fill().map(() => Array(10).fill(0)));
    }
  }
}