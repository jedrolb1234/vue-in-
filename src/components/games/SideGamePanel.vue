<template>
  <div class="panel">
    <div class="content">
      <div class="panel__title">
        <p>{{ this.getSelectedGameRoom.roomName }}</p>
        <span class="material-symbols-outlined edit">
          edit
        </span>
      </div>
      <hr>
      <div class="panel__players">
        {{ this.getSelectedGameRoom }}
        <p>Gracze</p>
        <div class="panel__players__box">
          <div v-for="player in this.getSelectedGameRoom.players" :key="player.playerId" :class="{playerTurn: this.getPlayerTurn== player.playerId}">
            <span>{{ player.userName }}</span>
            <!-- <span class="material-symbols-outlined kick">
              close
            </span> -->
          </div>
        </div>
      </div>
      <hr>
      <div v-if="this.getSelectedGameRoom.status==2">
        <p>{{ getWinner }} wygrał!</p>
      </div>
      <!-- <ul>
        <li>Przebieg gry</li>
        <li>Zaproś znajomych</li>
        <li>Ustawienia</li>
      </ul> -->
    </div>
    <div class="action__buttons">
      <BaseButton v-if="this.isStartGameButtonVsible" type="secondary-medium" @click="this.startGame()">Rozpocznij grę
      </BaseButton>
      <BaseButton v-if="this.isJoinRoomButtonVisible" type="secondary-medium" @click="this.joinRoom()">Dołącz</BaseButton>
      <BaseButton v-if="this.isCloseButtonVisible" type="primary-medium" @click="this.closeRoom()">Zamknij pokój</BaseButton>
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
      // console.log(this.getSelectedGameRoom.players);
      // console.log(this.getUserId);
      // const that = this;
      if(this.getSelectedGameRoom.players===undefined)
        return false;
      if (this.getSelectedGameRoom.players.find((player) => player.playerId == this.getUserId) === undefined && this.getSelectedGameRoom.players.length < this.getSelectedGameRoom.requiredNumberOfPlayers)
        return true;
      return false;
    },
    isCloseButtonVisible() {
      if (this.getUserId == this.getSelectedGameRoom.ownerId && this.getSelectedGameRoom.status != 2)
        return true;
      return false;
    }
  }
}
</script>

<style scoped>
.playerTurn {
  border: solid var(--accent) 5px;
}
.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.action__buttons {
  display: flex;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-content: center;
  gap: 10px;
}

.panel__players__box>div {
  background-color: var(--primaryBtn);
  padding: 10px;
  text-align: center;
  position: relative;
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
}

.panel {
  border: 1px solid var(--primary);
  padding: 10px;
  background-color: var(--secondaryBtn);
}
</style>