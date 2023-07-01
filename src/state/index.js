import {createStore} from 'vuex'
import Notifications from '@/state/notifications/index.js';
import Users from '@/state/users/index.js';
import LeftPanelState from '@/state/leftPanel/index.js';
import Tables from '@/state/rankTables/index.js';
import History from '@/state/history/index.js';
import Friends from '@/state/friends/index.js'
import Rank from '@/state/rankTables/index.js'
import Games from '@/state/games/index.js';
import UHP from '@/state/userHomePage/index.js';
// import GameRooms from '@/state/gameRooms/index.js';
import Statki from '@/state/StatkiGame/index.js'
const state = createStore({
  modules: {
    Notifications,
    Users,
    LeftPanelState,
    Tables,
    History,
    Friends,
    Rank,
    Games,
    UHP,
    Statki
    // GameRooms
  }
});

export default state;