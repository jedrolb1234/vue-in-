<template>
  <div class="container">
    <div class="leftPanel">
        <left-panel></left-panel>
    </div>
    <div class="content">
      <div class="RankContainer">
          <h1 class="mainDescription">Rankingi</h1>                 
        <div> 
          <div v-if="isLoading===false" class="loadingTable">
            <div class="showWarcabyTable">
              <div  v-if="warcabyTable===false" class="warcabyHeader">
              <ul>Warcaby</ul> 
              <span :class="iconUpArrow" @click="toogleWarcabyTable">expand_less</span>
              </div>
              <table v-if="warcabyTable===false"  class="warcabyRank">
                <tr class="warcabyList"><td class="rankNr">Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
                <tr class="warcabyList"
                  v-for="( warcaby, index ) in warcabyRank" :key="index">
                  <td class="rank">{{ warcaby.rank }}</td><td>{{ warcaby.name }}</td><td>{{ warcaby.surname }}</td><td>{{ warcaby.points }}</td>    
                </tr>
              </table>
            </div>
          </div>
          <div class="warcabyHiddenHeader" v-if="warcabyTable===true">
            <ul>Warcaby</ul> 
            <span :class="iconUpArrow" @click="toogleWarcabyTable">expand_more</span>
          </div>
        </div>
        <div v-if="isLoading===true" class="loadingTable">
          <div class="warcabyHeader">
            <ul>Warcaby</ul> 
            <span :class="iconDownArrow" @click="toogleWarcabyTable">expand_more</span>
          </div>
          <table v-if="warcabyTable===false">
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
          </table>
        </div>
      <div v-if="isLoading===false" class="loadingTable">
        <div class="showStatkiTable">
          <div  v-if="statkiTable===false" class="statkiHeader">
          <ul>Statki</ul> 
          <span :class="iconUpArrow" @click="toogleStatkiTable">expand_less</span>
          </div>
          <table v-if="statkiTable===false"  class="statkiRank">
            <tr class="statkiList"><td class="rankNr">Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
            <tr class="statkiList"
              v-for="( warcaby, index ) in warcabyRank" :key="index">
              <td class="rank">{{ warcaby.rank }}</td><td>{{ warcaby.name }}</td><td>{{ warcaby.surname }}</td><td>{{ warcaby.points }}</td>    
            </tr>
          </table>
        </div>
      <div class="statkiHiddenHeader" v-if="statkiTable===true">
        <ul>Statki</ul> 
        <span :class="iconUpArrow" @click="toogleStatkiTable">expand_more</span>
      </div>
    </div>
      <div v-if="isLoading===true" class="loadingTable">
        <div class="statkiHeader">
          <ul>Statki</ul> 
          <span :class="iconDownArrow" @click="toogleStatki4Table">expand_more</span>
        </div>
        <table v-if="statkiTable===false">
          <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
          <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
          <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
        </table>
      </div>
    </div>
      <div v-if="isLoading===false" class="loadingTable">
              <div class="showPolacz4Table">
                <div  v-if="polacz4Table===false" class="polacz4Header">
                <ul>Polacz 4</ul> 
                <span :class="iconUpArrow" @click="tooglePolacz4Table">expand_less</span>
                </div>
                <table v-if="polacz4Table===false"  class="polacz4Rank">
                  <tr class="polacz4List"><td class="rankNr">Pozycja</td><td>Imię</td><td>Nazwisko</td><td>Punkty</td></tr>
                  <tr class="polacz4List"
                    v-for="( warcaby, index ) in warcabyRank" :key="index">
                    <td class="rank">{{ warcaby.rank }}</td><td>{{ warcaby.name }}</td><td>{{ warcaby.surname }}</td><td>{{ warcaby.points }}</td>    
                  </tr>
                </table>
              </div>
            <div class="polacz4HiddenHeader" v-if="polacz4Table===true">
              <ul>Polacz 4</ul> 
              <span :class="iconUpArrow" @click="tooglePolacz4Table">expand_more</span>
            </div>
        </div>
        <div v-if="isLoading===true" class="loadingTable">
          <div class="polacz4Header">
            <ul>Polacz 4</ul> 
            <span :class="iconDownArrow" @click="tooglePolacz4Table">expand_more</span>
          </div>
          <table v-if="polacz4Table===false">
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
          </table>
        </div>
      </div>
  </div>
</template>
  
<script>
import LeftPanel from '@/components/base/LeftPanel.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components:{
      LeftPanel,
  },
  data(){
    return{
      warcabyRank:{
        Andrzej:{
            rank: 1,
            name: 'Andrzej',
            surname: 'Bidermann',
            points: 100
        },
        Tomek:{
            rank: 2,
            name: 'Tomek',
            surname: 'B',
            points: 99
        },
        Rafal:{
            rank: 3,
            name: 'Rafał',
            surname: 'Rafał',
            points: 98
        },
        Daniel:{
            rank: 4,
            name: 'Daniel',
            surname: 'Daniel',
            points: 97
        }
        }
      }
    },
    methods:{
      ...mapActions(['toogleWarcabyTable', 'toogleStatkiTable', 'tooglePolacz4Table'])
    },
  computed: {
    ...mapGetters(['warcabyTable', 'statkiTable', 'polacz4Table', 'isLoading']),
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
  width: 796px;
  height: 40px;
  margin: 0px 0px 0px 2px;
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
  width: 796px;
  height: 40px;
  margin: 0px 0px 0px 2px;
  border-radius: 8px 8px 8px 8px;
}
.statkiHeader,
.polacz4Header,
.statkiHiddenHeader, 
.polacz4HiddenHeader{
  margin-top: 20px;
}
.table{
    display: flex;
    justify-content: center; 
    width: 800px;
    color:black;
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
}
tr{
    border: 1px solid black;
    text-align: left;
    border-radius: 8px;
    width: 800px;
}
tr:last-child{
    border-radius: 0px 0px 8px 8px;
}
td{
    padding: 5px;
    background-color: white;
    width: 200px;
    font-size: 18px;
    color:black;
    margin: 0px 0px 0px 0px;
    border: none;
}
.downArrow{
  font-size: 40px;
  display:flex;
  margin-right: 15px;
}
.downArrow:hover
.upArrow:hover{
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
.warcabyList,
.statkiList,
.polacz4List{
  font-size: 24;
  color: white;
}
  </style>
  