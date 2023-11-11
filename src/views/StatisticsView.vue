<template lang="">
  <SubHeader>Dashboard</SubHeader>
  <main class="statistics-container">
    <NoData v-if="noData" />
    <div v-else class="chart-container">
      <div class="period-box">
        <div class="select-period">
          <div
            v-for="(period, index) in periodList"
            :key="index"
            class="period"
            :class="{ active: selectedPeriod === period.value }"
            @click="changePeriod(period.value, 'line')"
          >
            {{ period.name }}
          </div>
        </div>
      </div>
      <div class="line-chart-box">
        <div class="chart-head">
          <div class="chart-title">Task Count Over Time</div>
        </div>
        <LineChart :options="lineChartOptions" :series="lineChartSeries" />
      </div>
      <div class="donut-chart-box">
        <div class="chart-head">
          <div class="chart-title">Percent By Task Status</div>
        </div>
        <DonutChart :data="donutData" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import dayjs from 'dayjs'

import SubHeader from '@/components/layouts/SubHeader.vue'
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import NoData from '@/components/statistics/NoData.vue'
import type { Todo } from '@/types'

const store = useStore()
const todos = computed(() => store.state.todos)

const periodList = ref([
  { name: 'W', value: 'week' },
  { name: 'M', value: 'month' },
  { name: 'Y', value: 'year' }
])

const selectedPeriod = ref('week')
const referenceDate = ref(
  Array.from({ length: 7 }, (_, i) => dayjs().subtract(i, 'day').format('MM-DD'))
)
const startDate = ref(dayjs().subtract(1, 'week').format('YYYY-MM-DD'))
const endDate = ref(dayjs().format('YYYY-MM-DD'))

const fetchTodos = () => {
  store.dispatch('getTodos', {
    keyword: '',
    startDate: startDate.value,
    endDate: endDate.value,
    category: '',
    status: ''
  })
}

// 데이터 패칭
onMounted(fetchTodos)
watchEffect(() => {
  fetchTodos()
})

const changePeriod = (period: 'week' | 'month' | 'year') => {
  selectedPeriod.value = period

  startDate.value = dayjs().subtract(1, period).format('YYYY-MM-DD')
  endDate.value = dayjs().format('YYYY-MM-DD')

  if (period === 'week') {
    referenceDate.value = Array.from({ length: 7 }, (_, i) =>
      dayjs().subtract(i, 'day').format('MM-DD')
    )
  } else if (period === 'month') {
    referenceDate.value = Array.from({ length: 4 }, (_, i) =>
      dayjs().subtract(i, 'week').format('YYYY-MM-DD')
    )
  } else {
    referenceDate.value = Array.from({ length: 12 }, (_, i) =>
      dayjs().subtract(i, 'month').format('YYYY-MM')
    )
  }
}

const getStatusCount = (status: string, todos: Todo[]) => {
  return todos.filter((todo: Todo) => todo.status === status)
}

const getTodosCountByDate = (date: string) => {
  return todos.value.filter((todo: Todo) => todo.deadline.substring(5) === date)
}

const getTodosCountByWeek = (date: string) => {
  const sevenDaysAgo = new Date(date)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return todos.value.filter((todo: Todo) => {
    const todoDeadline = new Date(todo.deadline)
    return todoDeadline >= sevenDaysAgo && todoDeadline <= new Date(date)
  })
}

const getTodosCountByYear = (date: string) => {
  return todos.value.filter((todo: Todo) => todo.deadline.includes(date))
}

// const getTodosCountByStatus = (status: string) => {
//   return todos.value.filter((todo: Todo) => todo.status === status)
// }

const donutData = computed(() => [
  { name: 'Complete', value: getStatusCount('complete', todos.value).length },
  { name: 'On Going', value: getStatusCount('ongoing', todos.value).length },
  { name: 'Planned', value: getStatusCount('planned', todos.value).length }
])

const noData = computed(() => todos.value.length === 0)

const lineChartOptions = computed(() => ({
  chart: {
    id: 'line-chart'
  },
  xaxis: {
    categories: referenceDate.value
  },
  stroke: {
    show: true,
    width: 2,
    curve: 'smooth'
  },
  tooltip: {
    y: {
      formatter: function (count: number) {
        return Number(count) + ' 개'
      }
    }
  },
  colors: ['#2E93fA', 'rgb(71, 91, 216)']
}))

const lineChartSeries = computed(() => [
  {
    name: 'Total Tasks',
    data: referenceDate.value.map((date) => {
      if (selectedPeriod.value === 'week') {
        return getTodosCountByDate(date).length
      } else if (selectedPeriod.value === 'month') {
        return getTodosCountByWeek(date).length
      }
      return getTodosCountByYear(date).length
    })
  },
  {
    name: 'Complete Tasks',
    data: referenceDate.value.map((date) => {
      let newTodos = []
      if (selectedPeriod.value === 'week') {
        newTodos = getTodosCountByDate(date)
      } else if (selectedPeriod.value === 'month') {
        newTodos = getTodosCountByWeek(date)
      } else {
        newTodos = getTodosCountByYear(date)
      }

      return getStatusCount('complete', newTodos).length
    })
  }
])
</script>

<style lang="css" scoped>
.statistics-container {
  width: 100%;
  height: 100%;
}

.chart-container {
  min-height: 100%;
  overflow: auto;
}

.line-chart-box {
  background-color: rgb(247, 249, 255);
  margin-bottom: 30px;
}

.donut-chart-box {
  background-color: rgb(247, 249, 255);
  margin-bottom: 50px;
}

.chart-title {
  font-weight: bold;
  color: rgb(44, 62, 80);
  font-size: large;
}

.chart-head {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.select-period {
  display: flex;
  background-color: lightgray;
  border-radius: 9px;
}

.period {
  font-weight: bold;
  background-color: lightgray;
  color: black;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-small;
  width: 41px;
  height: 30px;
}

.active {
  background-color: rgb(71, 91, 216);
  color: rgb(255, 255, 255);
}

.period-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}
</style>
