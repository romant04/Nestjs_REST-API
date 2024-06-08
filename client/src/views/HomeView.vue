<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Todo } from '@/types/todo'
import { useUserStore } from '@/store/user-store'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { token } = storeToRefs(store)

const todos = ref<Todo[]>([])

const getTodos = async () => {
  const response = await fetch('http://localhost:8080/user/todos', {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    alert(data.message)
    return
  }
  console.log(data)
  todos.value = data
}

watch(
  token,
  (newToken) => {
    if (newToken) {
      getTodos()
    }
  },
  { immediate: true }
)
</script>

<template>
  <main class="mt-12 w-3/4 mx-auto">
    <h1 class="text-3xl">Your todos</h1>
    <div v-if="token">
      <div class="mt-4" v-for="todo in todos">
        <div class="flex justify-between items-center border-b-2 border-gray-200 py-2">
          <p>{{ todo.title }}</p>
          <div class="flex gap-2">
            <button class="text-white bg-green-700 px-2 py-1 rounded-sm hover:bg-green-600">
              Edit
            </button>
            <button class="text-white bg-red-700 px-2 py-1 rounded-sm hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!token">
      <h2 class="text-xl mt-3">You are not signed</h2>
      <p class="mt-1">Sign in to start adding todos</p>
      <RouterLink to="/login">
        <button
          class="mt-5 px-6 py-2 text-white text-lg bg-green-700 rounded-sm hover:bg-green-600"
        >
          Sign in
        </button>
      </RouterLink>
    </div>
  </main>
</template>
