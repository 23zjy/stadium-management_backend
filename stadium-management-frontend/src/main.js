import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';
import * as echarts from 'echarts'; // 导入 echarts

// 配置 Axios 默认设置
axios.defaults.baseURL = 'http://localhost:8888/api'; // 根据需要调整 baseURL
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.user?.token || ''}`;

// 将 Axios 添加到 Vue 原型链上，使其可以在组件中通过 this.$axios 访问
const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts; // 将 echarts 添加到 Vue 原型链上

app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount('#app');




