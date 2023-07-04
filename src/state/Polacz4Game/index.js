export default {
    namespaced: true,
    state(){
        return{
            vLoop: {
                '0': ['00','10','20','30','40','50'],
                '1': ['01','11','21','31','41','51'],
                '2': ['02','12','22','32','42','52'],
                '3': ['03','13','23','33','43','53'],
                '4': ['04','14','24','34','44','54'],
                '5': ['05','15','25','35','45','55'],
                '6': ['06','16','26','36','46','56'],
            },
            board : {
                '00': 'empty', '10':'empty', '20': 'empty', '30':'empty','40': 'empty', '50':'empty',
                '01': 'empty', '11':'empty','21': 'empty', '31':'empty','41': 'empty', '51':'empty',
                '02': 'empty', '12':'empty','22': 'empty', '32':'empty','42': 'empty', '52':'empty',
                '03': 'empty', '13':'empty','23': 'empty', '33':'empty','43': 'empty', '53':'empty',
                '04': 'empty', '14':'empty','24': 'empty', '34':'empty','44': 'empty', '54':'empty',
                '05': 'empty', '15':'empty','25': 'empty', '35':'empty','45': 'empty', '55':'empty',
                '06': 'empty', '16':'empty','26': 'empty', '36':'empty','46': 'empty', '56':'empty' 
            },
            empty: 'empty',
            red: 'red',
            blue: 'blue',
            winnerRed: 'winner-red',
            winnerBlue: 'winner-blue',
            playerTurn: 'red'
        }
    },
    getters:{
        getClass: (state) => (field) => {
            return state.board[field];
        },
        getVLoop(state){
            return state.vLoop;
        }
    },
    mutations:{
        setWinner(state, payload){
            console.log(payload.value)
            state.board[payload.field] = payload.value;
        }

    },
    actions:{
        dropBall(context, column){
            console.log('wejscie');
            let iTmp, field;
            for(let i = 6; i >= 0; i--){
                iTmp = i.toString()
                field = iTmp + column;
                if(context.state.board[field] === context.state.empty){
                    context.state.board[field] = context.state.playerTurn;
                    context.dispatch('checkWinner', {player:context.state.playerTurn, field:field});
                    if(context.state.playerTurn === context.state.red){
                    context.state.playerTurn = context.state.blue; 
                    }
                    else{
                        context.state.playerTurn = context.state.red;
                    }
                    break;
                }
            }            
        },
        checkWinner(context, payload){// player, field){
            let field1, field2, field3, x, y, x1, y1, x2, y2, x3, y3;
            const field = payload.field
            x = parseInt(payload.field[0])
            y = parseInt(payload.field[1])
            x1 = x - 1;
            x2 = x - 2;
            x3 = x - 3;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            console.log(field, field1, field2, field3, payload.player)
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
                (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 1;
            x2 = x - 2;
            x3 = x + 1;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 1;
            x2 = x + 1;
            x3 = x + 2;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x + 1;
            x2 = x + 2;
            x3 = x + 3;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            y1 = y - 1;
            y2 = y - 2;
            y3 = y - 3;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            y1 = y - 1;
            y2 = y - 2;
            y3 = y + 1;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            y1 = y - 1;
            y2 = y + 1;
            y3 = y + 2;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            y1 = y + 1;
            y2 = y + 2;
            y3 = y + 3;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x + 1;
            x2 = x + 2;
            x3 = x + 3;
            y1 = y + 1;
            y2 = y + 2;
            y3 = y + 3;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 1;
            x2 = x + 1;
            x3 = x + 2;
            y1 = y - 1;
            y2 = y + 1;
            y3 = y + 2;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 2;
            x2 = x - 1;
            x3 = x + 1;
            y1 = y - 2;
            y2 = y - 1;
            y3 = y + 1;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 1;
            x2 = x - 2;
            x3 = x - 3;
            y1 = y - 1;
            y2 = y - 2;
            y3 = y - 3;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x - 1;
            x2 = x - 2;
            x3 = x - 3;
            y1 = y + 1;
            y2 = y + 2;
            y3 = y + 3;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
            x1 = x + 1;
            x2 = x - 1;
            x3 = x - 2;
            y1 = y - 1;
            y2 = y + 1;
            y3 = y + 2;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }            
            x1 = x + 2;
            x2 = x + 1;
            x3 = x - 1;
            y1 = y - 2;
            y2 = y - 1;
            y3 = y + 1;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }            
            x1 = x + 3;
            x2 = x + 2;
            x3 = x + 1;
            y1 = y - 3;
            y2 = y - 2;
            y3 = y - 1;
            field1 = x1.toString() + y1.toString();
            field2 = x2.toString() + y2.toString();
            field3 = x3.toString() + y3.toString();
            if (((context.state.board[field] === payload.player ) && (context.state.board[field1] === payload.player ) && 
            (context.state.board[field2] === payload.player ) && (context.state.board[field3] === payload.player))){
                if(payload.player === context.state.red){
                    context.commit('setWinner', {field: field, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field1, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field2, value: context.state.winnerRed})
                    context.commit('setWinner', {field: field3, value: context.state.winnerRed})
                } else{
                    context.commit('setWinner', {field: field, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field1, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field2, value: context.state.winnerBlue})
                    context.commit('setWinner', {field: field3, value: context.state.winnerBlue})
                }
            }
        }
    }
}
