<template>  
  <base-page-layout>
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
                  <tr class="checkersList"><th class="tableButton"></th><th class="tdRank">Pozycja</th><th class="tdNick">Nick</th><th>Punkty</th></tr>
                  <tr class="checkersList"
                    v-for="( w, index ) in getCheckers" :key="index">
                    <td><base-look-button class="invFirstCell" @click="redirect(p.playerId)"></base-look-button></td>
                    <td  class="tdRank">{{ w.rank }}</td>
                    <td class="tdNick">{{ w.userName }}</td>
                    <td>{{ w.points }}</td>    
                  </tr>
                </table>
                <div class="buttons" v-show="checkersTable===false" >
                  <base-previous-button @click="previousPageC" :disable="getCurrentPageChec===0">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageC" :disable="getCurrentPageChec===allPagesC">Następna</base-next-button>
                  <p class="page">{{ pageNrC }}</p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      <div class="battleShipHeader" @click="toogleBattleShipTable">
        <ul>Okręty</ul>
        <span v-if="battleShipTable===false" :class="iconArrow">expand_less</span>
        <span v-else-if="battleShipTable===true" :class="iconArrow">expand_more</span>
      </div>
      <hr class="hr1">    
        <transition name="slideON">
          <div v-if="(battleShipTable === false)">
            <transition name="slideOFF">
              <div v-show="battleShipTable === false" class="tableContainer">
                <table >
                  <tr class="battleShipList"><th class="tableButton"></th><th class="tdRank">Pozycja</th><th class="tdNick">Nick</th><th>Punkty</th></tr>
                  <tbody>
                    <tr class="battleShipList"
                      v-for="( s, index ) in getBattleShip" :key="index">
                      <td class="tableButton"><base-look-button class="invFirstCell" @click="redirect(p.playerId)"></base-look-button></td>
                      <td class="tdRank">{{ s.rank }}</td>
                      <td class="tdNick">{{ s.userName }}</td>
                      <td>{{ s.points }}</td>    
                    </tr>
                  </tbody>
                </table>
                <div class="buttons" v-show="battleShipTable===false">
                  <base-previous-button @click="previosuPageW" :disable="getCurrentPageWar===0">Poprzednia</base-previous-button>
                  <base-next-button @click="nextPageW" :disable="getCurrentPageWar===allPagesW">Następna</base-next-button>
                  <p class="page">{{ pageNrW }}</p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
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
                    <tr><th class="tableButton"></th>
                      <th class="tdRank">Pozycja</th>
                      <th class="tdNick">Nick</th>
                      <th>Punkty</th>
                    </tr>
                    <tbody>
                      <tr
                        v-for="( p, index ) in getConnect4" :key="index">
                        <td class="tableButton"><base-look-button class="invFirstCell" @click="redirect(p.playerId)"></base-look-button></td>
                        <td class="tdRank">{{ p.rank }}</td>
                        <td class="tdNick">{{ p.userName }}</td>
                        <td>{{ p.points }}</td>    
                      </tr>
                      <!-- <tr :style="{height: getDynamicHeightP + 'px'}"></tr> -->
                    </tbody>
                  </table>
                  <div class="buttons" v-show="connect4Table===false">
                    <base-previous-button @click="previousPageC4" :disable="getCurrentPageC4===0">Poprzednia</base-previous-button>
                    <base-next-button @click="nextPageC4" :disable="getCurrentPageC4===allPagesC4">Następna</base-next-button>
                    <p class="page">{{ pageNrC4 }}</p>
                  </div>
                </div>
              </transition>
            </div>
          </transition>
    </div>
  </base-page-layout>
</template>
  
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import BaseNextButton from '@/components/base/BaseNextButton.vue';
import BasePreviousButton from '@/components/base/BasePreviousButton.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseLookButton from'@/components/base/BaseLookButton.vue';

export default {
  components:{
      BasePageLayout,
      BaseNextButton,
      BasePreviousButton,
      BaseHeader,
      BaseLookButton
  },
  methods:{
    ...mapActions('Rank', ['toogleCheckersTable', 'toogleBattleShipTable', 'downloadCheckers', 'downloadConnect4',
                            'toogleConnect4Table', 'previousPageC', 'nextPageC', 'downloadBattleShip',
                            'previosuPageW', 'nextPageW', 'previousPageC4', 'nextPageC4']),  
    redirect(id){
      return this.$router.push({
        name: 'uhp',
        params: { id: id },
        }); 
      }
  },  
  computed: {
    ...mapGetters('Rank', [ 'checkersTable',
                'battleShipTable', 
                'connect4Table', 
                'getCheckers', 
                'getItemsPerPage', 
                'getBattleShip', 
                'getConnect4', 
                'getCurrentPageC4', 
                'getCurrentPageWar', 
                'getCurrentPageChec',
                'pageNrC',  
                'pageNrW', 
                'pageNrC4',
                'allPagesC', 
                'allPagesW', 
                'allPagesC4']),
    iconDownArrow(){
      return ['material-symbols-outlined', 'downArrow'].join(' ');
    },
    iconArrow(){
      return ['material-symbols-outlined', 'upArrow'].join(' ');
    },
  },
  async mounted(){
    await this.downloadCheckers(0);
    await this.downloadBattleShip(1);
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
.battleShipHeader,
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
.battleShipHeader:hover,
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
  width: 100px;
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
.tableButton{
    width: 75px;
    padding-left: 15px;
}
.tdRank{
  width: 75px;
}
.tdNick{
  width: 450px;
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
  