<template>
    <div :class="$style.content">
      <base-form>
        <form @submit.prevent="sendEmail" :class="$style.form"> 
          <span :class="$style.h1">Zmień hasło.</span>
          <base-input type="password" v-model.trim="password" :valid="validatePassword"></base-input>
          <base-input type="password" v-model.trim="rpassword" :valid="hasPasswordMach"></base-input>
          <p v-if="hasMatch" :class="$style.notMatch">Powtórz poprawnie hasło.</p>
          <span :class="$style.p">Wypełnij formularz poprawnymi danymi. Pamiętaj, że hasło musi posiadać minimum 8 znaków oraz powinno zawierać małą i dużą literę, cyfrę oraz znaku specjalny.</span>
          <base-button type="green-large">Zatwierdź</base-button>
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
        password: '',
        rpassword: '',
        hasMatch: false,
        isPasswordValid: true,
        isFormValid: true
      }
    },
    computed: {
      ...mapGetters(['getNotificationTemplates'])
    },
    methods: {
      ...mapActions(['showNotification']),
      hasPasswordMatch(){
        if(this.oldPassword !== this.newPassword){
            this.hasMatch = false;
            this.isFormValid=false;
        }
    },
       validatePassword() {
      const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
      if(this.password.match(passwordRegex) && this.password == this.rpassword)
        return true;
      this.isFormValid=false;
      return false;
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
  .notMatch{
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