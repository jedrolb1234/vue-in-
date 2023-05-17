<template>
  <div class="container">
      <div class="leftPanel">
          <left-panel></left-panel>
      </div>
  <div class="content">
      <h1 class="mainDescription">Warcaby</h1>
      <p class="description">Witaj w ekscytującej grze "Połącz 4"! Ta gra strategiczna sprawi, że będziesz w pełni zaangażowany i zapewni Ci niezliczone godziny zabawy w rywalizacji z przeciwnikiem. Celem gry jest ułożenie czterech piłek w jednej linii - pionowo, poziomo lub na ukos.
Ta gra daje Ci nieskończone możliwości taktyczne. Musisz analizować ruchy przeciwnika i jednocześnie planować swoje własne, aby zablokować przeciwnika lub znaleźć idealną okazję do ułożenia swoich piłek w linii. Wykorzystaj swoją spostrzegawczość i zdolności planowania, aby zdominować planszę i pokonać przeciwnika.
"Połącz 4" to doskonały sposób na rywalizację z rodzeństwem, przyjaciółmi czy rodziną. Możesz stworzyć własne strategie, rozwijać swoje umiejętności i eksperymentować z różnymi taktykami. Czy zdecydujesz się na atak agresywny, koncentrując się na szybkim ułożeniu czterech piłek w linii, czy też wybierzesz bardziej defensywną strategię, starając się blokować przeciwnika?
Gra "Połącz 4" zapewni Ci niesamowite emocje, wzmocni Twoje zdolności logicznego myślenia i rozwija umiejętność podejmowania szybkich decyzji. Bez względu na to, czy jesteś nowicjuszem, czy doświadczonym graczem, ta gra jest łatwa do nauki, ale trudna do opanowania.</p>
      <RouterLink :to="{ name: 'polacz4' }">
          <div class="playButton">
              <BaseButton type="green-large">Zagraj</BaseButton>
          </div>
      </RouterLink>
      <h1 class="rules">Zasady gry.</h1>
          <div class="description">
            <p>Gra toczy się na planszy o wymiarach 6x7, która składa się z 6 wierszy i 7 kolumn.</p>
            <p>Gracze otrzymują piłki dwóch różnych kolorów, na przykład !!!!czerwone i żółte!!!.</p>
            <p>Celem gry jest ułożenie czterech piłek swojego koloru w jednej linii - pionowo, poziomo lub na ukos.</p>
            <p>Gracze wykonują ruchy na zmianę, umieszczając swoje piłki w jednej z siedmiu kolumn.</p>
            <p>Piłka spada do najniższego wolnego pola w wybranej kolumnie.</p>
            <p>Po umieszczeniu piłki, gracze nie mają możliwości jej przesunięcia.</p>
            <p>Celem gracza jest budowanie linii składających się z czterech swoich piłek w jednym kierunku.</p>
            <p>Gracz, który jako pierwszy ułoży cztery swoje piłki w linii - pionowo, poziomo lub na ukos - wygrywa grę.</p>
            <p>Jeśli plansza zostanie całkowicie zapełniona piłkami, a żaden gracz nie ułożył czterech w linii, gra kończy się remisem.</p>
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
