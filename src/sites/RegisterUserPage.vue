<template>
  <div :class="$style.content">
    <base-form>
      <form @submit.prevent="register" :class="$style.form"> 
        <span :class="$style.h1">Stwórz konto</span>
        <base-input type="email" v-model.trim="email" :valid="isEmailValid"></base-input>
        <base-input type="username" v-model.trim="username" :valid="isUsernameValid"></base-input>
        <base-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-input>
        <base-input type="rpassword" v-model.trim="rpassword" :valid="isPasswordValid"></base-input>
        <base-button v-if="!isSending" type="green-large">Wyślij</base-button>
        <base-loading-spinner v-else></base-loading-spinner>
        <span :class="$style.p">Jeśli posiadasz już konto możesz przejść do formularza logowania</span>
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
import inputValidators from '@/mixins/inputValidators';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';

export default {
  mixins: [inputValidators],
  components: {
    BaseForm,
    BaseButton,
    BaseInput,
    BaseNotificationList,
    BaseLoadingSpinner
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
      isPasswordValid: true,
      isSending: false
    }
  },
  computed: {
    ...mapGetters(['getNotificationTemplates'])
  },
  methods: {
    ...mapActions(['showNotification', 'registerUser']),
    validateForm() {
      this.isEmailValid = this.validateEmail(this.email);
      this.isUsernameValid = this.validateUsername(this.username);
      this.isPasswordValid = this.validatePassword(this.password, this.rpassword);
      this.isFormValid = this.validateFormFields([this.isEmailValid, this.isPasswordValid, this.isUsernameValid]);

    },
    async register() {
      this.validateForm();
      if(this.isFormValid) {
        this.isSending=true;
        await this.registerUser({
          email:this.email,
          userName:this.username,
          password:this.password,
          confirmPassword:this.rpassword,
          firstName:'null',
          lastName: 'null'
        });
        this.isSending=false;
      }
      else 
        this.showNotification(this.getNotificationTemplates.registration_form_invalid);
    }
  }
}
</script>

<style module>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
}

.h1 {
  font-weight: bold;
  font-size: xxx-large;
  margin-bottom: 40px;
}

.form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}

.p {
  font-size: medium;
  margin: 0;
  text-align: justify;
  text-justify: inter-word;
}
</style>