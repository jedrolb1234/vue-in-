<template>
  <div :class="$style.container">
    <slot></slot>

  </div>
</template>

<script>
export default {}
</script>

<style module>
  .container {
    width: 540px;
    background-color: black;
    color:white;
    box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding:20px 35px 20px 35px;
  }
</style>