<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/store/user-store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return
  }

  const response = await fetch('http://localhost:8080/user/email', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const email = await response.text()
  if (response.ok) {
    store.setUser(email, token)
  } else {
    localStorage.removeItem('token') // remove invalid token
  }
})

const store = useUserStore()
const { email } = storeToRefs(store)
const signOut = () => {
  localStorage.removeItem('token')
  store.setUser('', '')
  location.reload()
}
</script>

<template>
  <header style="grid-area: header">
    <div class="flex bg-green-800 py-4 px-8 text-white items-center justify-between">
      <RouterLink to="/">
        <h1 class="text-2xl font-semibold">Todo app</h1>
      </RouterLink>
      <div v-if="email" class="flex gap-5">
        <p class="font-semibold">Logged in as {{ email }}</p>
        <button @click="signOut">Sign out</button>
      </div>
      <nav v-if="!email" class="flex gap-3">
        <RouterLink to="/login" class="text-lg">Login</RouterLink>
        <RouterLink to="/register" class="text-lg">Register</RouterLink>
      </nav>
    </div>
  </header>

  <main style="grid-area: main">
    <RouterView />
  </main>
</template>
