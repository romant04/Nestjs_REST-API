<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import type { Todo } from '@/types/todo'

const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)

const token = localStorage.getItem('token')
if (!token) {
  router.push({ path: '/login' })
}

const todo = ref<Todo>()

const editTodo = async (e: Event) => {
  e.preventDefault()

  if (!todo.value) {
    return
  }

  const response = await fetch(`http://localhost:8080/user/todos/${id.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todo.value)
  })
  const data = await response.json()

  if (!response.ok) {
    alert(data.message)
    return
  }

  redirect()
}
const redirect = () => {
  router.push({ path: '/' })
}

const updateValue = (e: Event) => {
  if (!todo.value) return
  todo.value.dueDate = new Date((e.target as HTMLInputElement).value)
}

watch(
  id,
  async (newId) => {
    const response = await fetch(`http://localhost:8080/user/todos/${newId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()

    if (!response.ok) {
      alert(data.message)
      return
    }
    todo.value = data
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex h-full justify-center items-center w-full pb-20">
    <div class="text-xl" v-if="!todo">
      <p>Loading...</p>
    </div>
    <form
      @submit="editTodo"
      v-if="todo"
      class="flex flex-col gap-5 md:w-2/5 w-full px-5 items-center"
    >
      <h1 class="text-3xl mb-6">Edit todo</h1>
      <div class="w-full items-center">
        <label class="text-lg">Title</label>
        <input
          v-model="todo.title"
          type="text"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <div class="w-full items-center">
        <label class="text-lg">Due date</label>
        <input
          :value="new Date(todo.dueDate).toISOString().split('T')[0]"
          @input="updateValue"
          type="date"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <div class="w-full items-center">
        <label class="text-lg">Description</label>
        <textarea
          rows="3"
          v-model="todo.description"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <button
        class="bg-green-700 text-white text-lg px-6 py-2 rounded-sm w-full hover:bg-green-600"
      >
        Edit todo
      </button>
    </form>
  </div>
</template>

<style scoped></style>
