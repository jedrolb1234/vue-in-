<template>
  <BaseModal :hideFunction="this.hideAvatarPicker">
    <div id="avatar-picker" class="shadow">
      <h1>Zmień swój awatar</h1>
      <hr>
      <div id="avatar-picker__images">
        <img v-for="(image, index) in this.images" :src="image" :key="index + 1" @click="selectAvatar(index + 1)"
          :class="{ selected: this.isAvatarSelected(index + 1) }" />
      </div>
      <hr>
      <div id="avatar-picker__actions">
        <BaseButton type="primary-medium" @click="this.hideAvatarPicker()">Anuluj</BaseButton>
        <BaseButton type="secondary-medium" @click="this.save()">Zapisz</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue';
import { mapActions } from 'vuex';
import BaseButton from '../base/BaseButton.vue';

function getImgPath(id) {
  return process.env.BASE_URL + 'images/avatars/' + id + '.png';
}

export default {
  components: {
    BaseModal,
    BaseButton
},
  data() {
    return {
      images: [],
      selectedAvatar: null
    }
  },
  methods: {
    ...mapActions(['hideAvatarPicker', 'setAvatarId']),
    selectAvatar(id) {
      this.selectedAvatar = id;
    },
    isAvatarSelected(id) {
      return this.selectedAvatar == id;
    },
    save() {
      this.setAvatarId(this.selectedAvatar);
      this.hideAvatarPicker();
    }
  },
  created() {
    for (let i = 1; i <= 24; i++) {
      this.images.push(getImgPath(i));
    }
  }
}
</script>

<style scoped>
#avatar-picker {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  border-radius: 15px;
  /* width: 705px; */
  color: var(--primary);
  padding: 15px;
  gap:15px;
}

hr {
  height: 2px;
  width: 100%;
}

#avatar-picker__images {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

#avatar-picker__images>img {
  width: 100px;
  border-radius: 50%;
  border: solid 2px var(--primary);
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.selected {
  
  box-shadow: 0 0 5px 3px var(--accent);
}

h1 {
  margin:0;
  text-align: center;
}

hr {
  border: 1px solid var(--accent);
}

#avatar-picker__actions {
  display: flex;
  justify-content: flex-end;
  gap:15px;
}
</style>