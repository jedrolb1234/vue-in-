import { createApp } from 'vue';
import App from './App.vue';
import Router from './router.js';
import Store from './state/index.js';

const app = createApp(App);

app.use(Router);

app.use(Store);

app.mount('#app');
