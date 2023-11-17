import { createPinia, setActivePinia } from 'pinia'
import { useTodosStore } from './todos'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Task 조회', async () => {
    const todos = useTodosStore()
    expect(todos.todos).toStrictEqual([])
    await todos.getTodos({
      keyword: '시험',
      startDate: '',
      endDate: '',
      category: '',
      status: ''
    })

    expect(todos.todos).toStrictEqual([
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        id: 130,
        status: 'ongoing',
        title: '시험 공부'
      }
    ])
  })

  it('Task 생성', async () => {
    const todos = useTodosStore()
    expect(todos.todos).toStrictEqual([])
    await todos.createTodo({
      category: 'Urgent',
      deadline: '2023-11-14',
      description: '202 ~ 278쪽 복습',
      status: 'ongoing',
      title: '시험 공부'
    })

    expect(todos.todos).toStrictEqual([
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부'
      }
    ])
  })

  it('Task 수정', async () => {
    const todos = useTodosStore()
    todos.todos = [
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부',
        id: 130
      }
    ]
    expect(todos.todos).toStrictEqual([
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부',
        id: 130
      }
    ])
    await todos.updateTodo({
      category: 'Urgent',
      deadline: '2023-11-14',
      description: '202 ~ 278쪽 복습',
      status: 'ongoing',
      title: '시험 공부!!!!!',
      id: 130
    })

    expect(todos.todos).toStrictEqual([
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부!!!!!',
        id: 130
      }
    ])
  })

  it('Task 삭제', async () => {
    const todos = useTodosStore()
    todos.todos = [
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부',
        id: 130
      }
    ]
    expect(todos.todos).toStrictEqual([
      {
        category: 'Urgent',
        deadline: '2023-11-14',
        description: '202 ~ 278쪽 복습',
        status: 'ongoing',
        title: '시험 공부',
        id: 130
      }
    ])

    await todos.deleteTodo(130)

    expect(todos.todos).toStrictEqual([])
  })
})
