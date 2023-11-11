<template lang="">
  <div class="status-list">
    <StatusTag
      v-if="$route.path === '/search'"
      status="all"
      :class="{ select: 'all' === selectedStatus }"
      @click.prevent="selectStatus('all')"
    />
    <StatusTag
      v-for="(status, index) in statusList"
      :key="index"
      :status="status"
      :class="{ select: status === selectedStatus }"
      @click.prevent="selectStatus(status)"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import StatusTag from '@/components/search/StatusTag.vue'

defineProps({
  selectStatus: {
    type: Function,
    required: true
  },
  selectedStatus: {
    type: String,
    required: true
  }
})

const statusList = ref<string[]>(['planned', 'ongoing', 'complete'])
</script>
<style lang="css" scoped>
.status-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}

.status-tag {
  border-radius: 5px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  font-size: x-small;
}

.select {
  border: 2px solid rgb(71, 91, 216);
}
</style>
