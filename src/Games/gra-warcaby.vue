<template>
    <div class="board-container">
        <table class="board-table">
            <tr v-for="(t,key) in vLoop" :key='key'>
                    <td v-for="(p, idx) in t"  :key="idx"
                         :class="getClass(p)" @click="chooseMethod(p)"><p :class="getPawnClass(p)"></p></td>
                </tr>
    </table>

</div>
</template>

<script>

export default {
    data(){
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
            clickedMoveToCell : null
            }
        },
    methods:{
        getClass(field){
            console.log(field)
            if((this.clickedCell === field) && this.isMovable(field)){
                return this.clickedClass;
            }            
            else if (this.board[field] === this.Empty){
                return this.blackClass;
            }else if (field === this.w){
                return this.whiteEmpty
            }
            else {
                return this.blackClass;
            }

  

        },
        getPawnClass(field){
            if(field === this.w){
                return this.w
            }
            return this.board[field];
        },   
        chooseMethod(field){
            if(this.isMovable(field)){
                return this.move(field);
            } else if(this.clickedSecondCell && this.active(field)){
                return this.moveTo(field);
            }
            return
        },
        move(key){
                if(this.board[key] !== this.Empty){
                    if (this.counter % 2 === 0){
                        if(this.board[key]){// && this.turn){
                            this.selectedField = key;
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
                    this.clickedCell = null;        
                    this.clickedMoveToCell = null;    
                }
            }   
        },
        moveTo(emptyField){
            if(this.clicked){               
                if(this.board[emptyField] === this.Empty)
                {
                    this.isMoving = true;
                    this.clickedMoveToCell = emptyField;
                    this.board[this.clickedMoveToCell] = this.board[this.clickedCell];
                    this.removePawn(this.clickedCell, emptyField, this.clickedCell);
                    this.checkKing(this.clickedMoveToCell);
                    this.board[this.clickedCell] = this.Empty;           
                    this.clicked = false;
                    this.clickedSecondCell = false;
                    //this.lastClicked = null;
                    this.turn = !this.turn;
                    this.counter = 0;
                }
            }
        },
        
        removePawn(from, to, clickedCell){
            const cell = this.board[clickedCell]
            let x = parseInt(from[0]);
            let y = parseInt(from[1]);

            let k = parseInt(to[0]);
            let l = parseInt(to[1]);
            let defeated = from;
            let xTmp1, yTmp1;
            if ((cell === this.whitePawn) || (cell === this.blackPawn)){
                if((k - x < -1) && (l - y  < -1)){
                    xTmp1 = k + 1;
                    yTmp1 = l + 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    this.board[defeated] = this.Empty;
                }else if((k - x > 1) && (l - y  < -1)){
                    xTmp1 = k - 1;
                    yTmp1 = l + 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    this.board[defeated] = this.Empty;
                }else if((k - x < -1) && (l - y  > 1)){
                    xTmp1 = k + 1;
                    yTmp1 = l - 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    this.board[defeated] = this.Empty;
                }else if((k - x > 1) && (l - y  > 1)){
                    xTmp1 = k - 1;
                    yTmp1 = l - 1; 
                    defeated = xTmp1.toString() + yTmp1.toString();
                    this.board[defeated] = this.Empty;
                }
            }else if ((cell === this.whiteKing) || (cell === this.blackKing)){
                if((k - x < -1) && (l - y  < -1)){
                    let m = 1;
                    while(this.board[defeated] !== undefined ){                       
                        xTmp1 = k + m;
                        yTmp1 = l + m; 
                        m++;
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (this.board[defeated] !== this.Empty){ 
                            this.board[defeated]= this.Empty;
                            break;
                        
                        }
                    }
                }else if((k - x > 1) && (l - y  < -1)){                       
                    let m = 1;
                    while(this.board[defeated] !== undefined ){
                        xTmp1 = k - m ;
                        yTmp1 = l + m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (this.board[defeated] !== this.Empty) {
                            this.board[defeated]= this.Empty;
                            break;
                        }
                    }   
                }else if((k - x < -1) && (l - y  > 1)){
                    let m = 1;
                    while(this.board[defeated] !== undefined ){
                        xTmp1 = k + m;
                        yTmp1 = l - m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (this.board[defeated] !== this.Empty){
                            this.board[defeated]= this.Empty;
                            break;
                        }
                    }   
                }else if((k - x > 1) && (l - y  > 1)){
                    let m = 1;
                    while(this.board[defeated] !== undefined ){
                        xTmp1 = k - m;
                        yTmp1 = l - m;
                        m++; 
                        defeated = xTmp1.toString() + yTmp1.toString();
                        if (this.board[defeated] !== this.Empty) {
                            this.board[defeated]= this.Empty;
                            break;
                        }
                    }   
                }
            }
        },
        checkKing(newField){
            if (((newField === '01' || newField === '03' || newField === '05' || newField === '07')) && 
            (this.board[newField] === this.whitePawn)){
                this.board[newField] = this.whiteKing;
            }else if(((newField === '70' || newField === '72' || newField === '74' || newField === '76')) && (this.board[newField] === this.blackPawn)){
            this.board[newField] = this.blackKing;
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
                if((newField.toString() === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) && 
                    ((this.board[pawn] === this.whitePawn)))
                {
                        ifMoveIsPossible = true;
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((newField === tmpPosition1) && 
                    (this.board[tmpPosition1] === this.Empty) && 
                    ((this.board[pawn] === this.whitePawn)))
                {
                    ifMoveIsPossible = true;
                }
            
            }else if (this.turn && (this.board[pawn] == this.whiteKing))
            {   let defeated = 0;
                xTmp1 = x-1; 
                yTmp1 = y+1;
                while((xTmp1 >= 0) && (yTmp1 <= 7 )){
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();          
                    xTmp1--;
                    yTmp1++;  
                    if ((newField === tmpPosition1) &&
                        this.board[tmpPosition1] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition1] === this.blackPawn ||
                        this.board[tmpPosition1] === this.blackKing))
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
                        this.board[tmpPosition1] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition1] === this.blackPawn ||
                        this.board[tmpPosition1] === this.blackKing))
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
                        this.board[tmpPosition1] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition1] === this.blackPawn ||
                        this.board[tmpPosition1] === this.blackKing))
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
                        this.board[tmpPosition1] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition1] === this.blackPawn ||
                        this.board[tmpPosition1] === this.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
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
                    }     
                    xTmp1--;
                    yTmp1++;  
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                while((xTmp1 >= 0) && (yTmp1 >= 0)){
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
            let pawn = this.lastClicked;// czy to jest dobrze
            let ifMoveIsPossible = false;
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
            let xTmp1, xTmp2, yTmp1, yTmp2, tmpPosition1, tmpPosition2;
            if (this.turn && ((this.board[pawn] === this.whitePawn)))
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
            else if (this.turn && (this.board[pawn] === this.whiteKing)){
                let m = 1;
                let tmpPosition = pawn;
                let defeated = 0;
                while(this.board[tmpPosition] !== undefined){
                    xTmp1 = x+m; 
                    yTmp1 = y+m;
                    tmpPosition = xTmp1.toString() + yTmp1.toString();
                    m++;
                    if ((newField === tmpPosition) &&
                        this.board[tmpPosition] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition] === this.blackPawn ||
                        this.board[tmpPosition] === this.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                m = 1;
                defeated = 0;
                while(this.board[tmpPosition] !== undefined){
                    xTmp1 = x-m; 
                    yTmp1 = y+m;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    m++;
                    if ((newField === tmpPosition) &&
                        this.board[tmpPosition] === this.Empty){
                            if(defeated !==2 ){
                                ifMoveIsPossible = true;
                                break;
                            }
                        } 
                    else if((this.board[tmpPosition] === this.blackPawn ||
                        this.board[tmpPosition] === this.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
            
                m = 1;
                defeated = 0;
                while(this.board[tmpPosition] !== undefined){
                    xTmp1 = x+m; 
                    yTmp1 = y-m;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    m++;
                    if ((newField === tmpPosition) &&
                            this.board[tmpPosition] === this.Empty){
                                if(defeated !==2 ){
                                    ifMoveIsPossible = true;
                                    break;
                                }
                            } 
                        else if((this.board[tmpPosition] === this.blackPawn ||
                            this.board[tmpPosition] === this.blackKing))
                        {   defeated++;
                                if (defeated === 2){ 
                                break; 
                            }
                        }
                    }
                m = 1;
                defeated = 0;
                while(this.board[tmpPosition] !== undefined){
                    xTmp1 = x-m; 
                    yTmp1 = y-m;
                    tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                    m++;
                    if ((newField === tmpPosition) &&
                        this.board[tmpPosition] === this.Empty){
                        if(defeated  !== 2 ){
                            ifMoveIsPossible = true;
                            break;
                        }
                    } 
                    else if((this.board[tmpPosition] === this.blackPawn ||
                        this.board[tmpPosition] === this.blackKing))
                    {   defeated++;
                        if (defeated === 2){ 
                            break; 
                        }
                    }
                }
                
            }
            //black turn
            else if (!this.turn && (this.board[pawn] === this.blackPawn))
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
            }else if(!this.turn && (this.board[pawn] === this.blackKing)){
                const x = parseInt(pawn[0]);
                const y = parseInt(pawn[1]);
                let tmpPosition = pawn;
                let m = 1;
                let defeated = 0;
                    while(this.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            this.board[tmpPosition] === this.Empty){
                                ifMoveIsPossible = true;
                            } 
                        else if((newField === tmpPosition) &&
                            (this.board[tmpPosition] === this.whitePawn ||
                            this.board[tmpPosition] === this.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }

                m = 1;
                defeated = 0;
                    while(this.board[tmpPosition] !== undefined){
                        xTmp1 = x-m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            this.board[tmpPosition] === this.Empty){
                                ifMoveIsPossible = true;
                            } 
                        else if((newField === tmpPosition) &&
                            (this.board[tmpPosition] === this.whitePawn ||
                            this.board[tmpPosition] === this.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                m = 1;
                defeated = 0;
                    while(this.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y-m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            this.board[tmpPosition] === this.Empty){
                                ifMoveIsPossible = true;
                            } 
                        else if((newField === tmpPosition) &&
                            (this.board[tmpPosition] === this.whitePawn ||
                            this.board[tmpPosition] === this.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                m = 1;
                defeated = 0;
                    while(this.board[tmpPosition] !== undefined){
                        xTmp1 = x+m; 
                        yTmp1 = y+m;
                        tmpPosition = xTmp1.toString() + yTmp1.toString();
                        m++;
                        if ((newField === tmpPosition) &&
                            this.board[tmpPosition] === this.Empty){
                                ifMoveIsPossible = true;
                            } 
                        else if((newField === tmpPosition) &&
                            (this.board[tmpPosition] === this.whitePawn ||
                            this.board[tmpPosition] === this.whiteKing))
                        {   defeated++
                            
                            if (defeated === 1 ){ break; }
                        }
                    }
                }
            
            return ifMoveIsPossible;
        },

        isMovable(pawn){
            let x = parseInt(pawn[0]);
            let y = parseInt(pawn[1]);
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
                tmpPosition2 = xTmp2.toString() + yTmp2.toString();   
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
                if((this.board[tmpPosition1] === this.Empty) && ((this.board[pawn] === this.whitePawn) || 
                (this.board[pawn] === this.whiteKing)))
                {
                ifMoveIsPossible = true;
                }       
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && ((this.board[pawn] === this.whitePawn) || 
                (this.board[pawn] === this.whiteKing)))
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
                if((this.board[tmpPosition1] === this.Empty) && 
                (this.board[pawn] === (this.blackKing) || (this.board[pawn] === this.blackPawn)))
                {
                    ifMoveIsPossible = true;
                
                }       
                xTmp1 = x+1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                if((this.board[tmpPosition1] === this.Empty) && 
                (this.board[pawn] === (this.blackKing) || (this.board[pawn] === this.blackPawn)))
                {
                    ifMoveIsPossible = true;
                }
                xTmp1 = x-1; 
                yTmp1 = y-1;
                tmpPosition1 = xTmp1.toString() + yTmp1.toString();
                
                if((this.board[tmpPosition1] === this.Empty) && (this.board[pawn] === this.blackKing))
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
    width:66px;
    height:66px;
}

.Black{
    background-color: rgb(136, 18, 18);
    width: 6px;
    height: 66px;
    /* transition: all 2.6s ease; */
    }

.white-pawn{
    background-color: rgb(255, 255, 255); 
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    /* transition: all 2.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}
.white-king{
    background-color: rgb(255, 85, 0);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    /* transition: all 0.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}

.black-pawn{
    background-color: rgb(93, 96, 162);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 12px;
    /* transition: all 0.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}
.black-king{
    background-color: rgb(18, 6, 95);
    width: 40px;
    height: 40px;
    border-radius: 20x;
    margin: 12px;
    /* transition: all 0.6s ease;
    animation: moveAnimation 1s ease-in-out; */
}
.empty{
    background-color: black;
}
.w{
    background-color: white;
    visibility: hidden;
}
.clicked{
    background-color: yellowgreen;
}
.clickedMoveTo{
    background: yellowgreen;
}
/* .animate {
  transition: transform 0.3s;
}
@keyframes moveAnimation {
    from { transform: translate(0, 0); }
    to { transform: translate(100px, 100px); }
} */

</style>
