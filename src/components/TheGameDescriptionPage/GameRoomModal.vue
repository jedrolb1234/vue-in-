<template>
  <BaseModal :hideFunction="this.hideModal">
    <div class="game-room-modal">
      <div class="header">
        <h1>Wybierz pokój gry</h1>
        <div>1550 graczy online</div>
      </div>
      <div class="action-bar">
        <BaseButton type="primary-medium" @click="this.createNewGameRoom({ gameTypeId: 0, roomName: 'abcdef' })">Stwórz
          nowy
          pokój</BaseButton>
        <BaseSearchInput :searchFunction="this.searchGameRooms" fontSize="16px"></BaseSearchInput>
      </div>
      <table class="game-room-list">
        <thead>
          <tr class="game-room-list-element">
            <td>Nazwa</td>
            <td>Właściciel</td>
            <td>Gracze</td>
            <td>Wymagana liczba graczy</td>
            <td>Prywatny</td>
            <td>Akcja</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in this.rooms.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)"
            class="game-room-list-element" :key="room.id">
            <td>{{ room.name }}</td>
            <td>{{ room.owner }}</td>
            <td>
              <p v-for="(player, index) in room.players" :key="index">{{ player }}</p>
            </td>
            <td>{{ room.rquiredNumberOfPlayers }}</td>
            <td>{{ room.isPrivate }}</td>
            <!-- <td><span class="material-symbols-outlined">slideshow</span></td> -->
            <td><span class="material-symbols-outlined">play_circle</span></td>
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

export default {
  components: { BaseModal, BaseButton, BaseSearchInput, BasePagination },
  props:['gameId'],
  data() {
    return {
      selectedPage: 1,
      pageSize: 10,
      rooms: []
    }
  },
  computed: {
    ...mapGetters(['getGameRooms']),
  },
  methods: {
    ...mapActions(['createNewGameRoom', 'obtainGameRooms']),
    hideModal() {
      this.$emit('close-modal');
    },
    searchGameRooms(query) {
      this.rooms = this.getGameRooms.filter(room => room.name.includes(query));
      this.selectedPage = 1;
    }
  },
  created() {
    this.rooms = this.getGameRooms
    this.obtainGameRooms()
  }
}
</script>

<style scoped>
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

.game-room-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

table {
  height: 100%;
  background-color: var(--secondaryBtn);
  padding: 10px;
  border: 1px solid var(--primary);
}

tbody {
  height: 100%;
  overflow: overlay;
  z-index:999;
}

thead {
  font-weight: bold;

}

.game-room-list-elements {
  display: flex;
  flex-direction: column;
  /* max-height: 500px; */
  overflow-y: scroll;
}

.game-room-list-element {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--primary);
  font-size: 16px;
  /* min-height: 0; */
  column-gap: 15px;
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
}</style>