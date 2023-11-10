import Player from "@/state/gameRooms/index.js";
Player;
export default {
  namespaced: true,
  state() {
    return {
      board: Array(8)
        .fill()
        .map(() => Array(8).fill(0)),
      blackPawn: 2,
      blackKing: 4,
      whitePawn: 1,
      whiteKing: 3,
      blackClass: "Black",
      whiteempty: "Whiteempty",
      empty: 0,
      winner: null,
      whitePlayer: null,
      boardReversed: null,
      isMoveValid: true,
    };
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
    getempty(state) {
      return state.empty;
    },
    getClickedClass(state) {
      return state.clickedClass;
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
      return state.activeMove;
    },
    getClickedCell(state) {
      return state.clickedCell;
    },
    getIsMoveValid(state) {
      return state.isMoveValid;
    },
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
      state.ifMoveIsPossible = value;
    },
    setIsMovable(state, value) {
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
    setIsMoveValid(state, val) {
      state.isMoveValid = val;
    },
  },
  actions: {
    adjustBoard(context, player) {
      console.log(context.rootGetters.getSelectedGameRoom.players
        .map((x) => x.playerId))
      console.log(context.rootGetters.getUserId)
      const index = context.rootGetters.getSelectedGameRoom.players
        .map((x) => x.playerId)
        .indexOf(player);
      const indexEnemy = 1 - index;
      const myIndex = context.rootGetters.getSelectedGameRoom.players
        .map((x) => x.playerId)
        .indexOf(context.rootGetters.getUserId);
      context.commit("setWhitePawn", index + 1);
      context.commit("setWhiteKing", index + 3);
      context.commit("setBlackPawn", indexEnemy + 1);
      context.commit("setBlackKing", indexEnemy + 3);
      if (
        (context.rootGetters.getUserId == player && myIndex == 0) ||
        (context.rootGetters.getUserId != player && myIndex == 0)
      ) {
        const board = context.getters.getBoard;
        board.reverse().forEach(function (item) {
          item.reverse();
        });
        context.commit("setBoard", board);
        context.commit("setBoardReversed", true);
      } else {
        context.commit("setBoardReversed", false);
      }
    },
    updateWhitePlayer(context, player) {
      context.commit("setWhitePlayer", player);
      context.dispatch("adjustBoard", player);
      console.log(player)
    },
    resetBoardCheckers(context) {
      const board = Array(8)
        .fill()
        .map(() => Array(8).fill(0));
      context.commit("setBoard", board);
      context.commit("setWhitePlayer", null);
      context.dispatch("updatePlayerTurn", null, { root: true });
    },
    updateBoard(context, board) {
      context.commit("setBoard", board);
    },
    updateWinner(context, winner) {
      context.commit("setWinner", winner);
    },
    isMoveValid(context, payload) {
      //  context.commit('setIsMoveValid', true);
      // if ((payload.end[0] + payload.end[1]) % 2 === 0 || context.state.board[payload.end[0]][payload.end[1]] !== context.state.empty)
      //     context.commit('setIsMoveValid', false);
      context.dispatch("active", payload);
      // return true;
    },
    active(context, payload) {
      context.dispatch("possibleActiveJump", payload);
      context.dispatch("possibleActiveMove", payload);
    },

    possibleActiveMove(context, payload) {
      let from = [];
      from[0] = payload.start[0];
      from[1] = payload.start[1];
      let to = [];
      to[0] = payload.end[0];
      to[1] = payload.end[1];
      let tmpPosition1 = [];
      if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        (context.state.board[from[0]][from[1]] === context.state.whitePawn ||
          context.state.board[from[0]][from[1]] === context.state.whiteKing)
      ) {
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.whitePawn
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
        tmpPosition1 = [];
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] - 1;

        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.whitePawn
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
      } else if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        context.state.board[from[0]][from[1]] == context.state.whiteKing
      ) {
        let defeated = 0;
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          while (tmpPosition1[0] >= 0 && tmpPosition1[1] <= 7) {
            if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
              context.state.empty
            )
              break;

            if (
              to[0] === tmpPosition1[0] &&
              to[1] === tmpPosition1[1] &&
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.empty
            ) {
              if (defeated !== 2) {
                context.commit("setIsMoveValid", true);
                break;
              }
            } else if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackPawn ||
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackKing
            ) {
              defeated++;
              if (defeated === 2) {
                break;
              }
            }
            tmpPosition1[0]--;
            tmpPosition1[1]++;
          }
          tmpPosition1[0] = from[0] - 1;
          tmpPosition1[0] = from[1] - 1;
          while (tmpPosition1[0] >= 0 && tmpPosition1[1] >= 0) {
            if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
              context.state.empty
            )
              break;

            if (
              to[0] === tmpPosition1[0] &&
              to[1] === tmpPosition1[1] &&
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.empty
            ) {
              if (defeated !== 2) {
                context.commit("setIsMoveValid", true);
                break;
              }
            } else if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackPawn ||
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackKing
            ) {
              defeated++;
              if (defeated === 2) {
                break;
              }
            }
            tmpPosition1[0]--;
            tmpPosition1[1]--;
          }
          tmpPosition1[0] = from[0] + 1;
          tmpPosition1[1] = from[1] - 1;

          while (tmpPosition1[0] <= 7 && tmpPosition1[1] >= 0) {
            if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
              context.state.empty
            )
              break;
            if (
              to[0] === tmpPosition1[0] &&
              to[1] === tmpPosition1[1] &&
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.empty
            ) {
              if (defeated !== 2) {
                context.commit("setIsMoveValid", true);
                break;
              }
            } else if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackPawn ||
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackKing
            ) {
              defeated++;
              if (defeated === 2) {
                break;
              }
            }
            tmpPosition1[0]++;
            tmpPosition1[1]--;
          }
          tmpPosition1[0] = from[0] + 1;
          tmpPosition1[1] = from[1] + 1;
          while (tmpPosition1[0] <= 7 && tmpPosition1[1] <= 7) {
            if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
              context.state.empty
            )
              break;
            if (
              to[0] === tmpPosition1[0] &&
              to[1] === tmpPosition1[1] &&
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.empty
            ) {
              if (defeated !== 2) {
                context.commit("setIsMoveValid", true);
                break;
              }
            } else if (
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackPawn ||
              context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
                context.state.blackKing
            ) {
              defeated++;
              if (defeated === 2) {
                break;
              }
            }
            tmpPosition1[0]++;
            tmpPosition1[1]++;
          }
        }
      } else if (
        context.state.board[from[0]][from[1]] == context.state.blackPawn
      ) {
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackPawn
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackPawn
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
      } else if (
        context.state.board[from[0]][from[1]] == context.state.blackKing
      ) {
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] + 1;
        while (tmpPosition1[0] >= 0 && tmpPosition1[1] <= 7) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
            context.state.empty
          )
            break;
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIsMoveValid", true);
          }
          tmpPosition1[0]--;
          tmpPosition1[1]++;
        }
        tmpPosition1[0] = from[0] - 1;
        tmpPosition1[1] = from[1] - 1;
        while (tmpPosition1[0] >= 0 && tmpPosition1[1] >= 0) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
            context.state.empty
          )
            break;
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIsMoveValid", true);
          }
          tmpPosition1[0]--;
          tmpPosition1[1]--;
        }
        tmpPosition1[0] = from[0] + 1;
        tmpPosition1[1] = from[1] + 1;
        while (tmpPosition1[0] <= 7 && tmpPosition1[1] >= 0) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
            context.state.empty
          )
            break;
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIsMoveValid", true);
          }
          tmpPosition1[0]++;
          tmpPosition1[1]--;
        }

        tmpPosition1[0] = from[0] + 1;
        tmpPosition1[1] = from[1] + 1;
        while (tmpPosition1[0] <= 7 && tmpPosition1[1] <= 7) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] !==
            context.state.empty
          )
            break;
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIsMoveValid", true);
          }
          tmpPosition1[0]++;
          tmpPosition1[1]++;
        }
      }
    },

    possibleActiveJump(context, payload) {
      context.commit("setIsMoveValid", false);
      let from = [];
      from[0] = payload.start[0];
      from[1] = payload.start[1];
      let to = [];
      to[0] = payload.end[0];
      to[1] = payload.end[1];
      let tmpPosition1 = [];
      let tmpPosition2 = [];
      if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        (context.state.board[from[0]][from[1]] === context.state.whitePawn ||
          context.state.board[from[0]][from[1]] === context.state.whiteKing)
      ) {
        tmpPosition1[0] = from[0] + 2;
        tmpPosition1[1] = from[1] + 2;
        tmpPosition2[0] = from[0] + 1;
        tmpPosition2[1] = from[1] + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
        tmpPosition1[0] = from[0] - 2;
        tmpPosition1[1] = from[1] + 2;
        tmpPosition2[0] = from[0] - 1;
        tmpPosition2[1] = from[1] + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
        tmpPosition1[0] = from[0] + 2;
        tmpPosition1[1] = from[1] - 2;
        tmpPosition2[0] = from[0] + 1;
        tmpPosition2[1] = from[1] - 1;

        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
        tmpPosition1[0] = from[0] - 2;
        tmpPosition1[1] = from[1] - 2;
        tmpPosition2[0] = from[0] - 1;
        tmpPosition2[1] = from[1] - 1;

        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            to[0] === tmpPosition1[0] &&
            to[1] === tmpPosition1[1] &&
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIsMoveValid", true);
          }
        }
      } else if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        context.state.board[from[0]][from[1]] === context.state.whiteKing
      ) {
        let tmpPosition = [];
        tmpPosition[0] = from[0] + 1;
        tmpPosition[1] = from[1] + 1;
        let defeated = 0;
        while (tmpPosition[0] <= 7 && tmpPosition[1] <= 7) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whiteKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing
          ) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0] += 1;
          tmpPosition[1] += 1;
        }

        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] - 1;
        tmpPosition[1] = from[1] + 1;

        while (tmpPosition[0] >= 0 && tmpPosition[1] <= 7) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whiteKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing
          ) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0] -= 1;
          tmpPosition[1] += 1;
        }

        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] + 1;
        tmpPosition[1] = from[1] - 1;

        while (tmpPosition[0] <= 7 && tmpPosition[1] >= 0) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whiteKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing
          ) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0] += 1;
          tmpPosition[1] -= 1;
        }
        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] - 1;
        tmpPosition[1] = from[1] - 1;

        while (tmpPosition[0] >= 0 && tmpPosition[1] >= 0) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whiteKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn
          ) {
            break;
          }
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing
          ) {
            defeated++;
            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0] -= 1;
          tmpPosition[1] -= 1;
        }
      }
      //black turn
      else if (
        context.state.board[from[0]][from[1]] === context.state.blackPawn
      ) {
        tmpPosition1[0] = from[0] + 2;
        tmpPosition1[1] = from[1] + 2;
        tmpPosition2[0] = from[0] + 1;
        tmpPosition2[1] = from[1] + 1;

        if (
          to[0] === tmpPosition1[0] &&
          to[1] === tmpPosition1[1] &&
          context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
            context.state.empty &&
          (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
            context.state.whitePawn ||
            context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whiteKing)
        ) {
          context.commit("setIsMoveValid", true);
        }
        tmpPosition1[0] = from[0] - 2;
        tmpPosition1[1] = from[1] + 2;
        tmpPosition2[0] = from[0] - 1;
        tmpPosition2[1] = from[1] + 1;
        if (
          to[0] === tmpPosition1[0] &&
          to[1] === tmpPosition1[1] &&
          context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
            context.state.empty &&
          (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
            context.state.whitePawn ||
            context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whiteKing)
        ) {
          context.commit("setIsMoveValid", true);
        }
        tmpPosition1[0] = from[0] + 2;
        tmpPosition1[1] = from[1] - 2;
        tmpPosition2[0] = from[0] + 1;
        tmpPosition2[1] = from[1] - 1;
        if (
          to[0] === tmpPosition1[0] &&
          to[1] === tmpPosition1[1] &&
          context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
            context.state.empty &&
          (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
            context.state.whitePawn ||
            context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whiteKing)
        ) {
          context.commit("setIsMoveValid", true);
        }
        tmpPosition1[0] = from[0] - 2;
        tmpPosition1[1] = from[1] - 2;
        tmpPosition2[0] = from[0] - 1;
        tmpPosition2[1] = from[1] - 1;

        if (
          to[0] === tmpPosition1[0] &&
          to[1] === tmpPosition1[1] &&
          context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
            context.state.empty &&
          (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
            context.state.whitePawn ||
            context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whiteKing)
        ) {
          context.commit("setIsMoveValid", true);
        }
      } else if (
        context.state.board[from[0]][from[1]] === context.state.blackKing
      ) {
        let tmpPosition = from;
        let defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] + 1;
        tmpPosition[1] = from[1] + 1;
        while (tmpPosition[0] <= 7 && tmpPosition[1] <= 7) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            (context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition[0]][tmpPosition[1]] ===
                context.state.whiteKing)
          ) {
            defeated++;

            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0]++;
          tmpPosition[1]++;
        }

        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] - 1;
        tmpPosition[1] = from[1] + 1;

        while (tmpPosition[0] >= 0 && tmpPosition[1] <= 7) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            (context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition[0]][tmpPosition[1]] ===
                context.state.whiteKing)
          ) {
            defeated++;

            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0]--;
          tmpPosition[1]++;
        }

        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] + 1;
        tmpPosition[1] = from[1] - 1;

        while (tmpPosition[0] <= 7 && tmpPosition[1] >= 0) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            (context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition[0]][tmpPosition[1]] ===
                context.state.whiteKing)
          ) {
            defeated++;

            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0]++;
          tmpPosition[1]--;
        }
        defeated = 0;
        tmpPosition = [];
        tmpPosition[0] = from[0] - 1;
        tmpPosition[1] = from[1] - 1;

        while (tmpPosition[0] >= 0 && tmpPosition[1] >= 0) {
          if (
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackKing ||
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.blackPawn
          )
            break;
          if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.empty
          ) {
            if (defeated !== 2) {
              context.commit("setIsMoveValid", true);
              break;
            }
          } else if (
            to[0] === tmpPosition[0] &&
            to[1] === tmpPosition[1] &&
            (context.state.board[tmpPosition[0]][tmpPosition[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition[0]][tmpPosition[1]] ===
                context.state.whiteKing)
          ) {
            defeated++;

            if (defeated === 2) {
              break;
            }
          }
          tmpPosition[0]--;
          tmpPosition[1]--;
        }
      }
    },
    ///
    isMovable(context, from) {
      context.dispatch("PossibleJump", from);
      context.dispatch("PossibleMove", from);
    },

    PossibleJump(context, from) {
      context.commit("setIfMoveIsPossible", false);
      let tmpPosition1 = [];
      let tmpPosition2 = [];
      const x = from[0];
      const y = from[1];
      if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        (context.state.board[from[0]][from[1]] === context.state.whitePawn ||
          context.state.board[from[0]][from[1]] === context.state.whiteKing)
      ) {
        tmpPosition1[0] = x - 2;
        tmpPosition1[1] = y + 2;
        tmpPosition2[0] = x - 1;
        tmpPosition2[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x - 2;
        tmpPosition1[1] = y - 2;
        tmpPosition2[0] = x - 1;
        tmpPosition2[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 2;
        tmpPosition1[1] = y + 2;
        tmpPosition2[0] = x + 1;
        tmpPosition2[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 2;
        tmpPosition1[1] = y - 2;
        tmpPosition2[0] = x + 1;
        tmpPosition2[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.blackPawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.blackKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
      }

      //black turn
      else if (
        context.state.board[from[0]][from[1]] === context.state.blackPawn
      ) {
        tmpPosition1[0] = x + 2;
        tmpPosition1[1] = y + 2;
        tmpPosition2[0] = x + 1;
        tmpPosition2[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x - 2;
        tmpPosition1[1] = y + 2;
        tmpPosition2[0] = x - 1;
        tmpPosition2[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 2;
        tmpPosition1[1] = y - 2;
        tmpPosition2[0] = x + 1;
        tmpPosition2[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x - 2;
        tmpPosition1[1] = y - 2;
        tmpPosition2[0] = x - 1;
        tmpPosition2[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0 &&
          tmpPosition2[0] < 8 &&
          tmpPosition2[1] < 8 &&
          tmpPosition2[0] >= 0 &&
          tmpPosition2[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
              context.state.whitePawn ||
              context.state.board[tmpPosition2[0]][tmpPosition2[1]] ===
                context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
      }
    },
    PossibleMove(context, from) {
      let tmpPosition1 = [];
      const x = from[0];
      const y = from[1];
      if (
        context.rootGetters.getPlayerTurn === context.state.whitePlayer &&
        (context.state.board[from[0]][from[1]] === context.state.whitePawn ||
          context.state.board[from[0]][from[1]] == context.state.whiteKing)
      ) {
        tmpPosition1[0] = x - 1;
        tmpPosition1[1] = y + 1;

        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[from[0]][from[1]] ===
              context.state.whitePawn ||
              context.state.board[from[0]][from[1]] === context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x - 1;
        tmpPosition1[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[from[0]][from[1]] ===
              context.state.whitePawn ||
              context.state.board[from[0]][from[1]] === context.state.whiteKing)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 1;
        tmpPosition1[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.whiteKing
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 1;
        tmpPosition1[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.whiteKing
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
      } else {
        tmpPosition1[0] = x - 1;
        tmpPosition1[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            (context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
              context.state.board[from[0]][from[1]] ===
                context.state.blackKing) ||
            context.state.board[from[0]][from[1]] === context.state.blackPawn
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x - 1;
        tmpPosition1[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            (context.state.board[from[0]][from[1]] ===
              context.state.blackKing ||
              context.state.board[from[0]][from[1]] === context.state.blackPawn)
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 1;
        tmpPosition1[1] = y - 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
        tmpPosition1[0] = x + 1;
        tmpPosition1[1] = y + 1;
        if (
          tmpPosition1[0] < 8 &&
          tmpPosition1[1] < 8 &&
          tmpPosition1[0] >= 0 &&
          tmpPosition1[1] >= 0
        ) {
          if (
            context.state.board[tmpPosition1[0]][tmpPosition1[1]] ===
              context.state.empty &&
            context.state.board[from[0]][from[1]] === context.state.blackKing
          ) {
            context.commit("setIfMoveIsPossible", true);
          }
        }
      }
    },
  },
};
