<template>
  <main class="home-container">
    <PlusButton />
    <VCalendar view="weekly" expanded borderless />
    <TodoList />
  </main>
</template>

<script lang="ts">
import PlusButton from '@/components/list/PlusButton.vue'
import TodoList from '@/components/list/TodoList.vue'

export default {
  components: { PlusButton, TodoList }
}
</script>

<style lang="css">
.home-container {
}
</style>
