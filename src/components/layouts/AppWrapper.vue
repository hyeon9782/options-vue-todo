<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<style lang="css">
.wrapper {
  width: 500px;
  margin: 0 auto;
}

@media screen and (max-width: 500px) {
  .wrapper {
    width: 100%;
    padding: 20px 10px;
  }
}
</style>
