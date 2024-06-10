<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
  open: boolean
  close: () => void
}>()
const { id, open } = toRefs(props)

const router = useRouter()

const token = localStorage.getItem('token')
if (!token) {
  router.push({ path: '/login' })
}

const handleDelete = async () => {
  const response = await fetch(`http://localhost:8080/user/todos/${id.value}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    alert('Failed to delete todo')
    return
  }

  location.reload()
}
</script>

<template>
  <div
    v-if="open"
    class="absolute top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center"
  >
    <div class="bg-white w-1/4 p-5 rounded-md">
      <h1 class="text-2xl font-semibold">Are you sure you want to delete this todo ?</h1>
      <span class="text-sm italic">TodoID: {{ id }}</span>
      <p class="mt-3">This action cannot be undone</p>
      <div class="flex justify-end gap-3 mt-5">
        <button
          class="text-white bg-red-700 px-4 py-1 rounded-sm hover:bg-red-600"
          @click="handleDelete"
        >
          Delete
        </button>
        <button
          class="text-white bg-gray-700 px-4 py-1 rounded-sm hover:bg-gray-600"
          @click="close"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
