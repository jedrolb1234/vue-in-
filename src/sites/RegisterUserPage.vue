<template>
  <div class="content">
    <base-form>
      <form @submit.prevent=""> 
        <h1>Stwórz konto</h1>
        <base-input type="email"></base-input>
        <base-input type="username"></base-input>
        <base-input type="password"></base-input>
        <base-input type="repeatPassword"></base-input>
        <base-button type="green-large">Wyślij</base-button>
        <p>Jeśli posiadasz już konto możesz przejść do formularza logowania</p>
      </form>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default {
  components: {
    BaseForm,
    BaseButton,
    BaseInput
  }
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
}

h1 {
  font-weight: bold;
  font-size: xxx-large;
  margin-bottom: 40px;

}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: medium;
  margin: 20px 0 0 0 ;
}
</style>