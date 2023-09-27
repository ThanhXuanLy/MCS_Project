import './assets/main.css'
import * as Vue from 'vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.use(Antd).mount('#app');
