<template>
    <BasePageLayout>
        <div class="page">
            <BaseHeader>Strona użytkownika</BaseHeader>
            <div class="profile">
                <UserProfile :id="id" :invId="getInvId" :isFriend="getIsFriend" :user="getUser"></UserProfile>
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
            <h1>Historia gier</h1>
            <hr>                    
            <div class="showHistoryTable">
                <h2 class="historyHeader">Rozegrane gry</h2>
                <hr class="hr2">
                <div v-if="isLoading===false">
                    <table>
                    <tr class="historyList"><th>gra</th><th>data</th><th>status</th><th>Punkty</th></tr>
                    
                    <tr class="historyList"
                        v-for="( h, index ) in currentPage" :key="index">
                        <td>{{ h.game }}</td><td>{{ h.date }}</td><td>{{ h.status }}</td><td>{{ h.points }}</td>    
                    </tr>
                    <tr :style="{height: dynamicHeight() + 'px'}"></tr>
                    </table>
                    <div v-if="getOwnId" class="buttons">
                      <base-previous-button @click="previousPage"></base-previous-button>
                      <base-next-button @click="nextPage"></base-next-button>
                      <p class="pageNr">{{ pageNr }}</p>
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
    props:['id', 'invId', 'userAvatar'],
    
    data() {
      return {
        username: null,
        description: null,
        avatarId: null,
        name: '',
        surname: '',
        birthDate: null,
        email: '',
      }
    },
    mounted(){
      this.getData(this.id);
    },
    computed: {
      ...mapGetters('UHP', ['isAvatarPickerVisible', 'getDescription', 'getName', 'getSurname', 'getBirthDate', 'getEmail',
                            'isLoading', 'currentPage', 'allPages', 'pageNr', 'getHasFriend', 'getHistory', 'getCurrentPage',
                             'getItemsPerPage', 'getUser', 'getIsFriend', 'getInvId']),
      // getIsFriend(){
      //   return this.isFriend;
      // },
      getId(){
        return this.id;
      },
      getInvId(){
        return this.invId;
      },
      getOwnId(){
        return this.id === JSON.parse(localStorage.getItem('user_id'));
      }
    },
    methods: {
      ...mapActions('UHP', ['setArgs', 'getData']),
      ...mapActions(['showAvatarPicker', 'hideAvatarPicker', 'nextPage', 'previousPage','isFriend']),
      dynamicHeight(){
            let startIndex = (this.getCurrentPage - 1) * this.getItemsPerPage;
            let endIndex = startIndex + this.getItemsPerPage;
            let sliced = this.getHistory.slice(startIndex, endIndex);           
            return (10 - sliced.length ) * 38;
        },
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
  .hr2{
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
  .showHistoryTable{
    margin-left: 40px;
    color: var(--secondary);
    gap:15px;
    margin-bottom: 50px;
}
.historyHeader
{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 22px;
  background-color: var(--secondary);
  width: 800px;
  margin: 0px 0px 20px -40px;
  color: var(--primary);
}
table{
    justify-content: center; 
    width: auto;
    color: var(--secondary);
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    border-spacing: 0px;
    background-color: var(--secondary);
}
tr{
    border: 1px solid var(--primary);
    text-align: left;
    border-radius: 8px;
    width: 800px;
}
tr:first-child{
    width:60px;
}
tr:last-child{
    width:100px;
}
th{
    width: 160px;
    height: 51px;
    color: var(--primary);
    text-align: center;
}
/* table:last-child{
    border-radius: 0px 0px 8px 8px;
} */
td{
    padding: 5px;
    background-color: var(--secondary);
    width: 200px;
    font-size: 18px;
    color:var(--primary);
    margin: 0px 0px 0px 0px;
    text-align: center;
}
.historyList{
  font-size: 24;
  color: var(--secondary);
}
.buttons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
  color: var(--primary);
}
.spinner{
  justify-content: center;
  align-items: center;
  margin-left: 350px;
}
.pageNr{
    width: 13px;
    font-size: 22px;
    margin-left: 234px;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
}
.spacer{
  height:50px;
  margin-top: 50px;
}
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }</style>
    