<template>
  <div class="games__search-bar">
    <input type="text" placeholder="Szukaj" v-model.trim="this.query" @keydown="this.resetTimeout()"
      @keyup="this.searchGames()" />
    <div class="games__search-bar__icon"><span class="material-symbols-outlined">
        search
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchFunction'],
  data() {
    return {
      searchTimeout: null,
      query: null
    }
  },
  methods: {
    resetTimeout() {
      clearTimeout(this.searchTimeout);
    },
    searchGames() {
      this.searchTimeout = setTimeout(this.searchFunction.bind(null, this.query), 300);
    }
  }
}
</script>

<style scoped>
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
</style>