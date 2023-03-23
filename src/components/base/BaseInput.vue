<template>
  <div>
    <input :type="inputType" :placeholder="inputPlaceholder">
    <span class="material-symbols-outlined">{{ inputIcon }}</span>
  </div>
  
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      buttonTypes: {
        email: {
          type: 'email',
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
        repeatPassword: {
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
}
input {
  background: #FBF5F3;
  border-radius: 15px 0 0 15px;
  padding: 10px 15px 10px 15px;
  font-size: larger;
  color: #000000;
  border:0;
  width: 400px;
  margin-bottom:20px;
}

input:focus {
  outline: none;
}

span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 40px;
  background-color: #FBF5F3;
  margin-bottom: 20px;
  padding: 10px 15px 10px 15px;
  border-radius: 0 15px 15px 0;
}
</style>