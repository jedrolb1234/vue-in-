<template>
  <div class="board-container">
    <table class="board-table">
      <tr v-if="!this.isBoardReversed">
        <td  v-for="(label, index) in this.rowLabels" :key="index" class="label">{{ label }}</td>
      </tr>
      <tr v-else>
        <td  v-for="(label, index) in [...this.rowLabels].reverse()" :key="index" class="label">{{ label }}</td>
      </tr>
      <tr v-for="(t, key) in this.getBoard" :key='key'>
        <td v-if="this.isBoardReversed" class="label">{{key+1}}</td>
        <td v-else class="label">{{8-key}}</td>
        <td v-for="(p, idx) in t" :key="idx" class="field" @dragover="this.dragover($event)"
          @drop="this.drop($event, key, idx)">
          <p :class="this.getPawnClass(key, idx)" :draggable="this.isMyPawn(key, idx)"
            @dragstart="this.selectPawn(key, idx)"></p>
        </td>
        <td v-if="this.isBoardReversed" class="label">{{key+1}}</td>
        <td v-else class="label">{{8-key}}</td>
      </tr>
      <tr v-if="!this.isBoardReversed">
        <td  v-for="(label, index) in this.rowLabels" :key="index" class="label">{{ label }}</td>
      </tr>
      <tr v-else>
        <td  v-for="(label, index) in [...this.rowLabels].reverse()" :key="index" class="label">{{ label }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      draggedPawn: [],
      rowLabels: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
    }
  },
  methods: {
    ...mapActions('Checkers', ['isMoveValid', 'isMovable', 'move', 'moveTo', 'setBoard', 
                  'updatePlayers', 'updateBoard', 'updateWinner', 'resetBoardCheckers', 'updateWhitePlayer']),
    ...mapActions(['obtainGameRoom', 'updatePlayerTurn']),
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
      this.isMovable([x, y]);
      if ((this.getBoard[x][y] != this.getEmpty) && (this.getIfMoveIsPossible)) {
        this.draggedPawn = [x, y];
      }
    },
    dragover(event) {
      event.preventDefault();
    },
    drop(e, x, y) {
      e.preventDefault();
      this.isMoveValid({start: this.draggedPawn, end: [x, y]});
      //quick fix for presentation
      // if (this.getIsMoveValid) {
      let asd = 2
      if (asd === 2) {
        if (this.isBoardReversed) {

          this.$callHub.client.invoke('MakeMoveCheckers', this.getSelectedGameRoom.id, this.getUserId, 65 - (this.draggedPawn[0] * 8 + this.draggedPawn[1] + 1), 65 - (x * 8 + y + 1));
        }
        else {
          this.$callHub.client.invoke('MakeMoveCheckers', this.getSelectedGameRoom.id, this.getUserId, this.draggedPawn[0] * 8 + this.draggedPawn[1] + 1, x * 8 + y + 1);
        }
      }
    },

    isMyPawn(x, y) {
      const index = this.getSelectedGameRoom.players.map(x => x.playerId).indexOf(this.getUserId);
      if (this.getBoard[x][y] == (index + 1) || this.getBoard[x][y] == (index + 3))
        return true;
      return false;
    }
  },
  computed: {
    ...mapGetters('Checkers', ['getBlackClass', 'getIsMoveValid', 'getBoard', 'getIfMoveIsPossible',
                  'getBlackPawn', 'getBlackKing', 'getWhitePawn', 'getWhiteKing', 'isBoardReversed']),
    ...mapGetters(['getSelectedGameRoom', 'getUserId']),

  },
  getters:{
    getDraggedPawn(){
      return this.draggedPawn;
    }
  },
  beforeCreate() {
    this.$callHub.client.on('NewUserConnectedToTheRoom', (roomId) => {
      this.$callHub.client.invoke('GetCurrentGameRoomState', roomId, this.getUserId);
    })

    this.$callHub.client.on('GameStarted', async (board, playerTurn, whitePlayer) => {
      await this.obtainGameRoom(this.getSelectedGameRoom.id);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
      this.updateWhitePlayer(whitePlayer);
    })

    this.$callHub.client.on('GameRoomJoined', async () => {
      await this.obtainGameRoom(this.getSelectedGameRoom.id);
    })

    this.$callHub.client.on('UpdateBoardState', async (board, playerTurn, winner, isFinished, whitePlayer) => {
      if (isFinished)
        await this.obtainGameRoom(this.getSelectedGameRoom.id);
      this.updateWinner(winner);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
      this.updateWhitePlayer(whitePlayer);
    }
    )
  },
  beforeUnmount() {
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
  border-collapse: collapse;
  background-color: white;
}

tr:nth-child(odd) > td:nth-child(even) {
  background-color: #964B00;
}

tr:nth-child(even) > td:nth-child(odd) {
  background-color: #964B00;
}




.board-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  /* background-color: black; */
}
.field {
  width: 100px;
  height: 100px;
  border: solid 1px black;
}

.label {
  border: solid 1px black;
  color: black;
  padding:5px;
  min-height: 36px;
  min-width: 36px;
  text-align: center;
  font-weight: bold;
}

.white-pawn {
  background-color: white;
  border: 1px solid black;
  width: 65%;
  height: 65%;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}

.white-king {
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg style="color: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" fill="black"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  width: 65%;
  height: 65%;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}

.black-pawn {
  background-color: black;
  border: 1px solid black;
  width: 65%;
  height: 65%;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}

.black-king {
  background-color: black;
  background-image: url('data:image/svg+xml;utf8,<svg style="color: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" fill="white"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  width: 65%;
  height: 65%;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
}
</style>
