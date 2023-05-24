<template>
<base-page-layout>
    <div class="container">
        <div class="content">
            <div class="FriendsContainer">
                <h1 class="mainDescription">Znajomi</h1>
                <div v-if="isLoading">
                    <base-loading-spinner></base-loading-spinner>
                </div>
                <ul v-if="avilabeFriends === true">
                    <table class="friend">
                        <tr><th class="firstCell">Nr</th><th>Imię</th><th>Nazwisko</th><th>Ostatnie logowanie</th><th>Ostatnia gra</th><th class="lastCell">usuń</th></tr>
                        <tr class="friendsList"
                            v-for="(f, index) in currentPage" :key="index">
                            <td class="firstCell">{{ f.id }}</td><td>{{ f.name }}</td><td>{{ f.surname }}</td><td>{{ f.lastLogin }}</td><td>{{ f.lastGame }}</td><td class="lastCell"><base-small-button @click="removeFriend([index])">usuń</base-small-button></td>   
                        </tr>
                        <tr :style="{height: dynamicHeight() + 'px'}"></tr>
                    </table>
                    <div class="buttons">
                        <base-previous-button @click="previousPage" :disabled="pageNr === 1">Poprzednia</base-previous-button>
                        <base-next-button @click="nextPage" :disabled="pageNr === allPages"></base-next-button>
                        <p class="page">{{ pageNr }}</p>
                    </div>
                </ul>
                <h3 v-else-if="avilabeFriends === false">Nie dodano żadnych znajomych.</h3>
            </div>
            <div class="searchFriend">
                <h2>Znajdź przyjaciela</h2>
                <p>Podaj nazwę:</p>
                <form @submit.prevent="searchFriend" class="inputFriend">
                    <base-input type="username" v-model.trim="username"></base-input><p></p>
                    <base-small-button type="green-large" @click="find(username)" @keyup.enter="find(username)">Znajdź</base-small-button>
                </form>
                <div v-if="getFindUser === true" class="findUser">
                    <p> Znaleziono:</p>
                    <table class="friend"><tr><td>{{ getUser.name }} </td><td>{{ getUser.surname }}</td><td>{{ getUser.lastLogin }}</td>
                    <td><base-small-button type="green-large" @click="addFriend()">Dodaj</base-small-button></td></tr></table>
                </div>
                <div v-else-if="getFindUser === false" class="findUser">{{ notFindUser }}</div>
                <div v-else></div>
            </div>
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
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import { mapActions, mapGetters } from 'vuex';
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';

export default {
    props: ['history'],
    components:{
        BaseInput,
        BaseNextButton,
        BasePreviousButton,
        BaseSmallButton,
        BaseNotificationList,
        BasePageLayout,
        BaseLoadingSpinner
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
                    'getCurrentPage', 'getItemsPerPage']),
  },// 'getNotificationTemplates', 
    methods:{
        ...mapActions('Friends', ['nextPage', 'previousPage', 'findFriend', 'addFriend', 'removeFriend']),
        remove(key){
            return this.removeFriend(key); 
        },
        find(username){
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
}
.content{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: flex-start; 
    margin: 30px;
    width: 800px;
    position: absolute; 
    left: 50%; 
    transform: translate(-50%, 0%);
}
.friendsContainer{
    margin-left: 50px;
    color: white;

}
.mainDescription{
    justify-content: center;
    margin-left: 50px;
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
}
tr{
    border: 1px solid black;
    text-align: left;
    border-radius: 8px;
    width: 800px;
}
td{
    padding: 5px;
    background-color: white;
    width: 160px;
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
    margin-left: 50px;
    margin-top: 35px;
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
}
.buttons{
  display: flex;
  flex-direction: row;
}
.spinner{
  justify-content: center;
  align-items: center;
  margin-left: 350px;
}
.page{
    font-size: 22px;
    margin-left: 234px;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
}
</style>
