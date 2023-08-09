import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const oddOrEven = computed(() => (count.value % 2 === 0 ? 'even' : 'odd'))
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  } 

  return { count, oddOrEven, doubleCount, increment, decrement }
})
