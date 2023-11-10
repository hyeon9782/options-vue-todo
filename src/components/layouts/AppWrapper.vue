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
  background-color: rgb(250, 249, 249);
}

@media screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
  }
}
</style>
