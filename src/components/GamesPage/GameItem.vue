<template>
  <div class="game-item" :style="this.background">
    <div class="game-name">
      {{ game.name }}
    </div>
    <div class="game-description">
      {{ game.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['game'],
  computed: {
    background() {
      if (this.game.active) {
        return {
          'background-image': 'url(' + this.game.img + ')',
          'background-size': 'cover'
        }
      }
      return {
        'background-image': 'url(' + this.game.img + ')',
        'background-size': 'cover',
        'filter': 'grayscale(100%)'
      }
    }
  },
  // created() {
  //   console.log(this.game);
  // }
}
</script>

<style scoped>
.game-item {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  height: 310px;
  border: 2px solid var(--primary);
  /* border-radius: 30px; */
  box-shadow: 5px 5px 5px var(--shadow);
  transition: all 0.2s;
  position: relative;
  transition: all 0.2s;
}

.game-item::before {
  background-color: var(--secondaryBtn);
  opacity: 0;
  top:50%;
  left:50%;
  /* padding:15px 0px; */
  width:100%;
  height:100%;
  content: "";
  z-index: -1;
  position:absolute;
  transform: translate(-50%, -50%);
  /* border-radius: 28px; */
  transition: all 0.2s;
  box-sizing: border-box;
}

.game-item:hover::before {
  opacity: 0.7;
}

.game-item:hover {
  transform: translateY(-7px);
  cursor: pointer;
  border-color: var(--accent);
}

.game-description {
  opacity: 0;
  margin:auto;
  z-index:1;
  font-weight: bold;
  transition: all 0.2s;
  text-shadow: -1px 0px 1px var(--secondary), 1px 0px 1px var(--secondary), 0px 1px 1px var(--secondary), 0px -1px 1px var(--secondary);
}

.game-item:hover .game-description {
  opacity: 1;
}

.game-name {
  stroke-width: 5px;
  font-size: 24px;
  stroke-linejoin : round;
  z-index: 1;
  position: relative;
  font-weight: bold;
  text-shadow: -1px 0px 1px var(--secondary), 1px 0px 1px var(--secondary), 0px 1px 1px var(--secondary), 0px -1px 1px var(--secondary);
}

.game-item:hover .game-name::before {
  opacity: 0;
}

.game-name::before {
  background-color: var(--secondaryBtn);
  opacity: 0.7;
  top:50%;
  left:50%;
  padding:15px 0px;
  width:496px;
  height:100%;
  content: "";
  z-index: -1;
  position:absolute;
  transform: translate(-50%, -50%);
  /* border-radius: 28px 28px 0 0; */
  transition: all 0.2s;
}
</style>