<template>
  <button :class="$style[type]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style module>
.dark-small {
  height: 45px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: medium;
  color: #FBF5F3;
  background-color: #262A2C;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.dark-small:hover {
  background-color: black;
  cursor: pointer;
}

.dark-large {
  height: 90px;
  padding: 30px 40px 30px 40px;
  font-size: xx-large;
  color: #FBF5F3;
  background-color: #262A2C;
  border-radius: 15px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.dark-large:hover {
  background-color: black;
  cursor: pointer;
}

.green-large {
  padding: 30px 40px 30px 40px;
  font-size: xx-large;
  color: #FBF5F3;
  background-color: #ACC12F;
  border-radius: 15px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.green-large:hover {
  background-color: #c3e40a;
  cursor: pointer;
}
</style>