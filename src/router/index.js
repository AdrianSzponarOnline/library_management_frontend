import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Authors from '../views/Authors.vue';
import Books from '../views/Books.vue';
import Users from '../views/Users.vue';
import Loans from '../views/Loans.vue';
import Contact from '../views/Contact.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/authors', name: 'authors', component: Authors },
    { path: '/books', name: 'books', component: Books },
    { path: '/users', name: 'users', component: Users },
    { path: '/loans', name: 'loans', component: Loans },
    { path: '/contact', name: 'contact', component: Contact },
];

const index = createRouter({
    history: createWebHistory(),
    routes
});

export default index;
