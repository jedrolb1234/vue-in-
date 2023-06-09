<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>Gry</BaseHeader>
      <div class="favourite-games">
        <h1>Ulubione gry</h1>
        <hr>
        <div class="favourite-games__items">
          <div class="favourite-games__items__item">Warcaby</div>
          <div class="favourite-games__items__item">Statki</div>
          <div class="favourite-games__items__item">Połącz 4</div>
          <div class="favourite-games__items__item">Placeholder</div>
          <div class="favourite-games__items__item">Placeholder</div>
        </div>
      </div>
      <div class="games">
        <h1>Wszystkie gry</h1>
        <hr>
        <div class="games__items">
          <GameItem v-for="game in this.getGames" :key="game.id" class="games__items__item" :game="game" @click="redirect(game.link)"></GameItem>
        </div>
      </div>
    </div>
  </BasePageLayout>
</template>

<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue'
import { mapGetters } from 'vuex';
import GameItem from '@/components/GamesPage/GameItem.vue';

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    GameItem
  },
  computed: {
    ...mapGetters(['getGames'])
  },
  methods: {
    redirect(link) {
      if(link!=null) 
        this.$router.push(link);
    }
  }
}
</script>
  
<style scoped>

hr {
  width: 100%;
  border: 1px solid var(--accent);
}

h1 {
  margin-bottom: 5px;
  align-self: flex-start;
}
.page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex-grow: 1;
}

.favourite-games {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.favourite-games__items {
  display: flex;
  width: 100%;
  gap: 15px;
  overflow:auto;
  white-space: nowrap;
  overflow-y: hidden;
  padding-bottom: 15px;
  scroll-snap-type: x mandatory;
}

.favourite-games__items__item {
  flex: 0 0 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border: 2px solid var(--primary);
  scroll-snap-align: start;
}

.games {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  gap:15px;
}

.games__items {
  flex: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 1560px;
  justify-content: center;
  margin-bottom: 30px;
  gap: 30px;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
}
</style>  