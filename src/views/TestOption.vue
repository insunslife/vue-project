<template>
  <h3>Option</h3>
  <div>
    <input v-model="name" />
    <input v-model="age" type="number" />
    <input v-model="birthday" />
    <hr />
    <div>yearComputed: {{ yearComputed }}</div>
  </div>
  <div>
    <button @click="add">add</button>
  </div>
  <TestOptionItem :name="name" :age="age" :birthday="birthday" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TestOptionItem from './TestOptionItem.vue'

export default defineComponent({
  name: 'TestOption',
  components: { TestOptionItem },
  data() {
    return {
      name: 'Ted',
      age: 18,
      year: 2021,
      birthday: '2021-01-01'
    }
  },
  methods: {
    add() {
      this.age++
    }
  },
  computed: {
    yearComputed() {
      return this.year + 1
    }
  }
})
</script>
