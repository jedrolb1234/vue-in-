<template>
    <div :class="$style.content">
      <base-form>
        <form @submit.prevent="logIn" :class="$style.form"> 
          <span :class="$style.h1">Formularz logowania</span>
          <base-input type="usernameoremail" v-model.trim="userNameOrEmail" :valid="isUserNameOrEmailValid"></base-input>
          <base-input type="password" v-model.trim="password" :valid="isPasswordValid"></base-input>
          <p v-if="bedLogin" :class="$style.bedLogin">Logowanie nie powiodło się. Upewnij się, że podane dane są poprawne.</p>
          <base-button type="green-large">Zaloguj</base-button>
        </form>
        <p :class="$style.p">Jeśli nie posiadasz jeszcze konta możesz przejść do formularza rejestracji.</p>
        <p :class="$style.p">Jeśli nie pamiętasz hasła możesz przejść do formularza zmiany hasła.</p>
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
        userNameOrEmail: '',
        password: '',
        isFormValid: true,
        isEmailValid: true,
        isPasswordValid: true,
        bedLogin: false
      }
    },
    computed: {
      ...mapGetters(['getNotificationTemplates'])
    },
    methods: {
      ...mapActions(['showNotification']),
      validateUserNameOrEmail() {
        if(this.userNameOrEmail.length>0) {
          return true
        }
        this.isFormValid=false;
        return false;
      },
      validatePassword() {
        const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
        if(this.password.match(passwordRegex))
          return true;
        this.isFormValid=false;
        return false;
      },
      validateForm() {
        this.isFormValid=true;
        this.isUserNameOrEmail = this.validateUserNameOrEmail();
        this.isPasswordValid = this.validatePassword();
  
      },
      logIn() {
        this.validateForm();
        if(this.isFormValid)
          this.showNotification(this.getNotificationTemplates.account_created);
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