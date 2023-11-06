import { HTTP_METHOD, COMMON_HEADERS } from '@/constants/api'
import type { NewTodo, UpdateTodo } from '@/types'

async function getTodosAPI() {
  return await fetch('/todos', {
    method: HTTP_METHOD.GET,
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

async function createTodoAPI(todo: NewTodo) {
  return await fetch('/todos', {
    method: HTTP_METHOD.POST,
    body: JSON.stringify(todo),
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

async function updateTodoAPI(todo: UpdateTodo) {
  return await fetch('/todos', {
    method: HTTP_METHOD.PUT,
    body: JSON.stringify(todo),
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

async function deleteTodoAPI(id: number) {
  return await fetch(`/todos/${id}`, {
    method: HTTP_METHOD.DELETE,
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

export { getTodosAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI }
