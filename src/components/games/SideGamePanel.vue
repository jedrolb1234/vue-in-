<template>
  <div class="panel">
    <div class="panel__title">
      <span>Pokój gracza {{ getUsername }}</span>
      <span class="material-symbols-outlined">
        edit
      </span>
    </div>
    <div class="panel__players">
      <p>Gracze</p>
      <div>
        <span>User1</span> <span class="material-symbols-outlined">
          block
        </span><span class="material-symbols-outlined">
          diamond
        </span>
      </div>
      <div>
        <span>User2</span><span class="material-symbols-outlined">
          block
        </span>
      </div>

    </div>
    <ul>
      <li>Przebieg gry</li>
      <li>Zaproś znajomych</li>
      <li>Ustawienia</li>
    </ul>
    <button>Rozpocznij grę</button>
    <button>Zamknij pokój</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getUsername']),
  }
}
</script>

<style scoped>
.panel {
  border: 1px solid var(--primary);
  padding: 10px;
  background-color: var(--secondaryBtn);
}
</style>