<template>
  <div class="content">
    <RequestPasswordResetForm v-if="isRequestOnly"></RequestPasswordResetForm>
    <PasswordResetForm v-if="!isRequestOnly" :token="token"></PasswordResetForm>
    <base-notification-list></base-notification-list>
  </div>
</template>

<script>
import RequestPasswordResetForm from '@/components/TheRessetPasswordPage/RequestPasswordResetForm.vue';
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import PasswordResetForm from '@/components/TheRessetPasswordPage/PasswordResertForm.vue';

export default {
  props: {
    token: {
      default: null
    }
  },
  components: {
    RequestPasswordResetForm,
    BaseNotificationList,
    PasswordResetForm
  },
  computed: {
    isRequestOnly() {
      if (this.token===null)
        return true;
      return false;
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
</style>