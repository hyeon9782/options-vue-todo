<template lang="">
  <div class="status-list">
    <div class="status-tag done">Done</div>
    <div class="status-tag delayed">Delayed</div>
    <div class="status-tag planned">Planned</div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      statusList: ['Done', 'Delayed', 'Planned']
    }
  }
}
</script>
<style lang="css" scoped>
.status-list {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

.status-tag {
  border-radius: 5px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  font-size: x-small;
}

.done {
  background-color: rgb(141, 156, 248);
}

.delayed {
  background-color: rgb(250, 169, 161);
}

.planned {
  background-color: rgb(253, 225, 113);
}
</style>
