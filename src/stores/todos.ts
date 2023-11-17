import { createTodoAPI, deleteTodoAPI, getTodosAPI, updateTodoAPI } from '@/api/todos'
import { defineStore } from 'pinia'

import type { NewTodo, UpdateTodo, SearchTodos, Todo } from '@/types'

interface State {
  todos: Todo[]
}

export const useTodosStore = defineStore('todos', {
  state: (): State => ({
    todos: []
  }),
  getters: {
    noData: (state) => (state.todos.length === 0 ? true : false)
  },
  actions: {
    // 할 일 목록 가져오기
    async getTodos(payload: SearchTodos) {
      try {
        console.log('store')

        console.log(payload)

        const todos = await getTodosAPI(payload)
        this.todos = todos
      } catch (error) {
        console.error(error)
      }
    },
    // 할 일 생성하기
    async createTodo(todo: NewTodo) {
      try {
        const createdTodo = await createTodoAPI(todo)
        this.todos = [...this.todos, createdTodo]
      } catch (error) {
        console.error(error)
      }
    },
    // 할 일 수정하기
    async updateTodo(todo: UpdateTodo) {
      try {
        const updatedTodo = await updateTodoAPI(todo)
        this.todos = this.todos.map((todo) => {
          return todo.id === updatedTodo.id ? updatedTodo : todo
        })
      } catch (error) {
        console.error(error)
      }
    },
    // 할 일 삭제하기
    deleteTodo(id: number) {
      try {
        deleteTodoAPI(id)
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id
        })
      } catch (error) {
        console.error(error)
      }
    },
    clearTodos() {
      this.$reset()
    }
  }
})
