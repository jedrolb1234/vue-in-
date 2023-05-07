<template>
    <div :class="$style.content">
      <base-form>
        <form @submit.prevent="logIn" :class="$style.form">
          <span :class="$style.h1">Formularz logowania</span>
          <base-input type="email" v-model.trim="email" :valid="isEmailValid"></base-input>
          <base-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-input>
          <base-button v-if="!isSending" type="green-large">Zaloguj</base-button>
          <base-loading-spinner v-else></base-loading-spinner>
          <p :class="$style.p">Jeśli nie posiadasz jeszcze konta możesz przejść do formularza rejestracji.</p>
          <p :class="$style.p">Jeśli nie pamiętasz hasła możesz przejść do formularza zmiany hasła.</p>
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
  
  export default {
    mixins: [InputValidators],
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
        this.isFormValid= this.validateFormFields([this.isEmailValid, this.isPasswordValid]);
      },
      async logIn() {
        this.validateForm();
        if(this.isFormValid) {
          this.isSending=true;
          await this.loginUser({
            email: this.email,
            password: this.password
          })
          this.isSending=false;
        }
        else 
          this.showNotification(this.getNotificationTemplates.login_form_invalid);
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
    text-align: center;
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
  .bedLogin{


    background: #262A2C;
    box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: justify;

    color: #FFFFFF;
  }
  </style>