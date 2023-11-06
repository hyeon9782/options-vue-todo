import { http } from 'msw'

let todos = [
  {
    id: 0,
    title: 'Vue 3 공부',
    description: 'Vue 2와 Vue 3의 차이점을 생각하며 공부해보자.',
    deadline: '2023-10-01',
    status: '진행전'
  },
  {
    id: 1,
    title: 'Vuex 공부',
    description: '효울적인 상태관리를 위해 전역 상태 관리 라이브러리를 공부해보자',
    deadline: '2023-10-12',
    status: '진행중'
  },
  {
    id: 2,
    title: 'ApexChart와 D3 라이브러리 공부를 빡세게 해보자',
    description: 'ApexChart와 D3 라이브러리와 Vue 3의 라이플사이클을 생각하며 공부해보자.',
    deadline: '2023-10-17',
    status: '완료'
  }
]

let idx = 2

export const handlers = [
  // 할일 목록
  http.get('/todos', () => {
    return Response.json(todos)
  }),

  // 할일 추가
  http.post('/todos', ({ body }) => {
    console.log('msw 추가')
    console.log(body)
    todos.push(body)
    return Response.json(body)
  }),

  // 할일 수정
  http.put('/todos', ({ body }) => {
    console.log('msw 수정')
    console.log(body)
    todos = todos.map((todo) => {
      if (todo.id === body.id) {
        return {
          ...body,
          id: idx++
        }
      }
      return todo
    })
    return Response.json(body)
  }),

  // 할일 삭제
  http.delete('/todos', ({ body }) => {
    console.log('msw 삭제')
    console.log(body)
    todos = todos.filter((todo) => {
      todo.id !== body.id
    })
    return Response.json(body)
  })
]