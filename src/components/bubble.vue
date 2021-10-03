<template>
  <div class="bubble d-md-flex d-none">
    <span class="mx-auto pointer-none">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  name: "bubble"
}
</script>

<style scoped>
.bubble{
  background: url("../assets/bubble.png");
  background-size: cover;
  width: 187px;
  height: 59px;
  opacity: 0.4;
  animation: move 10s infinite;
  position: absolute;
  transition: all .3s ease;
  z-index: -10;
}

.bubble:hover{
  opacity: 0.9;
}

.bubble span{
  margin-top: 14px;
  color: white;
}

@keyframes move {
  0%, 100% {
    transform: none;
  }

  25% {
    transform: translate(6px, -3px);
  }

  55% {
    transform: translate(-1px, 10px);
  }

  70% {
    transform: translate(8px, -10px);
  }

  85% {
    transform: translate(-5px, 4px);
  }
}
</style>