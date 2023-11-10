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
<script lang="ts">
import StatusTag from '@/components/search/StatusTag.vue'
export default {
  components: {
    StatusTag
  },
  props: {
    selectStatus: {
      type: Function
    },
    selectedStatus: {
      type: String
    }
  },
  data() {
    return {
      statusList: ['planned', 'ongoing', 'complete']
    }
  },
  methods: {
    selectColor(status: string) {
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
      }
    }
  }
}
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
