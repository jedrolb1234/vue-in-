<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>Strona użytkownika</BaseHeader>
      <div class="profile">
        <UserProfile :id="id" :isFriend="getIsFriend" :user="getUser"></UserProfile>
        <div class="module__head">
          <h1>Dane użytkownika</h1>
        </div>
        <hr>
        <div class="module__content">
          <div>Imię</div>
          <div>{{ getName }}</div>
          <div>Nazwisko</div>
          <div>{{ getSurname }}</div>
          <div>Data urodzenia</div>
          <div> {{ getBirthDate }}</div>
        </div>
      </div>
        <div v-if="this.getUserId == this.id">
          <h1>Aktywne rozgrywki</h1>
        </div>
        <hr v-if="this.getUserId == this.id">
        <table v-if="this.getUserId == this.id" class="showHistoryTable" style="width: 800px; margin-left: 40px;">
          <thead style="font-weight: bold;">
            <tr>
              <th>Gra</th>
              <th>Przeciwnik</th>
              <th>Data rozpoczęcia</th>
              <th style="width: 50px;">Dołącz</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(room, index) in this.getGamesInProgress" :key="index">
              <td>{{ this.getGame(room.gameTypeId).name }}</td>
              <td>{{ room.players.filter(x => x.playerId != this.getUserId)[0].userName }}</td>
              <td> {{ new Date(room.createDate).toLocaleDateString() }}</td>
              <td style="width: 50px"><span style="cursor: pointer;" class="material-symbols-outlined"
                  @click="this.$router.push({ 'path': `/play/${room.id}` })">play_circle</span></td>
            </tr>
          </tbody>
        </table>
      <h1>Historia gier</h1>
      <hr>
      <div class="showHistoryTable">
        <div v-if="isLoading === false">
          <table>
            <thead>
              <tr class="historyList">
                <th>Gra</th>
                <th>Data</th>
                <th>Zwycięzca</th>
                <th>Punkty</th>
              </tr>
            </thead>
            <tr class="historyList" v-for="( h, index ) in getHistory" :key="index">
              <td>{{ h.gameName }}</td>
              <td>{{ h.endDate }}</td>
              <td>{{ h.whoWon }}</td>
              <td>{{ h.points }}</td>
            </tr>
            <!-- <tr :style="{ height: getDynamicHeight + 'px' }"></tr> -->
          </table>
          <div v-if="getOwnId" class="buttons">
            <base-previous-button :disabled="(getCurrentPage === 1)" @click="previousPage"></base-previous-button>
            <base-next-button :disabled="getHistPage === getCurrentPage" @click="nextPage"></base-next-button>
            <p class="pageNr">{{ getHistPage }}</p>
          </div>
        </div>
      </div>
      <div class="spacer"><br></div>
    </div>
  </BasePageLayout>
</template>
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import UserProfile from '@/components/UserHomePage/UserHomeProfile.vue'
import BaseNextButton from '@/components/base/BaseNextButton.vue'
import BasePreviousButton from '@/components/base/BasePreviousButton.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    UserProfile,
    BaseNextButton,
    BasePreviousButton
  },
  props: ['id', 'invId', 'userAvatar'],
  computed: {
    ...mapGetters('UHP', ['isAvatarPickerVisible', 'getDescription', 'getName', 'getSurname', 'getBirthDate', 'getEmail',
      'isLoading', 'getHasFriend', 'getHistory', 'getCurrentPage', 'getItemsPerPage', 'getUser',
      'getIsFriend', 'getInvId', 'getUserId', 'getDynamicHeight', 'getHistPage', 'getHistPages',
      'getGameName', 'getGameDate', 'getId', 'getGamesInProgress']),
    ...mapGetters(['getUserId', 'getGame']),
    getId() {
      return this.id;
    },
    getInvId() {
      return this.invId;
    },
    getOwnId() {
      return this.id === sessionStorage.getItem('ownerId');
    }
  },
  methods: {
    ...mapActions('UHP', ['getData', 'downloadHistory', 'nextPage', 'previousPage', 'setId', 'obtainGamesInProgress']),
    ...mapActions(['showAvatarPicker', 'hideAvatarPicker']),
  },
  watch: {
    id: function () {
      this.getData(this.id);
      this.obtainGamesInProgress({ status: 1, playerId: this.getUserID })
    },
  },
  async mounted() {
    await this.getData(this.id);
    await this.downloadHistory();
    this.obtainGamesInProgress({ status: 1, playerId: this.getUserID })
  },
}
</script>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-top: 30px; */
  flex-grow: 1;
}

.profile {
  flex-grow: 1;
  margin-bottom: 30px;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
  margin-left: 0px;
}

.hr2 {
  margin-left: -40px;
  width: 900px;
}

.module__head {
  display: flex;
  justify-content: space-between;
}

.module__head__actions {
  align-items: center;
  display: flex;
  gap: 15px;
}

.module__content {
  display: grid;
  width: max(700px, 50%);
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin-top: 15px;
  font-size: 18px;
}

.module:last-child {
  margin-bottom: 30px;
}

.icon {
  font-size: 20px;
}
.showHistoryTable {
  margin-left: 40px;
  color: var(--secondary);
  gap: 15px;
  margin-bottom: 50px;
  width: 800px;
}
.historyHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 22px;
  background-color: var(--secondary);
  width: 800px;
  margin: 0px 0px 20px -40px;
  color: var(--primary);
}

table {
  justify-content: center;
  width: auto;
  color: var(--secondary);
  border-collapse: collapse;
  border-radius: 0px 0px 8px 8px;
  border-spacing: 0px;
  background-color: var(--secondary);
}

tr {
  border: 1px solid var(--primary);
  text-align: left;
  border-radius: 8px;
  width: 800px;
}

tr:first-child {
  width: 60px;
}

tr:last-child {
  width: 100px;
}

th {
  width: 160px;
  height: 51px;
  color: var(--primary);
  text-align: center;
  padding: var(--td-padding-top-bottom) var(--td-padding-left-right);
 }

td{
  padding: var(--td-padding-top-bottom) var(--td-padding-left-right); /* odstępy */
  /* background-color: var(--secondary); */
  width: 200px;
  font-size: 18px;
  color: var(--primary);
  margin: 0px 0px 0px 0px;
  text-align: center;
}

th{
  background-color: var(--accent);
  color: var(--table-header-color)
}
tr:nth-child(even){
  background-color: var(--primaryBtn);
}
.historyList{
font-size: 24;
color: var(--secondary);
}

.buttons {
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
  color: var(--primary);
}

.pageNr {
  width: 13px;
  font-size: 22px;
  margin-left: 234px;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
  padding: 0px;
}

.spacer {
  height: 50px;
  margin-top: 50px;
}

</style>
  
