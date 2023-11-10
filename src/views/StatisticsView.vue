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
      recentWeekDates: Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(i, 'day').format('MM-DD')
      ),
      periodList: [
        { name: 'W', value: 'week' },
        { name: 'M', value: 'month' },
        { name: 'Y', value: 'year' }
      ],
      selectedLinePeriod: 'week',
      selectedDonutPeriod: 'week'
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
      const week = Array.from({ length: 7 }, (_, i) =>
        dayjs().subtract(i, 'day').format('YYYY-MM-DD')
      )

      ;(this as any).$store.dispatch('getTodos', {
        keyword: '',
        startDate: week[6],
        endDate: week[0]
      })
    },
    changePeriod(period: string, category: string) {
      console.log('클릭')

      if (category === 'line') {
        this.selectedLinePeriod = period
      } else {
        this.selectedDonutPeriod = period
      }
    }
  }
})
</script>

<style lang="css">
.statistics-container {
  width: 100%;
}

.line-chart-box {
  background-color: rgb(247, 249, 255);
}

.donut-chart-box {
  background-color: rgb(247, 249, 255);
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
