import CheckersImg from '@/assets/games/warcaby.jpg';
import BattleshipImg from '@/assets/games/statki.jpg'; 
import Connect4Img from '@/assets/games/polacz4.jpg';
import PlaceholderImg from '@/assets/games/placeholder.jpg';

export default {
  state() {
    return {
      games: [
        {
          id:1,
          name: 'Warcaby',
          img: CheckersImg,
          description: 'Popularna gra planszowa dla każdego',
          active: true,
          link: { name: 'warcabydescription' }
        },
        {
          id:2,
          name: 'Statki',
          img: BattleshipImg,
          description: 'Wygraj z przeciwnikiem strącając statki z jego planszy',
          active: true,
          link: { name: 'statkidescription' }
        },
        {
          id:3,
          name: 'Połącz 4',
          img: Connect4Img,
          description: 'Połącz cztery piłki układając stos',
          active: true,
          link: { name: 'polacz4description' }
        },
        {
          id:4,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
        },
        {
          id:5,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false
        },
        {
          id:6,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false
        },
        {
          id:7,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false
        },
        {
          id:8,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false
        },
        {
          id:9,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false
        },
      ]
    }
  },
  mutations: {
    tooglel(state) {
      state.isHidden=!state.isHidden;
    }
  },
  actions: {
    toogleLeftPanell(context) {
      context.commit('toogle');
    }
  },
  getters: {
    getGames(state) {
      return state.games;
    }
  }
};