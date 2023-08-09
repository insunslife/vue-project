<script setup lang="ts">
import { ref } from 'vue'
import TestSetupItem from './TestSetupItem.vue';
const name = ref('Ted')
const age = ref(18)
const birthday = ref('2021-01-01')
const add = () => {
  age.value++
}
</script>

<template>
  <div>Setup</div>
  <div>
    <input v-model="name" />
    <input v-model="age" type="number" />
    <input v-model="birthday" />
  </div>
  <div>
    <button @click="add">add</button>
  </div>
  <hr />
  <TestSetupItem :name="name" :age="age" :birthday="birthday" />
</template>
