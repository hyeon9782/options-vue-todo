# [IMQA] Front-end Engineer 코딩과제 1번 ([Visit](https://options-vue-todo.vercel.app/))

## Point!

- MSW를 사용해 MOCK API를 구현했습니다.
- TypeScript를 사용해 타입 안정성을 강화했습니다.
- 검색 기능을 구현할 때 debouce를 사용해 API 호출을 절약했습니다.
- DonutChart에서 UI 로직과 데이터 전처리 로직을 분리해 가독성을 높였습니다.
- Options API와 Composition API를 모두 사용해 봤습니다.
- 처음에 주신 요구사항과 동일한 version은 original branch에 있습니다. (Options API)
- main branch에는 추가 구현사항과 변경된 UI가 있습니다. (Composition API)

## 기본 구현 (original branch)

- 할 일 목록 조회
- 할 일 생성
- 할 일 수정
- Line Chart 구현
- Donut Chart 구현

## 추가 구현 (main branch)

- 통계 페이지에서 기간을 변경하여 시각화된 데이터를 확인할 수 있습니다.
- 도넛 차트에서는 percent를 라인 차트에서는 complete된 data를 추가했습니다.
- UX를 높이기 위해 전체적인 UI를 변경했습니다.
- 검색 기능에 다양한 Filter를 추가했습니다.
- Composition API를 통해 리팩토링을 진행했습니다.
- Task를 삭제할 수 있습니다.

## 아쉬운 점 & 보완할 점

- Test 코드를 통해 코드의 안정성을 높이고 싶습니다.
- Component 분리를 좀 더 세분화하고 싶습니다.
- 에러 맞는 에러 핸들링을 구현하고 싶습니다.
- 프로젝트의 디테일이 좀 더 완성하고 싶습니다.

## Stack

- TypeScript
- Vue
- Vuex
- Day.js
- D3
- ApexCharts

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

# 과제 2번

```js
class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let node = this.root
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isEndOfWord = true
  }

  display(node = this.root, level = 0, prefix = '') {
    if (node.isEndOfWord) {
      console.log('  '.repeat(level) + prefix)
    }

    for (const [char, childNode] of Object.entries(node.children)) {
      this.display(childNode, level + 1, prefix + char)
    }
  }
}

const words = ['t', 'ti', 'te', 'tie', 'tiger', 'test', 'team', 'tictok']
const trie = new Trie()

words.forEach((word) => {
  trie.insert(word)
})

// Display the Trie structure
trie.display()
```
