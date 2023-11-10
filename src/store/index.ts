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

// 규모가 작은 애플리케이션이기 때문에 굳이 모듈화는 하지 않았습니다.
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
    // 할 일 목록 가져오기
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
    // 할 일 생성하기
    async createTodo({ commit, state }: { commit: Commit; state: State }, todo: NewTodo) {
      try {
        const createdTodo = await createTodoAPI(todo)
        console.log(createdTodo)
        commit('updateState', {
          todos: [...state.todos, createdTodo]
        })
      } catch (error) {
        console.error(error)
      }
    },
    // 할 일 수정하기
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
    // 할 일 삭제하기
    deleteTodo({ commit, state }: { commit: Commit; state: State }, id: number) {
      try {
        deleteTodoAPI(id)
        commit('updateState', {
          todos: state.todos.filter((todo) => {
            return todo.id !== id
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
