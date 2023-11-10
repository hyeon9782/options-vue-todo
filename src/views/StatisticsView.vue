<template lang="">
  <SubHeader>Dashboard</SubHeader>
  <main class="statistics-container">
    <NoData v-if="noData" />
    <div v-else>
      <div class="line-chart-box">
        <div class="chart-head">
          <div class="chart-title">Task Count Over Time</div>
          <div class="select-period">
            <div
              v-for="(period, index) in periodList"
              :key="index"
              class="period"
              :class="{ active: selectedLinePeriod === period.value }"
              @click="changePeriod(period.value, 'line')"
            >
              {{ period.name }}
            </div>
          </div>
        </div>
        <LineChart :options="chartOptions" :series="chartSeries" />
      </div>
      <div class="donut-chart-box">
        <div class="chart-head">
          <div class="chart-title">Percent By Task Status</div>
          <div class="select-period">
            <div
              v-for="(period, index) in periodList"
              :key="index"
              class="period"
              :class="{ active: selectedDonutPeriod === period.value }"
              @click="changePeriod(period.value, 'donut')"
            >
              {{ period.name }}
            </div>
          </div>
        </div>
        <DonutChart :data="donutData" />
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SubHeader from '@/components/layouts/SubHeader.vue'
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
import NoData from '@/components/statistics/NoData.vue'
import type { Todo } from '@/types'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    LineChart,
    SubHeader,
    DonutChart,
    NoData
  },
  data() {
    return {
      referenceDate: Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(i, 'day').format('MM-DD')
      ),
      periodList: [
        { name: 'W', value: 'week' },
        { name: 'M', value: 'month' },
        { name: 'Y', value: 'year' }
      ],
      selectedLinePeriod: 'week',
      selectedDonutPeriod: 'week',
      startDate: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD')
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
          categories: this.referenceDate
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
        }
      }
    },
    chartSeries() {
      return [
        {
          name: 'Total Tasks',
          data: this.referenceDate.map((date) => {
            if (this.selectedLinePeriod === 'week') {
              return this.getTodosCountByDate(date, (this as any).$store.state.todos)
            } else if (this.selectedLinePeriod === 'month') {
              return this.getTodosCountByWeek(date, (this as any).$store.state.todos)
            }

            return this.getTodosCountByYear(date, (this as any).$store.state.todos)
          })
        },
        {
          name: 'Complete Tasks',
          data: this.referenceDate.map((date) => {
            return this.getTodosCountByStatus(date, (this as any).$store.state.todos)
          })
        }
      ]
    },
    donutData() {
      return [
        { name: 'Complete', value: this.getStatusCount('complete') },
        { name: 'On Going', value: this.getStatusCount('ongoing') },
        { name: 'Planned', value: this.getStatusCount('planned') }
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
    getTodosCountByWeek(date: string, todos: Todo[]): number {
      const sevenDaysAgo = new Date(date)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return todos.filter((todo) => {
        const todoDeadline = new Date(todo.deadline)
        return todoDeadline >= sevenDaysAgo && todoDeadline <= new Date(date)
      }).length
    },
    getTodosCountByYear(date: string, todos: Todo[]) {
      return todos.filter((todo) => todo.deadline.includes(date)).length
    },
    getTodosCountByStatus(date: string, todos: Todo[]) {
      return todos.filter(
        (todo) => todo.deadline.substring(5) === date && todo.status === 'complete'
      ).length
    },
    getStatusCount(status: string): number {
      return (this as any).$store.state.todos.filter((todo: Todo) => todo.status === status).length
    },
    fetchTodos() {
      ;(this as any).$store.dispatch('getTodos', {
        keyword: '',
        startDate: this.startDate,
        endDate: this.endDate,
        category: '',
        status: ''
      })
    },
    changePeriod(period: 'week' | 'month' | 'year', category: string) {
      console.log('클릭')

      if (category === 'line') {
        this.selectedLinePeriod = period
      } else {
        this.selectedDonutPeriod = period
      }

      this.startDate = dayjs().subtract(1, period).format('YYYY-MM-DD')
      this.endDate = dayjs().format('YYYY-MM-DD')

      if (period === 'week') {
        this.referenceDate = Array.from({ length: 7 }, (_, i) =>
          dayjs().subtract(i, 'day').format('MM-DD')
        )
        console.log(this.referenceDate)
      } else if (period === 'month') {
        this.referenceDate = Array.from({ length: 4 }, (_, i) =>
          dayjs().subtract(i, 'week').format('YYYY-MM-DD')
        )
        console.log(this.referenceDate)
      } else {
        this.referenceDate = Array.from({ length: 12 }, (_, i) =>
          dayjs().subtract(i, 'month').format('YYYY-MM')
        )
        console.log(this.referenceDate)
      }
    }
  },
  watch: {
    selectedLinePeriod: 'fetchTodos'
  }
})
</script>

<style lang="css">
.statistics-container {
  width: 100%;
}

.line-chart-box {
  background-color: rgb(247, 249, 255);
  margin: 10px 0;
}

.donut-chart-box {
  background-color: rgb(247, 249, 255);
  margin: 10px 0;
}

.chart-title {
  font-weight: bold;
  color: rgb(44, 62, 80);
  font-size: small;
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
</style>
