<template>
    <div class="content">
      <div id="user-profile">
        <div id="user-profile__image">
          <img :src="this.getImgPath(this.getAvatarId)" />
        </div>
        <div id="user-profile__data">
          <div class="username">
            {{ this.getUsername }}
          </div>
          <div class="description">
            {{ this.getDescription }}
          </div>
        </div>
  
      </div>
      <div id="user-profile__invitation">
        <BaseButton v-if="(recivedInv===true)&&(isFriend===false)" type="secondary-medium" class="clickable">Dodaj znajomego</BaseButton>
        <BaseButton v-else-if="(recivedInv===false)&&(isFriend==false)" type="secondary-medium" class="clickable">Wyślij zaproszenie</BaseButton>
        <div v-else-if="isFriend===true">Jesteście znajomymi</div>
    </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import BaseButton from '../base/BaseButton.vue';
  import AvatarImageHandler from '@/mixins/avatarImageHandler';
  
  export default {
    components: {
      BaseButton
    },
    mixins: [AvatarImageHandler],
    data(){
        return{
            recivedInv:false,
            isFriend: true
        }
    },
    computed: {
      ...mapGetters(['getAvatarId', 'getUsername', 'getDescription'])
    }
  }
  </script>
  
  <style scoped>
  .content {
    display: flex;
    position: relative;
    justify-content: space-between;
    /* align-items: center; */
    /* justify-content: center; */
    /* border-radius: 15px; */
    padding: 15px;
    gap: 15px;
  }
  
  .content::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--primary);
    opacity: 0.1;
    z-index: -1;
  }
  
  #user-profile__image {
    display: flex;
    align-items: center;
  }
  
  #user-profile__image img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 2px solid var(--primary);
  }
  
  #user-profile {
    display: flex;
    gap: 15px;
  }
  
  #user-profile__data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: max(400px, 50%);
    gap: 15px;
  }
  
  #user-profile__invitation {
    display: flex;
    align-items: center;
  }
  
  button {
    margin-left: auto;
  }
  
  .description {
    font-size: 16px;
    white-space: pre;
  }
  
  .username {
    font-size: 24px;
    font-weight: bold;
  }
  </style>