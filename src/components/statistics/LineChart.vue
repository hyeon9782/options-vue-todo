<template lang="">
  <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LineChart',
  props: {
    options: Object,
    series: Array
  }
})
</script>
