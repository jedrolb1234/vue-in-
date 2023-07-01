<template>
    <div class = "container">
        <table class = "board-table">
            <tr v-for="(c, key) in vLoop" :key="key" @click="dropBall(key)">
                <td v-for="(r, idx) in c" :key="idx"><p :class="getClass(r)"></p></td></tr>
        </table>
    </div>
</template>

<script>
export default {
    data(){
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
    methods:{
        getClass(field){
            return this.board[field];
        },
        dropBall(column){
            console.log('wejscie');
            let iTmp, field;
            for(let i = 6; i >= 0; i--){
                iTmp = i.toString()
                field = iTmp + column;
                if(this.board[field] === this.empty){
                    this.board[field] = this.playerTurn;
                    this.checkWinner(this.playerTurn, field);
                    if(this.playerTurn === this.red){
                       this.playerTurn = this.blue; 
                    }
                    else{
                        this.playerTurn = this.red;
                    }
                    break;
                }
            }            
        },
        checkWinner(player, field){
            let field1, field2, field3, x, y, x1, y1, x2, y2, x3, y3;
            x = parseInt(field[0])
            y = parseInt(field[1])
            x1 = x - 1;
            x2 = x - 2;
            x3 = x - 3;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            x1 = x - 1;
            x2 = x - 2;
            x3 = x + 1;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            x1 = x - 1;
            x2 = x + 1;
            x3 = x + 2;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            x1 = x + 1;
            x2 = x + 2;
            x3 = x + 3;
            field1 = x1.toString() + y.toString();
            field2 = x2.toString() + y.toString();
            field3 = x3.toString() + y.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            y1 = y - 1;
            y2 = y - 2;
            y3 = y - 3;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            y1 = y - 1;
            y2 = y - 2;
            y3 = y + 1;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            y1 = y - 1;
            y2 = y + 1;
            y3 = y + 2;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
            y1 = y + 1;
            y2 = y + 2;
            y3 = y + 3;
            field1 = x.toString() + y1.toString();
            field2 = x.toString() + y2.toString();
            field3 = x.toString() + y3.toString();
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
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
            if (((this.board[field] === player ) && (this.board[field1] === player ) && (this.board[field2] === player ) && (this.board[field3] === player))){
                if(player === this.red){
                    this.board[field] = this.winnerRed;
                    this.board[field1] = this.winnerRed;
                    this.board[field2] = this.winnerRed;
                    this.board[field3] = this.winnerRed;
                } else{
                    this.board[field] = this.winnerBlue;
                    this.board[field1] = this.winnerBlue;
                    this.board[field2] = this.winnerBlue;
                    this.board[field3] = this.winnerBlue;
                }
            }
      }
    }
 }   
 </script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    height: 100vh;
}
.board-table{
  transform: rotate(90deg);
  background-color: cornflowerblue;
  width: 540px;
  height: 630px;
  border-spacing: 10px;
  z-index: 1;
  border-radius: 5px;
  padding: 10px;
}
tr{
    border-right: 1px;
    border-color: black;
    width: 630px;
    height: 90px;
}
@keyframes fadeIn {
  from {transform: translateX(-150px); opacity: 0;}
  to {transform: translateX(0px); opacity: 100%;}
}
.red{
    background-color: rgb(242, 255, 0);
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: fadeIn;
    animation-duration: 500ms;
    overflow: hidden;
}
.blue{
    background-color: blue;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: fadeIn;
    animation-duration: 500ms;
}
@keyframes winner-red {
  from {background-color: rgb(242, 255, 0);}
  to {background-color: rgb(104, 220, 38);}
}
.winner-red{
    background-color: rgb(104, 220, 38);
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: winner-red;
    animation-duration: 500ms;
}
@keyframes winner-blue {
  from {background-color: blue;}
  to {background-color: rgb(16, 28, 111);}
}
.winner-blue{
    background-color: rgb(16, 28, 111);
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: winner-blue;
    animation-duration: 500ms;
}

.empty{
    width: 80px;
    height: 80px;
}
</style>