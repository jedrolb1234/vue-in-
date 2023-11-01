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
        <p v-if="this.getPlayerTurn == this.getUserId" class="playerTurn" style="background-color: var(--accent);">Twój
          ruch!</p>
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
    }
  }
}
</script>

<style scoped>
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