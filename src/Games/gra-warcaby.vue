<template>
    <div class="board-container">
        <table class="board-table">
        <tr>
            <td class="WhiteEmpty"></td><td v-if="isMovable('01')" :class="{'clicked': clickedCell === '01', 'Black': clickedCell !== '01'}" @click="move('01')"><p v-bind:class="getClass('01')"></p></td><td v-else-if="clickedSecondCell && active('01')" class="Black" @click="moveTo('01')"><p v-bind:class="getClass('01')"></p></td><td v-else class="Black"><p v-bind:class="getClass('01')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('03')" :class="{'clicked': clickedCell === '03', 'Black': clickedCell !== '03'}" @click="move('03')"><p v-bind:class="getClass('03')"></p></td><td v-else-if="clickedSecondCell && active('03')" class="Black" @click="moveTo('03')"><p v-bind:class="getClass('03')"></p></td><td v-else class="Black"><p v-bind:class="getClass('03')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('05')" :class="{'clicked': clickedCell === '05', 'Black': clickedCell !== '05'}" @click="move('05')"><p v-bind:class="getClass('05')"></p></td><td v-else-if="clickedSecondCell && active('05')" class="Black" @click="moveTo('05')"><p v-bind:class="getClass('05')"></p></td><td v-else class="Black"><p v-bind:class="getClass('05')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('07')" :class="{'clicked': clickedCell === '07', 'Black': clickedCell !== '07'}" @click="move('07')"><p v-bind:class="getClass('07')"></p></td><td v-else-if="clickedSecondCell && active('07')" class="Black" @click="moveTo('07')"><p v-bind:class="getClass('07')"></p></td><td v-else class="Black"><p v-bind:class="getClass('07')"></p></td>
        </tr>
        <tr>
            <td v-if="isMovable('10')" :class="{'clicked': clickedCell === '10', 'Black': clickedCell !== '10'}" @click="move('10')"><p v-bind:class="getClass('10')"></p></td><td v-else-if="clickedSecondCell && active('10')" class="Black" @click="moveTo('10')"><p v-bind:class="getClass('10')"></p></td><td v-else class="Black"><p v-bind:class="getClass('10')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('12')" :class="{'clicked': clickedCell === '12', 'Black': clickedCell !== '12'}" @click="move('12')"><p v-bind:class="getClass('12')"></p></td><td v-else-if="clickedSecondCell && active('12')" class="Black" @click="moveTo('12')"><p v-bind:class="getClass('12')"></p></td><td v-else class="Black"><p v-bind:class="getClass('12')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('14')" :class="{'clicked': clickedCell === '14', 'Black': clickedCell !== '14'}" @click="move('14')"><p v-bind:class="getClass('14')"></p></td><td v-else-if="clickedSecondCell && active('14')" class="Black" @click="moveTo('14')"><p v-bind:class="getClass('14')"></p></td><td v-else class="Black"><p v-bind:class="getClass('14')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('16')" :class="{'clicked': clickedCell === '16', 'Black': clickedCell !== '16'}" @click="move('16')"><p v-bind:class="getClass('16')"></p></td><td v-else-if="clickedSecondCell && active('16')" class="Black" @click="moveTo('16')"><p v-bind:class="getClass('16')"></p></td><td v-else class="Black"><p v-bind:class="getClass('16')"></p></td><td class="WhiteEmpty"></td>
        </tr>
        <tr>
            <td class="WhiteEmpty"></td><td v-if="isMovable('21')" :class="{'clicked': clickedCell === '21', 'Black': clickedCell !== '21'}" @click="move('21')"><p v-bind:class="getClass('21')"></p></td><td v-else-if="clickedSecondCell && active('21')" class="Black" @click="moveTo('21')"><p v-bind:class="getClass('21')"></p></td><td v-else class="Black"><p v-bind:class="getClass('21')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('23')" :class="{'clicked': clickedCell === '23', 'Black': clickedCell !== '23'}" @click="move('23')"><p v-bind:class="getClass('23')"></p></td><td v-else-if="clickedSecondCell && active('23')" class="Black" @click="moveTo('23')"><p v-bind:class="getClass('23')"></p></td><td v-else class="Black"><p v-bind:class="getClass('23')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('25')" :class="{'clicked': clickedCell === '25', 'Black': clickedCell !== '25'}" @click="move('25')"><p v-bind:class="getClass('25')"></p></td><td v-else-if="clickedSecondCell && active('25')" class="Black" @click="moveTo('25')"><p v-bind:class="getClass('25')"></p></td><td v-else class="Black"><p v-bind:class="getClass('25')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('27')" :class="{'clicked': clickedCell === '27', 'Black': clickedCell !== '27'}" @click="move('27')"><p v-bind:class="getClass('27')"></p></td><td v-else-if="clickedSecondCell && active('27')" class="Black" @click="moveTo('27')"><p v-bind:class="getClass('27')"></p></td><td v-else class="Black"><p v-bind:class="getClass('27')"></p></td>
        </tr>
