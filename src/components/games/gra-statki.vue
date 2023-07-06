<template>
    <div class = "container">
        <div class = "player1-container">
            <table :class = "getBoardTable1">
                <tr v-for="(t,key) in getVLoop" :key='key'>
                    <td v-for="(p, idx) in t"  :key="idx"
                         :class="getClass(p)" @click="chooseMethod(p)"></td>
                </tr>
            </table>
            <div class="shipCounter">
            <div class="counterFour"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ getFourCounter }}</p></div>
            <div class="counterThree"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ getThreeCounter }}</p></div>
            <div class="counterTwo"><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ getTwoCounter }}</p></div>
            <div class="counterOne"><p class="shipImage"></p><p class="shipCount">{{ getOneCounter }}</p></div>
            </div>

        </div>
        <div class = "player2-container">
            <table class = "board-table2">
                <tr v-for="(t,key) in getVLoop" :key='key'>
                    <td v-for="(p, idx) in t" :key="idx"
                     :class="getOponentClass(p)" @click = "mark(p)"></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {

    methods:{
        ...mapActions('Statki', ['mark', 'chooseMethod']),
    },
    computed:{
        ...mapGetters('Statki', ['getClass', 'getOponentClass', 'getVLoop', 'getBoardTable1',
                    'getOneCounter', 'getTwoCounter', 'getThreeCounter', 'getFourCounter']),
    }
}
</script>
   
<style scoped>
.container{
    display:flex;
    justify-content: center;
}
.player1-container{
    background-color: palegreen;
    float: left;
    height: 300px;
    width: 300px;
}

.player2-container{
    background-color: darkcyan;
    height: 300px;
    width: 300px;
    margin-left: 50px;
}
.board-table1{
    border-spacing: 0px;
}
.board-table2{
    border-spacing: 0px;
}
td{
    border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
img{
    width:32px;
    height:25px;
    margin-top: 2px;
}
.ship{
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    animation: show 1000ms forwards ease;
}
.empty{
    background-size: cover;
}

.empty2{
    background-size: cover;
    animation: sink 1000ms forwards ease; 
}
.emptyOponent{
    background-color: aqua;
}
.emptyOponent:hover{
    background-image: url('@/assets/games/image/celownik.png');
    background-size: cover;
}
.shipOponent:hover{
    background-image: url('@/assets/games/image/celownik.png');
    background-size: cover;
}
.shipOponent{
    size: cover;
    background-color: aqua;
}

.hit{
    background-image: url('@/assets/games/image/cbomb.png');
    background-size: cover;
}
@keyframes sink {
  0% {
    opacity: 0;
    transform: rotateY(0deg); 
    background-image: url('@/assets/games/image/sss.png');
  }
  100% {
    opacity: 1;
    transform: rotateY(180deg);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
/* @keyframes sink{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-image: url('./image/sss.png'); border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
}
@keyframes show{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-color: palegreen; border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
} */



/* @keyframes sink {
  from {
    transform: rotateY(0deg);
    border: 0.5px black solid;
  }
  70% {
    transform: rotateY(90deg);
    opacity: 100%;
    border: 0.5px black solid;
  }
  99% {
    opacity: 0;
    transform: rotateY(90deg);
    background-image: url('./image/sss.png');
    border: 0.5px black solid;
  }
  to {
    opacity: 100%;
    background-image: none;
    border: 0.5px black solid;
  }
}

@keyframes show {
  from {
    opacity: 0;
    transform: rotateY(180deg);
    border: 0.5px black solid;
  }
  80% {
    transform: rotateY(90deg);
    opacity: 100%;
    border: 0.5px black solid;
  }
  99% {
    opacity: 0;
    transform: rotateY(90deg);
    background-color: palegreen;
    border: 0.5px black solid;
  }
  to {
    opacity: 100%;
    background-image: none;
    border: 0.5px black solid;
  }
} */

.disable-animation{
    border-spacing: 0px;
}
.disable-animation td {
  animation: none !important;
  border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
.hitPlayer{
    width: 37.5px;
    height: 37.5px;
    animation: sink 2000ms forwards ease;
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
@keyframes explosion {
    from {transform: scale(0%); border: none;}
    70% {transform: scale(150%); border: none; opacity: 100%;}
    to {border: 0.5px black solid; opacity: 0;}
}
.hitOponent{
    animation: explosion 350ms;
    background-image: url('@/assets/games/image/bomb.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.missedOponent{
    animation: explosion 350ms;
    background-image: url('@/assets/games/image/cross.png');
    background-size: cover;
}

.counterFour .counterThree .counterTwo .counterOne{
    flex-wrap: wrap;
}
.counter4 .counter3 .counter2 .counter1{
    flex-wrap: wrap;
}

.shipImage{
    width: 37.5px;
    height: 37.5px;
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
.shipCount{
    display: inline-block;
    box-sizing: border-box;
    width: 37.5px;
    height: 37.5px;
    margin: 0px;
    padding-bottom:10px;
}
</style>