<template>
  <nav>
    <div class="logo">
      <span class="material-symbols-outlined icon">stadia_controller</span>
      <h1>FunHouse</h1>
    </div>
    <base-button type="dark-small" >Zaloguj</base-button>
  </nav>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  components: {
    BaseButton
  }
}
</script>

<style scoped>

nav {
  display: flex;
  color: #262A2C;
  width: 100%;
  background: linear-gradient(270deg, #ACC12F 0%, #D8EC62 50%, #ACC12F 100%);
  height:75px;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-left:150px;
}
.icon {
  font-size: 75px;
}

h1 {
  margin-left: 40px;
  font-size: 36px;
}

button {
  margin-left: auto;
  margin-right: 150px;
}

</style>