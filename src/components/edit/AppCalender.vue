<template lang="">
  <VDatePicker
    v-model="value"
    borderless
    expanded
    transparent
    view="weekly"
    color="indigo"
    locale="en-US"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/utils/utils'

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
