<template>
  <Transition name="slide">
    <div v-if="!isLeftPanelHidden" class="panel">
      <div>
        <div class="logo">
          <h1>FunHouse</h1>
          <span :class="hidePanelStyles" @click="toogleLeftPanel">arrow_back_ios_new</span>
        </div>
        <hr />
        <div class="avatar">
          <span :class="avatarStyles">account_circle</span>
        </div>
        <div class="tabs">
          <div class="tabsItem clickable" @click="$router.push({name: 'games'})">
            <span :class="iconStyles">stadia_controller</span>
            <span>Gry</span>
          </div>
          <div class="tabsItem clickable" @click="$router.push({name: 'friends'})">
            <span :class="iconStyles">group</span>
            <span>Znajomi</span>
          </div>
          <div class="tabsItem clickable" @click="$router.push({name: 'rank'})">
            <span :class="iconStyles">stars</span>
            <span>Ranking</span>
          </div>
          <div class="tabsItem clickable" @click="$router.push({name: 'history'})">
            <span :class="iconStyles">device_reset</span>
            <span>Historia gier</span>
          </div>
          <div class="tabsItem clickable" @click="$router.push({name: 'settings'})">
            <span :class="iconStyles">settings</span>
            <span>Ustawienia</span>
          </div>
        </div>
      </div>
      <div class="tabsItem clickable" @click="$router.push({name: 'games'})">
        <span :class="iconStyles">logout</span>
        <span>Wyloguj</span>
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-if="isLeftPanelHidden" class="panelHidden clickable">
      <div>
        <div class="logoHidden">
          <span :class="hidePanelStyles" @click="toogleLeftPanel">arrow_forward_ios</span>
        </div>
        <hr />
        <div class="tabsHidden">
          <div class="tabsItemHidden clickable" @click="$router.push({name: 'games'})">
            <span :class="iconStyles">stadia_controller</span>
          </div>
          <div class="tabsItemHidden clickable" @click="$router.push({name: 'friends'})">
            <span :class="iconStyles">group</span>
          </div>
          <div class="tabsItemHidden clickable" @click="$router.push({name: 'rank'})">
            <span :class="iconStyles">stars</span>
          </div>
          <div class="tabsItemHidden clickable" @click="$router.push({name: 'history'})">
            <span :class="iconStyles">device_reset</span>
          </div>
          <div class="tabsItemHidden clickable" @click="$router.push({name: 'settings'})">
            <span :class="iconStyles">settings</span>
          </div>
        </div>
      </div>
      <div class="tabsItemHidden clickable">
        <span :class="iconStyles">logout</span>
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions(['toogleLeftPanel'])
  },
  computed: {
    ...mapGetters(['isLeftPanelHidden']),
    iconStyles() {
      return ['material-symbols-outlined', 'icon'].join(' ');
    },
    hidePanelStyles() {
      return ['material-symbols-outlined', 'icon', 'clickable'].join(' ');
    },
    avatarStyles() {
      return ['material-symbols-outlined', 'avatarIcon'].join(' ');
    },
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100%;
  background-color: #262A2C;
  justify-content: space-between;
  color: white;
  padding-bottom: 25px;
  border-radius: 0px 30px 30px 0px;
  filter: drop-shadow(15px 0px 15px rgba(0, 0, 0, 0.4));
  overflow: hidden;
  flex-shrink: 0;
}

.panelHidden {
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 100%;
  background-color: #262A2C;
  justify-content: space-between;
  color: white;
  padding-bottom: 25px;
  border-radius: 0px 30px 30px 0px;
  filter: drop-shadow(15px 0px 15px rgba(0, 0, 0, 0.4));
  overflow: hidden;
  flex-shrink: 0;
}

.logo {
  padding: 0px 10px 0px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 10px;
}

.logoHidden {
  padding: 9px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 10px;
}

h1 {
  margin: 0px;

}

hr {
  margin: 0px 10px;
  border: 1px solid white;
}

.icon {
  font-size: 30px;
}

.avatar {
  display: flex;
  justify-content: center;
  margin: 50px 60px;
  white-space: nowrap;
  overflow: hidden;
}

.avatarIcon {
  font-size: 100px;
}

.tabs {
  display: flex;
  flex-direction: column;
}

.tabsHidden {
  display: flex;
  flex-direction: column;
  margin-top: 200px;
}

.tabsItem {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
}

.tabsItemHidden {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
}

.tabsItemHidden:hover {
  background: #393E41;
}

.tabsItem:hover {
  background: #393E41;
}

.logout {
  padding: 0 25px;
}

.clickable {
  cursor: pointer;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from {
  width: 60px;
  position: absolute;
}

.slide-enter-to {
  position: absolute;
}

.slide-leave-to {
  position: absolute;
  width: 60px;
}

.fade-enter-active {
  transition: all 0.3s cubic-bezier(1, .11, 1, .03);
}


.fade-enter-from {
  position: absolute;
  opacity: 0;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
}
</style>
