<template>
    <base-page-layout>
        <div class="container">           
            <BaseHeader>Znajomi ( {{ getFriendsCount }} )</BaseHeader>
            <div class="FriendsContainer">
                <h2 class="friendsHeader">Twoi przyjaciele</h2>
                <hr class="hr1">
                <div v-if="getIsLoading === true">
                    <table class="spinnerTable">
                        <tr :style="{height: getDynamicHeight +38 + 'px'}" colspan="1"><base-loading-spinner class="spinnerTr"></base-loading-spinner></tr>
                    </table>
                </div>
                <ul v-if="(getIsLoading === false) && (getFriends.length !== 0)">
                    <table class="friend">
                        <tr><th>Podgląd</th><th>Nick</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th></th></tr>
                        <tbody>
                            <tr class="friendsList"
                                v-for="(f, index) in getFriends" :key="index">
                                <td class="tableButton"><base-look-button @click="redirect(f.userId, 'null')"></base-look-button></td><td>{{ f.userName }}</td><td>{{ f.lastActivityDate }}</td><td>{{ f.lastGame }}</td><td class="tableButton"><base-remove-button @click="showRemovePopup(f)"></base-remove-button></td>   
                            </tr>
                            <tr :style="{height: getDynamicHeight + 'px'}"></tr>
                        </tbody>
                    </table>
                    <div class="buttons">
                        <base-previous-button @click="previousPage"></base-previous-button>
                        <base-next-button @click="nextPage"></base-next-button>
                        <p class="page">{{ pageNr }}</p>
                    </div>
                </ul>
                <p v-else-if="getFriends.length === 0">Nie dodano żadnych znajomych.</p>
            </div>
            <Transition name="v">
                <base-delete-message :id="getId" v-if="getIsVisibleMessage === true" @visibleMessage="hideRemovePopup"> Czy na pewno chcesz usunąć <br> użytkownika {{ getRemUser }} ? </base-delete-message>
            </Transition>
            <div class="invitations">
                <h2 class="invMargin">Twoje zaproszenia:</h2>
                <hr class="hr2">
                <transition name="avInvs">
                    <ul v-if="getAvilabeInvitations !== 0">
                        <table class="inv">
                            <transition-group name="fade" tag="table" class="invContainer">
                                <tr><th class="tableButton">Podgląd</th><th>Nick</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th class="tableButton"></th></tr>
                                
                                    <tr class="invitationsList"
                                        v-for="(i, index) in getInvitations" :key="index">
                                        <td class="tableButton"><base-look-button @click="redirect(i.userId, i.id)"></base-look-button></td><td>{{ i.userName }}</td><td>{{ i.lastActivityDate }}</td><td>{{ i.lastGame }}</td><td class="tableButton"><base-remove-button @click="removeFriendInvitation(i.id)"></base-remove-button></td>   
                                    </tr>
                            </transition-group>
                        </table>
                        <transition-group name="fade" tag="table" class="invContainer">
                            <div class="invButtons" v-if="getInvPages > 1">
                                <base-previous-button @click="invPreviousPage"></base-previous-button>
                                <base-next-button @click="invNextPage"></base-next-button>
                                <p class="page">{{ invPageNr }}</p>
                            </div>
                        </transition-group>
                    </ul> 
                </transition>
                <ul v-if="getAvilabeInvitations === 0"><p>Nie otrzymano zaproszeń od znajomych.</p></ul>
            </div>
            <div class="searchFriend">
                <h2>Znajdź przyjaciela</h2>
                <hr class="hr3">
                <p>Podaj nazwę:</p>
                <form @submit.prevent="searchFriend" class="inputFriend">
                    <base-input type="username" v-model.trim="username"></base-input><p></p>
                    <base-small-button type="green-large" @click="find(username)" @keyup.enter="find(username)">Znajdź</base-small-button>
                </form>
                <transition name="slideON">
                    <div v-if="this.getFindUser === true" class="findUser">
                        <p>Znaleziono:</p>
                        <table class="findFriend">
                            <tr><td class="tableButton"><base-look-button @click="redirect(getUser.id, 'null')"></base-look-button></td><td>{{ getUser.userName }}</td><td>{{ getUser.dateOfBirth }}</td><td>{{ "Warcaby" }}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-else-if="this.getFindUser === false" class="findUser">Nie znaleziono użytkownika o podnym imieniu.</div>
                </transition>
            </div>
        </div>
    <base-notification-list></base-notification-list>
    </base-page-layout>
</template>
<script>
import BaseInput from '@/components/base/BaseInput.vue';
import BaseNextButton from '@/components/base/BaseNextButton.vue'
import BasePreviousButton from '@/components/base/BasePreviousButton.vue'
import BaseSmallButton from '@/components/base/BaseSmallButton.vue'
import BaseRemoveButton from '@/components/base/BaseRemoveButton.vue'
import BaseLookButton from '@/components/base/BaseLookButton.vue'
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import { mapActions, mapGetters } from 'vuex';
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseDeleteMessage from'@/components/base/BaseDeleteMessage.vue'

