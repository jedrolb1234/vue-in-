<template>
    <div class = "container">
        <div class = "player1-container">
            <table :class = "board_table1">
                <tr v-for="(t,key) in vLoop" :key='key'>
                    <td v-for="(p, idx) in t"  :key="idx"
                         :class="getClass(p)" @click="chooseMethod(p)"></td>
                </tr>
            </table>
            <div class="shipCounter">
            <div class="counterFour"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ fourCounter }}</p></div>
            <div class="counterThree"><p class="shipImage"></p><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ threeCounter }}</p></div>
            <div class="counterTwo"><p class="shipImage"></p><p class="shipImage"></p><p class="shipCount">{{ twoCounter }}</p></div>
            <div class="counterOne"><p class="shipImage"></p><p class="shipCount">{{ oneCounter }}</p></div>
            </div>

        </div>
        <div class = "player2-container">
            <table class = "board-table2">
                <tr v-for="(t,key) in vLoop" :key='key'>
                    <td v-for="(p, idx) in t" :key="idx"
                     :class="getOponentClass(p)" @click = "mark(p)"></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';
export default {
//     data(){
//         return{
//             fourCounter:2,
//             threeCounter:3,
//             twoCounter:4,
//             oneCounter:5,
//         }
//     },
// methods:{
//     ...mapActions('Statki', ['mark', 'chooseMethod']),
// },
// computed:{
//     ...mapGetters('Statki', ['getClass', 'getOponentClass', 'getVLoop']),
// }
    data(){
        return{
            vLoop:{
                '0': ['00', '10','20','30','40','50','60','70'],
                '1': ['01', '11','21','31','41','51','61','71'],
                '2': ['02', '12','22','32','42','52','62','72'],
                '3': ['03', '13','23','33','43','53','63','73'],
                '4': ['04', '14','24','34','44','54','64','74'],
                '5': ['05', '15','25','35','45','55','65','75'],
                '6': ['06', '16','26','36','46','56','66','76'],
                '7': ['07', '17','27','37','47','57','67','77'],
                // '8': ['08', '18','28','38','48','58','68','78','88','98'],
                // '9': ['09', '19','29','39','49','59','69','79','89','99'],
            },
            board:{
                '00':'empty', '10':'empty','20':'empty','30':'empty','40':'empty','50':'empty','60':'empty','70':'empty',
                '01':'empty', '11':'empty','21':'empty','31':'empty','41':'empty','51':'empty','61':'empty','71':'empty',
                '02':'empty', '12':'empty','22':'empty','32':'empty','42':'empty','52':'empty','62':'empty','72':'empty',
                '03':'empty', '13':'empty','23':'empty','33':'empty','43':'empty','53':'empty','63':'empty','73':'empty',
                '04':'empty', '14':'empty','24':'empty','34':'empty','44':'empty','54':'empty','64':'empty','74':'empty',
                '05':'empty', '15':'empty','25':'empty','35':'empty','45':'empty','55':'empty','65':'empty','75':'empty',
                '06':'empty', '16':'empty','26':'empty','36':'empty','46':'empty','56':'empty','66':'empty','76':'empty',
                '07':'empty', '17':'empty','27':'empty','37':'empty','47':'empty','57':'empty','67':'empty','77':'empty'
            },
            oponentBoard:{
                '00':'emptyOponent', '10': 'shipOponent', '20': 'emptyOponent', '30': 'emptyOponent', '40': 'shipOponent', '50': 'shipOponent', '60':'emptyOponent', '70': 'emptyOponent',
                '01':'emptyOponent', '11': 'emptyOponent', '21': 'emptyOponent', '31': 'emptyOponent', '41': 'emptyOponent', '51': 'emptyOponent', '61':'emptyOponent', '71': 'emptyOponent',
                '02':'emptyOponent', '12': 'shipOponent', '22': 'emptyOponent', '32': 'emptyOponent', '42': 'shipOponent', '52': 'emptyOponent', '62':'emptyOponent', '72': 'emptyOponent',
                '03':'emptyOponent', '13': 'shipOponent', '23': 'emptyOponent', '33': 'emptyOponent', '43': 'emptyOponent', '53': 'emptyOponent', '63':'emptyOponent', '73': 'emptyOponent',
                '04':'emptyOponent', '14': 'emptyOponent', '24': 'emptyOponent', '34': 'emptyOponent', '44': 'emptyOponent', '54': 'emptyOponent', '64':'emptyOponent', '74': 'emptyOponent',
                '05':'emptyOponent', '15': 'emptyOponent', '25': 'shipOponent', '35': 'emptyOponent', '45': 'shipOponent', '55': 'emptyOponent', '65':'emptyOponent', '75': 'emptyOponent',
                '06':'emptyOponent', '16': 'shipOponent', '26': 'emptyOponent', '36': 'emptyOponent', '46': 'emptyOponent', '56': 'emptyOponent', '66':'emptyOponent', '76': 'emptyOponent',
                '07':'emptyOponent', '17': 'shipOponent', '27': 'emptyOponent', '37': 'shipOponent', '47': 'emptyOponent', '57': 'shipOponent', '67':'emptyOponent', '77': 'emptyOponent'
            },
            ship: 'ship',
            shipOponent:'shipOponent',
            empty: 'empty',
            empty2: 'empty2',
            emptyOponent: 'emptyOponent',
            hit: 'hit',
            hitOponent: 'hitOponent',
            missedOponent: 'missedOponent',
            counter:12,
            clicked:[],
            oponentRecieve: [],
            setShipCounter:12,
            fourCounter:2,
            threeCounter:3,
            twoCounter:4,
            oneCounter:5,
            firstLoad: true,
            disable_animation: 'disable-animation',
            boardTable1: 'board-table1'
        }
    },
    computed:{
        board_table1(){
            if(this.firstLoad){
                return this.disable_animation;
            }
            return this.boardTable1;
        }
    },
    methods:{
        getClass(field){
            return this.board[field];
        },
        chooseMethod(field){
            if(this.check(field)){
                return this.setShip(field);
            }
            else if(this.checkClicked){
                this.unSetShip(field);
            }
        },
        getOponentClass(field){
            return this.oponentBoard[field];
        },
        check(field){
            return !this.clicked.includes(field);
        },
        checkClicked(field){
            return this.clicked.includes(field);
        },  
        setShip(field){
            this.firstLoad = false;
            if(this.checkLocation(field) && this.checkNeighbor(field)){//} && this.checkLength(field)){
                if (!this.clicked.includes(field)){
                    this.clicked.push(field);
                    this.board[field] = this.ship;
                    console.log(this.board[field]);
                }
            }
            this.shipNumber();
        },
        unSetShip(field){
            if(this.clicked.includes(field)){
                this.setShipCounter++;
                let index = this.clicked.indexOf(field);
                this.clicked.splice(index,1);
                this.board[field] = this.empty2;
                console.log('board', this.board[field]);
                console.log('tablica', this.clicked);
            }
            this.shipNumber()
        },

        selectTag(field){
            return this.oponentBoard[field]; 
        },

        mark(field){
            if(this.selectTag(field) === this.hipOponent || this.emptyOponent){
                this.oponentRecieve.push(field);
                if(this.oponentBoard[field] === this.shipOponent){
                    this.oponentBoard[field] = this.hitOponent;
                    console.log(this.oponentBoard[field]);
                }
                else if(this.oponentBoard[field] === this.emptyOponent){
                    this.oponentBoard[field] = this.missedOponent;
                }
            }
            else if(this.selectTag(field) === ('hitOponent' ||  'missedOponent')){
                return
            }
        },

        checkLocation(field){
            let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let yTmp = y + 1;
            let position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y + 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (this.board[position] === this.ship){
                isAbleToPut = false;
            }
            return isAbleToPut;
        
        },
        checkNeighbor(field){
            let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let xTmp2 = x + 2;
            let xTmp3 = x + 3;
            let xTmp4 = x + 4;
            let yTmp = y; 
            let yTmp2, yTmp3, yTmp4;
            let position = xTmp.toString() + yTmp.toString();
            let position2 = xTmp2.toString() + yTmp.toString();
            let position3 = xTmp3.toString() + yTmp.toString();
            let position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            xTmp = x - 1;
            xTmp2 = x - 2;
            xTmp3 = x - 3;
            xTmp4 = x - 4;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship)&& (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x + 2;
            xTmp3 = x - 1;
            xTmp4 = x - 2;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x - 1;
            xTmp3 = x - 2;
            xTmp4 = x - 3;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();    
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            xTmp2 = x + 2;
            xTmp3 = x + 3;
            xTmp4 = x - 1;
            yTmp = y;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp2.toString() + yTmp.toString();
            position3 = xTmp3.toString() + yTmp.toString();
            position4 = xTmp4.toString() + yTmp.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y + 3;
            yTmp4 = y + 4;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            yTmp = y - 1;
            yTmp2 = y - 2;
            yTmp3 = y - 3;
            yTmp4 = y - 4;
            xTmp = x;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship)&& (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }
            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y - 1;
            yTmp4 = y - 2;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            xTmp = y + 1;
            yTmp2 = y - 1;
            yTmp3 = y - 2;
            yTmp4 = y - 3;
            xTmp = x;
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship)
                && (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                isAbleToPut = false;
            }

            yTmp = y + 1;
            yTmp2 = y + 2;
            yTmp3 = y + 3;
            yTmp4 = y - 1;
            xTmp = x; 
            position = xTmp.toString() + yTmp.toString();
            position2 = xTmp.toString() + yTmp2.toString();
            position3 = xTmp.toString() + yTmp3.toString();
            position4 = xTmp.toString() + yTmp4.toString();
            if ((this.board[position] === this.ship) && (this.board[position2] === this.ship) && 
                (this.board[position3] === this.ship) && (this.board[position4] === this.ship)){
                    isAbleToPut = false;
            }
            return isAbleToPut
        },
    
        shipNumber(){
            console.log('enter');
            let oneCounter = 5;
            let twoCounter = 4;
            let threeCounter = 3;
            let fourCounter = 2;
            let field, field1, field2, field3, field4, iTmp, x1, jTmp, y1, y2, y3, yLower1, yLower2, yLower3, upField;
            let counter = 0;
            for(let j = 0; j < 8; j++){
                for(let i= 0; i < 8; i++){
                    iTmp = i.toString();
                    jTmp = j.toString();
                    field = iTmp + jTmp;
                    if(this.board[field] === this.ship){
                        y1 = j - 1;
                        upField = iTmp + y1.toString();
                        if(this.board[upField] === this.ship){
                            continue;
                        }
                        y1 = j + 1;
                        y2 = j + 2;
                        y3 = j + 3;
                        yLower1 = y1.toString();
                        yLower2 = y2.toString();
                        yLower3 = y3.toString();
                        field1 = iTmp + yLower1;
                        field2 = iTmp + yLower2;
                        field3 = iTmp + yLower3;

                        if(this.board[field1] !== this.ship){
                            counter++;
                        }
                        if((this.board[field1] === this.ship) && (this.board[field2] !== this.ship)){
                            counter = 2;
                        }
                        else if((this.board[field1] === this.ship) && (this.board[field2] === this.ship) 
                            && this.board[field1] !== this.ship){
                                counter = 3;
                            }
                        else if((this.board[field1] === this.ship) && (this.board[field2] === this.ship) 
                            && (this.board[field3] === this.ship)){
                                counter = 4;
                            }
                        }
                    x1 = i + 1;
                    field4 = x1.toString() + jTmp;
                    if((this.board[field4] !== this.ship)){
                        if(counter === 1){
                            oneCounter--;
                            counter = 0;
                        }
                        else if(counter === 2){
                            twoCounter--;
                            counter = 0;
                        }
                        else if(counter === 3){
                            threeCounter--;
                            counter = 0;
                        }
                        else if(counter === 4){
                            fourCounter--;
                            counter = 0;
                        }                        
                    }
                }
            }
            this.oneCounter = oneCounter;
            this.twoCounter = twoCounter;
            this.threeCounter = threeCounter;
            this.fourCounter = fourCounter;
        }
    }
}
</script>

