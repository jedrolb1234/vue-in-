<template>
    <section>
        <div :class="content">
            <h1 :class="name">Aktywacja konta</h1>
            <BaseLoadingSpinner v-if="spinnerVisible"></BaseLoadingSpinner>
            <p class="message" v-if="!spinnerVisible">{{ description }}</p>
            <span :class="iconStyles" v-if="!spinnerVisible">{{ icon }}</span>
        </div>
    </section>
</template>

<script>
import BaseLoadingSpinner from '@/components/base/BaseLoadingSpinner.vue'

export default {
  components: {
    BaseLoadingSpinner
  },
  props: ['state'],
  data(){ 
    return {
        variants: {
            success: {
              description: 'Twoje konto zostało pomyślnie aktywowane, możesz teraz przejść do formularza logowania.',
              icon: 'check_circle'
            },
            failed: {
              description: 'Link aktywacyjny jest błędny. Upewnij się, że link został skopiowany poprawnie.',
              icon: 'cancel'
            }
        } 
    }
  },
  computed: {
    spinnerVisible() {
      if (this.state == 'inprogress')
        return true;
      return false;
    },
    iconStyles() {
      if (this.state=='inprogress')
        return ['material-symbols-outlined', 'icon', 'c-white'].join(' ');
      if (this.state=='success')
        return ['material-symbols-outlined', 'icon', 'c-green'].join(' ');
      return ['material-symbols-outlined', 'icon', 'c-red'].join(' ');
      
    },
    description() {
      return this.variants[this.state].description;  
    },
    icon() {
      return this.variants[this.state].icon;
    },
    content() {
      if (this.state=='inprogress')
        return ['content', 'b-white'].join(' ');
      if (this.state=='success')
        return ['content', 'b-green'].join(' ');
      return ['content', 'b-red'].join(' ');
    },
    name() {
      if (this.state=='inprogress')
        return ['name', 'c-white'].join(' ');
      if (this.state=='success')
        return ['name', 'c-green'].join(' ');
      return ['name', 'c-red'].join(' ');
    }
  }
}
</script>

<style scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;
    height:100%;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 470px;
    background: #262A2C;
    box-shadow: 5px 5px 50px 15px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(25px);
    border-radius: 30px;
    padding:0px 20px 20px 20px;
}
.name{
    font-weight: 700;
    margin-bottom: 0px;
    font-size: 36px;
    line-height: 54px;
}
.message{
    margin: 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: justify;
    color: #FFFFFF;
}
.icon{
    text-align: center;
    font-size: 70px;
}

.c-white {
  color: #FFFFFF;
}

.c-red {
  color: #BA1111;
}

.c-green {
  color: #ACC12F;
}

.b-white {
  border: 5px solid #FFFFFF;
}

.b-red {
  border: 5px solid #BA1111;
}

.b-green {
  border: 5px solid #ACC12F;
}
</style>