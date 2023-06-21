<template>
  <base-page-layout>
    <div class="container">
      <base-header>Historia gier</base-header>                 
        <div v-if="isLoading===false">
          <div class="showHistoryTable">
            <h2 class="historyHeader">Rozegrane gry</h2>
            <hr>
            <table>
              <tr class="historyList"><th>gra</th><th>data</th><th>status</th><th>Punkty</th></tr>
              <tr class="historyList"
                v-for="( h, index ) in currentPage" :key="index">
                <td>{{ h.game }}</td><td>{{ h.date }}</td><td>{{ h.status }}</td><td>{{ h.points }}</td>    
              </tr>
              <tr :style="{height: dynamicHeight() + 'px'}"></tr>

            </table>
            <div class="buttons">
              <base-previous-button @click="previousPage"></base-previous-button>
              <base-next-button @click="nextPage"></base-next-button>
              <p class="page">{{ pageNr }}</p>
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
  </base-page-layout>
</template>
  <script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import BaseNextButton from '@/components/base/BaseNextButton.vue'
import BasePreviousButton from '@/components/base/BasePreviousButton.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'
import { mapGetters, mapActions } from 'vuex';
 
  export default {
    components:{
      BasePageLayout,
      BaseLoadingSpinner,
      BaseNextButton,
      BasePreviousButton,
      BaseHeader

    },
    data(){
      return{
        history:{ }
      }
    },
    computed:{
      ...mapGetters('History', ['isLoading', 'currentPage', 'allPages', 'pageNr', 'getHistory',
                                'getCurrentPage', 'getItemsPerPage']),
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
    flex-direction: column;    
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
}
hr {
  width: 900px;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: -40px;
}
.showHistoryTable{
    margin-left: 40px;
    color: var(--secondary);
}
.historyHeader
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary);
  width: 800px;
  height: 40px;
  margin: 40px 0px 0px 0px;
  border-radius: 8px 8px 0px 0px;
  color: var(--primary);
}
table{
    justify-content: center; 
    width: auto;
    color:var(--primary);
    border-collapse: collapse;
    border-radius: 0px 0px 8px 8px;
    border-spacing: 0px;
    background-color: var(--secondary);
    border-color: var(--primary);
    
}
tr{
    border: 1px solid var(--primary);
    text-align: left;
    border-radius: 8px;
    width: 800px;
}
tr:first-child{
    width:60px;
}
tr:last-child{
    width:100px;
}
th{
    width: 160px;
    height: 51px;
    color: var(--primary);
    text-align: center;

}
table:last-child{
    border-radius: 0px 0px 8px 8px;
}
td{
    padding: 5px;
    background-color:var(--secondary);
    width: 200px;
    font-size: 18px;
    color:var(--primary);
    margin: 0px 0px 0px 0px;
   text-align: center;
}
.historyList{
  font-size: 24;
  color:var(--primary);
}
.buttons{
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
  color: var(--primary);
}
.spinner{
  justify-content: center;
  align-items: center;
  margin-left: 350px;
}
.page{
    width: 13px;
    font-size: 22px;
    margin-left: 234px;
    margin-top: 0px;
    margin-right: 0px;
    margin-left: 0px;
    padding: 0px;
}
  </style>
  