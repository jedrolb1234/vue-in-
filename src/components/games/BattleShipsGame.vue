<template>
  <div class="container">
    <div id="boards">
      <div class="player1-container">
        <h2>
          Moje Okręty
        </h2>
        <table class="board-table1">
          <tr>
            <td v-for="label in this.rowLabels" :key="label" class="label">{{ label }}</td>
          </tr>
          <tr v-for="(t, key) in this.getBoard" :key='key'>
            <td class="label">{{ key + 1 }}</td>
            <td v-for="(p, idx) in t" :key="idx">
              <div :class="getClass(key, idx)"></div>
            </td>
          </tr>
        </table>

      </div>
      <div class="player2-container">
        <h2>
          Okręty przeciwnika
        </h2>
        <table class="board-table2">
          <tr>
            <td v-for="label in this.rowLabels" :key="label" class="label">{{ label }}</td>
          </tr>
          <tr v-for="(t, key) in this.getOponentBoard" :key='key'>
            <td class="label">{{ key + 1 }}</td>
            <td v-for="(p, idx) in t" :key="idx" @click="mark(key, idx)">
              <div :class="this.getOponentClass(key, idx)"></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="text-align: center;" v-if="this.prepareBoard">
      Ułóż okręty na planszy i potwierdź gotowość do gry!
    </div>
    <div style="text-align: center;" v-if="!this.prepareBoard && this.getPlayerTurn==null && this.getSelectedGameRoom.status == 1">
      Oczekiwanie na przeciwnika!
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
  data() {
    return {
      rowLabels: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      isLocalBoard: false
    }
  },
  components: {
    BaseButton
  },
  methods: {
    ...mapActions('BattleShips', ['chooseMethod', 'updateBoard', 'updateBoards', 'resetBoardBattleShips']),
    ...mapActions(['obtainGameRoom', 'updatePlayerTurn']),
    mark(x, y) {
      if (this.getOponentBoard[x][y] == 0 && this.getPlayerTurn == this.getUserId) {
        this.$callHub.client.invoke('MakeShotSeaBattle', this.getSelectedGameRoom.id, this.getUserId, x * 10 + y + 1)
      }
    },
    getClass(x, y) {
      if (this.getBoard[x][y] == this.getShip)
        return 'ship ' + this.getShipEdgeClass(x, y, this.getBoard);
      if (this.getBoard[x][y] == this.getHit)
        return 'hit ' + this.getShipEdgeClass(x, y, this.getBoard);
      if (this.getBoard[x][y] == this.getMiss)
        return 'miss';
      if (this.getBoard[x][y] == this.getBlocked)
        return 'blocked';
    },
    getShipEdgeClass(x, y, board) {
      if (board[x][y] != this.getShip && board[x][y] != this.getHit) {
        return '';
      }
      if (this.hasNoShipsAround(board, x, y))
        return 'ship-edge-top ship-edge-bottom'
      if (this.isEdgeSHip(board, x, y, [-1, 0], [1, 0]))
        return 'ship-edge-top'
      if (this.isEdgeSHip(board, x, y, [1, 0], [-1, 0]))
        return 'ship-edge-bottom'
      if (this.isEdgeSHip(board, x, y, [0, -1], [0, 1]))
        return 'ship-edge-left'
      if (this.isEdgeSHip(board, x, y, [0, 1], [0, -1]))
        return 'ship-edge-right'
      return '';
    },
    isEdgeSHip(board, x, y, start, end) {
      if (board[x][y] != this.getShip && board[x][y] != this.getHit)
        return false;
      const startx = x + start[0];
      const starty = y + start[1];
      const endx = x + end[0];
      const endy = y + end[1];
      let first;
      let second;
      if (startx >= 0 && startx < 10 && starty >= 0 && starty < 10) {
        first = board[startx][starty] != this.getShip && board[startx][starty] != this.getHit
      }
      else {
        first = true;
      }
      if (endx >= 0 && endx < 10 && endy >= 0 && endy < 10) {
        second = board[endx][endy] == this.getShip || board[endx][endy] == this.getHit;
      }
      else {
        second = false;
      }
      if (first && second) {
        return true;
      }
      return false;
    },
    hasNoShipsAround(board, x, y) {
      const vectors = [[-1, 0], [0, -1], [1, 0], [0, 1]]
      for (const vector of vectors) {
        const dx = x + vector[0]
        const dy = y + vector[1]
        if (dx >= 0 && dx < 10 && dy >= 0 && dy < 10)
          if (board[dx][dy] == this.getShip || board[dx][dy] == this.getHit)
            return false;
      }
      return true;
    },
    getOponentClass(x, y) {
      if (this.getOponentBoard[x][y] == this.getShip) 
        return 'ship ' + this.getShipEdgeClass(x, y, this.getOponentBoard);
      if (this.getOponentBoard[x][y] == this.getHit) {
        if (this.isSink(x, y)) {
          return 'hit ' + this.getShipEdgeClass(x, y, this.getOponentBoard);
        }
        return 'enemy-hit';
      }
      if (this.getOponentBoard[x][y] == this.getMiss)
        return 'miss';
      if (this.getOponentBoard[x][y] == this.getBlocked)
        return 'blocked';
    },
    getShipFields(origin, size, direction) {
      let fields = [origin];
      for (let i = 0; i < size - 1; i++) {
        if (direction == 1) {
          fields.push([origin[0] + i + 1, origin[1]]);
        }
        else {
          fields.push([origin[0], origin[1] + i + 1]);
        }
      }
      return fields;
    },
    getShipSurroundings(fields) {
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
      return surroundings;
    },
    isShipPlacementValid(board, fields) {
      if (!this.isShipPlacementInBoundries(fields))
        return false;
      for (const field of fields) {
        if (board[field[0]][field[1]] != 0)
          return false;
      }
      const surroundings = this.getShipSurroundings(fields);
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
            for (const field of shipFields) {
              board[field[0]][field[1]] = 1;
            }
          }
        }
      }
      this.isLocalBoard=true;
      this.updateBoard(board);
    },
    confirmBoard() {
      this.$callHub.client.invoke('ReadyToPlaySeaBattle', this.getSelectedGameRoom.id, this.getUserId, JSON.stringify(this.getBoard));
    },
    isSink(x, y) {
      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      let ship = [];
      if (this.getOponentBoard[x][y] == this.getHit) {
        if(this.getSelectedGameRoom.status==2) {
          return true;
        }
        ship.push([x, y]);
        for (const direction of directions) {
          let dx = x + direction[0]
          let dy = y + direction[1]
          while ((dx >= 0 && dx < 10 && dy >= 0 && dy < 10) && (this.getOponentBoard[dx][dy] == this.getShip || this.getOponentBoard[dx][dy] == this.getHit)) {
            ship.push([dx, dy]);
            dx += direction[0];
            dy += direction[1];
          }
        }
        const surroundings = this.getShipSurroundings(ship);
        for (const su of surroundings) {
          if (this.getOponentBoard[su[0]][su[1]] != this.getMiss && this.getOponentBoard[su[0]][su[1]] != this.getBlocked)
            return false;
        }
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapGetters('BattleShips', ['getBoard', 'getBoardTable1', 'getOponentBoard', 'getEmpty', 'getShip', 'getHit', 'getMiss',
      'getOneCounter', 'getTwoCounter', 'getThreeCounter', 'getFourCounter', 'getBlocked']),
    ...mapGetters(['getSelectedGameRoom', 'getUserId', 'getPlayerTurn', 'getUsername']),
    prepareBoard() {
      if (this.getSelectedGameRoom.status == 1 && this.getPlayerTurn == null && (this.isLocalBoard || this.getBoard.every(row => row.every(cell => cell ==0))))
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
      this.updateBoards([board, oponentBoard]);
      this.isLocalBoard=false
      this.updatePlayerTurn(playerTurn);
    })

    this.$callHub.client.on("GameRoomJoined", () => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
    })

    this.$callHub.client.on("ShotTaken", (boards, oponentBoard, playerTurn, winner, isFinished) => {
      if (isFinished==1)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updateWinner(winner);
      this.updateBoards([boards, oponentBoard]);
      this.isLocalBoard=false
      this.updatePlayerTurn(playerTurn);
    })

    this.$callHub.client.on("UpdateBoardState", (boards, oponentBoard, playerTurn, winner, isFinished) => {
      if (isFinished==1)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      // this.updateWinner(winner);
      this.updateBoards([boards, oponentBoard]);
      this.isLocalBoard=false
      this.updatePlayerTurn(playerTurn);
    })

    this.$callHub.client.on("PlayerReadyToStart", (user, playerTurn) => {
      if(user == this.getUsername) {
        this.isLocalBoard=false
      }
      if (playerTurn != null) {
        this.updatePlayerTurn(playerTurn);
      }
    })
  },
  beforeUnmount() {
    this.$callHub.client.off('NewUserConnectedToTheRoom');
    this.$callHub.client.off('GameStarted');
    this.$callHub.client.off('GameRoomJoined');
    this.$callHub.client.off('ShotTaken');
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
  padding: 25px;
  margin-bottom: 30px;
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

.board-table1 {
  border-spacing: 0px;
}

.player2-container {
  text-align: center;
}

.player1-container {
  text-align: center;
}

.label {
  background-color: var(--secondary);
  text-align: center;
  border: 0px;
  font-weight: bold;
  min-width: 27px;
  min-height: 27px;
  width: auto;
  height: auto;
}

.board-table2 {
  border-spacing: 0px;
}

table {
  background-color: aqua;
  table-layout: auto;
}

td {
  border-style: solid;
  border-color: black;
  border-width: 1px;
  min-width: 50px;
  min-height: 50px;
  height: 50px;
  padding: 0px;
}


.ship {
  background-color: #C0C0C0;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.ship::after {
  position: absolute;
  display: block;
  content: '';
  background-color: black;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.empty2 {
  background-size: cover;
  animation: sink 1000ms forwards ease;
}
.hit {
  background-color: gray;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.hit::after {
  position: absolute;
  display: block;
  content: '';
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="red"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.enemy-hit {
  animation: explosion 0.3s;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}

.enemy-hit::after {
  position: absolute;
  display: block;
  content: '';
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="red"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    opacity: 0;
  }
}

.miss {
  animation: explosion 0.3s;
  position: relative;
}

.miss::after {
  position: absolute;
  display: block;
  content: '';
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.blocked {
  animation: explosion 0.3s;
  position: relative;
}

.blocked::after {
  position: absolute;
  display: block;
  content: '';
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="gray"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.counterFour .counterThree .counterTwo .counterOne {
  flex-wrap: wrap;
}

.counter4 .counter3 .counter2 .counter1 {
  flex-wrap: wrap;
}

.ship-edge-top {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

.ship-edge-right {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.ship-edge-bottom {
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}

.ship-edge-left {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
</style>