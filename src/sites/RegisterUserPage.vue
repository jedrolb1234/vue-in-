<template>
  <div class="content">
    <base-form>
      <form @submit.prevent="register"> 
        <h1>Stwórz konto</h1>
        <base-input type="email" v-model.trim="email" :valid="isEmailValid"></base-input>
        <base-input type="username" v-model.trim="username" :valid="isUsernameValid"></base-input>
        <base-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-input>
        <base-input type="rpassword" v-model.trim="rpassword" :valid="isPasswordValid"></base-input>
        <base-button type="green-large">Wyślij</base-button>
        <p>Jeśli posiadasz już konto możesz przejść do formularza logowania</p>
      </form>
    </base-form>
  </div>
  <base-notification-list></base-notification-list>
</template>

<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    BaseForm,
    BaseButton,
    BaseInput,
    BaseNotificationList
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      rpassword: '',
      isFormValid: true,
      isEmailValid: true,
      isUsernameValid: true,
      isPasswordValid: true
    }
  },
  computed: {
    ...mapGetters(['getNotificationTemplates'])
  },
  methods: {
    ...mapActions(['showNotification']),
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(this.email.match(emailRegex))
        return true;
      this.isFormValid=false;
      return false;
    },
    validateUsername() {
      if(this.username.length>0) {
        return true
      }
      this.isFormValid=false;
      return false;
    },
    validatePassword() {
      const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
      if(this.password.match(passwordRegex) && this.password == this.rpassword)
        return true;
      this.isFormValid=false;
      return false;
    },
    validateForm() {
      this.isFormValid=true;
      this.isEmailValid = this.validateEmail();
      this.isUsernameValid = this.validateUsername();
      this.isPasswordValid = this.validatePassword();

    },
    register() {
      this.validateForm();
      if(this.isFormValid)
        this.showNotification(this.getNotificationTemplates.account_created);
      else 
      this.showNotification(this.getNotificationTemplates.registration_form_invalid);
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
}

h1 {
  font-weight: bold;
  font-size: xxx-large;
  margin-bottom: 40px;
}

form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: medium;
  margin: 0;
  text-align: justify;
  text-justify: inter-word;
}
</style>