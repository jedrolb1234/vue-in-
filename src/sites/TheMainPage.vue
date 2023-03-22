<template>
  <div class="content">
    <the-header></the-header>
    <div>
      <img src="../assets/dice.png">
      <section>
        <h1>Najlepsza w Polsce internetowa platforma z grami planszowymi online.</h1>
        <h2>Zagraj ze znajomymi już dziś</h2>
        <base-button type="dark-large">Zarejestruj się</base-button>
      </section>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheMainPage/TheHeader.vue';
import BaseButton from '@/components/TheMainPage/BaseButton.vue';

export default {
  components: {
    TheHeader,
    BaseButton
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

section {
  width: 825px;
  padding:50px;
}

h1 {
  color: #FBF5F3;
  font-size: 48px;
}

h2 {
  color: #FBF5F3;
  font-size: 24px;
  margin-top:50px;
}

button {
  margin-top: 50px;
}
</style>