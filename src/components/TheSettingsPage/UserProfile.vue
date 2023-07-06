<template>
  <div class="content">
    <div id="user-profile">
      <div id="user-profile__image">
        <img :src="userAvatar" />
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
    <div id="user-profile__link">
      <BaseButton type="secondary-medium" class="clickable" @click="redirect()">Pokaż profil</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '../base/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  props:['userAvatar', 'id'],
  methods:{
    redirect(){
    return this.$router.push({
                        name: 'uhp',
                        params: { id: this.id, isFriend: true , invId: 'null'},
                        });
  }
  },
  computed: {
    ...mapGetters(['getProfileAvatar', 'getUsername', 'getDescription'])
  },

}
</script>

<style scoped>
.content {
  display: flex;
  position: relative;
  justify-content: space-between;
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

#user-profile__link {
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