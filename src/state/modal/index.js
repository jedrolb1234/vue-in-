export default {
  state() {
    return {
      isAvatarPickerModalVisible: false
    }
  },
  mutations: {
    showAvatarPickerModal(state) {
      state.isAvatarPickerModalVisible=true;
    },
    hideAvatarPickerModal(state) {
      state.isAvatarPickerModalVisible=false;
    }
  },
  actions: {
    showAvatarPicker(context) {
      context.commit('showAvatarPickerModal');
    },
    hideAvatarPicker(context) {
      context.commit('hideAvatarPickerModal');
    }
  },
  getters: {
    isAvatarPickerVisible(state) {
      return state.isAvatarPickerModalVisible;
    }
  }
};