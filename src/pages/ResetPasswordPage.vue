<template>
  <div class="content">
    <RequestPasswordResetForm v-if="isRequestOnly"></RequestPasswordResetForm>
    <PasswordResetForm v-if="!isRequestOnly"></PasswordResetForm>
  </div>
  <base-notification-list></base-notification-list>
</template>

<script>
import RequestPasswordResetForm from '@/components/TheRessetPasswordPage/RequestPasswordResetForm.vue';
import BaseNotificationList from '@/components/base/BaseNotificationList.vue';
import PasswordResetForm from '@/components/TheRessetPasswordPage/PasswordResertForm.vue';

export default {
  props: {
    id: {
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
      if (this.id===null)
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