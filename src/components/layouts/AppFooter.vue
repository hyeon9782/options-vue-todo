<template lang="">
  <footer class="footer-container">
    <router-link to="/">
      <font-awesome-icon :icon="['fas', 'house']" class="footer-home" />
    </router-link>
    <router-link to="/edit">
      <font-awesome-icon :icon="['fas', 'square-plus']" class="footer-edit" />
    </router-link>
    <router-link to="/statistics">
      <font-awesome-icon :icon="['fas', 'chart-simple']" class="footer-statistics" />
    </router-link>
  </footer>
</template>
<script lang="ts">
export default {}
</script>
<style lang="css">
.footer-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  display: flex;
  justify-content: space-around;
  border-radius: 30px;
  align-items: center;
  border: 1px solid lightgray;
  width: 80%;
  align-self: center;
  padding: 10px 0;
}

.footer-home {
  color: blue;
  font-size: 1.8rem;
}

.footer-edit {
  color: blue;
  font-size: 2rem;
}

.footer-statistics {
  color: blue;
  font-size: 2rem;
}
</style>
