<template lang="">
  <apexchart width="100%" type="bubble" :options="options" :series="series"></apexchart>
</template>
<script lang="ts">
export default {
  name: 'BubbleChart',
  props: {
    options: Object,
    series: Array
  }
}
</script>
<style lang=""></style>
