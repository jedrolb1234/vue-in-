<template>
  <div class="game-item" :style="this.background">
    <div class="game-name">
      {{ game.name }}
    </div>
    <div class="game-favorite-button">
      <!-- <span class="material-symbols-outlined" :style="this.isFavorite" @click.stop="this.toogleFavorite(this.game.id)">
        favorite
      </span> -->
    </div>
    <div class="game-description">
      {{ game.shortDescription }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
        'background-image': 'linear-gradient(black, black), url(' + this.game.img + ')',
        'background-size': 'cover',
        'background-blend-mode': 'saturation'
      }
    },
    isFavorite() {
      if (this.game.isFavorite) {
        return {
          'font-variation-settings': "'FILL' 1",
          'color': 'red'
        }
      }
      return {
        'font-variation-settings': "'FILL' 0",
        'color': 'var(--primary)'
      }
    }
  },
  methods: {
    ...mapActions(['toogleFavorite'])
  }
}
</script>

<style scoped>
.game-item {
  flex: 0 0 500px;
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
  scroll-snap-align: start;
}



.game-item::before {
  background-color: var(--secondaryBtn);
  opacity: 0;
  top: 50%;
  left: 50%;
  /* padding:15px 0px; */
  width: 100%;
  height: 100%;
  content: "";
  z-index: -1;
  position: absolute;
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
  z-index: 20;
}

.game-description {
  opacity: 0;
  margin: auto;
  z-index: 1;
  font-weight: bold;
  transition: all 0.2s;
  text-shadow: -1px 0px 1px var(--secondary), 1px 0px 1px var(--secondary), 0px 1px 1px var(--secondary), 0px -1px 1px var(--secondary);
}

.game-item:hover .game-description {
  opacity: 1;
}

.game-name {
  font-size: 24px;
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
  top: 50%;
  left: 50%;
  padding: 15px 0px;
  width: 496px;
  height: 100%;
  content: "";
  z-index: -1;
  position: absolute;
  transform: translate(-50%, -50%);
  /* border-radius: 28px 28px 0 0; */
  transition: all 0.2s;
}

.material-symbols-outlined {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  font-variation-settings:
    'FILL' 1,
    'wght' 100,
    'GRAD' 0,
    'opsz' 24;
  font-size: 40px;
  /* text-shadow: -1px 0px 1px var(--secondary), 1px 0px 1px var(--secondary), 0px 1px 1px var(--secondary), 0px -1px 1px var(--secondary); */
  transition: all 0.2s;
  z-index: 1;
  padding: 12.5px;
}

.game-item:hover .material-symbols-outlined {
  opacity: 1;
}
</style>