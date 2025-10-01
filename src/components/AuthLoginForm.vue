<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const handleLoginUser = () => {
	authStore.login(email.value, password.value)
}
</script>

<template>
	<!-- Форма Login -->
	<div class="space-y-6">
		<div>
			<label class="block text-sm font-medium text-gray-700 mb-2"
				>Email address</label
			>
			<input
				v-model="email"
				type="email"
				placeholder="Enter your email address"
				class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
			/>
		</div>

		<div>
			<div class="flex justify-between items-center mb-2">
				<label class="block text-sm font-medium text-gray-700">Password</label>
				<a
					href="#"
					class="text-sm text-blue-600 hover:text-blue-500 transition-colors"
					>Forgot password?</a
				>
			</div>
			<input
				v-model="password"
				type="password"
				placeholder="Enter your password"
				class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
			/>
		</div>

		<button
			class="w-full font-medium py-3 px-4 rounded-lg transition-colors"
			:class="
				authStore.isLoading
					? 'bg-gray-400 cursor-not-allowed'
					: 'bg-blue-600 hover:bg-blue-700 text-white'
			"
			:disabled="authStore.isLoading"
			@click="handleLoginUser"
		>
			{{ authStore.isLoading ? 'Loading...' : 'Log In' }}
		</button>
		<div
			v-if="authStore.error"
			class="text-red-500 text-center p-2 bg-red-50 rounded"
		>
			{{ authStore.error }}
		</div>

		<p class="text-center text-gray-600">
			Don't have an account yet?
			<a
				href="#"
				class="text-blue-600 hover:text-blue-500 font-medium transition-colors"
				@click.prevent="activeTab = 'signup'"
				>Sign up</a
			>
		</p>
	</div>
</template>
