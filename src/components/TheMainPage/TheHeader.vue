<template>
  <nav :class="$style.header">
    <div :class="$style.logo">
      <span :class="iconStyles">stadia_controller</span>
      <span :class="$style.name">FunHouse</span>
    </div>
      <base-button type="dark-small" :class="$style.button" >Zaloguj</base-button>
  </nav>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  computed: {
    iconStyles() {
      return ['material-symbols-outlined', this.$style.icon].join(' ');
    }
  }
}
</script>

<style module>

.header {
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

.name {
  margin-left: 40px;
  font-size: 36px;
  font-weight: bold;
}

.button {
  margin-left: auto;
  margin-right: 150px;
}

</style>