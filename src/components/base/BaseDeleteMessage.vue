<template>
  <div class="modal-backdrop">
    <div class="modal" name="modal">
      <slot></slot>
        <div class="buttons">
          <base-small-button @click="deleteFromFriends(this.id)" class="confirm-button">Potwierdz</base-small-button>
          <base-small-button @click="emitVisibleMessage" class="confirm-button">Odrzuć</base-small-button>
        </div>
      </div>
    </div>
  </template>
  
<script>
import BaseSmallButton from'@/components/base/BaseSmallButton.vue';
import { mapActions } from 'vuex';

export default {
  component: {
      BaseSmallButton,
  },
  props:['id'],
  emits:['visibleMessage'],

  methods:{
    ...mapActions('Friends', ['removeFriend']),

      emitVisibleMessage() {
          console.log('message');
          this.$emit('visibleMessage', false);
          
      },
      deleteFromFriends(id){       
          this.$emit('visibleMessage', false);
          console.log(id)
          this.removeFriend(id);
  },
  computed:{
    getId(){
      return this.id;
    }
  }
  }
}

</script>
  
<style scoped>
/* .modal {
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
  border: 5px solid black;
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
} */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 150px;
  transform: translate(-50%, -50%);
  background-color: rgb(243, 104, 104);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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
  width: 400px;
  border-radius: 8px;
}
.reject-button {
  flex: 1;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  width:400px;
  border-radius: 8px;
}

.confirm-button {
  background-color: #28a745;
  color: white;
  margin: 0 5px;
}

.reject-button {
  background-color: #dc3545;
  color: white;
}

  </style>