<template>
  <nav :class="$style.header">
    <div :class="$style.logo">
      <span :class="iconStyles">stadia_controller</span>
      <span :class="$style.name">Fun House Project</span>
    </div>
    <div :class="$style.block">
      <base-button type="secondary-medium" :class="$style.button" @click="login">Zaloguj</base-button>
      <!-- Zakomentowałerm, żeby na razie uprosćicć logowanie -->
      <!-- <div v-if="popup" :class="$style.popup">
        <form @submit.prevent="register" :class="$style.form">
        <span :class="$style.h1">Logowanie</span>
          <base-small-input type="usernameoremail" v-model.trim="userNameOrEmail" :valid="isUserNameOrEmailValid"></base-small-input>
          <base-small-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-small-input>
          <base-small-button type="green-large" :class="$style.smallbutton">Zaloguj</base-small-button>
        </form>
      </div> -->
    </div>
  </nav>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
//import BaseSmallButton from '../base/BaseSmallButton.vue';
//import BaseSmallInput from '../base/BaseSmallinput.vue';

export default {
  data() {
    return {
      popup: false
    }
  },
  components: {
    BaseButton,
    //BaseSmallButton,
    //BaseSmallInput
  },
  computed: {
    iconStyles() {
      return ['material-symbols-outlined', this.$style.icon].join(' ');
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'login' });
    },
  }
}
</script>

<style module>
.header {
  display: flex;
  color: #262A2C;
  width: 100%;
  background: linear-gradient(270deg, #ACC12F 0%, #D8EC62 50%, #ACC12F 100%);
  /* background: var(--accent); */
  height: 75px;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 150px;
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
  margin-right: auto;
}

.block {
  margin-left: auto;
  margin-right: 150px;
  border-radius: 10px;
}

.form {
  width: auto;
  height: auto;
  background-color: #262A2C;
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: var(--primary);
  padding: 5px 8px 5px 8px;
}

.h1 {
  font-size: large;
  padding: 3px, 0px, 3px, 0px;
}

.popup {
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: 50px;
  background-color: #ACC12F;
  position: absolute;
  top: 60px;
  right: 50px;
  margin-bottom: 175px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
}

.smallbutton {
  margin: 10px 10px 10px 10px;
}</style>