<style scoped>
.container{
    display:flex;
    justify-content: center;
}
.player1-container{
    background-color: palegreen;
    float: left;
    height: 300px;
    width: 300px;
}

.player2-container{
    background-color: darkcyan;
    height: 300px;
    width: 300px;
    margin-left: 50px;
}
.board-table1{
    border-spacing: 0px;
}
.board-table2{
    border-spacing: 0px;
}
td{
    border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
img{
    width:32px;
    height:25px;
    margin-top: 2px;
}
.ship{
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    animation: show 1000ms forwards ease;
}
.empty{
    background-size: cover;
}

.empty2{
    background-size: cover;
    animation: sink 1000ms forwards ease; 
}
.emptyOponent{
    background-color: aqua;
}
.emptyOponent:hover{
    background-image: url('@/assets/games/image/celownik.png');
    background-size: cover;
}
.shipOponent:hover{
    background-image: url('@/assets/games/image/celownik.png');
    background-size: cover;
}
.shipOponent{
    size: cover;
    background-color: aqua;
}

.hit{
    background-image: url('@/assets/games/image/cbomb.png');
    background-size: cover;
}
/*
@keyframes sink{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-image: url('./image/sss.png'); border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
}
@keyframes show{
    from {transform: rotateY(0); border: none;}
    80% {transform: rotateY(90deg); opacity: 100%;}
    99% {opacity: 0; transform: rotateY(90deg); background-color: palegreen; border: none;}
    100% {opacity: 100%; background-image: none; border: 0.5px black solid;}
}
*/

@keyframes sink {
  0% {
    opacity: 0;
    transform: rotateY(0deg); 
    background-image: url('@/assets/games/image/sss.png');
  }
  100% {
    opacity: 1;
    transform: rotateY(180deg);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
.disable-animation{
    border-spacing: 0px;
}
.disable-animation td {
  animation: none !important;
  border-style: solid;
    border-width: 0.5px;
    border-color: black;
    width: 37.5px;
    height: 37.5px;
}
.hitPlayer{
    width: 37.5px;
    height: 37.5px;
    animation: sink 2000ms forwards ease;
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
@keyframes explosion {
    from {transform: scale(0%); border: none;}
    70% {transform: scale(150%); border: none; opacity: 100%;}
    to {border: 0.5px black solid; opacity: 0;}
}
.hitOponent{
    animation: explosion 350ms;
    background-image: url('@/assets/games/image/bomb.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.missedOponent{
    animation: explosion 350ms;
    background-image: url('@/assets/games/image/cross.png');
    background-size: cover;
}

.counterFour .counterThree .counterTwo .counterOne{
    flex-wrap: wrap;
}
.counter4 .counter3 .counter2 .counter1{
    flex-wrap: wrap;
}

.shipImage{
    width: 37.5px;
    height: 37.5px;
    background-image: url('@/assets/games/image/sss.png');
    background-size: cover;
    display: inline-block;
    box-sizing: border-box;
    margin: 0px;
    padding:0px;
}
.shipCount{
    display: inline-block;
    box-sizing: border-box;
    width: 37.5px;
    height: 37.5px;
    margin: 0px;
    padding-bottom:10px;
}
</style>