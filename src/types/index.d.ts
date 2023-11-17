export type Todo = {
  id?: number
  title: string
  description: string
  deadline: string
  status: string
  category: string
}

export type NewTodo = Omit<Todo, 'id'>

export type UpdateTodo = Todo

export type SearchTodos = {
  keyword?: string
  startDate?: string
  endDate?: string
  category?: string
  status?: string
}
