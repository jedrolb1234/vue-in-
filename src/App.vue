<template>
  <router-view></router-view>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  mounted() {
    this.theme = localStorage.getItem('theme');
    if (this.theme){
      document.body.classList.add(this.theme);
      document.documentElement.style.colorScheme=this.theme;
      localStorage.setItem('theme', this.theme);
    }
  },
  computed: {
    ...mapGetters(['getTheme'])
  },
  methods:{
    ...mapActions(['setTheme'])
  },
  watch: {
    getTheme(newTheme, oldTheme) {
      document.body.classList.remove(oldTheme)
      document.body.classList.add(newTheme);
      document.documentElement.style.colorScheme=newTheme;
      localStorage.setItem('theme', newTheme);
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #5da054 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--accent);
    border-radius: 5px;
  }

:root {
  --primary: #050505;
  --secondary: #FFFFFF;
  --primaryBtn: #B6BBBE;
  --secondaryBtn: #F7F7F8;
  --accent: #0E9A2A;
  --shadow: #B6BBBE;
}

.dark {
  --primary: #EAEBEB;
  --secondary: #0f0f10;
  --primaryBtn: #555758;
  --secondaryBtn: #070808;
  --accent: #0E9A2A;
  --shadow: #070808;
}

* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

body {
  /* background: url('./assets/background.png') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; */
  background-color: var(--secondary);
  padding: 0;
  margin: 0;
  font-family: Poppins;
  user-select: none;
}

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

.shadow {
  filter: drop-shadow(0px 0px 20px var(--shadow));
}

.clickable {
  cursor: pointer;
}
</style>
