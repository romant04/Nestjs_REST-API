<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Todo } from '@/types/todo'
import { useUserStore } from '@/store/user-store'
import { storeToRefs } from 'pinia'
import TodoCard from '@/components/TodoCard.vue'

const store = useUserStore()
const { token } = storeToRefs(store)

const todos = ref<Todo[]>([])
const upcoming = ref(true)

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
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h1 class="text-3xl">Your todos</h1>
        <div v-if="token" class="flex gap-4 mt-5">
          <button
            class="text-white py-2 px-6 rounded-sm font-semibold"
            v-bind:class="upcoming ? 'bg-green-600' : 'bg-green-800'"
            @click="upcoming = true"
          >
            Upcoming
          </button>
          <button
            class="text-white py-2 px-6 rounded-sm font-semibold"
            v-bind:class="!upcoming ? 'bg-green-600' : 'bg-green-800'"
            @click="upcoming = false"
          >
            After deadline
          </button>
        </div>
      </div>
      <div v-if="token">
        <RouterLink to="/add-todo">
          <button
            class="mt-5 px-6 py-2 text-white text-lg bg-green-700 rounded-sm hover:bg-green-600"
          >
            Add todo
          </button>
        </RouterLink>
      </div>
    </div>
    <div v-if="token">
      <div
        class="mt-8"
        v-for="todo in todos.filter((x) =>
          upcoming
            ? Number(new Date(x.dueDate)) > Date.now()
            : Number(new Date(x.dueDate)) < Date.now()
        )"
      >
        <div class="flex justify-between items-center border-gray-200 py-2">
          <TodoCard :todo="todo" />
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
