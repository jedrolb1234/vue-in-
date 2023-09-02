<template>  
  <base-page-layout>
  <!-- <div v-if="warcabyTable === true || statkiTable === true || polacz4Table === true" class="right-strap"></div> -->
    <div class="container">
      <BaseHeader>Rankingi</BaseHeader>
      <h2 class="Header">Warcaby</h2>
      <hr class="hr1">          
          <div class="warcabyHeader" @click="toogleWarcabyTable">
            <ul>Ranking</ul> 
            <span v-if="warcabyTable===false" :class="iconUpArrow">expand_less</span>
            <span v-else-if="warcabyTable===true" :class="iconUpArrow">expand_more</span>
          </div>
          <div class="test" v-if="(getIsLoadingWar=== false) & (warcabyTable === false)">
            <transition name="slidOFF">
              <div v-show="warcabyTable===false" class="tableContainer">
                <table>
                  <tr class="warcabyList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tr class="warcabyList"
                    v-for="( w, index ) in currentPageW" :key="index">
                    <td class="">{{ w.rank }}</td><td>{{ w.name }}</td><td>{{ w.surname }}</td><td>{{ w.points }}</td>    
                  </tr>
                  <tr :style="{height: getDynamicHeightW + 'px'}"></tr>
                </table>
                <div class="buttons" v-show="warcabyTable===false">
                  <base-previous-button @click="previousPageW">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageW">Następna</base-next-button>
                  <p class="page">{{ pageNrW }}</p>
                </div>
              </div>
            </transition>
          </div>
      
        <transition name="slideON">
          <div v-if="(getIsLoadingWar===true) & (warcabyTable === false)">
              <table class="tableSlideOn">
                <tr class="warcabyList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
                <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
              </table>
          </div>
        </transition>
      <h2 class="Header">Statki</h2>
      <hr class="hr1">    
        <div class="statkiHeader" @click="toogleStatkiTable">
          <ul>Ranking</ul> 
          <span v-if="statkiTable===false" :class="iconUpArrow">expand_less</span>
          <span v-else-if="statkiTable===true" :class="iconUpArrow">expand_more</span>
        </div>
        <div v-if="(getIsLoadingStat=== false) & (statkiTable === false)">
          <transition name="slideOFF">
            <div v-show="statkiTable === false" class="tableContainer">
              <table >
                <tr class="statkiList"><td>Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
                <tbody>
                  <tr class="statkiList"
                    v-for="( s, index ) in currentPageS" :key="index">
                    <td>{{ s.rank }}</td><td>{{ s.name }}</td><td>{{ s.surname }}</td><td>{{ s.points }}</td>    
                  </tr>
                  <tr :style="{height: getDynamicHeightS + 'px'}"></tr>
                </tbody>
              </table>
              <div class="buttons" v-show="statkiTable===false">
                <base-previous-button @click="previousPageS">Poprzednia</base-previous-button>
                <base-next-button @click="nextPageS">Następna</base-next-button>
                <p class="page">{{ pageNr('S') }}</p>
              </div>
            </div>
          </transition>
        </div>
      
        <transition name="slideON">
          <div v-if="(getIsLoadingStat===true) & (statkiTable === false)">
              <table class="tableSlideOn">
                  <tr class="statkiList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
              </table>
          </div>
        </transition>

      <h2 class="Header">Połącz 4</h2>
      <hr class="hr1">    
        <div class="polacz4Header" @click="tooglePolacz4Table">
          <ul>Ranking</ul> 
          <span v-if="polacz4Table===false" :class="iconUpArrow">expand_less</span>
          <span v-else-if="polacz4Table===true" :class="iconUpArrow">expand_more</span>
        </div>
          <transition name="slideON">
            <div v-if="(getIsLoadingPol=== false) & (polacz4Table === false)">
              <transition name="slideOFF">
                <div v-show="polacz4Table === false" class="tableContainer">
                  <table>
                    <tr><td>Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
                    <tbody>
                      <tr
                        v-for="( p, index ) in currentPageP" :key="index">
                        <td>{{ p.rank }}</td><td>{{ p.name }}</td><td>{{ p.surname }}</td><td>{{ p.points }}</td>    
                      </tr>
                      <tr :style="{height: getDynamicHeightP + 'px'}"></tr>
                    </tbody>
                  </table>
                  <div class="buttons" v-show="polacz4Table===false">
                    <base-previous-button @click="previousPageP">Poprzednia</base-previous-button>
                    <base-next-button @click="nextPageP">Następna</base-next-button>
                    <p class="page">{{ PageNrP }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </transition>

      <div v-if="(getIsLoadingPol===true) & (polacz4Table === false)">
        <table class="tableSlideOn">
            <tr class="polacz4List"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
            <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
        </table>
      </div>
    </div>
  </base-page-layout>
</template>
  
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import BaseNextButton from '@/components/base/BaseNextButton.vue'
import BasePreviousButton from '@/components/base/BasePreviousButton.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'


export default {
  components:{
      BasePageLayout,
      BaseLoadingSpinner,
      BaseNextButton,
      BasePreviousButton,
      BaseHeader

  },
  methods:{
    ...mapActions('Rank', ['toogleWarcabyTable', 'toogleStatkiTable',
                            'tooglePolacz4Table', 'previousPageW', 'nextPageW',
                            'previousPageS', 'nextPageS', 'previousPageP', 'nextPageP',]),  

  },  
  computed: {
    ...mapGetters('Rank', [ 'warcabyTable','statkiTable', 'polacz4Table', 'getWarcaby', 'getItemsPerPage', 
                  'getStatki', 'getPolacz4', 'getCurrentPagePol', 'getCurrentPageStat', 'getCurrentPageWar',
                  'getIsLoadingWar', 'getIsLoadingStat', 'getIsLoadingPol', 'pageNrW',  'pageNrS', 'PageNrP',
                  'currentPageW', 'currentPageS', 'currentPageP', 'allPagesW', 'allPagesS',
                  'allPagesP', 'getDynamicHeightP', 'getDynamicHeightS', 'getDynamicHeightW']),
    iconDownArrow(){
      return ['material-symbols-outlined', 'downArrow'].join(' ');
    },
    iconUpArrow(){
      return ['material-symbols-outlined', 'upArrow'].join(' ');
    }
  },
}
</script>
 
<style scoped>
.container{
  max-height: 1600px;
  display: flex;    
  flex-direction: column;    
  align-items: left;
  width: 100%;
  /* overflow-y: scroll; */
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 0px;
}
.Header
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  background-color:var(--secondary);
  width: 800px;
  height: 40px;
  margin: 40px 0px 0px 40px;
  border-radius: 8px 8px 0px 0px;
  color: var(--primary);
}
.warcabyHeader,
.statkiHeader,
.polacz4Header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: var(--secondary);
  width: 800px;
  height: 40px;
  margin: 20px 0px 0px 20px;
  border-radius: 8px 8px 0px 0px;
  font-weight: bold;
  /* position: sticky; */
}
table{
    justify-content: center; 
    width: 800px;
    height: auto;
    color:var(--primary);;
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    padding: 0px;
    border-spacing: 0px;
    table-layout: fixed;
    background-color: var(--secondary);
    margin-left: 40px;
  }
