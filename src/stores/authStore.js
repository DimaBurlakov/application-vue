import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// Имитация "серверной" базы пользователей
const mockUsers = [
	{
		id: 1,
		email: 'admin@crm.com',
		password: 'admin123',
		name: 'Admin User',
		role: 'admin',
	},
	{
		id: 2,
		email: 'manager@crm.com',
		password: 'manager123',
		name: 'Manager',
		role: 'manager',
	},
]

export const useAuthStore = defineStore('auth', () => {
	// State
	const allUsers = ref([...mockUsers])
	const user = ref(null)
	const isLoading = ref(false)
	const error = ref(null)

	// Getters
	const isAuthenticated = computed(() => {
		return !!user.value
	})

	const currentUser = computed(() => {
		return user.value
	})

	//Actions

	const login = async (email, password) => {
		isLoading.value = true
		error.value = null

		try {
			console.log('Отправляем данные на сервер(имитация):', email, password)
			await new Promise(resolve => setTimeout(resolve, 1000))

			const foundUser = allUsers.value.find(
				u => u.email === email && u.password === password
			)
			console.log(JSON.stringify(user.value))

			if (foundUser) {
				user.value = foundUser
				localStorage.setItem(
					'auth',
					JSON.stringify({
						user: user.value,
						isAuthenticated: true,
					})
				)
				console.log('✅ Пользователь успешно вошел!')
			} else {
				throw new Error('Пожалуйста, заполните все поля')
			}
		} catch (err) {
			error.value = err.message
			console.error('❌ Ошибка входа:', err.message)
		} finally {
			isLoading.value = false
		}
	}

	const logout = () => {
		user.value = null
		error.value = null
		localStorage.removeItem('auth')
		console.log('👋 Пользователь вышел')
	}

	const signup = async userData => {
		isLoading.value = true
		error.value = null

		try {
			await new Promise(resolve => setTimeout(resolve, 1000))
			if (userData.email && userData.password) {
				user.value = {
					id: Date.now(),
					email: userData.email,
					name: userData.email.split('@')[0],
				}
				localStorage.setItem(
					'auth',
					JSON.stringify({
						user: user.value,
						isAuthenticated: true,
					})
				)
				console.log('✅ Пользователь зарегистрирован!')
			} else {
				throw new Error('Пожалуйста, заполните все поля')
			}
		} catch (err) {
			error.value = err.message
			console.error('❌ Ошибка регистрации:', err.message)
		} finally {
			isLoading.value = false
		}
	}

	const checkAuth = () => {
		const authData = localStorage.getItem('auth')

		if (authData) {
			const { user: savedUser, isAuthenticated } = JSON.parse(authData)
			user.value = savedUser
			console.log('🔍 Найдена сохраненная авторизация')
		}
	}

	const clearError = () => {
		error.value = null
	}

	return {
		user,
		isLoading,
		error,
		isAuthenticated,
		currentUser,
		login,
		logout,
		signup,
		checkAuth,
		clearError,
	}
})
