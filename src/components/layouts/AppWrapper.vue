<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<style lang="css">
.wrapper {
  width: 500px;
  height: 100%;
  margin: 0 auto;
}

@media screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
    height: 100%;
    padding: 0px 10px;
  }
}
</style>
