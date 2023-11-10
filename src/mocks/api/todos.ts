import type { Todo } from '@/types'
import { HttpHandler, http } from 'msw'

let todos: Todo[] = [
  {
    id: 0,
    title: 'Vue 3 공부',
    description: 'Vue 2와 Vue 3의 차이점을 생각하며 공부해보자.',
    deadline: '2023-11-01',
    status: 'planned',
    category: 'Urgent'
  },
  {
    id: 1,
    title: 'Vuex 공부',
    description: '효율적인 상태관리를 위해 전역 상태 관리 라이브러리를 공부해보자',
    deadline: '2023-11-03',
    status: 'planned',
    category: 'Urgent'
  },
  {
    id: 2,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: 'complete',
    category: 'Office'
  },
  {
    id: 3,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 1',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: 'complete',
    category: 'Home'
  },
  {
    id: 4,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 2',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-08',
    status: 'planned',
    category: 'School'
  },
  {
    id: 5,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 3',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-10',
    status: 'ongoing',
    category: 'Work Out'
  },
  {
    id: 6,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자 4',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-11-10',
    status: 'complete',
    category: 'ETC'
  }
]

let idx = 7

const handlers: HttpHandler[] = [
  // 할일 목록
  http.get('/todos', ({ request }) => {
    const url = new URL(request.url)
    const keyword = url.searchParams.get('keyword') || ''
    const startDate = url.searchParams.get('startDate') || ''
    const endDate = url.searchParams.get('endDate') || ''
    const category = url.searchParams.get('category') || ''
    const status = url.searchParams.get('status') || ''

    let newTodos = [...todos]

    const filterByKeyword = (todo: Todo) => {
      const titleIncludesKeyword = String(todo.title).toLowerCase().includes(keyword.toLowerCase())
      const descriptionIncludesKeyword = String(todo.description)
        .toLowerCase()
        .includes(keyword.toLowerCase())
      return titleIncludesKeyword || descriptionIncludesKeyword
    }

    const filterByDateRange = (todo: Todo) => {
      const todoDeadline = new Date(todo.deadline)
      const start = new Date(startDate)
      const end = new Date(endDate)
      return todoDeadline >= start && todoDeadline <= end
    }
    console.log('들어옴')

    if (category && status && keyword && startDate && endDate) {
      console.log('모두 선택')
      // 기간 , 카테고리, 상태 설정 후 검색
      newTodos = newTodos.filter((todo) => {
        const matchCategory = todo.category === category
        const matchStatus = todo.category === status
        return filterByKeyword(todo) || matchCategory || matchStatus
      })

      newTodos = newTodos.filter(filterByDateRange)
    } else if (!category && status && keyword && startDate && endDate) {
      console.log('상태 선택')

      // 기간, 상태, 설정 후 검색
      newTodos = newTodos.filter(filterByKeyword)

      newTodos = newTodos.filter(filterByDateRange)

      newTodos = newTodos.filter((todo) => {
        return todo.status === status
      })
    } else if (category && !status && keyword && startDate && endDate) {
      console.log('카테고리 선택')

      // 기간, 카테고리, 설정 후 검색
      newTodos = newTodos.filter(filterByKeyword)

      newTodos = newTodos.filter(filterByDateRange)

      newTodos = newTodos.filter((todo) => {
        return todo.category === category
      })
    } else if (startDate && endDate && keyword) {
      console.log('기간 선택')
      newTodos = newTodos.filter(filterByKeyword)
      newTodos = newTodos.filter(filterByDateRange)
    } else if (startDate && endDate && !keyword) {
      console.log('차트')
      newTodos = newTodos.filter(filterByDateRange)
    } else if (!startDate && !endDate && keyword) {
      console.log('검색어')
      newTodos = newTodos.filter(filterByKeyword)
    } else if (!startDate && endDate && !keyword) {
      console.log('단일')
      newTodos = newTodos.filter((todo) => todo.deadline === endDate)
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
