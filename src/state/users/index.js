import Mutations from '@/state/users/mutations.js';
import Actions from '@/state/users/actions.js';
import Getters from '@/state/users/getters.js';

import avatar1 from '@/assets/avatars/1.png';
import avatar2 from '@/assets/avatars/2.png';
import avatar3 from '@/assets/avatars/3.png';
import avatar4 from '@/assets/avatars/4.png';
import avatar5 from '@/assets/avatars/5.png';
import avatar6 from '@/assets/avatars/6.png';
import avatar7 from '@/assets/avatars/7.png';
import avatar8 from '@/assets/avatars/8.png';
import avatar9 from '@/assets/avatars/9.png';
import avatar10 from '@/assets/avatars/10.png';
import avatar11 from '@/assets/avatars/11.png';
import avatar12 from '@/assets/avatars/12.png';
import avatar13 from '@/assets/avatars/13.png';
import avatar14 from '@/assets/avatars/14.png';
import avatar15 from '@/assets/avatars/15.png';
import avatar16 from '@/assets/avatars/16.png';
import avatar17 from '@/assets/avatars/17.png';
import avatar18 from '@/assets/avatars/18.png';
import avatar19 from '@/assets/avatars/19.png';
import avatar20 from '@/assets/avatars/20.png';
import avatar21 from '@/assets/avatars/21.png';
import avatar22 from '@/assets/avatars/22.png';
import avatar23 from '@/assets/avatars/23.png';
import avatar24 from '@/assets/avatars/24.png';

export default {
  state() {
    return {
      lastLogin: null,
      username: 'testowyuser14',
      description: 'Hello World\nProsty opis w celu wypełnienia pustej przestrzeni.',
      userAvatar: avatar1,
      avatars: [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18, avatar19, avatar20, avatar21, avatar22, avatar23, avatar24],
      name: 'Jan',
      surname: 'Kowalski',
      birthDate: '2000-01-01',
      theme: 'light'
    }
  },
  mutations: Mutations,
  actions: Actions,
  getters: Getters
};