<template>
  <base-form>
    <form @submit.prevent="resetPassword">
      <h1>Zmień hasło</h1>
      <base-input type="password" v-model.trim="password" :valid="isPasswordValid" :disabled="isSending"></base-input>
      <div class="input">
        <base-input type="password" v-model.trim="rpassword" :valid="isPasswordValid" :disabled="isSending"></base-input>
        <p v-if="!isPasswordValid">Wypełnij formularz poprawnymi danymi. Pamiętaj, że hasło musi posiadać minimum 8 znaków
          oraz powinno zawierać małą i dużą literę, cyfrę oraz znaku specjalny.</p>
      </div>
      <base-button v-if="!isSending" type="primary-large">Wyślij</base-button>
      <BaseLoadingSpinner v-if="isSending" style="--primary:white"></BaseLoadingSpinner>
    </form>
  </base-form>
</template>

<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoadingSpinner from '../base/BaseLoadingSpinner.vue';
import inputValidators from '@/mixins/inputValidators';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['token'],
  mixins: [inputValidators],
  components: {
    BaseForm,
    BaseButton,
    BaseInput,
    BaseLoadingSpinner
  },
  data() {
    return {
      password: '',
      rpassword: '',
      isPasswordValid: true,
      isSending: false
    }
  },
  computed: {
    ...mapGetters(['getNotificationTemplates'])
  },
  methods: {
    ...mapActions(['showNotification', 'changePassword']),
    isFormValid() {
      this.isPasswordValid = this.validatePassword(this.password, this.rpassword);
      return this.isPasswordValid;
    },
    async resetPassword() {
      if (this.isFormValid()) {
        this.isSending = true;
        await this.changePassword({ password: this.password, encodedUserIdAndToken: this.token })
        // await new Promise(r => setTimeout(r, 2000));
        this.isSending = false;
        this.$router.push({name:'login'});
      }
      else {
        this.showNotification(this.getNotificationTemplates.registration_form_invalid);
      }
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h1 {
  color:white;
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
</style>