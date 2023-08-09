<template>
  <div>Composition</div>
  <div>
    <input v-model="name" />
    <input v-model="age" type="number" />
    <input v-model="birthday" />
  </div>
  <div>
    <button @click="add">add</button>
  </div>
  <TestCompositionItem :name="name" :age="age" :birthday="birthday" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TestCompositionItem from './TestCompositionItem.vue'
export default defineComponent({
  name: 'TestComposition',
  components: { TestCompositionItem },
  setup() {
    const name = ref('Ted')
    const age = ref(18)
    const birthday = ref('2021-01-01')
    const add = () => {
      age.value++
    }
    return {
      name,
      age,
      birthday,
      add
    }
  }
})
</script>
