export default {
  namespaced: true,
  state() {
    return {
      board: Array(8).fill().map(() => Array(8).fill(0)),
      blackPawn: 2,
      blackKing: 4,
      whitePawn: 1,
      whiteKing: 3,
      clickedClass: 'clicked',
      blackClass: 'Black',
      whiteEmpty: 'WhiteEmpty',
      w: 1,
      selectedField: '',
      Empty: 0,
      turn: true,
      clicked: false,
      counter: 0,
      lastClicked: null,
      clickedCell: null,
      clickedSecondCell: false,
      clickedMoveToCell: null,
      isMovable: true,
      active: false,
      ifMoveIsPossible: false,
      classValue: '',
      activeMove: false,
      winner: null,
      whitePlayer: null,
      boardReversed: null,
      isMoveValid: true
    }
  },
  getters: {
    isBoardReversed(state) {
      return state.boardReversed;
    },
    getWhitePlayer(state) {
      return state.whitePlayer;
    },
    getBlackPawn(state) {
      return state.blackPawn;
    },
    getBlackKing(state) {
      return state.blackKing;
    },
    getWhitePawn(state) {
      return state.whitePawn;
    },
    getWhiteKing(state) {
      return state.whiteKing;
    },
    setClass(state) {
      return state.classValue;
    },
    getW(state) {
      return state.w;

    },
    getBlackClass(state) {
      return state.blackClass;
    },
    getEmpty(state) {
      return state.Empty;
    },
    getClickedClass(state) {
      return state.clickedClass
    },
    getBoard(state) {
      return state.board;
    },
    getClickedSecondCell(state) {
      return state.clickedSecondCell;
    },
    getIfMoveIsPossible(state) {
      return state.ifMoveIsPossible;
    },
    getActiveMove(state) {
      return state.activeMove
    },
    getClickedCell(state) {
      return state.clickedCell;
    },
    getIsMoveValid(state){
      return state.isMoveValid;
    }
  },
  mutations: {
    setBoardReversed(state, val) {
      state.boardReversed = val;
    },
    setWhitePawn(state, val) {
      state.whitePawn = val;
    },
    setBlackPawn(state, val) {
      state.blackPawn = val;
    },
    setWhiteKing(state, val) {
      state.whiteKing = val;
    },
    setBlackKing(state, val) {
      state.blackKing = val;
    },
    setWhitePlayer(state, player) {
      state.whitePlayer = player;
    },
    setActive(state, value) {
      state.active = value;
    },
    setSelectedField(state, key) {
      state.selectedField = key;
    },
    setClicked(state, value) {
      state.clicked = value;
    },
    setCounter(state, value) {
      state.counter = value;
    },
    setLastClicked(state, key) {
      state.lastClicked = key;
    },
    setClickedCell(state, key) {
      state.clickedCell = key;
    },
    setClickedSecondCell(state, value) {
      state.clickedSecondCell = value;
    },
    setClickedMoveToCell(state, value) {
      state.clickedMoveToCell = value;
    },
    setIsMoving(state, value) {
      state.isMoving = value;
    },
    setBoard(state, board) {
      state.board = board;
    },
    toogleTurn(state, value) {
      state.turn = value;
    },
    setIfMoveIsPossible(state, value) {
      console.log(value)
      state.ifMoveIsPossible = value;
    },
    setIsMovable(state, value) {
      console.log(value)
      state.isMovable = value;
    },
    updateClassValue(state, value) {
      state.classValue = value;
    },
    setActiveMove(state, value) {
      state.activeMove = value;
    },
    setWinner(state, winner) {
      state.winner = winner;
    },
    setIsMoveValid(state, val){
      state.isMoveValid = val;
    }
  },
  actions: {
    adjustBoard(context, player) {
      const index = context.rootGetters.getSelectedGameRoom.players.map(x => x.playerId).indexOf(player);
      const indexEnemy = 1 -index;
      const myIndex = context.rootGetters.getSelectedGameRoom.players.map(x => x.playerId).indexOf(context.rootGetters.getUserId);
      context.commit('setWhitePawn', index+1);
      context.commit('setWhiteKing', index+3);
      context.commit('setBlackPawn', indexEnemy+1);
      context.commit('setBlackKing', indexEnemy+3);
      // if(context.rootGetters.getUserId == player && index == 0) {
      //   const board = context.getters.getBoard
      //   board.reverse().forEach(function(item) { item.reverse(); } );
      //   context.commit('setBoard', board)
      // }
      if(context.rootGetters.getUserId == player && myIndex ==0 || context.rootGetters.getUserId != player && myIndex == 0)  {
        const board = context.getters.getBoard
        board.reverse().forEach(function(item) { item.reverse(); } );
        context.commit('setBoard', board)
        context.commit('setBoardReversed', true);
      }
      else {
        context.commit('setBoardReversed', false);
      }
      
    },
    updateWhitePlayer(context, player) {
      context.commit('setWhitePlayer', player);
      context.dispatch('adjustBoard', player);
    },
    resetBoardCheckers(context) {
      const board= Array(8).fill().map(() => Array(8).fill(0));
      context.commit('setBoard', board);
      context.commit('setWhitePlayer', null);
    },
    updateBoard(context, board) {
      context.commit('setBoard', board);
    },
    updateWinner(context, winner) {
      context.commit('setWinner', winner);
    },
    isMoveValid(context, start, end) {
       context.commit('setIsMoveValid', true);
      if ((end[0] + end[1]) % 2 == 0 || this.getBoard[end[0]][end[1]] != this.getEmpty)
          context.commit('setIsMoveValid', false);
      context.dispatch('active', {start: start, end: end});




      // if (this.getBoard[start[0]][start[1]] == this.getBlackPawn) {
      //   if (start[0] < end[0] && (start[1] + (start[0] - end[0]) == end[1] || start[1] - (start[0] - end[0]) == end[1]))
      //     return true;
      // }
      // if (this.getBoard[start[0]][start[1]] == this.getWhitePawn) {
      //   if (start[0] > end[0] && (start[1] + (start[0] - end[0]) == end[1] || start[1] - (start[0] - end[0]) == end[1]))
      //     return true;
      // }
      return true;
    },


    move(context, key) {
      console.log('0')
      if (context.state.board[key[0]][key[1]] !== context.state.Empty) {
        console.log('1')
        if (context.state.counter % 2 === 0) {
          console.log('2')
          if (context.board[key[0]][key[1]]) {// && context.state.turn){
            console.log('3')
            // context.commit('setSelectedField', key);
            // context.commit('setClicked', true);
            // context.commit('setCounter', 1);
            context.commit('setLastClicked', key);
            console.log(context.state.lastClicked)
            context.commit('setClickedCell', key);
            console.log(context.state.clickedCell)
            context.commit('setClickedSecondCell', true);
          }
        } else if (context.state.counter % 2 === 1 && context.state.lastClicked != key) {
          return;
        }
        else {
          context.commit('setClicked', false);
          context.commit('setCounter', 0);
          context.commit('setClickedCell', null);
          context.commit('setClickedMoveToCell', null);
        }
      }
    },
    moveTo(context, emptyField) {
      console.log('zzzzz')
      if (context.state.clicked) {
        if (context.state.board[emptyField[0]][emptyField[1]] === context.state.Empty) {

          context.commit('setIsMoving', true);
          context.commit('setClickedMoveToCell', emptyField);
          console.log(context.state.clickedCell)
          context.commit('setBoard', { key: context.state.clickedMoveToCell, value: context.state.board[context.state.clickedCell[0]][context.state.clickedCell[1]] });
          context.dispatch('removePawn', { from: context.state.clickedCell, to: emptyField, clickedCell: context.state.clickedCell });
          context.dispatch('checkKing', context.state.clickedMoveToCell);
          context.commit('setBoard', { key: context.state.clickedCell, value: context.state.Empty });
          context.commit('setClicked', false);
          context.commit('setClickedSecondCell', false);
          //context.state.lastClicked = null;
          context.state.turn = !context.state.turn;
          context.commit('toogleTurn', context.state.turn);
          context.commit('setCounter', 0);
        }
      }
    },

    removePawn(context, payload) {
      console.log(payload)
      const cell = context.state.board[payload.clickedCell[0]][payload.clickedCell[1]]
      console.log('cell', cell)
      const from = payload.from;
      const to = payload.to;
      let x = parseInt(from[0]);
      let y = parseInt(from[1]);
      let k = parseInt(to[0]);
      let l = parseInt(to[1]);
      let defeated = from;
      let xTmp1, yTmp1;
      if ((cell === context.state.whitePawn) || (cell === context.state.blackPawn)) {
        if ((k - x < -1) && (l - y < -1)) {
          xTmp1 = k + 1;
          yTmp1 = l + 1;
          defeated = xTmp1.toString() + yTmp1.toString();
          context.commit('setBoard', { key: defeated, value: context.state.Empty });
        } else if ((k - x > 1) && (l - y < -1)) {
          xTmp1 = k - 1;
          yTmp1 = l + 1;
          defeated = xTmp1.toString() + yTmp1.toString();
          context.commit('setBoard', { key: defeated, value: context.state.Empty });
        } else if ((k - x < -1) && (l - y > 1)) {
          xTmp1 = k + 1;
          yTmp1 = l - 1;
          defeated = xTmp1.toString() + yTmp1.toString();
          context.commit('setBoard', { key: defeated, value: context.state.Empty });
        } else if ((k - x > 1) && (l - y > 1)) {
          xTmp1 = k - 1;
          yTmp1 = l - 1;
          defeated = xTmp1.toString() + yTmp1.toString();
          context.commit('setBoard', { key: defeated, value: context.state.Empty });
        }
      } else if ((cell === context.state.whiteKing) || (cell === context.state.blackKing)) {
        if ((k - x < -1) && (l - y < -1)) {
          let m = 1;
          while (context.state.board[defeated[0]][defeated[1]] !== undefined) {
            xTmp1 = k + m;
            yTmp1 = l + m;
            m++;
            defeated = xTmp1.toString() + yTmp1.toString();
            if (context.state.board[defeated[0]][defeated[1]] !== context.state.Empty) {
              context.commit('setBoard', { key: defeated, value: context.state.Empty });
              break;

            }
          }
        } else if ((k - x > 1) && (l - y < -1)) {
          let m = 1;
          while (context.state.board[defeated[0]][defeated[1]] !== undefined) {
            xTmp1 = k - m;
            yTmp1 = l + m;
            m++;
            defeated = xTmp1.toString() + yTmp1.toString();
            if (context.state.board[defeated[0]][defeated[1]] !== context.state.Empty) {
              context.commit('setBoard', { key: defeated, value: context.state.Empty });
              break;
            }
          }
        } else if ((k - x < -1) && (l - y > 1)) {
          let m = 1;
          while (context.state.board[defeated[0]][defeated[1]] !== undefined) {
            xTmp1 = k + m;
            yTmp1 = l - m;
            m++;
            defeated = xTmp1.toString() + yTmp1.toString();
            if (context.state.board[defeated[0]][defeated[1]] !== context.state.Empty) {
              context.commit('setBoard', { key: defeated, value: context.state.Empty });
              break;
            }
          }
        } else if ((k - x > 1) && (l - y > 1)) {
          let m = 1;
          while (context.state.board[defeated] !== undefined) {
            xTmp1 = k - m;
            yTmp1 = l - m;
            m++;
            defeated = xTmp1.toString() + yTmp1.toString();
            if (context.state.board[defeated] !== context.state.Empty) {
              context.commit('setBoard', { key: defeated, value: context.state.Empty });
              break;
            }
          }
        }
      }
    },
    checkKing(context, newField) {
      if (((newField === '01' || newField === '03' || newField === '05' || newField === '07')) &&
        (context.state.board[newField] === context.state.whitePawn)) {
        context.commit('setBoard', { key: newField, value: context.state.whiteKing });
      } else if (((newField === '70' || newField === '72' || newField === '74' || newField === '76')) && (context.state.board[newField] === context.state.blackPawn)) {
        context.commit('setBoard', { key: newField, value: context.state.blackKing });
      }
    },
    active(context, x, y) {
      const newField = `${x}${y}`
      context.dispatch('possibleActiveJump', newField);
      context.dispatch('possibleActiveMove', newField);
    },

    possibleActiveMove(context, newField) {
      if (context.state.lastClicked === null)
        return null;
      let pawn = context.state.lastClicked;
      let xTmp1;
      let yTmp1;
      let tmpPosition1;
      let x = parseInt(pawn[0]);
      let y = parseInt(pawn[1]);
      if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn))) {
        xTmp1 = x - 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((newField === tmpPosition1) &&
          (context.state.board[tmpPosition1] === context.state.Empty) &&
          ((context.state.board[pawn] === context.state.whitePawn))) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        console.log('activeJump', context.state.board[tmpPosition1], tmpPosition1)
        console.log('activeJump', newField, tmpPosition1, context.state.board[tmpPosition1], context.state.Empty, context.state.board[pawn], context.state.whitePawn)
        if ((newField === tmpPosition1) &&
          (context.state.board[tmpPosition1] === context.state.Empty) &&
          ((context.state.board[pawn] === context.state.whitePawn))) {
          context.commit('setActiveMove', true); console.log(']]]]]]')
        }

      } else if (context.state.turn && (context.state.board[pawn] == context.state.whiteKing)) {
        let defeated = 0;
        xTmp1 = x - 1;
        yTmp1 = y + 1;
        while ((xTmp1 >= 0) && (yTmp1 <= 7)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          xTmp1--;
          yTmp1++;
          if ((newField === tmpPosition1) &&
            context.state.board[tmpPosition1] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true); console.log(']]]]]]')
              break;
            }
          }
          else if ((context.state.board[tmpPosition1] === context.state.blackPawn ||
            context.state.board[tmpPosition1] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        while ((xTmp1 >= 0) && (yTmp1 >= 0)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          xTmp1--;
          yTmp1--;
          if ((newField === tmpPosition1) &&
            context.state.board[tmpPosition1] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true); console.log(']]]]]]')
              break;
            }
          }
          else if ((context.state.board[tmpPosition1] === context.state.blackPawn ||
            context.state.board[tmpPosition1] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }
        xTmp1 = x + 1;
        yTmp1 = y - 1;

        while ((xTmp1 <= 7) && (yTmp1 >= 0)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField === tmpPosition1) &&
            context.state.board[tmpPosition1] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true); console.log(']]]]]]')
              break;
            }
          }
          else if ((context.state.board[tmpPosition1] === context.state.blackPawn ||
            context.state.board[tmpPosition1] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          xTmp1++;
          yTmp1--;
        }

        xTmp1 = x + 1;
        yTmp1 = y + 1;
        while ((xTmp1 <= 7) && (yTmp1 <= 7)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField === tmpPosition1) &&
            context.state.board[tmpPosition1] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true); console.log(']]]]]]')
              break;
            }
          }
          else if ((context.state.board[tmpPosition1] === context.state.blackPawn ||
            context.state.board[tmpPosition1] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          xTmp1++;
          yTmp1++;
        }
      }
      else if (!context.state.turn && (context.state.board[pawn] == context.state.blackPawn)) {
        xTmp1 = x + 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((newField === tmpPosition1) &&
          (context.state.board[tmpPosition1] === context.state.Empty) &&
          (context.state.board[pawn] === context.state.blackPawn)) {
          context.commit('setActiveMove', true); console.log(']]]]]]')

        }
        xTmp1 = x + 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((newField === tmpPosition1) &&
          (context.state.board[tmpPosition1] === context.state.Empty) &&
          (context.state.board[pawn] === context.state.blackPawn)) {
          context.commit('setActiveMove', true); console.log(']]]]]]')
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
      }
      else if (!context.state.turn && (context.state.board[pawn] == context.state.blackKing)) {
        xTmp1 = x - 1;
        yTmp1 = y + 1;
        while ((xTmp1 >= 0) && yTmp1 <= 7) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField.toString() === tmpPosition1) &&
            (context.state.board[tmpPosition1] === context.state.Empty) &&
            ((context.state.board[pawn] === context.state.blackKing))) {
            context.commit('setActiveMove', true); console.log(']]]]]]')
          }
          xTmp1--;
          yTmp1++;
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        while ((xTmp1 >= 0) && (yTmp1 >= 0)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField === tmpPosition1) &&
            (context.state.board[tmpPosition1] === context.state.Empty) &&
            ((context.state.board[pawn] === context.state.blackKing))) {
            context.commit('setActiveMove', true); console.log(']]]]]]')
          }
          xTmp1--;
          yTmp1--;
        }
        xTmp1 = x + 1;
        yTmp1 = y - 1;

        while ((xTmp1 <= 7) && (yTmp1 >= 0)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField === tmpPosition1) &&
            (context.state.board[tmpPosition1] === context.state.Empty) &&
            (context.state.board[pawn] === context.state.blackKing)) {
            context.commit('setActiveMove', true); console.log(']]]]]]')
          }
          xTmp1++;
          yTmp1--;
        }

        xTmp1 = x + 1;
        yTmp1 = y + 1;
        while ((xTmp1 <= 7) && (yTmp1 <= 7)) {
          tmpPosition1 = xTmp1.toString() + yTmp1.toString();
          if ((newField === tmpPosition1) &&
            (context.state.board[tmpPosition1] === context.state.Empty) &&
            (context.state.board[pawn] === context.state.blackKing)) {
            context.commit('setActiveMove', true); console.log(']]]]]]')
          }
          xTmp1++;
          yTmp1++;
        }
      }
    },

    possibleActiveJump(context, newField) {
      let pawn = context.state.lastClicked;// czy to jest dobrze
      if (context.state.lastClicked === null)
        return null;

      context.commit('setActiveMove', false);
      let x = parseInt(pawn[0]);
      let y = parseInt(pawn[1]);
      let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1, tmpPosition2;
      console.log(x, y, pawn)
      if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn))) {
        xTmp1 = x + 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();

        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x - 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x + 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();

        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x - 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();

        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setActiveMove', true);
        }
      }
      else if (context.state.turn && (context.state.board[pawn] === context.state.whiteKing)) {
        let m = 1;
        let tmpPosition = pawn;
        let defeated = 0;
        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x + m;
          yTmp1 = y + m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++; console.log(context.state.board[tmpPosition])
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true);
              break;
            }
          }
          else if ((context.state.board[tmpPosition] === context.state.blackPawn ||
            context.state.board[tmpPosition] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }
        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x - m;
          yTmp1 = y + m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++; console.log(context.state.board[tmpPosition], '-+')
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true);
              break;
            }
          }
          else if ((context.state.board[tmpPosition] === context.state.blackPawn ||
            context.state.board[tmpPosition] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }

        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x + m;
          yTmp1 = y - m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++; console.log(context.state.board[tmpPosition], 'pppppppppppppp')
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true);
              break;
            }
          }
          else if ((context.state.board[tmpPosition] === context.state.blackPawn ||
            context.state.board[tmpPosition] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }
        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x - m;
          yTmp1 = y - m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++; console.log(context.state.board[tmpPosition])
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            if (defeated !== 2) {
              context.commit('setActiveMove', true);
              break;
            }
          }
          else if ((context.state.board[tmpPosition] === context.state.blackPawn ||
            context.state.board[tmpPosition] === context.state.blackKing)) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
        }

      }
      //black turn
      else if (!context.state.turn && (context.state.board[pawn] === context.state.blackPawn)) {
        xTmp1 = x + 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x - 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x + 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setActiveMove', true);
        }
        xTmp1 = x - 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if ((newField === tmpPosition1) &&
          context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setActiveMove', true);
        }
      } else if (!context.state.turn && (context.state.board[pawn] === context.state.blackKing)) {
        const x = parseInt(pawn[0]);
        const y = parseInt(pawn[1]);
        let tmpPosition = pawn;
        let m = 1;
        let defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x + m;
          yTmp1 = y + m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++;
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            context.commit('setActiveMove', true);
          }
          else if ((newField === tmpPosition) &&
            (context.state.board[tmpPosition] === context.state.whitePawn ||
              context.state.board[tmpPosition] === context.state.whiteKing)) {
            defeated++

            if (defeated === 1) { break; }
          }
        }

        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x - m;
          yTmp1 = y + m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++;
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            context.commit('setActiveMove', true);
          }
          else if ((newField === tmpPosition) &&
            (context.state.board[tmpPosition] === context.state.whitePawn ||
              context.state.board[tmpPosition] === context.state.whiteKing)) {
            defeated++

            if (defeated === 1) { break; }
          }
        }
        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x + m;
          yTmp1 = y - m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++;
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            context.commit('setActiveMove', true);
          }
          else if ((newField === tmpPosition) &&
            (context.state.board[tmpPosition] === context.state.whitePawn ||
              context.state.board[tmpPosition] === context.state.whiteKing)) {
            defeated++

            if (defeated === 1) { break; }
          }
        }
        m = 1;
        defeated = 0;
        tmpPosition = pawn;

        while (context.state.board[tmpPosition] !== undefined) {
          xTmp1 = x + m;
          yTmp1 = y + m;
          tmpPosition = xTmp1.toString() + yTmp1.toString();
          m++;
          if ((newField === tmpPosition) &&
            context.state.board[tmpPosition] === context.state.Empty) {
            context.commit('setActiveMove', true);
          }
          else if ((newField === tmpPosition) &&
            (context.state.board[tmpPosition] === context.state.whitePawn ||
              context.state.board[tmpPosition] === context.state.whiteKing)) {
            defeated++

            if (defeated === 1) { break; }
          }
        }
      }
    },
    ///
    isMovable(context, pawn) {
      console.log(pawn)
      let x = pawn[0]
      let y = pawn[1]
      context.dispatch('PossibleJump', { x: x, y: y, pawn: pawn });
      context.dispatch('PossibleMove', { x: x, y: y, pawn: pawn });
    },

    PossibleJump(context, payload) {
      context.commit('setIfMoveIsPossible', false);
      let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1, tmpPosition2;
      const x = payload.x;
      const y = payload.y;
      const pawn = payload.pawn;
      if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn) ||
        (context.state.board[pawn] === context.state.whiteKing))) {
        xTmp1 = x + 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true);
        }
        xTmp1 = x - 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
        xTmp1 = x + 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();

        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
        xTmp1 = x - 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();

        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.blackPawn ||
            context.state.board[tmpPosition2] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
      }

      //black turn
      else if (!context.state.turn && ((context.state.board[pawn] === context.state.blackPawn) ||
        (context.state.board[pawn] == context.state.blackKing))) {
        xTmp1 = x + 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
        xTmp1 = x - 2;
        yTmp1 = y + 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y + 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
        xTmp1 = x + 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x + 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
        xTmp1 = x - 2;
        yTmp1 = y - 2;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        xTmp2 = x - 1;
        yTmp2 = y - 1;
        tmpPosition2 = xTmp2.toString() + yTmp2.toString();
        if (context.state.board[tmpPosition1] === context.state.Empty &&
          (context.state.board[tmpPosition2] === context.state.whitePawn ||
            context.state.board[tmpPosition2] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log(']]]]]]]')
        }
      }
    },
    PossibleMove(context, payload) {
      // context.commit('setIfMoveIsPossible', false);
      let xTmp1;
      let yTmp1;
      let tmpPosition1;
      const x = payload.x;
      const y = payload.y;
      const pawn = payload.pawn;
      if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn) || (context.state.board[pawn] == context.state.whiteKing))) {
        xTmp1 = x - 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) && ((context.state.board[pawn] === context.state.whitePawn) ||
          (context.state.board[pawn] === context.state.whiteKing))) {
          console.log('eee')
          context.commit('setIfMoveIsPossible', true);
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) && ((context.state.board[pawn] === context.state.whitePawn) ||
          (context.state.board[pawn] === context.state.whiteKing))) {
          context.commit('setIfMoveIsPossible', true); console.log('eee')
        }
        xTmp1 = x + 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log('eee')
        }
        xTmp1 = x + 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.whiteKing)) {
          context.commit('setIfMoveIsPossible', true); console.log('eee')
        }
      }
      else if (!context.state.turn) {
        xTmp1 = x + 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) &&
          (context.state.board[pawn] === (context.state.blackKing) || (context.state.board[pawn] === context.state.blackPawn))) {
          context.commit('setIfMoveIsPossible', true);

        }
        xTmp1 = x + 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) &&
          (context.state.board[pawn] === (context.state.blackKing) || (context.state.board[pawn] === context.state.blackPawn))) {
          context.commit('setIfMoveIsPossible', true);
        }
        xTmp1 = x - 1;
        yTmp1 = y - 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();

        if ((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true);
        }
        xTmp1 = x - 1;
        yTmp1 = y + 1;
        tmpPosition1 = xTmp1.toString() + yTmp1.toString();
        if ((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.blackKing)) {
          context.commit('setIfMoveIsPossible', true);
        }
      }
    }
  }
}