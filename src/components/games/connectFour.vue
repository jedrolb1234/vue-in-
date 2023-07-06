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
export default {
    data() {
        return {
            board: Array(6).fill().map(() => Array(7).fill(0)),
            empty: 0,
            red: 1,
            blue: 2,
            winner: null,
            winnerPawns: [],
            playerTurn: 1
        }
    },
    methods: {
        getPawn(i, j) {
            for (let k = 0; k < this.winnerPawns.length; k++) {
                if (this.winnerPawns[k][0] == i && this.winnerPawns[k][1] == j) {
                    return 'winner'
                }
            }
            if (this.board[i][j] == 1)
                return 'red';
            if (this.board[i][j] == 2)
                return 'blue';
            return 'empty';
        },
        dropBall(c) {
            if (this.winner != null)
                return
            for (let i = 5; i >= 0; i--) {
                if (this.board[i][c] == this.empty) {
                    this.board[i][c] = this.playerTurn;
                    this.checkWinner();
                    if (this.playerTurn === this.red) {
                        this.playerTurn = this.blue;
                    }
                    else {
                        this.playerTurn = this.red;
                    }
                    break;
                }
            }
        },
        checkWinner() {
            const height = this.board.length;
            const width = this.board[0].length;
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    const slot = this.board[i][j];
                    if (slot != this.playerTurn) {
                        continue;
                    }
                    if (j + 3 < width && this.playerTurn == this.board[i][j + 1] && this.playerTurn == this.board[i][j + 2] && this.playerTurn == this.board[i][j + 3]) {
                        this.winner = this.playerTurn;
                        this.winnerPawns = [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]]
                        return
                    }
                    if (i + 3 < height) {
                        if (slot == this.board[i + 1][j] && slot == this.board[i + 2][j] && slot == this.board[i + 3][j]) {
                            this.winner = this.playerTurn;
                            this.winnerPawns = [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]]
                            return
                        }
                        if (j + 3 < width && slot == this.board[i + 1][j + 1] && slot == this.board[i + 2][j + 2] && slot == this.board[i + 3][j + 3]) {
                            this.winner = this.playerTurn;
                            this.winnerPawns = [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]]
                            return
                        }
                        if (j - 3 < width && slot == this.board[i + 1][j - 1] && slot == this.board[i + 2][j - 2] && slot == this.board[i + 3][j - 3]) {
                            this.winner = this.playerTurn;
                            this.winnerPawns = [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]]
                            return
                        }
                    }

                }
            }
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