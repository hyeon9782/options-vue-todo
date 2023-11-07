export type Todo = {
  id: number
  title: string
  description: string
  deadline: string
  status: string
  [key: string]: string | number
}

export type NewTodo = Omit<Todo, 'id'>

export type UpdateTodo = Todo

export type SearchTodos = {
  keyword: string
  category: string
}
