<template>
    <div :class="$style.content">
        <h1 :class="$style.name">Aktywacja konta</h1>
            <p :class="$style.message">Link aktywacyjny jest błędny. Upewnij się, że link został skopiowany poprawnie.</p>
            <span :class="iconStyles">cancel</span>
    </div>
</template>

<script>
export default {
  data(){ 
    return {
      redirect: 'link'
    }
  },

  computed: {
    iconStyles() {
      return ['material-symbols-outlined', this.$style.icon].join(' ');
        }
    }
  }

</script>

<style module>
.content{
    position: absolute;
    width: 472px;
    height: 272px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background: #262A2C;
    border: 5px solid #BA1111;
    box-shadow: 5px 5px 50px 15px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(25px);
    border-radius: 30px;
}
.name{
    position: absolute;
    width: 472px;
    height: 60px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    text-align: center;
    color: #BA1111;
}
.message{
    position: absolute;
    width: 406px;
    height: 22px;
    top: 90px;
    left: 30px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: justify;
    color: #FFFFFF;
}
.icon{
    margin-top: 170px;
    margin-left: 205px;
    text-align: center;
    font-size: 70px;
    color: #BA1111;
}

</style>