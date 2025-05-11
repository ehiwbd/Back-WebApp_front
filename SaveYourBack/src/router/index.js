// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProgressView from '../views/ProgressView.vue'
import TimeSettingsView from '../views/TimeSettingsView.vue'
import YourReportView from '../views/YourReportView.vue'
import UserSettingsView from '../views/UserSettingsView.vue'


const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/shop',
		name: 'Shop',
		component: ShopView,
	},
	{
		path: '/progress',
		name: 'Progress',
		component: ProgressView,
	},
	{
		path: '/timeset',
		name: 'TimeSettings',
		component: TimeSettingsView,
	},
	{
		path: '/yourReport',
		name: 'YourReport',
		component: YourReportView,
	},

	{
		path: '/userset',
		name: 'UserSettings',
		component: UserSettingsView,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
