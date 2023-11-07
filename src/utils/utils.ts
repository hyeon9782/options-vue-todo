type TimerId = ReturnType<typeof setTimeout>
export function debounce(fn: (...args: any[]) => void, wait: number) {
  let timer: TimerId
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait) as TimerId
  }
}
