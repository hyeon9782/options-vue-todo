import type { Todo } from '@/types'
import { HttpHandler, http } from 'msw'

let todos: Todo[] = [
  {
    id: 0,
    title: 'Vue 3 공부',
    description: 'Vue 2와 Vue 3의 차이점을 생각하며 공부해보자.',
    deadline: '2023-11-01',
    status: '진행전'
  },
  {
    id: 1,
    title: 'Vuex 공부',
    description: '효율적인 상태관리를 위해 전역 상태 관리 라이브러리를 공부해보자',
    deadline: '2023-11-03',
    status: '진행중'
  },
  {
    id: 2,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: '완료'
  },
  {
    id: 3,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 1',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: '완료'
  },
  {
    id: 4,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 2',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: '완료'
  },
  {
    id: 5,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 3',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-10',
    status: '완료'
  },
  {
    id: 6,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 4',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-10',
    status: '완료'
  }
]

let idx = 7

const handlers: HttpHandler[] = [
  // 할일 목록
  http.get('/todos', ({ request }) => {
    const url = new URL(request.url)

    const keyword: string = url.searchParams.get('keyword') || ''
    const startDate: string = url.searchParams.get('startDate') || ''
    const endDate: string = url.searchParams.get('endDate') || ''

    let newTodos: Todo[] = [...todos]

    if (startDate && endDate && keyword) {
      newTodos = newTodos.filter((todo) => {
        const titleIncludesKeyword = String(todo.title).includes(keyword)
        const descriptionIncludesKeyword = String(todo.description).includes(keyword)

        return titleIncludesKeyword || descriptionIncludesKeyword
      })

      newTodos = newTodos.filter((todo) => {
        const todoDeadline = new Date(todo.deadline)
        const start = new Date(startDate)
        const end = new Date(endDate)

        return todoDeadline >= start && todoDeadline <= end
      })
    } else if (startDate && endDate && !keyword) {
      newTodos = newTodos.filter((todo) => {
        const todoDeadline = new Date(todo.deadline)
        const start = new Date(startDate)
        const end = new Date(endDate)

        return todoDeadline >= start && todoDeadline <= end
      })
    } else if (!startDate && !endDate && keyword) {
      newTodos = newTodos.filter((todo) => {
        const titleIncludesKeyword = String(todo.title).includes(keyword)
        const descriptionIncludesKeyword = String(todo.description).includes(keyword)

        return titleIncludesKeyword || descriptionIncludesKeyword
      })
    } else if (!startDate && endDate && !keyword) {
      newTodos = newTodos.filter((todo) => {
        return todo.deadline === endDate
      })
    } else {
      newTodos = []
    }

    return Response.json(newTodos)
  }),

  // 할일 조회
  http.get('/todos/:id', ({ params }: { params: any }) => {
    const { id } = params
    const todo = todos.find((todo) => todo.id === Number(id))
    return Response.json(todo)
  }),

  // 할일 추가
  http.post('/todos', async ({ request }: { request: Request }) => {
    const body = await request.json()
    todos.push({
      id: idx++,
      ...body
    })

    console.log(todos)

    return Response.json(body)
  }),

  // 할일 수정
  http.put('/todos/:id', async ({ request, params }: { request: Request; params: any }) => {
    const body = await request.json()
    const { id } = params

    const updatedTodo = {
      ...body,
      id: Number(id)
    }

    todos = todos.map((todo) => {
      return todo.id === Number(id) ? updatedTodo : todo
    })

    return Response.json(body)
  }),

  // 할일 삭제
  http.delete('/todos/:id', ({ params }) => {
    const { id } = params
    todos = todos.filter((todo) => todo.id !== Number(id))
    return Response.json(todos)
  })
]

export default handlers
