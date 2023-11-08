<template lang="">
  <main class="statistics-container">
    <LineChart :options="options" :series="series" />
    <DonutChart :data="donutData" />
  </main>
</template>
<script lang="ts">
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import type { Todo } from '@/types'
import dayjs from 'dayjs'

export default {
  components: {
    LineChart,
    DonutChart
  },
  computed: {
    recentWeekDates() {
      const today = dayjs()
      const recentWeekDates = []

      for (let i = 0; i < 7; i++) {
        const date = today.subtract(i, 'day')

        recentWeekDates.push(date.format('MM-DD'))
      }

      console.log(recentWeekDates)

      return recentWeekDates
    },
    options() {
      return {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.recentWeekDates
        }
      }
    },
    series() {
      const countList: number[] = []
      this.recentWeekDates.forEach((date) => {
        const todosCount = (this as any).$store.state.todos.filter((todo: Todo) => {
          return todo.deadline.substring(5) === date
        }).length
        countList.push(todosCount)
      })
      return [
        {
          name: 'series-1',
          data: countList
        }
      ]
    },
    donutData() {
      const pendingCount = (this as any).$store.state.todos.filter(
        (todo: Todo) => todo.status === '진행전'
      ).length
      const progressCount = (this as any).$store.state.todos.filter(
        (todo: Todo) => todo.status === '진행중'
      ).length
      const completeCount = (this as any).$store.state.todos.filter(
        (todo: Todo) => todo.status === '완료'
      ).length

      return [
        {
          name: '진행전',
          value: pendingCount
        },
        {
          name: '진행중',
          value: progressCount
        },
        {
          name: '완료',
          value: completeCount
        }
      ]
    }
  }
}
</script>

<style lang="css">
.statistics-container {
  width: 100%;
}
</style>
