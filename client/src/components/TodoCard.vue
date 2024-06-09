<script setup lang="ts">
import type { Todo } from '@/types/todo'

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <div class="flex justify-between items-center border-b-2 border-gray-200 py-2 w-full">
    <div class="flex flex-col">
      <h3 class="text-xl font-semibold">{{ todo.title }}</h3>
      <p>{{ todo.description }}</p>
      <p class="mt-2 text-sm italic">
        {{ new Date(todo.dueDate.toString()).toLocaleDateString() }}
      </p>
    </div>
    <div class="flex gap-2">
      <button class="text-white bg-green-700 px-4 py-1 rounded-sm hover:bg-green-600">Edit</button>
      <button class="text-white bg-red-700 px-4 py-1 rounded-sm hover:bg-red-600">Delete</button>
    </div>
  </div>
</template>

<style scoped></style>
