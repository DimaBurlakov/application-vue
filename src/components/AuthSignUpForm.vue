<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const handleSignUpUser = () => {
	authStore.signup(email.value, password.value)
}
</script>
<template>
	<!-- Форма Sign Up -->
	<form action="">
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
				<label class="block text-sm font-medium text-gray-700 mb-2"
					>Password</label
				>
				<input
					v-model="password"
					type="password"
					placeholder="Enter your password"
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
				/>
			</div>

			<div class="flex items-center">
				<input
					type="checkbox"
					id="newsletter"
					class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
				/>
				<label for="newsletter" class="ml-2 text-sm text-gray-600">
					Please keep me updated by email with the latest news, research
					findings, reward programs, event updates.
				</label>
			</div>

			<button
				class="w-full font-medium py-3 px-4 rounded-lg transition-colors"
				:class="
					authStore.isLoading
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-blue-600 hover:bg-blue-700 text-white'
				"
				:disabled="authStore.isLoading"
				@click="handleSignUpUser"
			>
				Create an account
			</button>

			<p class="text-center text-gray-600">
				Already have an account?
				<a
					href="#"
					class="text-blue-600 hover:text-blue-500 font-medium transition-colors"
					>Login</a
				>
			</p>
		</div>
	</form>
</template>
