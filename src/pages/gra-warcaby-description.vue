<template>
    <div class="container">
        <div class="leftPanel">
            <left-panel></left-panel>
        </div>
    <div class="content">
        <h1 class="mainDescription">Warcaby</h1>
        <p class="description">Warcaby to jedna z najbardziej popularnych gier planszowych na świecie, która zapewnia wiele godzin świetnej zabawy dla graczy w każdym wieku. Ta strategiczna gra logiczna nie tylko rozwija umiejętności planowania, ale również oferuje emocjonujące wyzwania dla umysłu. Zachęcam Cię do zagrania w tę wciągającą grę, która może być świetnym sposobem na spędzenie czasu z rodziną i przyjaciółmi.</p>
        <RouterLink :to="{ name: 'warcaby' }">
            <div class="playButton">
                <BaseButton type="green-large">Zagraj</BaseButton>
            </div>
        </RouterLink>
        <h1 class="rules">Zasady gry.</h1>
            <div class="description">
            <p>W grze uczestniczą dwie strony, zwykle o różnych kolorach pionków, które stoją na przeciwległych końcach planszy. <br></p>
            <p>Podstawową strategią w grze w warcaby jest bicie pionków przeciwnika poprzez skakanie nad nimi. <br></p>
            <p>Pionki mogą poruszać się na planszy tylko po skosie. <br></p>
            <p>Istnieją dwa rodzaje pionków: pionki zwykłe i damki. <br></p>
            <p>Pionki zwykłe mogą poruszać się tylko do przodu po skosie, o jedno pole na raz.<br> </p>
            <p>Jeśli pionek zwykły dotrze do przeciwnej krawędzi planszy, zostaje awansowany na damkę.<br></p>
            <p>Damka może poruszać się zarówno do przodu jak i do tyłu po skosie, o dowolną liczbę pól.<br></p>
            <p>Kiedy pion staje się damką ruch wykonuje przeciwnik.<br></p>
            <p>Jeśli Twój pionek znajduje się obok pionka przeciwnika po skosie, a pole za pionkiem jest wolne, musisz skoczyć nad nim, usuwając go z planszy. <br></p>
            <p>Bicia pionków są obowiązkowe.<br></p>
            <p>Bicie damką jest możliwe z dowolnej odległości po linii przekątnej i następuje przez przeskoczenie pionu (lub damki) przeciwnika, za którym musi znajdować się co najmniej jedno wolne pole damka przeskakuje na dowolne z tych pól i może kontynuować bicie.<br></p>
            <p>Musisz wykonywać wielokrotne skoki w jednym ruchu, wykorzystując to, że pionek może skakać nad kilkoma pionkami przeciwnika, jeśli są one połączone i istnieje wolne pole za nimi.</p>
            <p>Zbite piony są usuwane z planszy po zakończeniu ruchu.<br></p>
            <p>Celem gry jest zbicie wszystkich pionków przeciwnika albo zablokowanie wszystkich, które pozostają na planszy, pozbawiając przeciwnika możliwości wykonania ruchu.</p>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import LeftPanel from '@/components/base/LeftPanel.vue';
import { RouterLink } from 'vue-router'; 
import BaseButton from '@/components/base/BaseButton.vue'
export default {
components:{
    LeftPanel,
    RouterLink,
    BaseButton
}
}
</script>
<style scoped>
.leftPanel{
    flex: 0 0 auto;
}
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
.mainDescription,
.rules{
  background-color: transparent;
  color: white;
  font-size: 32px;
  margin: 30px;
}
.description{
    color: white;
    font-size: 18px;
    font-weight: 300;
    width: 800px;
    line-height: 24px;
}
.rules{
    color: white;
    background-color: transparent;
    padding: 10px;
    font-size: 18px;
    font-size: 32px;
}
.playButton{
    margin-top: 20px;
    justify-content: center;
    text-decoration: none;
    margin-left: 300px;
}
</style>
  