<template>
  <div class="container">
    <div id="boards">
      <div class="player1-container">
        <table class="board-table1">
          <tr v-for="(t, key) in this.getBoard" :key='key'>
            <td v-for="(p, idx) in t" :key="idx" :class="getClass(key, idx)" @click="chooseMethod([key, idx])"></td>
          </tr>
        </table>
        <!-- <div class="shipCounter">
          <div class="counterFour">
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipCount">{{ getFourCounter }}</p>
          </div>
          <div class="counterThree">
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipCount">{{ getThreeCounter }}</p>
          </div>
          <div class="counterTwo">
            <p class="shipImage"></p>
            <p class="shipImage"></p>
            <p class="shipCount">{{ getTwoCounter }}</p>
          </div>
          <div class="counterOne">
            <p class="shipImage"></p>
            <p class="shipCount">{{ getOneCounter }}</p>
          </div>
        </div> -->

      </div>
      <div class="player2-container">
        <table class="board-table2">
          <tr v-for="(t, key) in this.getOponentBoard" :key='key'>
            <td v-for="(p, idx) in t" :key="idx" :class="this.getOponentClass(key, idx)" @click="mark(key, idx)"></td>
          </tr>
        </table>
      </div>
    </div>
    <div style="text-align: center;" v-if="this.prepareBoard">
      Ułóż statki na planszy i potwierdź gotowość do gry!
    </div>
    <div id="actions" v-if="this.prepareBoard">
      <BaseButton type="primary-medium" @click="this.generateRandomBoard()">Generuj losowe</BaseButton>
      <BaseButton type="secondary-medium" @click="this.confirmBoard()">Zatwierdź</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../base/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  methods: {
    ...mapActions('BattleShips', ['chooseMethod', 'updateBoard', 'updateBoards', 'resetBoardBattleShips']),
    ...mapActions(['obtainGameRoom', 'updatePlayerTurn']),
    mark(x, y) {
      if(this.getOponentBoard[x][y] ==0) {
        this.$callHub.client.invoke('MakeShotSeaBattle', this.getSelectedGameRoom.id, this.getUserId, x * 10 + y + 1)
      }
      // if (context.commit('selectTag', field) === context.state.hipOponent || context.state.emptyOponent) {
      //   context.commit('setOponentRecive', field);
      //   if (context.state.oponentBoard[field] === context.state.shipOponent) {
      //     context.commit('setOponentBoard', { key: field, value: context.state.hitOponent });

      //   }
      //   else if (context.state.oponentBoard[field] === context.state.emptyOponent) {
      //     context.commit('setOponentBoard', { key: field, value: context.state.missedOponent });

      //   }
      // }
      // else if (context.commit('selectTag', field) === ('hitOponent' || 'missedOponent')) {
      //   return
      // }
    },
    getClass(x, y) {
      if (this.getBoard[x][y] == this.getEmpty)
        return 'empty';
      if (this.getBoard[x][y] == this.getShip)
        return 'ship';
      if (this.getBoard[x][y] == this.getHit)
        return 'hit';
      if (this.getBoard[x][y] == this.getMiss)
        return 'miss';

    },
    getOponentClass(x, y) {
      if (this.getOponentBoard[x][y] == this.getEmpty)
        return 'empty';
      if (this.getOponentBoard[x][y] == this.getShip)
        return 'ship';
      if (this.getOponentBoard[x][y] == this.getHit)
        return 'hit';
      if (this.getOponentBoard[x][y] == this.getMiss)
        return 'miss';
    },
    getShipFields(origin, size, direction) {
      console.log(origin, size, direction);
      let fields = [origin];
      for (let i = 0; i < size - 1; i++) {
        if (direction == 1) {
          fields.push([origin[0] + i + 1, origin[1]]);
        }
        else {
          fields.push([origin[0], origin[1] + i + 1]);
        }
      }
      // console.log(fields);
      return fields;
    },
    getShipSurroundings(board, fields) {

      const compareArrays = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
      };

      const arrayIncludes = (arr, el) => {
        for (const a of arr) {
          if (compareArrays(a, el))
            return true;
        }
        return false;
      }

      const surroundings = []
      const vectors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
      for (const field of fields) {
        for (const vector of vectors) {
          const x = field[0] + vector[0];
          const y = field[1] + vector[1];
          if (x >= 0 && x < 10 && y >= 0 && y < 10 && !arrayIncludes(fields, [x, y]))
            surroundings.push([x, y]);
        }
      }
      // console.log(board, fields);
      return surroundings;
    },
    isShipPlacementValid(board, fields) {
      // console.log(fields)
      if (!this.isShipPlacementInBoundries(fields))
        return false;
      for (const field of fields) {
        if (board[field[0]][field[1]] != 0)
          return false;
      }
      const surroundings = this.getShipSurroundings(board, fields);
      for (const surrounding of surroundings) {
        if (board[surrounding[0]][surrounding[1]] != 0)
          return false;
      }
      return true;
    },
    isShipPlacementInBoundries(fields) {
      for (const field of fields) {
        for (const axis of field) {
          if (axis < 0 || axis > 9)
            return false;
        }
      }
      return true;
    },
    generateRandomBoard() {
      const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
      let board = Array(10).fill().map(() => Array(10).fill(0))
      // console.log('start');
      for (const ship of ships) {
        let isShipValid = false;
        let limit = 0;
        while (!isShipValid && limit < 10000) {
          limit++;
          const direction = Math.floor(Math.random() * 2);
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const shipFields = this.getShipFields([x, y], ship, direction);
          isShipValid = this.isShipPlacementValid(board, shipFields);
          if (isShipValid) {
            // console.log(shipFields);
            for (const field of shipFields) {
              board[field[0]][field[1]] = 1;
            }
          }
        }
      }
      // console.log(board);
      // console.log('end');
      this.updateBoard(board);
    },
    confirmBoard() {
      console.log( JSON.stringify(this.getBoard));
      this.$callHub.client.invoke('ReadyToPlaySeaBattle',this.getSelectedGameRoom.id, this.getUserId, JSON.stringify(this.getBoard));
    }
  },
  computed: {
    ...mapGetters('BattleShips', ['getBoard', 'getBoardTable1', 'getOponentBoard', 'getEmpty', 'getShip', 'getHit', 'getMiss',
      'getOneCounter', 'getTwoCounter', 'getThreeCounter', 'getFourCounter']),
    ...mapGetters(['getSelectedGameRoom', 'getUserId', 'getPlayerTurn']),
    prepareBoard() {
      if(this.getSelectedGameRoom.status == 1 && this.getPlayerTurn == null)
        return true;
      return false;
    }
  },
  beforeCreate() {
    this.$callHub.client.on('NewUserConnectedToTheRoom', (roomId) => {
      this.$callHub.client.invoke('GetCurrentGameRoomState', roomId, this.getUserId);
    })

    this.$callHub.client.on("GameStarted", (board, oponentBoard, playerTurn) => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updatePlayers(this.getSelectedGameRoom.players);
      console.log(oponentBoard);
      this.updateBoards([board,oponentBoard]);
      this.updatePlayerTurn(playerTurn);
    })

    this.$callHub.client.on("GameRoomJoined", () => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
    })

    this.$callHub.client.on("ShotTaken", (boards, oponentBoard, playerTurn, winner, isFinished) => {
      if (isFinished)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updateWinner(winner);
      this.updateBoards([boards, oponentBoard]);
      this.updatePlayerTurn(playerTurn);
      // this.updateWhitePlayer(whitePlayer);
    })

    this.$callHub.client.on("PlayerReadyToStart", (user, playerTurn) => {
      if(playerTurn!=null) {
        this.updatePlayerTurn(playerTurn);
      }
    })  

    this.$callHub.client.on("UpdateBoardState", (boards, oponentBoard, playerTurn, winner, isFinished) => {
      if (isFinished)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updateWinner(winner);
      this.updateBoards([boards, oponentBoard]);
      this.updatePlayerTurn(playerTurn);
      // this.updateWhitePlayer(whitePlayer);
    })
  },
  beforeUnmount() {
    this.$callHub.client.off('NewUserConnectedToTheRoom');
    this.$callHub.client.off('GameStarted');
    this.$callHub.client.off('GameRoomJoined');
    this.$callHub.client.off('UpdateBoardState');
    this.resetBoardBattleShips();
  }
}
</script>
   
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  border: 1px solid var(--primary);
  border-right:0px;
  padding: 25px;
}

