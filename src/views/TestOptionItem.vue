<template>
  <div>testOptionItem</div>
  <div>{{ name }}</div>
  <div>{{ age }}</div>
  <div>{{ birthday }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TestOptionItem',
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
  }
})
</script>
