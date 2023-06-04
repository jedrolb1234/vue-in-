import Mutations from '@/state/users/mutations.js';
import Actions from '@/state/users/actions.js';
import Getters from '@/state/users/getters.js';

export default {
  state() {
    return {
      lastLogin: null,

      username: 'testowyuser14',
      description: 'Hello World\nProsty opis w celu wyopełnienia pustej przestrzeni.',
      avatarId: 1,
      name: 'Jan',
      surname: 'Kowalski',
      birthDate: '2000-01-01',
      email: 'test@test.com',

      theme: 'light'
    }
  },
  mutations: Mutations,
  actions: Actions,
  getters: Getters
};