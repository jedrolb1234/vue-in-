<template>
    <div class="content">
      <div id="user-profile">
        <div id="user-profile__image">
          <img :src="getUserAvatar(user.avatar)" />
        </div>
        <div id="user-profile__data">
          <div class="username">
            {{ this.user.userName }}
          </div>
          <div class="description">
            {{ this.user.description }}
          </div>
        </div>
      </div>
      <div id="user-profile__invitation">
        <div v-if="(this.isFriend===1)">Jesteście znajomymi</div>
        <BaseButton v-if="(this.isFriend===2)" type="secondary-medium" class="clickable" @click="sendInvitation(this.id)">Wyślij zaproszenie</BaseButton>
        <BaseButton v-if="(this.isFriend ===3)" type="secondary-medium" class="clickable" @click="acceptInvitation(this.getInvId)">Dodaj znajomego</BaseButton>
        <div v-if="(this.isFriend===4)">Zaproszenie wysłane</div>
        <!-- <div v-if="(getOwnId === true)" class="clickable"></div> -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import BaseButton from '../base/BaseButton.vue';
  
  export default {
    components: {
      BaseButton
    },
    props:['isFriend','id', 'user'],
    computed: {
      ...mapGetters('UHP', ['isAvatarPickerVisible', 'getDescription', 'getName', 'getSurname', 'getBirthDate', 'getEmail',
                            'isLoading', 'currentPage', 'allPages', 'pageNr', 'getHistory', 'getCurrentPage', 'getItemsPerPage',
                            'getIsInvSended', 'getId','getInvitationId']),
      ...mapGetters(['getProfileAvatar', 'getUserAvatar']),
      getInvId(){
        const id = sessionStorage.getItem('invId')
        localStorage.setItem('invId', null)
        return id;
      },
    },
    methods: {
      ...mapActions('UHP',['sendInvitation', 'acceptInvitation']),
    },
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
    width:auto;
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