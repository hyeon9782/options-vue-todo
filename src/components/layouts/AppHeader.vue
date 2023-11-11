<template>
  <header class="header-container">
    <div class="header-title">Task</div>
    <router-link to="/search">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" />
    </router-link>
  </header>
</template>

<style lang="css" scoped>
.header-container {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.header-title {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: large;
}

.search-icon {
  font-size: 1.2rem;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
