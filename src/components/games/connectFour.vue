<template>
    <table>
        <tr v-for="i in 6" :key="i">
            <td v-for="j in 7" :key="j" @click="dropBall(j - 1)">
                <p :class="this.getPawn(i - 1, j - 1)"></p>
            </td>
        </tr>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters('Polacz4', ['getBoard', 'getWinnerPawns']),
    },
    methods:{
        ...mapActions('Polacz4', ['dropBall']),
        getPawn(i, j) {
            console.log('sss')
            for (let k = 0; k < this.getWinnerPawns.length; k++) {
                if (this.getWinnerPawns[k][0] == i && this.getWinnerPawns[k][1] == j) {
                    console.log('winner')
                    return 'winner'
                }
            }
            if (this.getBoard[i][j] == 1)
                return 'red'
            if (this.getBoard[i][j] == 2)
                return 'blue'
            return 'empty'
        },
    }
}
</script>

<style scoped>
p {
    margin: 10px;
}

table {
    background-color: cornflowerblue;
    border-spacing: 0px;
    border-collapse: collapse;
}

@keyframes fadeIn {
    from {
        transform: translateY(-150px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 100%;
    }
}

.red {
    background-color: rgb(242, 255, 0);
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: fadeIn;
    animation-duration: 500ms;
    overflow: hidden;
}

.blue {
    background-color: blue;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    animation-name: fadeIn;
    animation-duration: 500ms;
}

.winner {
    background-color: rgb(104, 220, 38);
    width: 80px;
    height: 80px;
    border-radius: 40px;
}

.empty {
    width: 80px;
    height: 80px;
}
</style>