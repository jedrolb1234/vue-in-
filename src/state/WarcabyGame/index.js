export default{
    namespaced: true,
    state(){
        return{
            vLoop:{
                '0': ['w','01','w','03','w','05','w','07'],
                '1': ['10','w','12','w','14','w','16','w'],
                '2': ['w','21','w','23','w','25','w','27'],
                '3': ['30','w','32','w','34','w','36','w'],
                '4': ['w','41','w','43','w','45','w','47'],
                '5': ['50','w','52','w','54','w','56','w'],
                '6': ['w','61','w','63','w','65','w','67'],
                '7': ['70','w','72','w','74','w','76','w']
            },
            board : {'01': 'black-pawn', '03':'black-pawn', '05':'black-pawn', '07':'black-pawn',
                        '10':'black-pawn', '12':'black-pawn', '14':'black-pawn', '16':'black-pawn',
                        '21':'black-pawn', '23':'black-pawn', '25':'black-pawn', '27':'black-pawn',
                        '30':'empty', '32':'empty', '34':'empty', '36':'empty',
                        '41':'empty', '43':'empty', '45':'empty', '47':'empty',
                        '50':'white-pawn', '52':'white-king', '54':'white-pawn', '56':'white-pawn',
                        '61':'white-pawn', '63':'white-pawn', '65':'white-pawn', '67':'white-pawn',
                        '70':'white-pawn', '72':'white-pawn', '74':'white-pawn', '76':'white-pawn'
                    },

            blackPawn: 'black-pawn',
            blackKing: 'black-king',
            whitePawn: 'white-pawn',
            whiteKing: 'white-king',
            clickedClass: 'clicked',
            blackClass: 'Black',
            whiteEmpty: 'WhiteEmpty',
            w: 'w',
            selectedField: '',
            Empty: 'empty',
            turn: true,
            clicked: false,
            counter:0,
            lastClicked: null,
            clickedCell: null,
            clickedSecondCell: false,
            clickedMoveToCell : null,
            isMovable: true,
            active: false,
            ifMoveIsPossible: false,
            classValue: '',
            activeMove: false,
            }
        },
    getters:{
        getVLoop(state){
            return state.vLoop;
        },        
        getPawnClass:(state) => (field) => {
            if(field === state.w){
                return state.w;//isMovable
            }
               return state.board[field];
        },
        setClass(state){
            return state.classValue;
        },
        getW(state){
            return state.w;

        },
        getBlackClass(state){
            return state.blackClass;
        },
        getEmpty(state){
            return state.Empty;
        },
        getClickedClass(state){
            return state.clickedClass
        },
        getBoard:(state) => (key) => {
            return state.board[key];
        },
        getClickedSecondCell(state){
            return state.clickedSecondCell;
        },
        getIfMoveIsPossible(state){
            return state.ifMoveIsPossible;
        }, 
        getActiveMove(state){
            return state.activeMove
        },
        getClickedCell(state){
            return state.clickedCell;
        }
    },
    mutations:{
        setActive(state, value){
            state.active = value;
        },
        setSelectedField(state, key){
            state.selectedField = key;
        },
        setClicked(state, value){
            state.clicked = value;
        },
        setCounter(state, value){
            state.counter = value;
        },
        setLastClicked(state, key){
            state.lastClicked = key;
        },
        setClickedCell(state, key){
            state.clickedCell = key;
        },
        setClickedSecondCell(state, value){
            state.clickedSecondCell = value;
        },
        setClickedMoveToCell(state, value){
            state.clickedMoveToCell = value;
        },
        setIsMoving(state, value){
            state.isMoving = value;
        },
        setBoard(state, payload){
            state.board[payload.key] = payload.value;
            console.log(state.board[payload.key])
        },
        toogleTurn(state, value){
            state.turn = value;
        },
        setIfMoveIsPossible(state, value){
            console.log(value)
            state.ifMoveIsPossible = value;
        },
        setIsMovable(state, value){
            console.log(value)
            state.isMovable = value;
        },
        updateClassValue(state, value) {
            state.classValue = value;
        },
        setActiveMove(state, value){
            state.activeMove = value;
        }
        
    },
    actions:{
        move(context, key){
            console.log('0')
                if(context.state.board[key] !== context.state.Empty){
                    console.log('1')
                    if (context.state.counter % 2 === 0){
                        console.log('2')
                        if(context.state.board[key]){// && context.state.turn){
                            console.log('3')
                            context.commit('setSelectedField', key);
                            context.commit('setClicked', true);
                            context.commit('setCounter', 1);
                            context.commit('setLastClicked', key);
                            console.log(context.state.lastClicked)
                            context.commit('setClickedCell', key);
                            console.log(context.state.clickedCell)
                            context.commit('setClickedSecondCell', true);
                        }
                    } else if(context.state.counter % 2 === 1 && context.state.lastClicked != key){
                        return;
                    }
                    else{
                    context.commit('setClicked', false);
                    context.commit('setCounter', 0);
                    context.commit('setClickedCell', null);
                    context.commit('setClickedMoveToCell', null);
                }
            }   
        },
        moveTo(context, emptyField){
            console.log('zzzzz')
            if(context.state.clicked){               
                if(context.state.board[emptyField] === context.state.Empty)
                {
                    
                    context.commit('setIsMoving', true);
                    context.commit('setClickedMoveToCell', emptyField);
                    console.log(context.state.clickedCell)
                    context.commit('setBoard', { key:context.state.clickedMoveToCell, value:context.state.board[context.state.clickedCell] });
                    context.dispatch('removePawn', {from:context.state.clickedCell, to:emptyField, clickedCell:context.state.clickedCell});
                    context.dispatch('checkKing', context.state.clickedMoveToCell);
                    context.commit('setBoard', { key: context.state.clickedCell, value: context.state.Empty});           
                    context.commit('setClicked', false);
                    context.commit('setClickedSecondCell', false);
                    //context.state.lastClicked = null;
                    context.state.turn = !context.state.turn;
                    context.commit('toogleTurn', context.state.turn);
                    context.commit('setCounter', 0);
                }
            }
        },
        
        removePawn(context, payload){
            console.log(payload)
            const cell = context.state.board[payload.clickedCell]
            console.log('cell', cell)
            const from = payload.from;
            const to = payload.to;
            let x = parseInt(from[0]);
            let y = parseInt(from[1]);
            let k = parseInt(to[0]);
            let l = parseInt(to[1]);
            let defeated = from;
            let xTmp1, yTmp1;
            if ((cell === context.state.whitePawn) || (cell === context.state.blackPawn)){
                if((k - x < -1) && (l - y  < -1)){
                    xTmp1 = k + 1;
                    yTmp1 = l + 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    context.commit('setBoard', {key:defeated,value: context.state.Empty});
                }else if((k - x > 1) && (l - y  < -1)){
                    xTmp1 = k - 1;
                    yTmp1 = l + 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    context.commit('setBoard', {key:defeated,value: context.state.Empty});
                }else if((k - x < -1) && (l - y  > 1)){
                    xTmp1 = k + 1;
                    yTmp1 = l - 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    context.commit('setBoard', {key:defeated,value: context.state.Empty});
                }else if((k - x > 1) && (l - y  > 1)){
                    xTmp1 = k - 1;
                    yTmp1 = l - 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    context.commit('setBoard', {key:defeated,value: context.state.Empty});
                }
            }else if ((cell === context.state.whiteKing) || (cell === context.state.blackKing)){
                if((k - x < -1) && (l - y  < -1)){
                    let m = 1;
                    while(context.state.board[defeated] !== undefined ){                       
                        xTmp1 = k + m;
                        yTmp1 = l + m; 
                        m++;
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (context.state.board[defeated] !== context.state.Empty){ 
                            context.commit('setBoard', {key:defeated,value: context.state.Empty});
                            break;
                        
                        }
                    }
                }else if((k - x > 1) && (l - y  < -1)){                       
                    let m = 1;
                    while(context.state.board[defeated] !== undefined ){
                        xTmp1 = k - m ;
                        yTmp1 = l + m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (context.state.board[defeated] !== context.state.Empty) {
                            context.commit('setBoard', {key:defeated,value: context.state.Empty});
                            break;
                        }
                    }   
                }else if((k - x < -1) && (l - y  > 1)){
                    let m = 1;
                    while(context.state.board[defeated] !== undefined ){
                        xTmp1 = k + m;
                        yTmp1 = l - m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (context.state.board[defeated] !== context.state.Empty){
                            context.commit('setBoard', {key:defeated,value: context.state.Empty});
                            break;
                        }
                    }   
                }else if((k - x > 1) && (l - y  > 1)){
                    let m = 1;
                    while(context.state.board[defeated] !== undefined ){
                        xTmp1 = k - m;
                        yTmp1 = l - m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (context.state.board[defeated] !== context.state.Empty) {
                            context.commit('setBoard', {key:defeated,value: context.state.Empty});
                            break;
                        }
                    }   
                }
            }
        },
        checkKing(context, newField){
            if (((newField === '01' || newField === '03' || newField === '05' || newField === '07')) && 
            (context.state.board[newField] === context.state.whitePawn)){
                context.commit('setBoard', {key:newField, value: context.state.whiteKing});
            }else if(((newField === '70' || newField === '72' || newField === '74' || newField === '76')) && (context.state.board[newField] === context.state.blackPawn)){
                context.commit('setBoard', {key:newField, value: context.state.blackKing});
            }
        },
        active(context, newField){
            console.log(newField)
            context.dispatch('possibleActiveJump', newField);
            context.dispatch('possibleActiveMove', newField);
        },

        possibleActiveMove(context, newField){
            if (context.state.lastClicked === null)
                return null;
            let pawn = context.state.lastClicked;
            let xTmp1;
            let yTmp1;
            let tmpPosition1;
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn)))
            {
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();    
                if((newField === tmpPosition1) && 
                    (context.state.board[tmpPosition1] === context.state.Empty) && 
                    ((context.state.board[pawn] === context.state.whitePawn)))
                {
                        context.commit('setActiveMove', true);
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                console.log('activeJump', context.state.board[tmpPosition1], tmpPosition1)  
                console.log('activeJump',newField,tmpPosition1,context.state.board[tmpPosition1],context.state.Empty,context.state.board[pawn], context.state.whitePawn) 
                if((newField === tmpPosition1) && 
                    (context.state.board[tmpPosition1] === context.state.Empty) && 
                    ((context.state.board[pawn] === context.state.whitePawn)))
                {
                    context.commit('setActiveMove', true);console.log(']]]]]]')
                }
            
            }else if (context.state.turn && (context.state.board[pawn] == context.state.whiteKing))
            {   let defeated = 0;
                xTmp1 = x-1; 
                yTmp1 = y+1;
                while((xTmp1 >= 0) && (yTmp1 <= 7 )){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();      
                    xTmp1--;
                    yTmp1++;  
                    if ((newField === tmpPosition1) &&
                        context.state.board[tmpPosition1] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);console.log(']]]]]]')
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition1] === context.state.blackPawn ||
                        context.state.board[tmpPosition1] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                while((xTmp1 >= 0) && (yTmp1 >= 0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp1--;
                    yTmp1--;
                    if ((newField === tmpPosition1) &&
                        context.state.board[tmpPosition1] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);console.log(']]]]]]')
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition1] === context.state.blackPawn ||
                        context.state.board[tmpPosition1] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                    
                while ((xTmp1 <= 7) && (yTmp1 >=0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                    if ((newField === tmpPosition1) &&
                        context.state.board[tmpPosition1] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);console.log(']]]]]]')
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition1] === context.state.blackPawn ||
                        context.state.board[tmpPosition1] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                    xTmp1++;
                    yTmp1--;  
                }
                
                xTmp1 = x+1; 
                yTmp1 = y+1;
                while((xTmp1 <= 7) && (yTmp1 <= 7)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if ((newField === tmpPosition1) &&
                        context.state.board[tmpPosition1] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);console.log(']]]]]]')
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition1] === context.state.blackPawn ||
                        context.state.board[tmpPosition1] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                    xTmp1++;
                    yTmp1++;
                }
            }
            else if(!context.state.turn && (context.state.board[pawn] == context.state.blackPawn))
            {
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();  
                if((newField === tmpPosition1) && 
                    (context.state.board[tmpPosition1] === context.state.Empty) && 
                    (context.state.board[pawn] === context.state.blackPawn))
                {
                    context.commit('setActiveMove', true);console.log(']]]]]]')
                
                }       
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((newField === tmpPosition1) && 
                    (context.state.board[tmpPosition1] === context.state.Empty) &&
                    (context.state.board[pawn] === context.state.blackPawn))
                {
                    context.commit('setActiveMove', true);console.log(']]]]]]')
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
            }
            else if (!context.state.turn && (context.state.board[pawn] == context.state.blackKing))
            { 
                xTmp1 = x-1; 
                yTmp1 = y+1;
                while((xTmp1 >= 0) && yTmp1 <= 7 ){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                    if((newField.toString() === tmpPosition1) && 
                        (context.state.board[tmpPosition1] === context.state.Empty) && 
                        ((context.state.board[pawn] === context.state.blackKing)))
                    {
                        context.commit('setActiveMove', true);console.log(']]]]]]')
                    }     
                    xTmp1--;
                    yTmp1++;  
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                while((xTmp1 >= 0) && (yTmp1 >= 0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (context.state.board[tmpPosition1] === context.state.Empty) && 
                        ((context.state.board[pawn] === context.state.blackKing)))
                    {
                        context.commit('setActiveMove', true);console.log(']]]]]]')
                    }
                    xTmp1--;
                    yTmp1--;
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                    
                while ((xTmp1 <= 7) && (yTmp1 >=0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                    if ((newField === tmpPosition1) && 
                        (context.state.board[tmpPosition1] === context.state.Empty) && 
                        (context.state.board[pawn] === context.state.blackKing))
                    {
                        context.commit('setActiveMove', true);console.log(']]]]]]')
                    }     
                    xTmp1++;
                    yTmp1--;  
                }
                
                xTmp1 = x+1; 
                yTmp1 = y+1;
                while((xTmp1 <= 7) && (yTmp1 <= 7)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (context.state.board[tmpPosition1] === context.state.Empty) && 
                        (context.state.board[pawn] === context.state.blackKing))
                    {
                        context.commit('setActiveMove', true);console.log(']]]]]]')
                    }
                    xTmp1++;
                    yTmp1++;
                }
            }
        },

        possibleActiveJump(context, newField){
            console.log(context.state.lastClicked)
            let pawn = context.state.lastClicked;// czy to jest dobrze
            if (context.state.lastClicked === null)
                return null;
                
            context.commit('setActiveMove', false);
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1, tmpPosition2;
            console.log(x,y, pawn)
            if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();

                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setActiveMove', true);
                }
                    xTmp1 = x-2; 
                    yTmp1 = y+2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y+1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setActiveMove', true);
                }
                    xTmp1 = x+2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x+1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                    
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setActiveMove', true);
                }                    
                    xTmp1 = x-2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setActiveMove', true);
                }
            }          
            else if (context.state.turn && (context.state.board[pawn] === context.state.whiteKing)){
                let m = 1;
                let tmpPosition = pawn;
                let defeated = 0;
                while(context.state.board[tmpPosition] !== undefined){
                    xTmp1 = x+m; 
                    yTmp1 = y+m;
                    tmpPosition = xTmp1.toString() + yTmp1.toString();
                    m++;console.log(context.state.board[tmpPosition])
                    if ((newField === tmpPosition) &&
                        context.state.board[tmpPosition] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition] === context.state.blackPawn ||
                        context.state.board[tmpPosition] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                while(context.state.board[tmpPosition] !== undefined){
                    xTmp1 = x-m; 
                    yTmp1 = y+m;
                    tmpPosition = xTmp1.toString() + yTmp1.toString();
                    m++;console.log(context.state.board[tmpPosition], '-+')
                    if ((newField === tmpPosition) &&
                        context.state.board[tmpPosition] === context.state.Empty){
                            if(defeated !==2 ){
                                context.commit('setActiveMove', true);
                                break;
                            }
                        } 
                    else if((context.state.board[tmpPosition] === context.state.blackPawn ||
                        context.state.board[tmpPosition] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
            
                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                while(context.state.board[tmpPosition] !== undefined){
                    xTmp1 = x+m; 
                    yTmp1 = y-m;
                    tmpPosition = xTmp1.toString() + yTmp1.toString();
                    m++;console.log(context.state.board[tmpPosition], 'pppppppppppppp')
                    if ((newField === tmpPosition) &&
                            context.state.board[tmpPosition] === context.state.Empty){
                                if(defeated !==2 ){
                                    context.commit('setActiveMove', true);
                                    break;
                                }
                            } 
                        else if((context.state.board[tmpPosition] === context.state.blackPawn ||
                            context.state.board[tmpPosition] === context.state.blackKing))
                        {   defeated++;
                                if (defeated === 2){ 
                                break; 
                            }
                        }
                    }
                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                while(context.state.board[tmpPosition] !== undefined){
                    xTmp1 = x-m; 
                    yTmp1 = y-m;
                    tmpPosition = xTmp1.toString() + yTmp1.toString();
                    m++;console.log(context.state.board[tmpPosition])
                    if ((newField === tmpPosition) &&
                        context.state.board[tmpPosition] === context.state.Empty){
                        if(defeated  !== 2 ){
                            context.commit('setActiveMove', true);
                            break;
                        }
                    } 
                    else if((context.state.board[tmpPosition] === context.state.blackPawn ||
                        context.state.board[tmpPosition] === context.state.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                
            }
            //black turn
            else if (!context.state.turn && (context.state.board[pawn] === context.state.blackPawn))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();   
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setActiveMove', true);
                }
                xTmp1 = x-2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setActiveMove', true);
                }
                xTmp1 = x+2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();              
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setActiveMove', true);
                }    
                xTmp1 = x-2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();               
                if ((newField === tmpPosition1) &&
                    context.state.board[tmpPosition1] ===context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setActiveMove', true);
                }                        
            }else if(!context.state.turn && (context.state.board[pawn] === context.state.blackKing)){
                const x = parseInt(pawn[0]);
                const y = parseInt(pawn[1]);
                let tmpPosition = pawn;
                let m = 1;
                let defeated = 0;
                tmpPosition = pawn;

                    while(context.state.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            context.state.board[tmpPosition] === context.state.Empty){
                                context.commit('setActiveMove', true);
                            } 
                        else if((newField === tmpPosition) &&
                            (context.state.board[tmpPosition] === context.state.whitePawn ||
                            context.state.board[tmpPosition] === context.state.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }

                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                    while(context.state.board[tmpPosition] !== undefined){
                        xTmp1 = x-m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            context.state.board[tmpPosition] === context.state.Empty){
                                context.commit('setActiveMove', true);
                            } 
                        else if((newField === tmpPosition) &&
                            (context.state.board[tmpPosition] === context.state.whitePawn ||
                            context.state.board[tmpPosition] === context.state.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                    while(context.state.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y-m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            context.state.board[tmpPosition] === context.state.Empty){
                                context.commit('setActiveMove', true);
                            } 
                        else if((newField === tmpPosition) &&
                            (context.state.board[tmpPosition] === context.state.whitePawn ||
                            context.state.board[tmpPosition] === context.state.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                m = 1;
                defeated = 0;
                tmpPosition = pawn;

                    while(context.state.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            context.state.board[tmpPosition] === context.state.Empty){
                                context.commit('setActiveMove', true);
                            } 
                        else if((newField === tmpPosition) &&
                            (context.state.board[tmpPosition] === context.state.whitePawn ||
                            context.state.board[tmpPosition] === context.state.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                }
        },
///
        isMovable(context, pawn){
            console.log(pawn)
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            context.dispatch('PossibleJump', {x:x, y:y, pawn:pawn});
            context.dispatch('PossibleMove', {x:x, y:y, pawn:pawn});
        },               

        PossibleJump(context, payload){
            context.commit('setIfMoveIsPossible', false);
            let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1,tmpPosition2;
            const x = payload.x;
            const y = payload.y;
            const pawn = payload.pawn;
            if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn) || 
            (context.state.board[pawn] === context.state.whiteKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);
                }
                    xTmp1 = x-2; 
                    yTmp1 = y+2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y+1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }
                    xTmp1 = x+2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x+1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                    
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }                    
                    xTmp1 = x-2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.blackPawn ||
                    context.state.board[tmpPosition2] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }
            }          
            
            //black turn
            else if (!context.state.turn && ((context.state.board[pawn] === context.state.blackPawn) || 
            (context.state.board[pawn] == context.state.blackKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();   
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }
                xTmp1 = x-2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }
                xTmp1 = x+2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();              
                if (context.state.board[tmpPosition1] === context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }    
                xTmp1 = x-2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();               
                if (context.state.board[tmpPosition1] ===context.state.Empty &&
                    (context.state.board[tmpPosition2] === context.state.whitePawn ||
                    context.state.board[tmpPosition2] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log(']]]]]]]')
                }                        
            }
        },
        PossibleMove(context, payload){
            // context.commit('setIfMoveIsPossible', false);
            let xTmp1;
            let yTmp1;
            let tmpPosition1;
            const x = payload.x;
            const y = payload.y;
            const pawn = payload.pawn;
            if (context.state.turn && ((context.state.board[pawn] === context.state.whitePawn) || (context.state.board[pawn] == context.state.whiteKing)))
            {
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                if((context.state.board[tmpPosition1] === context.state.Empty) && ((context.state.board[pawn] === context.state.whitePawn) || 
                (context.state.board[pawn] === context.state.whiteKing)))
                {
                    console.log('eee')
                    context.commit('setIfMoveIsPossible', true);
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((context.state.board[tmpPosition1] === context.state.Empty) && ((context.state.board[pawn] === context.state.whitePawn) || 
                (context.state.board[pawn] === context.state.whiteKing)))
                {
                    context.commit('setIfMoveIsPossible', true);console.log('eee')
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                if ((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log('eee')
                }       
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.whiteKing))
                {
                    context.commit('setIfMoveIsPossible', true);console.log('eee')
                }
            }
            else if(!context.state.turn)
            {
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();  
                if((context.state.board[tmpPosition1] === context.state.Empty) && 
                (context.state.board[pawn] === (context.state.blackKing) || (context.state.board[pawn] === context.state.blackPawn)))
                {
                    context.commit('setIfMoveIsPossible', true);
                
                }       
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((context.state.board[tmpPosition1] === context.state.Empty) && 
                (context.state.board[pawn] === (context.state.blackKing) || (context.state.board[pawn] === context.state.blackPawn)))
                {
                    context.commit('setIfMoveIsPossible', true);
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                
                if((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);
                }       
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((context.state.board[tmpPosition1] === context.state.Empty) && (context.state.board[pawn] === context.state.blackKing))
                {
                    context.commit('setIfMoveIsPossible', true);
                }
            }
        }
    }
}