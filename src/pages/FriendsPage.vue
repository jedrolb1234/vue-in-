<template>
    <div class="container">
        <div class="leftPanel">
            <left-panel></left-panel>
        </div>
        <div class="content">
            <div class="FriendsContainer">
                <h1 class="mainDescription">Znajomi</h1>
                <div v-if="isLoading">
                    <div></div>
                </div>
                <ul v-else-if="hasFriends">
                    <table class="friend">
                        <tr><td class="friendId">Nr</td><td>Imię</td><td>Nazwisko</td><td>Ostatnie logowanie</td><td>Ostatnia gra</td></tr>
                        <tr class="friendsList"
                            v-for="(friend, index) in friends" :key="index">
                            <td class="friendId">{{ index }}</td><td>{{ friend.name }}</td><td>{{ friend.surname }}</td><td>{{ friend.lastLogin }}</td><td>{{ friend.lastGame }}</td>    
                        </tr>
                    </table>
                </ul>
                <h3 v-else>Nie dodano żadnych znajomych.</h3>
            </div>
            <div class="searchFriend">
                <h2>Znajdź przyjaciela</h2>
                <p>Podaj nazwę:</p>
                <form @submit.prevent="searchFriend" class="inputFriend">
                    <base-input type="username" v-model.trim="username"></base-input><p></p>
                    <base-small-button type="green-large" @click="findFriend(username)" @keyup.enter="findFriend(username)">Znajdź</base-small-button>
                </form>
                <div v-if="findUser === true" class="findUser">
                    <p> Znaleziono:</p>
                    <table class="friend"><tr><td>{{ searchedUser.name }} </td><td>{{ searchedUser.surname }}</td><td>{{ searchedUser.lastLogin }}</td>
                    <td><base-small-button type="green-large" @click="addFriend()">Dodaj</base-small-button></td></tr></table>
                </div>
                <div v-else-if="findUser === false" class="findUser">{{ notFindUser }}</div>
                <div v-else></div>
            </div>
        </div>
    </div>
    <base-notification-list></base-notification-list>
</template>
<script>
import LeftPanel from '@/components/base/LeftPanel.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSmallButton from '@/components/base/BaseSmallButton.vue';
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import inputValidators from '@/mixins/inputValidators';
import { mapActions, mapGetters } from 'vuex';

export default {
    mixins: [inputValidators],
    components:{
        LeftPanel,
        BaseInput,
        BaseSmallButton,
        BaseNotificationList
    },
    data(){
        return{
            friends:{
                Andrzej:{
                    id:0,
                    name: 'Andrzej',
                    surname: 'Bidermann',
                    lastLogin: '2023-05-17',
                    lastGame: 'Warcaby'
                },
                Tomek:{
                    id:1,
                    name: 'Tomek',
                    surname: 'B',
                    lastLogin: '2023-05-01',
                    lastGame: 'Statki'
                },
                Rafal:{
                    id:2,
                    name: 'Rafał',
                    surname: 'Rafał',
                    lastLogin: '2023-04-10',
                    lastGame: 'Warcaby'
                },
                Daniel:{
                    id:0,
                    name: 'Daniel',
                    surname: 'Daniel',
                    lastLogin: '2022-12-17',
                    lastGame: 'Polacz4'
                }
            },
            searchedUser:{
                id: 0,
                name: '',
                surname: '',
                lastLogin: '',
                lastGame: ''
            },
            username:'',
            isLoading: false,
            hasFriends: true,
            isUsernameValid: false,
            notFindUser: 'Nie znaleziono użytkownika o podnym imieniu.',
            showAddButton: false,
            findUser: null
            }
        },
        computed: {
    ...mapGetters(['getNotificationTemplates'])
  },
    methods:{
        ...mapActions(['showNotification', 'registerUser']),
        findFriend(username){
            if (this.validateUsername(username)){
                var keys = Object.keys(this.friends);
                for (var i = 0; i < keys.length; i++){
                    var key = keys[i]
                    if(this.friends[key].name === username){
                        this.searchedUser = this.friends[key];
                        this.findUser = true;
                        console.log('znaleziono');
                        break;
                    }
                    else{
                        this.searchedUser = {};
                        this.showAddButton = false;
                        this.findUser = false;
                        console.log('nie znaleziono', key);
                    }
                }
                console.log(username);
            }
            else{
                if(username.length === 0){
                this.showNotification(this.getNotificationTemplates.user_name_to_short);
                }
                else{
                    this.showNotification(this.getNotificationTemplates.user_name);
                }
            }
        },
        addFriend(){
            this.friends[this.searchedUser.name] = this.searchedUser;
        }
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
    margin-left:50px;
    color: white;

}
.mainDescription{
    justify-content: center;
    margin-left: 50px;
}
.table{
    display: flex;
    flex-direction: column;
    justify-content: center; 
    width: 800px;
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
</style>
