import { useTodosStore } from '@/stores/todos'
import { computed } from 'vue'

export function useTodos() {
  const todosStore = useTodosStore()

  const todos = computed(() => todosStore.todos)

  const getTodos = todosStore.getTodos

  const createTodo = todosStore.createTodo

  const updateTodo = todosStore.updateTodo

  const deleteTodo = todosStore.deleteTodo

  const clearTodos = todosStore.clearTodos

  const noData = todosStore.noData

  return { todos, getTodos, createTodo, updateTodo, deleteTodo, clearTodos, noData }
}
