<template lang="">
  <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
</template>

<script setup lang="ts">
defineProps({
  options: {
    type: Object,
    required: true
  },
  series: {
    type: Array,
    required: true
  }
})
</script>
