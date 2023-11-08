<template>
  <div class="todo-list">
    <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TodoItem from '@/components/list/TodoItem.vue'
export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  created() {
    // 할 일 목록 조회하기
    this.fetchTodos()
  },
  methods: {
    fetchTodos() {
      ;(this as any).$store.dispatch('getTodos', {})
    }
  },
  computed: {
    todos() {
      return (this as any).$store.state.todos
    }
  }
})
</script>
<style lang="css">
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
