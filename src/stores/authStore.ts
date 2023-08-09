import type { B2BSignInResponse } from '@/types/auth/signIn'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const signIn = ref<B2BSignInResponse>()
  const getSignIn = computed(() => signIn.value)

  return {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage }]
    },
    signIn,
    getSignIn
  }
})

export default useUserStore
