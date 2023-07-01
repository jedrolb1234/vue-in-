export default {
    namespaced: true,
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

            firstLoad: true,
            disable_animation: 'disable-animation',
            boardTable1: 'board-table1'
            }
        },
    getters:{ 
        getVLoop(state){
            return state.vLoop;
        },
        board_table1(state){
            if(state.firstLoad){
                return state.disable_animation;
            }
            return state.boardTable1;
        },
        getClass(state, field){
            return state.board[field];
            },
        
        getOponentClass(state, field){
            return state.oponentBoard[field];
        },
        chooseMethod(state, field){
            if(state.commit('check', field)){
                return state.setShip(field);
            }
            else if(state.commit('checkClicked')){
                state.unSetShip(field);
            }
        },
        selectTag(state, field){
            return state.oponentBoard[field]; 
        }
    },
    mmutations:{
        check(state, field){
            return !state.clicked.includes(field);
        },
        checkClicked(state, field){
            return state.clicked.includes(field);
        }},
    actions:{
        setShip(context, field){
            context.firstLoad = false;
            if(context.dispatch('checkLocation', field) && context.dispatch('checkNeighbor'), field){
                if (!context.clicked.includes(field)){
                    context.clicked.push(field);
                    context.board[field] = context.ship;
                    console.log(context.board[field]);
                }
            }
            context.shipNumber();
        },
        unSetShip(context,field){
            if(context.clicked.includes(field)){
                context.setShipCounter++;
                let index = context.clicked.indexOf(field);
                context.clicked.splice(index,1);
                context.board[field] = context.empty2;
                console.log('board', context.board[field]);
                console.log('tablica', context.clicked);
            }
            context.shipNumber()
        },
        mark(context, getters, field){//gettery
            if(getters.selectTag(field) === context.hipOponent || context.emptyOponent){
                context.oponentRecieve.push(field);
                if(context.oponentBoard[field] === context.shipOponent){
                    context.oponentBoard[field] = context.hitOponent;
                    console.log(context.oponentBoard[field]);
                }
                else if(context.oponentBoard[field] === context.emptyOponent){
                    context.oponentBoard[field] = context.missedOponent;
                }
            }
            else if(getters.selectTag(field) === ('hitOponent' ||  'missedOponent')){
                return
            }
        },

        checkLocation(context, field){
            let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let yTmp = y + 1;
            let position = xTmp.toString() + yTmp.toString();
            if (context.board[position] === context.ship){
                isAbleToPut = false;
            }
            xTmp = x + 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.board[position] === context.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y + 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.board[position] === context.ship){
                isAbleToPut = false;
            }
            xTmp = x - 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.board[position] === context.ship){
                isAbleToPut = false;
            }
            return isAbleToPut;
        
        },
        checkNeighbor(context, field){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship) && 
                (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship)&& (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship) && 
                (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship)&& (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship) && 
                (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship)
                && (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
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
            if ((context.board[position] === context.ship) && (context.board[position2] === context.ship) && 
                (context.board[position3] === context.ship) && (context.board[position4] === context.ship)){
                    isAbleToPut = false;
            }
            return isAbleToPut
        },

        shipNumber(context){
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
                    if(context.board[field] === context.ship){
                        y1 = j - 1;
                        upField = iTmp + y1.toString();
                        if(context.board[upField] === context.ship){
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

                        if(context.board[field1] !== context.ship){
                            counter++;
                        }
                        if((context.board[field1] === context.ship) && (context.board[field2] !== context.ship)){
                            counter = 2;
                        }
                        else if((context.board[field1] === context.ship) && (context.board[field2] === context.ship) 
                            && context.board[field1] !== context.ship){
                                counter = 3;
                            }
                        else if((context.board[field1] === context.ship) && (context.board[field2] === context.ship) 
                            && (context.board[field3] === context.ship)){
                                counter = 4;
                            }
                        }
                    x1 = i + 1;
                    field4 = x1.toString() + jTmp;
                    if((context.board[field4] !== context.ship)){
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
            context.oneCounter = oneCounter;
            context.twoCounter = twoCounter;
            context.threeCounter = threeCounter;
            context.fourCounter = fourCounter;
        }
    }
}