<tr>
            <td v-if="isMovable('30')" :class="{'clicked': clickedCell === '30', 'Black': clickedCell !== '30'}" @click="move('30')"><p v-bind:class="getClass('30')"></p></td><td v-else-if="clickedSecondCell && active('30')" class="Black" @click="moveTo('30')"><p v-bind:class="getClass('30')"></p></td><td v-else class="Black"><p v-bind:class="getClass('30')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('32')" :class="{'clicked': clickedCell === '32', 'Black': clickedCell !== '32'}" @click="move('32')"><p v-bind:class="getClass('32')"></p></td><td v-else-if="clickedSecondCell && active('32')" class="Black" @click="moveTo('32')"><p v-bind:class="getClass('32')"></p></td><td v-else class="Black"><p v-bind:class="getClass('32')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('34')" :class="{'clicked': clickedCell === '34', 'Black': clickedCell !== '34'}" @click="move('34')"><p v-bind:class="getClass('34')"></p></td><td v-else-if="clickedSecondCell && active('34')" class="Black" @click="moveTo('34')"><p v-bind:class="getClass('34')"></p></td><td v-else class="Black"><p v-bind:class="getClass('34')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('36')" :class="{'clicked': clickedCell === '36', 'Black': clickedCell !== '36'}" @click="move('36')"><p v-bind:class="getClass('36')"></p></td><td v-else-if="clickedSecondCell && active('36')" class="Black" @click="moveTo('36')"><p v-bind:class="getClass('36')"></p></td><td v-else class="Black"><p v-bind:class="getClass('36')"></p></td><td class="WhiteEmpty"></td>
        </tr>
