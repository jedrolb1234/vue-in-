<template>  
<base-page-layout>
  <div class="container">
    <div class="content">
      <div class="RankContainer">
          <h1 class="mainDescription">Rankingi</h1>                 
        <div> 
          <div v-if="getIsLoadingWar===false">
            <div class="showWarcabyTable">
              <div v-if="warcabyTable===false" class="warcabyHeader" @click="toogleWarcabyTable">
              <ul>Warcaby</ul> 
              <span :class="iconUpArrow">expand_less</span>
              </div>
              <table v-if="warcabyTable===false">
                <tr class="warcabyList"><th>Pozycja</th><th>Imię</th><th>Nazwisko</th><th>Punkty</th></tr>
                <tr class="warcabyList"
                  v-for="( w, index ) in currentPage('warcaby')" :key="index">
                  <td class="">{{ getWarcaby[w].rank }}</td><td>{{ getWarcaby[w].name }}</td><td>{{ getWarcaby[w].surname }}</td><td>{{ getWarcaby[w].points }}</td>    
                </tr>
                <tr :style="{height: dynamicHeightW + 'px'}"></tr>
              </table>
                <div class="buttons" v-if="warcabyTable===false">
                <base-small-button @click="previousPageW" :disabled="pageNr('W') === 1">Poprzednia</base-small-button>
                <base-small-button @click="nextPageW" :disabled="pageNr('W') === allPages('W')">Następna</base-small-button>
              </div>
            </div>
          </div>
          <div class="warcabyHiddenHeader" v-if="warcabyTable===true" @click="toogleWarcabyTable">
            <ul>Warcaby</ul> 
            <span :class="iconUpArrow">expand_more</span>
          </div>
        </div>
        <div v-if="getIsLoadingWar===true">
          <div class="warcabyHeader" @click="toogleWarcabyTable">
            <ul>Warcaby</ul> 
            <span :class="iconDownArrow">expand_more</span>
          </div>
          <base-loading-spinner v-if="warcabyTable === true"></base-loading-spinner>
        </div>
      <div v-if="getIsLoadingStat===false">
        <div class="showStatkiTable">
          <div  v-if="statkiTable===false" class="statkiHeader" @click="toogleStatkiTable">
            <ul>Statki</ul> 
            <span :class="iconUpArrow">expand_less</span>
          </div>
          <table v-if="statkiTable===false">
            <tr class="statkiList"><td>Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
            <tr class="statkiList"
              v-for="( s, index ) in currentPage('statki')" :key="index">
              <td>{{ getStatki[s].rank }}</td><td>{{ getStatki[s].name }}</td><td>{{ getStatki[s].surname }}</td><td>{{ getStatki[s].points }}</td>    
            </tr>
            <tr :style="{height: dynamicHeightS + 'px'}"></tr>
          </table>
          <div class="buttons" v-if="statkiTable===false">
                <base-small-button @click="previousPageS" :disabled="pageNr('S') === 1">Poprzednia</base-small-button>
                <base-small-button @click="nextPageS" :disabled="pageNr('S') === allPages('S')">Następna</base-small-button>
              </div>
        </div>
      <div class="statkiHiddenHeader" v-if="statkiTable===true" @click="toogleStatkiTable">
        <ul>Statki</ul> 
        <span :class="iconUpArrow">expand_more</span>
      </div>
    </div>
      <div v-if="getIsLoadingStat===true">
        <div class="statkiHeader" @click="toogleStatki4Table">
          <ul>Statki</ul> 
          <span :class="iconDownArrow">expand_more</span>
        </div>
        <base-loading-spinner v-if="statkiTable === true"></base-loading-spinner>
      </div>
    </div>
      <div v-if="getIsLoadingPol===false">
          <div class="showPolacz4Table">
            <div  v-if="polacz4Table===false" class="polacz4Header" @click="tooglePolacz4Table">
              <ul>Polacz 4</ul> 
              <span :class="iconUpArrow">expand_less</span>
            </div>
            <table v-if="polacz4Table===false">
              <tr><td>Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
              <tbody>
                <tr
                  v-for="( p, index ) in currentPage('polacz4')" :key="index">
                  <td>{{ getPolacz4[p].rank }}</td><td>{{ getPolacz4[p].name }}</td><td>{{ getPolacz4[p].surname }}</td><td>{{ getPolacz4[p].points }}</td>    
                </tr>
                <tr :style="{height: dynamicHeightP + 'px'}"></tr>
              </tbody>
              </table>
            <div class="buttons" v-if="polacz4Table===false">
                <base-small-button @click="previousPageP" :disabled="pageNr('P') === 1">Poprzednia</base-small-button>
                <base-small-button @click="nextPageP" :disabled="pageNr('P') === allPages('P')">Następna</base-small-button>
              </div>
          </div>
          <div class="polacz4HiddenHeader" v-if="polacz4Table===true" @click="tooglePolacz4Table">
            <ul>Polacz 4</ul> 
            <span :class="iconUpArrow">expand_more</span>
          </div>
        </div>
        <div v-if="getIsLoadingPol===true">
          <div class="polacz4Header" @click="tooglePolacz4Table">
            <ul>Polacz 4</ul> 
            <span :class="iconDownArrow">expand_more</span>
          </div>
            <base-loading-spinner v-if="polacz4Table === true"></base-loading-spinner>
        </div>
      </div>
    </div>
  </base-page-layout>
</template>
  
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import BaseSmallButton from '@/components/base/BaseSmallButton.vue';

export default {
  components:{
      BasePageLayout,
      BaseLoadingSpinner,
      BaseSmallButton
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
        console.log(this.dynamicHeight, 'aaaaaaaaaaaa')
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
      console.log('page')
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
        console.log('war', this.getWarcaby)
        return Math.ceil(Object.keys(this.getWarcaby).length / this.getItemsPerPage);
      }
      if (info === 'S'){
        console.log('stat')
        return Math.ceil(Object.keys(this.getStatki).length / this.getItemsPerPage);
      }
      if (info === 'P'){
        console.log('pol')
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
.mainDescription{
    justify-content: center;
    margin-left: 50px;
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
    width: auto;
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
/*
.empty-space{
  background-color: white;
  width: 800px;
  margin: 0px;
} */
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
</style>
  