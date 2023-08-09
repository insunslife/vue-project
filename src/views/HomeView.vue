<script setup lang="ts">
import Counter from '@/components/Counter.vue'
// import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
// const count = ref(0)
// const increment = () => count.value++
// const decrement = () => count.value--
// const oddOrEven = computed(() => (count.value % 2 === 0 ? 'even' : 'odd'))
const storeCounter = useCounterStore()
</script>

<template>
  <div class="home">
    <Counter />
    <div class="count">{{ storeCounter.count }}</div>

    <div class="buttons">
      <button @click="storeCounter.increment">+</button>
      <button @click="storeCounter.decrement">-</button>
    </div>
    <hr />
    <div>This counter is: {{ storeCounter.oddOrEven }}</div>
    <!-- <div>This counter doubleCount: {{ storeCounter.doubleCount }}</div> -->
    <hr />
    <div>This counter doubleCount: {{ storeCounter.doubleCount }}</div>
    <hr />
    <div>
      <h3>Edit counter:</h3>
      <input v-model="storeCounter.count" type="number" />
    </div>
  </div>
</template>

<style>
.count {
  font-size: 60px;
  margin: 20px;
  font-weight: bold;
}
.buttons button {
  font-size: 30px;
  margin: 10px;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
}
</style>