<tr>
            <td class="WhiteEmpty"></td><td v-if="isMovable('41')" :class="{'clicked': clickedCell === '41', 'Black': clickedCell !== '41'}" @click="move('41')"><p v-bind:class="getClass('41')"></p></td><td v-else-if="clickedSecondCell && active('41')" class="Black" @click="moveTo('41')"><p v-bind:class="getClass('41')"></p></td><td v-else class="Black"><p v-bind:class="getClass('41')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('43')" :class="{'clicked': clickedCell === '43', 'Black': clickedCell !== '43'}" @click="move('43')"><p v-bind:class="getClass('43')"></p></td><td v-else-if="clickedSecondCell && active('43')" class="Black" @click="moveTo('43')"><p v-bind:class="getClass('43')"></p></td><td v-else class="Black"><p v-bind:class="getClass('43')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('45')" :class="{'clicked': clickedCell === '45', 'Black': clickedCell !== '45'}" @click="move('45')"><p v-bind:class="getClass('45')"></p></td><td v-else-if="clickedSecondCell && active('45')" class="Black" @click="moveTo('45')"><p v-bind:class="getClass('45')"></p></td><td v-else class="Black"><p v-bind:class="getClass('45')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('47')" :class="{'clicked': clickedCell === '47', 'Black': clickedCell !== '47'}" @click="move('47')"><p v-bind:class="getClass('47')"></p></td><td v-else-if="clickedSecondCell && active('47')" class="Black" @click="moveTo('47')"><p v-bind:class="getClass('47')"></p></td><td v-else class="Black"><p v-bind:class="getClass('47')"></p></td>
        </tr>
        <tr>
            <td v-if="isMovable('50')" :class="{'clicked': clickedCell === '50', 'Black': clickedCell !== '50'}" @click="move('50')"><p v-bind:class="getClass('50')"></p></td><td v-else-if="clickedSecondCell && active('50')" class="Black" @click="moveTo('50')"><p v-bind:class="getClass('50')"></p></td><td v-else class="Black"><p v-bind:class="getClass('50')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('52')" :class="{'clicked': clickedCell === '52', 'Black': clickedCell !== '52'}" @click="move('52')"><p v-bind:class="getClass('52')"></p></td><td v-else-if="clickedSecondCell && active('52')" class="Black" @click="moveTo('52')"><p v-bind:class="getClass('52')"></p></td><td v-else class="Black"><p v-bind:class="getClass('52')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('54')" :class="{'clicked': clickedCell === '54', 'Black': clickedCell !== '54'}" @click="move('54')"><p v-bind:class="getClass('54')"></p></td><td v-else-if="clickedSecondCell && active('54')" class="Black" @click="moveTo('54')"><p v-bind:class="getClass('54')"></p></td><td v-else class="Black"><p v-bind:class="getClass('54')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('56')" :class="{'clicked': clickedCell === '56', 'Black': clickedCell !== '56'}" @click="move('56')"><p v-bind:class="getClass('56')"></p></td><td v-else-if="clickedSecondCell && active('56')" class="Black" @click="moveTo('56')"><p v-bind:class="getClass('56')"></p></td><td v-else class="Black"><p v-bind:class="getClass('56')"></p></td><td class="WhiteEmpty"></td>

        </tr>
        <tr>
            <td class="WhiteEmpty"></td><td v-if="isMovable('61')" :class="{'clicked': clickedCell === '61', 'Black': clickedCell !== '61'}" @click="move('61')"><p v-bind:class="getClass('61')"></p></td><td v-else-if="clickedSecondCell && active('61')" class="Black" @click="moveTo('61')"><p v-bind:class="getClass('61')"></p></td><td v-else class="Black"><p v-bind:class="getClass('61')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('63')" :class="{'clicked': clickedCell === '63', 'Black': clickedCell !== '63'}" @click="move('63')"><p v-bind:class="getClass('63')"></p></td><td v-else-if="clickedSecondCell && active('63')" class="Black" @click="moveTo('63')"><p v-bind:class="getClass('63')"></p></td><td v-else class="Black"><p v-bind:class="getClass('63')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('65')" :class="{'clicked': clickedCell === '65', 'Black': clickedCell !== '65'}" @click="move('65')"><p v-bind:class="getClass('65')"></p></td><td v-else-if="clickedSecondCell && active('65')" class="Black" @click="moveTo('65')"><p v-bind:class="getClass('65')"></p></td><td v-else class="Black"><p v-bind:class="getClass('65')"></p></td>
            <td class="WhiteEmpty"></td><td v-if="isMovable('67')" :class="{'clicked': clickedCell === '67', 'Black': clickedCell !== '67'}" @click="move('67')"><p v-bind:class="getClass('67')"></p></td><td v-else-if="clickedSecondCell && active('67')" class="Black" @click="moveTo('67')"><p v-bind:class="getClass('67')"></p></td><td v-else class="Black"><p v-bind:class="getClass('67')"></p></td>
        </tr>
        <tr>
            <td v-if="isMovable('70')" :class="{'clicked': clickedCell === '70', 'Black': clickedCell !== '70'}" @click="move('70')"><p v-bind:class="getClass('70')"></p></td><td v-else-if="clickedSecondCell && active('70')" class="Black" @click="moveTo('70')"><p v-bind:class="getClass('70')"></p></td><td v-else class="Black"><p v-bind:class="getClass('70')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('72')" :class="{'clicked': clickedCell === '72', 'Black': clickedCell !== '72'}" @click="move('72')"><p v-bind:class="getClass('72')"></p></td><td v-else-if="clickedSecondCell && active('72')" class="Black" @click="moveTo('72')"><p v-bind:class="getClass('72')"></p></td><td v-else class="Black"><p v-bind:class="getClass('72')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('74')" :class="{'clicked': clickedCell === '74', 'Black': clickedCell !== '74'}" @click="move('74')"><p v-bind:class="getClass('74')"></p></td><td v-else-if="clickedSecondCell && active('74')" class="Black" @click="moveTo('74')"><p v-bind:class="getClass('74')"></p></td><td v-else class="Black"><p v-bind:class="getClass('74')"></p></td><td class="WhiteEmpty"></td>
            <td v-if="isMovable('76')" :class="{'clicked': clickedCell === '76', 'Black': clickedCell !== '76'}" @click="move('76')"><p v-bind:class="getClass('76')"></p></td><td v-else-if="clickedSecondCell && active('76')" class="Black" @click="moveTo('76')"><p v-bind:class="getClass('76')"></p></td><td v-else class="Black"><p v-bind:class="getClass('76')"></p></td><td class="WhiteEmpty"></td>
        </tr>
    </table>

