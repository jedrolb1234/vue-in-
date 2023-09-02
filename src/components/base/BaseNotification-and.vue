<template>
  <div :class="$style.container" @click="hideNotification(id)">
    <div :class="headerStyling">
      <slot name="label"></slot>
      <span :class="['material-symbols-outlined', $style.icon]">{{ notificationIcon }}</span>
    </div>
    <div :class="$style.description">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['type', 'id'],
  data() {
    return {
      types: {
        'info': 'check_circle',
        'error': 'cancel'
      }
    }
  },
  computed: {
    headerStyling() {
      return [this.$style.header, this.$style[this.type]].join(' ');
    },
    notificationIcon() {
      return this.types[this.type];
    }
  },
  methods: {
    ...mapActions(['hideNotification'])
  }
}
</script>

<style module>
.container {
  cursor: pointer;
  margin-top: 20px;
}
.header {
  width: 340px;
  font-size: 14px;
  border-radius: 15px 15px 0px 0px;
  padding:5px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:10px;
}

.icon {
  font-size: 18px;
}
.info {
  color: #FBF5F3;
  background-color: #ACC12F;
}

.error {
  color: #FBF5F3;
  background-color: #BA1111;
;
}

.description {
  width: 340px;
  font-size: 12px;
  color: black;
  background-color: #FBF5F3;
  border-radius: 0px 0px 15px 15px;
  padding:5px 10px 5px 10px;
  white-space: pre-wrap;
}
</style>