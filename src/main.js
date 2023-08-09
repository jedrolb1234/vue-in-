import { createApp } from 'vue';
import App from './App.vue';
import Router from './router.js';
import Store from './state/index.js';
import CallHubPlugin from "@/mixins/callHubPlugin.js";

const app = createApp(App);

app.use(Router);

app.use(Store);

app.use(CallHubPlugin);

app.mount('#app');
