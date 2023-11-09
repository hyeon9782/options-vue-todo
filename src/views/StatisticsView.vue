<template lang="">
  <main class="statistics-container">
    <LineChart :options="chartOptions" :series="chartSeries" />
    <DonutChart :data="donutData" />
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import type { Todo } from '@/types'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    LineChart,
    DonutChart
  },
  data() {
    return {
      recentWeekDates: Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(i, 'day').format('MM-DD')
      )
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.recentWeekDates
        },
        stroke: {
          show: true,
          curve: 'smooth'
        }
      }
    },
    chartSeries() {
      return [
        {
          name: '할 일 수',
          data: this.recentWeekDates.map((date) =>
            this.getTodosCountByDate(date, (this as any).$store.state.todos)
          )
        }
      ]
    },
    donutData() {
      return [
        { name: '진행전', value: this.getStatusCount('진행전') },
        { name: '진행중', value: this.getStatusCount('진행중') },
        { name: '완료', value: this.getStatusCount('완료') }
      ]
    }
  },
  methods: {
    getTodosCountByDate(date: string, todos: Todo[]): number {
      return todos.filter((todo) => todo.deadline.substring(5) === date).length
    },
    getStatusCount(status: string): number {
      return (this as any).$store.state.todos.filter((todo: Todo) => todo.status === status).length
    }
  }
})
</script>

<style lang="css">
.statistics-container {
  width: 100%;
}
</style>
