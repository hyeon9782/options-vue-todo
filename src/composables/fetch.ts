import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // 가져오기 전에 상태 재설정..
    data.value = null
    error.value = null
    // unref()는 ref의 래핑을 해제합니다.
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // 설정하기: 입력 URL이 ref인 경우 반응적 다시 가져오기
    watchEffect(doFetch)
  } else {
    // 그렇지 않으면 한 번만 가져 와서
    // 감시자의 오버 헤드를 피하합니다.
    doFetch()
  }

  return { data, error }
}
