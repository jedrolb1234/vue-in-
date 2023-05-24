<template>
      <span :class="previousArrow" ref="arrowRef">arrow_back</span>
  </template>
  
  <script>
export default {
  computed:{
    previousArrow() {
        console
      return ['material-symbols-outlined', this.$style.icon].join(' ');
    }
  }
}
  </script>
  
  <style module>
.icon{
    padding: 8px 10px 8px 10px;
    font-size: 22px;
    width: 26px;
    height: 26px;
    cursor: default;
}
.icon:hover{
    cursor: pointer;
}
 </style>