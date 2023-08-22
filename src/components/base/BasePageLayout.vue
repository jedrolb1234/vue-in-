<template>
  <div id="container">
    <LeftPanel></LeftPanel>
    <div id="content">
      <slot></slot>
    </div>
    <BaseNotificationList></BaseNotificationList>
  </div>
</template>

<script>
import LeftPanel from './LeftPanel.vue';
import BaseNotificationList from './BaseNotificationList.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    LeftPanel,
    BaseNotificationList
  },
  methods: {
    ...mapActions(['downloadTheme', 'downloadSettings'])
  },
  async created() {
    await this.downloadTheme();
    await this.downloadSettings();
  }
}
</script>

<style scoped>
#container {
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
}

#content {
  display: flex;
  flex-grow: 1;
  width: 100%;
  /* margin-right: 30px; */
  padding:30px;
  overflow: auto;
  overflow-x: none;
}
</style>