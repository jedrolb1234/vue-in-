<template>  
  <base-page-layout>
    <div class="container">
      <h1 class="mainDescription">Rankingi</h1>                 
        <div class="showWarcabyTable">
          <div  class="warcabyHeader" @click="toogleWarcabyTable">
            <ul>Warcaby</ul> 
            <span v-if="warcabyTable===false" :class="iconUpArrow">expand_less</span>
            <span v-else-if="warcabyTable===true" :class="iconUpArrow">expand_more</span>
          </div>
          <div class="test" v-if="(getIsLoadingWar=== false) & (warcabyTable === false)">
            <transition name="slidOFF">
              <div v-show="warcabyTable===false" class="tableContainer">
                <table>
                  <tr class="warcabyList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tr class="warcabyList"
                    v-for="( w, index ) in currentPage('warcaby')" :key="index">
                    <td class="">{{ getWarcaby[w].rank }}</td><td>{{ getWarcaby[w].name }}</td><td>{{ getWarcaby[w].surname }}</td><td>{{ getWarcaby[w].points }}</td>    
                  </tr>
                  <tr :style="{height: dynamicHeightW + 'px'}"></tr>
                </table>
                <div class="buttons" v-show="warcabyTable===false">
                  <base-previous-button @click="previousPageW">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageW">Następna</base-next-button>
                  <p class="page">{{ pageNr('W') }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <transition name="slideON">
      <div v-if="(getIsLoadingWar===true) & (warcabyTable === false)">
          <table class="tableSlideOn">
            <tr class="warcabyList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
            <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
          </table>
      </div>
        </transition>

      <div class="showStatkiTable">
        <div class="statkiHeader" @click="toogleStatkiTable">
          <ul>Statki</ul> 
          <span v-if="statkiTable===false" :class="iconUpArrow">expand_less</span>
          <span v-else-if="statkiTable===true" :class="iconUpArrow">expand_more</span>
        </div>
        <div v-if="(getIsLoadingStat=== false) & (statkiTable === false)">
          <transition name="slideOFF">
            <div v-show="statkiTable === false" class="tableContainer">
              <table >
                <tr class="statkiList"><td>Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
                <tr class="statkiList"
                  v-for="( s, index ) in currentPage('statki')" :key="index">
                  <td>{{ getStatki[s].rank }}</td><td>{{ getStatki[s].name }}</td><td>{{ getStatki[s].surname }}</td><td>{{ getStatki[s].points }}</td>    
                </tr>
                <tr :style="{height: dynamicHeightS + 'px'}"></tr>
              </table>
              <div class="buttons" v-show="statkiTable===false">
                <base-previous-button @click="previousPageS">Poprzednia</base-previous-button>
                <base-next-button @click="nextPageS">Następna</base-next-button>
                <p class="page">{{ pageNr('S') }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
        <transition name="slideON">
      <div v-if="(getIsLoadingStat===true) & (statkiTable === false)">
          <table class="tableSlideOn">
              <tr class="statkiList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
              <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
          </table>
      </div>
        </transition>
      <div class="showPolacz4Table">
        <div class="polacz4Header" @click="tooglePolacz4Table">
          <ul>Polacz 4</ul> 
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
                    v-for="( p, index ) in currentPage('polacz4')" :key="index">
                    <td>{{ getPolacz4[p].rank }}</td><td>{{ getPolacz4[p].name }}</td><td>{{ getPolacz4[p].surname }}</td><td>{{ getPolacz4[p].points }}</td>    
                  </tr>
                  <tr :style="{height: dynamicHeightP + 'px'}"></tr>
                </tbody>
              </table>
              <div class="buttons" v-show="polacz4Table===false">
                <base-previous-button @click="previousPageP">Poprzednia</base-previous-button>
                <base-next-button @click="nextPageP">Następna</base-next-button>
                <p class="page">{{ pageNr('P') }}</p>
              </div>
            </div>
          </transition>
        </div>
          </transition>
      </div>
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

export default {
  components:{
      BasePageLayout,
      BaseLoadingSpinner,
      BaseNextButton,
      BasePreviousButton

  },
  data(){
    return{
      dynamicHeightW: 0,
      dynamicHeightS: 0,
      dynamicHeightP: 0
    }
  },
  methods:{
    ...mapActions('Rank', ['toogleWarcabyTable', 'toogleStatkiTable',
                            'tooglePolacz4Table', 'previousPageW', 'nextPageW',
                            'previousPageS', 'nextPageS', 'previousPageP', 'nextPageP',]),  
    currentPage(info){
      if (info === 'warcaby'){
        let startIndex = (this.getCurrentPageWar - 1) * this.getItemsPerPage;
        let endIndex = startIndex + this.getItemsPerPage;
        let warcabyKeys = Object.keys(this.getWarcaby)
        let sliced = warcabyKeys.slice(startIndex, endIndex);   
        this.dynamicHeightW= (10 - sliced.length ) * 38;
        return sliced;

      }
      if (info === 'statki'){
        let startIndex = (this.getCurrentPageStat - 1) * this.getItemsPerPage;
        let endIndex = startIndex + this.getItemsPerPage;
        let statkiKeys = Object.keys(this.getStatki)
        let sliced = statkiKeys.slice(startIndex, endIndex); 
        this.dynamicHeightS = (10 - sliced.length ) * 38;
        return sliced;
      }
      if (info === 'polacz4'){
        let startIndex = (this.getCurrentPagePol - 1) * this.getItemsPerPage;
        let endIndex = startIndex + this.getItemsPerPage;
        let polacz4Keys = Object.keys(this.getPolacz4)
        let sliced = polacz4Keys.slice(startIndex, endIndex);
        this.dynamicHeightP = (10 - sliced.length ) * 38;
        return sliced;   
      }
      return {};
    },  
    pageNr(info){
      if (info === 'W'){
        return this.getCurrentPageWar;
      }
      if (info === 'S'){
        return this.getCurrentPageStat;
      }
      if (info === 'P'){
        return this.getCurrentPagePol;
      }
    },
    allPages(info){
      if (info === 'W'){
        return Math.ceil(Object.keys(this.getWarcaby).length / this.getItemsPerPage);
      }
      if (info === 'S'){
        return Math.ceil(Object.keys(this.getStatki).length / this.getItemsPerPage);
      }
      if (info === 'P'){
        return Math.ceil(Object.keys(this.getPolacz4).length / this.getItemsPerPage);
      }
    },
    // dynamicHeight(){}
  },  
  computed: {
    ...mapGetters('Rank', [ 'warcabyTable','statkiTable', 'polacz4Table', 'getWarcaby', 'getItemsPerPage', 
                  'getStatki', 'getPolacz4', 'getCurrentPagePol', 'getCurrentPageStat', 'getCurrentPageWar',
                  'getIsLoadingWar', 'getIsLoadingStat', 'getIsLoadingPol']),
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
  align-items: center;
  margin-bottom: 25px;
}

.mainDescription{
    align-self: center;
    margin-left: 45px;
    width:800px;
}
.warcabyHeader,
.statkiHeader,
.polacz4Header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: white;
  width: 800px;
  height: 40px;
  margin: 0px 0px 0px 0px;
  border-radius: 8px 8px 0px 0px;
}
.warcabyHiddenHeader,
.statkiHiddenHeader, 
.polacz4HiddenHeader{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: white;
  width: 800px;
  height: 40px;
  margin: 0px 0px 0px 0px;
  border-radius: 8px 8px 8px 8px;
}
.statkiHeader,
.polacz4Header,
.statkiHiddenHeader, 
.polacz4HiddenHeader{
  margin-top: 20px;
}
table{
    justify-content: center; 
    width: 800px;
    height: auto;
    color:black;
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    padding: 0px;
    border-spacing: 0px;
    table-layout: fixed;
    background-color: white;
  }
tr{
    border: 1px solid black;
    text-align: left;
    border-radius: 8px;
    max-height: 28px;
}
tr:last-child{
    border-radius: 0px 0px 8px 8px;
}
td, th{
    padding: 5px;
    background-color: white;
    width: 200px;
    max-height: 28px;
    font-size: 18px;
    font-weight: 400;
    color:black;
    margin: 0px 0px 0px 0px;
    border: none;
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
    color: black;
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
  