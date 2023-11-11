<template lang="">
  <VDatePicker
    v-model="value"
    mode="date"
    view="weekly"
    transparent
    expanded
    borderless
    locale="en-US"
    color="indigo"
  />
</template>
<script setup lang="ts">
import { formatDate } from '@/utils/utils'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', formatDate(value, 'YYYY-MM-DD'))
  }
})
</script>
