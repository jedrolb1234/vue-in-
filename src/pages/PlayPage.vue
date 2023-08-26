<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>
        {{ getGameName }}
      </BaseHeader>
      <div class="board">
        <component :is="this.games[this.getSelectedGameRoom.gameTypeId]"></component>
        <SideGamePanel>
        </SideGamePanel>
      </div>
    </div>
  </BasePageLayout>
</template>

<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import ConnectFourGame from '@/components/games/ConnectFourGame.vue';
import CheckersGame from '@/components/games/CheckersGame.vue';
import BattleShipsGame from '@/components/games/BattleShipsGame.vue';
import SideGamePanel from '@/components/games/SideGamePanel.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    ConnectFourGame,
    SideGamePanel,
    CheckersGame,
    BattleShipsGame
  },
  data() {
    return {
      games: ['CheckersGame', 'BattleShipsGame', 'ConnectFourGame']
    }
  },
  props: ['gameRoomID'],
  methods: {
    ...mapActions(['obtainGameRoom', 'resetGameCoonectFour']),
  },
  computed: {
    ...mapGetters(['getUserId', 'getGame', 'getSelectedGameRoom']),
    getGameName() {
      if (this.getSelectedGameRoom.gameTypeId != undefined) {
        const gameInfo = this.getGame(this.getSelectedGameRoom.gameTypeId);
        return gameInfo.name;
      }
      return null;
    }
  },
  async mounted() {
    await this.obtainGameRoom(this.gameRoomID);
    await this.$callHub.start();
    await this.$callHub.client.invoke('ConnectToGameRoom', this.gameRoomID, this.getUserId)
  },
  async unmounted() {
    await this.$callHub.client.invoke('DisconnectFromGameRoom', this.gameRoomID, this.getUserId)
    await this.$callHub.stop();

  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
}

.board {
  justify-content: center;
  display: flex;
  flex-direction: row;
}
</style>