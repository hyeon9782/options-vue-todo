<template lang="">
  <footer class="footer-container" v-if="!$route.path.startsWith('/edit')">
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
  background-color: rgb(71, 91, 216);
  box-shadow: rgb(94, 94, 94) 10px 10px 10px 0px;
  display: flex;
  justify-content: space-around;
  border-radius: 30px;
  align-items: center;
  width: 50%;
  align-self: center;
  padding: 5px 0;
}

.footer-home {
  color: white;
  font-size: 1.8rem;
}

.footer-edit {
  color: white;
  font-size: 2rem;
}

.footer-statistics {
  color: white;
  font-size: 2rem;
}
</style>
