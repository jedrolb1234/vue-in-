<template>
  <div :class="$style.notificationList">
    <transition-group
      :move-class="$style['notification-move']"
      :enter-from-class="$style['notification-enter-from']"
      :enter-active-class="$style['notification-enter-active']"
      :leave-active-class="$style['notification-leave-active']"
      :leave-to-class="$style['notification-leave-to']"
    >
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
        ...mapGetters(['getNotifications']),
        enterActiveClass() {
          return 'animate__animated animate__fadeInRight animate__faster';
        },
        leaveActiveClass() {
          return ['animate__animated animate__fadeOutRight animate__faster'].join(' ');
        }
    },
    components: { BaseNotification }
}
</script>

<style module>
.notificationList {
  position: fixed;
  bottom:0;
  right:0;
  width: 340px;
  margin-right: 20px;
  margin-bottom: 20px;
  align-items: end;
  gap:20px;
  z-index: 999;
}

.notification-move, 
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translate(30px);
}
.notification-leave-to {
  opacity: 0;
  transform: translate(30px, calc(-100% - 20px));
}

.notification-leave-active {
  position: absolute;
}
</style>