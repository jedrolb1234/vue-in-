<template>
  <table>
    <tr v-for="i in 6" :key="i">
      <td v-for="j in 7" :key="j" @click="dropBall(j - 1)">
        <p :class="this.getPawn(i - 1, j - 1)"></p>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getBoard', 'getSelectedGameRoom', 'getPlayerTurn', 'getUserId', 'getWinner']),
  },
  methods: {
    ...mapActions(['dropBall', 'resetGameCoonectFour', 'obtainGameRoom', 'updatePlayers', 'updateBoard', 'updatePlayerTurn', 'updateWinner']),
    getPawn(i, j) {
      if (this.getBoard[i][j] == 1)
        return 'myPawn'
      else if (this.getBoard[i][j] !=0)
        return 'enemyPawn'
      return 'empty'
    },
    dropBall(c) {
      if (this.getPlayerTurn != this.getUserId)
        return
      if (this.getWinner != null)
        return
      for (let i = 5; i >= 0; i--) {
        if (this.getBoard[i][c] == 0) {
          this.$callHub.client.invoke('MakeMoveConnectFour', this.getSelectedGameRoom.id, this.getUserId, c);
          break;
        }
      }
    },
  },
  beforeCreate() {
    this.$callHub.client.on('NewUserConnectedToTheRoom', (roomId) => {
      this.$callHub.client.invoke('GetCurrentGameRoomState', roomId, this.getUserId);
    })

    this.$callHub.client.on("GameStarted", (board, playerTurn) => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
      this.updatePlayers(this.getSelectedGameRoom.players);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
    })

    this.$callHub.client.on("GameRoomJoined", () => {
      this.obtainGameRoom(this.getSelectedGameRoom.id);
    })

    this.$callHub.client.on("UpdateBoardState", (board, playerTurn, winner, isFinished) => {
      if (isFinished)
        this.obtainGameRoom(this.getSelectedGameRoom.id);
      this.updateWinner(winner);
      this.updateBoard(board);
      this.updatePlayerTurn(playerTurn);
    }
    )
  },
  beforeUnmount() {
    this.$callHub.client.off('NewUserConnectedToTheRoom');
    this.$callHub.client.off('GameStarted');
    this.$callHub.client.off('GameRoomJoined');
    this.$callHub.client.off('UpdateBoardState');
    this.resetGameCoonectFour();
  }
}
</script>

<style scoped>
p {
  margin: 10px;
  z-index: 1;
}



@keyframes fadeIn {
  from {
    transform: translateY(-150px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 100%;
  }
}

.enemyPawn {
  background-color: yellow;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  animation-name: fadeIn;
  animation-duration: 500ms;
  border: 1px solid var(--primary);
  overflow: hidden;
}
table {
  position: relative;
  z-index: 10;
  background-color: blue;
  border-spacing: 0px;
  border-collapse: collapse;
  border: 1px solid var(--primary);
  margin-bottom: 30px;
}
.myPawn {
  background-color: red;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  animation-name: fadeIn;
  animation-duration: 500ms;
  border: 1px solid var(--primary);
  overflow: hidden;
}

.empty {
  border-radius: 50%;
  border: 1px solid var(--secondary);
  background-color: white;
  width: 80px;
  height: 80px;
  transition: all;
}
</style>