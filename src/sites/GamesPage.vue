<template>
  <div class="container">
     <div class="leftPanel">
      <left-panel></left-panel>
    </div>
    <div class="content">
      <h1 class="mainDescription">Wybierz grę.</h1>
      <table class="gamesContainer">
        <th>
          <td class="warcabyGame">
            <RouterLink :to="{ name: 'warcabydescription'}">
              <div class="warcabyImage"><p class="gameName">WARCABY</p></div>
              <p class="warcabyDescription">Popularna gra planszowa dla każdego.</p>
            </RouterLink>
          </td>
          <td class="statkiGame">
            <RouterLink :to="{ name: 'statkidescription'}">
              <div class="statkiImage"><p class="gameName">STATKI</p></div>
              <p class="statkiDescription">Wygraj z przeciwnikiem strącając statki z jego plaszy.</p>          
           </RouterLink>
          </td>
          <td class="polacz4Game">
            <RouterLink :to="{ name: 'polacz4description'}">
              <div class="polacz4Image"><p class="gameName">POŁĄCZ 4</p></div>
              <p class="polacz4Description">Połącz 4 piłki układając stos.</p>          
            </RouterLink>
          </td>
        </th>
      </table>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'; 
import LeftPanel from '@/components/base/LeftPanel.vue';
  
export default {
  components:{
    RouterLink,
    LeftPanel
  }
}
</script>
  
<style scoped>
a, p{
    text-decoration: none;
}
.container{
  display: flex;
  }
.mainDescription{
  background-color: transparent;
  color: white;
  font-size: 32px;
  margin: 30px;
}
.content{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin:30px;
}
.gamesContainer{
  background-color: transparent;
  border-spacing: 20px;
}
td{
  border: 1px;
  width: 200px;
  height: 230px;
  margin: 0px 0px 0px 20px;
  vertical-align: top;
}
.warcabyImage{
  display: block;
  width:200px;
  height:200px;
  margin-top: 0px;
  background-image: url('@/Games/image/warcaby.png');
  background-size: cover;
}
.warcabyDescription{
  background-color: white;
  color: black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-decoration: none;
}
.statkiImage{
  display: block;
  width:200px;
  height:200px;
  margin-top: 0px;
  background-image: url('@/Games/image/statki.png');
  background-size: cover;
}
.statkiDescription{
  background-color: white;
  color: black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-family: Poppins;
  text-decoration: none;
}
.polacz4Image{
  display: block;
  margin-top: 0px;
  width:200px;
  height:200px;
  background-image: url('@/Games/image/polacz4.png'); 
  background-size: cover;
}
.polacz4Description{
  background-color: white;
  color: black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-family: Poppins;
  text-decoration: none;
}
.gameName{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 26px;
}
  </style>
  