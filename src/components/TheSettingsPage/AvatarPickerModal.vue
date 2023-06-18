<template>
  <BaseModal :hideFunction="this.hideAvatarPicker">
    <div id="avatar-picker" class="shadow">
      <h1>Zmień swój awatar</h1>
      <hr>
      <div id="avatar-picker__images">
        <img v-for="(image, index) in this.getAvatars" :src="image" :key="index" @click="selectAvatar(image)"
          :class="{ selected: this.isAvatarSelected(image) }" />
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
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../base/BaseButton.vue';

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
    ...mapActions(['setUserAvatar']),
    hideAvatarPicker() {
      this.$emit('close-modal');
    },
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    isAvatarSelected(avatar) {
      return this.selectedAvatar == avatar;
    },
    save() {
      this.setUserAvatar(this.selectedAvatar);
      this.hideAvatarPicker();
    }
  },
  computed: {
    ...mapGetters(['getAvatars'])
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