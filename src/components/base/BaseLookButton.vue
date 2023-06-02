<template>
    <span :class="nextArrow" ref="magnifier">search</span>
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
  background-color: rgb(0, 151, 0);
  font-size: 22px;
  width: 22px;
  height: 22px;
  cursor: default;
  margin: 5px 0px 0px 0px;
  border-radius: 3px;
}
.icon:hover{
  cursor: pointer;
  background-color: rgb(2, 230, 2);
}
</style>