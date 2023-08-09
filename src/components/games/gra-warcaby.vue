<template>
    <div class="board-container">
        <table class="board-table">
            <tr v-for="(t,key) in getVLoop" :key='key'>
                <td v-for="(p, idx) in t"  :key="idx"
                        :class="getClass(p)" @click="chooseMethod(p)"><p :class="getPawnClass(p)"></p></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods:{
        ...mapActions('Warcaby', ['chooseMethod', 'isMovable', 'move', 'moveTo', 'active']),
        getClass(field){ 
            if((this.getClickedCell === field) && this.getIfMoveIsPossible){
               return this.getClickedClass;
            }            
            else if (this.getBoard(field) === this.getEmpty){
                return this.getBlackClass;
            }else if (field === this.getW){
                return this.getWhiteEmpty;
            }
            else {
                return this.getBlackClass;
            }
        },
        chooseMethod(field){
            this.isMovable(field);console.log(this.getIfMoveIsPossible);
            this.active(field)
            console.log(this.getClickedSecondCell, this.getActiveMove)
            if(this.getIfMoveIsPossible){
                return this.move(field)
            } else if(this.getClickedSecondCell && this.getActiveMove){
                console.log('aaaa', this.getActiveMove)
               return this.moveTo(field)
            }
            return
        },
    },
    computed:{
        ...mapGetters('Warcaby', ['getPawnClass','getWhiteEmpty', 'getVLoop', 'getBlackClass', 'getW', 'getClickedClass', 
                    'getBoard', 'getEmpty', 'getClickedCell', 'getClickedSecondCell', 'getIfMoveIsPossible',
                    'getActiveMove']),

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
