<template>
  <BaseModal :hideFunction="this.hideModal">
    <div class="game-room-modal">
      <div class="header">
        <h1>Wybierz pokój gry</h1>
        <div>1550 graczy online</div>
      </div>
      <div class="action-bar">
        <div class="buttons">
          <BaseButton type="primary-medium"
            @click="this.createNewGameRoom({ gameTypeId: gameId, roomName: `Pokój gracza ${this.getUsername}` })">Stwórz
            nowy
            pokój</BaseButton>
          <BaseButton type="secondary-medium" @click="this.refreshGameRooms()">Odśwież</BaseButton>
        </div>
        <BaseSearchInput :searchFunction="this.searchGameRooms" fontSize="16px"></BaseSearchInput>
      </div>
      <table class="game-room-list">
        <thead>
          <tr class="game-room-list-element table-header">
            <td>Nazwa</td>
            <!-- <td>Właściciel</td> -->
            <td>Gracze</td>
            <td>Wymagana liczba graczy</td>
            <!-- <td>Prywatny</td> -->
            <td>Akcja</td>
          </tr>
        </thead>
        <BaseLoadingSpinner v-if="this.isLoading"></BaseLoadingSpinner>
        <tbody>
          <p v-if="this.rooms.length == 0" style="text-align: center; padding: 10px;">Stwórz nowy pokój, żeby rozpocząć rozgrywkę!</p>
          <tr v-for="room in this.rooms.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)"
            class="game-room-list-element" :key="room.id">
            <td>{{ room.name }}</td>
            <!-- <td>{{ room.owner }}</td> -->
            <td>
              <p v-for="(player, index) in room.players" :key="index">{{ player }}</p>
            </td>
            <td>{{ room.players.length }}/{{ room.rquiredNumberOfPlayers }}</td>
            <!-- <td>{{ room.isPrivate }}</td> -->
            <td><span class="material-symbols-outlined"
                @click="this.$router.push({ 'path': `/play/${room.id}` })">play_circle</span></td>
          </tr>
        </tbody>
        <tfoot>
          <BasePagination v-model:selectedPage="this.selectedPage" v-model:pageSize="this.pageSize"
            :numberOfPages="Math.ceil(this.rooms.length / this.pageSize)"></BasePagination>

        </tfoot>
      </table>
      <div class="bottom-action-bar">
        <BaseButton type="primary-medium" @click="this.hideModal()">Zamknij</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseModal from '../base/BaseModal.vue';
import { mapActions, mapGetters } from 'vuex';
import BaseSearchInput from '../base/BaseSearchInput.vue';
import BasePagination from '../base/BasePagination.vue';
import BaseLoadingSpinner from '../base/BaseLoadingSpinner.vue';

export default {
  components: { BaseModal, BaseButton, BaseSearchInput, BasePagination, BaseLoadingSpinner },
  props: ['gameId'],
  data() {
    return {
      selectedPage: 1,
      pageSize: 10,
      isLoading: false,
      rooms: []
    }
  },
  computed: {
    ...mapGetters(['getGameRooms', 'getUsername']),
  },
  methods: {
    ...mapActions(['createNewGameRoom', 'obtainGameRooms']),
    hideModal() {
      this.$emit('close-modal');
    },
    searchGameRooms(query) {
      this.rooms = this.getGameRooms.filter(room => room.name.includes(query));
      this.selectedPage = 1;
    },
    async refreshGameRooms() {
      this.rooms = [];
      this.isLoading = true;
      await this.obtainGameRooms(this.gameId);
      this.isLoading = false;
      this.rooms = this.getGameRooms;
    }
  },
  async created() {
    this.refreshGameRooms()
  }
}
</script>

<style scoped>
span {
  cursor: pointer;
}

.game-room-modal {
  display: flex;
  height: auto;
  min-width: 700px;
  max-height: 80vh;
  gap: 30px;
  overflow: hidden;
  flex-direction: column;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}

.action-bar>.buttons {
  display: flex;
  gap: 15px;
}

.game-room-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

table {
  height: 100%;
  background-color: var(--secondaryBtn);
  padding: 0px;
  border: 1px solid var(--primary);
}

table>div {
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

tbody {
  height: 100%;
  overflow: overlay;
  width: 100% - 100px;
  transition: width 0.3s;
}

thead {
  font-weight: bold;
  border: 1px solid var(--primary);
}

tfoot {
  border-top: 1px solid var(--primary);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

tr {
  border-bottom: 1px solid var(--primary);
  /* border-left:0px;
  border-right: 0px; */
}

tbody tr:last-child {
  border: 0px;
}

/* .table-header {
  background-color: var(--accent);
  padding:10px
} */

.game-room-list-elements {
  display: flex;
  flex-direction: column;
  /* max-height: 500px; */
  overflow-y: scroll;
}

.game-room-list-element {
  text-align: center;
  display: grid;
  grid-template-columns: 3fr 3fr 2fr 1fr;
  align-items: center;
  font-size: 16px;
  column-gap: 15px;
  height: 65px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-room-list-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
  column-gap: 15px;
}

p {
  margin: 0px;
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
}

.bottom-action-bar {
  display: flex;
  justify-content: flex-end;
}
</style>