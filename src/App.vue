<template>
  <div id="app">
    <transition name="fade" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import "style";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
</style>
