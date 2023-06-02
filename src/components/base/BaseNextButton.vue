<template>
      <span :class="nextArrow" ref="arrowRef">arrow_forward</span>
  </template>
  
  <script>
export default {
  computed:{
    nextArrow() {
      return ['material-symbols-outlined', this.$style.icon].join(' ');
    }
  }
}
  </script>
  
<style module>
.icon{
    font-size: 22px;
    width: 26px;
    height: 26px;
    cursor: default;
    margin-top: 5px;
}
.icon:hover{
    cursor: pointer;
}
 </style>