<template>  
  <base-page-layout>
  <!-- <div v-if="checkersTable === true || warShipTable === true || connect4Table === true" class="right-strap"></div> -->
    <div class="container">
      <BaseHeader>Rankingi</BaseHeader>
      <div class="checkersHeader" @click="toogleCheckersTable">      
        <ul>Warcaby</ul> 
        <span v-if="checkersTable===false" :class="iconArrow">expand_less</span>
        <span v-else-if="checkersTable===true" :class="iconArrow">expand_more</span>
      </div>

      <hr class="hr1">    
        <transition name="slideON">
          <div class="test" v-if=" (checkersTable === false)">
            <transition name="slideOFF">
              <div v-show="checkersTable===false" class="tableContainer">
                <table>
                  <tr class="checkersList"><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tr class="checkersList"
                    v-for="( w, index ) in getCheckers" :key="index">
                    <td class="">{{ w.rank }}</td><td>{{ w.userName }}</td><td>{{ }}</td><td>{{ w.points }}</td>    
                  </tr>
                  <!-- <tr :style="{height: getDynamicHeightW + 'px'}"></tr> -->
                </table>
                <div class="buttons" v-show="checkersTable===false">
                  <base-previous-button @click="previousPageW">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageW">Następna</base-next-button>
                  <p class="page">{{ pageNrW }}</p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      
        <!-- <transition name="slideON">
          <div v-if="(checkersTable === false)">
              <table class="tableSlideOn">
                <tr class="checkersList"><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
                <tr class="checkersList"
                  v-for="( w, index ) in getCheckers" :key="index">
                  <td class="">{{ w.rank }}</td><td>{{ w.userName }}</td><td>{{ w.surname }}</td><td>{{ w.points }}</td>    
                </tr>
                <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
              </table>
          </div>
        </transition> -->
      <div class="warShipHeader" @click="toogleWarShipTable">
        <ul>Statki</ul>
        <span v-if="warShipTable===false" :class="iconArrow">expand_less</span>
        <span v-else-if="warShipTable===true" :class="iconArrow">expand_more</span>
      </div>
      <hr class="hr1">    
        <transition name="slideON">
          <div v-if="(warShipTable === false)">
            <transition name="slideOFF">
              <div v-show="warShipTable === false" class="tableContainer">
                <table >
                  <tr class="warShipList"><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tbody>
                    <tr class="warShipList"
                      v-for="( s, index ) in getWarShip" :key="index">
                      <td>{{ s.rank }}</td><td>{{ s.userName }}</td><td>{{  }}</td><td>{{ s.points }}</td>    
                    </tr>
                    <!-- <tr :style="{height: getDynamicHeightS + 'px'}"></tr> -->
                  </tbody>
                </table>
                <div class="buttons" v-show="warShipTable===false">
                  <base-previous-button @click="previousPageS">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageS">Następna</base-next-button>
                  <p class="page">{{ pageNrS }}</p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      
        <!-- <transition name="slideON">
          <div v-if="(warShipTable === false)">
              <table class="tableSlideOn">
                  <tr class="warShipList"><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
                  <tr class="warShipList"
                    v-for="( s, index ) in getWarShip" :key="index">
                    <td>{{ s.rank }}</td><td>{{ s.userName }}</td><td>{{ s.surname }}</td><td>{{ s.points }}</td>    
                  </tr>
                  <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
              </table>
          </div>
        </transition> -->

      <div class="connect4Header" @click="toogleConnect4Table">
          <ul>Połącz 4</ul> 
          <span v-if="connect4Table===false" :class="iconArrow">expand_less</span>
          <span v-else-if="connect4Table===true" :class="iconArrow">expand_more</span>
        </div>
      <hr class="hr1">    
          <transition name="slideON">
            <div v-if="(connect4Table === false)">
              <transition name="slideOFF">
                <div v-show="connect4Table === false" class="tableContainer">
                  <table>
                    <tr><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
                    <tbody>
                      <tr
                        v-for="( p, index ) in getConnect4" :key="index">
                        <td>{{ p.rank }}</td><td>{{ p.userName }}</td><td>{{  }}</td><td>{{ p.points }}</td>    
                      </tr>
                      <!-- <tr :style="{height: getDynamicHeightP + 'px'}"></tr> -->
                    </tbody>
                  </table>
                  <div class="buttons" v-show="connect4Table===false">
                    <base-previous-button @click="previousPageP">Poprzednia</base-previous-button>
                    <base-next-button @click="nextPageP">Następna</base-next-button>
                    <p class="page">{{ pageNrP }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </transition>

      <!-- <div v-if="(connect4Table === false)">
        <table class="tableSlideOn">
            <tr class="connect4List"><th>Pozycja</th><th>Nick</th><th>Nazwisko</th><th>Punkty</th></tr>
            <tr v-for="( p, index ) in getConnect4" :key="index">
                <td>{{ p.rank }}</td><td>{{ p.userName }}</td><td>{{ p.surname }}</td><td>{{ p.points }}</td>    
              </tr>
            <tr><td class="loadingSpinner" colspan="4"><base-loading-spinner></base-loading-spinner></td></tr>
        </table>
      </div> -->
    </div>
  </base-page-layout>
</template>
  
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import BaseNextButton from '@/components/base/BaseNextButton.vue'
import BasePreviousButton from '@/components/base/BasePreviousButton.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'


export default {
  components:{
      BasePageLayout,
      BaseNextButton,
      BasePreviousButton,
      BaseHeader
  },
  methods:{
    ...mapActions('Rank', ['toogleCheckersTable', 'toogleWarShipTable', 'downloadCheckers', 'downloadConnect4',
                            'toogleConnect4Table', 'previousPageW', 'nextPageW', 'downloadWarShip',
                            'previousPageS', 'nextPageS', 'previousPageP', 'nextPageP']),  

  },  
  computed: {
    ...mapGetters('Rank', [ 'checkersTable','warShipTable', 'connect4Table', 'getCheckers', 'getItemsPerPage', 
                  'getWarShip', 'getConnect4', 'getCurrentPagePol', 'getCurrentPageStat', 'getCurrentPageWar',
                  'getIsLoadingWar', 'getIsLoadingStat', 'getIsLoadingPol', 'pageNrW',  'pageNrS', 'pageNrP',
                  'currentPageW', 'currentPageS', 'currentPageP', 'allPagesW', 'allPagesS',
                  'allPagesP', 'getDynamicHeightP', 'getDynamicHeightS', 'getDynamicHeightW']),
    iconDownArrow(){
      return ['material-symbols-outlined', 'downArrow'].join(' ');
    },
    iconArrow(){
      return ['material-symbols-outlined', 'upArrow'].join(' ');
    },
  },
  async mounted(){
    await this.downloadCheckers(0);
    await this.downloadWarShip(1);
    await this.downloadConnect4(2);
  }
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

.checkersHeader,
.warShipHeader,
.connect4Header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: var(--secondary);
  width: 100%;
  height: 40px;
  margin: 20px 0px 0px 20px;
  border-radius: 8px 8px 0px 0px;
  font-weight: bold;
  /* position: sticky; */
}
.checkersHeader{
  margin-top: 50px;
}
.checkersHeader:hover,
.warShipHeader:hover,
.connect4Header:hover{
  cursor:pointer;
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
  width: 200px;
  max-height: 28px;
  font-size: 18px;
  font-weight: 400;
  color:var(--primary);
  margin: 0px 0px 0px 0px;
  border: none;
}
th{
  background-color: var(--accent);
  color: var(--table-header-color)
}
tr:nth-child(odd){
  background-color: var(--primaryBtn);
}

.downArrow,
.upArrow{
  font-size: 40px;
  display:flex;
  height: 30px;
  padding-right: 30px;

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
  