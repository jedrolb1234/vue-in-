<template>
    <transition name="slide">
    <div v-if="hidden===false" :class="$style.content">
        <h1 :class="$style.funhause">FunHause</h1>      
        <button @click="isHidden()" :class="iconBStyles">arrow_back_ios</button>   
        <div :class="$style.line"></div>
        <div :class="userStyles">person_2</div>
        <span :class="gamesStyles">stadia_controller</span>
        <div :class="$style.games">Gry</div>
        <span :class="friendsStyles">group</span>
        <div :class="$style.friends">Znajomi</div>
        <span :class="rankStyles">stars</span>
        <div :class="$style.rank">Ranking</div>
        <span :class="historyStyles">device_reset</span>
        <div :class="$style.history">Historia gier</div>
        <span :class="settingsStyles">settings</span>
        <div :class="$style.settings">Ustawienia</div>
        <span :class="logOutStyles">logout</span>
        <div :class="$style.logOut">Wyloguj się</div>   
    </div> 
    <div v-else-if="hidden===true" :class="$style.contentHidden"> 
        <button @click="isHidden()" :class="iconHBStyles">arrow_forward_ios</button>   
        <div :class="$style.line"></div>
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
export default {
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
.content{
    position: absolute;
    width: 270px;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: #393E41;
}
.funhause{
    position: absolute;
    left: 6%;
    right: 23%;
    top: 3%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
}
button {
  box-shadow: none;
  border: none;
}
.buttonicon{
    position: absolute;
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    background-color: #393E41;
    top: 6.5%;
    left: 85%;
    box-shadow: none;
    width: 40px;
    border: none;
}
.line{
    position: absolute;
    left: 5%;
    right: 5%;
    top: 13%;
    border: 2px solid #FBF5F3
}
.userIcon{
    position: absolute;
    left: 25.93%;
    right: 25.93%;
    top: 20.11%;
    font-size: 120px;
    color: #FFFFFF;
}
.gamesIcon{
    position: absolute;
    left: 5%;
    top: 38%;
    color: #FFFFFF;
    font-size: 20px;
}
.games{
    position: absolute;
    left: 15%;
    top: 37.5%;
    color: #FFFFFF;
    font-size: 20px;}
.friendsIcon{
    left: 5%;
    position: absolute;
    top: 44%;
    color: #FFFFFF;
    font-size: 20px;
}
.friends{
    position: absolute;
    left: 15%;
    top: 43.5%;
    color: #FFFFFF;
    font-size: 20px;
}
.rankIcon{
    left: 5%;
    position: absolute;
    top: 50%;
    color: #FFFFFF;
    font-size: 20px;
}
.rank{
    left: 15%;
    position: absolute;
    top: 49.5%;
    color: #FFFFFF;
    font-size: 20px;
}
.historyIcon{
    left: 5%;
    position: absolute;
    top: 55%;
    color: #FFFFFF;
    font-size: 20px;
}
.history{
    left: 15%;
    position: absolute;
    top: 54.5%;
    color: #FFFFFF;
    font-size: 20px;
}
.settingsIcon{
    left: 5%;
    position: absolute;
    top: 61%;
    color: #FFFFFF;
    font-size: 20px;
}
.settings{
    left: 15%;
    position: absolute;
    top: 60.5%;
    color: #FFFFFF;
    font-size: 20px;
}
.logOutIcon{
    left: 5%;
    position: absolute;
    bottom: 10%;
    color: #FFFFFF;
    font-size: 20px;
}
.logOut{
    left: 15%;
    position: absolute;
    bottom: 9.5%;
    color: #FFFFFF;
    font-size: 20px;
}
.contentHidden{
    position: absolute;
    width: 50px;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: #393E41;
}
.hiddenbuttonicon{
    position: absolute;
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    background-color: #393E41;
    top: 6.5%;
    left: 10%;
    box-shadow: none;
    width: 40px;
    border: none;
}
.gamesHiddenIcon{
    position: absolute;
    left: 25%;
    top: 38%;
    color: #FFFFFF;
    font-size: 20px;
}
.friendsHiddenIcon{
    left: 25%;
    position: absolute;
    top: 44%;
    color: #FFFFFF;
    font-size: 20px;
}
.rankHiddenIcon{
    left: 25%;
    position: absolute;
    top: 50%;
    color: #FFFFFF;
    font-size: 20px;
}
.historyHiddenIcon{
    left: 25%;
    position: absolute;
    top: 55%;
    color: #FFFFFF;
    font-size: 20px;
}
.settingsHiddenIcon{
    left: 25%;
    position: absolute;
    top: 61%;
    color: #FFFFFF;
    font-size: 20px;
}
.logOutHiddenIcon{
    left: 25%;
    position: absolute;
    bottom: 10%;
    color: #FFFFFF;
    font-size: 20px;
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