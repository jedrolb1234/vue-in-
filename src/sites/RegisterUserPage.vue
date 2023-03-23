<template>
  <div class="content">
    <base-form>
      <form @submit.prevent="register"> 
        <h1>Stwórz konto</h1>
        <base-input type="email" v-model.trim="email" :valid="isEmailValid"></base-input>
        <base-input type="username" v-model.trim="username" :valid="isUsernameValid"></base-input>
        <base-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-input>
        <base-input type="rpassword" v-model.trim="rpassword" :valid="isPasswordValid"></base-input>
        <p v-if="!isFormValid">Wypełnij formularz poprawnymi danymi. Pamiętaj, że hasło musi posiadać minimum 8 znaków oraz powinno zawierać małą i dużą literę, cyfrę oraz znak specjalny.</p>
        <base-button type="green-large">Wyślij</base-button>
        <p>Jeśli posiadasz już konto możesz przejść do formularza logowania</p>
      </form>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default {
  components: {
    BaseForm,
    BaseButton,
    BaseInput
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
  methods: {
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(this.email.match(emailRegex))
        return true;
      this.isFormValid=false;
      this.email='';
      return false;
    },
    validateUsername() {
      if(this.username.length>0) {
        return true
      }
      this.isFormValid=false;
      this.username='';
      return false;
    },
    validatePassword() {
      const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
      if(this.password.match(passwordRegex) && this.password == this.rpassword)
        return true;
      this.isFormValid=false;
      this.password='';
      this.rpassword='';
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
        console.log('VALID!!!');
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
}
</style>