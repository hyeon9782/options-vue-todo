<template lang="">
  <main>
    <LineChart :options="options" :series="series" />
    <DonutChart
      :data="[
        { name: '진행전', value: 10 },
        { name: '진행중', value: 20 },
        { name: '완료', value: 30 }
      ]"
    />
  </main>
</template>
<script lang="ts">
import LineChart from '@/components/statistics/LineChart.vue'
import DonutChart from '@/components/statistics/DonutChart.vue'
export default {
  components: {
    LineChart,
    DonutChart
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    }
  }
}
</script>
