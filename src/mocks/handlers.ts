import type { HttpHandler } from 'msw'
import todosHandler from './api/todos'

// handler를 따로 분리하는 이유는 연관된 API끼리 묶어주기 위함입니다. (비록 지금은 하나지만..ㅎㅎ)
const handlers: HttpHandler[] = [...todosHandler]

export default handlers
