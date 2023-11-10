import { HTTP_METHOD, COMMON_HEADERS } from '@/constants/api'
import type { NewTodo, SearchTodos, UpdateTodo } from '@/types'

// 할 일 목록 가져오기
async function getTodosAPI({ keyword, startDate, endDate }: SearchTodos) {
  return await fetch(`/todos?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}`, {
    method: HTTP_METHOD.GET,
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

// 할 일 가져오기
async function getTodoAPI(id: number) {
  return await fetch(`/todos/${id}`, {
    method: HTTP_METHOD.GET,
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

// 할 일 생성하기
async function createTodoAPI(todo: NewTodo) {
  return await fetch('/todos', {
    method: HTTP_METHOD.POST,
    body: JSON.stringify(todo),
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

// 할 일 수정하기
async function updateTodoAPI(todo: UpdateTodo) {
  return await fetch(`/todos/${todo.id}`, {
    method: HTTP_METHOD.PUT,
    body: JSON.stringify(todo),
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

// 할 일 삭제하기
async function deleteTodoAPI(id: number) {
  return await fetch(`/todos/${id}`, {
    method: HTTP_METHOD.DELETE,
    headers: {
      ...COMMON_HEADERS
    }
  }).then((res) => res.json())
}

export { getTodosAPI, getTodoAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI }
