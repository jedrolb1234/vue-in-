import {createStore} from 'vuex'
import Notifications from '@/state/notifications/index.js';
import Users from '@/state/users/index.js';
import LeftPanelState from '@/state/leftPanel/index.js';
import Tables from '@/state/rankTables/index.js';
import History from '@/state/history/index.js';
import Friends from '@/state/friends/index.js'
import Rank from '@/state/rankTables/index.js'
import Modal from '@/state/modal/index.js';

const state = createStore({
  modules: {
    Notifications,
    Users,
    LeftPanelState,
    Tables,
    History,
    Friends,
    Rank,
    Modal
  }
});

export default state;