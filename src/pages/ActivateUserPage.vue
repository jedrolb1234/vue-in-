<template>
    <BaseActivationMessage :state="state"></BaseActivationMessage>
</template>

<script>
import BaseActivationMessage from '@/components/TheActivateUserPage/ActivationMessage.vue';
import { mapActions } from 'vuex';

export default {
  props: ['id'],
  components: {
    BaseActivationMessage
  },
  data() {
    return {
      state: 'inprogress'
    }
  },
  methods: {
    ...mapActions(['activateUser'])
  },
  async created() {
    this.state = await this.activateUser(this.id);
  }
}
</script>