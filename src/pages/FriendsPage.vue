<template>
    <base-page-layout>
        <div class="container">           
            <BaseHeader>Znajomi ( {{ getFriends.length }} )</BaseHeader>
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
                        <tr><th class="tableButton">Podgląd</th><th>Imię</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th class="tableButton"></th></tr>
                        <tbody>
                            <tr class="friendsList"
                                v-for="(f, index) in currentPage" :key="index">
                                <td class="tableButton"><base-look-button @click="redirect(f.id, 'null')"></base-look-button></td><td>{{ f.name }}</td><td>{{ f.lastLogin }}</td><td>{{ f.lastGame }}</td><td class="tableButton"><base-remove-button @click="removeFriend(f.userId)"></base-remove-button></td>   
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
            <base-delete-message :id="id" v-if="visibleMessage === true" @visibleMessage="isVisibleMessage"> Czy na pewno chcesz usunąć <br> użytkownika {{ getFriends[id].name }} ? </base-delete-message>
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
                                        <td class="tableButton"><base-look-button @click="redirect(i.userId, i.id)"></base-look-button></td><td>{{ i.name }}</td><td>{{ i.lastLogin }}</td><td>{{ i.lastGame }}</td><td class="tableButton"><base-remove-button @click="removeFriendInvitation(i.id)"></base-remove-button></td>   
                                    </tr>
                            </transition-group>
                        </table>
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
                            <tr><td class="tableButton"><base-look-button @click="redirect(getUser.id, 'null')"></base-look-button></td><td>{{ getUser.userName }}</td><td>{{ "20023-010-01" }}</td><td>{{ "Warcaby" }}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-else-if="this.getFindUser === false" class="findUser">{{ notFindUser }}</div>
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
            notFindUser: 'Nie znaleziono użytkownika o podnym imieniu.',
            visibleMessage: false,
            rowHeight: 38,
            findUser: null,
        }
    },
    mounted() {
        this.downloadFriends();
        this.downloadInvitations();
        console.log(this.getFindUser)
        },
        
    computed: {
        ...mapGetters('Friends',['getIsLoading','currentPage', 'pageNr', 'allPages', 'getUser', 
                    'getFriends', 'getFindFriend', 'getFindUser', 'getCurrentPage', 'getDynamicHeight', 
                    'getItemsPerPage', 'getAvilabeInvitations', 'getInvitations']),
    },
    methods:{
        ...mapActions('Friends', ['nextPage', 'previousPage', 'find', 'addFriend', 
                    'removeFI', 'downloadFriends', 'downloadInvitations', 'removeFriend', 'removeFriendInvitation',
                    'redirect']),
        ...mapActions(['showNotification']),
//sprawdzic jaka strukture ma invitations id
        redirect(id, invId){
            if (invId !== 'null'){
                return this.$router.push({
                    name: 'uhp',
                    params: { id: id, isFriend: false, invId: invId },
                    }); 
            }
            console.log(id,'blblbl')
            for(let i = 0; i < this.getFriends.length; i++){
                if (id === this.getFriends[i].id){
                    return this.$router.push({
                        name: 'uhp',
                        params: { id: id, isFriend: true , invId: 'null'},
                        });
                }
            const inv = this.getInvitations;
            const user = this.getUser;          
            for(let i = 0; i< inv.length; i++){
                if (inv[i].userId === user.id)
                console.log(inv[i].userId)
                return this.$router.push({
                    name: 'uhp',
                    params: { id: id, isFriend: false, invId: inv[i].userId },
                    }); 
                }                    
            } return this.$router.push({
                name: 'uhp',
                params: { id: id, isFriend: false, invId: 'null' },
                }); 
        },
        isVisibleMessage(){
            this.visibleMessage = this.isVisibleMessage;
        }
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
tr:first-child{
    width:60px;
}
tr:last-child{
    width:100px;
}
th{
    width: 160px;
    height:51px;
}
td{
    padding: 1.2px;
    background-color: var(--secondary);
    width: 160px;
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
.buttons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
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
</style>
