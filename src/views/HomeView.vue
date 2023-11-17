<template>
  <main class="home-container">
    <WeeklyCanlender v-model="date" />
    <div class="list-box">
      <TodoList />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { formatDate } from '@/utils/utils'
import TodoList from '@/components/home/TodoList.vue'
import WeeklyCanlender from '@/components/home/WeeklyCanlender.vue'
import { useTodosStore } from '@/stores/todos'

const todosStore = useTodosStore()
const date = ref(new Date().toDateString())
const searchTodos = () => {
  const formattedDate = formatDate(date.value, 'YYYY-MM-DD')

  todosStore.getTodos({
    keyword: '',
    startDate: '',
    endDate: formattedDate,
    category: '',
    status: ''
  })
}

// 데이터 패칭
watch(date, searchTodos)
onMounted(searchTodos)

onUnmounted(todosStore.clearTodos)
</script>

<style lang="css" scoped>
.home-container {
  height: calc(100vh - 109px);
}

.list-box {
  height: 80%;
  overflow: auto;
}
</style>
