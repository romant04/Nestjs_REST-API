<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Todo } from '@/types/todo'
import { useUserStore } from '@/store/user-store'
import { storeToRefs } from 'pinia'
import TodoCard from '@/components/TodoCard.vue'
import TodoDeleteDialog from '@/components/TodoDeleteDialog.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute() // route.params.upcoming -> upcoming = upcoming | ad

const store = useUserStore()
const { token } = storeToRefs(store)

const todos = ref<Todo[]>([])
const upcoming = ref(route.params.upcoming !== 'ad')
const tobeDeleted = ref<string>('')
const open = ref(false)

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

const selectToDelete = (id: string) => {
  tobeDeleted.value = id
  open.value = true
}
const close = () => {
  open.value = false
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
    <TodoDeleteDialog :id="tobeDeleted" :open="open" :close="close" />

    <div class="flex flex-col">
      <h1 class="text-3xl font-semibold">Your todos</h1>
      <div
        v-if="token"
        class="flex flex-col-reverse gap-3 mt-5 items-start justify-between md:items-center md:flex-row"
      >
        <div class="flex gap-4">
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
        <div v-if="token">
          <RouterLink to="/add-todo">
            <button class="px-6 py-2 text-white bg-yellow-600 rounded-sm hover:bg-yellow-500">
              Add todo
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="token">
      <div v-if="todos.length === 0">
        <h2 class="text-xl mt-3">You have no todos</h2>
        <p class="mt-1">Add a todo to get started</p>
      </div>
      <div class="overflow-auto max-h-[60vh] px-5 mt-8">
        <div
          class="mt-5"
          v-for="todo in todos.filter((x) =>
            upcoming
              ? Number(new Date(x.dueDate)) > Date.now()
              : Number(new Date(x.dueDate)) < Date.now()
          )"
        >
          <TodoCard
            :key="todo._id"
            :todo="todo"
            :select-delete="selectToDelete"
            :upcoming="upcoming"
          />
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
