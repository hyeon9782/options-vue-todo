<template>
  <div
    class="status-mark"
    :class="{
      pending: status === '진행전',
      progress: status === '진행중',
      completed: status === '완료'
    }"
  ></div>
</template>

<script lang="ts">
export default {
  name: 'StatusMark',
  props: {
    status: {
      type: String
    }
  }
}
</script>
<style lang="css">
.status-mark {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.pending {
  background-color: red;
}

.progress {
  background-color: blue;
}

.completed {
  background-color: greenyellow;
}
</style>
