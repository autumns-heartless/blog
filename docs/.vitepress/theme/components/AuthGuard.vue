<!-- 《 页面锁 》 -->
<template>
  <div>
    <div v-if="loading" class="text-center">
      <div
        class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"
      ></div>
      <p class="text-xl font-semibold text-gray-700">Loading...</p>
    </div>
    <div v-else>
      <slot v-if="authenticated"></slot>
      <div v-else class="text-center">
        <p class="text-lg font-semibold text-red-600 mb-4">你没有权限查看此页面</p>
        <button
          @click="handleLogin"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { initAuth0, isAuthenticated, login } from '../utils/auth/auth'

const loading = ref(true)
const authenticated = ref(false)

onMounted(async () => {
  await initAuth0()
  authenticated.value = await isAuthenticated()
  loading.value = false
})

const handleLogin = async () => {
  await login()
}
</script>

<style>
.loader {
  border-top-color: #3490dc;
  animation: spin 1s ease-in-out infinite;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.duration-300 {
  transition-duration: 0.3s;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
