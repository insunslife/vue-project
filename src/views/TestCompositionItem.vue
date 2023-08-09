<template>
  <div>testCompositionItem</div>
  <div>
    <div>name: {{ name }}</div>
    <div>age: {{ age }}</div>
    <div>birthday: {{ birthday }}</div>
    <div>yearComputed: {{ yearComputed }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'TestCompositionItem',
  props: {
    name: {
      type: String,
      required: true,
      default: 'Ted'
    },
    age: {
      type: Number,
      default: 18
    },
    birthday: {
      type: String,
      default: '2021-01-01'
    }
  },
  setup(props) {
    const year = new Date(props.birthday).getFullYear()
    const yearComputed = computed(() => year + 1)
    return {
      yearComputed
    }
  }
})
</script>
