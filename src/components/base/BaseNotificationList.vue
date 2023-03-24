<template>
  <div id="notificationList">
    <transition-group name="notifications">
      <base-notification v-for="notification in getNotifications" :key="notification.id" :type="notification.type" :id="notification.id">
        <template #label>
          {{ notification.label }}
        </template>
        <template #description>
          {{ notification.description }}
        </template>
      </base-notification>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseNotification from './BaseNotification.vue';

export default {
    computed: {
        ...mapGetters(['getNotifications'])
    },
    components: { BaseNotification }
}
</script>

<style scoped>
#notificationList {
  position: fixed;
  bottom:0;
  right:0;
  width: 340px;
  height:auto;
  display: flex;
  flex-direction: column-reverse;
  gap:20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.notifications-move, /* apply transition to moving elements */
.notifications-enter-active,
.notifications-leave-active {
  transition: all 0.5s ease;
}

.notifications-enter-from,
.notifications-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notifications-leave-active {
  position: absolute;
}
</style>