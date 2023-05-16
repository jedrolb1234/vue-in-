<template>
    <transition name="slide">
    <div v-if="hidden===false" :class="$style.content">
        <div :class="$style.funhauseContainer">
            <h1 :class="$style.funhause">FunHause</h1>      
            <button @click="isHidden()" :class="iconBStyles">arrow_back_ios</button>   
        </div>
        <div :class="$style.line"></div>
        <div :class="userStyles">person_2</div>       
        <RouterLink :to="{name: 'games'}" :class="$style.gamesContainer">
            <span :class="gamesStyles">stadia_controller</span>
            <div :class="$style.games">Gry</div>
        </RouterLink>
        <RouterLink :to="{name: 'friends'}" :class="$style.friendsContainer">
            <span :class="friendsStyles">group</span>
            <div :class="$style.friends">Znajomi</div>
        </RouterLink>
        <RouterLink :to="{name: 'rank'}" :class="$style.rankContainer">
            <span :class="rankStyles">stars</span>
            <div :class="$style.rank">Ranking</div>
        </RouterLink>
        <RouterLink :to="{name: 'history'}" :class="$style.historyContainer">
            <span :class="historyStyles">device_reset</span>
            <div :class="$style.history">Historia gier</div>
        </RouterLink>
        <RouterLink :to="{name: 'settings'}" :class="$style.settingsContainer">
            <span :class="settingsStyles">settings</span>
            <div :class="$style.settings">Ustawienia</div>   
        </RouterLink>
        <div :class="$style.logOutContainer">
            <span :class="logOutStyles">logout</span>
            <div :class="$style.logOut">Wyloguj się</div>   
        </div>
    </div> 
    <div v-else-if="hidden===true" :class="$style.contentHidden"> 
        <button @click="isHidden()" :class="iconHBStyles">arrow_forward_ios</button>   
        <div :class="$style.lineHidden"></div>
        <span :class="gamesHStyles">stadia_controller</span>
        <span :class="friendsHStyles">group</span>
        <span :class="rankHStyles">stars</span>
        <span :class="historyHStyles">device_reset</span>
        <span :class="settingsHStyles">settings</span>
        <span :class="logOutHStyles">logout</span>
    </div>
    </transition>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    components:{
    RouterLink
    },
    data(){
        return{
        hidden: false
        }
    },
    methods:{
        isHidden(){
        this.hidden = !this.hidden;
        }
    },
  computed: {
    iconBStyles() {
        return ['material-symbols-outlined', this.$style.buttonicon].join(' ');
        },
    userStyles(){
        return ['material-symbols-outlined', this.$style.userIcon].join(' ');
        },
    gamesStyles(){
        return ['material-symbols-outlined', this.$style.gamesIcon].join(' ');
        },
    friendsStyles(){
        return ['material-symbols-outlined', this.$style.friendsIcon].join(' ');
        },
    rankStyles(){
        return ['material-symbols-outlined', this.$style.rankIcon].join(' ');
        },
    historyStyles(){
        return ['material-symbols-outlined', this.$style.historyIcon].join(' ');
        },
    settingsStyles(){
        return ['material-symbols-outlined', this.$style.settingsIcon].join(' ');
        },
    logOutStyles(){
        return ['material-symbols-outlined', this.$style.logOutIcon].join(' ');
        },   
    iconHBStyles() {
        return ['material-symbols-outlined', this.$style.hiddenbuttonicon].join(' ');
        },
    gamesHStyles(){
        return ['material-symbols-outlined', this.$style.gamesHiddenIcon].join(' ');
        },
    friendsHStyles(){
        return ['material-symbols-outlined', this.$style.friendsHiddenIcon].join(' ');
        },
    rankHStyles(){
        return ['material-symbols-outlined', this.$style.rankHiddenIcon].join(' ');
        },
    historyHStyles(){
        return ['material-symbols-outlined', this.$style.historyHiddenIcon].join(' ');
        },
    settingsHStyles(){
        return ['material-symbols-outlined', this.$style.settingsHiddenIcon].join(' ');
        },
    logOutHStyles(){
        return ['material-symbols-outlined', this.$style.logOutHiddenIcon].join(' ');
        },
    }
}
</script>

<style module>

button {
  box-shadow: none;
  border: none;
  background-color: #393E41;
  color: #FFFFFF;
}
button:hover{
    cursor: pointer;
    background-color: #535b5f;
    border-radius: 10px;
}
.gamesContainer:hover,
.rankContainer:hover,
.friendsContainer:hover,
.historyContainer:hover,
.settingsContainer:hover{
    background-color: #535b5f;
    border-radius:10px;
}
.content{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 270px;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: #393E41;
    position: fixed;
}
.funhauseContainer{
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    margin-top: 30px;
    justify-content: space-between;
}
.funhause{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    color: #FFFFFF;
    margin-right: auto;
}

.buttonicon{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #FFFFFF;
    background-color: #393E41;
    box-shadow: none;
    width: 40px;
    height: 40px;
    border: none;
    margin-left: auto;
    margin-top: 30px;
}
.line{
    border: 2px solid #FBF5F3;
    display: flex;
    margin: 10px;
}
.userIcon{
    display: flex;
    font-size: 100px;
    color: #FFFFFF;
    margin-left: 90px;
}

.gamesContainer{
    display: flex;
    margin-left: 20px;
    margin-top: 48px;
    width: 220px;
    text-decoration: none;
}
.gamesIcon{
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
}
.games{
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
}
.friendsContainer{
    display: flex;
     margin-left: 20px;
     margin-top: 10px;
     width: 220px;
     text-decoration: none;
}
.friendsIcon{
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
}
.friends{
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
}
.rankContainer{
    display: flex;
     margin-left: 20px;
     margin-top: 10px;
     width: 220px;
     text-decoration: none;
}
.rankIcon{
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
}
.rank{
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
}
.historyContainer{
    display: flex;
     margin-left: 20px;
     margin-top: 10px;
     width: 220px;
     text-decoration: none;
}
.historyIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
    
}
.history{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
     text-decoration: none;
}
.settingsContainer{
    display: flex;
     margin-left: 20px;
     margin-top: 10px;
     width: 220px;
     text-decoration: none;
}
.settingsIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
}
.settings{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
}
.logOutContainer{
    display: flex;
     margin-left: 20px;
     margin-top: 200px;
}
.logOutIcon{
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 5px;
}
.logOut{
    color: #FFFFFF;
    font-size: 20px;
     margin-left: 20px;
}
.contentHidden{
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: #393E41;
    position: fixed;
}
.hiddenbuttonicon{
    display: flex;
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    background-color: #393E41;
    box-shadow: none;
    width: 40px;
    height: 40px;
    border: none;
    margin-top: 65px;
    margin-left:10px;
}
.lineHidden{
    border: 2px solid #FBF5F3;
    display: flex;
    margin: 37px 10px 10px 10px;
}
.gamesHiddenIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-top: 153px;
    margin-left: 20px;
}
    
.friendsHiddenIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 20px;
}
.rankHiddenIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 20px;
}
.historyHiddenIcon
{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 20px;
}
.settingsHiddenIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 20px;
}
.logOutHiddenIcon{
    display: flex;
    color: #FFFFFF;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 210px;
}
.slide-enter-active, .slide-leave-active {
  transition: all 2s ease;
}
.slide-enter-to, .slide-leave {
  transform: translateX(-100%);
}
.slide-enter, .slide-leave-to {
  transform: translateX(0%);
}
</style>