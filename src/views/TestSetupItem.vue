<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ name: string; age: number; birthday: string }>()
const age2 = computed(() => props.age + 1)
</script>

<template>
  <div>testSetupItem</div>
  <div>name: {{ name }} / age: {{ age }} / age2: {{ age2 }} / birthday: {{ birthday }}</div>
</template>
