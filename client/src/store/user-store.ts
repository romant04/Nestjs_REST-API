import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const email = ref('')

  function setUser(newEmail: string, newToken: string) {
    token.value = newToken
    email.value = newEmail
  }
  function clearUser() {
    token.value = ''
    email.value = ''
  }

  return {
    token,
    email,
    setUser,
    clearUser
  }
})
