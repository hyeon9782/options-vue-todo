<template>
  <div class="todo-list" v-if="todos.length > 0">
    <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
  </div>
  <NoData v-else-if="todosStore.noData && $route.path !== '/search'" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import TodoItem from '@/components/home/TodoItem.vue'
import NoData from '@/components/statistics/NoData.vue'
import { useTodosStore } from '@/stores/todos'

const todosStore = useTodosStore()

const todos = computed(() => todosStore.todos)
</script>
<style lang="css" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