#boards {
  display: flex;
  gap: 50px;
}

#actions {
display: flex;
justify-content: center;
gap: 50px;
}

.player1-container {
  background-color: palegreen;
  height: 500px;
  width: 500px;
}

.player2-container {
  background-color: darkcyan;
  height: 500px;
  width: 500px;
}

.board-table1 {
  border-spacing: 0px;
}

.board-table2 {
  border-spacing: 0px;
}

td {
  border-style: solid;
  border-color: black;
  border-width: 0.5px;
  width: 50px;
  height: 50px;
}

img {
  width: 32px;
  height: 25px;
  margin-top: 2px;
}

.ship {
  background-image: url('@/assets/games/image/sss.png');
  background-size: cover;
  animation: show 1000ms forwards ease;
}

.empty {
  background-size: cover;
}

.empty2 {
  background-size: cover;
  animation: sink 1000ms forwards ease;
}

.emptyOponent {
  background-color: aqua;
}

.emptyOponent:hover {
  background-image: url('@/assets/games/image/celownik.png');
  background-size: cover;
}

.shipOponent:hover {
  background-image: url('@/assets/games/image/celownik.png');
  background-size: cover;
}

.shipOponent {
  size: cover;
  background-color: aqua;
}

.hit {
  background-image: url('@/assets/games/image/cbomb.png');
  background-size: cover;
}

@keyframes sink {
  0% {
    opacity: 0;
    transform: rotateY(0deg);
    background-image: url('@/assets/games/image/sss.png');
  }

  100% {
    opacity: 1;
    transform: rotateY(180deg);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }

  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

.hitPlayer {
  width: 37.5px;
  height: 37.5px;
  animation: sink 2000ms forwards ease;
  background-image: url('@/assets/games/image/sss.png');
  background-size: cover;
  display: inline-block;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

@keyframes explosion {
  from {
    transform: scale(0%);
    border: none;
  }

  70% {
    transform: scale(150%);
    border: none;
    opacity: 100%;
  }

  to {
    border: 0.5px black solid;
    opacity: 0;
  }
}

.hitOponent {
  animation: explosion 350ms;
  background-image: url('@/assets/games/image/bomb.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.miss {
  animation: explosion 350ms;
  background-image: url('@/assets/games/image/cross.png');
  background-size: cover;
}

.counterFour .counterThree .counterTwo .counterOne {
  flex-wrap: wrap;
}

.counter4 .counter3 .counter2 .counter1 {
  flex-wrap: wrap;
}

.shipImage {
  width: 37.5px;
  height: 37.5px;
  background-image: url('@/assets/games/image/sss.png');
  background-size: cover;
  display: inline-block;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

.shipCount {
  display: inline-block;
  box-sizing: border-box;
  width: 37.5px;
  height: 37.5px;
  margin: 0px;
  padding-bottom: 10px;
}
</style>