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
        <div class="games__header">
          <h1>Wszystkie gry</h1>
          <div class="games__actions">
            <div class="games__search-bar">
              <input type="text" placeholder="Szukaj" v-model.trim="this.query" @keydown="this.resetTimeout()" @keyup="this.searchGames()"/>
              <div class="games__search-bar__icon"><span class="material-symbols-outlined">
                  search
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="games__items" v-if="this.filteredGames.length>0">
          <GameItem v-for="game in this.filteredGames" :key="game.id" class="games__items__item" :game="game"
            @click="redirect(game.link)"></GameItem>
        </div>
        <div v-else>
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

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    GameItem
  },
  data() {
    return {
      filteredGames: [],
      query: null,
      searchTimeout: null
    }
  },
  computed: {
    ...mapGetters(['getGames'])
  },
  methods: {
    redirect(link) {
      if (link != null)
        this.$router.push(link);
    },
    filterGames(query) {
      this.filteredGames = this.getGames.filter(game => game.name.toUpperCase().includes(query.toUpperCase()));
    },
    resetTimeout() {
      clearTimeout(this.searchTimeout);
    },
    searchGames() {
      this.searchTimeout = setTimeout(this.filterGames.bind(null, this.query), 300);
    }
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
}

h1 {
  margin-bottom: 5px;
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
  overflow: auto;
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
  gap: 15px;
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

.games__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.games__search-bar {
  display: flex;
  flex-direction: row;
}

.games__search-bar input {
  background-color: var(--secondary);
  border: 1px solid var(--primary);
  padding: 10px;
  color: var(--primary);
  border-right: 0px;
  font-size: 20px;
}

input:focus {
  outline: none;
}

.games__search-bar__icon {
  padding: 10px;
  border-top: 1px;
  border-right: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-style: solid;
  border-color: var(--primary);
  display: flex;
  align-items: center;
  font-size: 20px;
}

.games__search-bar:focus-within {
  outline-style: auto;
  outline-width: 5px;
}

.games__actions {
  display: flex;
  align-items: center;
}
</style>  