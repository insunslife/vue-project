<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const storeCounter = useCounterStore()
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="counter-button" @click="storeCounter.increment">{{ storeCounter.count }}</button>
  </div>
</template>

<style>
.counter-button {
  font-size: 30px;
  margin: 10px;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
}
</style>
