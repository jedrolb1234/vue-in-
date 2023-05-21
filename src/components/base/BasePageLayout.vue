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
    height:100%;
  }

  #content {
    background-color: grey;
    border-radius: 30px;
    border: solid 1px black;
    margin: 25px;
    /* flex-grow: 1; */
    width: calc(100% - 50px);
    transition: width 1s ease;
  
  }

  /* #content:hover {
    width: 50%;
  } */

</style>