tr{
    border: 1px solid var(--primary);;
    text-align: left;
    border-radius: 8px;
    max-height: 28px;
}

td, th{
    padding: var(--td-padding-top-bottom) var(--td-padding-left-right); /* odstępy */
    background-color: var(--secondary);
    width: 200px;
    max-height: 28px;
    font-size: 18px;
    font-weight: 400;
    color:var(--primary);
    margin: 0px 0px 0px 0px;
    border: none;
}

td:nth-child(odd){ 
  background-color: var(--td-odd-bg-color); 
  color: var(--td-odd-txt-color); 
}
td:nth-child(even){ 
  background-color: var(--td-even-bg-color); 
  color: var(--td-even-txt-color); 
}

th:nth-child(odd){ 
  background-color: var(--th-odd-bg-color); 
  color: var(--th-odd-txt-color); 
}
th:nth-child(even){ 
  background-color: var(--th-even-bg-color); 
  color: var(--th-even-txt-color); 
}

.downArrow{
  font-size: 40px;
  display:flex;
  margin-right: 15px;
}
.warcabyHeader:hover,
.statkiHeader:hover,
.polacz4Header:hover{
  cursor:pointer;
}
.upArrow{
  font-size: 40px;
  display:flex;
  margin-right: 15px;
}
.ul{
  display:flex;
}
.buttons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
  margin-left: 40px;
}
.loadingSpinner{
  width:800px;
  height: 380px;
  justify-content: center;
  text-align: center;
  padding-top: 0px;
}
p{
    font-size: 22px;
    color: var(--primary);;
}
.page{
    width: 13px;
    font-size: 22px;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
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
.tableSlideOn
{
    transform-origin: top;
    animation-name: transition;
    animation-duration: 500ms;
} 
</style>
  