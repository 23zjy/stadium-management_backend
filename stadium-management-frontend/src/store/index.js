import { createStore } from 'vuex';
import axios from 'axios';
import {ElMessage} from "element-plus";

const store = createStore({
    state: {
        user: null,  // 登录用户信息
        venues: [],  // 场馆信息
        members: [], // 会员信息
        products: [], // 商品信息
        reservations: [], // 预订信息
        currentVenue: null // 当前选择的场馆
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            // 更新 Axios 的 Authorization 头
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        },
        setVenues(state, venues) {
            state.venues = venues;
        },
        setMembers(state, members) {
            state.members = members;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setReservations(state, reservations) {
            state.reservations = reservations;
        },
        setCurrentVenue(state, venue) {
            state.currentVenue = venue;
        }
    },
    actions: {
        async login({ commit }, { username, password, venue }) {
            try {
                // 调用 API 进行登录验证
                const response = await axios.post('/login', { username, password, venue });
                const user = response.data;
                commit('setUser', user);
                ElMessage.success('登录成功');
                return user; // 返回用户信息给调用者
            } catch (error) {
                ElMessage.error('登录失败', error);
                throw error; // 抛出错误，由调用者处理
            }
        },
        async fetchVenues({ commit }) {
            try {
                const response = await axios.get('/venues');
                const venues = response.data;
                commit('setVenues', venues);
            } catch (error) {
                ElMessage.error('获取场馆列表失败', error);
                throw error;
            }
        },
        async fetchMembers({ commit }) {
            try {
                // 调用 API 获取会员列表
                const response = await axios.get('/members');
                const members = response.data;
                commit('setMembers', members);
            } catch (error) {
                ElMessage.error('获取会员列表失败', error);
            }
        },
        async fetchProducts({ commit }) {
            try {
                // 调用 API 获取商品列表
                const response = await axios.get('/products');
                const products = response.data;
                commit('setProducts', products);
            } catch (error) {
                ElMessage.error('获取商品列表失败', error);
            }
        },
        async fetchReservations({ commit }) {
            try {
                // 调用 API 获取预订列表
                const response = await axios.get('/reservations');
                const reservations = response.data;
                commit('setReservations', reservations);
            } catch (error) {
                ElMessage.error('获取预订列表失败', error);
            }
        },
        setCurrentVenue({ commit }, venue) {
            commit('setCurrentVenue', venue);
        }
    },
    getters: {
        getUser: (state) => state.user,
        getVenues: (state) => state.venues,
        getMembers: (state) => state.members,
        getProducts: (state) => state.products,
        getReservations: (state) => state.reservations,
        getCurrentVenue: (state) => state.currentVenue
    }
});


export default store;
