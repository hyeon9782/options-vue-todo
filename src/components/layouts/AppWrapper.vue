<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<style lang="css">
.wrapper {
  position: relative;
  width: 500px;
  height: 100%;
  margin: 0 auto;
  padding: 20px 10px;
  background-color: white;
}

@media screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
  }
}
</style>
