import { createTodoAPI, deleteTodoAPI, getTodosAPI, updateTodoAPI } from '@/api/todos'
import type { NewTodo, UpdateTodo, SearchTodos } from '@/types'
import Vuex from 'vuex'

export const store = new Vuex.Store({
  namespace: true,
  state: () => ({
    todos: [],
    selectedCategory: 'title'
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getTodos({ commit }, payload: SearchTodos) {
      try {
        const todos = await getTodosAPI(payload)
        commit('updateState', {
          todos
        })
      } catch (error) {
        console.error(error)
      }
    },
    async createTodo({ commit }, todo: NewTodo) {
      try {
        const createdTodo = await createTodoAPI(todo)
        console.log(createdTodo)
        // 생성하고 getTodos를 한 번 더 호출하는 것과 updateState로 클라이언트의 값만 바꾸는 것 둘 중 뭐가 맞니?
        commit('updateState', {
          todos: [...this.state.todos, createdTodo]
        })
      } catch (error) {
        console.error(error)
      }
    },
    async updateTodo({ commit }, todo: UpdateTodo) {
      try {
        const updatedTodo = await updateTodoAPI(todo)
        console.log(updatedTodo)
        commit('updateState', {
          todos: this.state.todos.map((todo) => {
            return todo.id === updatedTodo.id ? updatedTodo : todo
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    deleteTodo({ commit }, id: number) {
      try {
        const res = deleteTodoAPI(id)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
