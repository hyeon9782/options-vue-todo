<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<style lang="css">
.wrapper {
  position: relative;
  width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: white;
}

@media screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
  }
}
</style>
