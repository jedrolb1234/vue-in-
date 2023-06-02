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