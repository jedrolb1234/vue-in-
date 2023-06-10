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

export default {
  components: {
    LeftPanel,
    BaseNotificationList
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
  /* margin-right: 30px; */
  padding:30px;
  overflow: auto;
  overflow-x: auto;
}
</style>