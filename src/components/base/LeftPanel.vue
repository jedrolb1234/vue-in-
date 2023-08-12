<template>
  <div id="sideNavigationBar" :class="{small: isLeftPanelHidden, shadow: true}">
    <div>
      <div class="logo">
        <h1>FunHouse</h1>
        <span :class="hidePanelStyles" @click="toogleLeftPanel">arrow_forward_ios</span>
      </div>
      <hr />
      <div class="avatar">
        <img :src="this.getProfileAvatar"/>
      </div>
      <div class="tabs">
        <div class="tabsItem clickable" @click="$router.push({ name: 'games' })">
          <span :class="iconStyles">stadia_controller</span>
          <span>Gry</span>
        </div>
        <div class="tabsItem clickable" @click="$router.push({ name: 'friends' })">
          <span :class="iconStyles">group</span>
          <span>Znajomi</span>
        </div>
        <div class="tabsItem clickable" @click="$router.push({ name: 'rank' })">
          <span :class="iconStyles">stars</span>
          <span>Ranking</span>
        </div>
        <!-- <div class="tabsItem clickable" @click="$router.push({ name: 'history' })">
          <span :class="iconStyles">device_reset</span>
          <span>Historia gier</span>
        </div> -->
        <div class="tabsItem clickable" @click="$router.push({
                          name: 'uhp',
                          params: { id: getUserId, invId: 'null'},
                          })">
          <span :class="iconStyles">search</span>
          <span>Historia gier</span>
        </div>
        <div class="tabsItem clickable" @click="$router.push({ name: 'settings' })">
          <span :class="iconStyles">settings</span>
          <span>Ustawienia</span>
        </div>
      </div>
    </div>
    <div class="tabsItem clickable" @click="logOutUser">
      <span :class="iconStyles">logout</span>
      <span>Wyloguj</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions(['toogleLeftPanel', 'logOutUser'])
  },
  computed: {
    ...mapGetters(['isLeftPanelHidden', 'getProfileAvatar', 'getUserId']),
    iconStyles() {
      return ['material-symbols-outlined', 'icon'].join(' ');
    },
    hidePanelStyles() {
      return this.isLeftPanelHidden ? ['material-symbols-outlined', 'icon', 'clickable'].join(' ') : ['material-symbols-outlined', 'icon', 'clickable', 'rotateIcon'].join(' ');
    }
  }
}
</script>

<style scoped>
.logo {
  padding: 0px 15px 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 10px;
}

h1 {
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
}

hr {
  margin: 0px 10px;
  flex-shrink: 1;
  border: 1px solid var(--primary);
}

.icon {
  font-size: 30px;
  transition: rotate 0.3s ease;
}

.avatar {
  display: flex;
  justify-content: center;
  margin: 50px 60px;
  white-space: nowrap;
  overflow: hidden;
}

.avatar > img {
  width: 150px;
  border-radius: 50%;
  border: 2px solid var(--primary);
}
.tabs {
  display: flex;
  flex-direction: column;
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

.tabsItem:hover {
  background: var(--primaryBtn);
}

.logout {
  padding: 0 25px;
}

.small {
  width: 60px !important;
}

.rotateIcon {
  rotate: 180deg;
}

#sideNavigationBar {
  container-type: inline-size;
  container-name: sideNavigationBar;
  display: flex;
  flex-direction: column;
  width: 280px;
  background-color: var(--secondaryBtn);
  justify-content: space-between;
  color: var(--primary);
  padding-bottom: 25px;
  /* border-radius: 0px 30px 30px 0px; */
  border-right: 1px solid var(--primary);
  overflow: hidden;
  flex-shrink: 0;
  transition: width 0.3s ease;
  position: sticky;
}

@container sideNavigationBar (width <= 60px) {
  .logo {
    padding: 9px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .logo>h1 {
    display: none;
  }

  .avatar,
  .avatarIcon {
    display: none;
  }

  .tabs {
    margin-top: 250px;
  }

  .tabsItem>span:nth-child(2) {
    display: none;
  }
}

.clickable {
  cursor: pointer;
}
</style>