export default {
    props: ['history'],
    components:{
        BaseInput,
        BaseNextButton,
        BasePreviousButton,
        BaseLookButton,
        BaseRemoveButton,
        BaseSmallButton,
        BaseNotificationList,
        BasePageLayout,
        BaseLoadingSpinner,
        BaseHeader,
        BaseDeleteMessage
    },
    data(){
        return {
            username: '',
            findUser: null,
        }
    },
    mounted() {
        this.downloadFriends();
        this.downloadInvitations();
        },
        
    computed: {
        ...mapGetters('Friends',['getIsLoading','currentPage', 'pageNr', 'allPages', 'getUser', 
                    'getFriends', 'getFindFriend', 'getFindUser', 'getDynamicHeight', 
                    'getItemsPerPage', 'getAvilabeInvitations', 'getInvitations', 'getId',
                    'invPageNr', 'invAllPages', 'getIsVisibleMessage', 'getInvPages',
                    'getFriendsCount', 'getRemUser']),
    },

    methods:{
        ...mapActions('Friends', ['nextPage', 'previousPage', 'find', 'addFriend', 
                    'removeFI', 'downloadFriends', 'downloadInvitations', 'removeFriendInvitation',
                    'redirect','invNextPage', 'invPreviousPage', 'showRemovePopup', 'hideRemovePopup']),
        ...mapActions(['showNotification']),

//sprawdzic jaka strukture ma invitations id
        redirect(id, invId){
            console.log('uhp')
            if (invId !== 'null'){
                return this.$router.push({
                    name: 'uhp',
                    params: { id: id, invId: invId },
                    }); 
            }
            for(let i = 0; i < this.getFriends.length; i++){
                if (id === this.getFriends[i].userId){
                    return this.$router.push({
                        name: 'uhp',
                        params: { id: id, invId: 'null'},
                        });
                }
            const inv = this.getInvitations;
            const user = this.getUser;          
            for(let i = 0; i< inv.length; i++){
                if (inv[i].userId === user.id){
                console.log(inv[i].userId)
                return this.$router.push({
                    name: 'uhp',
                    params: { id: id, invId: inv[i].userId },
                    }); 
                }}          
            } return this.$router.push({
                name: 'uhp',
                params: { id: id, invId: 'null' },
                }); 
        },
    },
    mutations:{
        ...mapGetters('Friends', ['setUserName'])
    }
}
</script>
<style scoped>
.container{
    display: flex;    
    flex-direction: column;    
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 80px;
    min-height: 1350px;
    width: 100%;
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
}
.friendsContainer{
    margin-left: 50px;
    color: var(--secondary);
}
.hr1{
    margin-left: -30px;
    width: 900px;
    margin-right: -30px;
}
.hr2{
    margin-left: 20px;
    /* margin-right: -140px; */
    width: 900px;
}
.hr3{
    margin-left: -50px;
    width: 900px;
}
h1, h2{
    color: var(--primary);
    align-items: flex-start;
    width: 800px;
}
.friendsHeader
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color:var(--secondary);
  width: 800px;
  height: 40px;
  margin: 40px 0px 0px 40px;
  border-radius: 8px 8px 0px 0px;
  color: var(--primary);
}
table{
    justify-content: center; 
    width: auto;
    border-collapse: collapse;
    color: var(--primary);
    border: 1px solid var(--primary);
    border-spacing: 0px;
    padding: 0px;
    background-color: var(--secondary);
    padding-left: 40px;
}
tr{
    border: 1px solid var(--primary);
    text-align: left;
    border-radius: 8px;
    width: 800px;
}

th{
    width: 160px;
    height:51px;
}
.table.button,
th:first-child,
th:last-child{
    margin-left:0px;
    padding-left:5px;
    width:60px !important;
}
th:nth-child(2):nth-child(4),
td:nth-child(2):nth-child(4){
    margin-left:0px;
    padding-left:10px;
    width:calc((100% - 4 * 10px) / 3);
}
td{
    padding: 1.2px;
    background-color: var(--secondary);
    height: 38px;
    font-size: 18px;
    color: var(--primary);
    margin: 0px 0px 0px 0px;
}
.firstCell{
    width: 60px;
}
.lastCell{
    width: 100px;
}
.frinedId{
    width: 100px;
    justify-content: center;
}
.searchFriend{
    color: var(--secondary);
    width: 800px;
    margin-left:0px;
    margin-top: 0px;
}
.findFriend{
    width: 600px;
}
.inputFriend{
    width: 400px;
    margin-top: 10px;
}
.child-inputFriend{
    margin: 10px;
}
.friend{
    width: 800px;
    color: var(--primary);
    margin-top:0px;
    margin-right: 40px;
}
p{
    font-size: 22px;
    color: var(--primary);
}
.buttons, .invButtons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
}
.invButtons{
    margin-left:30px;
}
.invContainer{
  border: none;
}
.spinnerTable{
    width: 800px;
    margin-left: 20px;
}
.spinnerTr{
    margin-left: 350px;
    margin-top:150px;
}
.page{
    width: 13px;
    font-size: 22px;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
}
.tableButton{
    width: 75px;
    padding-left: 15px;
}
.inv{
    width: 600px;
    justify-content: center;
    align-items: center;
    margin-left: 35px;
}
.invMargin{
    margin-left: 80px;
}
.invitations{
    margin-left: -20px;
}
.findUser{
    color: var(--primary);
}
.slideON-enter-active,
.slideON-leave-active {
    transition: transform 300ms ease, max-height 300ms ease;
    transform-origin: top;
    max-height: 419px;
}
.slideON-enter-from,
.slideON-leave-to {
    transform: scaleY(0);
    max-height: 0px;
}
.divSlideON {
  transform-origin: top;
  animation-name: transition; /* Zmiana nazwy animacji na "slideON" */
  animation-duration: 300ms;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avInvs-enter-active,
.avInvs-leave-active {
  transition: opacity 0.3s ease-out;
}

.avInvs-enter,
.avInvs-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  animation: modal;
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  animation:modal;
  opacity: 0;
}
  @keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
