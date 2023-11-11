<template>
  <base-form>
    <form @submit.prevent="requestPasswordReset">
      <h1>Fun House Project</h1>
      <h2>Zmień hasło</h2>
      <div class="input">
        <base-input type="email" v-model.trim="email" :valid="isEmailValid" :disabled="isSending" maxlength="100"></base-input>
        <p v-if="!isEmailValid">Podaj poprawny adres email.</p>
      </div>
      <base-button v-if="!isSending" type="primary-large">Wyślij</base-button>
      <BaseLoadingSpinner v-if="isSending" style="--primary:white"></BaseLoadingSpinner>
      <div>
        <p>Jeśli nie posiadasz jeszcze konta możesz przejść do <RouterLink :to="{ name: 'signup' }">formularza rejestracji
          </RouterLink>.</p>
        <p>Jeśli chcesz się zalogować możesz przejść do <RouterLink :to="{ name: 'login' }">formularza logowania
          </RouterLink>.</p>
      </div>
    </form>
  </base-form>
</template>

<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue';
import inputValidators from '@/mixins/inputValidators';
import { mapActions, mapGetters } from 'vuex';
import { RouterLink } from 'vue-router';

export default {
  props: ['id'],
  mixins: [inputValidators],
  components: {
    BaseForm,
    BaseButton,
    BaseInput,
    BaseLoadingSpinner,
    RouterLink
  },
  data() {
    return {
      email: '',
      isEmailValid: true,
      isSending: false
    }
  },
  computed: {
    ...mapGetters(['getNotificationTemplates']),
    isRequestOnly() {
      if (this.id == null)
        return true;
      return false;
    }
  },
  methods: {
    ...mapActions(['showNotification', 'requestPasswordChange']),
    isFormValid() {
      this.isEmailValid = this.validateEmail(this.email);
      return this.isEmailValid;
    },
    async requestPasswordReset() {
      if (this.isFormValid()) {
        this.isSending = true;
        await this.requestPasswordChange(this.email);
        this.isSending = false;
      }
    }
  }
}
</script>
  
<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

h1 {
  color:white;
  font-size: 48px;
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