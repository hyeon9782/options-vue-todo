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
    this.fetchTodos()
  },
  methods: {
    fetchTodos() {
      this.$store.dispatch('getTodos', {})
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
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
