
<template>
    <div :class="$style.content">
        <div :class="$style.header">
                <div :class="$style.logo">
                    <span :class="iconStyles">stadia_controller</span>
                    <span :class="$style.name">FunHouse</span>
            </div>
        </div>
        <div :class="$style.block">
            <span :class="$style.message">Witaj!<br><br>
              Otrzymaliśmy prośbę zmiany hasła dla twojego konta.
              <br>Żeby zmienić hasło kliknij w link poniżej.</span>
              <p :class="$style.redirect">{{ redirect }}</p>
              <span :class="$style.message2">Zespół FunHouse</span>
            
        </div>
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 409px;
    border: 1px solid #000000;
    background-color: white;
}

.header{
    position: absolute;
    width: 798px;
    height: 65px;
    left: 0px;
    top: 0px;
    background: linear-gradient(90deg, #ACC12F 0%, #E8FF5B 51.56%, #ACC12F 100%);
}
.fuhnause{
    position: absolute;
    width: 354px;
    height: 65px;
    left: 30px;
    top: 0px;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
.icon {
  font-size: 55px;
}
.block{
    background-color: white;
}
.name{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #1E1E1E;
}
.message {
    position: absolute;
    margin-top: 120px;
    width: 700px;
    height: 344px;
    left: 50px;
    top: 25px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;

    color: #393E41;
}
.message2{
    position: absolute;
    margin-top: 290px;
    width: 700px;
    height: 344px;
    left: 50px;
    top: 25px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;

    color: #393E41;
}
.redirect{
    margin-top: 265px;
    left: 50px;
    color: red;
    font-size: 22px;
    line-height: 26px;
    text-decoration: underline;
    position: absolute;
}
</style>