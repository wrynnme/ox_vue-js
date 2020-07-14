import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { component } from 'vue/types/umd';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/game',
		name: 'Game',
		component: () => import('../views/Game.vue'),
	},
	{
		path: '/history',
		name: 'History',
		component: () => import('../views/History.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
