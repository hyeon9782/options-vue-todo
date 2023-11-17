import { render, fireEvent, screen } from '@testing-library/vue'
import { store } from '@/store'
import EditFormVue from '@/components/edit/EditForm.vue'

describe('EditView', () => {
  test('필수 값을 입력하지 않으면 Task 생성에 실패한다.', async () => {
    render(EditFormVue, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/edit' // 여기에 테스트에 사용할 라우팅 경로를 넣어주세요
          }
        }
      }
    })

    await fireEvent.click(screen.getByText('Create'))

    screen.getByText('이 입력란을 작성하세요.')
  })

  test('필수 값을 모두 입력하면 Task 생성에 성공한다.', () => {
    const { getByText } = render(EditFormVue, {
      global: {
        plugins: [store],
        mocks: {
          $route: {
            path: '/edit' // 여기에 테스트에 사용할 라우팅 경로를 넣어주세요
          }
        }
      }
    })
  })
})
