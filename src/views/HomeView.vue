<template>
	<div class="min-h-screen bg-gray-50 p-8">
		<div class="max-w-4xl mx-auto">
			<div class="bg-white rounded-lg shadow p-6">
				<div class="flex justify-between items-center mb-6">
					<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
					<button
						@click="handleLogout"
						class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
					>
						Logout
					</button>
				</div>

				<div class="bg-green-50 border border-green-200 rounded-lg p-4">
					<h2 class="text-lg font-semibold text-green-800 mb-2">
						Welcome back!
					</h2>
					<p class="text-green-700">
						You are logged in as: {{ authStore.user?.email }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const handleLogout = async () => {
	await authStore.logout()
}
</script>
