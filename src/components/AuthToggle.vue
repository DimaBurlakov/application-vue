<script setup>
const props = defineProps({
	activeTab: {
		type: String,
		required: true,
		validator: value => ['login', 'signup'].includes(value),
	},
})

defineEmits(['tab-change'])
</script>
<template>
	<!-- Переключатель Login/Sign Up -->
	<div class="flex border-b border-gray-200">
		<button
			class="flex-1 py-4 text-center font-semibold transition-colors"
			:class="
				props.activeTab === 'login'
					? 'text-blue-600 bg-blue-50'
					: 'text-gray-500 hover:text-gray-700'
			"
			@click="$emit('tab-change', 'login')"
		>
			Login
		</button>
		<button
			class="flex-1 py-4 text-center font-semibold transition-colors"
			:class="
				props.activeTab === 'signup'
					? 'text-blue-600 bg-blue-50'
					: 'text-gray-500 hover:text-gray-700'
			"
			@click="$emit('tab-change', 'signup')"
		>
			Sign Up
		</button>
	</div>
</template>
