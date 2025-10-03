import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/AuthView.vue')

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
		meta: { requiresAuth: true },
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginView,
		meta: { requiresGuest: true },
	},
	{
		path: '/:pathMatch(.*)*', // Перехват всех неизвестных путей
		name: 'NotFound',
		redirect: '/', // Перенаправляем на главную
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

// 🔐 Глобальный навигационный гард - защита маршрутов
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()

	// Проверяем авторизацию при загрузке приложения
	if (!authStore.user) {
		authStore.checkAuth()
	}

	// Если маршрут требует авторизации, а пользователь не авторизован
	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		next('/login') // Перенаправляем на логин
	}
	// Если маршрут только для гостей, а пользователь авторизован
	else if (to.meta.requiresGuest && authStore.isAuthenticated) {
		next('/') // Перенаправляем на главную
	}
	// Во всех остальных случаях разрешаем переход
	else {
		next()
	}
})

export default router
