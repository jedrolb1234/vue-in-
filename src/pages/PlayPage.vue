<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>
        Test
      </BaseHeader>
      <div class="board">
        <component :is="'connectFour'"></component>
      <SideGamePanel>

      </SideGamePanel>
      </div>
    </div>
  </BasePageLayout>
</template>

<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue'
import connectFour from '@/components/games/connectFour.vue'
import SideGamePanel from '@/components/games/SideGamePanel.vue'

export default {
  components: {
    BasePageLayout,
    BaseHeader,
    connectFour,
    SideGamePanel
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width:100%;
  gap: 30px;
}

.board {
  justify-content: center;
  display: flex;
  flex-direction: row;
}
</style>