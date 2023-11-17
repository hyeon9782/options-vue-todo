import { render } from '@testing-library/vue'
import HomeViewVue from '@/views/HomeView.vue'
import { store } from '@/store'

test('it should work', async () => {
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

  // Wait for any asynchronous actions to complete
  await store.dispatch('getTodos', {
    keyword: '',
    startDate: '',
    endDate: '2023-11-18',
    category: '',
    status: ''
  })

  // 검증 통과를 위한 출력 값
  getByText('Add a New Task')
})
