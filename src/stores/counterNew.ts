import { defineStore } from 'pinia'

export const useCounterNewStore = defineStore({
  id: 'counterNew',
  state: () => ({
    count: 10
    // name: 'Ted',
    // userName: 'Heo',
    // age: 48
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  },
  getters: {
    oddOrEven: (state) => (state.count % 2 === 0 ? 'even' : 'odd'),
    doubleCount: (state) => state.count * 2
  }
})
