<template>
  <div class="modal-backdrop">
        <div class="modal" name="modal">
          <slot></slot>
              <div class="buttons"> 
                  <base-small-button @click="redirect">Potwierdz</base-small-button>
                  <base-small-button @click="emitVisibleMessage">Odrzuć</base-small-button>
              </div>
          </div>
  </div>
</template>

<script>
import BaseSmallButton from'@/components/base/BaseSmallButton.vue';
import { mapActions} from 'vuex';
export default {

  component: {
      BaseSmallButton,
},

  methods:{
    ...mapActions['redirectPassword()'],
      emitVisibleMessage() {
          console.log('message');
          this.$emit('visibleMessageP', false);
      },
      redirect() {
        console.log('redirect')
          this.$store.dispatch('redirectPassword');        
          this.$emit('visibleMessageP', false);
      }
  }
}

</script>
  
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}
.modal-backdrop {
  position: fixed;
  width: 400px;
  height: 150px;
  top: calc(50% - 75px);
  left: calc(50% - 200px);
  border: 5px solid black; /* Zaktualizowano */
  border-radius: 16px;
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(230, 50, 50);
  color: black;
  z-index: 20;
  overflow: auto;
  opacity: 0.95;
  text-align: center;
}

.modal-backdrop > * {
  border: none; 
}

.modal-backdrop > *:not(:last-child) {
  margin-bottom: 10px; 
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  margin-top: 15px;
}

.buttons > * {
  flex: 1;
  margin: 0 5px;
}

/* .modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
} */
  </style>