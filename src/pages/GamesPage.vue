<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>Gry</BaseHeader>
      <!-- <div class="favourite-games">
        <h1>Ulubione gry</h1>
        <hr>
        <div class="favourite-games__items">
          <TransitionGroup name="games">
            <GameItem v-for="game in this.getFavoriteGames" :key="game.id" class="games__items__item" :game="game"
              @click="redirect(game.link)"></GameItem>
          </TransitionGroup>
          <div v-if="this.getFavoriteGames.length <= 0">
          <h1>Dodaj swoją ulubioną grę klikając serduszko!</h1>
        </div>
        </div>
        
      </div> -->
      <div class="games">
        <div class="games__header">
          <h1>Wszystkie gry</h1>
          <div class="games__actions">
            <BaseSearchInput :searchFunction="this.filterGames" fontSize="20px"></BaseSearchInput>
          </div>
        </div>
        <hr>
        <div class="games__items">
          <TransitionGroup name="games">
            <GameItem v-for="game in this.filteredGames" :key="game.id" class="games__items__item" :game="game"
              @click="redirect(game.link)"></GameItem>
          </TransitionGroup>
        </div>
        <div v-if="this.filteredGames.length <= 0">
          <h1>Nie znaleziono żadnej gry!</h1>
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
import BaseSearchInput from '@/components/base/BaseSearchInput.vue';

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    GameItem,
    BaseSearchInput
},
  data() {
    return {
      filteredGames: [],
    }
  },
  computed: {
    ...mapGetters(['getGames', 'getFavoriteGames', 'getStateTheme', 'getTheme'])
  },
  methods: {
    redirect(link) {
      if (link != null)
        this.$router.push(link);
    },
    filterGames(query) {
      this.filteredGames = this.getGames.filter(game => game.name.toUpperCase().includes(query.toUpperCase()));
    },
  },
  created() {
    this.filteredGames = this.getGames;
  }
}
</script>
  
<style scoped>
hr {
  width: 100%;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
}

h1 {
  margin-bottom: 5px;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex-grow: 1;
  width: 100%;
}

.favourite-games {
  display: flex;
  flex-direction: column;
}

.favourite-games__items {
  position: relative;
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  max-width: 100%;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin: auto;
}

.games {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}

.games__items {
  position: relative;
  flex: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 500px);
  width: 100%;
  margin-bottom: 30px;
  gap: 30px;
  justify-content: center;
  padding-top: 15px;
}

.games__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.games__actions {
  display: flex;
  align-items: center;
}

.games-move,
.games-enter-active,
.games-leave-active {
  transition: all 0.3s ease;
}

.games-enter-from,
.games-leave-to {
  opacity: 0;
  grid-column: 1;
  grid-row:1;
}

.games-leave-active {
  position: absolute;
}
</style>  