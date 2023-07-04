<template>
  <div>
    <div class="modal-backdrop" @click="this.hideFunction"></div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hideFunction'],
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--secondary);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid var(--primary);
}
</style>