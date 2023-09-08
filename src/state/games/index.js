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
          description: 'Warcaby to jedna z najbardziej popularnych gier planszowych na świecie, która zapewnia wiele godzin świetnej zabawy dla graczy w każdym wieku. Ta strategiczna gra logiczna nie tylko rozwija umiejętności planowania, ale również oferuje emocjonujące wyzwania dla umysłu. Zachęcam Cię do zagrania w tę wciągającą grę, która może być świetnym sposobem na spędzenie czasu z rodziną i przyjaciółmi.',
          rules: [
            'W grze uczestniczą dwie strony, zwykle o różnych kolorach pionków, które stoją na przeciwległych końcach planszy.',
            'Podstawową strategią w grze w warcaby jest bicie pionków przeciwnika poprzez skakanie nad nimi.',
            'Pionki mogą poruszać się na planszy tylko po skosie.',
            'Istnieją dwa rodzaje pionków: pionki zwykłe i damki.',
            'Pionki zwykłe mogą poruszać się tylko do przodu po skosie, o jedno pole na raz.',
            'Jeśli pionek zwykły dotrze do przeciwnej krawędzi planszy, zostaje awansowany na damkę.',
            'Damka może poruszać się zarówno do przodu jak i do tyłu po skosie, o dowolną liczbę pól.',
            'Kiedy pion staje się damką ruch wykonuje przeciwnik.',
            'Jeśli Twój pionek znajduje się obok pionka przeciwnika po skosie, a pole za pionkiem jest wolne, musisz skoczyć nad nim, usuwając go z planszy.',
            'Bicia pionków są obowiązkowe.',
            'Bicie damką jest możliwe z dowolnej odległości po linii przekątnej i następuje przez przeskoczenie pionu (lub damki) przeciwnika, za którym musi znajdować się co najmniej jedno wolne pole damka przeskakuje na dowolne z tych pól i może kontynuować bicie.',
            'Musisz wykonywać wielokrotne skoki w jednym ruchu, wykorzystując to, że są one połączone i istnieje wolne pole za nimi.',
            'Jeśli istnieje na planszy więcej niż jeden pionek który może wykonać bicie, musimmy dokończyć bicia wszystkimi pionkami w jednej turze.',
            'Jeśli źle rozpoznamy sytuację na planszy i nie wykonamy bicia, pionek którym wykonamy zwykły ruch jest usówany z planszy.',
            'Zbite piony są usuwane z planszy po zakończeniu ruchu.',
            'Celem gry jest zbicie wszystkich pionków przeciwnika.'
          ],
          active: true,
          link: { path: '/games/0'},
          // play: { name: 'warcaby' },
          isFavorite: false
        },
        {
          id: 1,
          name: 'Statki',
          img: BattleshipImg,
          imgLarge: BattleshipImgLarge,
          shortDescription: 'Wygraj z przeciwnikiem strącając statki z jego planszy',
          description: 'Witaj w fascynującym świecie gry "Statki"! Ta emocjonująca gra strategiczna zapewni Ci godziny niesamowitej zabawy i wyzwań. Celem gry jest trafienie statku przeciwnika, który jest ukryty na planszy, na jednym z dostępnych pól. "Statki" to gra, która wymaga zarówno spostrzegawczości, jak i umiejętności strategicznych. Musisz starannie rozważać swoje ruchy i dokładnie analizować planszę, aby odkryć ukryte statki przeciwnika. Każde trafienie przynosi Ci ekscytację i satysfakcję. Przed Tobą nieskończone możliwości taktyczne. Możesz planować swoje ruchy, szukać wzorców i strategii, które pozwolą Ci odkryć statki przeciwnika w jak najkrótszym czasie. Czy wybierzesz losowe pola, czy zastosujesz bardziej złożone metody analizy planszy? Decyzja należy do Ciebie! Niezależnie od tego, czy grasz z przyjaciółmi na tradycyjnej planszy, czy korzystasz z wirtualnej wersji gry, "Statki" zawsze zapewni Ci wiele ekscytujących chwil. Możesz rywalizować z innymi graczami, podzielić się swoimi osiągnięciami i strategiami, a nawet uczestniczyć w turniejach online. Ta gra rozwija Twoje umiejętności logicznego myślenia, koncentracji i spostrzegawczości. Wymaga od Ciebie szybkiego podejmowania decyzji i adaptacji do zmieniającej się sytuacji na planszy. Bez względu na to, czy jesteś nowicjuszem, czy doświadczonym graczem, "Statki" dostarczą Ci niezapomnianych chwil rozrywki. Czas zacząć przygodę i odkryć, jak wiele frajdy może dostarczyć Ci gra "Statki"! Czekają na Ciebie emocje, strategie i zwycięstwa. Włącz wyobraźnię, zdobądź przewagę i pokaż swoje umiejętności taktyczne na morzu bitew!',
          rules: [
            'Podczas każdej gry dostępne są 2 plansze 10x10 pól.',
            'Na początku gry na lewej planszy gracz losuje statki do momentu, kiedy rozmieszczenie statków mu odpoowieada.',
            'Rozmieszczane są w pionie lub w poziomie 1 statek po 4 pola, 2 satki po 3 pola, 3 statki po 2 pola, 4 statków po 1 polu.',
            'Statki nie można rozkładać na ukos.',
            'Statki nie mogą się styktać bokami, nie mogą też się stykać w rogu.',
            'Po zatwierdzeniu planszy rozpoczyna się rozgrywka.',
            'Gracze wykonują ruchy w turach.',
            'W swojej turze należy wybrać pole na prawej planszy, tak aby strącić statek.',
            'Jeśli na wybranym polu znajdował się statek przeciwnika gracz otrzymuje dodatkową turę.',
            'Po trafieniu statku przeciwnika pole zostaje oznaczone "trafiony", w przeciwnym wypadku pole zostaje oznaczone "pudło".',
            'Jeśli przeciwnik wykonał ruch zostaje to odznaczone "trafiony" lub "pudło" na lewej planszy.',
            'Celem gry jest strącenie wszystkich statków przeciwnika.'
          ],
          active: true,
          link: { path: '/games/1'},
          // play: { name: 'statki' },
          isFavorite: false
        },
        {
          id: 2,
          name: 'Połącz 4',
          img: Connect4Img,
          imgLarge: Connect4ImgLarge,
          shortDescription: 'Połącz cztery piłki układając stos',
          description: 'Witaj w ekscytującej grze "Połącz 4"! Ta gra strategiczna sprawi, że będziesz w pełni zaangażowany i zapewni Ci niezliczone godziny zabawy w rywalizacji z przeciwnikiem. Celem gry jest ułożenie czterech piłek w jednej linii - pionowo, poziomo lub na ukos. Ta gra daje Ci nieskończone możliwości taktyczne. Musisz analizować ruchy przeciwnika i jednocześnie planować swoje własne, aby zablokować przeciwnika lub znaleźć idealną okazję do ułożenia swoich piłek w linii. Wykorzystaj swoją spostrzegawczość i zdolności planowania, aby zdominować planszę i pokonać przeciwnika. "Połącz 4" to doskonały sposób na rywalizację z rodzeństwem, przyjaciółmi czy rodziną. Możesz stworzyć własne strategie, rozwijać swoje umiejętności i eksperymentować z różnymi taktykami. Czy zdecydujesz się na atak agresywny, koncentrując się na szybkim ułożeniu czterech piłek w linii, czy też wybierzesz bardziej defensywną strategię, starając się blokować przeciwnika? Gra "Połącz 4" zapewni Ci niesamowite emocje, wzmocni Twoje zdolności logicznego myślenia i rozwija umiejętność podejmowania szybkich decyzji. Bez względu na to, czy jesteś nowicjuszem, czy doświadczonym graczem, ta gra jest łatwa do nauki, ale trudna do opanowania.',
          rules: [
            'Gra toczy się na planszy o wymiarach 6x7, która składa się z 6 wierszy i 7 kolumn.',
            'Gracze otrzymują piłki dwóch różnych kolorów, czerwone lub żółte.',
            'Gracz na swojej planszy zawsze rozstawia czerwone piłki, żółte są piłkami przeciwnika.',
            'Celem gry jest ułożenie czterech piłek swojego koloru w jednej linii - pionowo, poziomo lub na ukos.',
            'Gracze wykonują ruchy na zmianę, umieszczając swoje piłki w jednej z siedmiu kolumn.',
            'Piłka spada do najniższego wolnego pola w wybranej kolumnie.',
            'Po umieszczeniu piłki, gracze nie mają możliwości jej przesunięcia.',
            'Celem gracza jest budowanie linii składających się z czterech swoich piłek w jednym kierunku.',
            'Gracz, który jako pierwszy ułoży cztery swoje piłki w linii - pionowo, poziomo lub na ukos - wygrywa grę.',
            'Jeśli plansza zostanie całkowicie zapełniona piłkami, a żaden gracz nie ułożył czterech w linii, gra kończy się remisem.'
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