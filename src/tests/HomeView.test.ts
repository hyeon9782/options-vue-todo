import { render } from '@testing-library/vue'
import HomeViewVue from '@/views/HomeView.vue'
import { store } from '@/store'

describe('HomeView', () => {
  beforeEach(() => {})

  test('해당 날짜에 Task가 있다면 Task에 맞는 제목을 출력한다.', async () => {
    store.state.todos = [
      {
        id: 1,
        title: '오늘 할 일',
        deadline: new Date('2023-11-18'),
        status: 'ongoing',
        category: 'Urgent'
      }
    ]

    const { getByText } = render(HomeViewVue, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/' // 여기에 테스트에 사용할 라우팅 경로를 넣어주세요
          }
        }
      }
    })

    // 검증 통과를 위한 출력 값
    await getByText('오늘 할 일')
  })
  test('해당 날짜에 Task가 없다면 Add a New Task를 출력한다.', async () => {
    const { getByText } = render(HomeViewVue, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/' // 여기에 테스트에 사용할 라우팅 경로를 넣어주세요
          }
        }
      }
    })
    // 검증 통과를 위한 출력 값
    getByText('Add a New Task')
  })
})
