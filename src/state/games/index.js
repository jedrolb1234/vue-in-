import CheckersImg from '@/assets/games/warcaby.jpg';
import BattleshipImg from '@/assets/games/battleship.jpg'; 
import Connect4Img from '@/assets/games/polacz4.jpg';
import PlaceholderImg from '@/assets/games/placeholder.jpg';

export default {
  state() {
    return {
      games: [
        {
          id:0,
          name: 'Warcaby',
          img: CheckersImg,
          description: 'Popularna gra planszowa dla każdego',
          active: true,
          link: { name: 'warcabydescription' },
          isFavorite: false
        },
        {
          id:1,
          name: 'Statki',
          img: BattleshipImg,
          description: 'Wygraj z przeciwnikiem strącając statki z jego planszy',
          active: true,
          link: { name: 'statkidescription' },
          isFavorite: false
        },
        {
          id:2,
          name: 'Połącz 4',
          img: Connect4Img,
          description: 'Połącz cztery piłki układając stos',
          active: true,
          link: { name: 'polacz4description' },
          isFavorite: false
        },
        {
          id:3,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id:4,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id:5,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id:6,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id:7,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id:8,
          name: 'Placeholder',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
      ]
    }
  },
  mutations: {
    toggleIsFavorite(state, id) {
      state.games[id].isFavorite=!state.games[id].isFavorite;
    }
  },
  actions: {
    toogleFavorite(context, id) {
      context.commit('toggleIsFavorite', id);
    }
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getFavoriteGames(state) {
      return state.games.filter(game => game.isFavorite);
    }
  }
};