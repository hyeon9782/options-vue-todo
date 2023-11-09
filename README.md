# [IMQA] Front-end Engineer 코딩과제 1번 ([Visit](https://options-vue-todo.vercel.app/))

## Point!

- MSW를 사용해 MOCK API를 구현했어요!
- TypeScript를 사용해 타입 안정성을 강화했어요!
- 검색 기능을 구현할 때 debouce를 사용해 API 호출을 절약했어요!
- DonutChart에서 UI 로직과 데이터 전처리 로직을 분리해 가독성을 높였어요!
- 간단한 Test Code를 작성했어요!

## Stack

- TypeScript
- Vue
- Vuex
- Day.js
- D3
- ApexCharts

## 주요 기능

- 할 일 목록 조회
- 할 일 생성
- 할 일 수정
- 할 일 삭제
- Line Chart 구현
- Donut Chart 구현

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

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
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
