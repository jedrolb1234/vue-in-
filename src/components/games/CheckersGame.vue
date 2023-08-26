<template>
  <div class="board-container">
    <table class="board-table">
      <tr v-for="(t, key) in this.getBoard" :key='key'>
        <td v-for="(p, idx) in t" :key="idx" :class="this.getClass(key, idx)" @dragover="this.dragover($event)"
          @drop="this.drop($event, key, idx)">
          <p :class="this.getPawnClass(key, idx)" :draggable="this.isMyPawn(key, idx)"
            @dragstart="this.selectPawn(key, idx)"></p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      draggedPawn: []
    }
  },
  methods: {
    ...mapActions('Checkers', ['chooseMethod', 'isMovable', 'move', 'moveTo', 'active', 'setBoard', 'updatePlayers', 'updateBoard', 'updateWinner', 'resetBoardCheckers', 'updateWhitePlayer']),
    ...mapActions(['obtainGameRoom', 'updatePlayerTurn']),
    getClass(x, y) {
      if ((this.getClickedCell === [x, y]) && this.getIfMoveIsPossible) {
        return this.getClickedClass;
      }
      else if ((x + y) % 2 == 0) {
        return this.getBlackClass;
      }
      // return 'WhiteEmpty'
    },
    getPawnClass(x, y) {
      const classes = []
      if (this.getBoard[x][y] == this.getBlackPawn)
        classes.push('black-pawn');
      if (this.getBoard[x][y] == this.getWhitePawn)
        classes.push('white-pawn')
      if (this.getBoard[x][y] == this.getBlackKing)
        classes.push('black-king')
      if (this.getBoard[x][y] == this.getWhiteKing)
        classes.push('white-king')
      if (this.isMyPawn(x, y))
        classes.push('pointer');
      return classes.join(' ');
    },
    selectPawn(x, y) {
      if (this.getBoard[x][y] != this.getEmpty) {
        this.draggedPawn = [x, y];
      }
    },
    dragover(event) {
      event.preventDefault();
    },
    drop(e, x, y) {
      e.preventDefault();
      if (this.isMoveValid(this.draggedPawn, [x, y])) {
        if (this.isBoardReversed) {
          this.$callHub.client.invoke('MakeMoveCheckers', this.getSelectedGameRoom.id, this.getUserId, 65 - (this.draggedPawn[0] * 8 + this.draggedPawn[1] + 1), 65 - (x * 8 + y + 1));
        }
        else {
          this.$callHub.client.invoke('MakeMoveCheckers', this.getSelectedGameRoom.id, this.getUserId, this.draggedPawn[0] * 8 + this.draggedPawn[1] + 1, x * 8 + y + 1);
        }
      }
    },
    isMoveValid(start, end) {
      if ((end[0] + end[1]) % 2 == 0 || this.getBoard[end[0]][end[1]] != this.getEmpty)
        return false;
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
    isMyPawn(x, y) {
      const index = this.getSelectedGameRoom.players.map(x => x.playerId).indexOf(this.getUserId);
      if (this.getBoard[x][y] == (index + 1) || this.getBoard[x][y] == (index + 3))
        return true;
      return false;
    }
    // getPiecesBetween(start, end) {
    //   const pieces = []
    //   let xstep = 1;
    //   let ystep = 1;
    //   let counter;
    //   if (start[0] > end[0])
    //     xstep = -1;
    //   if(start[1]>end[1])
    //     ystep=-1;
    //   counter=ystep;
    //   for(let i= start[0];i<=end[0];i+=xstep) {
    //     if(this.getBoard[i][start[1]+ystep] != this.getEmpty) {
    //       pieces.push(this.getBoard[i][start[1]+counter])
    //     }
    //     counter+=ystep;
    //   }
    //   return pieces
    // }
    // chooseMethod(x, y) {
    //   this.isMovable([x,y]);
    //   this.active([x,y]);
    //   if (this.getIfMoveIsPossible) {
    //     return this.move([x,y])
    //   } else if (this.getClickedSecondCell && this.getActiveMove) {
    //     return this.moveTo([x,y])
    //   }
    //   return
    // },
  },
  computed: {
    ...mapGetters('Checkers', ['getBlackClass', 'getW', 'getClickedClass',
      'getBoard', 'getEmpty', 'getClickedCell', 'getClickedSecondCell', 'getIfMoveIsPossible',
      'getActiveMove', 'getBlackPawn', 'getBlackKing', 'getWhitePawn', 'getWhiteKing', 'isBoardReversed']),
    ...mapGetters(['getSelectedGameRoom', 'getUserId']),

  },
  created() {
    this.$callHub.client.on('NewUserConnectedToTheRoom', (roomId) => {
      this.$callHub.client.invoke('GetCurrentGameRoomState', roomId);
    })

    this.$callHub.client.on("GameStarted", (board, playerTurn, whitePlayer) => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updatePlayers(this.getSelectedGameRoom.players);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
      this.updateWhitePlayer(whitePlayer);
    })

    this.$callHub.client.on("GameRoomJoined", () => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
    })

    this.$callHub.client.on("UpdateBoardState", (board, playerTurn, winner, isFinished, whitePlayer) => {
      if (isFinished)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      this.updateWinner(winner);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
      this.updateWhitePlayer(whitePlayer);
    }
    )
  },
  async unmounted() {
    this.$callHub.client.off('NewUserConnectedToTheRoom');
    this.$callHub.client.off('GameStarted');
    this.$callHub.client.off('GameRoomJoined');
    this.$callHub.client.off('UpdateBoardState');
    this.resetBoardCheckers();
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

table {
  border: 1px solid var(--primary);
  border-right: 0px;
  height: 800px;
  width: 800px;
  border-collapse: collapse;
}

.board-container {
  display: flex;
  justify-content: center;
  background-color: black;
}

.board-table {
  margin: auto;
}

.WhiteEmpty {
  background-color: black;
  width: 66px;
  height: 66px;
}

.Black {
  background-color: rgb(136, 18, 18);
  width: 100px;
  height: 100px;
  /* transition: all 2.6s ease; */
}

.white-pawn {
  background-color: rgb(255, 255, 255);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
  /* transition: all 2.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}

.white-king {
  background-color: rgb(255, 85, 0);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}

.black-pawn {
  background-color: rgb(93, 96, 162);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
  /* transition: all 0.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}

.black-king {
  background-color: rgb(18, 6, 95);
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}

.empty {
  background-color: black;
}

.w {
  background-color: white;
  visibility: hidden;
}

.clicked {
  background-color: yellowgreen;
}

.clickedMoveTo {
  background: yellowgreen;
}
</style>
