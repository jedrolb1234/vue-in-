import CheckersImg from '@/assets/games/checkers/warcaby.jpg';
import CheckersImgLarge from '@/assets/games/checkers/warcaby_large.jpg'
import BattleshipImg from '@/assets/games/battleship/battleship.jpg';
import BattleshipImgLarge from '@/assets/games/battleship/battleship_large.jpeg';
import Connect4Img from '@/assets/games/connect/polacz4.jpg';
import Connect4ImgLarge from '@/assets/games/connect/polacz4_large.jpg';
import PlaceholderImg from '@/assets/games/placeholder.jpg';

export default {
  state() {
    return {
      theme: 0,
      games: [
        {
          id: 0,
          name: 'Warcaby',
          img: CheckersImg,
          imgLarge: CheckersImgLarge,
          shortDescription: 'Popularna gra planszowa dla każdego',
          description: 'Warcaby to jedna z najpopularniejszych gier planszowych na świecie, ta strategiczna gra logiczna nie tylko rozwija umiejętności planowania, ale również oferuje emocjonujące wyzwania dla umysłu. Ta gra jest świetnym sposobem na spędzenie czasu. Gra toczy się w turach, czyli po jednym ruchu, biciu lub wielokrotnym biciu na przemian dla każdego z graczy. Zalecany wiek najmłodszego gracza to 4 rok życia. Średni czas trwania gry to 10 min. W pracy jest opisywana rosyjska wersja gry.',
          rules: [
            'gra toczy się na planszy o rozmiarach 8 × 8 pól,',
            'każdy z graczy rozpoczyna grę z 12 pionkami,',
            'w grze biorą udział dwie strony z pionkami o kolorze czarnym lub białym,',
            'grę rozpoczyna losowy gracz, losowo też przydzielany jest kolor pionków,',
            'pionki są rozmieszczone na brązowych polach,',
            'pionki stoją na przeciwległych końcach planszy dla pierwszego gracza w rzędach od 1 do 3, dla drugiego na rzędach od 6 do 8,',
            'podstawowym ruchem w grze w warcaby jest bicie pionków przeciwnika poprzez skakanie nad nimi,',
            'istnieją dwa rodzaje pionków: pionki zwykłe i damki,',
            'pionki zwykłe mogą poruszać się tylko po skosie, o jedno pole na raz,',
            'jeśli pionek zwykły dotrze do przeciwnej krawędzi planszy, zostaje zamieniony na damkę,',
            'jeżeli pionek dojdzie do ostatniego pola i ma do wykonania bicie, zostaje damką i kontynuuje bicie,',
            'damka może poruszać się zarówno do przodu jak i do tyłu po skosie, o dowolną liczbę pól,',
            'jeśli pionek znajduje się obok pionka przeciwnika po skosie, a pole za pionkiem jest wolne, należy wykonać skok nad nim, usuwając go z planszy,',
            'bicia pionków są obowiązkowe, niewykonanie obowiązkowego bicia powoduje wycofanie ruchu pionka, który wykonał zwykły ruch,',
            'bicie damką jest możliwe z dowolnej odległości po linii przekątnej i następuje przez przeskoczenie pionka (lub damki) przeciwnika, za którym musi znajdować się co najmniej jedno wolne pole. Damka przeskakuje na dowolne z tych pól i może kontynuować bicie,',
            'konieczne jest wykonanie wielokrotnych skoków w jednym ruchu, wykorzystując to, że pionek musi skakać nad pionkami przeciwnika, jeśli istnieje wolne pole za nimi,',
            'jeśli istnieje na planszy więcej niż jeden pionek, który może wykonać bicie, należy wykonać dowolne bicie,',
            'zbite pionki są usuwane z planszy po zakończeniu ruchu,',
            'zwycięzcą zostaje gracz, który zbije wszystkie pionki przeciwnika z planszy.'          
          ],
          active: true,
          link: { path: '/games/0'},
          // play: { name: 'warcaby' },
          isFavorite: false
        },
        {
          id: 1,
          name: 'Okręty',
          img: BattleshipImg,
          imgLarge: BattleshipImgLarge,
          shortDescription: 'Wygraj z przeciwnikiem strącając okręty z jego planszy',
          description: 'Okręty to tradycyjna gra planszowa, w którą można grać online. Celem gry jest trafienie okrętu przeciwnika, który jest ukryty na planszy, na jednym z dostępnych pól. Okręty to gra wymagająca umiejętności strategicznych. Należy starannie rozważać swoje ruchy i dokładnie analizować planszę, aby odkryć ukryte okręty przeciwnika. Ta gra to rywalizacja z przeciwnikiem, która pozwala podzielić się osiągnięciami i strategiami. Ta gra wymaga koncentracji i dostosowania się do zmieniającej się sytuacji na planszy. Gra okręty jest rozgrywana na dwóch planszach ułożonych obok siebie. Na lewej planszy zostały wcześniej ustawione okręty użytkownika, na prawej planszy odkrywane będą okręty przeciwnika.  Okręty to gra turowa, co oznacza, że po wykonaniu ruchu, kolejny ruch będzie wykonywał przeciwnik. Zalecany wiek najmłodszego gracza to 6 rok życia. Średni czas trwania gry to 10 min.',
          rules: [
            'podczas każdej gry dostępne są 2 plansze 10 × 10 pól, ułożone obok siebie,',
            'na początku gry, od gracza wymagane jest ustawienie okrętów na planszy,',
            'generować planszę można wielokrotnie do momentu jej zatwierdzenia,',
            'okręty rozmieszczone są w pionie lub poziomie tylko w linii prostej. Łączna liczba okrętów na planszy wynosi 10: 1 okręt zajmujący 4 pola, 2 okręty zajmujące 3 pola, 3 okręty zajmujące 2 pola, 4 okręty zajmujące 1 pole,',
            'okręty nie mogą stykać się ze sobą rogami ani bokami,',
            'po zatwierdzeniu planszy przez obu graczy rozpoczyna się rozgrywka,',
            'grę rozpoczyna losowy gracz,',
            'gracze wykonują ruchy w turach,',
            'w swojej turze należy wybrać pole na prawej planszy (rys, 4), tak aby trafić okręt, ',
            'po trafieniu przeciwnika na prawej planszy, pole zostaje oznaczone jako „trafione”, w przeciwnym wypadku pole zostaje oznaczone jako „pudło,”',
            'jeśli na wybranym polu znajdował się okręt przeciwnika, gracz otrzymuje dodatkową turę,',
            'jeśli przeciwnik wykonał ruch, zostaje to oznaczone  jako „trafiony” lub „pudło” na lewej planszy,',
            'po zatopieniu okrętu na prawej planszy wyświetlane są podpowiedzi z pustymi polami,',
            'celem gry jest zatopienie wszystkich okrętów przeciwnika.'

          ],
          active: true,
          link: { path: '/games/1'},
          isFavorite: false
        },
        {
          id: 2,
          name: 'Połącz 4',
          img: Connect4Img,
          imgLarge: Connect4ImgLarge,
          shortDescription: 'Połącz cztery piłki układając stos',
          description: 'Celem gry jest ułożenie czterech żetonów w jednej linii – poziomo, pionowo lub na skos. Należy analizować ruchy przeciwnika lub znaleźć idealną okazję do ułożenia swoich żetonów w linii. W grze wykorzystywana jest spostrzegawczość i zdolność planowania, aby zdominować planszę i pokonać przeciwnika. Połącz 4 to sposób na rywalizację z innymi graczami. Ta gra jest łatwa do nauki. Rozgrywka przebiega sekwencyjnie, co oznacza, że każdy gracz rozstawia swój żeton na przemian z przeciwnikiem.  Zalecany wiek najmłodszego gracza to 3 lata. Średni czas trwania gry to 3 min.',
          rules: [
            'gra toczy się na planszy 6 × 7, która składa się z 6 wierszy i 7 kolumn,',
            'każdemu z graczy przydzielany jest jeden kolor żetonów: czerwone lub żółte,',
            'celem gry jest ułożenie czterech żetonów swojego koloru w jednej linii – pionowo, poziomo lub na ukos,',
            'grę rozpoczyna losowy gracz,',
            'gracze wykonują ruchy na zmianę, umieszczając swoje żetony w jednej z siedmiu kolumn,',
            'żeton spada do najniższego wolnego pola w wybranej kolumnie,',
            'po umieszczeniu żetonu, gracze nie mają możliwości jego przesunięcia,',
            'gracz, który jako pierwszy ułoży cztery swoje żetony w linii, wygrywa grę.'
          ],
          active: true,
          link: { path: '/games/2'},
          // play: { name: 'polacz4'},
          isFavorite: false
        },
        {
          id: 3,
          name: 'Gra 4',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id: 4,
          name: 'Gra 5',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id: 5,
          name: 'Gra 6',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id: 6,
          name: 'Gra 7',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id: 7,
          name: 'Gra 8',
          img: PlaceholderImg,
          description: 'Short description for placeholder game',
          active: false,
          isFavorite: false
        },
        {
          id: 8,
          name: 'Gra 9',
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
      state.games[id].isFavorite = !state.games[id].isFavorite;
    },
    setTheme(state, index){
      let theme;
      if (index == 0){
        theme = 'light';
        state.theme = 'light'
      }else{
        theme = 'dark';
        state.theme = 'dark'
      }
      sessionStorage.setItem('theme', theme);
    }
  },
  actions: {
    toogleFavorite(context, id) {
      context.commit('toggleIsFavorite', id);
    },
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    getGame: (state) => (id) => {
      return state.games[id];
    },
    getFavoriteGames(state) {
      return state.games.filter(game => game.isFavorite);
    },
    getStateTheme(state){
      return state.theme;
    }
  }
};