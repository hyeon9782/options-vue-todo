// import { mount } from '@vue/test-utils'
// import { createTestingPinia } from '@pinia/testing'
// import { useTodosStore } from '@/stores/todos'
// import TodoListVue from '@/components/home/TodoList.vue'

// describe('TodoList', () => {
//   test('TodoList가 렌더링된다.', () => {
//     const wrapper = mount(TodoListVue, {
//       global: {
//         plugins: [createTestingPinia({ stubActions: false })],
//         mocks: {
//           $route: {
//             path: '/' // 여기에 테스트에 사용할 라우팅 경로를 넣어주세요
//           }
//         }
//       }
//     })

//     const todos = useTodosStore() // 테스트 pinia 사용!

//     todos.getTodos({
//       keyword: '',
//       startDate: '',
//       endDate: '2023-11-13',
//       category: '',
//       status: ''
//     })

//     expect(todos.getTodos).toHaveBeenCalledTimes(1)

//     console.log(todos.todos)

//     expect(todos.todos).toEqual([
//       {
//         category: 'Urgent',
//         deadline: '2023-11-13',
//         description: '재발급 민증 언제 받을수 있는지 문의',
//         id: 129,
//         status: 'complete',
//         title: '민증 재발급'
//       }
//     ])
//   })
// })
