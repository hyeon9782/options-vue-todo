<template>
  <header class="header-container">
    <div class="header-title">TODO List</div>
    <nav class="header-nav">
      <ul class="header-ul">
        <RouterLink to="/">
          <li class="header-li" :class="{ active: $route.path === '/' }">목록</li>
        </RouterLink>
        <RouterLink to="/statistics">
          <li class="header-li" :class="{ active: $route.path === '/statistics' }">통계</li>
        </RouterLink>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  }
}
</script>

<style lang="css">
.header-container {
  padding: 20px 0;
}

.header-title {
  text-align: center;
  font-weight: bold;
  font-size: xx-large;
}

.header-nav {
  padding: 10px 0;
}

.header-ul {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.header-li {
  padding: 5px 10px;
  border-radius: 5px;
  background: blue;
}

.active {
  background: red;
}
</style>
