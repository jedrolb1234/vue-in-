<template>
  <div class="container">
    <div class="leftPanel">
        <left-panel></left-panel>
    </div>
    <div class="content">
      <h1 class="mainDescription">Historia gier</h1>                 
        <div v-if="isLoading===false" class="loadingTable">
          <div class="showHistoryTable">
            <ul class="historyHeader">Rozegrane gry</ul> 
            <table>
              <tr class="historyList"><td class="rankNr">gra</td><td>data</td><td>status</td><td>Punkty</td></tr>
              <tr class="historyList"
                v-for="( h, index ) in history" :key="index">
                <td class="rank">{{ h.game }}</td><td>{{ h.date }}</td><td>{{ h.status }}</td><td>{{ h.points }}</td>    
              </tr>
            </table>
          </div>
        <div v-if="isLoading===true" class="loadingTable">
            <ul class="historyHeader">Rozegrane gry</ul> 
          <table>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
            <tr><td>. . .</td><td>. . .</td><td>. . .</td><td>. . .</td></tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
  import LeftPanel from '@/components/base/LeftPanel.vue';
  import { mapGetters } from 'vuex';
  export default {
    components:{
    LeftPanel
    },
    data(){
        return{
          history:{
            1:{
              id:0,
              game: 'warcaby',
              date: '2023-09-01',
              status: 'win',
              points: 100
            },
            2:{
              id:1,
              game: 'warcaby',
              date: '2023-09-01',
              status: 'win',
              points: 100
            },
            3:{
              id:2,
              game: 'warcaby',
              date: '2023-09-01',
              status: 'lose',
              points: 5
            },
            4:{
              id:3,
              game: 'warcaby',
              date: '2023-09-01',
              status: 'win',
              points: 100
            }
          },
          isLoading: false
      }
    },
      computed: {
      ...mapGetters(['isLoading'])
    }
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
.historyHeader
{
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
.polacz4List{
  font-size: 24;
  color: white;
}
  </style>
  