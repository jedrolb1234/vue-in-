<template>
  <div :class="{'invalid':!valid}">
    <input :type="inputType" :placeholder="inputPlaceholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <span class="material-symbols-outlined">{{ inputIcon }}</span>
  </div>
</template>

<script>
export default {
  props: ['type', 'modelValue', 'valid'],
  emits: ['update:modelValue'],
  data() {
    return {
      buttonTypes: {
        email: {
          type: 'text',
          name: 'Adres email',
          icon: 'alternate_email'
        },
        username: {
          type: 'text',
          name: 'Nazwa użytkownika',
          icon: 'person'
        },
        password: {
          type: 'password',
          name: 'Hasło',
          icon: 'lock'
        },
        rpassword: {
          type: 'password',
          name: 'Powtórz hasło',
          icon: 'lock'
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
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  align-content: center;
  border-radius: 15px;
}
input {
  background: #FBF5F3;
  border-radius: 15px 0 0 15px;
  padding: 10px 15px 10px 15px;
  font-size: larger;
  color: #000000;
  border:0;
  width: 400px;
}

input:focus {
  outline: none;
}

span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 40px;
  background-color: #FBF5F3;
  padding: 10px 15px 10px 15px;
  border-radius: 0 15px 15px 0;
}

.invalid {
  outline: 2px solid #FF0000;
  outline-offset: -2px;
}
</style>