<template>
  <div :class="containerStyles">
    <input :class="$style.field" :type="inputType" :placeholder="inputPlaceholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled">
    <span :class="['material-symbols-outlined', $style.icon]">{{ inputIcon }}</span>
  </div>
</template>

<script>
export default {
  props: ['type', 'modelValue', 'valid', 'disabled'],
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
  display: flex;
  align-content: center;
  border-radius: 15px;
}

.field {
  background: #FBF5F3;
  border-radius: 15px 0 0 15px;
  padding: 10px 15px 10px 15px;
  font-size: larger;
  color: #000000;
  border:0;
  width: 400px;
}

.field:focus {
  outline: none;
}

.icon {
  color: rgba(0, 0, 0, 0.5);
  font-size: 40px;
  background-color: #FBF5F3;
  padding: 10px 15px 10px 15px;
  border-radius: 0 15px 15px 0;
}

.invalid {
  outline: 3px solid #BA1111;
  outline-offset: -3px;
}
</style>