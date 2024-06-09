<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const description = ref('')
const dueDate = ref('')

const token = localStorage.getItem('token')
if (!token) {
  router.push({ path: '/login' })
}

const addTodo = async (e: Event) => {
  e.preventDefault()

  const response = await fetch('http://localhost:8080/user/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      dueDate: dueDate.value
    })
  })
  const data = await response.json()

  if (!response.ok) {
    alert(data.message)
    title.value = ''
    description.value = ''
    dueDate.value = ''
    return
  }

  Redirect()
}
const Redirect = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="flex h-full justify-center items-center w-full pb-20">
    <form @submit="addTodo" class="flex flex-col gap-5 md:w-2/5 w-full px-5 items-center">
      <h1 class="text-3xl mb-6">Add todo</h1>
      <div class="w-full items-center">
        <label class="text-lg">Title</label>
        <input v-model="title" type="text" class="border-2 border-gray-200 rounded-sm w-full p-1" />
      </div>
      <div class="w-full items-center">
        <label class="text-lg">Due date</label>
        <input
          v-model="dueDate"
          type="date"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <div class="w-full items-center">
        <label class="text-lg">Description</label>
        <textarea
          rows="3"
          v-model="description"
          class="border-2 border-gray-200 rounded-sm w-full p-1"
        />
      </div>
      <button
        class="bg-green-700 text-white text-lg px-6 py-2 rounded-sm w-full hover:bg-green-600"
      >
        Add todo
      </button>
    </form>
  </div>
</template>
