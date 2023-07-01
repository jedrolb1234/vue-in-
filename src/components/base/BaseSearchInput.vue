<template>
  <div class="games__search-bar" style>
    <input type="text" placeholder="Szukaj" v-model.trim="this.query" @input="this.search()" />
    <div class="games__search-bar__icon"><span class="material-symbols-outlined">
        search
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchFunction', 'fontSize'],
  data() {
    return {
      searchTimeout: null,
      query: null
    }
  },
  methods: {
    search() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(this.searchFunction.bind(null, this.query), 500);
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
  padding: 0.5em;
  color: var(--primary);
  border-right: 0px;
  font-size: v-bind(fontSize);
}

input:focus {
  outline: none;
}

.games__search-bar__icon {
  padding: 0.5em;
  border-top: 1px;
  border-right: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-style: solid;
  border-color: var(--primary);
  display: flex;
  align-items: center;
  font-size: v-bind(fontSize);
}

.games__search-bar:focus-within {
  outline-style: auto;
  outline-width: 5px;
}
</style>