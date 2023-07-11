export default {
    namespaced: true,
    state(){
        return{
            vLoop:{
                '0': ['00','10','20','30','40','50','60','70'],
                '1': ['01','11','21','31','41','51','61','71'],
                '2': ['02','12','22','32','42','52','62','72'],
                '3': ['03','13','23','33','43','53','63','73'],
                '4': ['04','14','24','34','44','54','64','74'],
                '5': ['05','15','25','35','45','55','65','75'],
                '6': ['06','16','26','36','46','56','66','76'],
                '7': ['07','17','27','37','47','57','67','77'],
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
            clicked: [],
            oponentRecive: [],
            setShipCounter:12,
            firstLoad: true,
            disable_animation: 'disable-animation',
            boardTable1: 'board-table1',
            fourCounter:2,
            threeCounter:3,
            twoCounter:4,
            oneCounter:5,
            isCheckFalse: false,
            isCheckClicked: false,
            clickedIn: false,
            clickedNotIn: false,
            index:0,
            isAbleToPut: true,
            }
        },
    getters:{ 
        getVLoop(state){
            return state.vLoop;
        },
        getBoardTable1(state){
            if(state.firstLoad){
                return state.disable_animation;
            }
            return state.boardTable1;
        },
        getClass:(state) => (p)=>{
            console.log(state.board[p])
            return state.board[p];
            },
        
        getOponentClass: (state) => (p) =>{
            return state.oponentBoard[p];
        },
        getOneCounter(state){
            return state.oneCounter;
        },
        getTwoCounter(state){
            return state.twoCounter;
        },
        getThreeCounter(state){
            return state.threeCounter;
        },
        getFourCounter(state){
            return state.fourCounter;
        }
    },
    mutations:{
        check(state, field){
            state.isCheckFalse = !state.clicked.includes(field);
        },
        checkClicked(state, field){
            state.isCheckClicked = state.clicked.includes(field);
        },
        clickedField(state, field){
            state.index = state.clicked.indexOf(field);
        },
        cutClicked(state, index){
            state.clicked.splice(index,1);
        },
        setBoard(state, payload){
            state.board[payload] = state.empty2;
        },
        setOponentBoard(state, payload){
            state.oponentBoard[payload.key] = payload.value;
        },
        setBoardShip(state, key){
            state.board[key] = state.ship;
        },
        clickedPush(state, field){
            state.clicked.push(field);
        },
        setShipCounter(state, value){
            state.setShipCounter += value;
        },
        setOponentRecive(state, value){
            state.oponentRecive.push(value);
        },
        selectTag(state, field){
            return state.oponentBoard[field]; 
        },
        clickedNotIn(state, field){
            state.clickedNotIn = !state.clicked.includes(field)
        },
        setClickedIn(state, field){
            state.clickedIn = state.clicked.includes(field)
        },
        isAbleToPut(state, value){
            state.isAbleToPut = value;
        },
        incCounter(state, value){
            state.counter += value;
        },
        setOneCounter(state, value){
           state.oneCounter = value;
        },
        setTwoCounter(state, value){
            state.twoCounter = value;
        },
        setThreeCounter(state, value){
            state.threeCounter = value;
        },
        setFourCounter(state, value){
            state.fourCounter = value;
        }
    },
    actions:{
        chooseMethod({ commit, dispatch, state }, field){
            commit('check', field);
            commit('checkClicked', field);
            if(state.isCheckFalse){
                return dispatch('setShip', field);
            }
            else if(state.isCheckClicked){
                return dispatch('unSetShip',field);
            }
            
        },
        setShip(context, field){
            context.firstLoad = false;
            context.commit('isAbleToPut', true);
            context.commit('clickedNotIn', field)
            context.dispatch('checkLocation', field);
            context.dispatch('checkNeighbor', field);
            if(context.state.isAbleToPut){
            // if(context.dispatch('checkLocation', field) && context.dispatch('checkNeighbor', field)){
                if (context.state.clickedNotIn){
                    context.commit('clickedPush', field);
                    context.commit('setBoardShip', field);
                }
            }
            context.dispatch('shipNumber');
        },
        unSetShip({ commit, dispatch, state }, field) {
            commit('setClickedIn', field);
            if (state.clickedIn) {
              commit('setShipCounter', 1);
              commit('clickedField', { key: field, value: state.hitOponent });
              commit('cutClicked', state.index);
              commit('setBoard', field);
            }       
            dispatch('shipNumber');
          },
          
        // unSetShip({ commit, context }, field){
        //     commit('setClickedIn', field)
        //     console.log(field)
        //     console.log(context.clickedIn)
        //     if(context.clickedIn){
        //         context.commit('setShipCounter', 1);
        //         let index = commit('clickedField', { key: field, value: context.state.hitOponent });
        //         context.commit('clickedField', index);
        //         context.commit('setBoard', field);
        //         console.log('board', context.state.board[field]);
        //         console.log('tablica', context.state.clicked);
        //     }
        //     context.dispatch('shipNumber');
        //     },
        mark(context, field){//gettery
            if(context.commit('selectTag', field) === context.state.hipOponent || context.state.emptyOponent){
                context.commit('setOponentRecive', field);
                if(context.state.oponentBoard[field] === context.state.shipOponent){
                    context.commit('setOponentBoard', { key: field, value: context.state.hitOponent });

                }
                else if(context.state.oponentBoard[field] === context.state.emptyOponent){
                    context.commit('setOponentBoard', { key: field, value: context.state.missedOponent });
                    
                }
            }
            else if(context.commit('selectTag', field) === ('hitOponent' ||  'missedOponent')){
                return
            }
        },

        checkLocation(context, field){
            //let isAbleToPut = true;
            let x = parseInt(field[0]);
            let y = parseInt(field[1]);
            let xTmp = x + 1;
            let yTmp = y + 1;
            let position = xTmp.toString() + yTmp.toString();
            if (context.state.board[position] === context.state.ship){
                context.commit('isAbleToPut', false);
            }
            xTmp = x + 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.state.board[position] === context.state.ship){
                context.commit('isAbleToPut', false);
            }
            xTmp = x - 1;
            yTmp = y + 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.state.board[position] === context.state.ship){
                context.commit('isAbleToPut', false);
            }
            xTmp = x - 1;
            yTmp = y - 1;
            position = xTmp.toString() + yTmp.toString();
            if (context.state.board[position] === context.state.ship){
                context.commit('isAbleToPut', false);
            }
        },
        checkNeighbor(context, field){
            // let isAbleToPut = true;
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) && 
                (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship)&& (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) && 
                (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship)&& (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) && 
                (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship)
                && (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
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
            if ((context.state.board[position] === context.state.ship) && (context.state.board[position2] === context.state.ship) && 
                (context.state.board[position3] === context.state.ship) && (context.state.board[position4] === context.state.ship)){
                    context.commit('isAbleToPut', false);
            }
        },

        shipNumber(context){
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
                    if(context.state.board[field] === context.state.ship){
                        y1 = j - 1;
                        upField = iTmp + y1.toString();
                        if(context.state.board[upField] === context.state.ship){
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

                        if(context.state.board[field1] !== context.state.ship){
                            counter++;
                        }
                        if((context.state.board[field1] === context.state.ship) && (context.state.board[field2] !== context.state.ship)){
                            counter = 2;
                        }
                        else if((context.state.board[field1] === context.state.ship) && (context.state.board[field2] === context.state.ship) 
                            && context.state.board[field1] !== context.state.ship){
                                counter = 3;
                            }
                        else if((context.state.board[field1] === context.state.ship) && (context.state.board[field2] === context.state.ship) 
                            && (context.state.board[field3] === context.state.ship)){
                                counter = 4;
                            }
                        }
                    x1 = i + 1;
                    field4 = x1.toString() + jTmp;
                    if((context.state.board[field4] !== context.state.ship)){
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
            context.commit('setOneCounter', oneCounter);
            context.commit('setTwoCounter', twoCounter);
            context.commit('setThreeCounter', threeCounter);
            context.commit('setFourCounter', fourCounter);
        }
    }
}