<template>
    <div :class="$style.content">
      <base-form>
        <form @submit.prevent="sendEmail" :class="$style.form"> 
          <span :class="$style.h1">Podaj email</span>
          <base-input type="email" v-model.trim="userEmail" :valid="isEmailValid"></base-input>
          <p v-if="bedEmail" :class="$style.bedEmail">Podałeś niepoprawny adres email.</p>
          <base-button type="green-large">Wyślij</base-button>
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
        userEmail: '',
        bedEmail: false
      }
    },
    computed: {
      ...mapGetters(['getNotificationTemplates'])
    },
    methods: {
      ...mapActions(['showNotification']),
      isEmailValid(){
        this.bedEmail = !this.bedEmail;
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
  .bedEamil{
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