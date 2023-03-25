<template>
  <div :class="$style.content">
    <the-header></the-header>
    <div :class="$style.page">
      <img src="../assets/dice.png">
      <div :class="$style.text">
        <p :class="$style.h1">Najlepsza w Polsce internetowa platforma z grami planszowymi online.</p>
        <p :class="$style.h2">Zagraj ze znajomymi już dziś</p>
        <base-button type="dark-large" @click="register" :class="$style.button">Zarejestruj się</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheMainPage/TheHeader.vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default {
  components: {
    TheHeader,
    BaseButton
  },
  methods: {
    register() {
      this.$router.push({name: 'signup'});
    }
  }
}
</script>

<style module>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.text {
  width: 825px;
  padding:50px;
}

.h1 {
  color: #FBF5F3;
  font-size: 48px;
  font-weight: bold;
}

.h2 {
  color: #FBF5F3;
  font-size: 24px;
  margin-top:50px;
  font-weight: bold;
}

.button {
  margin-top: 50px;
}
</style>