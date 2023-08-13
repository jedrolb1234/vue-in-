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
    computed: {
        ...mapGetters(['getBoard']),
    },
    methods: {
        ...mapActions(['dropBall', 'resetGame']),
        getPawn(i, j) {
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
    background-color: var(--primaryBtn);
    border-spacing: 0px;
    border-collapse: collapse;
    border: 1px solid var(--primary);
    border-right: 0px;
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
    background-color: yellow;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    /* animation-name: fadeIn;
    animation-duration: 500ms; */
    border: 1px solid var(--primary);
    overflow: hidden;
}

.blue {
    background-color: var(--accent);
    width: 80px;
    height: 80px;
    border-radius: 40px;
    /* animation-name: fadeIn;
    animation-duration: 500ms; */
    border: 1px solid var(--primary);
}

.empty {
    border-radius: 50%;
    border: 1px solid var(--primary);
    background-color: white;
    width: 80px;
    height: 80px;
    transition: all;
}
</style>