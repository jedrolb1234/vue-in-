<template>
    <span :class="nextArrow" ref="delete">close</span>
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
  background-color: rgb(255, 67, 67);
  font-size: 22px;
  width: 23px;
  height: 22px;
  padding: 1px;
  cursor: default;
  margin: 5px 0px 0px 0px;
  border-radius: 3px;
}
.icon:hover{
  cursor: pointer;
  background-color: rgb(207, 2, 2);
}
</style>