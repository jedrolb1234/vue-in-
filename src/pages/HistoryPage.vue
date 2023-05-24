<template>
  <base-page-layout>
    <div class="container">
      <div class="leftPanel">
          <left-panel></left-panel>
      </div>
      <div class="content">
        <h1 class="mainDescription">Historia gier</h1>                 
          <div v-if="isLoading===false">
            <div class="showHistoryTable">
              <ul class="historyHeader">Rozegrane gry</ul> 
              <table>
                <tr class="historyList"><td>gra</td><td>data</td><td>status</td><td>Punkty</td></tr>
                <tr class="historyList"
                  v-for="( h, index ) in currentPage" :key="index">
                  <td>{{ h.id }}</td><td>{{ h.date }}</td><td>{{ h.status }}</td><td>{{ h.points }}</td>    
                </tr>
                <tr :style="{height: dynamicHeight() + 'px'}"></tr>

              </table>
              <div class="buttons">
                <base-small-button @click="previousPage" :disabled="pageNr === 1">Poprzednia</base-small-button>
                <base-small-button @click="nextPage" :disabled="pageNr === allPages">Następna</base-small-button>
              </div>
            </div>
          </div>
          <div>
            <div v-if="isLoading===true">
              <ul class="historyHeader">Rozegrane gry</ul> 
              <base-loading-spinner class="spinner"></base-loading-spinner>
            </div>
          </div>
        </div>
      </div>
  </base-page-layout>
</template>
  <script>
  import BasePageLayout from '@/components/base/BasePageLayout.vue';
  import BaseSmallButton from '@/components/base/BaseSmallButton.vue';
  import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
  import { mapGetters, mapActions } from 'vuex';
 
  export default {
    components:{
      BasePageLayout,
      BaseSmallButton,
      BaseLoadingSpinner
    },
    data(){
      return{
        history:{ }
      }
    },
    computed:{
      ...mapGetters('History', ['isLoading', 'currentPage', 'allPages', 'pageNr', 'getHistory',
                                'getCurrentPage', 'getItemsPerPage'])
        },
    methods:{
      ...mapActions('History', ['previousPage', 'nextPage']),
      dynamicHeight(){
            let startIndex = (this.getCurrentPage - 1) * this.getItemsPerPage;
            let endIndex = startIndex + this.getItemsPerPage;
            let sliced = this.getHistory.slice(startIndex, endIndex);           
            return (10 - sliced.length ) * 38;
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
.historyHeader
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  background-color: white;
  width: 800px;
  height: 40px;
  margin: 0px 0px 0px 1px;
  border-radius: 8px 8px 0px 0px;
}
table{
    justify-content: center; 
    width: auto;
    color:black;
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    border-spacing: 0px;
    background-color: white;
    
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
}
.historyList{
  font-size: 24;
  color: white;
}
.buttons{
  display: flex;
  flex-direction: row;
}
.spinner{
  justify-content: center;
  align-items: center;
  margin-left: 350px;
}
  </style>
  