<template>
    <div :class="containerStyles">
      <input :class="$style.field" :type="inputType" :placeholder="inputPlaceholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <span :class="['material-symbols-outlined', $style.icon]">{{ inputIcon }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: ['type', 'modelValue', 'valid'],
    emits: ['update:modelValue'],
    data() {
      return {
        buttonTypes: {
          password: {
            type: 'password',
            name: 'Hasło',
            icon: 'lock'
          },
          usernameoremail:{
            type: 'text',
            name: 'Nazwa użytkownika lub Email',
            icon: 'person'
          }
        }
      }
    },
    computed: {
      inputType() {
        return this.buttonTypes[this.type].type;
      },
      inputPlaceholder() {
        return this.buttonTypes[this.type].name;
      },
      inputIcon() {
        return this.buttonTypes[this.type].icon;
      },
      containerStyles() {
        if(!this.valid)
          return [this.$style.invalid, this.$style.container].join(' ');
        return this.$style.container;
      }
    }
  }
  </script>
  
  <style module>
  .container {
    padding-top: 5px;
    display: flex;
    align-content: center;
    border-radius: 5px;
  }
  
  .field {
    background: #FBF5F3;
    border-radius: 5px 0 0 15px;
    padding: 5px 10px 5px 10px;
    font-size: medium;
    color: #000000;
    border: 0;
    width: 280px;
    height: 45px;
  }
  
  .field:focus {
    outline: none;
  }
  
  .icon {
    color: rgba(0, 0, 0, 0.5);
    width: 44px;
    height: 44px;
    font-size: 32px;
    background-color: #FBF5F3;
    padding: 3px 5px 3px 5px;
    border-radius: 0 5px 5px 0;
  }
  
  .invalid {
    outline: 3px solid #BA1111;
    outline-offset: -3px;
  }
  </style>