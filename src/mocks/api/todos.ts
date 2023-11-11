import type { Todo } from '@/types'
import { HttpHandler, http } from 'msw'

let todos: Todo[] = []

function getRandomDate(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomStatus() {
  const statuses = ['planned', 'ongoing', 'complete']
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex]
}

function getRandomCategory() {
  const categories = ['Urgent', 'Office', 'Home', 'ETC', 'Work Out', 'School']
  const randomIndex = Math.floor(Math.random() * categories.length)
  return categories[randomIndex]
}

function generateRandomTodo(
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string
) {
  const deadline = getRandomDate(startDate, endDate).toISOString().split('T')[0]
  const status = getRandomStatus()
  const category = getRandomCategory()

  return {
    id,
    title,
    description,
    deadline,
    status,
    category
  }
}

// Generate 120 random todos
for (let i = 0; i < 120; i++) {
  const todo = generateRandomTodo(
    i,
    `Task ${i + 2}`,
    `Description for Task ${i + 2}`,
    '2023-08-01',
    '2023-11-11'
  )
  todos.push(todo)
}

// Additional tasks
todos.push(
  {
    id: 121,
    title: '선풍기, 에어컨 정리',
    description: '보관함 열쇠는 커뮤니티실에 있음',
    deadline: '2022-11-05',
    status: 'complete',
    category: 'Home'
  },
  {
    id: 122,
    title: '보고서 작성',
    description: '시사점을 중심으로',
    deadline: '2022-11-06',
    status: 'planned',
    category: 'Office'
  },
  {
    id: 123,
    title: 'PT',
    description: '12차',
    deadline: '2022-11-08',
    status: 'complete',
    category: 'Work Out'
  },
  {
    id: 124,
    title: 'PT',
    description: '13회차',
    deadline: '2022-11-09',
    status: 'complete',
    category: 'Work Out'
  },
  {
    id: 125,
    title: '벨로그글 쓰기',
    description: '시리즈 3탄',
    deadline: '2022-11-09',
    status: 'ongoing',
    category: 'School'
  },
  {
    id: 126,
    title: '데이트',
    description: '2시 영화예약!!!',
    deadline: '2022-11-10',
    status: 'complete',
    category: 'ETC'
  },
  {
    id: 127,
    title: '대학동기 모임',
    description: '파자마 파티, 음식 하나씩 가져오기',
    deadline: '2023-11-12',
    status: 'planned',
    category: 'Home'
  },
  {
    id: 128,
    title: '고등학교 모임',
    description: '판교역',
    deadline: '2023-11-12',
    status: 'planned',
    category: 'Home'
  },
  {
    id: 129,
    title: '민증 재발급',
    description: '재발급 민증 언제 받을수 있는지 문의',
    deadline: '2023-11-13',
    status: 'complete',
    category: 'Urgent'
  },
  {
    id: 130,
    title: '시험 공부',
    description: '202 ~ 278쪽 복습',
    deadline: '2023-11-14',
    status: 'ongoing',
    category: 'Urgent'
  },
  {
    id: 131,
    title: '가족모임',
    description: '아버지 생일 기념',
    deadline: '2023-11-14',
    status: 'complete',
    category: 'Home'
  },
  {
    id: 132,
    title: '회사 회식',
    description: '회식 경비 받아두기',
    deadline: '2023-11-15',
    status: 'complete',
    category: 'Office'
  }
)

let idx = 300

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
        const matchStatus = todo.status === status
        return filterByKeyword(todo) && matchCategory && matchStatus
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

      console.log(newTodos.length)
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
