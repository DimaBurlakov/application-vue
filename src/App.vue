<script setup>
import AuthLayout from './layouts/AuthLayout.vue'
import AuthToggle from './components/AuthToggle.vue'
import AuthContentForm from './components/AuthContentForm.vue'
import AuthContinueWithBtn from './components/AuthContinueWithBtn.vue'
import AuthSeparator from './components/AuthSeparator.vue'
import AuthLoginForm from './components/AuthLoginForm.vue'
import { ref } from 'vue'
import AuthSignUpForm from './components/AuthSignUpForm.vue'

const activeTab = ref('login')

const handleTabChange = newTab => {
	console.log('Переключение на вкладку', newTab)
	activeTab.value = newTab
}
</script>

<template>
	<AuthLayout>
		<AuthToggle :activeTab="activeTab" @tab-change="handleTabChange" />
		<AuthContentForm>
			<AuthContinueWithBtn />
			<AuthSeparator />
			<AuthLoginForm v-if="activeTab === 'login'" />
			<AuthSignUpForm v-else-if="activeTab === 'signup'" />
		</AuthContentForm>
	</AuthLayout>
</template>
