<template>
  <div class="panel" v-if="this.getSelectedGameRoom.status != undefined">
    <div class="content">
      <div class="panel__title">
        <h2>{{ this.getSelectedGameRoom.roomName }}</h2>
        <!-- <span class="material-symbols-outlined edit">
          edit
        </span> -->
      </div>
      <hr>
      <div class="panel__players">
        <!-- {{ this.getSelectedGameRoom }} -->
        <h3>Gracze</h3>
        <div class="panel__players__box">
          <div v-for="player in this.getSelectedGameRoom.players" :key="player.playerId">
            <span>{{ player.userName }}</span> <span>({{ player.pointsAfterGame }})</span>
            <!-- <span class="material-symbols-outlined kick">
              close
            </span> -->
          </div>
        </div>
      </div>
      <hr>
      <div v-if="this.getSelectedGameRoom.status == 0">
        <h3>Rozgrywka</h3>
        <p class="playerTurn">Oczekiwanie na rozpoczęcie!</p>
        <hr>
      </div>
      <div v-if="this.getSelectedGameRoom.status == 1">
        <h3>Rozgrywka</h3>
        <div style="display: flex; flex-direction: row;background-color: var(--accent); align-items: center;justify-content: center; gap:10px;" v-if="this.getPlayerTurn == this.getUserId" class="playerTurn">
          <span :class="this.getCheckersPiece" v-if="this.getSelectedGameRoom.gameTypeId===0"></span>
          Twój ruch!</div>
        <p v-else class="playerTurn">Ruch gracza {{ getplayerData(getPlayerTurn).userName }}</p>
        <hr>
      </div>
      <div v-if="this.getSelectedGameRoom.status == 2">
        <h3>Rozgrywka</h3>
        <p class="playerTurn">Rozgrywka się zakończyła!</p>
        <hr>
      </div>
      <div v-if="this.getSelectedGameRoom.status == 2">
        <h3>Wynik</h3>
        <p v-if="this.getUserId == this.getSelectedGameRoom.whoWon" class="playerTurn"
          style="background-color: var(--accent);">Wygrałeś!</p>
        <p v-else class="playerTurn">{{ getplayerData(getSelectedGameRoom.whoWon).userName }} wygrał!</p>
        <hr>
      </div>
      <div v-if="this.getSelectedGameRoom.status == 2">
        <h3>Ranking</h3>
        <p>Punkty rankingowe: {{ getplayerData(getUserId).pointsAfterGame }} <span :class="getRankingPointsClass">(<span
              v-if="this.getSelectedGameRoom.whoWon == this.getUserId">+</span>{{ getplayerData(getUserId).pointsAfterGame -
                getplayerData(getUserId).pointsBeforeGame }})</span></p>
        <hr>
      </div>
    </div>
    <div class="action__buttons">
      <BaseButton v-if="this.isStartGameButtonVsible" type="secondary-medium" @click="this.startGame()">Rozpocznij grę
      </BaseButton>
      <BaseButton v-if="this.isJoinRoomButtonVisible" type="secondary-medium" @click="this.joinRoom()">Dołącz
      </BaseButton>
      <BaseButton v-if="this.isCloseButtonVisible" type="primary-medium" @click="this.closeRoom()">Zamknij rozgrywkę
      </BaseButton>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseButton from '../base/BaseButton.vue';
// import CallHub from "@/mixins/callHub";

export default {
  components: {
    BaseButton
  },
  methods: {
    ...mapActions(['closeGameRoom', 'obtainGameRoom']),
    async closeRoom() {
      await this.closeGameRoom(this.getSelectedGameRoom.id);
      this.$router.push({ name: "games" });
    },
    joinRoom() {
      this.$callHub.client.invoke("JoinGameRoom", this.getSelectedGameRoom.id, this.getUserId);
    },
    startGame() {
      this.$callHub.client.invoke("StartGame", this.getSelectedGameRoom.id, this.getUserId);
      // this.obtainGameRoom();
    },
    getplayerData(playerId) {
      const players = this.getSelectedGameRoom.players;
      if (players != undefined) {
        const player = players.find(x => x.playerId == playerId);
        if (player != undefined) {
          return player;
        }
        return {};
      }
      return {};
    }
  },
  computed: {
    ...mapGetters(['getSelectedGameRoom', 'getUserId', 'getPlayerTurn', 'getWinner']),
    ...mapGetters('Checkers', ['getWhitePlayer']),
    isStartGameButtonVsible() {
      if (this.getUserId == this.getSelectedGameRoom.ownerId && this.getSelectedGameRoom.players.length == this.getSelectedGameRoom.requiredNumberOfPlayers && this.getSelectedGameRoom.status == 0)
        return true;
      return false;
    },
    isJoinRoomButtonVisible() {
      if (this.getSelectedGameRoom.players === undefined)
        return false;
      if (this.getSelectedGameRoom.players.find((player) => player.playerId == this.getUserId) === undefined && this.getSelectedGameRoom.players.length < this.getSelectedGameRoom.requiredNumberOfPlayers)
        return true;
      return false;
    },
    isCloseButtonVisible() {
      if (this.getUserId == this.getSelectedGameRoom.ownerId && this.getSelectedGameRoom.status ==0)
        return true;
      return false;
    },
    getRankingPointsClass() {
      if (this.getSelectedGameRoom.whoWon == this.getUserId) {
        return 'ranking-won'
      }
      return 'ranking-lost'
    },
    getCheckersPiece() {
      if(this.getUserId ===this.getWhitePlayer )
        return 'piece-white'
      return 'piece-black'
    }
  }
}
</script>

<style scoped>
.piece-white {
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg style="color: black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" fill="black"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: block;
  width: 30px;
  height:30px;
  border-radius: 50%;
}
.piece-black {
  background-color: black;
  background-image: url('data:image/svg+xml;utf8,<svg style="color: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z" fill="white"></path></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: block;
  width: 30px;
  height:30px;
  border-radius: 50%;
}
.ranking-won {
  color: var(--accent);
}

.ranking-lost {
  color: red;
}

.playerTurn {
  background-color: var(--primaryBtn);
  padding: 10px;
  text-align: center;
}

.panel {
  border: 1px solid var(--primary);
  padding: 15px;
  background-color: var(--secondaryBtn);
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
}

.action__buttons {
  display: flex;
  justify-content: right;
  gap: 15px;
}

.edit {
  display: none;
  cursor: pointer;
}

.panel__title:hover>.edit {
  display: block;
}

.kick {
  display: none;
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  cursor: pointer;
}

.panel__players__box>div:hover>.kick {
  display: block;
}

.panel__players__box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 10px;
}

.panel__players__box>div {
  background-color: var(--primaryBtn);
  padding: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.material-symbols-outlined {
  font-size: 20px;
}

.panel__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding:10px; */
}

hr {
  border: 1px solid var(--accent);
  margin: 10px 0px;
}</style>