<template>
  <div class="modal-backdrop" @click="emitVisibleMessage">
    <div class="modal" name="modal">
      <slot></slot>
        <div class="buttons">
          <base-small-button @click="deleteFromFriends(this.id)" class="confirm-button">Potwierdz</base-small-button>
          <base-small-button @click="emitVisibleMessage" class="reject-button">Anuluj</base-small-button>
        </div>
      </div>
    </div>
</template>
  
<script>
import BaseSmallButton from'@/components/base/BaseSmallButton.vue';
import BaseModal from '@/components/base/BaseModal.vue'
import { mapActions } from 'vuex';

export default {
  component: {
      BaseSmallButton,
      BaseModal
  },
  props:['id', 'hideModal'],
  emits:['visibleMessage'],

  methods:{
    ...mapActions('Friends', ['removeFriend']),

      emitVisibleMessage() {
          this.$emit('visibleMessage', false);       
      },
      deleteFromFriends(id){       
          this.$emit('visibleMessage', false);
          this.removeFriend(id);
      },
      // hideModal(){
      //   this.$emit('close-modal', false);
      // },
    },
  computed:{
    getId(){
      return this.id;
    }
  }
}

</script>
  
<style scoped>
.modal-backdrop{
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
    text-align:center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.confirm-button{
  flex: 1;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  width: 40px;
  border-radius: 8px;  
  background-color: rgb(243, 104, 104); 
  color: white;
  margin: 0 5px;
}
.reject-button {
  flex: 1;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  width:40px;
  border-radius: 8px;
  background-color: #28a745; 
  color: white;
}

  </style>