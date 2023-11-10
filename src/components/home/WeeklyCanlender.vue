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
<script lang="ts">
import { formatDate } from '@/utils/utils'
export default {
  data() {
    return {
      date: new Date()
    }
  },
  mounted() {
    this.searchTodos()
  },
  methods: {
    // 날짜를 선택했을 때 선택한 날짜가 포함된 모든 할 일을 가져온다
    searchTodos() {
      const formattedDate = formatDate(this.date.toDateString(), 'YYYY-MM-DD')
      ;(this as any).$store.dispatch('getTodos', {
        keyword: '',
        startDate: '',
        endDate: formattedDate
      })
      console.log(formattedDate)
    }
  },
  watch: {
    date: 'searchTodos'
  }
}
</script>
<style lang=""></style>
