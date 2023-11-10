<template lang="">
  <VDatePicker v-model="value" borderless expanded transparent view="weekly" color="indigo" />
</template>
<script lang="ts">
import { formatDate } from '@/utils/utils'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        console.log(formatDate(value, 'YYYY-MM-DD'))

        this.$emit('update:modelValue', formatDate(value, 'YYYY-MM-DD'))
      }
    }
  }
}
</script>
<style lang="css"></style>
