import {createStore} from 'vuex'
import Notifications from '@/state/notifications/index.js';
import Users from '@/state/users/index.js';
import LeftPanelState from '@/state/leftPanel/index.js';
import Tables from '@/state/rankTables/index.js';
import Friends from '@/state/friends/index.js'
import Rank from '@/state/rankTables/index.js'
import Games from '@/state/games/index.js';
import UHP from '@/state/userHomePage/index.js';
import GameRooms from '@/state/gameRooms/index.js';
import BattleShips from '@/state/BattleShips/index.js'
import Polacz4 from '@/state/connectFour/index.js'
import Checkers from '@/state/Checkers/index.js'

const state = createStore({
  modules: {
    Notifications,
    Users,
    LeftPanelState,
    Tables,
    Friends,
    Rank,
    Games,
    UHP,
    BattleShips,
    Polacz4,
    Checkers,
    GameRooms
  },
  state() {
    return {
      isAuthenticated: false
    }
  },
  mutations: {
    authenticateUser() {
      this.isAuthenticated=true;
    },
    unauthenticateUser() {
      this.isAuthenticated=false;
    }
  },
  actions: {
    login() {
      this.authenticateUser()
    },
    logout() {
      this.unauthenticateUser();
    }
  }
});

export default state;