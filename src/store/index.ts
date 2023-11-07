import { createTodoAPI, deleteTodoAPI, getTodosAPI, updateTodoAPI } from '@/api/todos'
import type { NewTodo, UpdateTodo, SearchTodos, Todo } from '@/types'
import Vuex from 'vuex'
import type { Commit } from 'vuex/types/index.js'

type State = {
  todos: Todo[]
  selectedCategory: string
  [key: string]: any
}

type Payload = {
  [key: string]: any
}

export const store = new Vuex.Store({
  namespace: true,
  state: (): State => ({
    todos: [],
    selectedCategory: 'title'
  }),
  mutations: {
    updateState(state: State, payload: Payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getTodos({ commit }: { commit: Commit }, payload: SearchTodos) {
      try {
        const todos = await getTodosAPI(payload)
        commit('updateState', {
          todos
        })
      } catch (error) {
        console.error(error)
      }
    },
    async createTodo({ commit, state }: { commit: Commit; state: State }, todo: NewTodo) {
      try {
        const createdTodo = await createTodoAPI(todo)
        console.log(createdTodo)
        // 생성하고 getTodos를 한 번 더 호출하는 것과 updateState로 클라이언트의 값만 바꾸는 것 둘 중 뭐가 맞니?
        commit('updateState', {
          todos: [...state.todos, createdTodo]
        })
      } catch (error) {
        console.error(error)
      }
    },
    async updateTodo({ commit, state }: { commit: Commit; state: State }, todo: UpdateTodo) {
      try {
        const updatedTodo = await updateTodoAPI(todo)
        console.log(updatedTodo)
        commit('updateState', {
          todos: state.todos.map((todo) => {
            return todo.id === updatedTodo.id ? updatedTodo : todo
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    deleteTodo({ commit }: { commit: Commit }, id: number) {
      try {
        const res = deleteTodoAPI(id)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
