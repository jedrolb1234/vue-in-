<template>
  <BasePageLayout>
    <div class="game">
      <BaseHeader>
        {{ getGame(gameid).name }}
      </BaseHeader>
      <div class="description">
        {{ getGame(gameid).description }}
      </div>
      <div class="actions">
        <RouterLink :to="this.getGame(this.gameid).play">
        <BaseButton type="green-large">Zagraj</BaseButton>
      </RouterLink>
      </div>
      <div class="rules">
        Zasady
        <p v-for="(rule, index) in getGame(gameid).rules" :key="index">{{ rule }}</p>
      </div>
    </div>

  </BasePageLayout>
</template>

<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue'
import { mapGetters } from 'vuex';
import BaseButton from '@/components/base/BaseButton.vue';
import { RouterLink } from 'vue-router';

export default {
  props: ['gameid'],
  components: {
    BasePageLayout,
    BaseHeader,
    BaseButton,
    RouterLink
},
  computed: {
    ...mapGetters(['getGame'])
  },
  created() {
    console.log(this.getGame(this.gameid));
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
</style>