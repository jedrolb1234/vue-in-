<template>
  <div class="container">
      <div class="leftPanel">
          <left-panel></left-panel>
      </div>
  <div class="content">
      <h1 class="mainDescription">Statki</h1>
      <p class="description">Witaj w fascynującym świecie gry "Statki"! Ta emocjonująca gra strategiczna zapewni Ci godziny niesamowitej zabawy i wyzwań. Celem gry jest trafienie statku przeciwnika, który jest ukryty na planszy, na jednym z dostępnych pól.<br>
"Statki" to gra, która wymaga zarówno spostrzegawczości, jak i umiejętności strategicznych. Musisz starannie rozważać swoje ruchy i dokładnie analizować planszę, aby odkryć ukryte statki przeciwnika. Każde trafienie przynosi Ci ekscytację i satysfakcję.<br>
Przed Tobą nieskończone możliwości taktyczne. Możesz planować swoje ruchy, szukać wzorców i strategii, które pozwolą Ci odkryć statki przeciwnika w jak najkrótszym czasie. Czy wybierzesz losowe pola, czy zastosujesz bardziej złożone metody analizy planszy? Decyzja należy do Ciebie!<br>
Niezależnie od tego, czy grasz z przyjaciółmi na tradycyjnej planszy, czy korzystasz z wirtualnej wersji gry, "Statki" zawsze zapewni Ci wiele ekscytujących chwil. Możesz rywalizować z innymi graczami, podzielić się swoimi osiągnięciami i strategiami, a nawet uczestniczyć w turniejach online.<br>
Ta gra rozwija Twoje umiejętności logicznego myślenia, koncentracji i spostrzegawczości. Wymaga od Ciebie szybkiego podejmowania decyzji i adaptacji do zmieniającej się sytuacji na planszy. Bez względu na to, czy jesteś nowicjuszem, czy doświadczonym graczem, "Statki" dostarczą Ci niezapomnianych chwil rozrywki.<br>
Czas zacząć przygodę i odkryć, jak wiele frajdy może dostarczyć Ci gra "Statki"! Czekają na Ciebie emocje, strategie i zwycięstwa. Włącz wyobraźnię, zdobądź przewagę i pokaż swoje umiejętności taktyczne na morzu bitew!</p>
      <RouterLink :to="{ name: 'statki' }">
          <div class="playButton">
              <BaseButton type="green-large">Zagraj</BaseButton>
          </div>
      </RouterLink>
      <h1 class="rules">Zasady gry.</h1>
          <div class="description">
            <p>Podczas każdej gry dostępne są 2 plansze 10x10 pól.</p>
            <p>Na początku gry na lewej planszy gracz rozmieszcza statki.</p>
            <p>Obowiązkowe jest rozmieszczenie w pionie lub w poziomie 2 statków po 4 pola, 3 satków po 3 pola, 4 statki po 2 pola, 5 statków po 1 polu.</p>
            <p>Statków nie można rozkładać na ukos.</p>
            <p>Statki nie mogą się styktać bokami, mogą natomiast się stykać w rogu.</p>
            <p>Po zatwierdzeniu planszy rozpoczyna się rozgrywka.</p>
            <p>Gracze wykonują ruchy w turach.</p>
            <p>W swojej turze należy wybrać pole na prawej planszy, tak aby strącić statek.</p>
            <p>Jeśli na wybranym polu znajdował się statek przeciwnika gracz otrzymuje dodatkową turę.</p>
            <p>Po trafieniu statku przeciwnika pole zostaje oznaczone "trafiony", w przeciwnym wypadku pole zostaje oznaczone "pudło".</p>
            <p>Jeśli przeciwnik wykonał ruch zostaje to odznaczone "trafiony" lub "pudło" na lewej planszy.</p>
            <p>Celem gry jest strącenie wszystkich statków przeciwnika.</p>
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
