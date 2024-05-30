import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import FinanceSummary from '../views/FinanceSummary.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import MemberList from '../views/MemberList.vue';
import ProductList from '../views/ProductList.vue';
import UserList from '../views/UserList.vue';
import VenueList from '../views/VenueList.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/finance',
        name: 'FinanceSummary',
        component: FinanceSummary
    },
    {
        path: '/members',
        name: 'MemberList',
        component: MemberList
    },

    {
        path: '/products',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/venues',
        name: 'VenueList',
        component: VenueList
    },

];

const router = createRouter({
    history: createWebHistory('/'), // 直接指定基本 URL 路径
    routes
});

export default router;
