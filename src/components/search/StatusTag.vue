<template lang="">
  <div class="status-tag" :style="selectColor(status)">
    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  status: {
    type: String,
    required: true
  }
})

function selectColor(status: string) {
  switch (status) {
    case 'planned':
      return {
        backgroundColor: 'rgb(253, 225, 113)'
      }
    case 'ongoing':
      return {
        backgroundColor: 'rgb(250, 169, 161)'
      }
    case 'complete':
      return {
        backgroundColor: 'rgb(141, 156, 248)'
      }
    default:
      return {
        backgroundColor: 'lightgray'
      }
  }
}
</script>
<style lang="css" scoped>
.status-tag {
  border-radius: 5px;
  width: 70px;
  padding: 5px 0;
  text-align: center;
  font-size: x-small;
  font-weight: bold;
}
</style>
