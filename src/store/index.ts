import { getTodosAPI } from '@/api/todos'
import Vuex from 'vuex'

export const store = new Vuex.Store({
  namespace: true,
  state: () => ({
    todos: [],
    currentTab: 'list'
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async getTodos({ commit }) {
      try {
        const res = await getTodosAPI()
        commit('updateState', {
          todos: res
        })
      } catch (error) {
        console.error(error)
      }
    },
    createTodo() {},
    updateTodo() {},
    deleteTodo() {}
  }
})
