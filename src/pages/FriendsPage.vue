<template>
    <base-page-layout>
        <div class="container">
            <div class="FriendsContainer">
                <BaseHeader>Znajomi ( {{ getFriends.length }} )</BaseHeader>
                <h2 class="friendsHeader">Twoi przyjaciele</h2>
                <hr>
                <div v-if="isLoading" class="firstBlock">
                    <base-loading-spinner></base-loading-spinner>
                </div>
                <ul v-if="avilabeFriends === true" class="firstBlock">
                    <table class="friend">
                        <tr><th class="tableButton">Podgląd</th><th>Imię</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th class="tableButton"></th></tr>
                        <tr class="friendsList"
                            v-for="(f, index) in currentPage" :key="index">
                            <td class="tableButton"><base-look-button @click="redirect(f.id)"></base-look-button></td><td>{{ f.name }}</td><td>{{ f.lastLogin }}</td><td>{{ f.lastGame }}</td><td class="tableButton"><base-remove-button @click="removeFriend([index])"></base-remove-button></td>   
                        </tr>
                        <tr :style="{height: dynamicHeight() + 'px'}"></tr>
                    </table>
                    <div class="buttons">
                        <base-previous-button @click="previousPage"></base-previous-button>
                        <base-next-button @click="nextPage"></base-next-button>
                        <p class="page">{{ pageNr }}</p>
                    </div>
                </ul>
                <h3 v-else-if="avilabeFriends === false">Nie dodano żadnych znajomych.</h3>
            </div>
            <div class="invitations">
                <h2>Twoje zaproszenia:</h2>
                <hr>
                <transition name="avInvs">
                    <ul v-if="getAvilabeInvitations !== 0">
                        <table class="inv">
                            <transition-group name="fade" tag="table" class="invContainer">
                                <tr><th class="tableButton">Podgląd</th><th>Nick</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th class="tableButton"></th></tr>
                                
                                    <tr class="invitationsList"
                                        v-for="(i, index) in getInvitations" :key="index">
                                        <td class="tableButton"><base-look-button @click="redirect(i.id)"></base-look-button></td><td>{{ i.name }}</td><td>{{ i.lastLogin }}</td><td>{{ i.lastGame }}</td><td class="tableButton"><base-remove-button @click="removeFriendInvitation(index)"></base-remove-button></td>   
                                    </tr>
                            </transition-group>
                        </table>
                    </ul> 
                </transition>
                <ul v-if="getAvilabeInvitations === 0"><p>Nie otrzymano zaproszeń od znajomych.</p></ul>
            </div>
            <div class="searchFriend">
                <h2>Znajdź przyjaciela</h2>
                <hr>
                <p>Podaj nazwę:</p>
                <form @submit.prevent="searchFriend" class="inputFriend">
                    <base-input type="username" v-model.trim="username"></base-input><p></p>
                    <base-small-button type="green-large" @click="find(username)" @keyup.enter="find(username)">Znajdź</base-small-button>
                </form>
                <transition name="slideON">
                    <div v-if="getFindUser === true" class="findUser">
                        <p>Znaleziono:</p>
                        <table class="findFriend">
                            <tr><td class="tableButton"><base-look-button @click="redirect(getUser.id)"></base-look-button></td><td>{{ getUser.name }}</td><td>{{ getUser.lastLogin }}</td><td>{{ getUser.lastGame}}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-else-if="getFindUser === false" class="findUser">{{ notFindUser }}</div>
                    <div v-else></div>
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
        BaseHeader
    },
    data(){
        return {
            username: '',
            notFindUser: 'Nie znaleziono użytkownika o podnym imieniu.',
        }
    },
    computed: {
        ...mapGetters('Friends',['isLoading','currentPage', 'pageNr', 'allPages', 'getUser', 
                    'getFriends', 'getFindUser', 'getFindFriend', 'avilabeFriends', 
                    'getCurrentPage', 'getItemsPerPage', 'getAvilabeInvitations',
                    'getInvitations']),
        ...mapGetters(['getNotificationTemplates']),
        redirect(){
        return null
        //return this.$route.path + '/' + id + '/'; 
      }  
  },// 'getNotificationTemplates', 
    methods:{
        ...mapActions('Friends', ['nextPage', 'previousPage', 'findFriend', 'addFriend', 
        'removeFriend', 'removeFriendInvitation']),
        ...mapActions(['showNotification']),
        remove(key){
            return this.removeFriend(key); 
        },
        find(username){
            if (username.length === 0){
                this.showNotification(this.getNotificationTemplates.user_name_to_short);
            }else
            return this.findFriend(username);
        },
        dynamicHeight(){
            let startIndex = (this.getCurrentPage - 1) * this.getItemsPerPage;
            let endIndex = startIndex + this.getItemsPerPage;
            let sliced = this.getFriends.slice(startIndex, endIndex);   
            console.log(sliced, 'PPPPPP')
            return (10 - sliced.length ) * 38;
        }
//'showNotification',
    },
    mutations:{
        ...mapGetters('Friends', ['loading', 'setUserName'])
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
    min-height: 1200px;
}

hr {
  width: 800px;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
}

.friendsContainer{
    margin-left: 50px;
    color: white;
}
h1, h2{
    color: black;
    align-items: flex-start;
    width: 800px;
}
.friendsHeader
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: white;
  width: 800px;
  height: 40px;
  margin: 40px 0px 0px 40px;
  border-radius: 8px 8px 0px 0px;
  color: black;
}
table{
    justify-content: center; 
    width: auto;
    color:black;
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    padding: 0px;
    border-spacing: 0px;
    background-color: white;
    padding-left: 40px;
}
tr{
    border: 1px solid black;
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
    background-color: white;
    width: 160px;
    height: 38px;
    font-size: 18px;
    color:black;
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
    color: white;
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
    color: black;
    margin-top:0px;
    margin-right: 40px;
}
p{
    font-size: 22px;
    color: black;
}
.buttons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
}
.spinner{
  justify-content: center;
  align-items: center;
  margin-left: 350px;
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
    margin-left: -45px;
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
