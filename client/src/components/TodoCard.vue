<script setup lang="ts">
import type { Todo } from '@/types/todo'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'

const props = defineProps<{
  todo: Todo
  selectDelete: (id: string) => void
  upcoming: boolean
}>()
const { todo, upcoming } = toRefs(props)

const router = useRouter()

const token = localStorage.getItem('token')
if (!token) {
  router.push({ path: '/login' })
}

const checkTodo = async () => {
  if (!todo) return
  const response = await fetch(`http://localhost:8080/user/todos/${todo.value._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ done: !todo.value.done })
  })
  if (!response.ok) {
    const data = await response.json()
    alert(data.message)
    return
  }

  await router.push({ path: `/${upcoming.value ? 'upcoming' : 'ad'}` })
  location.reload()
}
</script>

<template>
  <div class="flex justify-between items-center border-b-2 border-gray-200 py-2 w-full gap-5">
    <div class="flex gap-3">
      <input
        type="checkbox"
        class="h-5 w-5 mt-1 accent-green-700"
        :checked="todo.done"
        @click="checkTodo"
      />
      <div class="flex flex-col">
        <h3 class="text-xl font-semibold">{{ todo.title }}</h3>
        <p class="max-w-md">{{ todo.description }}</p>
        <p class="mt-2 text-sm italic">
          {{ new Date(todo.dueDate.toString()).toLocaleDateString() }}
        </p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <RouterLink :to="`/edit-todo/${todo._id}`">
        <button class="text-white bg-green-700 px-4 py-1 rounded-sm hover:bg-green-600">
          Edit
        </button>
      </RouterLink>
      <button
        class="text-white bg-red-700 px-4 py-1 rounded-sm hover:bg-red-600"
        @click="selectDelete(todo._id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped></style>
