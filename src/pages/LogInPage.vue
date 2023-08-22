<template>
  <div class="content">
    <base-form>
      <form @submit.prevent="logIn">
        <h1>Formularz logowania</h1>
        <base-input type="email" v-model.trim="email" :valid="isEmailValid" :disabled="isSending"></base-input>
        <base-input type="password" v-model.trim="password" :valid="isPasswordValid" :disabled="isSending"></base-input>
        <base-button v-if="!isSending" type="primary-large">Zaloguj</base-button>
        <base-loading-spinner v-else></base-loading-spinner>
        <div>
          <p>Jeśli nie posiadasz jeszcze konta możesz przejść do <RouterLink :to="{ name: 'signup' }">formularza rejestracji
            </RouterLink>.</p>
          <p>Jeśli nie pamiętasz hasła możesz przejść do <RouterLink :to="{ name: 'resetpassword' }">formularza zmiany hasła
            </RouterLink>.</p>
        </div>
      </form>
    </base-form>
  </div>
  <base-notification-list></base-notification-list>
</template>
  
<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import { mapActions, mapGetters } from 'vuex';
import InputValidators from '@/mixins/inputValidators';
import { RouterLink } from 'vue-router';

export default {
  mixins: [InputValidators],
  components: {
    BaseForm,
    BaseButton,
    BaseInput,
    BaseNotificationList,
    BaseLoadingSpinner,
    RouterLink
  },
  data() {
    return {
      email: '',
      password: '',
      isFormValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isSending: false
    }
  },
  computed: {
    ...mapGetters(['getNotificationTemplates'])
  },
  methods: {
    ...mapActions(['showNotification', 'loginUser']),
    validateForm() {
      this.isEmailValid = this.validateEmail(this.email);
      this.isPasswordValid = this.validateFieldNotEmpty(this.password);
      this.isFormValid = this.validateFormFields([this.isEmailValid, this.isPasswordValid]);
    },
    async logIn() {
      this.validateForm();
      if (this.isFormValid) {
        this.isSending = true;
        await this.loginUser({
          email: this.email,
          password: this.password
        })
        this.isSending = false;
      }
      else
        this.showNotification(this.getNotificationTemplates.login_form_invalid);
    }
  }
}
</script>
  
<style scoped>
.content {
  background: url('@/assets/background.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h1 {
  color: white;
  font-weight: bold;
  font-size: xxx-large;
  margin-bottom: 40px;
  text-align: center;
}

form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}

p {
  color: white;
  font-size: medium;
  margin: 0;
  text-align: justify;
  text-justify: inter-word;
}

a {
  color: white;
}
</style>