<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user-store'

const router = useRouter()

const email = ref('')
const password = ref('')

const store = useUserStore()

const login = async (e: Event) => {
  e.preventDefault()

  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  const data = await response.json()

  if (!response.ok) {
    alert(data.message)
    email.value = ''
    password.value = ''
  }

  console.log(data)
  if (data.token) {
    SaveAndRedirect(data.token)
  }
}
const SaveAndRedirect = (token: string) => {
  localStorage.setItem('token', token)
  store.setUser(email.value, token)
  router.push({ path: '/' })
}
</script>

<template>
  <div class="flex h-full justify-center items-center w-full">
    <form @submit="login" class="flex flex-col gap-5 md:w-2/5 w-full px-5 items-center">
      <h1 class="text-3xl mb-6">Login</h1>
      <div class="w-full items-center">
        <label for="email" class="text-lg">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <div class="w-full items-center">
        <label for="password" class="text-lg">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <button
        class="bg-green-700 text-white text-lg px-6 py-2 rounded-sm w-full hover:bg-green-600"
      >
        Login
      </button>
    </form>
  </div>
</template>
