<template lang="">
  <main class="statistics-container">
    <NoData v-if="noData" />
    <div v-else>
      <LineChart :options="chartOptions" :series="chartSeries" />
      <DonutChart :data="donutData" />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import NoData from '@/components/statistics/NoData.vue'
import type { Todo } from '@/types'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    LineChart,
    DonutChart,
    NoData
  },
  data() {
    return {
      recentWeekDates: Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(i, 'day').format('MM-DD')
      )
    }
  },
  created() {
    // todos 데이터 조회 (새로 고침시 데이터를 가져오기 위해)
    this.fetchTodos()
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
    },
    noData() {
      return (this as any).$store.state.todos.length === 0
    }
  },
  methods: {
    getTodosCountByDate(date: string, todos: Todo[]): number {
      return todos.filter((todo) => todo.deadline.substring(5) === date).length
    },
    getStatusCount(status: string): number {
      return (this as any).$store.state.todos.filter((todo: Todo) => todo.status === status).length
    },
    fetchTodos() {
      ;(this as any).$store.dispatch('getTodos', {})
    }
  }
})
</script>

<style lang="css">
.statistics-container {
  width: 100%;
}
</style>