</div>
</template>

<script>

export default {
    data(){
        return{
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
            Empty: 'empty',
            turn: true,
            clicked: false,
            counter:0,
            lastClicked: null,
            clickedCell: null,
            clickedSecondCell: false,
            clickedMoveToCell : null
            //isMoving : false
            }
        },
    methods:{
        getClass(field){
            return this.board[field];
            },

        move(key){
                console.log('wybieram pionka',key);
                if(this.board[key] !== this.Empty){
                    if (this.counter % 2 === 0){
                        if(this.board[key]){// && this.turn){
                            this.clicked = true;
                            this.counter++;
                            this.lastClicked = key;
                            this.clickedCell = key;
                            this.clickedSecondCell = true;
                        }
                    } else if(this.counter % 2 === 1 && this.lastClicked != key){
                        return;
                    }
                    else{
                    this.clicked=false;
                    this.counter = 0;
                    // this.lastClicked = null;
                    this.clickedCell = null;        
                    this.clickedMoveToCell = null;    
                }
            }   
            console.log('lastClicked', this.lastClicked);
        },
        moveTo(emptyField){
            if(this.clicked){               
                console.log('emptyField', emptyField, this.board[emptyField], this.Empty)
                if(this.board[emptyField] === this.Empty)
                {
                    console.log('wszedlem');
                    //this.isMoving = true;
                    this.clickedMoveToCell = emptyField;
                    this.board[this.clickedMoveToCell] = this.board[this.clickedCell];
                    this.board[this.clickedCell] = this.Empty;
                    this.clicked = false;
                    this.clickedSecondCell = false;
                    //this.lastClicked = null;
                    this.turn = !this.turn;
                    this.counter = 0;

                }
            }
        },

        active(newField){
            let pos1 = this.possibleActiveJump(newField);
            let pos2 = this.possibleActiveMove(newField);
            return pos1 || pos2;
        },

        possibleActiveMove(newField){
            let pawn = this.lastClicked;
            let ifMoveIsPossible = false;
            let xTmp1;
            let yTmp1;
            let tmpPosition1;
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            if (this.turn && ((this.board[pawn] === this.whitePawn)))
            {
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                console.log('newField and tmpPosition and clickedSecondCell', newField, tmpPosition1, this.clickedSecondCell)
                if((newField.toString() === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) && 
                    ((this.board[pawn] === this.whitePawn)))
                {
                        ifMoveIsPossible = true;
                        console.log(ifMoveIsPossible);
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                ////////////////////////////
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((newField === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) && 
                    ((this.board[pawn] === this.whitePawn)))
                {
                    ifMoveIsPossible = true;
                }
            
            }else if (this.turn && (this.board[pawn] == this.whiteKing))
            { 
                xTmp1 = x-1; 
                yTmp1 = y+1;
                while((xTmp1 >= 0) && (yTmp1 <= 7 )){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                    if((newField.toString() === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.whiteKing))
                    {
                            ifMoveIsPossible = true;
                            console.log(ifMoveIsPossible);
                    }     
                    xTmp1--;
                    yTmp1++;  
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                while((xTmp1 >= 0) && (yTmp1 >= 0)){
                    ////////////////////////////
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.whiteKing))
                    {
                        ifMoveIsPossible = true;
                    }
                    xTmp1--;
                    yTmp1--;
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                    
                while ((xTmp1 <= 7) && (yTmp1 >=0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                    if ((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.whiteKing))
                    {
                    ifMoveIsPossible = true;
                    }     
                    xTmp1++;
                    yTmp1--;  
                }
                
                xTmp1 = x+1; 
                yTmp1 = y+1;
                while((xTmp1 <= 7) && (yTmp1 <= 7)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.whiteKing))
                    {
                        ifMoveIsPossible = true;
                    }
                    xTmp1++;
                    yTmp1++;
                }
            }
            else if(!this.turn && (this.board[pawn] == this.blackPawn))
            {
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();  
                console.log('sprawdzam co jest na pozycji od czarnego pionka', tmpPosition1);
                console.log('na tej pozycji jest: ',this.board[tmpPosition1]);
                if((newField === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) && 
                    (this.board[pawn] === this.blackPawn))
                {
                    ifMoveIsPossible = true;
                
                }       
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((newField === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) &&
                    (this.board[pawn] === this.blackPawn))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
            }
            else if (!this.turn && (this.board[pawn] == this.blackKing))
            { 
                xTmp1 = x-1; 
                yTmp1 = y+1;
                while((xTmp1 >= 0) && yTmp1 <= 7 ){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                    if((newField.toString() === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        ((this.board[pawn] === this.blackKing)))
                    {
                            ifMoveIsPossible = true;
                            console.log(ifMoveIsPossible);
                    }     
                    xTmp1--;
                    yTmp1++;  
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                while((xTmp1 >= 0) && (yTmp1 >= 0)){
                    ////////////////////////////
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        ((this.board[pawn] === this.blackKing)))
                    {
                        ifMoveIsPossible = true;
                    }
                    xTmp1--;
                    yTmp1--;
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                    
                while ((xTmp1 <= 7) && (yTmp1 >=0)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                    if ((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.blackKing))
                    {
                    ifMoveIsPossible = true;
                    }     
                    xTmp1++;
                    yTmp1--;  
                }
                
                xTmp1 = x+1; 
                yTmp1 = y+1;
                while((xTmp1 <= 7) && (yTmp1 <= 7)){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    if((newField === tmpPosition1) && 
                        (this.board[tmpPosition1] === this.Empty) && 
                        (this.board[pawn] === this.blackKing))
                    {
                        ifMoveIsPossible = true;
                    }
                    xTmp1++;
                    yTmp1++;
                }
            }
            return ifMoveIsPossible;
        },

        possibleActiveJump(newField){
            let pawn = this.lastClicked;
            let ifMoveIsPossible = false;
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1,tmpPosition2;
            if (this.turn && ((this.board[pawn] === this.whitePawn) || (this.board[pawn] === this.whiteKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
    
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
                    xTmp1 = x-2; 
                    yTmp1 = y+2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y+1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
                    xTmp1 = x+2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x+1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                    
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }                    
                    xTmp1 = x-2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
            }          
            
            //black turn
            else if (!this.turn && ((this.board[pawn] === this.blackPawn) || (this.board[pawn] == this.blackKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();   
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x-2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x+2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();              
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }    
                xTmp1 = x-2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();               
                if ((newField === tmpPosition1) &&
                    this.board[tmpPosition1] ===this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }                        
            }
            console.log('Jump result:', ifMoveIsPossible);
        return ifMoveIsPossible;
        },

        isMovable(pawn){
            console.log('sprawdzam pionki',pawn)
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            console.log('x i y', x , y)
            let pos1 = this.PossibleJump(x,y, pawn);
            let pos2 = this.PossibleMove(x,y, pawn);
        return pos1 || pos2;  
        },               

        PossibleJump(x,y, pawn){
            let ifMoveIsPossible = false;
            let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1,tmpPosition2;
            if (this.turn && ((this.board[pawn] === this.whitePawn) || (this.board[pawn] === this.whiteKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
    
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
                    xTmp1 = x-2; 
                    yTmp1 = y+2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y+1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
                    xTmp1 = x+2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x+1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                    
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }                    
                    xTmp1 = x-2; 
                    yTmp1 = y-2;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    xTmp2 = x-1;
                    yTmp2 = y-1;
                    tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.blackPawn ||
                    this.board[tmpPosition2] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
            }          
            
            //black turn
            else if (!this.turn && ((this.board[pawn] === this.blackPawn) || (this.board[pawn] == this.blackKing)))
            {
                xTmp1 = x+2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y+1;
                tmpPosition2 = yTmp2.toString() + xTmp2.toString();   
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x-2; 
                yTmp1 = y+2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y+1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x+2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x+1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();              
                if (this.board[tmpPosition1] === this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }    
                xTmp1 = x-2; 
                yTmp1 = y-2;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                xTmp2 = x-1;
                yTmp2 = y-1;
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();               
                if (this.board[tmpPosition1] ===this.Empty &&
                    (this.board[tmpPosition2] === this.whitePawn ||
                    this.board[tmpPosition2] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }                        
            }
            console.log('Jump result:', ifMoveIsPossible);
        return ifMoveIsPossible;
        },
        PossibleMove(x,y, pawn){
            let ifMoveIsPossible = false;
            let xTmp1;
            let yTmp1;
            let tmpPosition1;
            if (this.turn && ((this.board[pawn] === this.whitePawn) || (this.board[pawn] == this.whiteKing)))
            {
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                console.log('sprawdzam pole od białego pionka', tmpPosition1)
                if((this.board[tmpPosition1] === this.Empty) && ((this.board[pawn] === this.whitePawn) || (this.board[pawn] === this.whiteKing)))
                {
                ifMoveIsPossible = true;
                console.log(ifMoveIsPossible);
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                ////////////////////////////
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && ((this.board[pawn] === this.whitePawn) || (this.board[pawn] === this.whiteKing)))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();           
                if ((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === this.whiteKing))
                {
                ifMoveIsPossible = true;
                }       
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === this.whiteKing))
                {
                    ifMoveIsPossible = true;
                }
            }
            else if(!this.turn)
            {
                xTmp1 = x+1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();  
                console.log('sprawdzam co jest na pozycji od czarnego pionka', tmpPosition1);
                console.log('na tej pozycji jest: ',this.board[tmpPosition1]);
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === (this.blackKing) || (this.board[pawn] === this.blackPawn)))
                {
                    ifMoveIsPossible = true;
                
                }       
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === (this.blackKing) || (this.board[pawn] === this.blackPawn)))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === (this.blackKing) || (this.board[pawn] === this.blackPawn)))
                {
                    ifMoveIsPossible = true;
                }       
                xTmp1 = x-1; 
                yTmp1 = y+1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === this.blackKing))
                {
                    ifMoveIsPossible = true;
                }
            }
            console.log(ifMoveIsPossible)
            return ifMoveIsPossible;
        }
    }
}


</script>

<style scoped>
.board-container{
    display: flex;
    justify-content: center;
}
.board-table{
    margin:auto;
}
.WhiteEmpty{
    background-color: rgb(255, 225, 225);
    width:65px;
    height:65px;
}

.Black{
    background-color: rgb(136, 18, 18);
    width: 65px;
    height: 65px;
    transition: all 2.6s ease;
    }

.white-pawn{
    background-color: rgb(255, 255, 255); 
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    transition: all 2.6s ease;
}
.white-king{
    background-color: rgb(255, 85, 0);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    transition: all 0.6s ease;
}

.black-pawn{
    background-color: rgb(93, 96, 162);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    transition: all 0.6s ease;
}
.black-king{
    background-color: rgb(18, 6, 95);
    width: 40px;
    height: 40px;
    border-radius: 20x;
    margin: 12px;
    transition: all 0.6s ease;
}
.empty{
    background-color: black;
}
.clicked{
    background-color: yellowgreen;
}
.clickedMoveTo{
    background: yellowgreen;
}

</style>
