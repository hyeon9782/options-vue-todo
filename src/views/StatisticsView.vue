<template lang="">
  <main>
    <LineChart :options="options" :series="series" />
    <DonutChart :data="donutData" />
  </main>
</template>
<script lang="ts">
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import type { Todo } from '@/types'

export default {
  components: {
    LineChart,
    DonutChart
  },
  computed: {
    recentWeekDates() {
      const today = new Date()
      const recentWeekDates = []
      // 오늘 날짜 포함하도록
      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        recentWeekDates.push(date.toISOString().split('T')[0])
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
        const todosCount = (this as any).$store.state.todos.filter(
          (todo: Todo) => todo.deadline === date
        ).length
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
