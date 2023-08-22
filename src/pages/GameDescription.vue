<template>
  <BasePageLayout>
    <div class="game">
      <BaseHeader>
        {{ getGame(gameid).name }}
      </BaseHeader>
      <div class="description">
        {{ getGame(gameid).description }}
      </div>
      <div class="img">
        <img :src="this.getGame(this.gameid).imgLarge" />
      </div>
      <div class="action-bar">
        <BaseButton type="primary-large" @click="this.isGameRoomModalVisible=true">Zagraj ze znajomymi</BaseButton>
        <!-- <RouterLink :to="this.getGame(this.gameid).play">
          <BaseButton type="secondary-large">Kolejka rankingowa</BaseButton>
        </RouterLink> -->
      </div>
      <div class="rules">
        <h1>Zasady gry</h1>
        <hr>
        <ul>
          <li v-for="(rule, index) in getGame(gameid).rules" :key="index">{{ rule }}</li>
        </ul>
      </div>
    </div>
  </BasePageLayout>
  <Teleport to="body"><GameRoomModal v-if="this.isGameRoomModalVisible" @close-modal="this.isGameRoomModalVisible=false" :game-id="this.gameid"></GameRoomModal></Teleport>
</template>

<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue'
import { mapGetters } from 'vuex';
import BaseButton from '@/components/base/BaseButton.vue';
// import { RouterLink } from 'vue-router';
import GameRoomModal from '@/components/TheGameDescriptionPage/GameRoomModal.vue';

export default {
  props: ['gameid'],
  data() {
    return {
      isGameRoomModalVisible: false
    }
  },
  components: {
    BasePageLayout,
    BaseHeader,
    BaseButton,
    // RouterLink,
    GameRoomModal
},
  computed: {
    ...mapGetters(['getGame'])
  }
}
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: justify;
}

.description {
  display: flex;
  gap: 30px;
}

.img {
  display: flex;
  justify-content: center;
}

.img>img {
  border: 1px solid var(--primary);
  width: max(500px, 50%);
}

.description__text {
  display: flex;
  align-items: center;
}

hr {
  border: 1px solid var(--accent);
  width: 100%;
}

.action-bar {
  display: flex;
  position: relative;
  justify-content: center;
  padding: 15px;
  gap: 30px;
}

.action-bar::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--primary);
  opacity: 0.1;
  z-index: -1;
}

ul {
  margin-bottom: 30px;
}

h1 {
  margin: 0px;
}
</style>