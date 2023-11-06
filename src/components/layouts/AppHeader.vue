<template>
  <header class="header-container">
    <div class="header-title">TODO List</div>
    <nav class="header-nav">
      <ul class="header-ul">
        <li class="header-li" :class="{ active: isActive }">
          <RouterLink to="/">목록</RouterLink>
        </li>
        <li class="header-li" :class="{ active: isActive }">
          <RouterLink to="/statistics">통계</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  },
  data() {
    return {
      isActive: true
    }
  },
  mounted() {
    this.isActive = this.$route.path === '/'
    console.log(this.$route.path)
  }
}
</script>

<style lang="css">
.header-container {
  background: gray;
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
