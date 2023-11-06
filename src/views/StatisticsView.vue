<template lang="">
  <main>
    <LineChart />
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
  }
}
</script>
