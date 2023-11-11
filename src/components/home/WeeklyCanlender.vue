<template lang="">
  <VDatePicker
    v-model="date"
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
import { ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

const date = ref(new Date())
const store = useStore()

const searchTodos = () => {
  const formattedDate = formatDate(date.value.toDateString(), 'YYYY-MM-DD')
  store.dispatch('getTodos', {
    keyword: '',
    startDate: '',
    endDate: formattedDate
  })
  console.log(formattedDate)
}

onMounted(searchTodos)

watchEffect(() => {
  searchTodos()
})
</script>
<style lang=""></style>
